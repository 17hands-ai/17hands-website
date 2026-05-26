import { motion } from "framer-motion";
import { Link } from "wouter";
import { PhoneCall, MessageSquare, Clock, CalendarCheck, ShieldCheck, Settings, Users, Workflow } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";

export default function Home() {
  const scrollToNext = () => {
    document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-tight mb-6">
              AI receptionists with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">human touch.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              17hands AI helps service businesses answer more calls, follow up faster, book more appointments, and automate front-desk workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GoldButton href="/contact" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                Book a Strategy Call
              </GoldButton>
              <button 
                onClick={scrollToNext}
                className="text-foreground font-medium uppercase tracking-widest text-sm hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary"
              >
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 md:py-32 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
                The cost of a <br />missed call is rising.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Businesses lose revenue every day from missed calls, slow follow-ups, manual booking errors, and overwhelmed staff. When a potential client calls, they expect an immediate response. If you don't answer, your competitor will.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Missed Calls", value: "30%", desc: "Average missed call rate in service businesses" },
                { label: "Lost Revenue", value: "$4k+", desc: "Estimated monthly loss from poor follow-up" },
                { label: "Staff Time", value: "15hrs", desc: "Weekly time spent on manual booking" },
                { label: "Response Time", value: "24h+", desc: "Average time to return a voicemail" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 border border-border rounded-xl bg-background"
                >
                  <div className="text-3xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-primary/5 rounded-l-[100px] -z-10" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-6">
              Technology that speaks your language.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We design AI receptionists that answer calls, qualify leads, book appointments, send SMS follow-ups, handle FAQs, and route urgent requests. It’s not about robots replacing people—it’s about giving your team the space to focus on the human connections that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-primary font-medium mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-semibold">Comprehensive Automation</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              title="AI Receptionist" 
              description="24/7 intelligent call answering that sounds natural and handles complex inquiries." 
              icon={<PhoneCall />} 
              delay={0.1} 
            />
            <ServiceCard 
              title="Missed Call Text Back" 
              description="Instantly engage missed calls via SMS to capture leads before they call competitors." 
              icon={<MessageSquare />} 
              delay={0.2} 
            />
            <ServiceCard 
              title="Lead Qualification" 
              description="Automated screening to ensure your team only spends time on high-value prospects." 
              icon={<ShieldCheck />} 
              delay={0.3} 
            />
            <ServiceCard 
              title="Appointment Booking" 
              description="Seamless scheduling integrated directly with your existing calendar software." 
              icon={<CalendarCheck />} 
              delay={0.4} 
            />
            <ServiceCard 
              title="SMS Follow-Up" 
              description="Strategic nurture sequences that keep your business top-of-mind." 
              icon={<Clock />} 
              delay={0.5} 
            />
            <ServiceCard 
              title="Review Request" 
              description="Automated post-appointment messages to build your online reputation." 
              icon={<Users />} 
              delay={0.6} 
            />
            <ServiceCard 
              title="CRM Integration" 
              description="Perfect synchronization with your existing tools—no workflow disruption." 
              icon={<Settings />} 
              delay={0.7} 
            />
            <ServiceCard 
              title="Custom Workflows" 
              description="Bespoke automation designed specifically for your unique operational needs." 
              icon={<Workflow />} 
              delay={0.8} 
            />
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-medium uppercase tracking-widest text-sm hover:text-primary/80 transition-colors">
              Explore all services
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-serif font-semibold mb-6 leading-tight"
              >
                Built for service professionals.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                We understand the nuances of client service. Our systems are tailored to the specific needs of premium service businesses.
              </motion.p>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Med Spas", "Dental Offices", "Wellness Clinics", "Beauty Studios", "Local Service Businesses"].map((industry, i) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-6 rounded-xl border border-border flex items-center gap-4 transition-colors",
                      i === 0 ? "bg-primary/10 border-primary/30" : "bg-card hover:border-primary/50"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-primary" : "bg-muted-foreground")} />
                    <span className="font-serif text-xl">{industry}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative bg-card border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8">
              Ready to elevate your front desk?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Schedule a strategy call to discover how AI automation can transform your client experience and increase revenue.
            </p>
            <GoldButton href="/contact" size="lg" className="text-lg px-10 py-7">
              Request Strategy Call
            </GoldButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
