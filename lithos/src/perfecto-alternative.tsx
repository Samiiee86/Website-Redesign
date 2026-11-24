import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import { customerPosts } from "./alternatives/reviews";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* Perfecto alternative page (perfecto-alternative.html), in the same flow
   as the BrowserStack and Sauce Labs pages (alternatives/AlternativePage).

   The live page (testmuai.com/perfecto-alternative) is thin: one table of
   ticks, four short answers, no prices, no other alternatives. So:
   - the head to head keeps every row of the live table, grouped;
   - Perfecto's trial and pricing terms, and the other alternatives' facts,
     come from TestMu AI's own Sauce Labs and BrowserStack alternative
     pages (checked October and November 2026);
   - the FAQ answers are rewritten from those facts. */

/* ---------- head to head: every row of the live table ---------- */

const duel: MatrixGroup[] = [
  {
    label: "AI testing",
    rows: [
      { name: "Gen-AI testing agent", values: [true, false] },
      { name: "AI test creation and maintenance", values: [true, false] },
      { name: "AI insights", values: ["Advanced", "Limited"] },
    ],
  },
  {
    label: "Testing",
    rows: [
      { name: "Test orchestration", values: [true, false] },
      { name: "Accessibility testing", values: ["WCAG 2.0 and 2.1", "WCAG 2.0"] },
      { name: "IP geolocation", values: [true, "Limited"] },
      { name: "Frameworks", values: ["All major frameworks", "Limited"] },
    ],
  },
  {
    label: "Plans and support",
    rows: [
      { name: "Free plan", values: [true, "14-day trial"] },
      { name: "Pricing", values: ["Self-serve, from $15/mo", "Quote only, 12-month minimum"] },
      { name: "Cost", values: ["40% lower", "Almost 3x TestMu AI"] },
      { name: "Support", values: ["24/7", "Email only"] },
    ],
  },
];

/* ---------- the wider market ---------- */

const altColumns = ["Alternative", "Plans", "Real devices", "Standout feature"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: ["Free plan, then $15/mo", "50,000+", "HyperExecute runs suites up to 70% faster"],
  },
  {
    name: "BrowserStack",
    href: "https://www.testmuai.com/browserstack-alternative/",
    cells: ["Free trial; App Live from $39/mo per user", "Real iOS and Android devices", "SIM devices for OTP and Apple Pay on Team Pro"],
  },
  {
    name: "Sauce Labs",
    href: "https://www.testmuai.com/saucelabs-alternative/",
    cells: ["28-day trial, then $39/mo per test", "10,000+", "Error reporting for production crashes"],
  },
  {
    name: "AWS Device Farm",
    href: "https://www.testmuai.com/aws-device-farm-alternative/",
    cells: ["1,000 free minutes once, then $0.17 a minute", "List published, no total count", "Managed Appium endpoint with private VPC access"],
  },
  {
    name: "Kobiton",
    href: "https://www.testmuai.com/kobiton-alternative/",
    cells: ["Free trial; from $83/mo for 500 minutes", "Count not published", "Camera image injection, in the cloud or on-premise"],
  },
  {
    name: "HeadSpin",
    href: "https://www.testmuai.com/headspin-alternative/",
    cells: ["Free trial; from $39/mo, billed yearly", "SIM devices in 50+ countries", "130+ built-in performance KPIs"],
  },
  {
    name: "TestGrid",
    href: "https://www.testmuai.com/testgrid-alternative/",
    cells: ["Proof of concept; from $249/mo per seat", "Count not published", "On-premise device lab behind your firewall"],
  },
  {
    name: "BitBar",
    cells: ["14-day trial, then per parallel", "Thousands (vendor stated)", "Private cloud with dedicated devices"],
  },
];

/* ---------- questions ---------- */

const faq = [
  {
    q: "What is the best alternative to Perfecto?",
    a: "For most web and mobile teams, TestMu AI: a free plan, self-serve prices from $15 a month, 3,000+ browser and OS combinations, 50,000+ real devices, KaneAI for writing tests in plain language and HyperExecute, which runs suites up to 70% faster than traditional grids.",
  },
  {
    q: "Is there a free Perfecto alternative?",
    a: "Yes. TestMu AI has a free plan with no credit card, with 100 lifetime automation minutes and 300 HyperExecute minutes. Perfecto offers a 14-day free trial.",
  },
  {
    q: "How much does Perfecto cost?",
    a: "Perfecto's paid plans are quote only, with a 12-month minimum term. TestMu AI publishes self-serve prices: live testing from $15 a month, billed annually, with Enterprise plans on quote.",
  },
  {
    q: "How good is Perfecto?",
    a: "Perfecto is an enterprise testing cloud with real and virtual devices, including devices connected to live carrier networks. The trade-offs are quote-only plans, email-only support and accessibility checks for WCAG 2.0 only.",
  },
  {
    q: "How do I move my tests from Perfecto?",
    a: "Your Selenium and Appium test logic stays the same. Replace the securityToken in perfecto:options with your LT_USERNAME and LT_ACCESS_KEY in LT:Options, and point tests at hub.lambdatest.com, or mobile-hub.lambdatest.com for Appium.",
  },
  gartnerFaq,
];

