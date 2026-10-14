import { shots } from "./shots";

export const CDN = "https://assets.testmuai.com/resources/images/";

export const nav = {
  links: ["Platform", "Products", "Solutions", "Customers", "Pricing"],
};

export const hero = {
  line1: "Build with AI",
  line2: "Test with TestMu AI",
  sub: "The Native AI-Agentic Cloud Platform to Supercharge Quality Engineering. Test Intelligently and Ship Faster.",
  side: "Power your software testing with AI agents and cloud. Plan, author, execute and analyse every test from one agentic platform.",
  primary: "Start free with Google",
  secondary: "Start free with Email",
};

export const trustedBy = {
  label: "Trusted by 3M+ users globally at",
  logos: [
    "microsoft",
    "openai",
    "nvidia",
    "boomi",
    "github",
    "best-egg",
    "workday",
    "akamai",
    "lv",
    "nbcuniversal",
    "city-furniture",
    "cox",
    "transavia",
    "estee-lauder",
    "tripadviosr",
    "bohoo",
  ].map((n) => ({ name: n, src: `${CDN}testmu-ai/trusted-user/${n}.svg` })),
};

export const pioneer = {
  eyebrow: "Pioneer of AI Agentic Testing Cloud",
  cards: [
    {
      title: "Autonomous AI Agents for Testing",
      body: "Plan, author, and evolve end to end tests using company wide context or simple natural language prompts. Test every layer — database, API, UI, performance and more.",
      cta: "Explore Kane AI",
      image: `${CDN}testmu-ai/agent/autonomous-ai-agents-for-testing.webp`,
      overlay: `${CDN}testmu-ai/agent/autonomous-ai-overlay.webp`,
    },
    {
      title: "High Performance Agentic Test Cloud",
      body: "A scalable and unified test execution cloud to run any type of test at any scale. From web and mobile to custom enterprise environments.",
      cta: "Explore Agentic Clouds",
      image: `${CDN}testmu-ai/agent/high-performance-agentic-test-cloud.webp`,
      overlay: `${CDN}testmu-ai/agent/high-performance-overlay.webp`,
    },
  ],
  /* the four headline products, in the same cell style as the fold sections */
  cells: [
    {
      name: "KaneAI & Kane CLI",
      desc: "End-to-end AI testing agent — in the cloud or from your terminal.",
      icon: "bot",
    },
    {
      name: "Rook CLI",
      desc: "Run agent assurance checks from your terminal and CI.",
      icon: "terminal",
    },
    {
      name: "Agent Testing",
      desc: "Test chat, voice, phone, and video AI agents.",
      icon: "agents",
    },
    {
      name: "Agent Assurance",
      desc: "Test how agents behave across workflows and tools.",
      icon: "shield",
    },
  ],
};

export const platform = {
  title: "One Platform for Every Stage of Testing",
  /* The Figma workflow diagram, verbatim: four cards, each headed by its
     step, products named in full with a one-line description, and the
     supporting capabilities as a checklist. Connectors between cards are
     drawn by the section, not stored here. */
  stages: [
    {
      key: "PLANNING",
      icon: "clipboard",
      products: [
        { name: "Test Manager", desc: "Centralized Test Case Management" },
      ],
      checks: [
        "AI Test Case Generator & Test Deduplication",
        "Two-Way Jira & ADO Sync, Link Linear Issues",
        "1-Click Migration from Other Platforms",
      ],
    },
    {
      key: "AUTHORING",
      icon: "bot",
      products: [
        { name: "Kane AI", desc: "End-to-end AI QA Agent" },
        { name: "Kane CLI", desc: "Browser and Mobile Automation CLI" },
        { name: "MCP Server", desc: "", highlight: true },
        {
          name: "Agent Testing",
          desc: "Test chat, voice, phone, and video AI agents",
        },
        {
          name: "Agent Assurance",
          desc: "Test how agents behave across workflows and tools",
          badge: "New",
        },
      ],
      checks: [],
    },
    {
      key: "EXECUTE",
      icon: "zap",
      products: [
        {
          name: "HyperExecute",
          desc: "Blazing fast AI-Native automation testing cloud",
          highlight: true,
        },
      ],
      checks: [
        "Cross Browser Testing",
        "Real Device Cloud",
        "Automation Testing",
        "Visual Testing",
        "API Testing",
        "Accessibility Testing",
        "Performance Testing",
        "iOS Simulators",
        "Android Emulators",
        "Browser Cloud",
      ],
    },
    {
      key: "ANALYSIS",
      icon: "sparkles",
      products: [
        {
          name: "Test Intelligence",
          desc: "AI-Native test intelligence insights",
        },
      ],
      checks: [
        "AI-powered error classification",
        "Smart auto-healing",
        "Smart flakiness detection",
      ],
    },
  ],
  integrations: { label: "120+ Integrations", more: "and more" },
  deployment: {
    label: "Flexible Deployment Models on",
    options: ["Shared Cloud", "Private Cloud", "On-Premise"],
  },
};

