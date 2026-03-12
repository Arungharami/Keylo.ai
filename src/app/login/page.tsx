
import { AuthForm } from "@/components/auth/AuthForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] -z-10" />
      <AuthForm type="login" />
    </div>
  )
}
