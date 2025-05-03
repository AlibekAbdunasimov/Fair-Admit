import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// SQL schema from your schema.sql file
const schema = `
-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT NOT NULL CHECK (role IN ('applicant', 'reviewer', 'admin')) DEFAULT 'applicant',
  is_verified BOOLEAN DEFAULT FALSE,
  face_id_verified BOOLEAN DEFAULT FALSE
);

-- Anonymous IDs for applicants
CREATE TABLE IF NOT EXISTS anonymous_ids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  anonymous_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Create functions for generating anonymous IDs
CREATE OR REPLACE FUNCTION generate_anonymous_id()
RETURNS TEXT AS $$
DECLARE
  random_id TEXT;
BEGIN
  random_id := 'APP-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  RETURN random_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate anonymous ID when a user is created
CREATE OR REPLACE FUNCTION create_anonymous_id_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO anonymous_ids (user_id, anonymous_id)
  VALUES (NEW.id, generate_anonymous_id());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_user_created ON users;
CREATE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW
  WHEN (NEW.role = 'applicant')
  EXECUTE FUNCTION create_anonymous_id_for_new_user();

-- Create RLS policies for security
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE anonymous_ids ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only see and modify their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow service role to insert users (for registration)
CREATE POLICY "Service role can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Anonymous IDs policies
CREATE POLICY "Users can view own anonymous IDs" ON anonymous_ids
  FOR SELECT USING (auth.uid() = user_id);

-- Allow service role to manage anonymous IDs
CREATE POLICY "Service role can manage anonymous IDs" ON anonymous_ids
  FOR ALL WITH CHECK (true);
`

export async function GET() {
  try {
    // Only allow this in development or when explicitly authorized
    if (process.env.NODE_ENV !== "development" && process.env.ALLOW_DB_SETUP !== "true") {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const supabase = createServerSupabaseClient()

    // Execute the SQL schema
    const { error } = await supabase.rpc("pgclient", { query: schema })

    if (error) {
      console.error("Error setting up database:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Database setup complete" })
  } catch (error) {
    console.error("Error in setup-database route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