export const products = {
  eyebrow: "Unified Quality Engineering for Enterprise",
  title:
    "A unified quality engineering platform that helps engineering teams automate end-to-end testing across web, mobile, and AI applications.",
  tabs: [
    {
      id: "test-manager",
      scene: "meadow",
      demo: "prompt",
      tag: "TEST MANAGER",
      title: "Unified AI Native Test Management",
      body: "Create test cases with AI, manage and execute them in one place, sync with JIRA, and ship quality software faster.",
      cta: "More About Test Management",
      points: [],
      quote: {
        text: "With 70% faster test execution, TestMu AI helped us achieve faster time-to-market and enhanced CX.",
        name: "Daniel de Bruijn",
        role: "Quality Assurance Automation Engineer",
      },
      image: shots.projectDoc,
    },
    {
      id: "kane-ai",
      scene: "shore",
      demo: "plan",
      tag: "KANE AI",
      title: "Autonomous Agentic Test Planning and Authoring",
      body: "Multi-modal AI agents that take text, diffs, tickets, docs, images, or media and automatically plan tests, write cases, generate automation, and run at scale.",
      cta: "More About Kane AI",
      points: [],
      accordion: [
        {
          title: "Plain English Test Authoring",
          body: "Describe what you want to test in natural language and Kane AI turns it into executable test steps, no code required.",
        },
        {
          title: "Multi-Modal Test Planning",
          body: "Feed Kane AI text, diffs, tickets, docs, images, or media and it plans scenarios and writes test cases automatically.",
        },
        {
          title: "Auto-Generated Automation",
          body: "Convert authored tests into automation across web and mobile, then run them at scale on the cloud grid.",
        },
        {
          title: "Terminal-Native with Kane CLI",
          body: "Trigger the same Kane AI flows from your terminal, CI pipeline, or coding agent. Runs sync back to the dashboard for replay and reporting.",
        },
      ],
      image: shots.specIssue,
    },
    {
      id: "agent-testing",
      scene: "alplake",
      demo: "agentEval",
      tag: "AGENT TESTING",
      title: "AI Agents for Testing Conversational AI Agents",
      body: "Deploy autonomous AI evaluators to test your chatbots, voice assistants, IVR, phone, and video agents for hallucinations, bias, toxicity, compliance, and more.",
      cta: "Get Started For Free",
      listCaption: "What AI agents can it test?",
      points: [
        "Chat & Voice Agent",
        "IVR System",
        "Phone Caller Inbound Agent",
        "Phone Caller Outbound Agent",
        "Video Agent",
        "Image Analyzer Agent",
      ],
      image: shots.agentProps,
    },
    {
      id: "agent-assurance",
      scene: "comet",
      demo: "assurance",
      tag: "AGENT ASSURANCE",
      title: "AI Agent Assurance for Your Agent Deployments",
      body: "Test how your agents actually behave across workflows, tools, and actions. Catch failures and vulnerabilities before they ship. Build better agents with complete assurance.",
      cta: "Join the Waitlist",
      install: "npm install -g @testmuai/rook",
      points: [],
      accordion: [
        {
          title: "Grade the effect, not the account",
          body: "An agent's account of what it did is the weakest evidence available about what it did. Agent Assurance checks the effects on tools, files, and APIs.",
        },
        {
          title: "Publish the blind spot",
          body: "Anything Agent Assurance could not verify is reported as unverifiable. Never a quiet pass, never a guessed fail, never folded into the pass rate.",
        },
        {
          title: "No tests to write",
          body: "Point it at a repository, a PRD, or a folder of policy docs. It reads what you have and derives functional and adversarial scenarios from it.",
        },
        {
          title: "Adversarial by default",
          body: "Prompt injection, instruction override, and tool misuse are a first-class scenario family, not an add-on you configure.",
        },
      ],
      image: shots.agentProps,
    },
    {
      id: "real-device-cloud",
      scene: "lake",
      demo: "devices",
      tag: "REAL DEVICE CLOUD",
      title: "Real Device Cloud for Native App Automation",
      body: "Test on real iOS and Android devices for manual and automated app testing. Get public, dedicated, and on-premise device cloud.",
      cta: "Get Started For Free",
      points: [
        "10,000+ Real Devices & Automation Support",
        "Pre-installed DevTools & Network Throttling",
        "Private Cloud & Intelligent Debugging with UI Inspector",
      ],
      image: shots.appIssue,
    },
    {
      id: "hyperexecute",
      scene: "dusk",
      demo: "terminal",
      tag: "HYPEREXECUTE",
      title: "AI-Native End-to-End Test Orchestration Cloud",
      body: "Up to 70% faster than any cloud grid. Smart AI-native test orchestration platform that runs your tests at blazing speed on a secure, scalable cloud.",
      cta: "Get Started For Free",
      listCaption: "What can you do with HyperExecute?",
      points: [
        "AI-powered root cause analysis",
        "Fail-fast aborts and intelligent retries",
        "MCP Server",
        "Intelligent Test Execution",
        "AI Based CI Features",
      ],
      image: shots.activity,
    },
    {
      id: "test-insights",
      scene: "planet",
      demo: "insights",
      tag: "TEST INSIGHTS",
      title: "AI-Native Test Analytics For Smarter Reporting",
      body: "Gain insights into test performance and outcomes with Test Analytics to drive data driven decisions and improve testing efforts.",
      cta: "Get Started For Free",
      points: [],
      quote: {
        text: "TestMu AI's Analytics make release tracking a lot easier. The ability to pull comprehensive stats from the dashboard makes tracking releases effortless.",
        name: "Zarren Camilleri",
        role: "QA Automation Manager",
      },
      image: shots.insights,
    },
  ],
};

