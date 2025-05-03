import { AuthDebug } from "@/components/auth-debug"

export default function DebugPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Authentication Debug Page</h1>
      <AuthDebug />
    </div>
  )
}
