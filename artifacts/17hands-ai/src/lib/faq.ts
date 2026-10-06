export interface FaqItem {
  q: string;
  a: string;
}

/** Single source for FAQ copy, used by the home page preview and the FAQ page. */
export const faqs: FaqItem[] = [
  {
    q: "Do I need to know exactly what I want before we talk?",
    a: "No. Tell me what feels slow, risky or confusing. We start with the problem and how your business runs today, then look at options together.",
  },
  {
    q: "Is this only about AI?",
    a: "No. Sometimes the right answer is a settings change, a simpler process or better use of a tool you already pay for. AI is one option, not the goal.",
  },
  {
    q: "We hold customer information. Can you help us look after it?",
    a: "Yes. We look at where that information is kept, who can reach it and which settings and habits matter most, then fix the most important things first. This is practical review and improvement work, not a formal audit, certification or legal advice.",
  },
  {
    q: "What happens in a staff security workshop?",
    a: "A hands-on session for your team, tailored to the tools you use. Typical topics are spotting scam emails, texts and calls, using a password manager and sign-in codes, and what is and isn't safe to share with AI tools.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Yes. I look at your current tools first. What they can do, what access we have, cost and practical limits all shape the recommendation.",
  },
  {
    q: "Do you build websites?",
    a: "Yes. I can build a new site or improve the one you have so it explains what you do clearly, works well on phones and makes the next step easy for customers.",
  },
  {
    q: "How do you handle our business information during a project?",
    a: "Each project starts by agreeing what information is needed, who should have access and which tools are involved. Specific safeguards are agreed as part of the scope.",
  },
  {
    q: "How will we know whether the work helped?",
    a: "Before starting we agree on what to measure, such as time spent on a task, response time, repeated questions or inquiries. After the change we compare and decide what to do next.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you need. We start with a call to understand your business, and you get a clear scope and price before any work begins.",
  },
];