export const stories = {
  title: "Success Stories of TestMu AI",
  stat: "50%",
  statLabel: "reduction in test execution time",
  quote:
    "HyperExecute is a highly reliable test execution platform and has excellent customer support.",
  name: "Sagar Uday Kumar",
  role: "Sr. Engineering Manager",
  brands: ["DASHLANE", "LERETA", "DUNELM", "TREPP", "TRANSAVIA"],
  cta: "Book a Demo",
};

export const reasons = {
  title: "More Reasons to Love TestMu AI",
  body: "See how TestMu AI speeds up your testing with AI-native authoring, faster execution, and deeper test insights across web, mobile, and AI applications.",
  reports: [
    {
      title:
        "TestMu AI Named a Challenger in the 2025 Gartner® Magic Quadrant™",
      cta: "Read Report",
    },
    {
      title:
        "TestMu AI recognized in The Forrester Wave™: Autonomous Testing Platforms, Q4 2025",
      cta: "Read Report",
    },
  ],
  cards: [
    {
      title: "Wall of Fame",
      body: "TestMu AI is the #1 choice for SMBs and enterprises across the globe.",
      image: "/img/wall-of-fame.png",
      span: "lg:col-span-2",
    },
    {
      title: "Enterprise-Grade Security",
      body: "We safeguard your data and AI systems with global security, privacy, responsible AI, and ESG standards.",
      image: "/img/enterprise.png",
      span: "lg:col-span-2",
    },
    {
      title: "Integrations",
      body: "Works where you work — 120+ integrations with the tools your team relies on.",
      image: "/img/integrations.png",
      span: "lg:col-span-2",
    },
  ],
};

