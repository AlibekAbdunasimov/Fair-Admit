import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, FileText, Users, Lock, Brain } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Anonymous Application Platform</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  How Our Anonymous Application Platform Works
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Ensuring fair evaluation through advanced anonymization and AI-powered document processing
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Application Process</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Our platform transforms traditional applications into a fair, bias-free evaluation process
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>1. Document Submission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Upload your application documents, personal statements, and credentials securely to our platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Brain className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>2. AI Processing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Our AI technology automatically redacts personal information while preserving the substance of your
                    qualifications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>3. Anonymous Review</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Reviewers evaluate your application based solely on merit, without knowledge of your identity,
                    background, or demographics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Anonymization Technology */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Advanced Anonymization Technology</h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Our platform uses state-of-the-art AI to ensure complete anonymity while preserving the substance of
                  your application.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>Automatic redaction of names, addresses, and other identifying information</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>Gender-neutral language processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>Removal of institution names and locations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>AI-generated summaries that focus on qualifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>Unique anonymous ID generation for tracking</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl bg-background p-8 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Original Document</h3>
                        <p className="text-sm text-muted-foreground">Contains personal information</p>
                      </div>
                    </div>
                    <div className="h-8 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                        <span className="text-muted-foreground">↓</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Processing</h3>
                        <p className="text-sm text-muted-foreground">Redaction and summarization</p>
                      </div>
                    </div>
                    <div className="h-8 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                        <span className="text-muted-foreground">↓</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Anonymized Document</h3>
                        <p className="text-sm text-muted-foreground">Ready for unbiased review</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Benefits for Everyone</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Our platform creates value for both applicants and organizations
              </p>
            </div>

            <Tabs defaultValue="applicants" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="applicants">For Applicants</TabsTrigger>
                <TabsTrigger value="organizations">For Organizations</TabsTrigger>
              </TabsList>
              <TabsContent value="applicants" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Fair Evaluation</h3>
                          <p className="text-sm text-muted-foreground">
                            Your application is judged solely on your qualifications and merit, not on factors like
                            name, gender, ethnicity, or background.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Reduced Bias</h3>
                          <p className="text-sm text-muted-foreground">
                            Eliminate unconscious bias that might affect traditional application processes.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Privacy Protection</h3>
                          <p className="text-sm text-muted-foreground">
                            Your personal information remains secure and is only revealed when necessary.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Confidence in the Process</h3>
                          <p className="text-sm text-muted-foreground">
                            Know that your application is being evaluated based on what truly matters.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="organizations" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Diverse Talent Pool</h3>
                          <p className="text-sm text-muted-foreground">
                            Attract a wider range of qualified applicants who might otherwise be discouraged by
                            traditional processes.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Bias Mitigation</h3>
                          <p className="text-sm text-muted-foreground">
                            Demonstrate commitment to fair evaluation and reduce the impact of unconscious bias in
                            selection.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Focus on Merit</h3>
                          <p className="text-sm text-muted-foreground">
                            Ensure that selections are based on qualifications and potential, leading to better
                            outcomes.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Streamlined Review Process</h3>
                          <p className="text-sm text-muted-foreground">
                            AI-generated summaries and organized documents make the review process more efficient.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Security & Privacy</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Your data is protected with enterprise-grade security measures
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Lock className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>End-to-End Encryption</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>All documents and communications are encrypted in transit and at rest.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Data Protection</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Personal information is stored separately from anonymized application data.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Access Controls</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Strict role-based access ensures only authorized personnel can view specific information.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Common questions about our anonymous application platform
              </p>
            </div>

            <div className="grid gap-6 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>How do I know my information is truly anonymous?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI system automatically redacts all personally identifiable information from your documents
                    before they're reviewed. This includes names, addresses, specific school names, and other
                    identifying details. You can preview the anonymized version of your documents before submission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What happens after my application is reviewed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    If your application is approved, the organization can request to connect with you. At that point,
                    you'll be notified and can choose to reveal your identity to proceed with the next steps in their
                    process.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How does the Face ID verification work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    For our test phase, we use Face ID verification to ensure the integrity of the application process.
                    This verification is only used to confirm you are a real person and is completely separate from your
                    application data. Reviewers never see your Face ID information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I use this platform for any type of application?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform is designed for educational and organizational applications, including university
                    admissions, scholarship applications, job applications, and grant proposals. If you have a specific
                    use case not listed, please contact us to discuss how we can help.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What if I need to update my application after submission?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    You can update your application documents at any time before the review process begins. Once review
                    has started, you'll need to contact the organization directly for any critical updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Experience Fair Evaluation?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join our platform today and ensure your application is judged on merit alone.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Anonymous Application Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
