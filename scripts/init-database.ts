import { createClient } from "@supabase/supabase-js"

// This script is meant to be run from the command line to initialize the database
// It will create all the necessary tables and seed initial data

async function main() {
  // Load environment variables
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    console.log("Initializing database...")

    // Fetch the SQL from our API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/setup-database`)

    if (!response.ok) {
      throw new Error(`Failed to initialize database: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Database initialization result:", result)

    console.log("Database initialization complete!")
  } catch (error) {
    console.error("Error initializing database:", error)
    process.exit(1)
  }
}

main()
