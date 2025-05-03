import { createServerSupabaseClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUser() {
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  const { data: user, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function requireAdmin() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return user
}

export async function getAnonymousId(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("anonymous_ids")
    .select("*")
    .eq("user_id", userId)
    .eq("active", true)
    .single()

  if (error || !data) {
    return null
  }

  return data.anonymous_id
}
