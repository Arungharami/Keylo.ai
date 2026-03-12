
"use client"

import { AppSidebar } from "@/components/app/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Check, Sparkles, CreditCard, Calendar, Clock, ArrowUpRight } from "lucide-react"

export default function BillingPage() {
  const plans = [
    {
      name: "Monthly",
      price: "$9.99",
      active: false,
    },
    {
      name: "Yearly",
      price: "$69.99",
      active: false,
      save: "40% OFF"
    }
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 md:ml-72 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your plan, payment methods, and invoices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass border-primary/30 rounded-[2.5rem] overflow-hidden shadow-2xl bg-card">
              <div className="p-10 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                    Current Plan
                  </div>
                  <h2 className="text-3xl font-bold">Keylo Free</h2>
                  <p className="text-muted-foreground">You are currently on the limited free tier. Experience more with Premium.</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Premium Benefits</p>
                  <ul className="space-y-3">
                    {[
                      "Unlimited conversations",
                      "Priority response times",
                      "Deep memory across sessions",
                      "Access to all AI personalities",
                      "Exclusive premium support"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <div className="bg-primary/20 p-1 rounded-full text-primary">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full h-14 premium-gradient font-bold text-lg shadow-xl shadow-primary/20">
                  Upgrade to Premium
                </Button>
              </div>
            </Card>

            <div className="space-y-8">
              <Card className="glass border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-white/5">
                  <CardTitle className="flex items-center gap-2 text-sm"><CreditCard size={18} /> Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-2xl space-y-4">
                    <CreditCard size={32} className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No payment methods saved</p>
                    <Button variant="outline" className="glass h-10 px-6">Add Card</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-white/5">
                  <CardTitle className="flex items-center gap-2 text-sm"><Clock size={18} /> Billing History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <div className="space-y-1">
                        <p className="font-bold text-sm">No invoices found</p>
                        <p className="text-xs text-muted-foreground">You haven't made any purchases yet.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-white/5 p-4 justify-center">
                  <Button variant="link" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                    Manage in Stripe Portal <ArrowUpRight size={12} />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
