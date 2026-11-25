import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import { customerPosts } from "./alternatives/reviews";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* mabl alternative page (mabl-alternative.html), in the same flow as the
   BrowserStack, Sauce Labs and Perfecto pages (alternatives/AlternativePage).

   Facts come from the live page (testmuai.com/mabl-alternative, checked
   17 November 2026): its 20-row table becomes the rows that differ most,
   the seven alternatives keep their plans, authoring and one standout
   feature, and the FAQ keeps the live page's answers, shortened.

   mabl is not a device cloud: tests live in mabl's workspace. The way out
   is mabl's own Playwright or Selenium IDE export, so the hero shows an
   exported Playwright test moving from a local browser to TestMu AI. */

/* ---------- head to head ---------- */

const duel: MatrixGroup[] = [
  {
    label: "Devices and browsers",
    rows: [
      { name: "Real iOS and Android devices", values: [true, "Virtual devices only"] },
      { name: "Cloud mobile devices", values: ["50,000+ real devices", "16 virtual device models"] },
      { name: "Cloud desktop OS", values: ["Windows, macOS, Linux", "Linux only"] },
      { name: "Safari on real macOS", values: [true, "WebKit on Linux"] },
      { name: "Older browser versions", values: [true, "Current version only"] },
    ],
  },
  {
    label: "Running tests",
    rows: [
      { name: "Existing Selenium or Playwright suites", values: ["Endpoint change, 50+ frameworks", "Import converts to mabl"] },
      { name: "Test orchestration", values: ["HyperExecute, up to 70% faster", "Plans with stages and retries"] },
      { name: "On-premise or private cloud", values: ["On Enterprise plans", "SaaS, US-hosted data"] },
    ],
  },
  {
    label: "AI test authoring",
    rows: [
      { name: "Test authoring inputs", values: ["Jira, PDFs, images, video, PRs", "Text, requirements, test cases"] },
      { name: "Code export", values: ["Selenium, Playwright, Appium", "Browser tests only"] },
    ],
  },
  {
    label: "Plans and security",
    rows: [
      { name: "Published pricing", values: ["KaneAI from $17 per agent", "Quote only"] },
      { name: "Free plan", values: [true, "14-day trial"] },
      { name: "Security certifications", values: ["SOC 2 Type II, ISO 27001, 27017, 27701", "SOC 2 Type II"] },
    ],
  },
];

/* ---------- the wider market ---------- */

const altColumns = ["Alternative", "Plans", "Test authoring", "Standout feature"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: [
      "Free plan, no card; KaneAI from $17 per agent/mo",
      "Plain English, Jira, PDFs or video, exported as Selenium, Playwright or Appium",
      "KaneAI tests run on 50,000+ real devices",
    ],
  },
  {
    name: "Tricentis Testim",
    href: "https://www.testmuai.com/testim-alternative/",
    cells: [
      "Free Community plan; paid plans quote only",
      "Recorder with AI Smart Locators; code export on Pro",
      "A separate product for Salesforce app testing",
    ],
  },
  {
    name: "testRigor",
    href: "https://www.testmuai.com/testrigor-alternative/",
    cells: [
      "Free plan with public tests; Private plan price not published",
      "Plain-English steps; code export not published",
      "Finds elements as they appear on screen, without locators",
    ],
  },
  {
    name: "Momentic",
    href: "https://www.testmuai.com/momentic-ai-alternative/",
    cells: [
      "Free plan with 2,000 credits/mo; pay as you go from $125/mo",
      "Plain-English YAML steps; one-time Playwright export at contract end",
      "MCP access to drive it from your own agents",
    ],
  },
  {
    name: "Katalon",
    cells: [
      "Free plan for local runs; Professional $2,199 per seat/yr",
      "Record and playback, keywords or Groovy scripts",
      "One IDE for web, API, mobile and desktop tests",
    ],
  },
  {
    name: "Testsigma",
    cells: [
      "No free plan listed; Pro and Enterprise on request",
      "Plain-English steps and a recorder; code export not published",
      "Atto, a team of AI agents for authoring and maintenance",
    ],
  },
  {
    name: "QA Wolf",
    href: "https://www.testmuai.com/qa-wolf-alternative/",
    cells: [
      "Free runs to start; $1 per web run, $2 per mobile run",
      "Agents write Playwright and Appium code you can export",
      "QA engineers embedded in your team as a service",
    ],
  },
];

/* ---------- questions ---------- */

