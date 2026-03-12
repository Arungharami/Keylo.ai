
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">Keylo.ai</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Log in</Link>
          <Button asChild size="sm" className="premium-gradient hover:opacity-90 transition-opacity">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
