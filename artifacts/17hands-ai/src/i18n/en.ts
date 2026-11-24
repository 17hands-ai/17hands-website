/**
 * English copy for the translated routes (/, /packages, /faq, /contact) and the shared
 * header and footer. ru.ts and es.ts must match this shape exactly: `Content` is derived
 * from this object, so a missing key in a translation fails typecheck.
 *
 * {package-id} tokens are replaced with that package's price (see fillPrices in ./index).
 */
import { pages } from "@/lib/pages";

export const en = {
  htmlLang: "en",
  ogLocale: "en_US",
  languageName: "English",

  /** English titles and descriptions have one source: lib/pages.ts. */
  meta: Object.fromEntries(pages.map((p) => [p.path, { title: p.title, description: p.description }])) as Record<
    string,
    { title: string; description: string }
  >,

  price: { from: "from", flat: "flat", perMonth: "a month", perMonthShort: "/mo" },

  common: {
    book: "Book a call",
    bookShort: "Book a call",
    newTab: " (opens in a new tab)",
    skip: "Skip to content",
  },

  nav: {
    label: "Main",
    digitalDefenders: "Digital Defenders",
    websites: "Websites",
    workshops: "Workshops",
    packages: "Packages",
    bioPages: "Bio pages",
    about: "About",
    faq: "FAQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },

  footer: {
    tagline: "Websites, bio pages and AI safety workshops.",
    motto: "AI systems with a human touch.",
    explore: "Explore",
    linksBooking: "Links & booking",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    packages: "Packages and prices",
    forIndividuals: "For individuals",
    getInTouch: "Get in touch",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: "All rights reserved.",
  },

  home: {
    hero: {
      eyebrow: "Websites · Bio pages · AI safety workshops",
      lines: ["Be found.", "Be remembered.", "Stay safe."],
      body: "I build branded websites and apps that show up on Google and in AI answers, link-in-bio pages that feel like you, and workshops that teach teams and families to use AI safely.",
      work: "See the work",
      visualLabel: "Examples of 17hands.ai work: a website, a link-in-bio page and a scam text from a workshop.",
      scamFrom: "Text from USPS",
      scamText: "Your package is on hold. Confirm your address at usps-redeliver.co within 12 hours.",
      scamFlag: "Spot the scam",
    },
    offers: {
      title: "What 17hands.ai does",
      items: [
        {
          kicker: "Websites & apps",
          title: "Be found.",
          body: "A custom site built around your brand, fast on every phone, and set up so Google and AI assistants like ChatGPT can understand and recommend you.",
          points: ["Custom design, no templates", "SEO and AEO built in from day one", "Fast, accessible and easy to update", "Custom web and mobile apps when you need more"],
          link: "Websites and apps",
        },
        {
          kicker: "Link-in-bio pages",
          title: "Be remembered.",
          body: "The link in your Instagram or LinkedIn bio is often the first thing people see. Make it look like you, not like everyone else's Linktree.",
          points: ["Your brand on your own domain", "One tap to save your contact or book a call", "See which links people actually use"],
          link: "Bio pages",
        },
        {
          kicker: "AI and security workshops",
          title: "Stay safe.",
          body: "Hands-on sessions that teach people to use AI with good security habits, for small business teams and for families.",
          points: ["Use AI at work without leaking customer data", "Spot scam texts, calls and fake emails", "Passwords, sign-in codes and kids online", "In person locally, or live online"],
          link: "Workshops",
        },
      ],
    },
    work: {
      eyebrow: "Live work",
      title: "Real pages, live right now.",
      body: "Designed and built by 17hands.ai. Open any of them and try it.",
      visit: "Visit live",
      items: {
        anastasia: { name: "Anastasia Blodgett", kind: "Link-in-bio · Founder", body: "My own page: save my contact in one tap, book a call, see what I build." },
        karla: { name: "Karla Newton", kind: "Link-in-bio · Realtor", body: "Gold on black for a realtor, with a flip-over contact card and one-tap call, text and email." },
        kam: { name: "Kam Ayapova", kind: "Link-in-bio · Studio owner", body: "A launch page for a studio owner: grand opening sign-ups, the story behind the studio and save contact." },
        teaspoon: { name: "Teaspoon El Dorado Hills", kind: "Website · Catering requests", body: "A holiday catering request form for a boba shop: pick a package, choose a date, send the request." },
        stuniverse: { name: "The Stuniverse", kind: "Website · Children's books", body: "A storybook world for a children's book series that opens on a velvet stage." },
      },
    },
    start: {
      title: "Ways to start",
      body: "Clear starting prices. You get a written scope and the final price before any work begins.",
      items: [
        { name: "Bio page", note: "Founding rate for the first five clients." },
        { name: "Website", note: "A focused site with SEO and AEO set up from day one." },
        { name: "Team workshop", note: "Family and 1-on-1 sessions are available too." },
      ],
      all: "See all packages and prices",
    },
    about: {
      eyebrow: "Who builds it",
      title: "Hi, I'm Anastasia.",
      role: "Anastasia Blodgett, founder of 17hands.ai",
      paragraphs: [
        "I've spent more than 12 years building software people rely on: tools for agents at Trulia and Zillow, apps for clients like MLB and MasterClass, and six years on the UnitedHealthcare mobile app, used by millions of members.",
        "In healthcare I was the security advocate on my team. Now I bring that same care to small businesses, creators and families, without the jargon or the enterprise price tag.",
      ],
      facts: [
        ["12+ years", "building software"],
        ["Millions", "of members on apps I built and led"],
        ["UC Berkeley", "Computer Science"],
        ["Up to 14", "engineers led"],
      ],
      more: "More about me",
      linkedin: "Connect with me",
      builtAt: "Built software at",
      shippedFor: "Shipped apps for",
    },
    testimonials: { title: "In their words" },
    faq: { title: "Quick answers.", all: "See all questions" },
    cta: {
      line: "Let's start with ",
      accent: "one call.",
      body: "Tell me what you want to build or what worries you. We'll find the right first step together.",
    },
    stats: {
      eyebrow: "Why now",
      title: "Small businesses are adopting AI faster than they are ",
      accent: "protecting it.",
      items: [
        { claim: "of U.S. small businesses now use generative AI.", meaning: "Your competitors are already trying it. Most have no rules for it." },
        { claim: "of data breaches involve a person: a click, a reused password, a mistake.", meaning: "Habits fix more than software does. That part is teachable." },
        { claim: "of breaches at small and midsize businesses involved ransomware.", meaning: "Backups and sign-in codes decide whether it is a bad day or a closed business." },
        { claim: "of mobile visits are abandoned when a page takes over 3 seconds to load.", meaning: "A slow site loses the customer before they read a word." },
      ],
      urgencyTitle: "Waiting is the expensive option.",
      urgencyBody: "Each of these gaps is cheap to close before something goes wrong and costly after. One call is enough to see which one to close first.",
      urgencyCta: "Find my first step",
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is repetitive work ",
      accent: "costing you?",
      body: "Copying between tools, answering the same questions, chasing follow-ups. Move the sliders to match your business.",
      people: "People doing repetitive admin",
      hours: "Hours each, per week",
      hoursUnit: "h",
      rate: "What an hour of their time is worth",
      share: "How much of it could be automated",
      shareLabels: ["A little", "Typical", "A lot"],
      today: "TODAY",
      todayNote: "a year on {hours} hours of repetitive work every week.",
      withShare: "WITH {share}% AUTOMATED",
      hoursBack: "back every year",
      valueBack: "of time freed up",
      payback: "A quick-win automation starts at {price}. At these numbers it pays for itself in about ",
      weeks: (n: number) => (n === 1 ? "1 week" : `${n} weeks`),
      waiting: "Every month you wait costs about {monthly} of that time.",
      cta: "Find my first automation",
      disclaimer: "Simple arithmetic on your own inputs, based on {weeks} working weeks. Not a promise: we measure the real before and after on every project. Nothing you enter here leaves your browser.",
    },
  },

  packages: {
    hero: {
      eyebrow: "Packages and starting prices",
      title: "Start small. ",
      accent: "Climb when it pays.",
      body: "Every service is a ladder. Take the first step, see what it does for the business, and only then decide on the next one.",
      navLabel: "Package groups",
      care: "Care plans",
      workshops: "Workshops",
    },
    step: "STEP",
    startHere: "MOST START HERE",
    seeIncluded: "See what's included",
    ladders: {
      websites: {
        eyebrow: "Websites",
        title: "A site that customers and AI assistants can both read",
        intro: "Start with one page. Add pages, booking and an assistant when the business is ready for them.",
      },
      protect: {
        eyebrow: "Protect",
        title: "Customer data, looked after properly",
        intro: "Find out where information lives, close the gaps that matter and give your team habits that hold.",
      },
      automate: {
        eyebrow: "Automate and build",
        title: "Hand the repetitive work to software",
        intro: "One workflow first. Measure it. Then decide whether the next one is worth doing.",
      },
    },
    items: {
      "bio-page": { name: "Bio page", fit: "The link behind your Instagram, card and QR code.", includes: ["One branded page on your domain", "Save to contacts, call, text, book", "Lead form and analytics"] },
      "starter-site": { name: "Starter site", fit: "A new business that needs to look real this month.", includes: ["One long page, written with you", "Booking and contact form", "Search and AI-answer basics", "Live in about a week"] },
      "business-site": { name: "Business site", fit: "An established business whose site isn't bringing inquiries.", includes: ["Up to 6 pages, one per service", "Google Business Profile tune-up", "Structured data and llms.txt for AI assistants", "Analytics and a 30-day results review"] },
      "growth-site": { name: "Growth site", fit: "A busy team that loses leads after hours.", includes: ["Everything in Business", "Assistant that answers from your own content", "Automatic lead follow-up, with a person in the loop", "Quarterly review and tuning"] },
      "data-checkup": { name: "Data check-up", fit: "You hold customer details and aren't sure who can see them.", includes: ["Map of where customer data lives", "Who has access, and who shouldn't", "Prioritized fix list in plain English", "One hour of help making the fixes"] },
      "team-workshop": { name: "Team security workshop", fit: "Up to 15 people, 90 minutes, on the tools you use.", includes: ["Spotting scam emails, texts and calls", "Password manager and sign-in codes", "What is safe to paste into AI tools", "One-page guide to keep"] },
      "protect-bundle": { name: "Protect bundle", fit: "The full baseline for a small team.", includes: ["Data check-up and fixes", "Team workshop", "Joiner and leaver access routine", "Written AI-use rules for your business"] },
      "quick-win": { name: "Quick-win automation", fit: "One task your team repeats every week.", includes: ["One workflow, start to finish", "Connects the tools you already pay for", "Before and after time measured", "Short guide for your team"] },
      assistant: { name: "AI assistant setup", fit: "The same questions arrive by chat, email or phone all day.", includes: ["Answers only from content you approve", "Hands over to a person when unsure", "No customer data used for training", "Monthly review of what it was asked"] },
      "custom-tool": { name: "Custom tool", fit: "Off-the-shelf software doesn't fit how you work.", includes: ["Built around your process", "Example: a staff onboarding tool", "Sign-in and access by role", "Training and written handover"] },
      watch: { name: "Watch", fit: "Know your site is up, fast and findable.", includes: ["Weekly uptime, speed and broken-link checks", "Domain and certificate expiry alerts", "Monthly check of how Google and AI assistants describe you", "One-page monthly update"] },
      care: { name: "Care", fit: "Someone keeping the site and the accounts in order.", includes: ["Everything in Watch", "Up to one hour of edits a month", "Alert if a business email appears in a known breach", "Quarterly access review and call"] },
      partner: { name: "Partner", fit: "Ongoing improvements, not just upkeep.", includes: ["Everything in Care", "Up to three hours of build time a month", "Automations and assistant kept tuned", "Monthly numbers review and next step"] },
    },
    care: {
      eyebrow: "Care plans",
      title: "Agents keep watch. ",
      accent: "A person tells you what matters.",
      body: "Sites break quietly, domains expire and passwords leak. A care plan runs the checks on a schedule and sends you a short update, not a dashboard to log in to.",
      loop: [
        { name: "Agents run the checks", body: "Every week, software checks your site, your domain and how search and AI assistants describe you." },
        { name: "A person reads the result", body: "I review what they found, so you never get a raw alert you have to decode." },
        { name: "You get one page", body: "What changed, what I fixed and the one thing worth deciding this month." },
      ],
      note: "Month to month, cancel any time. Care plans are monitoring and upkeep. They are not a managed security service, incident response or a guarantee against attack.",
    },
    programs: {
      eyebrow: "Workshops and programs",
      title: "Teach the team, ",
      accent: "not just the tool.",
      body: "Tools only help when people use them. These sessions are hands on and built around your business.",
      items: {
        "digital-defenders": { name: "Digital Defenders", priceNote: "Priced by group", body: "Scam awareness and everyday digital safety for families, schools and community groups." },
        "ai-kickstart": { name: "AI kickstart for teams", priceNote: "", body: "Two hours, hands on: what AI is good for in your business, what to keep out of it, and one workflow set up before we finish." },
        "one-on-one": { name: "1-on-1 tech safety session", priceNote: "", body: "Phone, passwords and accounts made safer for you or someone in your family." },
        onboarding: { name: "Staff onboarding program", priceNote: "Scoped per business", body: "Your first-week training turned into a guided tool new hires can follow, so the owner stops repeating it." },
      },
    },
    terms: {
      title: "How pricing works",
      items: [
        { name: "A fixed price before work starts", body: "After the first call you get a written scope and price. Nothing begins until you say yes." },
        { name: "You own what we build", body: "Your domain, your accounts, your content. Nothing is held on a platform you can't leave." },
        { name: "Measured after 30 days", body: "We agree what to count before we start, then compare. If it didn't help, you hear it from me." },
      ],
      note: "Starting prices cover a typical small business. Third-party costs such as domains, hosting or software subscriptions are paid directly by you, in your name.",
    },
    cta: {
      title: "Not sure which step is yours?",
      body: "One call about how your business runs is usually enough to know where to start.",
    },
  },

  faqPage: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    more: "Have a question that isn't here?",
  },

  faqs: [
    { q: "Do you build websites?", a: "Yes. Custom sites built around your brand, fast on phones, with SEO and AEO set up so Google and AI assistants like ChatGPT can understand and recommend you. When a site is not enough, I also build custom web and mobile apps. A starter site is {starter-site}." },
    { q: "Can you build a bio page instead of Linktree?", a: "Yes. A custom bio page sits behind your Instagram and LinkedIn bio, on your brand and your own domain, with save to contacts, one-tap booking, a lead form and analytics. The founding rate is {bio-page}. See the Bio pages page for what's included." },
    { q: "What do your workshops cover?", a: "How to use AI tools safely, with security habits that stick. For teams: what is safe to paste into AI tools, spotting scam emails, texts and calls, and passwords and sign-in codes. For families: scams, account safety, privacy settings and kids online. A team workshop is {team-workshop}, in person locally or live online." },
    { q: "How much does it cost?", a: "A bio page is {bio-page}, a starter website {starter-site} and a team workshop {team-workshop}. Every other package and its starting price is on the Packages page. You always get a written scope and price before any work begins." },
    { q: "Do I need to know exactly what I want before we talk?", a: "No. Tell me what feels slow, risky or confusing. We start with the problem and how your business runs today, then look at options together." },
    { q: "Why should a small business act on AI and security now?", a: "Because adoption has outrun protection. 58% of U.S. small businesses already use generative AI, most without rules for what goes into it, and about 60% of breaches start with a person, not a machine. Closing the basic gaps costs far less before an incident than after one." },
    { q: "Is this only about AI?", a: "No. Sometimes the right answer is a settings change, a simpler process or better use of a tool you already pay for. AI is one option, not the goal." },
    { q: "We hold customer information. Can you help us look after it?", a: "Yes. We look at where that information is kept, who can reach it and which settings and habits matter most, then fix the most important things first. This is practical review and improvement work, not a formal audit, certification or legal advice." },
    { q: "Can you work with the tools we already use?", a: "Yes. I look at your current tools first. What they can do, what access we have, cost and practical limits all shape the recommendation." },
    { q: "How are you different from other AI consultants?", a: "I am an engineer who ships, not a commentator. I spent 12+ years building software, including six years on the UnitedHealthcare mobile app used by millions of members, where I was the security advocate on my team. Every project ends with something working in your business, a written scope and price agreed first, and a measured before and after." },
    { q: "How do you handle our business information during a project?", a: "Each project starts by agreeing what information is needed, who should have access and which tools are involved. Specific safeguards are agreed as part of the scope." },
    { q: "How will we know whether the work helped?", a: "Before starting we agree on what to measure, such as time spent on a task, response time, repeated questions or inquiries. After the change we compare and decide what to do next." },
    { q: "Do you offer ongoing support?", a: "Yes. Monthly care plans run scheduled checks on your site, domain and search visibility, and I review the results and send a one-page update. Plans start {watch}." },
  ],

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your business.",
    body: "Book a call and tell me how your business works, what worries you and where your team gets stuck. We'll look for a practical place to start.",
  },
};

export type Content = typeof en;
