
"use client"

import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MessageSquare, 
  User, 
  CreditCard, 
  LogOut, 
  Settings, 
  Sparkles,
  Trash2,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Mock chat history
  const history = [
    { id: "1", title: "Morning Reflection" },
    { id: "2", title: "Business Ideas" },
    { id: "3", title: "Quick Vent Session" },
  ]

  const navItems = [
    { name: "New Chat", icon: Plus, href: "/app/chat", premium: false },
    { name: "Account", icon: User, href: "/app/account", premium: false },
    { name: "Billing", icon: CreditCard, href: "/app/billing", premium: false },
  ]

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-white/10 shadow-lg text-foreground"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles size={18} />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">Keylo.ai</span>
          </Link>
          <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
            Free
          </div>
        </div>

        <div className="p-4">
          <Button asChild className="w-full h-12 premium-gradient shadow-lg font-bold gap-2">
            <Link href="/app/chat"><Plus size={18} /> New Chat</Link>
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto px-2 py-4 space-y-6">
          <div className="space-y-1">
            <h4 className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">History</h4>
            {history.map((chat) => (
              <Link 
                key={chat.id} 
                href={`/app/chat/${chat.id}`}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-xl transition-colors",
                  pathname.includes(chat.id) ? "bg-primary/10 text-primary" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={16} />
                  <span className="text-sm truncate font-medium">{chat.title}</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all">
                  <Trash2 size={14} />
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          {navItems.map((item) => (
            <Button key={item.name} asChild variant="ghost" className={cn(
              "w-full justify-start h-11 font-medium gap-3 rounded-xl",
              pathname === item.href ? "bg-white/5 text-foreground" : "text-muted-foreground hover:text-foreground"
            )}>
              <Link href={item.href}>
                <item.icon size={18} /> {item.name}
              </Link>
            </Button>
          ))}
          <Button variant="ghost" className="w-full justify-start h-11 font-medium gap-3 rounded-xl text-muted-foreground hover:text-destructive">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
