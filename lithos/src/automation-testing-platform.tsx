import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  ArrowLeftRight,
  ArrowUp,
  Check,
  Cloud,
  EyeOff,
  KeyRound,
  Link2,
  MonitorOff,
  MousePointerClick,
  ShieldCheck,
  Signal,
  SquareTerminal,
  TextCursorInput,
  Waypoints,
  X,
} from "lucide-react";
import "./index.css";
import { ArrowChip, Section } from "./lib/ui";
import { integrations } from "./lib/content";
import { scenery } from "./lib/scenery";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Stories from "./sections/Stories";
import Rebrand from "./sections/Rebrand";
import Reasons from "./sections/Reasons";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import { FoldHead } from "./pieces/compare/parts";

/* Automation testing platform page (automation-testing-platform.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, the rebrand note, more reasons (without its
     integrations card: integrations have their own fold here), FAQ with
     this page's questions, the closing enterprise call and the footer.
   - The hero is the page's own hero fold (Web redesign/hero-folds/
     automation-testing-platform): its copy, video and painted scene, in
     the kit's hero-media markup.
   - Every other section starts from a kit fold: feature-tour (the
     platform, one tab per module), feature-pointers-stat (agent skills),
     framework-cards, bento (capabilities, with the live page's pictures),
     feature-pointers (beyond the basics; the QA lifecycle),
     feature-cards-image (enterprise HyperExecute).
   - Integrations: the home page's integrations fold, with the MCP server
     and Kane CLI added under it as two joined boxes.

   Copy is the live page's (testmuai.com/automation-testing-platform),
   in sentence case. */

const SIGNUP = "https://accounts.testmuai.com/register";
const SITE = "https://www.testmuai.com";
const IMG = "https://assets.testmuai.com/resources/images";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* the kit's black underlined link with its sliding arrow */
function KitLink({ children, as = "span", href }: { children: ReactNode; as?: "a" | "span"; href?: string }) {
  const inner = (
    <>
      {children}
      <span className="tm-arw" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </>
  );
  return as === "a" ? (
    <a className="tm-link" href={href}>
      {inner}
    </a>
  ) : (
    <span className="tm-link">{inner}</span>
  );
}

/* ---------- hero: the page's hero fold, in the kit's hero-media ---------- */

const HERO = "/kit/hero/automation-testing-platform";

