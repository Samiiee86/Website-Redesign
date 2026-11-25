import { gartnerFaq, mountAlternativePage } from "./alternatives/AlternativePage";
import MigrateShot, { type ShotLine } from "./alternatives/MigrateShot";
import { customerPosts } from "./alternatives/reviews";
import { CodePanel, Panel, Rows } from "./alternatives/ChoosePanels";
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
    /* the live page's "Kane CLI and mabl agentic testing harness" columns */
    label: "Coding agent checks",
    rows: [
      { name: "Check before a pull request", values: ["Writes and runs a test in real Chrome", "Finds affected tests, flags gaps"] },
      { name: "Result in CI", values: ["Fails the pull request on a failed check", "Advisory, always exits 0"] },
      { name: "Mobile devices", values: ["Real Android and iOS devices", "Virtual, or Android over USB"] },
      { name: "Where tests are saved", values: ["A _test.md file in your repo", "mabl's cloud workspace"] },
    ],
  },
  {
    label: "Plans and security",
    rows: [
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
    a: "Yes. The mabl CLI exports browser tests as Playwright or Selenium IDE files, and test cases as CSV. The code runs on TestMu AI's cloud grid with an endpoint change, and the CSV imports into Test Manager. Some steps do not export, such as file uploads, drag and drop, API steps and email tests, so you re-create those in KaneAI in plain English. Export your mabl run history too before you leave.",
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
    /* a hero fold scene of its own; no two alternative pages share one */
    scene: "/kit/hero/mabl-alternative/hero-bg.jpg",
    screen: <MigrateShot rival="mabl" before={before} after={after} />,
  },
  duel: {
    lead: "TestMu AI and mabl,",
    title: "feature by feature",
    body: "Every mabl cloud test runs on Linux and every mabl cloud device is virtual. Checked against mabl's docs and pricing page, November 2026.",
    groups: duel,
  },
  switchBody:
    "KaneAI does not import mabl tests, so the move starts from mabl's own export. Three steps from your mabl workspace to your first run on TestMu AI.",
  /* the live page's six migration steps, as three */
  switchSteps: [
    {
      title: "Export your tests from mabl",
      body: "Export each browser test as Playwright or Selenium IDE code, and the test cases you keep as CSV.",
      scene: "/kit/img/shore.webp",
      ui: "export",
      cmd: "mabl tests export --format playwright",
    },
    {
      title: "Run the code on TestMu AI",
      body: "Point the Playwright code at the TestMu AI endpoint, and import the CSV into Test Manager.",
      scene: "/kit/img/hills.webp",
      ui: "run",
      cmd: "npx playwright test",
    },
    {
      title: "Re-create the rest in KaneAI",
      body: "Write mobile tests and the steps the export drops in plain English, then run them all on HyperExecute.",
      scene: "/kit/img/meadow.webp",
      ui: "results",
    },
  ],
  pricing: {
    lead: "mabl quotes every plan,",
    title: "TestMu AI lists every price",
    body: "mabl bills cloud runs in credits, so costs are harder to predict. Prices checked 17 November 2026.",
    rival: {
      price: "Quote only",
      note: "No list prices",
      label: "How it is sold",
      items: [
        "Plans start at 500 cloud-run credits a month",
        "A browser cloud run uses 1 credit, a mobile run 5 and an API run 0.1",
        "Mobile app testing is a paid add-on",
        "Unused credits reset each billing period",
        "Median contract of $36,000 a year, from Vendr contract data",
      ],
    },
    ours: {
      price: "$199",
      note: "/parallel a month",
      flag: "Listed prices",
      label: "What you get",
      items: [
        "Billed annually, for web and native app tests on real Android and iOS devices",
        "KaneAI at $17, $89 or $179 per agent a month, billed annually",
        "Native mobile test authoring on KaneAI Max",
        "Free tiers with no credit card",
        "Every plan price on the pricing page",
      ],
    },
  },
  choose: {
    lead: "When to choose",
    title: "TestMu AI or mabl",
    body: "Pick by what you test and where it has to run.",
    items: [
      {
        pick: "Pick TestMu AI",
        title: "Native apps on real devices",
        body: "mabl runs native app tests on virtual devices. TestMu AI runs them on 50,000+ real Android and iOS devices.",
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
        title: "Safari on macOS and Edge on Windows",
        body: "mabl runs every cloud test on Linux, with WebKit in place of Safari. TestMu AI runs real Safari, Edge and older versions across 3,000+ combinations.",
        media: (
          <Panel title="Browsers" note="3,000+ combinations" scene="/kit/hero/cross-browser-testing/hero-bg.jpg">
            <Rows
              rows={[
                { name: "Safari 26", sub: "macOS Tahoe", tag: "macOS" },
                { name: "Edge 148", sub: "Windows 11", tag: "Windows" },
                { name: "Chrome 120", sub: "Windows 10", tag: "Older version" },
              ]}
            />
          </Panel>
        ),
      },
      {
        pick: "Pick TestMu AI",
        title: "Mobile tests as Appium code",
        body: "mabl exports browser tests, but not mobile tests. KaneAI exports web tests as Selenium or Playwright and mobile tests as Appium.",
        media: (
          <CodePanel
            scene="/kit/hero/appium-mobile-testing/hero-bg.jpg"
            tabs={["Selenium", "Playwright", "Appium"]}
            active="Appium"
            lines={[
              'driver.findElement(AppiumBy.accessibilityId("Search"))',
              '    .sendKeys("running shoes");',
              'driver.findElement(AppiumBy.accessibilityId("Add to cart"))',
              "    .click();",
            ]}
          />
        ),
      },
      {
        pick: "Pick mabl",
        title: "Only current browsers on Linux",
        body: "mabl covers current Chrome, Edge, Firefox and WebKit on Linux, and its quote includes unlimited cloud concurrency.",
        media: (
          <Panel title="Linux" note="Current versions" scene="/kit/hero/automation-testing-platform/hero-bg.jpg">
            <Rows
              rows={[
                { name: "Chrome", sub: "Current version", tag: "Linux" },
                { name: "Edge and Firefox", sub: "Current versions", tag: "Linux" },
                { name: "WebKit", sub: "Current version", tag: "Linux" },
              ]}
            />
          </Panel>
        ),
      },
    ],
  },
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
