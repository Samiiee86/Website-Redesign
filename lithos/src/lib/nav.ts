/* One config for the whole header. Adding a product is a data change here —
   never a layout change. Every panel width is the sum of its own contents. */

export type RichItem = {
  name: string;
  icon: string;
  desc: string;
  badge?: string;
};
export type PlainItem = { name: string; badge?: string };

export type Group =
  | { caption: string; rich: true; items: RichItem[] }
  | { caption: string; rich?: false; items: PlainItem[] };

export type RailBlock = { caption: string; items: string[] };
export type Card = {
  name: string;
  desc: string;
  image: string;
  cta?: string;
};

/* a product row in the new Products panel: name, optional one-liner, badge */
export type DescItem = { name: string; desc?: string; badge?: string };

export type ProductsMenu = {
  kind: "products";
  key: string;
  label: string;
  width: number;
  kane: { caption: string; items: DescItem[] };
  agentTest: { caption: string; items: DescItem[] };
  cloud: { caption: string; items: DescItem[] };
  quality: { caption: string; items: DescItem[] };
};

export type PanelMenu = {
  kind: "panel";
  key: string;
  label: string;
  width: number;
  cols: string;
  gap: string;
  railWidth: number;
  groups: Group[];
  rail?: RailBlock[];
  cardsCaption?: string;
  cards?: Card[];
};

export type GridMenu = {
  kind: "grid";
  key: string;
  label: string;
  width: number;
  useCases: string[];
  services: { caption: string; items: string[] };
  quote: { title: string; cta: string };
  aiBuilds: string[];
  erp: string[];
};

export type PlainNav = { kind: "plain"; key: string; label: string };

export type NavEntry = ProductsMenu | GridMenu | PanelMenu | PlainNav;

export const announcement = {
  text: "Learn how to make your agent prove it and build reliable assurance across web and mobile",
  cta: "Join Builders Masterclass →",
};

export const headerActions = {
  search: "⌘K",
  signIn: "Login",
  sales: "Book a Demo",
  start: "Get Started Free",
};

export const NAV: NavEntry[] = [
  {
    kind: "products",
    key: "products",
    label: "Products",
    width: 1010,
    kane: {
      caption: "End-to-End Agent Testing",
      items: [
        {
          name: "KaneAI",
          desc: "World's first end-to-end software testing agent",
        },
        {
          name: "Kane CLI",
          desc: "Automate E2E flows on local browser with natural language",
          badge: "New",
        },
      ],
    },
    agentTest: {
      caption: "Test the AI agents you build",
      items: [
        { name: "Conversational agents" },
        { name: "Video agents" },
        { name: "IVR & voice" },
        { name: "Agent Assurance", badge: "Beta" },
      ],
    },
    cloud: {
      caption: "Run tests on cloud",
      items: [
        { name: "Automation" },
        { name: "HyperExecute" },
        { name: "Live Testing" },
        { name: "Real Device Cloud" },
        { name: "Native App Automation" },
        { name: "Browser Cloud" },
      ],
    },
    quality: {
      caption: "Quality and management",
      items: [
        { name: "Test Management" },
        { name: "SmartUI" },
        { name: "Accessibility Testing" },
        { name: "Performance Testing" },
      ],
    },
  },
  {
    kind: "grid",
    key: "solutions",
    label: "Solutions",
    width: 1046,
    useCases: [
      "Cross browser testing",
      "Mobile app testing",
      "Responsive testing",
      "API testing",
      "Functional testing",
      "Regression testing",
      "Automated UI testing",
      "Continuous testing",
      "Shift left testing",
      "Codeless testing",
      "Low code testing",
      "Geolocation testing",
      "Localization testing",
      "Local page testing",
      "Accessibility testing",
      "IVR testing",
    ],
    services: {
      caption: "Testing services",
      items: ["TestMu AI Professional services"],
    },
    quote: { title: "Not sure which plan to choose?", cta: "Book a Demo" },
    aiBuilds: ["Vibe coding", "Lovable", "Bolt", "v0", "Cursor", "Replit"],
    erp: ["Salesforce", "SAP", "Oracle", "Workday", "ServiceNow"],
  },
  {
    kind: "panel",
    key: "resources",
    label: "Resources",
    width: 982,
    cols: "190px 190px 190px",
    gap: "48px",
    railWidth: 260,
    groups: [
      {
        caption: "Developers",
        items: [
          { name: "Documentation" },
          { name: "API reference" },
          { name: "Integrations" },
          { name: "MCP Server", badge: "New" },
          { name: "Accessibility DevTools" },
          { name: "Languages & frameworks" },
          { name: "GitHub repositories" },
          { name: "Changelog" },
        ],
      },
      {
        caption: "Learn",
        items: [
          { name: "Blog" },
          { name: "Learning Hub" },
          { name: "Customer stories" },
          { name: "Webinars" },
          { name: "Certifications" },
        ],
      },
      {
        caption: "Company",
        items: [
          { name: "About us" },
          { name: "Careers" },
          { name: "Partners" },
          { name: "Community" },
          { name: "Newsroom" },
          { name: "QA job board" },
          { name: "LambdaTest is TestMu AI" },
        ],
      },
    ],
    cardsCaption: "What's new",
    cards: [
      {
        name: "Agent Assurance",
        desc: "Multi-agent testing platform of AI agents.",
        image: "/img/agent-assurance-card.png",
        cta: "Join the waitlist",
      },
    ],
  },
  { kind: "plain", key: "enterprise", label: "Enterprise" },
  { kind: "plain", key: "customers", label: "Customers" },
  { kind: "plain", key: "pricing", label: "Pricing" },
];
