import { motion } from "framer-motion";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

export default function CaseStudies() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-sm uppercase tracking-widest text-primary font-medium mb-4">Case Studies</h1>
          <h2 className="text-5xl md:text-6xl font-serif font-semibold mb-6">Proven outcomes.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We measure success in revenue recovered, hours saved, and client experiences elevated. Review how our systems perform in the real world.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          <CaseStudyCard 
            title="Med Spa Lead Response System"
            challenge="A high-end aesthetics practice was losing an estimated 30% of inbound leads due to calls rolling to voicemail during peak treatment hours."
            solution="Implemented 17hands AI Receptionist with immediate fallback to SMS. The system answers FAQs regarding treatments and books initial consultations directly into their Jane App calendar."
            result="Client outcomes pending full quarterly review. Initial data shows zero dropped calls during business hours."
            delay={0.1}
          />
          
          <CaseStudyCard 
            title="Appointment Follow-Up Automation"
            challenge="A dental office struggled with a high no-show rate and manual recall calls taking up 15+ hours of front-desk time per week."
            solution="Deployed a custom SMS and Voice automated recall sequence that confirms appointments 48 hours prior and reaches out to patients due for cleanings."
            result="Results to be published in upcoming case study report."
            delay={0.2}
          />
          
          <CaseStudyCard 
            title="Missed Call Recovery Workflow"
            challenge="A wellness clinic had no system for capturing after-hours inquiries, resulting in potential clients booking with competitors."
            solution="Integrated our Missed Call Text Back system combined with 24/7 AI conversational booking to capture intent instantly."
            result="Detailed performance metrics and revenue capture data will be released shortly."
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
}
