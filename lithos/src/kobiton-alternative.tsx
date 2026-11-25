import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import { customerPosts } from "./alternatives/reviews";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* Kobiton alternative page (kobiton-alternative.html), in the approved
   alternatives flow (alternatives/AlternativePage): no "when to choose"
   bento, pricing after the reviews.

   Facts come from the live page (testmuai.com/kobiton-alternative, scored
   against Kobiton's public pages on 29 September 2026):
   - its 19-row table becomes the head to head; the billing rows move to
     the pricing fold, which also carries its 8-row pricing table;
   - its three migration steps are the switch steps;
   - its "which alternative fits" cards go into the pricing description
     and the FAQ;
   - its four other device clouds get their facts from TestMu AI's Sauce
     Labs alternative page. */

/* ---------- head to head ---------- */

const duel: MatrixGroup[] = [
  {
    label: "Coverage",
    rows: [
      { name: "What you can test", values: ["Native apps, mobile web and desktop web", "Mobile apps and mobile browsers"] },
      { name: "Desktop browser grid", values: ["3,000+ browser and OS combinations", "Not documented"] },
      { name: "Real Android and iOS devices", values: ["50,000+ real devices", "No total count published"] },
      { name: "Location testing", values: ["IP geolocation in 170+ countries, plus GPS", "Location mocking"] },
      { name: "Scripted frameworks", values: ["Appium, Espresso, XCUITest, Detox, Selenium, Playwright, Cypress", "Appium, Selenium, Espresso, XCUITest and more"] },
    ],
  },
  {
    label: "Automation and AI",
    rows: [
      { name: "AI test authoring", values: ["KaneAI writes tests in plain English, exports Appium", "Appium script generation, limited below Enterprise"] },
      { name: "Self-healing", values: ["Auto-healing for broken locators", "On Enterprise"] },
      { name: "Debugging a failed run", values: ["Video, device and network logs, AI root-cause analysis", "Session replay with live device metrics"] },
      { name: "Test orchestration", values: ["HyperExecute, up to 70% faster", "Claims 3x faster script runs"] },
      { name: "AI coding agent access", values: ["TestMu AI MCP Server, on every account", "From Claude, Copilot, Cursor, Gemini or Codex"] },
    ],
  },
  {
    label: "Deployment and security",
    rows: [
      { name: "Deployment options", values: ["Public, dedicated or on-premise device cloud", "Public cloud, private slots (5-device minimum), on-premise on Enterprise"] },
      { name: "Devices you already own", values: ["Private Real Device Cloud on Enterprise", "Device Lab Management"] },
      { name: "CI/CD and tool integrations", values: ["120+ CI/CD and DevOps tools", "Jira, Jenkins, Azure DevOps, CircleCI, Bitrise and more"] },
      { name: "Security certification", values: ["SOC 2 Type II, ISO 27001, GDPR, HIPAA", "SOC 2 Type II"] },
    ],
  },
];

/* ---------- the wider market: the live page's four other device clouds,
   with their facts from TestMu AI's Sauce Labs alternative page ---------- */

const altColumns = ["Alternative", "Plans", "Real devices", "Standout feature"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: ["Free plan; real devices from $39/mo per parallel", "50,000+", "Apps and websites in one account, priced per parallel"],
  },
  {
    name: "Sauce Labs",
    href: "https://www.testmuai.com/saucelabs-alternative/",
    cells: ["28-day trial, then $39/mo per test", "10,000+", "Error reporting for production crashes"],
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
    name: "HeadSpin",
    href: "https://www.testmuai.com/headspin-alternative/",
    cells: ["Free trial; from $39/mo, billed yearly", "SIM devices in 50+ countries", "130+ built-in performance KPIs"],
  },
];

/* ---------- questions ---------- */

