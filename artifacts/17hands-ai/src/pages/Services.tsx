import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PhoneCall, MessageSquare, ShieldCheck, CalendarCheck, Clock, Users, Settings, Workflow } from "lucide-react";

export default function Services() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="text-sm uppercase tracking-widest text-primary font-medium mb-4">Our Services</h1>
          <h2 className="text-5xl md:text-6xl font-serif font-semibold mb-6">Systems of intelligence.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We build sophisticated automation workflows that feel entirely human. Every service is designed to capture missed revenue and elevate the client experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ServiceCard 
            title="AI Receptionist" 
            description="Our voice AI doesn't sound like a machine. It understands context, handles complex conversational turns, and answers FAQs with the warmth and professionalism your brand demands. Available 24/7/365 without sick days." 
            icon={<PhoneCall />} 
            delay={0.1}
            className="p-10"
          />
          <ServiceCard 
            title="Missed Call Text Back" 
            description="If a call drops or your team is truly occupied, our system immediately sends a personalized SMS to the caller. We convert a frustrating missed connection into a booked appointment via text." 
            icon={<MessageSquare />} 
            delay={0.2}
            className="p-10"
          />
          <ServiceCard 
            title="Lead Qualification" 
            description="Stop wasting staff time on unqualified inquiries. Our system politely gathers necessary information, evaluates prospect fit based on your criteria, and routes high-value leads directly to your team." 
            icon={<ShieldCheck />} 
            delay={0.3}
            className="p-10"
          />
          <ServiceCard 
            title="Appointment Booking" 
            description="Frictionless scheduling. The AI integrates with your calendar (Mindbody, Boulevard, Jane, etc.) to offer available slots, handle rescheduling, and confirm bookings in real-time." 
            icon={<CalendarCheck />} 
            delay={0.4}
            className="p-10"
          />
          <ServiceCard 
            title="SMS Follow-Up" 
            description="Long-term nurture campaigns that don't feel spammy. We design sequences that check in on past clients, offer relevant promotions, and maintain relationships with zero manual effort." 
            icon={<Clock />} 
            delay={0.5}
            className="p-10"
          />
          <ServiceCard 
            title="Review Request Automation" 
            description="Automatically trigger polite, timed requests for reviews after successful appointments. Build your Google and Yelp presence consistently while intercepting negative feedback privately." 
            icon={<Users />} 
            delay={0.6}
            className="p-10"
          />
          <ServiceCard 
            title="CRM / Calendar Integration" 
            description="Technology should reduce silos, not create them. We ensure our AI solutions speak directly to your existing CRM and calendar systems, maintaining a single source of truth for your business." 
            icon={<Settings />} 
            delay={0.7}
            className="p-10"
          />
          <ServiceCard 
            title="Custom Workflow Automation" 
            description="Have a unique operational bottleneck? We consult, design, and deploy bespoke automated workflows that address your specific administrative pain points." 
            icon={<Workflow />} 
            delay={0.8}
            className="p-10"
          />
        </div>
      </div>
    </div>
  );
}