export const stats = [
  { label: "Users", value: 3, suffix: "M+" },
  { label: "Tests", value: 1.5, suffix: "B+" },
  { label: "Enterprises", value: 18, suffix: "K+" },
  { label: "Countries", value: 132, suffix: "" },
];

export const asSeenOn = {
  label: "As seen on",
  logos: [
    "TC",
    "VB",
    "forbes",
    "yahoo-finance",
    "nationalpost",
    "economic-times",
    "entrepreneur",
    "fast-company",
    "fox8",
    "YS",
    "AP",
  ].map((n) => ({ name: n, src: `${CDN}testmu-ai/as-seen-on/${n}.svg` })),
};

export const rebrand = {
  title: "LambdaTest is Now TestMu AI",
  body: "LambdaTest is now TestMu AI — the same trusted testing cloud, rebuilt for the AI era. On January 12, 2026, the platform evolved from cross-browser testing into a full-stack agentic AI quality engineering cloud, helping engineering teams automate end-to-end testing across web, mobile, and AI applications. It now powers autonomous agents like Kane AI, agent testing for voice AI and chatbots, AI visual testing, and HyperExecute.",
};

export const faq = [
  {
    q: "What is TestMu AI?",
    a: "TestMu AI is a native AI-agentic cloud platform for quality engineering. It lets teams plan, author, execute and analyse tests across web, mobile and AI applications from a single platform.",
  },
  {
    q: "Is LambdaTest still available?",
    a: "Yes. LambdaTest is now TestMu AI — the same trusted testing cloud, rebuilt for the AI era. Every capability you relied on is still here, alongside the new agentic products.",
  },
  {
    q: "What happened to LambdaTest?",
    a: "On January 12, 2026 the platform evolved from cross-browser testing into a full-stack agentic AI quality engineering cloud, and was renamed TestMu AI.",
  },
  {
    q: "Are my LambdaTest credentials still valid on TestMu AI?",
    a: "Yes. Your existing account, projects and credentials carry across to TestMu AI — nothing needs to be recreated.",
  },
  {
    q: "How is TestMu AI different from LambdaTest?",
    a: "TestMu AI adds autonomous agents like Kane AI, agent testing for voice AI and chatbots, AI visual testing and HyperExecute orchestration on top of the original testing cloud.",
  },
];

export const enterprise = {
  title: "TestMu AI for Enterprise",
  body: "Get access to solutions built on enterprise grade security, privacy, and compliance.",
  primary: "Contact Sales",
  secondary: "Book a Demo",
  perks: [
    "Advanced access controls",
    "Advanced data retention rules",
    "Advanced Local Testing",
    "Premium Support options",
    "Early access to beta features",
    "Private Slack Channel",
    "Unlimited Manual Accessibility DevTools Tests",
  ],
};

