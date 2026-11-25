import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import { customerPosts } from "./alternatives/reviews";
import { CodePanel, Panel, Rows } from "./alternatives/ChoosePanels";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* Tricentis Testim alternative page (testim-alternative.html), in the
   same flow as the mabl page (alternatives/AlternativePage).

   Facts come from the live page (testmuai.com/testim-alternative, last
   updated 6 November 2026, Testim prices checked 19 November 2026):
   - its 17-row table and its "KaneAI vs Testim" points become the head to
     head, in groups;
   - its pricing block is the pricing fold;
   - its four migration steps become the three switch steps;
   - "when to stay on Testim" and the reasons to switch are the bento;
   - the eight alternatives keep best for, plans and the limitation. */

/* ---------- head to head ---------- */

const duel: MatrixGroup[] = [
  {
    label: "AI test authoring",
    rows: [
      { name: "Test authoring inputs", values: ["Text, Jira, PDFs, video, recordings", "Recorder, JavaScript steps, prompts"] },
      { name: "Code export", values: ["Selenium and Playwright on every plan", "Professional plan only"] },
      { name: "Appium code export", values: ["Appium Python, Max plan", false] },
      { name: "When the UI changes", values: ["Auto-heal, each fix reviewed", "AI smart locators"] },
      { name: "Coding agents and CI", values: ["Kane CLI fails the pull request", "Testim Copilot inside Testim"] },
    ],
  },
  {
    label: "Browsers and devices",
    rows: [
      { name: "Browsers on the vendor grid", values: ["3,000+ browser and OS combinations", "4 browsers"] },
      { name: "Real iOS and Android devices", values: ["50,000+ real devices", "Extra purchase or third-party grid"] },
      { name: "Native app tests", values: ["Real devices, KaneAI Max", "Simulators and emulators"] },
      { name: "Frameworks you can run", values: ["Selenium, Cypress, TestCafe, 50+", "Not documented"] },
      { name: "Test orchestration", values: ["HyperExecute, up to 70% faster", "Not documented"] },
    ],
  },
  {
    label: "Checks in the same run",
    rows: [
      { name: "API checks inside UI tests", values: ["REST, SOAP and databases from Pro", "Professional plan only"] },
      { name: "Accessibility testing", values: ["WCAG reports in KaneAI runs", "Professional plan, Chrome only"] },
      { name: "Visual regression", values: ["SmartUI, 2,000 free screenshots", "Applitools license, Professional plan"] },
      { name: "Salesforce metadata steps", values: [false, "Testim Salesforce"] },
    ],
  },
  {
    label: "Plans and support",
    rows: [
      { name: "Free plans", values: ["Test Manager, SmartUI, 100 automation minutes", "One Community plan per organization"] },
      { name: "Support on paid automation plans", values: ["24/7", "24x5 chat"] },
      { name: "CI/CD integrations", values: ["120+ integrations", "8 CI guides, npm CLI"] },
    ],
  },
];

/* ---------- the wider market ---------- */

const altColumns = ["Alternative", "Best for", "Plans", "Limitation"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: [
      "AI authoring with code export, plus browsers, real devices, test management and visual testing",
      "Free tiers; KaneAI from $17 per agent/mo",
      "No import of Testim tests",
    ],
  },
  {
    name: "mabl",
    href: "https://www.testmuai.com/mabl-alternative/",
    cells: [
      "Low-code web and API tests, with performance and accessibility built in",
      "14-day trial; quote, from 500 cloud credits a month",
      "Mobile is an add-on",
    ],
  },
  {
    name: "testRigor",
    href: "https://www.testmuai.com/testrigor-alternative/",
    cells: [
      "Plain-English tests across web, mobile, desktop and API",
      "Free start; plans on its pricing page",
      "Desktop only on paid versions",
    ],
  },
  {
    name: "Autify Aximo",
    cells: [
      "Agent-written tests from plain language, web and mobile",
      "2,000 one-time credits; from $99/mo, billed yearly",
      "Desktop and on-premise on Enterprise only",
    ],
  },
  {
    name: "Momentic",
    href: "https://www.testmuai.com/momentic-ai-alternative/",
    cells: [
      "Usage-based AI web tests, with no per-seat fees",
      "Free with 2,000 credits/mo; $125/mo plus usage",
      "Mobile runs on emulators and simulators",
    ],
  },
  {
    name: "Katalon",
    cells: [
      "Low-code or scripted tests at a known per-seat price",
      "Free local plan; $1,800 per seat/yr",
      "AI features only on paid plans",
    ],
  },
  {
    name: "Tricentis Tosca",
    href: "https://www.testmuai.com/tricentis-alternative/",
    cells: [
      "Staying with Tricentis for model-based, packaged-app automation",
      "Free trial; quote only",
      "Heavier than Testim for custom web apps",
    ],
  },
  {
    name: "Playwright",
    cells: [
      "Tests as code, with no license fee",
      "Free and open source",
      "No AI authoring or self-healing built in",
    ],
  },
];

