import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id, email, role } = await request.json()

    // Validate input
    if (!id || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use the server-side client with service role to bypass RLS
    const supabase = createServerSupabaseClient()

    // Insert the user into the users table
    const { error } = await supabase.from("users").insert({
      id,
      email,
      role,
      is_verified: true, // Mark the user as verified by default
    })

    if (error) {
      console.error("Error creating user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Mark the user as verified in Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(id, {
      email_confirmed_at: new Date().toISOString(),
    })

    if (updateError) {
      console.error("Error updating user verification status:", updateError)
      // Continue anyway since this is just an additional step
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in create-user route:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
