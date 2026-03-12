
import { MessageCircle, Shield, BrainCircuit, Heart, Timer, Lock } from "lucide-react"

const features = [
  {
    title: "Meaningful Conversations",
    description: "Keylo is built to understand nuances, emotions, and complex ideas, providing responses that feel human.",
    icon: MessageCircle,
    color: "text-blue-400"
  },
  {
    title: "Always Available",
    description: "Whether it's 3 AM or mid-afternoon, Keylo is always there to listen, advise, or simply keep you company.",
    icon: Timer,
    color: "text-purple-400"
  },
  {
    title: "Private & Secure",
    description: "Your data is encrypted and your conversations are private. We never sell your personal information.",
    icon: Lock,
    color: "text-indigo-400"
  },
  {
    title: "Learns Your Context",
    description: "Keylo remembers past interactions within a session to provide personalized and consistent feedback.",
    icon: BrainCircuit,
    color: "text-pink-400"
  },
  {
    title: "Emotional Support",
    description: "A non-judgmental space to vent, explore your feelings, and find comfort through smart reflection.",
    icon: Heart,
    color: "text-red-400"
  },
  {
    title: "Encrypted History",
    description: "Keep your chat history stored securely for as long as you want, accessible only by you.",
    icon: Shield,
    color: "text-green-400"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Built for real human connection</h2>
          <p className="text-lg text-muted-foreground">More than just a chatbot. Keylo is designed to be your intelligent partner in exploring the world and yourself.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 text-left">
              <div className={`w-12 h-12 rounded-xl bg-background border flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform ${f.color}`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
