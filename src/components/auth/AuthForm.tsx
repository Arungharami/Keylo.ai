
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Github, Chrome, Eye, EyeOff, Loader2, UserCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth, useUser } from "@/firebase"
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from "@/firebase/non-blocking-login"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const auth = useAuth()
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  // Senior Pattern: Listen for auth state changes to trigger redirection
  useEffect(() => {
    if (user && !isUserLoading) {
      // Direct users to onboarding for their first journey, or chat if they are returning
      // For this MVP, we always start at onboarding which handles the profile check
      router.push("/app/onboarding")
    }
  }, [user, isUserLoading, router])

  const handleGuestAccess = () => {
    setLoading(true)
    initiateAnonymousSignIn(auth)
    toast({
      title: "Starting guest session...",
      description: "Welcome! I'm getting things ready for you.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (type === "signup") {
      initiateEmailSignUp(auth, email, password)
    } else {
      initiateEmailSignIn(auth, email, password)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 glass p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500">
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

      <div className="space-y-4">
        <Button 
          onClick={handleGuestAccess}
          variant="secondary" 
          disabled={loading}
          className="w-full h-14 rounded-2xl font-bold gap-2 text-lg shadow-lg hover:scale-[1.02] transition-transform"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><UserCircle size={22} /> Continue as Guest</>}
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 glass border-white/10 hover:bg-white/5 transition-colors gap-2">
            <Chrome size={18} /> Google
          </Button>
          <Button variant="outline" className="h-12 glass border-white/10 hover:bg-white/5 transition-colors gap-2">
            <Github size={18} /> Github
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground">Or continue with email</span></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-white/5 border-white/10 focus:ring-primary rounded-xl" 
          />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white/5 border-white/10 focus:ring-primary pr-12 rounded-xl" 
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

        <Button type="submit" disabled={loading} className="w-full h-14 premium-gradient text-lg font-bold shadow-lg rounded-2xl hover:scale-[1.02] transition-transform">
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
