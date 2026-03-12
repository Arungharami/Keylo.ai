
import Link from "next/link"
import { Sparkles, Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">Keylo.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium AI companion for meaningful, private conversations. Built for humans, powered by intelligence.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Github size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Get Started</Link></li>
              <li><Link href="/login" className="hover:text-foreground">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-foreground">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground">Community</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Keylo.ai. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
