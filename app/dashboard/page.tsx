"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  // This would be fetched from the database in a real application
  const [userId] = useState("APP-" + Math.random().toString(36).substring(2, 10).toUpperCase())

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-bold">
              Anonymous Application Platform
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="font-mono">
              ID: {userId}
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild>
              <Link href="/dashboard/new-application">New Application</Link>
            </Button>
          </div>

          <Tabs defaultValue="applications">
            <TabsList>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="documents">My Documents</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="applications" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Sample University</CardTitle>
                    <CardDescription>Computer Science Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge>In Review</Badge>
                      <span className="text-sm text-muted-foreground">Submitted: 2023-05-15</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tech Organization</CardTitle>
                    <CardDescription>Summer Internship Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">Draft</Badge>
                      <span className="text-sm text-muted-foreground">Last updated: 2023-05-10</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Continue Application
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  View All Applications
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Documents</CardTitle>
                  <CardDescription>
                    Upload and manage your documents. All personal information will be automatically redacted.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Academic Transcript</h3>
                        <p className="text-sm text-muted-foreground">Uploaded on 2023-05-01</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Certificate of Achievement</h3>
                        <p className="text-sm text-muted-foreground">Uploaded on 2023-04-15</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Health Certificate</h3>
                        <p className="text-sm text-muted-foreground">Uploaded on 2023-03-20</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upload New Document</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Your Anonymous ID</h3>
                    <div className="flex items-center space-x-2">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {userId}
                      </code>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This is your unique identifier in our system. Keep it safe as you'll need it for verification.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Email Address</h3>
                    <p>user@example.com</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Account Security</h3>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