/* ---------- questions ---------- */

const faq = [
  {
    q: "What is the best alternative to Testim?",
    a: "TestMu AI, for AI test authoring with code export and real devices in one account. mabl is the closest low-code experience, testRigor and Autify Aximo fit plain-language tests, and Playwright fits teams that want free, code-first tests.",
  },
  {
    q: "How much does Testim cost?",
    a: "Testim does not publish prices. Testim Web, Mobile and Salesforce are sold by quote, with unlimited runs and extra parallel tests sold separately, plus one free Community plan per organization. Vendr reports contracts of $15,000 to $40,000 a year for small to mid-sized teams. KaneAI by TestMu AI costs $17, $89 or $179 per agent a month, billed annually.",
  },
  {
    q: "What is the cheapest Testim alternative?",
    a: "Playwright is free. Among AI tools, Momentic has 2,000 free credits a month, and KaneAI Starter costs $17 per agent a month, with Kane CLI giving 10,000 free credits for 30 days. Testim's Community plan is free, but has no code export and is limited to one per organization.",
  },
  {
    q: "Can I export Testim tests as Selenium or Playwright?",
    a: "Only on the Professional plan, which exports Puppeteer, Selenium and Playwright code; some steps may not convert, and there is no Appium export. KaneAI generates Selenium, Playwright and Appium code from any test saved as ready.",
  },
  {
    q: "How do I move my tests from Testim to TestMu AI?",
    a: "KaneAI does not import Testim tests. On Testim Professional, export each test as Playwright code and run it on TestMu AI by swapping the local browser launch for the TestMu AI endpoint. Import your test list into Test Manager, then re-create the tests that do not export, including Testim Mobile tests, in KaneAI.",
  },
  {
    q: "Can Testim test native mobile apps?",
    a: "Yes, with Testim Mobile, a separate product. Its cloud runs iOS simulators and Android emulators, and real devices are an extra purchase or a third-party grid. TestMu AI runs Appium, Espresso and XCUITest on 50,000+ real devices, and KaneAI Max writes mobile tests in plain language.",
  },
  {
    q: "What is a good alternative to Testim Copilot?",
    a: "Kane CLI by TestMu AI lets Claude Code, Cursor, Codex and Gemini CLI write and run tests, and fails the pull request when a check fails. KaneAI exports the tests as Selenium, Playwright or Appium code.",
  },
  {
    q: "Can I buy Testim without talking to sales?",
    a: "No. Every Testim product leads to a sales contact, and payment is by check or wire. TestMu AI lists per-parallel prices for automation and per-agent prices for KaneAI, with a free account that needs no card.",
  },
  gartnerFaq,
];

/* ---------- the hero picture: the same exported test before and after ----------
   Testim Professional exports a test as Playwright code that launches a
   local browser; on TestMu AI the same test connects to the cloud. The
   five lines of launch settings face the five lines of cloud settings. */

