
"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/app/AppSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Loader2, User } from "lucide-react"
import { aiChatInteraction } from "@/ai/flows/ai-chat-interaction-flow"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type Message = {
  role: 'user' | 'model'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [freeMessagesLeft, setFreeMessagesLeft] = useState(5)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || loading) return

    if (freeMessagesLeft <= 0) {
      toast({
        title: "Daily limit reached",
        description: "Upgrade to Premium for unlimited conversations.",
        variant: "destructive"
      })
      return
    }

    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const { response } = await aiChatInteraction({
        message: input,
        history: messages
      })
      setMessages(prev => [...prev, { role: 'model', content: response }])
      setFreeMessagesLeft(prev => prev - 1)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to get a response from Keylo.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col relative md:ml-72 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-card/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="font-bold text-sm">Keylo AI</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Free Limit:</div>
              <div className="text-[10px] font-bold text-primary">{freeMessagesLeft}/10 messages left</div>
            </div>
            <Button size="sm" variant="outline" className="premium-gradient text-white border-none h-8 font-bold text-xs px-4 rounded-full">
              Upgrade
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="w-20 h-20 rounded-3xl premium-gradient flex items-center justify-center text-white shadow-2xl animate-pulse">
                <Sparkles size={40} />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold">I'm Keylo.</h1>
                <p className="text-muted-foreground text-lg">Your intelligent, private companion. How can I help you today?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {["Need to vent", "Brainstorm an idea", "Just chat", "Ask for advice"].map((suggestion) => (
                  <button 
                    key={suggestion}
                    onClick={() => { setInput(suggestion); }}
                    className="p-4 rounded-2xl glass border-white/5 hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-all text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={cn(
              "flex gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                msg.role === 'user' ? "bg-muted border-white/5" : "premium-gradient text-white border-none shadow-lg"
              )}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
              </div>
              <div className={cn(
                "p-4 md:p-5 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm",
                msg.role === 'user' ? "bg-white/5 border border-white/5" : "bg-card border border-white/10"
              )}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 animate-in fade-in duration-300">
              <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shrink-0 shadow-lg">
                <Loader2 size={18} className="animate-spin" />
              </div>
              <div className="p-4 bg-card border border-white/10 rounded-2xl flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-background via-background/95 to-transparent">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
            <Input 
              placeholder="Talk to Keylo..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-16 md:h-20 pl-6 pr-20 bg-card border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent rounded-[2rem] text-lg shadow-2xl transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-2xl premium-gradient text-white flex items-center justify-center disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
            Keylo can make mistakes. Consider checking important info.
          </p>
        </div>
      </main>
    </div>
  )
}
