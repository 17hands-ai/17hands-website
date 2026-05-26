import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoldButton } from "@/components/ui/GoldButton";

export default function FAQ() {
  const faqs = [
    {
      question: "What is an AI receptionist?",
      answer: "An AI receptionist is an intelligent voice system that answers your business calls just like a human would. It uses advanced natural language processing to understand caller intent, answer questions, and perform tasks like booking appointments."
    },
    {
      question: "Can it answer phone calls?",
      answer: "Yes. Our AI can handle inbound calls, conduct multi-turn conversations, understand complex queries, and respond with a natural, professional voice that reflects your brand's tone."
    },
    {
      question: "Can it send SMS messages?",
      answer: "Absolutely. We can configure the system to follow up missed calls with a text, send booking confirmations, or trigger SMS nurture sequences based on specific conversational triggers."
    },
    {
      question: "Does it integrate with my calendar or CRM?",
      answer: "Yes. We pride ourselves on creating systems, not silos. Our AI integrates with major scheduling platforms and CRMs used in service businesses to ensure real-time availability and accurate record-keeping."
    },
    {
      question: "Is this only for med spas?",
      answer: "While we have deep expertise in the med spa and aesthetics space, our systems are highly adaptable. We serve dental offices, wellness clinics, beauty studios, and various high-end local service businesses."
    },
    {
      question: "How long does setup take?",
      answer: "A typical implementation takes 2 to 4 weeks. This includes deep discovery of your operations, customizing the AI's knowledge base, integration testing, and staff training."
    },
    {
      question: "Can I review conversations?",
      answer: "Yes. You have full transparency. Transcripts and audio recordings of all AI interactions are available for your review, allowing you to monitor quality and gather insights."
    },
    {
      question: "What happens when the AI cannot answer?",
      answer: "The AI is programmed with clear boundaries. If it encounters a situation outside its knowledge base or an escalated client issue, it gracefully transfers the call to a human team member or takes a detailed message for urgent follow-up."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing is customized based on call volume, required integrations, and the complexity of the workflows. We offer tiered models designed to provide a clear ROI by capturing missed revenue. Book a strategy call for a detailed assessment."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-sm uppercase tracking-widest text-primary font-medium mb-4">FAQ</h1>
          <h2 className="text-5xl md:text-6xl font-serif font-semibold mb-6">Common inquiries.</h2>
          <p className="text-xl text-muted-foreground">
            Clear answers about our technology and approach.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border py-2">
                <AccordionTrigger className="text-lg md:text-xl font-serif hover:text-primary transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Still have questions?</p>
          <GoldButton href="/contact">Book a Strategy Call</GoldButton>
        </div>
      </div>
    </div>
  );
}
