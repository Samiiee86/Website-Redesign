import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  Copy,
  EyeOff,
  FileChartColumn,
  KeyRound,
  Layers,
  MonitorOff,
  Play,
  Signal,
  Sparkles,
  SquareTerminal,
  Zap,
} from "lucide-react";
import "./index.css";
import { ArrowChip, Reveal, Section, SlideArrow } from "./lib/ui";
import { integrations } from "./lib/content";
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
import { LABEL, LazyVideo } from "./pieces/Retro";
import {
  AuthoringScreen,
  CARD,
  GovernanceScreen,
  HyperScreen,
  KaneCliScreen,
  ParallelScreen,
  PipelineScreen,
  PlaywrightScreen,
  PrivateCloudScreen,
  ReportingScreen,
  ROW,
  Scene,
} from "./pieces/Screens";

/* Automation testing platform page (automation-testing-platform.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, the rebrand note (its video version, as on the
     live page), more reasons (without its integrations card), FAQ with
     this page's questions, the closing enterprise call and the footer.
   - The hero is the page's own hero fold (Web redesign/hero-folds/
     automation-testing-platform).
   - The platform: the home page's product rows, each picture drawn in
     the retro glitch look on a hero fold's painted scene.
   - Frameworks, languages and agent skills: one fold, the kit's tour
     tabs, one per framework.
   - Kit folds: bento (capabilities), feature pointers (beyond the
     basics), feature-cards-image (enterprise HyperExecute), feature tour
     (the whole QA lifecycle, with the hero-fold videos).
   - Integrations: the home page's fold, with the MCP server and Kane CLI
     as two more tiles.

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
          {/* the hero fold's own frame: 1072 x 552, the videos' ratio (the kit draws 1000 x 552 and trims the sides) */}
          <div className="tm-hero__screen !max-w-[1072px] !aspect-[1072/552]">
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

/* ---------- the platform: the home page's product rows ----------

   As on the home page (testmuai-redesign): label, heading, body and link
   beside a picture on its own painted scene, sides swapping row by row.
   Each picture is a product screen drawn from scratch in the hero-fold
   videos' look (pieces/Screens), on a hero fold's painted scene. */

const ATP = "/kit/atp";

const RowShot = ({ scene, children }: { scene: string; children: ReactNode }) => (
  <Scene scene={`${ATP}/scene-${scene}.jpg`} {...ROW}>
    {children}
  </Scene>
);

