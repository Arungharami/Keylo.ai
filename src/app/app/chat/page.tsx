
"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { AppSidebar } from "@/components/app/AppSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, 
  Sparkles, 
  User, 
  Heart, 
  BrainCircuit, 
  MessageCircle, 
  AlertCircle
} from "lucide-react"
import { aiChatInteraction } from "@/ai/flows/ai-chat-interaction-flow"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { 
  useUser, 
  useFirestore, 
  useDoc, 
  useCollection, 
  useMemoFirebase, 
  addDocumentNonBlocking,
  updateDocumentNonBlocking
} from "@/firebase"
import { doc, collection, query, orderBy, serverTimestamp, limit } from "firebase/firestore"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"

type Message = {
  id?: string
  role: 'user' | 'model'
  content: string
  timestamp?: any
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()

  // Firestore Refs stabilized with useMemoFirebase
  const usageRef = useMemoFirebase(() => user ? doc(db, 'users', user.uid, 'usage', 'stats') : null, [user, db])
  const profileRef = useMemoFirebase(() => user ? doc(db, 'users', user.uid, 'profile', 'info') : null, [user, db])
  const memoryRef = useMemoFirebase(() => user ? doc(db, 'users', user.uid, 'aiChatMemory', 'main') : null, [user, db])
  const messagesCollectionRef = useMemoFirebase(() => user ? collection(db, 'users', user.uid, 'messages') : null, [user, db])
  
  const messagesQuery = useMemoFirebase(() => 
    messagesCollectionRef ? query(messagesCollectionRef, orderBy('timestamp', 'asc'), limit(50)) : null
  , [messagesCollectionRef])

  const { data: usage } = useDoc(usageRef)
  const { data: profile } = useDoc(profileRef)
  const { data: memory } = useDoc(memoryRef)
  const { data: messages } = useCollection<Message>(messagesQuery)

  const isGuest = user?.isAnonymous || false
  const messageLimit = isGuest ? 5 : 15 
  const currentCount = usage?.messageCountToday || 0
  const isPremium = usage?.isPremiumUser || false
  const limitReached = !isPremium && currentCount >= messageLimit

  // Smooth scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isTyping || !user) return

    if (limitReached) {
      setShowLimitModal(true)
      return
    }

    const messageContent = input
    setInput("")
    setIsTyping(true)

    // 1. Save User Message - Non-blocking for snappy UI
    if (messagesCollectionRef) {
      addDocumentNonBlocking(messagesCollectionRef, {
        role: 'user',
        content: messageContent,
        timestamp: serverTimestamp(),
      })
    }

    // 2. Update Usage Count - Non-blocking
    if (usageRef) {
      updateDocumentNonBlocking(usageRef, {
        messageCountToday: currentCount + 1,
        updatedAt: serverTimestamp()
      })
    }

    try {
      // 3. AI Interaction - Must await result
      const { response, sentiment } = await aiChatInteraction({
        message: messageContent,
        history: messages?.map(m => ({ role: m.role, content: m.content })).slice(-10) || [],
        userName: profile?.displayName || "Friend",
        memory: {
          facts: memory?.facts || [],
          preferences: memory?.preferences || []
        }
      })

      // 4. Save AI Response
      if (messagesCollectionRef) {
        addDocumentNonBlocking(messagesCollectionRef, {
          role: 'model',
          content: response,
          timestamp: serverTimestamp(),
        })
      }

      // 5. Intelligence Update - Background memory enrichment
      if (sentiment.toLowerCase().includes('sad') && memoryRef) {
        const updatedFacts = [...(memory?.facts || []), `User felt sad on ${new Date().toLocaleDateString()}`]
        updateDocumentNonBlocking(memoryRef, { 
          facts: updatedFacts.slice(-20), 
          updatedAt: serverTimestamp() 
        })
      }

    } catch (error) {
      toast({
        title: "Keylo is momentary unavailable",
        description: "I'm having a little trouble connecting. Let's try again in a moment.",
        variant: "destructive"
      })
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col relative md:ml-72 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(187,82,247,0.05),transparent)]">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg animate-breathe">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-bold text-base leading-none">Keylo</h2>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mt-1">Companion Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {!isPremium && (
              <div className="hidden sm:flex flex-col items-end">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Daily Usage</div>
                <div className="text-[11px] font-black text-primary">{currentCount}/{messageLimit} Messages</div>
              </div>
            )}
            <Button asChild size="sm" className="premium-gradient text-white rounded-full h-9 px-6 font-bold text-xs shadow-xl hover:scale-105 transition-transform">
              <Link href="/app/billing">
                {isPremium ? "Premium Active" : "Go Premium"}
              </Link>
            </Button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth scrollbar-hide">
          {(!messages || messages.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="w-24 h-24 rounded-[2.5rem] premium-gradient flex items-center justify-center text-white shadow-2xl animate-float">
                <Heart size={48} fill="currentColor" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-headline font-bold tracking-tight">Hi! I'm <span className="text-gradient">Keylo.</span></h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I'm your intelligent, private companion. How can I support you today?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {[
                  { text: "I need to vent", icon: MessageCircle },
                  { text: "Creative Spark", icon: BrainCircuit },
                  { text: "Reflection time", icon: Heart },
                  { text: "Just say hi", icon: Sparkles }
                ].map((s) => (
                  <button 
                    key={s.text}
                    onClick={() => { setInput(s.text); }}
                    className="p-5 rounded-2xl glass border-white/5 hover:border-primary/40 hover:bg-primary/5 text-sm font-bold transition-all text-left flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                      <s.icon size={18} />
                    </div>
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages?.map((msg, idx) => (
            <div key={msg.id || idx} className={cn(
              "flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform hover:scale-110",
                msg.role === 'user' ? "bg-muted border-white/10" : "premium-gradient text-white border-none shadow-xl"
              )}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
              </div>
              <div className={cn(
                "p-5 rounded-3xl text-sm md:text-base leading-relaxed whitespace-pre-wrap chat-bubble-shadow",
                msg.role === 'user' ? "bg-primary/10 border border-primary/20" : "bg-card/80 border border-white/10 backdrop-blur-md"
              )}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 animate-in fade-in duration-300">
              <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center text-white shrink-0 shadow-xl animate-pulse">
                <Sparkles size={18} />
              </div>
              <div className="p-4 bg-card/80 border border-white/10 rounded-[1.5rem] flex gap-1.5 items-center backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-duration:0.6s]" />
                <span className="w-2 h-2 bg-primary/80 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-8 bg-gradient-to-t from-background via-background/95 to-transparent">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
            <Input 
              placeholder="Message Keylo..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-16 md:h-20 pl-8 pr-24 bg-card/80 border-white/10 focus:ring-primary rounded-[2.5rem] text-lg shadow-2xl transition-all backdrop-blur-xl"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-2xl premium-gradient text-white flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <Send size={24} />
            </button>
          </form>
          <div className="flex justify-center mt-4">
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.25em] font-bold flex items-center gap-2">
              <AlertCircle size={10} /> Keylo is here to listen. Stay safe.
            </p>
          </div>
        </div>

        <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
          <DialogContent className="glass rounded-[2.5rem] border-white/10 max-w-sm p-8 text-center sm:rounded-[3rem]">
            <DialogHeader>
              <div className="w-20 h-20 rounded-3xl premium-gradient flex items-center justify-center text-white mx-auto mb-6 shadow-2xl animate-float">
                <Sparkles size={40} />
              </div>
              <DialogTitle className="text-3xl font-headline font-bold">Limit Reached</DialogTitle>
              <DialogDescription className="text-muted-foreground text-lg py-4">
                {isGuest 
                  ? "Enjoying our chat? Create an account to keep the conversation going!" 
                  : "You've reached your daily limit. Go Premium for unlimited heart-to-hearts."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-3 sm:flex-col mt-4">
              <Button asChild className="w-full h-14 premium-gradient text-lg font-bold rounded-2xl shadow-xl">
                <Link href={isGuest ? "/signup" : "/app/billing"}>
                  {isGuest ? "Sign Up Now" : "Unlock Premium"}
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => setShowLimitModal(false)} className="w-full h-12 text-muted-foreground font-bold hover:text-foreground">
                Maybe later
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
