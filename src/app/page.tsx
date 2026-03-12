
import { LandingNavbar } from "@/components/landing/LandingNavbar"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { Testimonials } from "@/components/landing/Testimonials"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        <Hero />
        
        <section id="how-it-works" className="py-24 border-y border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-16">Get started in 3 simple steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center text-2xl font-bold mx-auto shadow-xl">1</div>
                <h3 className="text-xl font-bold">Create your account</h3>
                <p className="text-muted-foreground">Sign up in seconds with Google or email. 100% private.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold mx-auto shadow-xl text-secondary-foreground">2</div>
                <h3 className="text-xl font-bold">Start chatting instantly</h3>
                <p className="text-muted-foreground">Begin your first conversation. No training needed.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold mx-auto shadow-xl">3</div>
                <h3 className="text-xl font-bold">Experience Premium</h3>
                <p className="text-muted-foreground">Unlock unlimited chat and advanced companion features.</p>
              </div>
            </div>
          </div>
        </section>

        <Features />
        <Testimonials />
        <FAQ />

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient opacity-10 blur-3xl -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center space-y-8 border-white/10">
              <h2 className="text-3xl md:text-6xl font-headline font-bold">Ready to unlock <span className="text-gradient">better conversations?</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of others who have found their perfect AI companion. Start your journey with Keylo today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="h-14 px-10 premium-gradient text-lg font-bold group">
                  <Link href="/signup" className="flex items-center gap-2">
                    Try Keylo Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 glass hover:bg-white/5 border-white/20">
                  <Link href="/pricing">Explore Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
