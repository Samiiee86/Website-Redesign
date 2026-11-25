import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import { Panel, Rows } from "./alternatives/ChoosePanels";
import { deployment, hyperexecute, realDevices } from "./alternatives/choose-views";
import { customerPosts } from "./alternatives/reviews";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* Sauce Labs alternative page (saucelabs-alternative.html), in the same
   flow as the BrowserStack one (see alternatives/AlternativePage.tsx).

   Copy is trimmed from the live page (testmuai.com/saucelabs-alternative):
   its 15-row table becomes the rows that differ most, the eight
   alternatives keep one standout feature each, the four migration steps
   become the three switch steps (the tunnel step moves to the FAQ), and
   prices are the live page's, checked 17 November 2026. */

/* ---------- head to head ---------- */

const duel: MatrixGroup[] = [
  {
    label: "Live testing",
    rows: [
      { name: "Free plan", values: [true, "28-day trial"] },
      { name: "Price, 1 parallel", values: ["$15/mo", "$39/mo"] },
    ],
  },
  {
    label: "Automation",
    rows: [
      { name: "Desktop web, 1 parallel", values: ["$79/mo", "$149/mo"] },
      { name: "Test orchestration", values: ["HyperExecute, up to 70% faster", "saucectl sharding"] },
    ],
  },
  {
    label: "Real devices",
    rows: [
      { name: "Real devices", values: ["50,000+", "10,000+"] },
      { name: "IP geolocation", values: ["Built in", "WonderProxy, desktop only"] },
      { name: "On-premise devices", values: ["On Enterprise plans", "Hosted clouds only"] },
    ],
  },
  {
    label: "AI and quality",
    rows: [
      { name: "AI test authoring", values: ["KaneAI, from $17 per agent", "Enterprise add-on"] },
      { name: "AI root cause analysis", values: ["On demand or by policy", "Enterprise plan"] },
      { name: "Visual testing", values: ["2,000 screenshots included", "500 snapshots a month"] },
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
    name: "Perfecto",
    href: "https://www.testmuai.com/perfecto-alternative/",
    cells: ["14-day trial, then quote only", "Count not published", "Devices on live carrier networks"],
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
    q: "Which is the best Sauce Labs alternative?",
    a: "It depends on what you test. TestMu AI fits most web and mobile teams, with a free plan, 3,000+ browser and OS combinations, 50,000+ real devices and HyperExecute, which runs suites up to 70% faster than traditional grids. BrowserStack fits teams that want a large device pool, AWS Device Farm teams that pay per device minute, and HeadSpin performance testing on SIM devices.",
  },
  {
    q: "Is there a free Sauce Labs alternative?",
    a: "Yes. TestMu AI has a free plan with no credit card, with 100 lifetime automation minutes, 300 HyperExecute minutes and 5 real device sessions a month. Sauce Labs offers a 28-day trial instead.",
  },
  {
    q: "How much does Sauce Labs cost?",
    a: "Sauce Labs prices per parallel test, billed annually: Live Testing at $39 a month, Virtual Device Cloud at $149 and Real Device Cloud at $199, with a quote-only Enterprise tier. TestMu AI lists $15 for live testing, $79 for desktop web automation and $199 for real device automation.",
  },
  {
    q: "How good is Sauce Labs?",
    a: "Sauce Labs is a mature platform: it has run since 2008, its co-founder created Selenium, and it holds SOC 2 Type II and ISO 27001, 27701 and 42001. It also sells Sauce Error Reporting for production crash monitoring, which TestMu AI does not offer. The main trade-off is AI: its test authoring and insights agents need an Enterprise plan.",
  },
  {
    q: "How do I move my tests from Sauce Labs?",
    a: "Your Selenium and Appium test logic stays the same. Swap SAUCE_USERNAME and SAUCE_ACCESS_KEY for LT_USERNAME and LT_ACCESS_KEY, point tests at hub.lambdatest.com (or mobile-hub.lambdatest.com for Appium), and map sauce:options to LT:Options. For local and private sites, the TestMu AI Tunnel replaces Sauce Connect.",
  },
  {
    q: "Can TestMu AI run on-premise?",
    a: "Yes. On Enterprise plans, TestMu AI runs real devices and HyperExecute inside your own infrastructure. Sauce Labs hosts test execution in its own public and private clouds.",
  },
  gartnerFaq,
];

/* ---------- the hero picture: the same test before and after ---------- */

const common1: ShotLine = { code: ["caps.setCapability(", { s: '"browserName"' }, ", ", { s: '"Chrome"' }, ");"] };
const common2: ShotLine = { code: ["HashMap<String, Object> opts = new HashMap<>();"] };
const blank: ShotLine = { code: [] };
const hubOpen: ShotLine = { code: ["URL hub = new URL("] };
const driver: ShotLine = { code: ["driver = new RemoteWebDriver(hub, caps);"] };

const before: ShotLine[] = [
  common1,
  common2,
  { change: true, code: ["opts.put(", { s: '"username"' }, ", ", { w: "SAUCE_USERNAME" }, ");"] },
  { change: true, code: ["opts.put(", { s: '"accessKey"' }, ", ", { w: "SAUCE_ACCESS_KEY" }, ");"] },
  { change: true, code: ["caps.setCapability(", { sw: "sauce:options" }, ", opts);"] },
  blank,
  hubOpen,
  { change: true, code: [{ s: '"https://' }, { w: "ondemand.us-west-1.saucelabs.com" }, { s: '/wd/hub"' }, ");"] },
  driver,
];

const after: ShotLine[] = [
  common1,
  common2,
  { change: true, code: ["opts.put(", { s: '"username"' }, ", ", { w: "LT_USERNAME" }, ");"] },
  { change: true, code: ["opts.put(", { s: '"accessKey"' }, ", ", { w: "LT_ACCESS_KEY" }, ");"] },
  { change: true, code: ["caps.setCapability(", { sw: "LT:Options" }, ", opts);"] },
  blank,
  hubOpen,
  { change: true, code: [{ s: '"https://' }, { w: "hub.lambdatest.com" }, { s: '/wd/hub"' }, ");"] },
  driver,
];

mountAlternativePage({
  rival: "Sauce Labs",
  hero: {
    lines: ["Sauce Labs alternatives,", "compared feature by feature"],
    promise:
      "Start free, then live testing from $15 a month against $39 on Sauce Labs. 50,000+ real devices and 3,000+ browsers.",
    /* a hero fold scene of its own; no two alternative pages share one */
    scene: "/kit/hero/saucelabs-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="Sauce Labs" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and Sauce Labs,",
    title: "feature by feature",
    body: "Both price per parallel session. Monthly list prices, billed annually, checked November 2026.",
    groups: duel,
  },
  pricing: {
    lead: "Sauce Labs from $39,",
    title: "TestMu AI from $15",
    body: "Both price per parallel session. Monthly list prices, billed annually, checked 17 November 2026.",
    rival: {
      price: "$39",
      note: "/parallel a month",
      label: "How it is sold",
      items: [
        "Live Testing at $39 per parallel a month",
        "Virtual Device Cloud at $149 per parallel",
        "Real Device Cloud at $199 per parallel",
        "28-day trial, then no free plan",
        "AI agents need an Enterprise plan",
      ],
    },
    ours: {
      price: "$15",
      note: "/parallel a month",
      flag: "Listed prices",
      label: "What you get",
      items: [
        "Live testing at $15 per parallel a month",
        "Desktop web automation at $79 per parallel",
        "Real device automation at $199 per parallel",
        "Free plan with no credit card",
        "KaneAI from $17 per agent a month",
      ],
    },
  },
  choose: {
    lead: "When to choose",
    title: "TestMu AI or Sauce Labs",
    body: "Pick by what you test and where it has to run, and stay where Sauce Labs is strongest.",
    items: [
      {
        pick: "Pick TestMu AI",
        title: "Five times the real devices",
        body: "Sauce Labs runs 10,000+ real devices. TestMu AI runs 50,000+ real Android and iOS devices.",
        media: realDevices("/kit/hero/browser-emulator-online/hero-bg.jpg"),
      },
      {
        pick: "Pick TestMu AI",
        title: "Faster suites without sharding by hand",
        body: "Sauce Labs splits suites with saucectl. HyperExecute splits, retries and reports for you, and runs suites up to 70% faster.",
        media: hyperexecute("/kit/hero/cross-browser-testing/hero-bg.jpg"),
      },
      {
        pick: "Pick TestMu AI",
        title: "Real devices behind your firewall",
        body: "Sauce Labs hosts test runs in its own clouds. TestMu AI runs real devices and HyperExecute inside your network on Enterprise.",
        media: deployment("/kit/hero/appium-mobile-testing/hero-bg.jpg"),
      },
      {
        pick: "Stay on Sauce Labs",
        title: "Crash reports from production",
        body: "Sauce Labs sells Sauce Error Reporting for production crash monitoring, which TestMu AI does not offer.",
        media: (
          <Panel title="Stay on Sauce Labs when" scene={"/kit/hero/automation-testing-platform/hero-bg.jpg"}>
            <Rows
              rows={[
                { name: "Error reporting", sub: "Production crash monitoring", tag: "Sauce Labs" },
                { name: "A long track record", sub: "Running since 2008", tag: "Mature" },
                { name: "ISO 42001", sub: "With SOC 2 Type II and ISO 27001", tag: "Certified" },
              ]}
            />
          </Panel>
        ),
      },
    ],
  },
  switchBody:
    "Keep your Selenium and Appium tests when you leave Sauce Labs. Three steps from your current suite to your first run on TestMu AI.",
  alts: {
    lead: "Eight Sauce Labs alternatives,",
    title: "side by side",
    body: "Plans, real devices and one standout feature for each, from every vendor's own pricing pages and docs, checked 17 November 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "Sauce Labs against TestMu AI, from the Sauce Labs pricing page, sign-up page and docs, and TestMu AI's pricing and docs. Prices are monthly list prices in USD, billed yearly.",
    stats: [
      { label: "Feature groups", value: String(duel.length) },
      { label: "Rows compared", value: String(duel.reduce((n, g) => n + g.rows.length, 0)) },
      { label: "Alternatives", value: String(alts.length) },
      { label: "Prices checked", value: "Nov 2026" },
    ],
    notes: [
      {
        text: "Sauce Labs Real Device Cloud against TestMu AI, device by device.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/blog/testmu-vs-saucelabs-real-device-cloud/",
      },
      {
        text: "Sauce AI against KaneAI, the two test authoring agents.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/blog/testmu-vs-sauce-ai/",
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
    title: "Ready to leave Sauce Labs?",
    body: "Talk to our team about plans, parallel sessions and a move that fits your renewal date.",
  },
});
