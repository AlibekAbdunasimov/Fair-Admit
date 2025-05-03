// This file contains configuration for Supabase Auth

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const SUPABASE_AUTH_CONFIG = {
  // For production, you would want to set this to true
  // For development/testing, we're setting it to false
  requireEmailConfirmation: false,

  // Instructions for Supabase Dashboard:
  // 1. Go to Authentication > Email Templates
  // 2. Disable "Confirm signup" under "Enable email confirmations"
}
