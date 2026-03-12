
import { AuthForm } from "@/components/auth/AuthForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-full bg-secondary/5 blur-[120px] -z-10" />
      <AuthForm type="signup" />
    </div>
  )
}
