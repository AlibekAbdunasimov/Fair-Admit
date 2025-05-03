import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First, get the user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers({
      filter: {
        email: email,
      },
    })

    if (userError || !userData || userData.users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = userData.users[0]

    // Update the user to mark email as confirmed
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirmed_at: new Date().toISOString(),
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Now sign in the user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return NextResponse.json({ error: signInError.message }, { status: 500 })
    }

    // Get the user's role
    const { data: dbUserData, error: dbUserError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (dbUserError) {
      // Continue anyway, just won't have role information
      console.error("Error fetching user role:", dbUserError)
    }

    return NextResponse.json({
      success: true,
      message: "Email confirmed and user logged in",
      userData: dbUserData,
    })
  } catch (error: any) {
    console.error("Error in confirm-email route:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