/* ---------- the hero picture: the same test before and after ----------
   Perfecto signs in with one security token, TestMu AI with a username
   and an access key, so the token line faces two lines (a filler keeps
   the sides level), and Perfecto's long hub address takes two lines. */

const common1: ShotLine = { code: ["caps.setCapability(", { s: '"browserName"' }, ", ", { s: '"Chrome"' }, ");"] };
const common2: ShotLine = { code: ["HashMap<String, Object> opts = new HashMap<>();"] };
const blank: ShotLine = { code: [] };
const hubOpen: ShotLine = { code: ["URL hub = new URL("] };
const driver: ShotLine = { code: ["driver = new RemoteWebDriver(hub, caps);"] };
const filler: ShotLine = { filler: true, code: [] };

const before: ShotLine[] = [
  common1,
  common2,
  { change: true, code: ["opts.put(", { sw: "securityToken" }, ", ", { w: "PERFECTO_TOKEN" }, ");"] },
  filler,
  { change: true, code: ["caps.setCapability(", { sw: "perfecto:options" }, ", opts);"] },
  blank,
  hubOpen,
  { change: true, code: [{ s: '"https://' }, { w: "demo.perfectomobile.com" }, { s: '"' }, " +"] },
  { change: true, code: [{ s: '"/' }, { w: "nexperience/perfectomobile" }, { s: '/wd/hub"' }, ");"] },
  driver,
];

const after: ShotLine[] = [
  common1,
  common2,
  { change: true, code: ["opts.put(", { sw: "username" }, ", ", { w: "LT_USERNAME" }, ");"] },
  { change: true, code: ["opts.put(", { sw: "accessKey" }, ", ", { w: "LT_ACCESS_KEY" }, ");"] },
  { change: true, code: ["caps.setCapability(", { sw: "LT:Options" }, ", opts);"] },
  blank,
  hubOpen,
  { change: true, code: [{ s: '"https://' }, { w: "hub.lambdatest.com" }, { s: '/wd/hub"' }, ");"] },
  filler,
  driver,
];

mountAlternativePage({
  rival: "Perfecto",
  hero: {
    lines: ["Perfecto alternatives,", "compared feature by feature"],
    promise:
      "A free plan and self-serve prices from $15 a month, where Perfecto is quote only. 3,000+ browsers and 50,000+ real devices.",
    /* the "vs" hero fold's scene, shared by the compare pages */
    scene: "/kit/hero/browserstack-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="Perfecto" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and Perfecto,",
    title: "feature by feature",
    body: "Perfecto sells quote-only plans with a 12-month minimum term, so this compares what each includes rather than list prices.",
    groups: duel,
  },
  switchBody:
    "Keep your Selenium and Appium tests when you leave Perfecto. Three steps from your current suite to your first run on TestMu AI.",
  alts: {
    lead: "Eight Perfecto alternatives,",
    title: "side by side",
    body: "Plans, real devices and one standout feature for each, from every vendor's own pricing pages and docs, checked November 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "Perfecto against TestMu AI, from Perfecto's product pages and docs and TestMu AI's pricing and docs. Perfecto does not publish prices, so plans are compared by how they are sold.",
    stats: [
      { label: "Feature groups", value: String(duel.length) },
      { label: "Rows compared", value: String(duel.reduce((n, g) => n + g.rows.length, 0)) },
      { label: "Alternatives", value: String(alts.length) },
      { label: "Sources checked", value: "Nov 2026" },
    ],
    notes: [
      {
        text: "Sauce Labs and seven other device clouds, side by side.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/saucelabs-alternative/",
      },
      {
        text: "BrowserStack against TestMu AI, product by product.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/browserstack-alternative/",
      },
    ],
  },
  reviews: {
    lead: "What customers say about",
    title: "TestMu AI",
    body: "Posts from customers and partners, as they shared them.",
    items: customerPosts,
  },
  faq,
  enterprise: {
    title: "Ready to leave Perfecto?",
    body: "Talk to our team about plans, parallel sessions and a move that fits your renewal date.",
  },
});
