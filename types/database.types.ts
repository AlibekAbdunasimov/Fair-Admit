export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          role: "applicant" | "reviewer" | "admin"
          is_verified: boolean
          face_id_verified: boolean
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          role?: "applicant" | "reviewer" | "admin"
          is_verified?: boolean
          face_id_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          role?: "applicant" | "reviewer" | "admin"
          is_verified?: boolean
          face_id_verified?: boolean
        }
      }
      anonymous_ids: {
        Row: {
          id: string
          user_id: string
          anonymous_id: string
          created_at: string
          active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          anonymous_id: string
          created_at?: string
          active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          anonymous_id?: string
          created_at?: string
          active?: boolean
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_anonymous_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
