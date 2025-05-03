"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthTestPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          return
        }

        setSession(sessionData.session)

        // If we have a session, get user data
        if (sessionData.session) {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", sessionData.session.user.id)
            .single()

          if (userError) {
            console.error("User data error:", userError)
          } else {
            setUserData(userData)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event)
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="container py-10">Loading authentication status...</div>
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
          <CardDescription>Check your current authentication status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Session Status</h3>
            <p className="text-sm text-muted-foreground">{session ? "Authenticated ✅" : "Not authenticated ❌"}</p>
          </div>

          {session && (
            <>
              <div>
                <h3 className="text-lg font-medium">Session Info</h3>
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto text-xs">
                  {JSON.stringify(
                    {
                      user_id: session.user.id,
                      email: session.user.email,
                      expires_at: new Date(session.expires_at * 1000).toLocaleString(),
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>

              {userData && (
                <div>
                  <h3 className="text-lg font-medium">User Data</h3>
                  <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto text-xs">
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </div>
              )}

              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
            </>
          )}

          {!session && (
            <div className="flex space-x-4">
              <Button asChild>
                <a href="/login">Go to Login</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/register">Go to Register</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
