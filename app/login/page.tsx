"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Check if user is already logged in
  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (data?.session) {
          console.log("User already has a session, redirecting to dashboard")
          // User is already logged in, redirect to dashboard
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsCheckingSession(false)
      }
    }

    checkSession()
  }, [router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      console.log("Attempting to sign in with:", values.email)

      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        // Log detailed error information
        console.error("Login error details:", error)
        console.error("Error code:", error.code)
        console.error("Error message:", error.message)
        console.error("Error status:", error.status)

        // Set user-friendly error message based on error type
        let userMessage = "Invalid email or password. Please try again."

        if (error.message.includes("Email not confirmed")) {
          userMessage = "Your email is not confirmed. Please check your inbox for a verification email."
        } else if (error.message.includes("Invalid login credentials")) {
          userMessage = "Invalid email or password. Please check your credentials and try again."
        } else if (error.message.includes("Too many requests")) {
          userMessage = "Too many login attempts. Please try again later."
        } else if (error.message.includes("network")) {
          userMessage = "Network error. Please check your internet connection and try again."
        }

        setErrorMessage(userMessage)
        throw new Error(userMessage)
      }

      console.log("Login successful, user data:", data)

      // Verify that we have a session
      if (!data.session) {
        console.error("No session returned after login")
        throw new Error("Failed to establish session. Please try again.")
      }

      toast({
        title: "Login successful!",
        description: "You have successfully logged in.",
      })

      // Check user role to redirect to appropriate dashboard
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if (userError) {
          console.error("User data fetch error:", userError)
          throw userError
        }

        console.log("User role:", userData.role)

        // Force a small delay to ensure session is established
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (userData.role === "admin") {
          // Force a full page reload to ensure session is established
          window.location.href = "/admin"
        } else {
          window.location.href = "/dashboard"
        }
      } catch (roleError) {
        console.error("Error fetching user role:", roleError)
        // Default to dashboard if we can't determine role
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Login error:", error)

      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking session
  if (isCheckingSession) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Checking authentication status...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your email and password to sign in</p>
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
            Forgot password?
          </Link>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
