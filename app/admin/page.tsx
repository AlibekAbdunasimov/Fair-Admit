"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data for applications
  const [applications] = useState([
    {
      id: "APP-1234ABCD",
      organization: "University A",
      program: "Computer Science",
      submittedDate: "2023-05-15",
      status: "pending",
      score: null,
    },
    {
      id: "APP-5678EFGH",
      organization: "Tech Organization",
      program: "Summer Internship",
      submittedDate: "2023-05-10",
      status: "reviewed",
      score: 85,
    },
    {
      id: "APP-9012IJKL",
      organization: "University B",
      program: "Engineering",
      submittedDate: "2023-05-08",
      status: "approved",
      score: 92,
    },
    {
      id: "APP-3456MNOP",
      organization: "Nonprofit Foundation",
      program: "Scholarship Program",
      submittedDate: "2023-05-05",
      status: "rejected",
      score: 65,
    },
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="font-bold">
              Admin Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search applications..." className="w-[250px] pl-8" />
            </div>
          </div>

          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications
                  .filter((app) => app.status === "pending")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle className="font-mono text-sm">{application.id}</CardTitle>
                        <CardDescription>
                          {application.organization} - {application.program}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge>Pending Review</Badge>
                          <span className="text-sm text-muted-foreground">Submitted: {application.submittedDate}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href={`/admin/review/${application.id}`}>Review Application</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="reviewed" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications
                  .filter((app) => app.status === "reviewed")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle className="font-mono text-sm">{application.id}</CardTitle>
                        <CardDescription>
                          {application.organization} - {application.program}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">Reviewed</Badge>
                          <span className="text-sm font-medium">Score: {application.score}/100</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Submitted: {application.submittedDate}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/admin/review/${application.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications
                  .filter((app) => app.status === "approved")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle className="font-mono text-sm">{application.id}</CardTitle>
                        <CardDescription>
                          {application.organization} - {application.program}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="success" className="bg-green-500 hover:bg-green-600">
                            Approved
                          </Badge>
                          <span className="text-sm font-medium">Score: {application.score}/100</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Submitted: {application.submittedDate}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/admin/review/${application.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications
                  .filter((app) => app.status === "rejected")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle className="font-mono text-sm">{application.id}</CardTitle>
                        <CardDescription>
                          {application.organization} - {application.program}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="destructive">Rejected</Badge>
                          <span className="text-sm font-medium">Score: {application.score}/100</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Submitted: {application.submittedDate}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/admin/review/${application.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
