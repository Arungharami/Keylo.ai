
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight, ShieldCheck, Zap } from "lucide-react"

export function Hero() {
  const mockup = PlaceHolderImages.find(img => img.id === "hero-mockup")

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap size={14} /> AI Companion for Private Conversations
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1]">
              Conversations that <span className="text-gradient">actually feel real.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Keylo helps you chat, reflect, and explore ideas through a premium AI experience designed to feel private, responsive, and always within reach.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="h-14 px-8 premium-gradient text-lg font-semibold group shadow-xl">
                <Link href="/signup" className="flex items-center gap-2">
                  Start Chatting <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 glass border-white/10 hover:bg-white/5 transition-colors">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                100% Private & Secure
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-secondary" />
                Instant Response
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-[500px]">
            <div className="relative z-10 rounded-[2.5rem] border-8 border-muted overflow-hidden shadow-2xl bg-card">
              <Image 
                src={mockup?.imageUrl || ""} 
                alt={mockup?.description || "Mockup"} 
                width={500}
                height={1000}
                className="w-full h-auto object-cover"
                data-ai-hint={mockup?.imageHint}
              />
            </div>
            {/* Glow effect behind phone */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 scale-95" />
          </div>
        </div>
      </div>
    </section>
  )
}