export const footer = {
  groups: [
    {
      title: "Platform",
      links: [
        "Automation Testing Cloud",
        "KaneAI - GenAI-Native Testing Agent",
        "Kane CLI",
        "Agent Testing",
        "AI Agents",
        "MCP Server",
        "Cross Browser Testing",
        "Real Device Cloud",
        "Test Management",
        "Mobile App Testing",
        "AI Testing",
        "HyperExecute",
        "Performance Testing",
        "Browser Cloud",
        "Accessibility Testing",
        "SmartUI Visual Testing",
        "Integrations",
        "Test Analytics",
        "Professional Services",
        "Compare TestMu AI",
      ],
    },
    {
      title: "Browsers & Devices",
      links: [
        "Samsung Galaxy S26",
        "iPhone 17",
        "List of Browsers",
        "List of Real Devices",
        "Chrome",
        "Safari Browser Online",
        "Microsoft Edge",
        "Firefox",
        "Opera",
        "Mac OS",
        "Mobile Devices",
        "iOS Simulator",
        "Android Emulator",
        "Browser Emulator",
      ],
    },
    {
      title: "Frameworks",
      links: [
        "Selenium Testing",
        "Selenium Grid",
        "Cypress Testing",
        "Playwright Testing",
        "Puppeteer Testing",
        "Taiko Testing",
        "Appium Testing",
        "Espresso Testing",
        "XCUITest Testing",
      ],
    },
    {
      title: "Getting Started",
      links: [
        "Test an AI Agent",
        "Create tests with KaneAI",
        "Use Kane CLI",
        "Launch Browser Cloud",
        "Run tests on HyperExecute",
        "Catch Visual Bugs with SmartUI",
        "Spot Accessibility Issues",
        "Manage Test Cases",
        "TestMu AI MCP Server",
      ],
    },
    {
      title: "Resources",
      links: [
        "TestMu Conf 2026",
        "Blogs",
        "Certifications",
        "Newsletter",
        "Webinars",
        "FAQ",
        "Software Testing [Glossary]",
        "QA Job Board",
        "Software Testing Questions",
        "Free Online Tools",
        "Latest Versions",
        "AI Testing Tools",
        "Sitemap",
        "Status",
      ],
    },
    {
      title: "Company",
      links: [
        "LambdaTest is Now TestMu AI",
        "About Us",
        "Careers",
        "Customers",
        "Press",
        "Achievements",
        "Reviews",
        "Community & Support",
        "Partners",
        "Open Source",
        "Content Editorial Policy",
        "Write for Us",
        "Become an Affiliate",
        "Terms of Service",
        "Privacy Policy",
        "Cookie Policy",
        "Trust",
        "Contact Us",
      ],
    },
  ],
  whatsNew: {
    title: "What's New",
    links: [
      "Gartner® Magic Quadrant™ Report",
      "Coding Jag - Issue 308",
      "June'26 Updates",
    ],
  },
  legal: "© 2026 TestMu AI. Redesign concept.",
};

export const footerExtra = {
  blurb:
    "Deliver unparalleled digital experience with our Next-Gen, AI-Native testing cloud platform. Ensure exceptional user experience across all devices and browsers.",
  primary: "Start free with Google",
  secondary: "Start free with Email",
  summarize: "Summarize with AI",
  compliance:
    "TestMu AI has formal standards certification and comply in line with acts and regulations across the globe.",
  address: {
    title: "LambdaTest is TestMu AI",
    label: "Headquarters",
    lines: ["1390 Market Street, Suite 200,", "San Francisco, CA 94102"],
  },
  help: { lead: "How can we help?", cta: "Contact us" },
  bottom: {
    legal: "© 2026 LambdaTest. All rights reserved",
    built: "AI-Agentic Cloud Built With ♥ For Quality Engineering",
  },
};

/* Enterprise bento — two headline products over imagery, four supporting cells.
   Layout follows the Figma frame; palette stays dark. */
/* The platform told as two folds: what you plan and author, then what you
   execute and analyse. Same shape, different half of the story. */
