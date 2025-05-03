"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FileText, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z
    .string()
    .min(10, {
      message: "Feedback must be at least 10 characters.",
    })
    .max(500, {
      message: "Feedback cannot exceed 500 characters.",
    }),
})

export default function ReviewApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState(75)

  // Mock application data - in a real app, this would be fetched from the database
  const [application] = useState({
    id: params.id,
    organization: "University A",
    program: "Computer Science",
    submittedDate: "2023-05-15",
    status: "pending",
    documents: [
      { name: "Academic Transcript", type: "pdf", processed: true },
      { name: "Certificate of Achievement", type: "pdf", processed: true },
      { name: "Health Certificate", type: "pdf", processed: true },
    ],
    statement:
      "This is a redacted personal statement from the applicant. All personal identifying information has been automatically removed to ensure anonymous review. The applicant is expressing their interest in the Computer Science program and highlighting their achievements and goals.",
    summary:
      "The applicant has a strong academic background with a GPA of 3.8. They have completed relevant coursework in programming, data structures, and algorithms. They have participated in coding competitions and have experience with web development projects.",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 75,
      feedback: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // This is a placeholder for the actual submission logic
      console.log("Review values:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Review submitted!",
        description: "The application has been reviewed successfully.",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your review. Please try again.",
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
            <Link href="/admin" className="font-bold">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <span>←</span> Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Review Application</h1>
              <p className="text-muted-foreground">
                Application ID: <span className="font-mono">{application.id}</span>
              </p>
            </div>
            <Badge>Pending Review</Badge>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Anonymous Review</AlertTitle>
            <AlertDescription>
              This application has been anonymized. All personal information has been redacted to ensure fair
              evaluation.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>
                {application.organization} - {application.program}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Submitted Date</h3>
                <p>{application.submittedDate}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">AI-Generated Summary</h3>
                <p className="text-sm border rounded-md p-3 bg-muted/50">{application.summary}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents">
            <TabsList>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="statement">Personal Statement</TabsTrigger>
              <TabsTrigger value="review">Submit Review</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4 pt-4">
              <div className="space-y-4">
                {application.documents.map((doc, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.processed ? "Processed and anonymized" : "Processing..."}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">View Document</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statement" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Statement</CardTitle>
                  <CardDescription>
                    This statement has been automatically redacted to remove personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{application.statement}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="review" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Review</CardTitle>
                  <CardDescription>Provide a score and feedback for this application</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="score"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Score (0-100)</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <Slider
                                  defaultValue={[field.value]}
                                  max={100}
                                  step={1}
                                  onValueChange={(value) => {
                                    field.onChange(value[0])
                                    setScore(value[0])
                                  }}
                                />
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">0</span>
                                  <span className="text-sm font-medium">{score}</span>
                                  <span className="text-sm text-muted-foreground">100</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Rate the application based on qualifications and fit for the program
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide feedback on the application..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>This feedback will be visible to the applicant</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" type="button" asChild>
                          <Link href="/admin">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                          {isLoading ? "Submitting..." : "Approve Application"}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          disabled={isLoading}
                          onClick={() => {
                            // Handle rejection logic
                            toast({
                              title: "Application rejected",
                              description: "The application has been rejected.",
                            })
                            router.push("/admin")
                          }}
                        >
                          Reject Application
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
