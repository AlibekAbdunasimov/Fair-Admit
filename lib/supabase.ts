import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Create client with production-friendly settings
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    // Use site URL from environment variable
    site_url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    // Ensure cookies work in production
    cookieOptions: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined : undefined,
    },
  },
})

// Server-side client remains the same
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
