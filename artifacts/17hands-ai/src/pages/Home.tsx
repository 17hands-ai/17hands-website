import { motion } from "framer-motion";
import { Link } from "wouter";
import { PhoneCall, MessageSquare, Clock, CalendarCheck, ShieldCheck, Settings, Users, Workflow } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BrandDivider, CircuitAccent, GoldWaveSVG } from "@/components/ui/BrandDivider";
import { cn } from "@/lib/utils";

export default function Home() {
  const scrollToNext = () => {
    document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        {/* Gold wave decoration top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none select-none">
          <GoldWaveSVG className="h-20" />
        </div>

        {/* Large "17" watermark */}
        <div
          className="absolute right-4 bottom-12 pointer-events-none select-none font-serif font-bold leading-none text-primary/5"
          style={{ fontSize: "clamp(160px, 25vw, 340px)" }}
          aria-hidden
        >
          17
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Circuit accent above headline */}
            <div className="flex justify-center mb-8">
              <CircuitAccent />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-tight mb-6">
              AI systems with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                human touch.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              17hands AI helps service businesses answer more calls, follow up faster,
              book more appointments, and automate front-desk workflows.
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

            {/* Circuit accent below CTAs */}
            <div className="flex justify-center mt-10">
              <CircuitAccent className="rotate-180" />
            </div>
          </motion.div>
        </div>

        {/* Gold wave decoration bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
          <GoldWaveSVG className="h-16 rotate-180" />
        </div>
      </section>

      {/* Brand divider */}
      <BrandDivider className="py-4 bg-background" />

      {/* ── Problem ── */}
      <section id="problem" className="py-24 md:py-32 bg-card relative overflow-hidden">
        {/* Subtle "17" watermark */}
        <div
          className="absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none select-none font-serif font-bold text-primary/4 leading-none"
          style={{ fontSize: "clamp(120px, 18vw, 240px)" }}
          aria-hidden
        >
          17
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section label with circuit accent */}
          <div className="flex items-center gap-4 mb-12">
            <CircuitAccent className="opacity-60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary whitespace-nowrap">
              The Problem
            </span>
          </div>

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
                Businesses lose revenue every day from missed calls, slow follow-ups,
                manual booking errors, and overwhelmed staff. When a potential client
                calls, they expect an immediate response. If you don't answer, your
                competitor will.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Missed Calls", value: "30%", desc: "Average missed call rate in service businesses" },
                { label: "Lost Revenue", value: "$4k+", desc: "Estimated monthly loss from poor follow-up" },
                { label: "Staff Time", value: "15hrs", desc: "Weekly time spent on manual booking" },
                { label: "Response Time", value: "24h+", desc: "Average time to return a voicemail" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 border border-border rounded-xl bg-background relative overflow-hidden group hover:border-primary/40 transition-colors duration-300"
                >
                  {/* Gold corner accent */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/40 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/20 rounded-br-xl" />
                  <div className="text-3xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand divider */}
      <BrandDivider className="py-4 bg-background" />

      {/* ── Solution ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-primary/5 rounded-l-[100px] -z-10" />

        {/* Gold wave mid-section */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-20">
          <GoldWaveSVG className="h-12" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <CircuitAccent className="opacity-60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary whitespace-nowrap">
              Our Approach
            </span>
          </div>

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
              We design AI receptionists that answer calls, qualify leads, book
              appointments, send SMS follow-ups, handle FAQs, and route urgent
              requests. It's not about robots replacing people — it's about giving
              your team the space to focus on the human connections that matter.
            </p>
          </motion.div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Always On", body: "Your AI receptionist answers every call, 24/7 — no holidays, no sick days, no hold music." },
              { title: "Human-First", body: "Conversations feel natural. Clients never feel like they're talking to a bot." },
              { title: "Fully Integrated", body: "Works with the calendars, CRMs, and tools your team already relies on." },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-6 border-l border-primary/30"
              >
                {/* Gold dot on the border */}
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand divider */}
      <BrandDivider className="py-4 bg-card" />

      {/* ── Services ── */}
      <section className="py-24 bg-card relative overflow-hidden">
        {/* Large "17" watermark right */}
        <div
          className="absolute right-0 bottom-0 pointer-events-none select-none font-serif font-bold text-primary/4 leading-none"
          style={{ fontSize: "clamp(160px, 22vw, 320px)" }}
          aria-hidden
        >
          17
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Our Expertise
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <BrandDivider />
          </div>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-serif font-semibold">
              Comprehensive Automation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard title="AI Receptionist" description="24/7 intelligent call answering that sounds natural and handles complex inquiries." icon={<PhoneCall />} delay={0.1} />
            <ServiceCard title="Missed Call Text Back" description="Instantly engage missed calls via SMS to capture leads before they call competitors." icon={<MessageSquare />} delay={0.2} />
            <ServiceCard title="Lead Qualification" description="Automated screening to ensure your team only spends time on high-value prospects." icon={<ShieldCheck />} delay={0.3} />
            <ServiceCard title="Appointment Booking" description="Seamless scheduling integrated directly with your existing calendar software." icon={<CalendarCheck />} delay={0.4} />
            <ServiceCard title="SMS Follow-Up" description="Strategic nurture sequences that keep your business top-of-mind." icon={<Clock />} delay={0.5} />
            <ServiceCard title="Review Request" description="Automated post-appointment messages to build your online reputation." icon={<Users />} delay={0.6} />
            <ServiceCard title="CRM Integration" description="Perfect synchronization with your existing tools — no workflow disruption." icon={<Settings />} delay={0.7} />
            <ServiceCard title="Custom Workflows" description="Bespoke automation designed specifically for your unique operational needs." icon={<Workflow />} delay={0.8} />
          </div>

          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-medium uppercase tracking-widest text-sm hover:text-primary/80 transition-colors">
              Explore all services
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand divider */}
      <BrandDivider className="py-4 bg-background" />

      {/* ── Industries ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Gold wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-20">
          <GoldWaveSVG className="h-16" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <CircuitAccent className="opacity-60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary whitespace-nowrap">
              Who We Serve
            </span>
          </div>

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
                We understand the nuances of client service. Our systems are
                tailored to the specific needs of premium service businesses.
              </motion.p>
              <BrandDivider className="justify-start" />
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Med Spas", primary: true },
                  { name: "Dental Offices", primary: false },
                  { name: "Wellness Clinics", primary: false },
                  { name: "Beauty Studios", primary: false },
                  { name: "Local Service Businesses", primary: false },
                ].map(({ name, primary }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 relative overflow-hidden group",
                      primary
                        ? "bg-primary/10 border-primary/40"
                        : "bg-card border-border hover:border-primary/40"
                    )}
                  >
                    {/* Corner accent */}
                    <div className={cn(
                      "absolute top-0 left-0 w-5 h-5 border-t border-l rounded-tl-xl",
                      primary ? "border-primary/60" : "border-primary/20 group-hover:border-primary/40 transition-colors"
                    )} />
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      primary ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary/60 transition-colors"
                    )} />
                    <span className="font-serif text-xl">{name}</span>
                    {primary && (
                      <span className="ml-auto text-xs uppercase tracking-widest text-primary font-medium">
                        Primary
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand divider */}
      <BrandDivider className="py-4 bg-card" />

      {/* ── Final CTA ── */}
      <section className="py-32 relative bg-card border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

        {/* Gold wave top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-30">
          <GoldWaveSVG className="h-16" />
        </div>

        {/* Large "17" watermark */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-serif font-bold text-primary/4 leading-none"
          style={{ fontSize: "clamp(200px, 35vw, 480px)" }}
          aria-hidden
        >
          17
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <BrandDivider />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8">
              Ready to elevate your front desk?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Schedule a strategy call to discover how AI automation can transform
              your client experience and increase revenue.
            </p>
            <GoldButton href="/contact" size="lg" className="text-lg px-10 py-7">
              Request Strategy Call
            </GoldButton>
            <div className="flex justify-center mt-10">
              <CircuitAccent />
            </div>
          </motion.div>
        </div>

        {/* Gold wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-20">
          <GoldWaveSVG className="h-12 rotate-180" />
        </div>
      </section>
    </div>
  );
}