const rows = [
  {
    label: "Kane CLI",
    icon: SquareTerminal,
    title: "Author web and mobile tests with AI from your terminal",
    body: "Describe a test in natural language and Kane CLI runs it on your web or mobile app. The same command runs on your machine, in CI, or inside an AI coding agent.",
    link: { label: "Try Kane CLI", href: `${SITE}/kane-cli/` },
    view: <RowShot scene="cli"><KaneCliScreen /></RowShot>,
  },
  {
    label: "AI test authoring",
    icon: Sparkles,
    title: "Author tests in natural language with KaneAI",
    body: "Describe a scenario in natural language and KaneAI plans, authors, and maintains the test case for you, no scripting required.",
    link: { label: "View documentation", href: `${SITE}/support/docs/getting-started-with-kane-ai/` },
    view: <RowShot scene="author"><AuthoringScreen /></RowShot>,
  },
  {
    label: "Playwright testing",
    icon: Play,
    title: "Run your existing Playwright suite at scale",
    body: "Run your existing Playwright suite on the test automation platform at scale without changing test code, reporters, or CI configuration.",
    link: { label: "View documentation", href: `${SITE}/support/docs/playwright-testing/` },
    view: <RowShot scene="pw"><PlaywrightScreen /></RowShot>,
  },
  {
    label: "Parallel execution",
    icon: Layers,
    title: "Ship faster with parallel testing at scale",
    body: "Split your suite across concurrent cloud sessions and cut total run time from hours to minutes. No grid setup, no code changes.",
    link: { label: "Get started free", href: SIGNUP },
    view: <RowShot scene="par"><ParallelScreen /></RowShot>,
  },
  {
    label: "HyperExecute",
    icon: Zap,
    title: "Run automation tests 70% faster with HyperExecute",
    body: "HyperExecute is an AI-native orchestration platform that executes automation suites up to 70% faster than a conventional cloud grid.",
    link: { label: "View documentation", href: `${SITE}/support/docs/getting-started-with-hyperexecute/` },
    view: <RowShot scene="hx"><HyperScreen /></RowShot>,
  },
  {
    label: "Test reporting",
    icon: FileChartColumn,
    title: "Debug test failures with AI reporting",
    body: "Every test session is captured in full and AI surfaces the exact failure, so your team resolves defects without reproducing them locally.",
    link: { label: "Get started free", href: SIGNUP },
    view: <RowShot scene="rep"><ReportingScreen /></RowShot>,
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
      <div className="-mx-8">
        {rows.map((r, i) => {
          const Icon = r.icon;
          const flip = i % 2 === 1;
          return (
            <div
              key={r.label}
              className={`grid grid-cols-[minmax(0,1fr)] gap-10 px-8 py-12 last:pb-0 md:py-14 md:last:pb-0 lg:gap-14 ${
                flip ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
              }`}
            >
              <Reveal className={`flex flex-col justify-end ${flip ? "lg:order-2" : ""}`}>
                <p className="mono flex items-center gap-2.5 text-b4 uppercase tracking-[0.18em] text-muted-foreground">
                  <Icon size={16} strokeWidth={1.5} className="text-foreground" aria-hidden />
                  {r.label}
                </p>
                <h3 className="mt-5 [text-wrap:balance]">{r.title}</h3>
                <p className="mt-4 max-w-[480px] text-b1 text-muted-foreground">{r.body}</p>
                <a
                  href={r.link.href}
                  className="group/btn mt-6 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-b3 font-medium text-foreground"
                >
                  {r.link.label}
                  <SlideArrow />
                </a>
              </Reveal>
              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                {r.view}
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}


/* ---------- frameworks, languages and agent skills: one fold ----------

   The live page's "frameworks and languages" table, the framework cards
   and the agent skills, merged: the kit's tour tabs (one per framework),
   each panel a joined frame with the framework and its agent skill on the
   left and every language and runner it supports on the right. A strip
   under the tabs names the AI agents the skills work with. */

const SKILLS_REPO = "https://github.com/LambdaTest/agent-skills";
const DOCS = `${SITE}/support/docs`;
const LANG_ICON = `${IMG}/frameworks`;

type Lang = { lang: string; icon?: string; fw: string[] };
type Stack = {
  name: string;
  logo: string;
  body: string;
  docs: string;
  skill?: string[];
  langs: Lang[];
};

const JAVA = { lang: "Java", icon: "Java.svg" };
const JS = { lang: "JavaScript", icon: "Javascript.svg" };
const PY = { lang: "Python", icon: "Python.svg" };
const PHP = { lang: "PHP", icon: "Php.svg" };
const RUBY = { lang: "Ruby", icon: "Ruby.svg" };
const CS = { lang: "C#", icon: "CSharp.svg" };

const stacks: Stack[] = [
  {
    name: "Selenium",
    logo: "selenium",
    body: "Run tests across browsers in Java, Python, JS, and more.",
    docs: `${DOCS}/testmu-running-your-first-selenium-test/`,
    skill: ["Java", "Python", "JS", "C#", "Ruby"],
    langs: [
      { ...JAVA, fw: ["Java", "Selenide", "Gauge", "TestNG", "Geb", "JUnit", "Cucumber", "Serenity"] },
      { ...JS, fw: ["JavaScript", "NightwatchJS", "WebdriverIO", "Mocha", "WD", "Jest", "AngularJS", "CucumberJS", "Jasmine", "Karma", "TestCafe", "NemoJS", "Protractor"] },
      { ...PY, fw: ["Python", "pytest", "Behave", "Robot", "Unittest", "Lettuce"] },
      { ...PHP, fw: ["PHP", "Laravel", "Codeception", "PHPUnit", "Behat"] },
      { ...RUBY, fw: ["Ruby", "RSpec", "Test::Unit", "Capybara"] },
      { ...CS, fw: ["C#", "SpecFlow", "MSTest", "NUnit", "xUnit"] },
    ],
  },
  {
    name: "Playwright",
    logo: "playwright",
    body: "Cross-browser automation across Chromium, Firefox, and WebKit.",
    docs: `${DOCS}/playwright-testing/`,
    skill: ["JS", "TS", "Python", "Java", "C#"],
    langs: [
      { ...JAVA, fw: ["Java", "JUnit"] },
      { ...JS, fw: ["Playwright", "Playwright Test"] },
      { ...PY, fw: ["Python"] },
      { ...CS, fw: ["C#"] },
    ],
  },
  {
    name: "Cypress",
    logo: "cypress",
    body: "End-to-end web app testing with real browser access.",
    docs: `${DOCS}/getting-started-with-cypress-testing/`,
    langs: [{ ...JS, fw: ["Cypress"] }],
  },
  {
    name: "Puppeteer",
    logo: "puppeteer",
    body: "Headless Chrome and Chromium automation via Node.js.",
    docs: `${DOCS}/puppeteer-testing/`,
    skill: ["JS", "TS"],
    langs: [
      { ...JS, fw: ["JavaScript", "Jest", "Mocha"] },
      { ...PY, fw: ["Python"] },
    ],
  },
  {
    name: "Appium",
    logo: "appium",
    body: "Automate native and hybrid apps on iOS and Android.",
    docs: `${DOCS}/getting-started-with-appium-testing/`,
    skill: ["Java", "Python", "JS", "Ruby", "C#"],
    langs: [
      { ...JAVA, fw: ["Java", "TestNG", "JUnit"] },
      { ...JS, fw: ["WebdriverIO", "Mocha"] },
      { ...PY, fw: ["Python", "pytest", "Robot"] },
      { ...RUBY, fw: ["Ruby", "Cucumber"] },
      { ...CS, fw: ["C#", "NUnit"] },
      { ...PHP, fw: ["PHP"] },
    ],
  },
  {
    name: "Espresso",
    logo: "espresso",
    body: "Native Android UI tests with built-in synchronization.",
    docs: `${DOCS}/getting-started-with-espresso-testing/`,
    langs: [
      { lang: "Java", icon: "Java.svg", fw: ["Espresso"] },
      { lang: "Kotlin", fw: ["Espresso"] },
    ],
  },
  {
    name: "XCUITest",
    logo: "xcuitest",
    body: "Native UI test automation for iOS and macOS apps.",
    docs: `${DOCS}/getting-started-with-xcuitest/`,
    langs: [
      { lang: "Swift", fw: ["XCUITest"] },
      { lang: "Objective-C", fw: ["XCUITest"] },
    ],
  },
];

/* every language and framework links to its TestMu AI docs page, as on the live page */
const SEL: Record<string, string> = {
  Java: "java-with-selenium-running-java-automation-scripts-on-testmu-selenium-grid",
  JavaScript: "javascript-with-selenium-running-javascript-automation-scripts-on-testmu-selenium-grid",
  Python: "python-with-selenium-running-python-automation-scripts-on-testmu-selenium-grid",
  PHP: "php-with-selenium-running-php-automation-scripts-on-testmu-selenium-grid",
  Ruby: "ruby-with-selenium-running-ruby-automation-scripts-on-testmu-selenium-grid",
  "C#": "c-with-selenium-running-c-automation-scripts-on-testmu-selenium-grid",
};
const FW_SLUG: Record<string, string> = { NightwatchJS: "nightwatch", AngularJS: "angular", "Test::Unit": "testunit" };
const FW_LINKS: Record<string, string> = {
  "Playwright|Java": "java-with-playwright/",
  "Playwright|JUnit": "java-with-playwright/?framework=junit",
  "Playwright|Playwright": "playwright-testing/",
  "Playwright|Playwright Test": "playwright-test-runner/",
  "Playwright|Python": "python-with-playwright/",
  "Playwright|C#": "csharp-with-playwright/",
  "Cypress|Cypress": "getting-started-with-cypress-testing/",
  "Puppeteer|JavaScript": "puppeteer-testing/",
  "Puppeteer|Jest": "puppeteer-testing-with-jest/",
  "Puppeteer|Mocha": "puppeteer-testing-with-mocha/",
  "Puppeteer|Python": "puppeteer-testing-with-pytest-pyppeteer/",
};
function fwHref(suite: string, docs: string, lang: string, fw: string, j: number) {
  if (suite === "Selenium" && SEL[lang]) return `${DOCS}/${SEL[lang]}/` + (j === 0 ? "" : `?framework=${FW_SLUG[fw] ?? fw.toLowerCase()}`);
  const path = FW_LINKS[`${suite}|${fw}`];
  return path ? `${DOCS}/${path}` : docs;
}

function Stacks() {
  return (
    <Section>
      <FoldHead
        lead="Any framework, any language,"
        title="and agent skills to write it"
        body="Run Selenium, Playwright, Cypress, Puppeteer and Appium suites as they are, in 15+ languages. Or let your AI agent write them with 45+ open-source TestMu AI agent skills."
      >
        <a href={SIGNUP} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
          Start free testing
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8" data-tm-step-root>
        {/* seven tabs share the frame on desktop */}
        <div className="tm-tour__tabs lg:[grid-auto-columns:minmax(0,1fr)]" role="tablist">
          {stacks.map((s) => (
            <button key={s.name} role="tab" data-step>
              {s.name}
            </button>
          ))}
        </div>
        {stacks.map((s, i) => (
          <div key={s.name} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy !justify-start">
                <span className="tm-pt__ico tm-pt__ico--brand">
                  <img src={`${IMG}/${s.logo}-automation-cloud.svg`} alt="" loading="lazy" />
                </span>
                <h3 className="mt-4">{s.name}</h3>
                <p>{s.body}</p>
                {s.skill && (
                  <div className="mt-6 flex flex-col gap-3">
                    <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">Agent skill</span>
                    <span className="flex flex-wrap gap-2">
                      {s.skill.map((l) => (
                        <span key={l} className={LABEL}>
                          {l}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <KitLink as="a" href={s.docs}>
                    Read the docs
                  </KitLink>
                  {s.skill && (
                    <KitLink as="a" href={SKILLS_REPO}>
                      View the skill on GitHub
                    </KitLink>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center px-8 py-6 lg:px-12">
                {s.langs.map((l) => (
                  <div key={l.lang} className="flex flex-col gap-2 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-start sm:gap-6">
                    <span className="flex w-40 flex-none items-center gap-3 text-b2 font-medium">
                      {l.icon ? (
                        <img src={`${LANG_ICON}/${l.icon}`} alt="" className="size-5 object-contain" loading="lazy" />
                      ) : (
                        <span className="size-5" />
                      )}
                      {l.lang}
                    </span>
                    <span className="flex flex-wrap gap-x-6 gap-y-2 text-b3 text-muted-foreground">
                      {l.fw.map((f, j) => (
                        <a
                          key={`${f}-${j}`}
                          href={fwHref(s.name, s.docs, l.lang, f, j)}
                          className="transition-colors duration-150 hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:text-foreground"
                        >
                          {f}
                        </a>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4 border-t border-border bg-surface px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-4 text-b2">
            45+ open-source agent skills, for 20+ AI agents
            <span className="flex items-center gap-2">
              {AGENTS.map((a) => (
                <span key={a.name} title={a.name} className="flex size-8 items-center justify-center rounded-md border border-border bg-surface">
                  <img src={a.src} alt={a.name} className="size-4" loading="lazy" />
                </span>
              ))}
            </span>
          </span>
          <KitLink as="a" href={SKILLS_REPO}>
            Explore agent skills on GitHub
          </KitLink>
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
    screen: <PrivateCloudScreen />,
    scene: "/kit/img/hills.webp",
    title: "HyperExecute for private cloud",
    body: "Keep every automated test run inside your private cloud, with all data behind your firewall and full control over runners and storage.",
  },
  {
    screen: <GovernanceScreen />,
    scene: "/kit/img/meadow.webp",
    title: "Enterprise access and governance",
    body: "Run teams at scale with SSO, role-based access, audit trails, and policy enforcement applied across the whole organization.",
  },
  {
    screen: <PipelineScreen />,
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
          {hyper.map(({ screen, scene, title, body }) => (
            <a key={title} className="tm-cell tm-fcard2" href={`${SITE}/hyperexecute/`}>
              {/* the kit card's scene, with the product screen on it, as in the hero folds */}
              <div className="tm-well">
                <Scene scene={scene} card {...CARD}>
                  {screen}
                </Scene>
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

/* ---------- the whole QA lifecycle: the kit's feature tour ----------

   As on the live page: one tab per product, its line and link beside
   the product's video, and three points under it. Each video is that
   product's own hero-fold video (Web redesign/hero-folds), on that hero
   fold's painted scene. KaneAI uses the home hero video (plan, author,
   execute, analyse). Accessibility has no hero video, so it shows its
   hero fold's still (accessibility-devtools). */

type Product = {
  tab: string;
  body: string;
  cta: string;
  href: string;
  media: { video: string; scene: string } | { still: string };
  perks: { b: string; p: string }[];
};

const products: Product[] = [
  {
    tab: "Agent testing",
    body: "Put conversational AI, chatbots, and voice assistants under automated test.",
    cta: "More about agent testing",
    href: `${SITE}/agent-testing/`,
    media: { video: "at", scene: "at" },
    perks: [
      { b: "Autonomous runs", p: "Probe the agent under test the way a synthetic end-user would, end to end." },
      { b: "Persona coverage", p: "Exercise varied personas such as International Caller and Digital Novice." },
      { b: "Risk and regression", p: "Score risk and run full regression on the agent with actionable insights." },
    ],
  },
  {
    tab: "KaneAI",
    body: "Describe a flow in natural language and let KaneAI author and maintain the test.",
    cta: "More about KaneAI",
    href: `${SITE}/kane-ai/`,
    media: { video: "kane", scene: "kane" },
    perks: [
      { b: "Natural language authoring", p: "Write tests by describing the steps, no scripting or boilerplate required." },
      { b: "Generate from specs", p: "Turn Jira tickets, PRDs, images, and sheets into structured test cases." },
      { b: "Cross-surface tests", p: "Author web and app tests that run across desktop and mobile from one place." },
    ],
  },
  {
    tab: "Browser testing",
    body: "Check rendering and behavior across 3,000+ browser-OS-device combinations.",
    cta: "More about browser testing",
    href: `${SITE}/cross-browser-testing/`,
    media: { video: "cbt", scene: "cbt" },
    perks: [
      { b: "Responsive checks", p: "Confirm layouts hold up across viewports on desktop, tablet, and phone." },
      { b: "Built-in DevTools", p: "Triage cross-browser defects with Chrome and Safari DevTools available." },
      { b: "Geo IP testing", p: "Serve and verify the right experience from different geo IPs worldwide." },
    ],
  },
  {
    tab: "Real device cloud",
    body: "Run web and mobile tests on 50,000+ genuine physical devices.",
    cta: "More about real device cloud",
    href: `${SITE}/real-device-cloud/`,
    media: { video: "rdc", scene: "rdc" },
    perks: [
      { b: "Native gestures", p: "Automate real taps, swipes, scrolls, and pinch-to-zoom interactions." },
      { b: "Real hardware edge cases", p: "Use 40+ device capabilities to cover scenarios emulators can't reproduce." },
      { b: "Deep debugging", p: "Pull device, network, and UI inspector data right from the session." },
    ],
  },
  {
    tab: "App automation",
    body: "Automate native and hybrid app tests on 50,000+ real phones and tablets.",
    cta: "More about app automation",
    href: `${SITE}/app-automation/`,
    media: { video: "mat", scene: "mat" },
    perks: [
      { b: "Concurrent runs", p: "Run app test scripts across hundreds of real Android and iOS devices at once." },
      { b: "Framework choice", p: "Bring Appium, XCUITest, Espresso, or Detox, all supported out of the box." },
      { b: "Private app testing", p: "Test locally hosted and internal app builds on real mobile hardware." },
    ],
  },
  {
    tab: "HyperExecute",
    body: "An AI-native orchestration layer that runs suites up to 70% faster.",
    cta: "More about HyperExecute",
    href: `${SITE}/hyperexecute/`,
    media: { video: "he", scene: "he" },
    perks: [
      { b: "Auto-heal scripts", p: "Repairs flaky scripts on the fly to cut down manual upkeep." },
      { b: "Smart ordering", p: "Reorders runs from historical data to surface failures sooner." },
      { b: "RCA insights", p: "Classifies errors and returns AI-driven fixes with live logs." },
    ],
  },
  {
    tab: "Visual UI testing",
    body: "Catch pixel-level UI drift across browsers and devices automatically.",
    cta: "More about visual regression",
    href: `${SITE}/visual-ai-testing/`,
    media: { video: "vt", scene: "vt" },
    perks: [
      { b: "Pixel diffing", p: "Flag shifts in layout, color, font, and element placement automatically." },
      { b: "Figma-to-build", p: "Match live pages and app screens against Figma designs for accuracy." },
      { b: "Noise filtering", p: "Use AI to ignore irrelevant shifts and keep false positives low." },
    ],
  },
  {
    tab: "Accessibility testing",
    body: "Automate inclusive-experience checks for web and mobile apps.",
    cta: "More about accessibility",
    href: `${SITE}/accessibility-testing/`,
    media: { still: "stage-a11y" },
    perks: [
      { b: "Standards scanning", p: "Audit web and app screens against WCAG, ADA, and Section 508 rules." },
      { b: "Recurring audits", p: "Schedule accessibility scans to repeat daily, weekly, or monthly." },
      { b: "Assistive tech", p: "Verify screen-reader and assistive-tool behavior on real devices." },
    ],
  },
];

function Lifecycle() {
  return (
    <Section>
      <FoldHead
        lead="One platform for"
        title="the whole QA lifecycle"
        body="AI-native agents that plan, author, run, and analyze tests across browsers, 50,000+ real devices, and your CI pipeline."
      />
      <div className="tm-reveal -mx-8" data-tm-step-root data-autoplay>
        {/* eight tabs fit the frame: each sized to its name */}
        <div className="tm-tour__tabs lg:[grid-auto-columns:auto] lg:[&>button]:!px-3 lg:[&>button]:!text-b2 [&>button]:whitespace-nowrap" role="tablist">
          {products.map((p) => (
            <button key={p.tab} role="tab" data-step>
              {p.tab}
              <span className="tm-progress" aria-hidden="true" />
            </button>
          ))}
        </div>
        {products.map((p, i) => (
          <div key={p.tab} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy">
                <h3>{p.tab}</h3>
                <p>{p.body}</p>
                <KitLink as="a" href={p.href}>
                  {p.cta}
                </KitLink>
              </div>
              <div className="tm-tour__media">
                {"still" in p.media ? (
                  <img className="tm-fit" src={`${ATP}/${p.media.still}.jpg`} alt="" loading="lazy" />
                ) : (
                  <>
                    <img className="tm-fit" src={`${ATP}/scene-${p.media.scene}.jpg`} alt="" loading="lazy" />
                    {/* the hero fold's screen: the video centred on its scene */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-10">
                      <div className="w-full border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
                        <LazyVideo
                          className="block aspect-[1072/552] w-full"
                          src={`${ATP}/video-${p.media.video}.mp4`}
                          poster={`${ATP}/poster-${p.media.video}.jpg`}
                          label={`${p.tab} product demo`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="tm-tour__perks">
              {p.perks.map((k) => (
                <div key={k.b}>
                  <b>{k.b}</b>
                  <p>{k.p}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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

type Dev = { name: string; href: string; line: string; cmd?: string; icon: ReactNode };

const dev: Dev[] = [
  {
    name: "MCP server",
    href: `${SITE}/mcp/`,
    line: "Claude Code, Cursor, Copilot and more",
    icon: <img src="/img/integrations/color/mcp.svg" alt="" className="size-5 object-contain" />,
  },
  {
    name: "Kane CLI",
    href: `${SITE}/kane-cli/`,
    line: "npm install -g kane-cli",
    cmd: "npm install -g kane-cli",
    icon: <SquareTerminal size={20} strokeWidth={1.5} aria-hidden />,
  },
  {
    name: "Rook CLI",
    href: `${SITE}/agent-assurance/`,
    line: "npm install -g @testmuai/rook",
    cmd: "npm install -g @testmuai/rook",
    icon: (
      <svg width="16" height="19" viewBox="0 0 12 14" aria-hidden>
        <path d="M1.5 1h2v1.6h1.6V1h1.8v1.6h1.6V1h2v3.4L9 5.6v4.6l1.6 1.4V13H1.4v-1.4L3 10.2V5.6L1.5 4.4z" fill="currentColor" />
      </svg>
    ),
  },
];

/* a tile: the name links to the product (arrow on hover); a command tile also copies its command */
function DevTile({ name, href, line, cmd, icon }: Dev) {
  const [done, setDone] = useState(false);
  const copy = () =>
    cmd &&
    navigator.clipboard?.writeText(cmd).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    });
  return (
    <div className="group relative flex items-center gap-3 py-1">
      <span className="flex size-10 flex-none items-center justify-center rounded-md border border-border bg-surface [box-shadow:var(--tm-shadow-resting-xs)] transition-transform duration-300 group-hover:-translate-y-0.5">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <a href={href} className="flex items-center gap-1.5 text-b2 text-foreground after:absolute after:inset-0 after:content-['']">
          {name}
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            aria-hidden
            className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
          />
        </a>
        <span className="truncate font-mono text-b4 text-muted-foreground">{line}</span>
      </span>
      {cmd && (
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${cmd}`}
          className="relative z-10 flex size-8 flex-none items-center justify-center rounded-md border border-border bg-surface text-muted-foreground opacity-0 [box-shadow:var(--tm-shadow-resting-xs)] transition-opacity duration-200 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        >
          {done ? <Check size={14} strokeWidth={1.5} aria-hidden /> : <Copy size={14} strokeWidth={1.5} aria-hidden />}
          <span className="sr-only" aria-live="polite">{done ? "Copied" : ""}</span>
        </button>
      )}
    </div>
  );
}

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
            MCP server for your coding agents, and Kane CLI and Rook CLI for your terminal.
          </p>
          <a href={`${SITE}/integrations/`} className="btn btn-lg btn-secondary mt-8">
            {integrations.cta}
          </a>
        </div>

        <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-4 sm:grid-cols-3">
          {integrations.items
            .filter((item) => !["MCP Server", "GitLab", "CircleCI"].includes(item.name))
            .map((item) => (
              <li key={item.name}>
                <a href={`${SITE}/integrations/`} className="group flex items-center gap-3 py-1">
                  <span className="flex size-10 flex-none items-center justify-center rounded-md border border-border bg-surface [box-shadow:var(--tm-shadow-resting-xs)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <img src={`/img/integrations/color/${item.icon}.svg`} alt="" className="size-5 object-contain" />
                  </span>
                  <span className="text-b2 text-foreground">{item.name}</span>
                </a>
              </li>
            ))}
          {/* the MCP server, Kane CLI and Rook CLI, as tiles with a line each */}
          <li className="col-span-full mt-4 border-t border-border pt-6">
            <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">For your coding agents and terminal</span>
          </li>
          <li className="col-span-full grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {dev.map((d) => (
              <DevTile key={d.name} {...d} />
            ))}
          </li>
        </ul>
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
        <Stacks />
        <Capabilities />
        <BeyondBasics />
        <EnterpriseHyper />
        <Rebrand variant="video" />
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
