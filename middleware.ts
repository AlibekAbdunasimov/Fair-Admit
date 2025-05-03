import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Log middleware execution for debugging
  console.log("Middleware executing for path:", req.nextUrl.pathname)
  console.log("Session exists:", !!session)

  // Check auth condition
  if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin")) {
    // If user is not signed in and is trying to access a protected route
    if (!session) {
      console.log("No session found, redirecting to login")
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is trying to access admin routes but is not an admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      try {
        const { data: userData, error } = await supabase.from("users").select("role").eq("id", session.user.id).single()

        if (error) {
          console.error("Error fetching user role:", error)
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        if (!userData || userData.role !== "admin") {
          console.log("User is not an admin, redirecting to dashboard")
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }
      } catch (error) {
        console.error("Error in admin check:", error)
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
  }

  // Prevent authenticated users from accessing login/register pages
  if ((req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") && session) {
    console.log("User is already authenticated, redirecting to dashboard")
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}