const imports: ShotLine = { code: ["const { chromium } = require(", { s: '"playwright"' }, ");"] };
const page: ShotLine = { code: ["const page = await browser.newPage();"] };
const goto: ShotLine = { code: ["await page.goto(", { s: '"https://app.example.com/login"' }, ");"] };
const click: ShotLine = { code: ["await page.click(", { s: '"text=Sign in"' }, ");"] };

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
  rival: "Testim",
  hero: {
    lines: ["Testim alternatives,", "compared feature by feature"],
    promise:
      "Tests you can export as code, browsers and real devices in one account, and listed prices. KaneAI starts at $17 per agent a month; Testim quotes every plan.",
    /* a hero fold scene of its own; no two alternative pages share one */
    scene: "/kit/hero/testim-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="Testim" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and Tricentis Testim,",
    title: "feature by feature",
    body: "Testim quotes every plan, exports code only on Professional and sells real devices separately. Checked against Testim's pricing page and docs, November 2026.",
    groups: duel,
  },
  pricing: {
    lead: "Testim quotes every plan,",
    title: "TestMu AI lists every price",
    body: "Testim sells runs as unlimited but parallel tests on top, by quote. Prices checked 19 November 2026.",
    rival: {
      price: "Quote only",
      note: "No list prices",
      label: "How it is sold",
      items: [
        "Testim Web, Mobile and Salesforce sold by quote",
        "Unlimited runs, with parallel tests bought on top",
        "One free Community plan per organization",
        "Bought through sales, paid by check or wire",
        "$15,000 to $40,000 a year for small to mid-sized teams, from Vendr",
      ],
    },
    ours: {
      price: "$17",
      note: "/agent a month",
      flag: "Listed prices",
      label: "What you get",
      items: [
        "KaneAI Starter, billed annually; Pro $89 and Max $179",
        "Web automation from $79 per parallel a month",
        "Kane CLI free to install, with 10,000 credits for 30 days",
        "Free tiers with no credit card",
        "Every plan price on the pricing page",
      ],
    },
  },
  choose: {
    lead: "When to choose",
    title: "TestMu AI or Testim",
    body: "Pick by why you are switching, and stay where Testim is strongest.",
    items: [
      {
        pick: "Pick TestMu AI",
        title: "Tests as code you own",
        body: "Testim exports code only on Professional, with no Appium. KaneAI exports Selenium and Playwright on every plan, and Appium on Max.",
        media: (
          <CodePanel
            scene="/kit/hero/appium-mobile-testing/hero-bg.jpg"
            tabs={["Selenium", "Playwright", "Appium"]}
            active="Playwright"
            lines={[
              'await page.goto("https://app.example.com/login");',
              'await page.fill("#email", "qa@example.com");',
              'await page.click("text=Sign in");',
              'await expect(page).toHaveURL(/dashboard/);',
            ]}
          />
        ),
      },
      {
        pick: "Pick TestMu AI",
        title: "Native apps on real devices",
        body: "Testim Mobile runs on simulators and emulators, with real devices sold separately. TestMu AI runs them on 50,000+ real Android and iOS devices.",
        media: (
          <Panel title="Real devices" note="50,000+" scene="/kit/hero/browser-emulator-online/hero-bg.jpg">
            <Rows
              rows={[
                { name: "iPhone 16 Pro", sub: "iOS 18", tag: "Real device", ok: true },
                { name: "Galaxy S25", sub: "Android 15", tag: "Real device", ok: true },
                { name: "Pixel 9", sub: "Android 15", tag: "Real device", ok: true },
              ]}
            />
          </Panel>
        ),
      },
      {
        pick: "Pick TestMu AI",
        title: "API, database and visual checks in one run",
        body: "Testim keeps API steps, accessibility and Applitools on Professional. KaneAI Pro checks APIs, databases and WCAG in the same run, and SmartUI catches visual changes.",
        media: (
          <Panel title="Test run" note="Checkout flow" scene="/kit/hero/cross-browser-testing/hero-bg.jpg">
            <Rows
              rows={[
                { name: "REST API", sub: "POST /orders returns 201", tag: "Passed", ok: true },
                { name: "Database", sub: "Order saved in PostgreSQL", tag: "Passed", ok: true },
                { name: "WCAG 2.2", sub: "No contrast issues", tag: "Passed", ok: true },
              ]}
            />
          </Panel>
        ),
      },
      {
        pick: "Stay on Testim",
        title: "Salesforce, or all in on Tricentis",
        body: "Testim Salesforce has metadata-aware steps that KaneAI does not, and Testim fits teams consolidating on Tricentis or on the free Community plan.",
        media: (
          <Panel title="Stay on Testim when" scene="/kit/hero/automation-testing-platform/hero-bg.jpg">
            <Rows
              rows={[
                { name: "Testim Salesforce", sub: "Metadata-aware steps", tag: "Salesforce" },
                { name: "Tricentis suite", sub: "Tosca, qTest and SeaLights", tag: "Tricentis" },
                { name: "Community plan", sub: "One free plan per organization", tag: "Free" },
              ]}
            />
          </Panel>
        ),
      },
    ],
  },
  switchBody:
    "KaneAI does not import Testim tests, so the move starts from Testim's Playwright export on the Professional plan. Three steps to your first run on TestMu AI.",
  /* the live page's four migration steps, as three */
  switchSteps: [
    {
      title: "Export your tests from Testim",
      body: "On Testim Professional, copy each test as Playwright code, and export your test list as CSV.",
      scene: "/kit/img/shore.webp",
      ui: "export",
      panel: "Testim editor",
      lines: ["Copied as Playwright code", "Test list saved as CSV"],
    },
    {
      title: "Run the code on TestMu AI",
      body: "Swap the local browser launch for the TestMu AI endpoint, and bring your test cases into Test Manager.",
      scene: "/kit/img/hills.webp",
      ui: "run",
      cmd: "npx playwright test",
    },
    {
      title: "Re-create the rest in KaneAI",
      body: "Automate each remaining test case with KaneAI, including mobile tests, then run them all on HyperExecute.",
      scene: "/kit/img/meadow.webp",
      ui: "results",
    },
  ],
  alts: {
    lead: "Eight Testim alternatives,",
    title: "side by side",
    body: "What each is best for, how it sells and its main limitation, from every vendor's own pricing and product pages, checked 4 November 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "Testim against TestMu AI, from Testim's pricing page, product pages and Tricentis docs, and TestMu AI's pricing and docs for KaneAI and HyperExecute. Testim quotes every plan, so plans are compared by how they are sold.",
    stats: [
      { label: "Feature groups", value: String(duel.length) },
      { label: "Rows compared", value: String(duel.reduce((n, g) => n + g.rows.length, 0)) },
      { label: "Alternatives", value: String(alts.length) },
      { label: "Sources checked", value: "Nov 2026" },
    ],
    notes: [
      {
        text: "mabl, the closest low-code tool, against TestMu AI.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/mabl-alternative/",
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
    title: "Ready to leave Testim?",
    body: "Talk to our team about plans, real devices and a move that fits your renewal date.",
  },
});
