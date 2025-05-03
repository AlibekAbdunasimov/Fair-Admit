"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, FileText, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  organization: z.string().min(1, {
    message: "Please select an organization.",
  }),
  program: z.string().min(1, {
    message: "Please select a program.",
  }),
  statement: z
    .string()
    .min(10, {
      message: "Personal statement must be at least 10 characters.",
    })
    .max(1000, {
      message: "Personal statement cannot exceed 1000 characters.",
    }),
})

export default function NewApplicationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      program: "",
      statement: "",
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real application, we would upload these files to storage
      // For now, we'll just add the file names to our state
      const newFiles = Array.from(files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])

      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) have been uploaded and will be processed.`,
      })
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No documents uploaded",
        description: "Please upload at least one document to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // This is a placeholder for the actual submission logic
      console.log("Application values:", values)
      console.log("Uploaded files:", uploadedFiles)

      // Simulate API call and processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application submitted!",
        description: "Your application has been submitted successfully and is now being processed.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Submission failed",
        description: "There was a problem with your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-bold">
              Anonymous Application Platform
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <span>←</span> Back to Dashboard
              </Link>
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Application</h1>
            <p className="text-muted-foreground">Submit a new anonymous application</p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Privacy Notice</AlertTitle>
            <AlertDescription>
              All personal information in your documents will be automatically redacted before being reviewed. Your
              application will be identified only by your anonymous ID.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="university-a">University A</SelectItem>
                        <SelectItem value="university-b">University B</SelectItem>
                        <SelectItem value="tech-org">Tech Organization</SelectItem>
                        <SelectItem value="nonprofit">Nonprofit Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the organization you're applying to</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business Administration</SelectItem>
                        <SelectItem value="internship">Summer Internship</SelectItem>
                        <SelectItem value="scholarship">Scholarship Program</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the specific program you're applying to</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Document Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your documents. We accept PDF, JPG, and PNG files.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="space-y-2 text-center">
                        <h3 className="font-medium">Upload Documents</h3>
                        <p className="text-sm text-muted-foreground">Drag and drop files or click to browse</p>
                      </div>
                      <Input
                        type="file"
                        multiple
                        className="cursor-pointer"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </CardContent>
                </Card>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 rounded-md border p-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file}</span>
                          <Badge variant="outline" className="ml-auto">
                            Pending Processing
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="statement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Statement</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your personal statement here..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormDescription>
                      Explain why you're applying and what makes you a good candidate. This will be anonymized before
                      review.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
