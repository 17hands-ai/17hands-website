import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoldButton } from "@/components/ui/GoldButton";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select an industry"),
  problem: z.string().optional(),
  volume: z.string().optional(),
  time: z.string().optional(),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      industry: "",
      problem: "",
      volume: "",
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Local state only for design assignment
    setIsSubmitted(true);
  }

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-primary/5 rounded-bl-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-sm uppercase tracking-widest text-primary font-medium mb-4">Contact</h1>
            <h2 className="text-5xl md:text-6xl font-serif font-semibold mb-6">Let's build your system.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Book a complimentary strategy call. We'll analyze your current workflows, identify revenue leaks, and propose a tailored AI solution.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-2">Email</h4>
                <a href="mailto:info@17hands.ai" className="text-primary text-lg hover:text-primary/80 transition-colors">
                  info@17hands.ai
                </a>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-2">Operating Hours</h4>
                <p className="text-muted-foreground text-lg">Monday – Friday<br/>9:00 AM – 6:00 PM EST</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-2xl border border-border"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-serif font-semibold mb-4">Request Received</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for reaching out. A member of our team will contact you shortly to schedule your strategy call.
                </p>
                <GoldButton onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </GoldButton>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxe Aesthetics" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" type="email" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" type="tel" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="med-spa">Med Spa</SelectItem>
                            <SelectItem value="dental">Dental Office</SelectItem>
                            <SelectItem value="wellness">Wellness Clinic</SelectItem>
                            <SelectItem value="beauty">Beauty Studio</SelectItem>
                            <SelectItem value="other">Other Service Business</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="volume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Call Volume</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Estimate volume" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-50">Under 50</SelectItem>
                              <SelectItem value="50-150">50 - 150</SelectItem>
                              <SelectItem value="150-500">150 - 500</SelectItem>
                              <SelectItem value="over-500">500+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Call Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="When to reach you" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="afternoon">Afternoon</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biggest Communication Challenge</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us what's currently breaking in your workflow..." 
                            className="bg-background resize-none" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <GoldButton type="submit" className="w-full text-lg py-6">
                    Request Strategy Call
                  </GoldButton>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
