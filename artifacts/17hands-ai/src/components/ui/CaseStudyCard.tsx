import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title: string;
  challenge: string;
  solution: string;
  result: string;
  delay?: number;
}

export function CaseStudyCard({ title, challenge, solution, result, delay = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-8 lg:p-10 rounded-2xl bg-card border border-border relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
      
      <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-foreground">{title}</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-2 font-medium">The Challenge</h4>
          <p className="text-muted-foreground leading-relaxed">{challenge}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-2 font-medium">The Solution</h4>
          <p className="text-muted-foreground leading-relaxed">{solution}</p>
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm uppercase tracking-widest text-primary mb-2 font-medium">The Result</h4>
          <p className="text-foreground font-medium italic">"{result}"</p>
        </div>
      </div>
    </motion.div>
  );
}
