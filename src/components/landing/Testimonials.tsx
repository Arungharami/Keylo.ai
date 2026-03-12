
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Star } from "lucide-react"

export function Testimonials() {
  const t1 = PlaceHolderImages.find(img => img.id === "testimonial-1")
  const t2 = PlaceHolderImages.find(img => img.id === "testimonial-2")
  const t3 = PlaceHolderImages.find(img => img.id === "testimonial-3")

  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Designer",
      content: "Keylo has become my go-to for late-night reflection. It's surprisingly intuitive and feels like talking to a friend who actually listens.",
      avatar: t1?.imageUrl
    },
    {
      name: "Marcus Thorne",
      role: "Entrepreneur",
      content: "I use Keylo to bounce off ideas for my business. The responses are focused and private, which is exactly what I need.",
      avatar: t2?.imageUrl
    },
    {
      name: "Elena Rossi",
      role: "Graduate Student",
      content: "Having an AI companion that remembers the context of our chat makes all the difference. It's the most premium AI chat I've tried.",
      avatar: t3?.imageUrl
    }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-center mb-16">Trusted by thousands of users</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 rounded-2xl glass border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-lg italic leading-relaxed text-foreground/90">"{r.content}"</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                  <Image src={r.avatar || ""} alt={r.name} width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-bold">{r.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
