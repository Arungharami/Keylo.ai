
"use client"

import { AppSidebar } from "@/components/app/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, CreditCard, Shield, LogOut, ChevronRight, Sparkles } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 md:ml-72 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile, subscription, and security preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="glass border-white/10 overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-white/5">
                  <CardTitle className="flex items-center gap-2"><User size={20} /> Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl premium-gradient flex items-center justify-center text-white text-3xl font-bold shadow-xl">JS</div>
                    <Button variant="outline" className="glass border-white/10">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input defaultValue="John Smith" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input defaultValue="john@example.com" disabled className="bg-white/5 border-white/10 opacity-50" />
                    </div>
                  </div>
                  <Button className="premium-gradient">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/10 overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-white/5">
                  <CardTitle className="flex items-center gap-2"><Shield size={20} /> Security</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5">
                      <div className="space-y-1">
                        <p className="font-bold">Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                      <Button variant="outline" className="glass">Update</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5">
                      <div className="space-y-1">
                        <p className="font-bold">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" className="glass">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass border-primary/20 overflow-hidden rounded-[2rem] relative">
                <div className="absolute top-0 right-0 p-4">
                  <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={10} /> Free
                  </div>
                </div>
                <CardHeader className="bg-white/5">
                  <CardTitle className="flex items-center gap-2"><CreditCard size={20} /> Plan Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-center">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">Keylo Free</p>
                    <p className="text-sm text-muted-foreground">5 messages used today</p>
                  </div>
                  <Button className="w-full premium-gradient font-bold h-12 shadow-lg">Upgrade Now</Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-between h-14 glass border-white/10 rounded-2xl hover:bg-white/5 px-6">
                  <span className="flex items-center gap-3 font-bold text-destructive"><LogOut size={20} /> Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
