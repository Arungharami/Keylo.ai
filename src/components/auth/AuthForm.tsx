
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Github, Chrome, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate auth
    setTimeout(() => {
      setLoading(false)
      toast({
        title: type === "login" ? "Welcome back!" : "Account created!",
        description: "Redirecting you to the app...",
      })
      window.location.href = "/app/onboarding"
    }, 1500)
  }

  return (
    <div className="w-full max-w-md space-y-8 glass p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles size={22} />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight">Keylo.ai</span>
        </Link>
        <h2 className="text-3xl font-bold">{type === "login" ? "Welcome back" : "Create your account"}</h2>
        <p className="text-muted-foreground">
          {type === "login" 
            ? "Your AI companion is waiting for you." 
            : "Join the thousands already chatting with Keylo."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 glass border-white/10 hover:bg-white/5 transition-colors gap-2">
          <Chrome size={18} /> Google
        </Button>
        <Button variant="outline" className="h-12 glass border-white/10 hover:bg-white/5 transition-colors gap-2">
          <Github size={18} /> Github
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground">Or continue with email</span></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required className="h-12 bg-white/5 border-white/10 focus:ring-primary" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {type === "login" && (
              <Link href="/forgot-password" size="sm" className="text-xs text-primary hover:underline">Forgot password?</Link>
            )}
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              required 
              className="h-12 bg-white/5 border-white/10 focus:ring-primary pr-12" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full h-14 premium-gradient text-lg font-bold shadow-lg">
          {loading ? <Loader2 className="animate-spin" /> : (type === "login" ? "Sign In" : "Get Started")}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>New to Keylo? <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link></>
        )}
      </div>
      
      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest pt-4">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  )
}