const faq = [
  {
    q: "What is the best mabl alternative?",
    a: "It depends on how you want to own and run your tests. TestMu AI fits most teams: KaneAI writes tests in plain English, exports them as Selenium, Playwright or Appium code and runs them on 50,000+ real devices at listed prices. QA Wolf fits teams that want a service, Katalon one IDE for web, API, mobile and desktop, and Momentic web teams that want a free credit plan.",
  },
  {
    q: "How much does mabl cost?",
    a: "mabl does not publish prices. Plans start at 500 cloud-run credits a month: a browser run uses 1 credit and a mobile run 5, and unused credits reset each period. Vendr's data puts the median mabl contract at $36,000 a year. TestMu AI lists KaneAI at $17, $89 and $179 per agent a month, and real device automation at $199 per parallel, billed annually.",
  },
  {
    q: "Is mabl free?",
    a: "No. mabl has a 14-day trial and no free plan, and trial workspaces are deleted 90 days after the trial ends. TestMu AI's free tiers need no card and have no trial clock, and the SmartUI free plan includes 2,000 visual screenshots.",
  },
  {
    q: "Which mabl alternative is best for mobile testing?",
    a: "Pick a tool that runs native apps on real devices. mabl runs native cloud tests on 16 virtual device models, sells mobile app testing as an add-on and runs mobile web in a mobile-emulating browser. TestMu AI runs Appium, Espresso and XCUITest suites on 50,000+ real devices, and KaneAI Max writes native app tests in plain English and exports them as Appium code.",
  },
  {
    q: "Can I export my tests out of mabl?",
    a: "Yes. The mabl CLI exports browser tests as Playwright or Selenium IDE files, and test cases as CSV. The code runs on TestMu AI's cloud grid with an endpoint change, and the CSV imports into Test Manager. Some steps do not export, such as file uploads, drag and drop, API steps and email tests, so you re-create those in KaneAI in plain English.",
  },
  {
    q: "Does mabl run cloud tests on Windows or macOS?",
    a: "No. All mabl cloud tests run on Linux, with one current version each of Chrome, Edge, Firefox and WebKit. TestMu AI covers 3,000+ browser and OS combinations, including Safari on real macOS, Edge on Windows and older browser versions.",
  },
  gartnerFaq,
];

/* ---------- the hero picture: the same exported test before and after ----------
   mabl's Playwright export runs in a local browser; on TestMu AI the same
   test connects to the cloud instead. The five lines of local launch
   settings face the five lines of cloud settings, so no row is empty. */

const imports: ShotLine = { code: ["const { chromium } = require(", { s: '"playwright"' }, ");"] };
const page: ShotLine = { code: ["const page = await browser.newPage();"] };
const goto: ShotLine = { code: ["await page.goto(", { s: '"https://shop.example.com"' }, ");"] };
const click: ShotLine = { code: ["await page.click(", { s: '"text=Add to cart"' }, ");"] };

const before: ShotLine[] = [
  imports,
  { change: true, code: ["const browser = await chromium.", { w: "launch" }, "({"] },
  { change: true, code: ["  ", { w: "headless" }, ": true,"] },
  { change: true, code: ["  channel: ", { sw: "chrome" }, ","] },
  { change: true, code: ["  viewport: { width: 1280, height: 720 },"] },
  { change: true, code: ["});"] },
  page,
  goto,
  click,
];

const after: ShotLine[] = [
  imports,
  { change: true, code: ["const caps = { ", { sw: "LT:Options" }, ": {"] },
  { change: true, code: ["  user: ", { w: "LT_USERNAME" }, ", accessKey: ", { w: "LT_ACCESS_KEY" }, " } };"] },
  { change: true, code: ["const browser = await chromium.", { w: "connect" }, "("] },
  { change: true, code: ["  ", { s: '"wss://' }, { w: "cdp.lambdatest.com" }, { s: '/playwright"' }, " +"] },
  { change: true, code: ["  ", { s: '"?capabilities="' }, " + JSON.stringify(caps));"] },
  page,
  goto,
  click,
];

mountAlternativePage({
  rival: "mabl",
  hero: {
    lines: ["mabl alternatives,", "compared feature by feature"],
    promise:
      "Tests you own, exported as Selenium, Playwright or Appium code, on 50,000+ real devices at listed prices. mabl quotes every plan.",
    /* the "vs" hero fold's scene, shared by the compare pages */
    scene: "/kit/hero/browserstack-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="mabl" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and mabl,",
    title: "feature by feature",
    body: "Every mabl cloud test runs on Linux and every mabl cloud device is virtual. Checked against mabl's docs and pricing page, November 2026.",
    groups: duel,
  },
  switchBody:
    "Export your browser tests from mabl as Playwright or Selenium IDE code. Then three steps to your first run on TestMu AI.",
  alts: {
    lead: "Seven mabl alternatives,",
    title: "side by side",
    body: "Plans, test authoring and one standout feature for each, from every vendor's own pricing pages and docs, checked 17 November 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "mabl against TestMu AI, from mabl's pricing page, help center and CLI reference, and TestMu AI's docs for KaneAI, Kane CLI and the real device cloud. mabl quotes every plan, so plans are compared by how they are sold.",
    stats: [
      { label: "Feature groups", value: String(duel.length) },
      { label: "Rows compared", value: String(duel.reduce((n, g) => n + g.rows.length, 0)) },
      { label: "Alternatives", value: String(alts.length) },
      { label: "Sources checked", value: "Nov 2026" },
    ],
    notes: [
      {
        text: "Tricentis Testim, the recorder-based AI tool, against TestMu AI.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/testim-alternative/",
      },
      {
        text: "testRigor, plain-English tests, against TestMu AI.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/testrigor-alternative/",
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
    title: "Ready to leave mabl?",
    body: "Talk to our team about plans, real devices and a move that fits your renewal date.",
  },
});
