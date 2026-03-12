
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is Keylo really private?",
    a: "Yes. Privacy is our cornerstone. Your conversations are encrypted and never used for training models without explicit consent, nor are they sold to third parties."
  },
  {
    q: "Can I use Keylo on my phone?",
    a: "Absolutely. Keylo is a mobile-first web app, meaning it works perfectly in any browser on iOS or Android, and can even be added to your home screen."
  },
  {
    q: "What do I get for free?",
    a: "New users receive a daily allowance of free messages to experience the intelligence and warmth of Keylo without any commitment."
  },
  {
    q: "How does the subscription work?",
    a: "Our Premium subscription unlocks unlimited conversations, faster response times, and early access to new conversational styles."
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, you can manage your subscription easily from your account dashboard and cancel whenever you like, no questions asked."
  }
]

export function FAQ() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-center mb-16">Questions? We have answers.</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/5">
              <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
