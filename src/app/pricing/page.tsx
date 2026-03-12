
import { LandingNavbar } from "@/components/landing/LandingNavbar"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring Keylo's capabilities.",
    features: [
      "10 free messages daily",
      "Standard response time",
      "Private & secure history",
      "Basic emotional intelligence"
    ],
    cta: "Start for Free",
    link: "/signup",
    premium: false
  },
  {
    name: "Premium Monthly",
    price: "$9.99",
    description: "The complete experience for meaningful connection.",
    features: [
      "Unlimited conversations",
      "Priority response time",
      "Deep context memory",
      "Early access to new styles",
      "Advanced companion logic",
      "Premium support"
    ],
    cta: "Unlock Premium",
    link: "/signup?plan=monthly",
    premium: true,
    highlight: "Most Popular"
  },
  {
    name: "Premium Yearly",
    price: "$69.99",
    description: "Best value for long-term emotional well-being.",
    features: [
      "Everything in Monthly",
      "Save 40% annually",
      "Lifetime feature access",
      "Exclusive yearly themes",
      "Priority feature requests"
    ],
    cta: "Save with Yearly",
    link: "/signup?plan=yearly",
    premium: true,
    save: "40% Savings"
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">Simple, <span className="text-gradient">transparent pricing</span></h1>
            <p className="text-xl text-muted-foreground">Choose the companion plan that fits your lifestyle. Unlock a world of intelligent, private conversation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border flex flex-col h-full transition-transform hover:scale-[1.02] duration-300 ${plan.premium ? 'bg-card border-primary/20 shadow-2xl' : 'bg-card/50 border-white/5'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                    {plan.highlight}
                  </div>
                )}
                {plan.save && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest shadow-lg">
                    {plan.save}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.name.includes("Yearly") ? "year" : "month"}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-0.5 ${plan.premium ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        <Check size={14} />
                      </div>
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" variant={plan.premium ? "default" : "outline"} className={`w-full h-12 font-bold ${plan.premium ? 'premium-gradient' : 'glass border-white/10 hover:bg-white/5'}`}>
                  <Link href={plan.link}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto text-center p-12 glass rounded-3xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-bold">Trusted by professionals and individuals alike</h2>
            <p className="text-muted-foreground">Keylo is more than just a chat. It's a partner for reflection, brainstorming, and support. Join our community and experience the difference.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
