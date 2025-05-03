"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AuthDebug() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function checkSession() {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      setSessionInfo({
        hasSession: !!data.session,
        userId: data.session?.user?.id,
        email: data.session?.user?.email,
        expiresAt: data.session?.expires_at ? new Date(data.session.expires_at * 1000).toLocaleString() : null,
      })
    } catch (error) {
      console.error("Session check error:", error)
      setSessionInfo({ error: "Failed to check session" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Authentication Debug</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="font-medium">Session Status:</p>
              <p>{sessionInfo?.hasSession ? "✅ Authenticated" : "❌ Not authenticated"}</p>
            </div>

            {sessionInfo?.hasSession && (
              <>
                <div>
                  <p className="font-medium">User ID:</p>
                  <p className="text-sm font-mono">{sessionInfo.userId}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{sessionInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium">Expires:</p>
                  <p>{sessionInfo.expiresAt}</p>
                </div>
              </>
            )}

            {sessionInfo?.error && (
              <div className="text-red-500">
                <p className="font-medium">Error:</p>
                <p>{sessionInfo.error}</p>
              </div>
            )}

            <Button onClick={checkSession} className="w-full">
              Refresh Session Info
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