function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">Agentic AI test</span>
            <span className="tm-nowrap">automation platform</span>
          </h1>
          <p className="tm-hero__promise">
            Run your Selenium, Playwright, Puppeteer, Cypress, and Appium tests
            on a scalable platform across 3000+ real browsers and devices,
            without local grids.
          </p>
        </div>
        <div className="tm-actions tm-hero__actions">
          <a className="tm-btn tm-btn--primary tm-btn--arrow" href={SIGNUP}>
            Start free with Google
            <span className="tm-chip" aria-hidden="true">
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          </a>
          <a className="tm-btn tm-btn--secondary" href={SIGNUP}>
            Start free with Email
          </a>
        </div>
        <div className="tm-hero__stage">
          <img className="tm-scene" src={`${HERO}/hero-bg.jpg`} alt="" />
          <div className="tm-hero__screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${HERO}/ac-demo-poster.jpg`}
              aria-label="Product demo: run a Selenium suite from the terminal, then review the test run, commands and video in the dashboard"
            >
              <source src={`${HERO}/ac-demo.webm`} type="video/webm" />
              <source src={`${HERO}/ac-demo.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- the platform: the kit's feature tour ----------

   One tab per module, as on the live page. Six tabs fill the frame
   without scrolling; CI/CD and enterprise have their own folds lower
   down (integrations, enterprise HyperExecute). Each panel shows a small
   TestMu AI view drawn from tokens on the kit's painted scene. */

const PANEL =
  "absolute left-10 top-12 flex w-[calc(100%-40px)] flex-col bg-surface [box-shadow:var(--tm-shadow-floating-md)]";
const HEAD = "flex items-center justify-between gap-3 border-b border-border px-5 py-4 text-b2 font-medium";
const ROW = "flex items-center justify-between gap-3 border-b border-border px-5 py-4 text-b2 last:border-b-0";
const MONO = "font-mono text-b3";

function Tag({ tone, children }: { tone: "ok" | "bad" | "plain"; children: ReactNode }) {
  const c =
    tone === "ok"
      ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]"
      : tone === "bad"
        ? "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]"
        : "bg-[var(--tm-bg-fill)] text-muted-foreground";
  return <span className={`tag flex-none rounded-sm px-1.5 py-0.5 font-mono text-b5 uppercase ${c}`}>{children}</span>;
}

const Ok = () => <Check size={16} strokeWidth={1.5} className="flex-none text-[var(--tm-fg-success)]" aria-hidden />;

type Tab = {
  tab: string;
  title: string;
  body: string;
  link: { label: string; href: string };
  perks: { b: string; p: string }[];
  ui: ReactNode;
};

const tour: Tab[] = [
  {
    tab: "Kane CLI",
    title: "Author web and mobile automation tests with AI from your terminal",
    body: "Describe a test in natural language and Kane CLI runs it on your web or mobile app. The same command runs on your machine, in CI, or inside an AI coding agent.",
    link: { label: "Try Kane CLI", href: `${SITE}/kane-cli/` },
    perks: [
      { b: "No selectors", p: "Describe each step in natural language and Kane CLI finds the right element for you, with no selectors or XPath to maintain." },
      { b: "Web and mobile", p: "Run the same test across web, the iOS Simulator, and the Android Emulator from one terminal command." },
      { b: "Built for CI", p: "Trigger tests from any CI/CD pipeline with standard exit codes, then run the whole suite in parallel on HyperExecute." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          <span className="flex items-center gap-2">
            <SquareTerminal size={16} strokeWidth={1.5} aria-hidden />
            Terminal
          </span>
          <span className={`${MONO} text-muted-foreground`}>kane-cli</span>
        </div>
        <div className={`${MONO} flex flex-col gap-2 px-4 py-4`}>
          <span><span className="text-muted-foreground">$</span> npm install -g kane-cli</span>
          <span>
            <span className="text-muted-foreground">$</span> kane-cli run{" "}
            <span className="text-[var(--tm-blue-500)]">"verify checkout flow on staging"</span>
          </span>
          <span className="flex items-center gap-2"><Ok /> 12 tests generated</span>
          <span className="flex items-center gap-2"><Ok /> 12 passed (41s)</span>
        </div>
      </div>
    ),
  },
  {
    tab: "AI test authoring",
    title: "Author tests in natural language with KaneAI",
    body: "Describe a scenario in natural language and KaneAI plans, authors, and maintains the test case for you, no scripting required.",
    link: { label: "View documentation", href: `${SITE}/support/docs/getting-started-with-kane-ai/` },
    perks: [
      { b: "From any spec", p: "Import Jira tickets, PRDs, images, or spreadsheets and KaneAI converts them into structured test cases." },
      { b: "Edit in plain words", p: "Edit and evolve test cases in natural language as your application changes, with zero script rewrites." },
      { b: "Run anywhere", p: "Trigger KaneAI-authored test cases from the terminal or any CI/CD pipeline using the Kane CLI integration." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          KaneAI
          <Tag tone="plain">New test</Tag>
        </div>
        {[
          { icon: Link2, text: "Go to www.testmuai.com" },
          { icon: MousePointerClick, text: "Click on login" },
          { icon: TextCursorInput, text: "Enter email as johndoe@acme.com" },
          { icon: TextCursorInput, text: "Enter password as *******" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className={ROW}>
            <span className="flex items-center gap-3">
              <Icon size={16} strokeWidth={1.5} className="text-muted-foreground" aria-hidden />
              {text}
            </span>
            <Ok />
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-b3">
          Click on login
          <span className="grid size-8 place-items-center rounded-full bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
            <ArrowUp size={16} strokeWidth={1.5} aria-hidden />
          </span>
        </div>
      </div>
    ),
  },
  {
    tab: "Playwright testing",
    title: "Run your existing Playwright suite at scale",
    body: "Run your existing Playwright suite on the test automation platform at scale without changing test code, reporters, or CI configuration.",
    link: { label: "View documentation", href: `${SITE}/support/docs/playwright-testing/` },
    perks: [
      { b: "3,000+ combinations", p: "Run Playwright test scripts in parallel across 3,000+ real browser, OS, and device combinations." },
      { b: "Auto-Healing", p: "Let Auto-Healing re-resolve broken locators at runtime to keep flaky tests out of your suite." },
      { b: "Real devices", p: "Execute Playwright tests on real Android and iOS devices for production-accurate test results." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          npx playwright test
          <span className={`${MONO} text-muted-foreground`}>4 workers</span>
        </div>
        {[
          { name: "Chromium", on: "Windows 11", t: "24s" },
          { name: "Firefox", on: "macOS Sonoma", t: "27s" },
          { name: "WebKit", on: "iPhone 16, real device", t: "31s", healed: true },
          { name: "Chrome", on: "Galaxy S25, real device", t: "29s" },
        ].map((r) => (
          <div key={r.name} className={ROW}>
            <span className="flex min-w-0 items-center gap-3">
              <Ok />
              <span className="font-medium">{r.name}</span>
              <span className="truncate text-muted-foreground">{r.on}</span>
            </span>
            <span className="flex items-center gap-3">
              {r.healed && <Tag tone="plain">Healed</Tag>}
              <span className={`${MONO} text-muted-foreground`}>{r.t}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tab: "Parallel execution",
    title: "Ship faster with parallel testing at scale",
    body: "Split your suite across concurrent cloud sessions and cut total run time from hours to minutes. No grid setup, no code changes.",
    link: { label: "Get started free", href: SIGNUP },
    perks: [
      { b: "On demand", p: "Scale concurrent test sessions on demand with no provisioning or queue time." },
      { b: "Every pull request", p: "Run a full regression suite on every pull request without blocking the release." },
      { b: "Your runner's config", p: "Set parallelism in your existing runner config, from Selenium threads to Playwright workers." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          Build #482
          <Tag tone="ok">Running</Tag>
        </div>
        <div className="grid grid-cols-10 gap-1 px-4 py-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className={`h-4 ${i < 44 ? "bg-[var(--tm-green-200)]" : "bg-[var(--tm-bg-fill)]"}`}
            />
          ))}
        </div>
        <div className={ROW}>
          <span className="text-muted-foreground">Parallel sessions</span>
          <span className="font-medium">50</span>
        </div>
        <div className={ROW}>
          <span className="text-muted-foreground">Tests</span>
          <span className="font-medium">1,240</span>
        </div>
        <div className={ROW}>
          <span className="text-muted-foreground">Run time</span>
          <span className="font-medium">6m 12s</span>
        </div>
      </div>
    ),
  },
  {
    tab: "HyperExecute",
    title: "Execute automation tests 70% faster with AI-native HyperExecute",
    body: "HyperExecute is an AI-native orchestration platform that executes automation suites up to 70% faster than a conventional cloud grid.",
    link: { label: "View documentation", href: `${SITE}/support/docs/getting-started-with-hyperexecute/` },
    perks: [
      { b: "Smart split", p: "Auto-split the test suite across runners with smart orchestration so more tests run in parallel." },
      { b: "Fail fast", p: "Fail fast and halt the entire job the moment a critical test breaks, so no compute is wasted." },
      { b: "Root cause", p: "Rerun only the failed tests while AI-driven root cause analysis pinpoints the exact failure." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          HyperExecute job
          <span className={`${MONO} text-muted-foreground`}>auto-split</span>
        </div>
        {[
          { name: "Runner 1", n: "312 tests", ok: true },
          { name: "Runner 2", n: "308 tests", ok: true },
          { name: "Runner 3", n: "310 tests", ok: false },
        ].map((r) => (
          <div key={r.name} className={ROW}>
            <span className="flex items-center gap-3">
              {r.ok ? <Ok /> : <X size={16} strokeWidth={1.5} className="text-[var(--tm-fg-error)]" aria-hidden />}
              <span className="font-medium">{r.name}</span>
              <span className="text-muted-foreground">{r.n}</span>
            </span>
            <Tag tone={r.ok ? "ok" : "bad"}>{r.ok ? "Passed" : "2 failed"}</Tag>
          </div>
        ))}
        <div className="flex flex-col gap-1 bg-[var(--tm-bg-fill)] px-4 py-3">
          <span className="font-mono text-b5 uppercase text-muted-foreground">Root cause</span>
          <span className="text-b3">Element not interactable: #checkout. Rerunning 2 tests.</span>
        </div>
      </div>
    ),
  },
  {
    tab: "Test reporting",
    title: "Debug test failures with AI reporting",
    body: "Every test session is captured in full and AI surfaces the exact failure, so your team resolves defects without reproducing them locally.",
    link: { label: "Get started free", href: SIGNUP },
    perks: [
      { b: "Full context", p: "Enable custom debug options and verbose logging to capture full context on every test failure." },
      { b: "Network and console", p: "Trace exactly where a request failed using network HAR logs, console logs, and session telemetry." },
      { b: "Performance and video", p: "Track per-session performance metrics and video logs to catch regressions before production." },
    ],
    ui: (
      <div className={PANEL}>
        <div className={HEAD}>
          Selenium Test #14
          <Tag tone="bad">Failed</Tag>
        </div>
        <div className="flex gap-4 border-b border-border px-4 py-2 text-b4 text-muted-foreground">
          <span className="text-foreground">Network</span>
          <span>Console</span>
          <span>Commands</span>
          <span>Video</span>
        </div>
        {[
          { m: "GET", p: "/api/products", s: "200", t: "182ms", ok: true },
          { m: "POST", p: "/api/cart", s: "500", t: "1.2s", ok: false },
          { m: "GET", p: "/checkout", s: "200", t: "240ms", ok: true },
        ].map((r) => (
          <div key={r.p} className={`${ROW} ${MONO}`}>
            <span className="flex items-center gap-3">
              <span className="w-10 text-muted-foreground">{r.m}</span>
              {r.p}
            </span>
            <span className="flex items-center gap-3">
              <span className={r.ok ? "text-muted-foreground" : "text-[var(--tm-fg-error)]"}>{r.s}</span>
              <span className="text-muted-foreground">{r.t}</span>
            </span>
          </div>
        ))}
        <div className="flex flex-col gap-1 bg-[var(--tm-bg-fill)] px-4 py-3">
          <span className="font-mono text-b5 uppercase text-muted-foreground">AI summary</span>
          <span className="text-b3">Add to cart failed: the cart API returned 500.</span>
        </div>
      </div>
    ),
  },
];

function Platform() {
  return (
    <Section>
      <FoldHead
        lead="From authoring to analysis"
        title="on one automation platform"
        body="One unified test automation platform where your team authors tests with AI, runs them at scale, and debugs failures with AI-native insights."
      >
        <a href={SIGNUP} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
          Start free with Google
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8" data-tm-step-root data-autoplay>
        <div className="tm-tour__tabs" role="tablist">
          {tour.map((t) => (
            <button key={t.tab} role="tab" data-step>
              {t.tab}
              <span className="tm-progress" aria-hidden="true" />
            </button>
          ))}
        </div>
        {tour.map((t, i) => (
          <div key={t.tab} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy">
                <h3 className="[text-wrap:balance]">{t.title}</h3>
                <p>{t.body}</p>
                <KitLink as="a" href={t.link.href}>
                  {t.link.label}
                </KitLink>
              </div>
              <div className="tm-tour__media">
                <img className="tm-scene" src="/kit/tour/bg-painted.jpg" alt="" loading="lazy" />
                {t.ui}
              </div>
            </div>
            <div className="tm-tour__perks">
              {t.perks.map((p) => (
                <div key={p.b}>
                  <b>{p.b}</b>
                  <p>{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- agent skills: the kit's feature pointers with a stat ---------- */

const skills = [
  { name: "Playwright skill", langs: "JS, TS, Python, Java, C#", logo: `${IMG}/playwright-automation-cloud.svg` },
  { name: "Selenium skill", langs: "Java, Python, JS, C#, Ruby", logo: `${IMG}/selenium-automation-cloud.svg` },
  { name: "Puppeteer skill", langs: "JS, TS", logo: `${IMG}/puppeteer-automation-cloud.svg` },
  { name: "Appium skill", langs: "Java, Python, JS, Ruby, C#", logo: `${IMG}/appium-automation-cloud.svg` },
];

const SKILLS_REPO = "https://github.com/LambdaTest/agent-skills";

function AgentSkills() {
  return (
    <Section>
      <FoldHead
        lead="Generate automated tests"
        title="with TestMu AI agent skills"
        body="Open-source skills for AI agents to generate production-grade Playwright, Selenium, Puppeteer, Appium tests and more. Works with 20+ AI agents across 15+ languages."
      >
        <a href={SKILLS_REPO} className="btn btn-lg btn-secondary mt-8">
          Explore agent skills on GitHub
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4">
          <div className="tm-stat-tile">
            <span className="tm-label">Agent skills</span>
            <div>
              <p className="tm-pixel">45+</p>
              <p>open-source skills across web and mobile frameworks. Agents author the code, you run it on TestMu AI infrastructure.</p>
            </div>
            <a className="tm-btn tm-btn--inverse tm-btn--arrow tm-btn--plain" href={SIGNUP}>
              Get started free
              <span className="tm-chip" aria-hidden="true">
                <span>
                  <Arrow />
                  <Arrow />
                </span>
              </span>
            </a>
          </div>
          {skills.map((s) => (
            <a key={s.name} className="tm-cell tm-pt" href={SKILLS_REPO}>
              <span className="tm-pt__ico tm-pt__ico--brand">
                <img src={s.logo} alt="" loading="lazy" />
              </span>
              <h3>{s.name}</h3>
              <p>{s.langs}</p>
              <KitLink>View on GitHub</KitLink>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- frameworks: the kit's framework cards ---------- */

const DOCS = `${SITE}/support/docs`;
const frameworks = [
  { name: "Selenium", body: "Run tests across browsers in Java, Python, JS, and more.", logo: "selenium", href: `${DOCS}/testmu-running-your-first-selenium-test/` },
  { name: "Playwright", body: "Cross-browser automation across Chromium, Firefox, and WebKit.", logo: "playwright", href: `${DOCS}/playwright-testing/` },
  { name: "Puppeteer", body: "Headless Chrome and Chromium automation via Node.js.", logo: "puppeteer", href: `${DOCS}/puppeteer-testing/` },
  { name: "Cypress", body: "End-to-end web app testing with real browser access.", logo: "cypress", href: `${DOCS}/getting-started-with-cypress-testing/` },
  { name: "Appium", body: "Automate native and hybrid apps on iOS and Android.", logo: "appium", href: `${DOCS}/getting-started-with-appium-testing/` },
  { name: "Espresso", body: "Native Android UI tests with built-in synchronization.", logo: "espresso", href: `${DOCS}/getting-started-with-espresso-testing/` },
  { name: "XCUITest", body: "Native UI test automation for iOS and macOS apps.", logo: "xcuitest", href: `${DOCS}/getting-started-with-xcuitest/` },
  { name: "Jest", body: "Write and run JavaScript tests with built-in mocking and coverage.", logo: "jest", href: `${DOCS}/javascript-with-selenium-running-javascript-automation-scripts-on-testmu-selenium-grid/?framework=jest` },
];

function Frameworks() {
  return (
    <Section>
      <FoldHead
        lead="Automate with leading"
        title="test automation frameworks"
        body="Run Selenium, Playwright, Cypress, and Puppeteer for web, or Appium, Espresso, and XCUITest for mobile. Bring your existing suites unchanged and scale them across 3,000+ browsers and 50,000+ real devices."
      >
        <a href={SIGNUP} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
          Start free testing
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4">
          {frameworks.map((f) => (
            <a key={f.name} className="tm-cell tm-pt" href={f.href}>
              <span className="tm-pt__ico tm-pt__ico--brand">
                <img src={`${IMG}/${f.logo}-automation-cloud.svg`} alt="" loading="lazy" />
              </span>
              <h3>{f.name}</h3>
              <p>{f.body}</p>
              <KitLink>Learn more</KitLink>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- capabilities: the kit's bento, as on the live page ----------

   The live page's six capabilities with its own pictures, which are
   already drawn at the kit's bento sizes (860 x 536 narrow, 1348 x 536
   wide) and in the same narrow / wide order. */

const BENTO = "/kit/bento";
const capabilities = [
  { size: "narrow", img: "auto-healing", name: "Self-healing locators", body: "When a locator changes or is renamed, the platform re-resolves it at runtime so a single DOM change no longer fails a passing test." },
  { size: "wide", img: "testmuai-smartwait", name: "SmartWait for stable runs", body: "Replace hardcoded sleep() calls with condition-based waits so a test pauses only until the element is actionable." },
  { size: "wide", img: "performance-reports-for-automated-tests", name: "Core web vitals per build", body: "Capture Lighthouse performance metrics from each test run without adding a separate auditing tool." },
  { size: "narrow", img: "geolocation-time-zone", name: "Geo and timezone emulation", body: "Validate localized flows across 170+ regions and timezones without proxies or physical devices." },
  { size: "narrow", img: "custom-header-injection", name: "HTTP header injection", body: "Inject custom HTTP headers into any test session to exercise auth states, feature flags, and A/B variants." },
  { size: "wide", img: "mock-video-injection", name: "Camera and media mocking", body: "Inject mock video into WebRTC and camera-based flows to automate them without physical hardware." },
];

function Capabilities() {
  return (
    <Section>
      <FoldHead
        lead="Capabilities baked into"
        title="every test session"
        body="Self-healing locators, smart waits, performance metrics and more, on every run with nothing extra to set up."
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-bento" data-tm-anim>
          {capabilities.map((c) => (
            <div key={c.name} className={`tm-bento__cell tm-bento__cell--${c.size}`}>
              <h3 className="tm-h4">{c.name}</h3>
              <p>{c.body}</p>
              {/* the whole picture, as on the live page: the kit's fixed
                  220px crop would cut the bottom of each one */}
              <div className="tm-bento__media !h-auto">
                <img className="tm-fit !h-auto" src={`${BENTO}/${c.img}.png`} alt="" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- beyond the basics: the kit's feature pointers ---------- */

const extras = [
  { icon: MonitorOff, name: "Headless execution", body: "Run automated tests in headless mode to maximize execution speed in your CI/CD pipeline." },
  { icon: Signal, name: "Network throttling", body: "Validate behavior under simulated 2G, 3G, 4G, and 5G network conditions before release." },
  { icon: KeyRound, name: "Secure tunnel", body: "Automate apps behind firewalls and VPNs over an encrypted private tunnel." },
  { icon: SquareTerminal, name: "Chrome DevTools Protocol", body: "Intercept requests, grab logs, and run performance traces on the cloud." },
  { icon: ArrowLeftRight, name: "WebDriver BiDi", body: "Stream live browser events to your test runner across Chrome and Firefox." },
  { icon: EyeOff, name: "Data masking", body: "Keep sensitive data out of logs and recordings during remote sessions." },
];

function BeyondBasics() {
  return (
    <Section>
      <FoldHead
        lead="Automate beyond"
        title="the basics"
        body="Simulate real network conditions, test web and mobile apps behind your firewall, drive the browser over CDP and WebDriver BiDi, and keep sensitive data out of your logs, on every test run."
      >
        <a href={SIGNUP} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
          Start free testing
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {extras.map(({ icon: Icon, name, body }) => (
            <div key={name} className="tm-cell tm-pt">
              <span className="tm-pt__ico">
                <Icon aria-hidden />
              </span>
              <h3>{name}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- enterprise HyperExecute: the kit's image cards ---------- */

const hyper = [
  {
    icon: Cloud,
    scene: "/kit/img/hills.webp",
    title: "HyperExecute for private cloud",
    body: "Keep every automated test run inside your private cloud, with all data behind your firewall and full control over runners and storage.",
  },
  {
    icon: ShieldCheck,
    scene: "/kit/img/meadow.webp",
    title: "Enterprise access and governance",
    body: "Run teams at scale with SSO, role-based access, audit trails, and policy enforcement applied across the whole organization.",
  },
  {
    icon: Waypoints,
    scene: "/kit/img/shore.webp",
    title: "CLI integrations with every pipeline",
    body: "Drop the HyperExecute CLI into any CI/CD pipeline to push scripts and keep end-to-end testing tied to each deployment.",
  },
];

function EnterpriseHyper() {
  return (
    <Section>
      <FoldHead
        lead="Enterprise test automation"
        title="on TestMu AI HyperExecute"
        body="Private cloud, governance across the whole organization, and a CLI for every pipeline, on the orchestration that runs suites up to 70% faster."
      >
        <a href={SIGNUP} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
          Start free testing
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {hyper.map(({ icon: Icon, scene, title, body }) => (
            <a key={title} className="tm-cell tm-fcard2" href={`${SITE}/hyperexecute/`}>
              <div className="tm-well grid place-items-center">
                <img className="tm-fit absolute inset-0" src={scene} alt="" loading="lazy" />
                {/* the kit's cards carry one white mark on the scene */}
                <Icon size={64} strokeWidth={1} className="relative text-[var(--tm-fg-inverse)]" aria-hidden />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
              <KitLink>Learn more</KitLink>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- the whole QA lifecycle: the kit's feature pointers ---------- */

const lifecycle = [
  { name: "Agent testing", body: "Put conversational AI, chatbots, and voice assistants under automated test.", icon: "icon-3-visual", href: `${SITE}/agent-testing/` },
  { name: "KaneAI", body: "Describe a flow in natural language and let KaneAI author and maintain the test.", icon: "icon-1-kaneai", href: `${SITE}/kane-ai/` },
  { name: "Browser testing", body: "Check rendering and behavior across 3,000+ browser-OS-device combinations.", icon: "icon-4-visual", href: `${SITE}/cross-browser-testing/` },
  { name: "Real device cloud", body: "Run web and mobile tests on 50,000+ genuine physical devices.", icon: "icon-2-device", href: `${SITE}/real-device-cloud/` },
  { name: "App automation", body: "Automate native and hybrid app tests on 50,000+ real phones and tablets.", icon: "icon-7-cog", href: `${SITE}/mobile-app-automation/` },
  { name: "HyperExecute", body: "An AI-native orchestration layer that runs suites up to 70% faster.", icon: "icon-5-zap", href: `${SITE}/hyperexecute/` },
  { name: "Visual UI testing", body: "Catch pixel-level UI drift across browsers and devices automatically.", icon: "icon-8-cog", href: `${SITE}/visual-testing/` },
  { name: "Accessibility testing", body: "Automate inclusive-experience checks for web and mobile apps.", icon: "icon-6-accessibility", href: `${SITE}/accessibility-testing/` },
];

function Lifecycle() {
  return (
    <Section>
      <FoldHead
        lead="One platform for"
        title="the whole QA lifecycle"
        body="AI-native agents that plan, author, run, and analyze tests across browsers, 50,000+ real devices, and your CI pipeline."
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4">
          {lifecycle.map((l) => (
            <a key={l.name} className="tm-cell tm-pt" href={l.href}>
              <span className="tm-pt__ico">
                <img src={`/kit/pointers/${l.icon}.svg`} alt="" loading="lazy" />
              </span>
              <h3>{l.name}</h3>
              <p>{l.body}</p>
              <KitLink>Learn more</KitLink>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- integrations: the home page's fold, plus MCP and CLI ---------- */

const AGENTS = [
  { name: "Claude Code", src: "/img/integrations/color/claude.svg" },
  { name: "Cursor", src: "/img/integrations/color/cursor.svg" },
  { name: "VS Code", src: "/img/integrations/color/vscode.svg" },
  { name: "GitHub Copilot", src: "/img/integrations/color/copilot.svg" },
  { name: "Windsurf", src: "/img/integrations/color/windsurf.svg" },
];

function Integrations() {
  return (
    <Section>
      {/* the home page's integrations fold, as it is */}
      <div className="tm-reveal grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
        <div>
          <h2>
            <span className="block text-muted-foreground">{integrations.lead}</span>
            <span className="block">{integrations.title}</span>
          </h2>
          <p className="mt-4 max-w-[380px] text-b2 leading-relaxed text-muted-foreground">
            120+ integrations with the tools you already use, plus a native
            MCP server for your coding agents and Kane CLI for your terminal.
          </p>
          <a href={`${SITE}/integrations/`} className="btn btn-lg btn-secondary mt-8">
            {integrations.cta}
          </a>
        </div>

        <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-4 sm:grid-cols-3">
          {integrations.items
            .filter((item) => item.name !== "MCP Server")
            .map((item) => (
              <li key={item.name}>
                <a href={`${SITE}/integrations/`} className="group flex items-center gap-3 py-1">
                  <span className="flex size-10 flex-none items-center justify-center rounded-md border border-border bg-surface [box-shadow:var(--tm-shadow-resting-xs)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <img src={`/img/integrations/color/${item.icon}.svg`} alt="" className="size-5 object-contain" loading="lazy" />
                  </span>
                  <span className="text-b2 text-foreground">{item.name}</span>
                </a>
              </li>
            ))}
        </ul>
      </div>

      {/* MCP server and Kane CLI: two joined boxes, each a small view on a
          painted scene */}
      <div className="tm-reveal -mx-8 mt-16">
        <div className="tm-grid tm-grid--2">
          <a className="tm-cell tm-fcard2" href={`${SITE}/mcp/`}>
            <h3>MCP server</h3>
            <p>Connect Claude Code, Cursor, Copilot and other coding agents to TestMu AI, so they run and debug your tests where you write code.</p>
            <div className="tm-well grid place-items-center !aspect-[16/9]">
              <img className="tm-fit absolute inset-0" src={scenery.treetop} alt="" loading="lazy" />
              <div className="relative flex flex-col items-center">
                <div className="flex items-end gap-2">
                  {AGENTS.map((c, i) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className={`flex items-center justify-center rounded-md border bg-surface ${
                        i === 0
                          ? "size-11 border-border-emphasis [box-shadow:var(--tm-shadow-floating-sm)]"
                          : "size-9 border-border"
                      }`}
                    >
                      <img src={c.src} alt={c.name} className={i === 0 ? "size-5" : "size-4"} loading="lazy" />
                    </span>
                  ))}
                </div>
                <span aria-hidden className="h-5 border-l border-dashed border-foreground" />
                <span className="pill flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-b3 text-foreground [box-shadow:var(--tm-shadow-floating-sm)]">
                  Connected to the TestMu AI MCP server
                  <span className="grid size-4 place-items-center rounded-full bg-[var(--tm-fg-success)] text-[var(--tm-fg-inverse)]">
                    <Check size={12} strokeWidth={2} aria-hidden />
                  </span>
                </span>
              </div>
            </div>
          </a>

          <a className="tm-cell tm-fcard2" href={`${SITE}/kane-cli/`}>
            <h3>Kane CLI</h3>
            <p>Describe a test in natural language and run it from your terminal, in CI, or inside an AI coding agent.</p>
            <div className="tm-well grid place-items-center !aspect-[16/9]">
              <img className="tm-fit absolute inset-0" src="/kit/img/meadow.webp" alt="" loading="lazy" />
              <div className="relative flex w-[80%] flex-col bg-surface [box-shadow:var(--tm-shadow-floating-sm)]">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-b4 text-muted-foreground">
                  <SquareTerminal size={16} strokeWidth={1.5} aria-hidden />
                  Terminal
                </div>
                <div className="flex flex-col gap-2 px-4 py-3 font-mono text-b4">
                  <span><span className="text-muted-foreground">$</span> npm install -g kane-cli</span>
                  <span className="truncate">
                    <span className="text-muted-foreground">$</span> kane-cli run{" "}
                    <span className="text-[var(--tm-blue-500)]">"verify checkout flow on staging"</span>
                  </span>
                  <span className="flex items-center gap-2"><Ok /> 12 passed (41s)</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ: the live page's 22 questions, links as plain text ---------- */

const faq = [
  { q: "What is an automation testing platform?", a: "An automation testing platform is a managed environment where you execute test scripts across browsers, operating systems, and devices without maintaining your own infrastructure. TestMu AI runs Selenium, Playwright, Cypress and Appium suites on 3,000+ browsers and 50,000+ real devices, so teams scale coverage by changing a single endpoint rather than building a grid." },
  { q: "What is cloud test automation?", a: "Cloud test automation is running an automated test suite on browsers and devices hosted by a provider rather than on machines you build and maintain. You keep your existing Selenium, Playwright, or Cypress code and point it at a remote hub URL. The provider handles browser provisioning, driver versions, scaling, and teardown." },
  { q: "Is LambdaTest's automation testing platform now TestMu AI?", a: "Yes. LambdaTest is now TestMu AI. The grid, real device cloud, integrations, and APIs are unchanged; only the name has moved on. Existing accounts, suites, and access keys keep working with no edits. If you automated Selenium or Playwright runs on LambdaTest before, you are using the same platform under the TestMu AI name." },
  { q: "Which frameworks and languages does the platform support?", a: "TestMu AI supports 50+ frameworks. For web, that includes Selenium, Playwright, Cypress, Puppeteer, WebdriverIO, and Nightwatch; for mobile, Appium, Detox, Espresso, and XCUITest. Supported languages include Java, Python, JavaScript, TypeScript, C#, PHP, and Ruby. Connecting an existing suite requires no changes to your test code." },
  { q: "How many browsers and devices can I automate tests on?", a: "The platform covers 3,000+ combinations of browser, OS, and device, spanning Chrome, Firefox, Safari, and Edge on Windows, macOS, and Linux. For mobile, 50,000+ real Android and iOS devices are available on demand with no queue, no emulators, and no provisioning." },
  { q: "How do I move an existing suite to cloud test automation?", a: "Replace your local WebDriver or browser endpoint with the TestMu AI hub URL and add your username and access key. Nothing else changes: the same test code, reporters, assertions, and CI configuration keep working, and the suite runs on 3000+ browsers from the very next execution." },
  { q: "How much concurrency does a cloud test automation run need?", a: "Total test execution time falls roughly in proportion to concurrency. Running 20 tests at once instead of one at a time turns a 200-minute suite into about a 10-minute suite. The ceiling is your slowest single test, so sharding long tests matters more than adding concurrency past that point." },
  { q: "How does CI/CD testing work with TestMu AI?", a: "TestMu AI integrates natively with Jenkins, GitHub Actions, CircleCI, GitLab CI, and Azure Pipelines. Pre-built plugins handle result parsing and failure notifications. Teams trigger cloud test runs on every commit and get pass or fail status before a pull request merges." },
  { q: "What is Auto-Healing and how does it reduce flaky tests?", a: "Auto-Healing detects when a locator has broken because the UI changed and re-resolves it at runtime, so a renamed ID or repositioned element no longer fails an otherwise valid test. This keeps suites green through frequent releases and cuts the maintenance load on your QA team." },
  { q: "How does SmartWait improve test stability?", a: "SmartWait replaces hardcoded sleep() calls with actionability checks that wait only until the element is genuinely ready to interact with. That removes a common source of false positives, shortens run times, and makes results more deterministic across environments." },
  { q: "What is codeless test automation?", a: "Codeless test automation lets you build and maintain automated tests without writing code. You author tests with KaneAI in natural language or record a flow, and the platform generates the executable test. It lets manual QA, product, and support staff automate work that would otherwise sit in an engineering backlog." },
  { q: "Do I need to write code to automate tests on this platform?", a: "No. Low code and no code test automation covers the full workflow, from authoring to execution to reporting. Teams that do write code can bring existing Selenium, Playwright, Cypress, or Puppeteer suites instead, and both approaches run side by side on the same platform with shared reporting." },
  { q: "Can I test apps behind a firewall or on a local machine?", a: "Yes. A built-in encrypted tunnel lets you automate locally hosted pages, staging environments behind a firewall, and VPN-protected apps without exposing them publicly. No third-party tooling or extra configuration is needed." },
  { q: "How is HyperExecute different from running tests on the standard cloud grid?", a: "The standard grid runs your Selenium, Playwright, and Cypress tests across 3,000+ browsers. HyperExecute is an AI-native orchestration layer that co-locates the orchestrator and browser on one machine and intelligently sequences jobs, cutting execution time by up to 70% compared with a conventional cloud grid." },
  { q: "Is the automation testing platform secure and compliant?", a: "Yes. TestMu AI is SOC 2 Type 2 certified and GDPR and CCPA compliant, with enterprise controls including role-based access, data masking, and an encrypted tunnel for private testing. Sensitive data can be hidden from logs and recordings during remote sessions." },
  { q: "Is there a free plan to start automation testing?", a: "Yes. New users get 100 free minutes on signup to explore the browser grid and core automation features. Paid plans add higher concurrency, longer session limits, and dedicated enterprise support." },
  { q: "How is test automation platform pricing usually structured, and which model costs less?", a: "Three models: per-seat charges by headcount, per-test/execution charges by volume, and per-parallel-test charges by concurrency, shared across the team. TestMu AI's Automation Cloud uses the third. For teams adding testers faster than suite runtime, concurrency-based pricing is usually cheapest. Model all three first." },
  { q: "Is a test automation cloud cheaper than running our own grid?", a: "A self-hosted grid has little license cost but heavy operating cost - VM time, browser and driver upkeep, node maintenance, and engineering hours when it fails mid-sprint. A cloud shifts that to a subscription with no upkeep. Compare your infrastructure-plus-labor spend against the subscription." },
  { q: "How should a small team budget versus a large one?", a: "Because billing is by concurrency, not seats, team size isn't the cost driver - small and large teams share the same parallel-test pool, with seats an add-on per edition. Cost tracks suite runtime and release cadence: buy the concurrency those two require." },
  { q: "What is automated QA testing?", a: "Automated QA testing is the practice of running quality checks through software instead of a person clicking through them. A tool executes the steps, compares the result against an expected outcome, and reports pass or fail. It covers regression, cross-browser, API, and accessibility checks that would otherwise be repeated by hand every release." },
  { q: "How is automated QA testing different from manual QA?", a: "Manual QA is exploratory and judgment-led: a person looks for problems nobody predicted. Automated QA testing is repetition-led: it re-runs known checks on every build so regressions surface within minutes. Mature teams keep both, automating the stable regression suite and reserving manual effort for new features and edge cases." },
  { q: "What makes TestMu AI an enterprise test automation platform?", a: "TestMu AI is an enterprise test automation platform running Selenium, Cypress, Playwright, and Appium across 3,000+ browsers and 50,000+ real devices. It adds SSO, SCIM, role-based access, audit logs, and data masking, backed by SOC 2 Type 2, GDPR, and CCPA, with private cloud and on-premise deployment." },
];

/* ---------- the page ---------- */

declare global {
  interface Window {
    TestMu?: { init: (root?: Element) => void };
  }
}

function Page() {
  const kit = useRef<HTMLDivElement>(null);

  /* start the kit script on the kit folds once they are drawn (once only:
     StrictMode runs effects twice in development) */
  useEffect(() => {
    const el = kit.current;
    if (!el || el.dataset.tmReady) return;
    el.dataset.tmReady = "1";
    window.TestMu?.init(el);
  }, []);

  return (
    <div ref={kit} className="relative min-h-screen bg-background font-body">
      <Header />
      <Hero />

      <main className="relative">
        <GuideLines />

        <TrustedBy />
        <Platform />
        <AgentSkills />
        <Frameworks />
        <Capabilities />
        <BeyondBasics />
        <EnterpriseHyper />
        <Rebrand />
        <Lifecycle />
        <Integrations />
        <Stories />
        <Reasons integrations={false} />
        <Faq items={faq} />
        <Enterprise />
        <Footer />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Page />
    </MotionConfig>
  </StrictMode>,
);
