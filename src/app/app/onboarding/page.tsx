
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, BrainCircuit, Heart, MessageCircle, Smile } from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  {
    title: "Welcome to Keylo",
    subtitle: "Your intelligent AI companion for private, meaningful conversations.",
    icon: Sparkles,
    type: "welcome"
  },
  {
    title: "Choose your chat style",
    subtitle: "How would you like Keylo to communicate with you?",
    options: [
      { id: "supportive", label: "Supportive & Warm", icon: Heart },
      { id: "intellectual", label: "Intellectual & Analytic", icon: BrainCircuit },
      { id: "casual", label: "Casual & Friendly", icon: Smile },
      { id: "professional", label: "Direct & Professional", icon: MessageCircle },
    ]
  },
  {
    title: "One last thing",
    subtitle: "What brings you to Keylo today?",
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/app/chat")
    }
  }

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [currentStep]: optionId })
    handleNext()
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${i <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <div className="space-y-4">
          {step.icon && <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center text-white mx-auto shadow-xl mb-6"><step.icon size={32} /></div>}
          <h1 className="text-4xl md:text-5xl font-headline font-bold">{step.title}</h1>
          <p className="text-xl text-muted-foreground">{step.subtitle}</p>
        </div>

        {step.type === "welcome" ? (
          <Button onClick={handleNext} size="lg" className="h-14 px-12 premium-gradient text-lg font-bold group shadow-xl">
            Let's Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
            {step.options?.map((option) => (
              <Card 
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="group p-6 glass border-white/5 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-300 flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/20 group-hover:text-primary flex items-center justify-center transition-colors">
                  <option.icon size={24} />
                </div>
                <span className="font-bold text-lg">{option.label}</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
