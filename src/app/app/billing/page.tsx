
"use client"

import { AppSidebar } from "@/components/app/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Check, Sparkles, CreditCard, Calendar, Clock, ArrowUpRight, Zap, Gem, Heart } from "lucide-react"
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"

export default function BillingPage() {
  const { user } = useUser()
  const db = useFirestore()
  const usageRef = useMemoFirebase(() => user ? doc(db, 'users', user.uid, 'usage', 'stats') : null, [user, db])
  const { data: usage } = useDoc(usageRef)
  const isPremium = usage?.isPremiumUser || false

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 md:ml-72 p-6 md:p-12 overflow-y-auto bg-[radial-gradient(circle_at_bottom_left,rgba(60,201,250,0.05),transparent)]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Billing & <span className="text-gradient">Premium</span></h1>
            <p className="text-muted-foreground text-lg">Manage your plan and experience the full depth of Keylo's empathy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="glass border-primary/30 rounded-[3rem] overflow-hidden shadow-2xl bg-card/60 animate-in slide-in-from-bottom-8 duration-700">
              <div className="p-12 space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    {isPremium ? "Elite Member" : "Current Plan: Free"}
                  </div>
                  <h2 className="text-4xl font-bold">{isPremium ? "Keylo Premium" : "Keylo Free"}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isPremium 
                      ? "You have full access to all emotionally intelligent features." 
                      : "Experience more with Premium. Unlock a world of intelligent, private conversation."}
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Premium Benefits</p>
                  <ul className="grid grid-cols-1 gap-4">
                    {[
                      { text: "Unlimited empathic conversations", icon: Heart },
                      { text: "Deep memory across all sessions", icon: Zap },
                      { text: "Monthly creative journal summaries", icon: Gem },
                      { text: "Priority access to new personas", icon: Sparkles },
                      { text: "Instant thinking time", icon: Clock }
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-medium">
                        <div className="bg-primary/20 p-2 rounded-xl text-primary">
                          <benefit.icon size={16} />
                        </div>
                        {benefit.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {!isPremium && (
                  <Button className="w-full h-16 premium-gradient font-black text-xl shadow-2xl shadow-primary/30 rounded-2xl hover:scale-[1.02] transition-all">
                    Unlock Premium Now
                  </Button>
                )}
              </div>
            </Card>

            <div className="space-y-8">
              <Card className="glass border-white/5 rounded-[2.5rem] overflow-hidden bg-card/40">
                <CardHeader className="bg-white/5 p-8">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold"><CreditCard size={20} className="text-secondary" /> Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-[2rem] space-y-6 group hover:border-primary/50 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <CreditCard size={32} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">No saved methods</p>
                      <p className="text-sm text-muted-foreground mt-1">Add a card for seamless upgrades.</p>
                    </div>
                    <Button variant="secondary" className="h-12 px-10 rounded-xl font-bold shadow-lg">Add Card</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/5 rounded-[2.5rem] overflow-hidden bg-card/40">
                <CardHeader className="bg-white/5 p-8">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold"><Clock size={20} className="text-primary" /> Billing History</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="space-y-1">
                        <p className="font-bold">No invoices found</p>
                        <p className="text-xs text-muted-foreground">You haven't made any purchases yet.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-white/5 p-6 justify-center">
                  <Button variant="link" className="text-sm font-bold text-muted-foreground hover:text-primary flex items-center gap-2">
                    Manage in Stripe Portal <ArrowUpRight size={14} />
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