const faq = [
  {
    q: "What is the best Kobiton alternative?",
    a: "For teams that test both mobile apps and websites, TestMu AI. It runs Appium, Espresso and XCUITest on 50,000+ real devices, adds 3,000+ desktop browser and OS combinations, and prices per parallel session instead of a monthly minute allowance. Kobiton fits teams whose main need is managing devices they already own.",
  },
  {
    q: "How much does Kobiton cost?",
    a: "Startup is from $83 a month with 500 minutes, Accelerate from $399 a month with 3,000 minutes, and Scale from $9,000 a year with 7,500 minutes a month, sold annually only. Enterprise is a custom quote and adds unlimited users, unlimited Appium script generation, self-healing execution and dedicated or on-premise devices.",
  },
  {
    q: "Is Kobiton or TestMu AI cheaper for a small team?",
    a: "It depends on volume. Under 500 real-device minutes a month, Kobiton's $83 Startup plan costs less than one TestMu AI automation parallel at $199. Beyond that, Kobiton's next plan is $399 a month for 3,000 minutes, while TestMu AI adds capacity one parallel at a time, and its live plans include unlimited testing time.",
  },
  {
    q: "Can I run my Kobiton Appium tests on TestMu AI?",
    a: "Yes. It usually takes new credentials, a new hub URL and updated capabilities, not a rewrite. Set isRealMobile to true to run on physical devices; without it, a session starts on an emulator or simulator.",
  },
  {
    q: "Does Kobiton support desktop web browser testing?",
    a: "Kobiton describes a real-device mobile platform and does not document a desktop browser grid. TestMu AI covers native apps on real devices and 3,000+ browser and OS combinations with Selenium, Playwright, Cypress and Puppeteer.",
  },
  {
    q: "Does TestMu AI support biometric and camera testing like Kobiton?",
    a: "Yes. Both test biometrics and camera input on real devices. TestMu AI can pass or fail fingerprint and Face ID prompts, including repeated failures and PIN fallback, and feed an image to the camera for QR and document-scan flows.",
  },
  {
    q: "Does Kobiton offer AI testing features?",
    a: "Yes, with plan limits. Kobiton's Appium script generation is limited on Startup, Accelerate and Scale, and self-healing execution is on Enterprise. KaneAI writes tests from plain English, PRDs or Jira tickets, self-heals and exports Appium code, from $17 per agent a month, billed annually.",
  },
  {
    q: "Can I run TestMu AI on-premise, like Kobiton's on-premise devices?",
    a: "Yes. TestMu AI offers public, dedicated and on-premise real device clouds, and the private real device cloud runs inside your environment on an Enterprise contract. Kobiton also sells dedicated and on-premise devices on Enterprise.",
  },
  {
    q: "How many real devices does Kobiton have?",
    a: "Kobiton publishes no total device count on its homepage or pricing page. TestMu AI publishes 50,000+ real Android and iOS devices and adds new flagship models within weeks of release. Check the specific models you need in both catalogs during a trial.",
  },
  gartnerFaq,
];

/* ---------- the hero picture: the same Appium test before and after ----------
   Kobiton takes the app as a kobiton-store ID and its own capabilities;
   TestMu AI takes an lt:// app ID and lt:options with isRealMobile. Both
   pass credentials in the hub URL, so every side has ten rows. */

const opts: ShotLine = { code: ["var opts = new UiAutomator2Options()"] };
const device: ShotLine = { code: ["  .setDeviceName(", { s: '"Pixel 9"' }, ")"] };
const blank: ShotLine = { code: [] };
const hubOpen: ShotLine = { code: ["URL hub = new URL("] };
const driver: ShotLine = { code: ["driver = new AndroidDriver(hub, opts);"] };

const before: ShotLine[] = [
  opts,
  device,
  { change: true, code: ["  .setApp(", { s: '"' }, { w: "kobiton-store:12345" }, { s: '"' }, ")"] },
  { change: true, code: ["  .amend(", { sw: "kobiton:sessionName" }, ", ", { s: '"Checkout"' }, ")"] },
  { change: true, code: ["  .amend(", { sw: "kobiton:deviceGroup" }, ", ", { s: '"KOBITON"' }, ");"] },
  blank,
  hubOpen,
  { change: true, code: ["  ", { s: '"https://' }, { w: "USERNAME:API_KEY" }, { s: '@"' }, " +"] },
  { change: true, code: ["  ", { s: '"' }, { w: "api.kobiton.com" }, { s: '/wd/hub"' }, ");"] },
  driver,
];

const after: ShotLine[] = [
  opts,
  device,
  { change: true, code: ["  .setApp(", { s: '"' }, { w: "lt://APP12345" }, { s: '"' }, ")"] },
  { change: true, code: ["  .amend(", { sw: "lt:options" }, ", Map.of("] },
  { change: true, code: ["    ", { sw: "isRealMobile" }, ", true));"] },
  blank,
  hubOpen,
  { change: true, code: ["  ", { s: '"https://' }, { w: "LT_USERNAME:LT_ACCESS_KEY" }, { s: '@"' }, " +"] },
  { change: true, code: ["  ", { s: '"' }, { w: "mobile-hub.lambdatest.com" }, { s: '/wd/hub"' }, ");"] },
  driver,
];

