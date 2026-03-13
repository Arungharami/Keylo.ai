
"use client"

import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MessageSquare, 
  User, 
  CreditCard, 
  LogOut, 
  Sparkles,
  Trash2,
  Menu,
  X,
  Gem
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase, useAuth, deleteDocumentNonBlocking } from "@/firebase"
import { doc, collection, query, orderBy, limit } from "firebase/firestore"
import { signOut } from "firebase/auth"

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const db = useFirestore()
  const auth = useAuth()
  const isGuest = user?.isAnonymous || false

  // Memoized refs and queries for performance
  const usageRef = useMemoFirebase(() => user ? doc(db, 'users', user.uid, 'usage', 'stats') : null, [user, db])
  const conversationsRef = useMemoFirebase(() => user ? collection(db, 'users', user.uid, 'conversations') : null, [user, db])
  const conversationsQuery = useMemoFirebase(() => 
    conversationsRef ? query(conversationsRef, orderBy('updatedAt', 'desc'), limit(10)) : null
  , [conversationsRef])

  const { data: usage } = useDoc(usageRef)
  const { data: conversations } = useCollection(conversationsQuery)
  const isPremium = usage?.isPremiumUser || false

  const handleLogout = async () => {
    try {
      await signOut(auth)
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleDeleteConversation = (id: string) => {
    if (user) {
      const convRef = doc(db, 'users', user.uid, 'conversations', id)
      deleteDocumentNonBlocking(convRef)
    }
  }

  const navItems = [
    { name: "My Chat", icon: MessageSquare, href: "/app/chat" },
    { name: "Account", icon: User, href: "/app/account" },
    { name: "Billing", icon: CreditCard, href: "/app/billing" },
  ]

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl glass border-white/10 shadow-2xl text-foreground"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-card/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-500 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">Keylo</span>
          </Link>
          <div className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
            isPremium ? "bg-secondary/10 border-secondary/20 text-secondary" : "bg-primary/10 border-primary/20 text-primary"
          )}>
            {isPremium ? "PRO" : (isGuest ? "GUEST" : "FREE")}
          </div>
        </div>

        <div className="p-6">
          <Button asChild className="w-full h-14 premium-gradient shadow-2xl font-bold gap-2 rounded-2xl hover:scale-[1.02] transition-all">
            <Link href="/app/chat"><Plus size={20} strokeWidth={3} /> Let's Chat</Link>
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
          <div className="space-y-2">
            <h4 className="px-4 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Past Sessions</h4>
            {conversations && conversations.length > 0 ? (
              conversations.map((chat) => (
                <div 
                  key={chat.id} 
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                    pathname.includes(chat.id) ? "bg-primary/10 text-primary" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Link href={`/app/chat/${chat.id}`} className="flex items-center gap-3 overflow-hidden flex-1">
                    <MessageSquare size={18} className={pathname.includes(chat.id) ? "text-primary" : ""} />
                    <span className="text-sm truncate font-bold">{chat.title || "New Chat"}</span>
                  </Link>
                  <button 
                    onClick={() => handleDeleteConversation(chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-[11px] text-muted-foreground italic">No sessions yet</div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-white/5 space-y-3 bg-white/[0.02]">
          {navItems.map((item) => (
            <Button key={item.name} asChild variant="ghost" className={cn(
              "w-full justify-start h-12 font-bold gap-4 rounded-2xl transition-all",
              pathname === item.href ? "bg-white/5 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}>
              <Link href={item.href}>
                <item.icon size={20} /> {item.name}
              </Link>
            </Button>
          ))}
          
          {isPremium && (
            <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 mt-4">
              <div className="flex items-center gap-2 text-secondary mb-1">
                <Gem size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">Advanced intelligence & memory enabled.</p>
            </div>
          )}

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start h-12 font-bold gap-4 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          >
            <LogOut size={20} /> Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
