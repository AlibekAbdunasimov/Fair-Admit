"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function signOut() {
      try {
        await supabase.auth.signOut()
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        })
      } catch (error) {
        console.error("Logout error:", error)
      } finally {
        router.push("/")
      }
    }

    signOut()
  }, [router])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Logging out...</h1>
        <p className="text-muted-foreground">Please wait while we log you out.</p>
      </div>
    </div>
  )
}
