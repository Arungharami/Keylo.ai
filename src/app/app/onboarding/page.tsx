
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, BrainCircuit, Heart, MessageCircle, Smile, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from "@/firebase"
import { doc, serverTimestamp } from "firebase/firestore"

const steps = [
  {
    title: "Welcome to Keylo",
    subtitle: "Your intelligent AI companion for private, meaningful conversations.",
    icon: Sparkles,
    type: "welcome"
  },
  {
    title: "Choose your chat style",
    subtitle: "How would you like me to communicate with you?",
    options: [
      { id: "supportive", label: "Supportive & Warm", icon: Heart },
      { id: "intellectual", label: "Intellectual & Analytic", icon: BrainCircuit },
      { id: "casual", label: "Casual & Friendly", icon: Smile },
      { id: "professional", label: "Direct & Professional", icon: MessageCircle },
    ]
  },
  {
    title: "One last thing",
    subtitle: "What brings you to me today?",
    options: [
      { id: "vent", label: "Just need to vent", icon: MessageCircle },
      { id: "brainstorm", label: "Brainstorming ideas", icon: BrainCircuit },
      { id: "growth", label: "Personal growth", icon: Heart },
      { id: "companion", label: "Looking for companionship", icon: Smile },
    ]
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<number, string>>({})
  const router = useRouter()
  const { user } = useUser()
  const db = useFirestore()

  const handleFinish = async () => {
    if (!user) return

    const profileRef = doc(db, 'users', user.uid, 'profile', 'info')
    const usageRef = doc(db, 'users', user.uid, 'usage', 'stats')
    const memoryRef = doc(db, 'users', user.uid, 'aiChatMemory', 'main')

    // Initial setup
    setDocumentNonBlocking(profileRef, {
      userId: user.uid,
      onboardingCompleted: true,
      preferredConversationStyle: selections[1],
      interests: [selections[2]],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true })

    setDocumentNonBlocking(usageRef, {
      userId: user.uid,
      messageCountToday: 0,
      messageCountTotal: 0,
      isPremiumUser: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true })

    setDocumentNonBlocking(memoryRef, {
      userId: user.uid,
      facts: [],
      preferences: [selections[1]],
      summaries: [],
      updatedAt: serverTimestamp()
    }, { merge: true })

    router.push("/app/chat")
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [currentStep]: optionId })
    handleNext()
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      
      <div className="w-full max-w-2xl space-y-12 text-center">
        <div className="flex justify-center gap-3 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 w-16 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-primary shadow-[0_0_10px_rgba(187,82,247,0.5)]' : 'bg-muted'}`} />
          ))}
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {step.icon && (
            <div className="w-24 h-24 rounded-[2rem] premium-gradient flex items-center justify-center text-white mx-auto shadow-2xl mb-8 animate-float">
              <step.icon size={48} />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tight">{step.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">{step.subtitle}</p>
        </div>

        {step.type === "welcome" ? (
          <Button onClick={handleNext} size="lg" className="h-16 px-16 premium-gradient text-xl font-black group shadow-2xl rounded-2xl hover:scale-[1.05] transition-transform">
            Let's do this! <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8 animate-in fade-in zoom-in duration-700">
            {step.options?.map((option) => (
              <Card 
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="group p-8 glass border-white/5 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-500 flex items-center gap-6 text-left rounded-[2rem] hover:scale-[1.02]"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted group-hover:bg-primary/20 group-hover:text-primary flex items-center justify-center transition-all duration-500 shadow-inner">
                  <option.icon size={32} />
                </div>
                <span className="font-bold text-xl">{option.label}</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