export const folds = [
  {
    id: "author",
    lead: "Plan and Author",
    subject: "every test from plain English",
    body: "Kane AI turns prompts, tickets, docs and diffs into executable tests. Agent Testing puts your own AI agents under the same rigour, across chat, voice and video.",
    cta: "Start free with Google",
    features: [
      {
        name: "Kane AI",
        desc: "Multi-modal agents that plan scenarios and write cases from text, diffs, tickets, docs or media — no code required.",
        cta: "Explore Kane AI",
        panel: shots.appPlan,
        scene: "clouds",
      },
      {
        name: "Agent Testing",
        desc: "A multi-agentic platform to evaluate your AI agents — chat, voice and calling — before they meet a customer.",
        cta: "Explore Agent Testing",
        panel: shots.projectDoc,
        scene: "sky",
      },
    ],
    cells: [
      {
        name: "Test Manager",
        desc: "Plan runs, manage cases and track coverage in one place.",
        icon: "clipboard",
      },
      {
        name: "MCP Server",
        desc: "Connect any AI to your test data — no manual transfers.",
        icon: "plug",
      },
      {
        name: "Context Files",
        desc: "Feed .md specs, PRDs and diffs straight into authoring.",
        icon: "file",
      },
      {
        name: "Voice Agent Testing",
        desc: "Evaluate voice and calling agents end to end.",
        icon: "bot",
      },
    ],
  },
  {
    id: "execute",
    lead: "Execute and Analyse",
    subject: "at any scale, on any surface",
    body: "HyperExecute runs the suite up to 70% faster than any grid. Real Device Cloud puts it on 10,000+ genuine devices. Everything reports back into one analysis layer.",
    cta: "Start free with Google",
    features: [
      {
        name: "HyperExecute",
        desc: "AI-native orchestration with fail-fast aborts, intelligent retries and root cause analysis built in.",
        cta: "Explore HyperExecute",
        panel: shots.appIssue,
        scene: "lake",
      },
      {
        name: "Real Device Cloud",
        desc: "10,000+ real iOS and Android devices with DevTools, network throttling and a UI inspector.",
        cta: "Explore Real Device Cloud",
        panel: shots.agentAssign,
        scene: "planet",
      },
    ],
    cells: [
      {
        name: "SmartUI",
        desc: "Visual testing that catches UI regressions before production.",
        icon: "eye",
      },
      {
        name: "Accessibility Testing",
        desc: "Automatic WCAG checks across your web applications.",
        icon: "accessibility",
      },
      {
        name: "Performance Testing",
        desc: "Load and speed testing on the same execution cloud.",
        icon: "gauge",
      },
      {
        name: "Test Intelligence",
        desc: "Error classification, flakiness detection and auto-healing.",
        icon: "chart",
      },
    ],
  },
];

/* Success stories — the Figma grid: hero case on top, three supporting cells below. */
export const storiesGrid = {
  lead: "Success Stories of",
  subject: "TestMu AI (formerly LambdaTest)",
  body: "See how engineering teams across industries test smarter, ship faster, and release with confidence on TestMu AI.",
  cta: "Read all success stories",
  hero: {
    brand: "/img/logo-dashlane.svg",
    image: "/img/story-dashlane.png",
    stat: "50%",
    statLabel: "Reduction in test execution time",
    quote:
      "HyperExecute is a highly reliable test execution platform and has excellent customer support.",
    name: "Sagar Uday Kumar",
    role: "Sr. Engineering Manager",
    action: "Play video",
  },
  cells: [
    {
      brand: "/img/logo-boomi.svg",
      stat: "78%",
      desc: "Faster tests help Boomi triple coverage and unblock CI/CD",
    },
    {
      brand: "/img/logo-transavia.svg",
      stat: "70%",
      desc: "Faster test execution, quicker releases, better CX",
    },
  ],
  wide: {
    brand: "/img/logo-bestegg.svg",
    stat: "4X",
    desc: "Faster test execution, 2.7 mn tests, zero bottlenecks",
    action: "Read case study",
    image: "/img/story-bestegg.png",
  },
};

/* Third-party ratings. NOTE: figures are placeholders pending the real numbers
   from the live site — swap them here and the section updates. */
export const reviews = {
  eyebrow: "Rated by the people who use it",
  title: "Reviewed where buyers look",
  body: "Independent ratings from the software directories enterprise teams check before they buy.",
  vendors: [
    {
      name: "Capterra",
      rating: "4.5",
      outOf: "5",
      count: "470+ reviews",
      href: "#",
    },
    {
      name: "Gartner Peer Insights",
      rating: "4.5",
      outOf: "5",
      count: "380+ reviews",
      href: "#",
    },
    {
      name: "Software Advice",
      rating: "4.5",
      outOf: "5",
      count: "460+ reviews",
      href: "#",
    },
  ],
};