mountAlternativePage({
  rival: "Kobiton",
  hero: {
    lines: ["Kobiton alternatives,", "compared feature by feature"],
    promise:
      "Kobiton meters mobile testing by the minute. TestMu AI covers apps and websites in one account, priced per parallel with unlimited live testing.",
    /* a hero fold scene of its own; no two alternative pages share one */
    scene: "/kit/hero/kobiton-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="Kobiton" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and Kobiton,",
    title: "feature by feature",
    body: "Scored against Kobiton's homepage, pricing page, Trust Center and docs on 29 September 2026. Where Kobiton publishes no figure, the row says so.",
    groups: duel,
  },
  switchBody:
    "Most Appium, Espresso and XCUITest suites move over with configuration changes only. Your test logic stays the same.",
  /* the live page's three migration steps */
  switchSteps: [
    {
      title: "Bring your app builds",
      body: "Upload an .apk, .aab or .ipa, or install from the App Store, Play Store or TestFlight. Each upload gets an app ID.",
      scene: "/kit/img/shore.webp",
      ui: "export",
      panel: "App upload",
      lines: ["checkout.apk uploaded", "App ID lt://APP12345"],
    },
    {
      title: "Point Appium at the new hub",
      body: "Swap the hub URL and credentials, set isRealMobile to true, and pick devices by name and OS version.",
      scene: "/kit/img/hills.webp",
      ui: "run",
      cmd: "mvn test",
    },
    {
      title: "Run in parallel from CI",
      body: "Trigger runs from Jenkins, GitHub Actions or any of 120+ CI/CD tools, and hand large suites to HyperExecute.",
      scene: "/kit/img/meadow.webp",
      ui: "results",
      results: [
        { name: "Checkout flow", sub: "Pixel 9, Android 15", ok: true },
        { name: "Sign in", sub: "iPhone 16 Pro, iOS 18", ok: true },
        { name: "Search filters", sub: "Galaxy S25, Android 15", ok: false },
      ],
    },
  ],
  alts: {
    lead: "Five Kobiton alternatives,",
    title: "side by side",
    body: "The device clouds teams comparing Kobiton check most. Plans, real devices and one standout feature for each, from every vendor's own pricing pages and docs, checked November 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "Every row scored against Kobiton's homepage, pricing page, Trust Center and docs as published on 29 September 2026, and TestMu AI's pricing and docs. Kobiton's performance figures are quoted as its own claims.",
    stats: [
      { label: "Feature groups", value: String(duel.length) },
      { label: "Rows compared", value: String(duel.reduce((n, g) => n + g.rows.length, 0)) },
      { label: "Alternatives", value: String(alts.length) },
      { label: "Sources checked", value: "Sep 2026" },
    ],
    notes: [
      {
        text: "HeadSpin, SIM devices on live carrier networks, against TestMu AI.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/headspin-alternative/",
      },
      {
        text: "pCloudy, another real device cloud, against TestMu AI.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/pcloudy-alternative/",
      },
    ],
  },
  reviews: {
    lead: "What customers say about",
    title: "TestMu AI",
    body: "Posts from customers and partners, as they shared them.",
    items: customerPosts,
  },
  pricing: {
    lead: "Kobiton sells minutes,",
    title: "TestMu AI sells parallel sessions",
    body: "Under 500 real-device minutes a month, Kobiton's Startup plan costs less. Beyond that, TestMu AI adds capacity one parallel at a time, with unlimited live testing. List prices checked 29 September 2026.",
    rival: {
      price: "$83",
      note: "/month for 500 minutes",
      label: "How it is sold",
      items: [
        "Startup: 500 real-device minutes a month",
        "Accelerate: $399 a month for 3,000 minutes",
        "Scale: $9,000 a year for 7,500 minutes a month",
        "Self-healing and on-premise devices on Enterprise",
        "Free trial, terms not published",
      ],
    },
    ours: {
      price: "$39",
      note: "/parallel a month",
      flag: "Unlimited live time",
      label: "What you get",
      items: [
        "Real device live testing with unlimited time, billed annually",
        "Real device automation at $199 per parallel",
        "Desktop web automation at $79 per parallel",
        "KaneAI from $17 per agent a month",
        "Free plan: 100 automation minutes, 2 parallels, no card",
      ],
    },
  },
  faq,
  enterprise: {
    title: "Ready to leave Kobiton?",
    body: "Talk to our team about plans, parallel sessions and a move that fits your renewal date.",
  },
});
