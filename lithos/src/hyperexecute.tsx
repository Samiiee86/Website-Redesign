import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  Archive,
  Bot,
  BellOff,
  CalendarClock,
  Check,
  FileArchive,
  Layers,
  RotateCcw,
  Sparkles,
  Activity,
  Wand2,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal, SlideArrow } from "./lib/ui";
import "./index.css";
import { ArrowChip, Section } from "./lib/ui";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Stories, { type StoriesContent } from "./sections/Stories";
import Reasons from "./sections/Reasons";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import { FoldHead } from "./pieces/compare/parts";
import {
  CARD,
  CloudsScreen,
  FlakyScreen,
  GovernanceScreen,
  GridScreen,
  HealScreen,
  PrivateCloudScreen,
  RcaScreen,
  LoadScreen,
  ROW,
  Scene,
  SkillScreen,
  SplitScreen,
} from "./pieces/Screens";

/* HyperExecute page (hyperexecute.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories (this page's four stories, from the live page),
     more reasons, FAQ with this page's questions, the closing enterprise
     call and the footer.
   - The hero is the page's own hero fold (Web redesign/hero-folds/
     hyperexecute): its copy, video and scene.
   - The rest reads as a user's path, from what it is to how it runs to
     proof: the home page's zig-zag rows (how it works, one row per
     feature with a product screen drawn in the hero-fold look; the red
     build triage merged into the root cause row), the kit's stat fold
     and steps (where "up to 70%
     faster" comes from), feature cards (red build triage), feature
     pointers (8 orchestration controls, performance testing), reviews,
     the frameworks tabs, steps (CI/CD), image cards (private cloud),
     a CTA band (open source) and a link catalog (products and docs).

   Copy is the live page's (testmuai.com/hyperexecute), in sentence case,
   with its inline links as plain text. */

const SIGNUP = "https://accounts.testmuai.com/register";
const SITE = "https://www.testmuai.com";
const IMG = "https://assets.testmuai.com/resources/images";
const DOCS = `${SITE}/support/docs`;
const HE_SIGNUP = `${SITE}/register/?redirectTo=https://hyperexecute.lambdatest.com/`;
const ATP = "/kit/atp";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* the kit's black underlined link with its sliding arrow */
function KitLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className="tm-link" href={href}>
      {children}
      <span className="tm-arw" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </a>
  );
}

function PrimaryBtn({ href, children, className = "mt-8" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`btn btn-lg btn-primary btn-arrow btn-arrow-plain ${className}`}>
      {children}
      <ArrowChip />
    </a>
  );
}

/* a tick list, as on the live page's feature panels */
const Checks = ({ items }: { items: string[] }) => (
  <ul className="mt-4 flex flex-col gap-3">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3 text-b2">
        <Check size={16} strokeWidth={1.5} className="mt-1 flex-none text-[var(--tm-fg-success)]" aria-hidden />
        {t}
      </li>
    ))}
  </ul>
);

/* ---------- hero: the page's hero fold, in the kit's hero-media ---------- */

const HERO = "/kit/hero/hyperexecute";

function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">HyperExecute: your whole</span>
            <span className="tm-nowrap">suite, up to 70% faster</span>
          </h1>
          <p className="tm-hero__promise">
            Add one YAML file to your existing Selenium, Playwright or Cypress
            suite, then run it from your CI. No grid to maintain, no test code
            to rewrite.
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
          {/* the hero fold's own frame: 1072 x 552, the video's ratio */}
          <div className="tm-hero__screen !max-w-[1072px] !aspect-[1072/552]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${HERO}/he-demo-poster.jpg`}
              aria-label="Product demo: run a test suite with the HyperExecute CLI, then review each task's logs in the dashboard"
            >
              <source src={`${HERO}/he-demo.webm`} type="video/webm" />
              <source src={`${HERO}/he-demo.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works: the kit's feature tour ----------

   The live page's six features, one tab each: its heading, line, three
   ticks and link beside a product screen drawn in the hero-fold look
   (pieces/Screens), on a hero fold's painted scene. */

/* one tab bar for every tabbed fold on the page: 48px tall, B2 text */
const TAB_BAR = "tm-tour__tabs [&>button]:!py-3 [&>button]:!text-b2 [&>button]:whitespace-nowrap";

const features = [
  {
    tab: "Why HyperExecute",
    icon: Zap,
    title: "No hub-to-node hops",
    body: "A Selenium Grid routes every command through a hub to a remote node. HyperExecute runs your test script and browser on one machine, so nothing waits on the network. Lereta cut network traffic this way and ran its tests 70% faster, nearly flake-free.",
    checks: ["No hub or node hops between a test and its result.", "Fewer infrastructure flakes, so fewer reruns.", "Your existing tests run as-is with one YAML file."],
    link: { label: "Read the Lereta case study", href: `${SITE}/customers/lereta/` },
    screen: <GridScreen />,
    scene: "hx",
  },
  {
    tab: "Parallel at scale",
    icon: Layers,
    title: "Parallel testing without CI shards to maintain",
    body: "Sharding on your own CI runners means maintaining the runners and the split. HyperExecute splits the suite across fresh VMs from one YAML value.",
    checks: ["Set concurrency in YAML, with no runners to patch.", "Dynamic allocation hands tests to VMs as they free up.", "10 VMs or 10,000, it's the same job to the platform."],
    link: { label: "View documentation", href: `${DOCS}/hyperexecute-test-splitting-and-multiplexing/` },
    screen: <SplitScreen />,
    scene: "par",
  },
  {
    tab: "AI root cause analysis",
    icon: Sparkles,
    title: "Know whether a red build is your runner, your test or your code",
    body: "When the build goes red, the analysis reads the test's logs and the job's git diff, then names the root cause in 20 to 30 seconds with numbered steps to fix it, so you fix the cause instead of rerunning the build.",
    checks: ["Separates the root cause from its cascading effects.", "Sorts failures: product, script, environment or no action.", "Runs automatically on failures that match your policy."],
    link: { label: "Run your first job free", href: HE_SIGNUP },
    screen: <RcaScreen />,
    scene: "rep",
  },
  {
    tab: "Flaky test detection",
    icon: Activity,
    title: "Flaky test detection and auto-mute",
    body: "Your tests are grouped by name, browser, OS and resolution, then scored on how often the result flips between runs. Tests that fail five times in a row are muted automatically.",
    checks: ["Sliding window defaults to the last 10 runs.", "Flake rate threshold defaults to 20% and is tunable.", "Severity: high above 75%, medium 50-75%, low below 50%."],
    link: { label: "Run your first job free", href: HE_SIGNUP },
    screen: <FlakyScreen />,
    scene: "pw",
  },
  {
    tab: "Auto-healing",
    icon: Wand2,
    title: "Auto-healing broken locators",
    body: "Set the autoHeal capability and a locator that breaks is rebuilt at runtime from the recorded DOM, so the run carries on.",
    checks: ["Records, detects, heals, then continues the run.", "Every heal is inspectable, so nothing changes silently.", "It absorbs locator drift, not a genuinely missing element."],
    link: { label: "Run your first job free", href: HE_SIGNUP },
    screen: <HealScreen />,
    scene: "author",
  },
  {
    tab: "Agent skills",
    icon: Bot,
    title: "Run HyperExecute jobs from your AI agent",
    body: "Add the open-source hyperexecute-skill to Claude Code, Cursor, Copilot or Gemini CLI, describe the job, and your agent writes the YAML and runs it.",
    checks: ["Analyzes your project, then writes and validates the YAML.", "Asks before it spends cloud concurrency on a job.", "Pulls logs and artifacts back to debug failures."],
    link: { label: "Get the HyperExecute skill", href: "https://github.com/LambdaTest/agent-skills/tree/main/hyperexecute-skill" },
    screen: <SkillScreen />,
    scene: "cli",
  },
];

/* the tab screens' canvas, a little narrower for the row stages */
const ROWSHOT = { w: 720, h: 440 };

function HowItWorks() {
  return (
    <Section>
      <FoldHead
        lead="AI test orchestration:"
        title="how it works"
        body="A test orchestration platform decides how automated tests are split, ordered, retried and run across machines in a CI pipeline. HyperExecute runs your existing Selenium, Playwright, Cypress and Appium suites on just-in-time VMs from one YAML file."
      >
        <PrimaryBtn href={HE_SIGNUP}>Start free with Google</PrimaryBtn>
      </FoldHead>
      {/* the home page's zig-zag product rows: copy beside a product screen
          on its painted scene, sides swapping row by row */}
      <div className="-mx-8">
        {features.map((f, i) => {
          const Icon = f.icon;
          const flip = i % 2 === 1;
          return (
            <div
              key={f.tab}
              className={`grid grid-cols-[minmax(0,1fr)] gap-10 px-8 py-12 last:pb-0 md:py-14 md:last:pb-0 lg:gap-14 ${
                flip ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
              }`}
            >
              <Reveal className={`flex flex-col justify-center ${flip ? "lg:order-2" : ""}`}>
                <p className="mono flex items-center gap-2.5 text-b4 uppercase tracking-[0.18em] text-muted-foreground">
                  <Icon size={16} strokeWidth={1.5} className="text-foreground" aria-hidden />
                  {f.tab}
                </p>
                <h3 className="mt-5 [text-wrap:balance]">{f.title}</h3>
                <p className="mt-4 max-w-[480px] text-b1 text-muted-foreground">{f.body}</p>
                <Checks items={f.checks} />
                <a
                  href={f.link.href}
                  className="group/btn mt-6 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-b3 font-medium text-foreground"
                >
                  {f.link.label}
                  <SlideArrow />
                </a>
              </Reveal>
              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                <Scene scene={`${ATP}/scene-${f.scene}.jpg`} {...ROWSHOT}>
                  {f.screen}
                </Scene>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- measured results: the kit's stat fold, then its steps ----------

   feature-pointers-stat: one ink number cell (2 x 2) and the three
   published results as pointers; then feature-steps, each step led by a
   big number, for measuring it on your own suite. */

const results = [
  { name: "Lereta", href: `${SITE}/customers/lereta/`, stat: "70%", line: "Runner and browser on one machine: tests that ran for hours now finish in minutes, nearly flake-free." },
  { name: "Boomi", href: `${SITE}/customers/boomi/`, stat: "78%", line: "From 9.5 hours to under 4 on the first runs, then about 2 hours once its tests were modularized." },
  { name: "Dashlane", href: `${SITE}/customers/dashlane/`, stat: "~50%", line: "About 80 seconds down to about 40 for the same 70 tests, with flaky tests cut by 99.9%." },
];

const measure = [
  { title: "Pin one suite", body: "Pick one suite and pin it to one commit, so both runs test the same code." },
  { title: "Run it twice", body: "Run it on your current grid and on HyperExecute at the same concurrency." },
  { title: "Time every run", body: "From the first test starting to the last result, and repeat it at least five times." },
  { title: "Compare the medians", body: "The median wall-clock time, and the share of tests whose result changed between runs." },
];

function Measured() {
  return (
    <Section>
      <FoldHead
        lead="Where “up to 70% faster”"
        title="comes from"
        body="Each figure is that team's own measurement against the setup it replaced, not a controlled benchmark, so your result depends on your suite."
      />
      <div className="tm-reveal -mx-8 flex flex-col">
        <div className="tm-grid tm-grid--4 !border-b-0">
          <div className="tm-stat-tile">
            <span className="tm-label">Up to</span>
            <div>
              <p className="tm-pixel">70%</p>
              <p>Faster than a traditional test grid, as measured by the three teams beside it on their own suites.</p>
            </div>
            <a className="tm-btn tm-btn--secondary" href={HE_SIGNUP}>
              Run your first job free
            </a>
          </div>
          {results.map((r) => (
            <a key={r.name} href={r.href} className="tm-cell group flex flex-col justify-between gap-6 !p-8 transition-colors duration-200 hover:bg-[var(--tm-bg-fill)]">
              <span className="flex items-center justify-between">
                <span className="text-b1 font-medium">{r.name}</span>
                <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">Faster by</span>
              </span>
              <span className="flex flex-col gap-3">
                <span className="pixel text-[48px] leading-none">{r.stat}</span>
                <span className="text-b3 text-muted-foreground">{r.line}</span>
              </span>
            </a>
          ))}
          <div className="tm-cell flex flex-col justify-between gap-6 !p-8">
            <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">Your suite</span>
            <span className="text-b2">Measure it the same way on your own suite, in four steps below.</span>
          </div>
        </div>
        <ol className="tm-grid tm-grid--4 tm-steps2">
          {measure.map((m, i) => (
            <li key={m.title} className="tm-cell tm-step">
              <span className="tm-step__n">{i + 1}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- 8 orchestration controls: the five-card bento, then three ----------

   As on the Agent Assurance page: the big card on a painted scene with its
   picture, two cards stacked beside it, two below, each with a small
   picture; the last three controls as one row of joined cells. */

const H5 = "!text-[length:var(--tm-h5-size)] !leading-[var(--tm-h5-line)] !tracking-[var(--tm-h5-tracking)]";
const H4 = "!text-[length:var(--tm-h4-size)] !leading-[var(--tm-h4-line)] !tracking-[var(--tm-h4-tracking)]";

function MatrixMini() {
  const browsers = [
    ["chrome.png", "Chrome"],
    ["firefox.png", "Firefox"],
    ["edge.png", "Edge"],
  ];
  const os = ["Windows 11", "macOS", "Linux"];
  return (
    <div className="w-full border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-b4">hyperexecute.yaml</span>
        <span className="flex overflow-hidden rounded-md border border-border text-b4">
          <span className="px-2 py-0.5 text-muted-foreground">Auto-split</span>
          <span className="border-x border-border bg-[var(--tm-bg-muted)] px-2 py-0.5 font-medium">Matrix</span>
          <span className="px-2 py-0.5 text-muted-foreground">Hybrid</span>
        </span>
      </div>
      <div className="grid grid-cols-[96px_repeat(3,minmax(0,1fr))] text-b4">
        <span />
        {os.map((o) => (
          <span key={o} className="px-2 py-2 text-center text-muted-foreground">{o}</span>
        ))}
        {browsers.map(([ic, b]) => (
          <span key={b} className="contents">
            <span className="flex items-center gap-2 border-t border-border px-4 py-2.5">
              <img src={`${ATP}/icons/${ic}`} alt="" className="size-3.5" /> {b}
            </span>
            {os.map((o) => (
              <span key={o} className="flex items-center justify-center border-t border-border py-2.5">
                <span className="tag rounded-sm bg-[var(--tm-green-000)] px-2 font-mono text-b5 text-[var(--tm-green-500)]">task</span>
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-b4">
        <span className="text-muted-foreground">9 tasks from one suite</span>
        <span className="font-medium">9 VMs in parallel</span>
      </div>
    </div>
  );
}

function QueueMini() {
  return (
    <div className="flex w-full max-w-[280px] flex-col border border-border bg-surface text-b4 [box-shadow:var(--tm-shadow-floating-sm)]">
      {[
        ["release-critical", "High", "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]", "running"],
        ["checkout-smoke", "Medium", "bg-[var(--tm-orange-000)] text-[var(--tm-orange-600)]", "next"],
        ["nightly-visual", "Low", "bg-[var(--tm-bg-fill)] text-muted-foreground", "queued"],
      ].map(([n, l, tone, st]) => (
        <span key={n} className="flex items-center gap-2 border-b border-border px-3 py-2.5 last:border-b-0">
          <span className="min-w-0 flex-1 truncate font-mono">{n}</span>
          <span className={`tag rounded-sm px-1.5 text-b5 ${tone}`}>{l}</span>
          <span className="w-14 text-right text-b5 text-muted-foreground">{st}</span>
        </span>
      ))}
    </div>
  );
}

function FailFastMini() {
  const runs = ["ok", "ok", "ok", "ok", "fail", "fail", "fail", "stop", "stop", "stop", "stop", "stop"];
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3 border border-border bg-surface p-4 [box-shadow:var(--tm-shadow-floating-sm)]">
      <span className="flex flex-wrap gap-1.5">
        {runs.map((r, i) => (
          <span
            key={i}
            className={`size-4 ${r === "ok" ? "bg-[var(--tm-green-300)]" : r === "fail" ? "bg-[var(--tm-red-400)]" : "border border-dashed border-border"}`}
          />
        ))}
      </span>
      <span className="flex items-center justify-between text-b4">
        <span className="font-mono text-muted-foreground">failFast: 3</span>
        <span className="tag rounded-sm bg-[var(--tm-red-000)] px-1.5 text-b5 text-[var(--tm-red-500)]">Job stopped</span>
      </span>
    </div>
  );
}

function RerunMini() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3 border border-border bg-surface p-4 [box-shadow:var(--tm-shadow-floating-sm)]">
      <span className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="pixel text-[32px] leading-none text-[var(--tm-red-500)]">20</span>
        <span className="text-b4 text-muted-foreground">of 900 scenarios failed</span>
      </span>
      <span className="flex h-1.5 overflow-hidden rounded-full">
        <span className="w-[97.8%] bg-[var(--tm-green-400)]" />
        <span className="flex-1 bg-[var(--tm-red-400)]" />
      </span>
      <span className="btn flex h-9 items-center justify-center gap-2 rounded-md bg-[var(--tm-button-primary)] text-b4 font-medium text-[var(--tm-fg-inverse)]">
        <RotateCcw size={14} strokeWidth={1.5} aria-hidden /> Re-run the 20 failed
      </span>
    </div>
  );
}

function ArtifactsMini() {
  return (
    <div className="flex w-full max-w-[280px] flex-col border border-border bg-surface text-b4 [box-shadow:var(--tm-shadow-floating-sm)]">
      {[
        ["video.mp4", "4.2 MB"],
        ["screenshots/", "18 files"],
        ["network.har", "860 KB"],
        ["console.log", "12 KB"],
      ].map(([f, sz]) => (
        <span key={f} className="flex items-center gap-2 border-b border-border px-3 py-2 last:border-b-0">
          <FileArchive size={14} strokeWidth={1.5} className="text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 font-mono">{f}</span>
          <span className="text-b5 text-muted-foreground">{sz}</span>
        </span>
      ))}
    </div>
  );
}

function BentoCard({ title, body, visual, className = "" }: { title: string; body: string; visual: ReactNode; className?: string }) {
  return (
    <div className={`grid min-h-[280px] gap-8 p-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:items-center ${className}`}>
      <div>
        <h3 className={`[text-wrap:balance] ${H4}`}>{title}</h3>
        <p className="mt-2 max-w-[300px] text-b2 text-muted-foreground">{body}</p>
      </div>
      <div className="flex items-center justify-center">{visual}</div>
    </div>
  );
}

const moreControls = [
  { icon: CalendarClock, title: "Schedule runs without a CI server", body: "Group your jobs under a named Project, then schedule Workflows to run once, later, or weekly, and chain one run into the next." },
  { icon: BellOff, title: "Auto-mute noisy tests", body: "Tests that fail five times in a row are muted automatically, and stay muted until you unmute them." },
  { icon: Archive, title: "Jobs archiving", body: "Archive stale jobs to declutter your workspace and find active runs faster." },
];

function Controls() {
  return (
    <Section>
      <FoldHead
        lead="8 orchestration controls"
        title="for every job"
        body="Run browser and OS combinations, push release-critical jobs to the front, stop a broken build early, rerun only what failed and keep every log from the run."
      >
        <PrimaryBtn href={SIGNUP}>Start free with Google</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8 border-y border-border bg-surface">
        <div className="grid lg:grid-cols-2">
          {/* the big card: the painting fills it, the copy sits on a white wash */}
          <div className="relative flex min-h-[560px] flex-col overflow-hidden border-border max-lg:border-b lg:border-r">
            <img src={`${ATP}/scene-par.jpg`} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_52%,color-mix(in_srgb,var(--tm-bg-surface)_92%,transparent)_70%,var(--tm-bg-surface)_100%)]"
            />
            <div className="relative flex flex-1 items-center justify-center px-8 pb-6 pt-12">
              <div className="w-full max-w-[460px]">
                <MatrixMini />
              </div>
            </div>
            <div className="relative p-8">
              <h3 className={`[text-wrap:balance] ${H4}`}>Turn one suite into many tasks</h3>
              <p className="mt-2 max-w-[520px] text-b2 text-muted-foreground">
                Auto-Split spreads your discovered tests across parallel machines. Matrix runs every browser and OS pair you list. Hybrid does both.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <BentoCard
              className="border-b border-border"
              title="Critical suites clear the queue"
              body="Label a job high, medium or low with the jobLabel key, and release-critical suites go to the front."
              visual={<QueueMini />}
            />
            <BentoCard
              className="flex-1"
              title="Fail-fast aborts a broken build"
              body="Set a threshold and the job stops once that many tests fail in a row, so it stops burning your parallels."
              visual={<FailFastMini />}
            />
          </div>
        </div>
        <div className="grid border-t border-border lg:grid-cols-2">
          <BentoCard
            className="border-border max-lg:border-b lg:border-r"
            title="Rerun only the failed scenarios"
            body="A 900-scenario job ends with 20 failures. Click Re-Run and only those 20 run again, on the same commit or the latest one."
            visual={<RerunMini />}
          />
          <BentoCard
            title="Every run saves its artifacts"
            body="Every test keeps its own video, screenshots, and command, network and console logs, in one archive you can download."
            visual={<ArtifactsMini />}
          />
        </div>
        {/* the last three controls */}
        <div className="grid gap-px border-t border-border bg-border md:grid-cols-3">
          {moreControls.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 bg-surface p-8">
              <Icon size={20} strokeWidth={1.5} className="mt-0.5 flex-none" aria-hidden />
              <div className="flex flex-col gap-2">
                <h3 className={H5}>{title}</h3>
                <p className="text-b3 text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- performance testing: steps beside the load test screen ----------

   The kit's code-setup shape: the copy and three numbered points on the
   left, the product screen on its painted scene on the right. */

const perf = [
  { title: "Works with the scripts you have", body: "Your JMeter and Gatling scripts run without changes." },
  { title: "See bottlenecks as they happen", body: "Watch response times, throughput and errors per endpoint in real time, and spot which API slows down first." },
  { title: "Test from where your users are", body: "Generate load from any of six cloud regions. Enterprise plans can split one run across several to compare response times." },
];

function Performance() {
  return (
    <Section>
      <FoldHead
        lead="Run your JMeter and Gatling plans"
        title="on HyperExecute"
        body="Simulate real-world traffic against your apps and APIs. HyperExecute provisions the load generators for each run and removes them when it ends."
      >
        <PrimaryBtn href={`${SITE}/performance-testing/`}>Explore performance testing</PrimaryBtn>
      </FoldHead>
      <div className="tm-setup tm-reveal lg:!items-center">
        <ol className="tm-steps !mt-0">
          {perf.map((p, i) => (
            <li key={p.title}>
              <span className="tm-label !pt-1">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <b className={H5}>{p.title}</b>
                <p className="!mt-1 !text-b2">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <Scene scene={`${ATP}/scene-rep.jpg`} {...ROW}>
          <LoadScreen />
        </Scene>
      </div>
    </Section>
  );
}

/* ---------- customer stories and reviews: one fold ----------

   The live page's four stories, with its three review quotes in place
   of the logo row, so stories and reviews are one fold. */

const quotes = [
  {
    quote: "New testing platform alert! I recently tried out @testmuai's HyperExecute, an end-to-end smart test orchestration platform. I was amazed at its speed and 'intelligence'.",
    name: "Sanjay Kumar",
    role: "@SanjayKumaarr",
    img: `${IMG}/sanjay.png`,
    round: true,
  },
  {
    quote: "Now, we worry less about the orchestration, infrastructure and focus more on our tests.",
    name: "Hrishi Potdar",
    role: "Quality Engineering Architect, Boomi",
    img: `${IMG}/testu/hrishi-potdar.png`,
    round: true,
  },
  {
    quote: "LambdaTest is doing for test automation what Kubernetes did for container orchestration, creating that next level of efficiency around test automation so that people can actually focus on testing versus test orchestration.",
    name: "Satya Nadella",
    role: "Chairman & CEO, Microsoft, Future Ready Technology Summit 2023",
    img: `${IMG}/microsoft.svg`,
    round: false,
  },
];

const stories: StoriesContent = {
  body: "Every number here comes from a published customer story, in the team's own words.",
  hero: {
    brand: `${IMG}/customer/BoomiNew.svg`,
    brandAlt: "Boomi",
    image: `${IMG}/customer/boomi-outer.webp`,
    href: `${SITE}/customers/boomi/`,
    stat: "78%",
    statLabel: "Faster test execution",
    quote: "We have tripled our tests and are now executing tests in less than 2 hours.",
    name: "Hrishi Potdar",
    role: "Quality Engineering Architect",
    action: "Read case study",
  },
  cells: [
    { brand: `${IMG}/customer/bajaj-finserv-main.svg`, href: `${SITE}/customers/bajaj-finserv/`, stat: "70%", desc: "Faster automation runtime" },
    { brand: `${IMG}/customer/Transavia.svg`, href: `${SITE}/customers/transavia/`, stat: "70%", desc: "Faster test execution" },
  ],
  wide: {
    brand: `${IMG}/customer/fyscal-technologies-main.png`,
    brandAlt: "Fyscal Technologies",
    brandClass: "brightness-0 invert",
    href: `${SITE}/customers/fyscal-technologies/`,
    stat: "60%",
    desc: "Faster test execution, 600+ engineering hours reclaimed every month",
    action: "Read case study",
    image: `${IMG}/customer/fyscal-technologies-main.webp`,
  },
  quotes,
};

/* ---------- frameworks: the minimal tabs, one per framework ---------- */

type Fw = { name: string; logo: string; langs: { lang: string; icon?: string; fw: [string, string][] }[] };
const LANG_ICON = `${IMG}/frameworks`;
const d = (slug: string) => `${DOCS}/${slug}/`;
const frameworks: Fw[] = [
  {
    name: "Selenium",
    logo: `${IMG}/selenium-automation-cloud.svg`,
    langs: [
      { lang: "Java", icon: "Java.svg", fw: [["TestNG", d("testng-on-hyperexecute-grid")], ["JUnit", d("junit-on-hyperexecute-grid")], ["Cucumber", d("cucumber-on-hyperexecute-grid")]] },
      { lang: "JavaScript", icon: "Javascript.svg", fw: [["WebdriverIO", d("webdriverio-on-hyperexecute-grid")], ["Protractor", d("protractor-on-hyperexecute-grid")], ["Nightwatch", d("nightwatch-on-hyperexecute-grid")], ["BiDi", d("hyperexecute-bidi-testing")]] },
      { lang: "C#", icon: "CSharp.svg", fw: [["NUnit", d("nunit-on-hyperexecute-grid")], ["SpecFlow", d("specflow-on-hyperexecute-grid")], ["Reqnroll", d("reqnroll-on-hyperexecute-grid")]] },
      { lang: "Python", icon: "Python.svg", fw: [["PyUnit", d("pyunit-on-hyperexecute-grid")], ["pytest", d("pytest-on-hyperexecute-grid")], ["Robot", d("robot-on-hyperexecute-grid")], ["Behave", d("behave-on-hyperexecute-grid")]] },
      { lang: "Ruby", icon: "Ruby.svg", fw: [["Ruby", d("ruby-on-hyperexecute-grid")], ["Capybara", d("capybara-on-hyperexecute-grid")]] },
    ],
  },
  {
    name: "Puppeteer",
    logo: `${IMG}/puppeteer-automation-cloud.svg`,
    langs: [{ lang: "JavaScript", icon: "Javascript.svg", fw: [["Jest", d("jest-on-hyperexecute")], ["Mocha", d("mocha-on-hyperexecute")], ["CodeceptJS", d("codecept-on-hyperexecute")]] }],
  },
  {
    name: "Playwright",
    logo: `${IMG}/playwright-automation-cloud.svg`,
    langs: [
      {
        lang: "JavaScript",
        icon: "Javascript.svg",
        fw: [
          ["Playwright", d("playwright-integration-with-hyperexecute")],
          ["VanillaJS", d("playwright-vanillajs-on-hyperexecute")],
          ["CodeceptJS", d("playwright-codeceptjs-on-hyperexecute")],
          ["Jest", d("playwright-jest-on-hyperexecute")],
          ["JUnit", d("playwright-junit-on-hyperexecute")],
          ["Real Device", d("playwright-real-device-on-hyperexecute")],
        ],
      },
      { lang: "Python", icon: "Python.svg", fw: [["pytest", d("pytest-on-hyperexecute")], ["Python", d("playwright-python-on-hyperexecute")]] },
      { lang: "C#", icon: "CSharp.svg", fw: [[".NET", d("playwright-dotnet-on-hyperexecute")]] },
    ],
  },
  { name: "Cypress", logo: `${IMG}/cypress-automation-cloud.svg`, langs: [{ lang: "JavaScript", icon: "Javascript.svg", fw: [["Getting started", d("cypress-integration-with-hyperexecute")]] }] },
  { name: "Appium", logo: `${IMG}/appium-automation-cloud.svg`, langs: [{ lang: "Appium", fw: [["Getting started", d("hyperexecute-appium-testing")]] }] },
  { name: "Espresso", logo: `${IMG}/espresso-automation-cloud.svg`, langs: [{ lang: "Espresso", fw: [["Getting started", d("hyperexecute-espresso-testing")]] }] },
  { name: "Maestro", logo: `${IMG}/maestro-framework.svg`, langs: [{ lang: "Maestro", fw: [["Getting started", d("hyperexecute-maestro-testing")]] }] },
  { name: "Detox", logo: `${IMG}/detox-framework.svg`, langs: [{ lang: "Detox", fw: [["Getting started", d("hyperexecute-detox-testing")]] }] },
  { name: "XCUITest", logo: `${IMG}/xcuitest-automation-cloud.svg`, langs: [{ lang: "XCUITest", fw: [["Getting started", d("hyperexecute-xcui-testing")]] }] },
];

function Frameworks() {
  return (
    <Section>
      <FoldHead
        lead="Works with your framework"
        title="and any CI/CD pipeline"
        body="Deep support for Selenium, Playwright, Cypress, Puppeteer, Appium, Espresso, XCUITest, Maestro and Detox, and any other framework the YAML can run. One binary and one config file wire it into any pipeline in three steps."
      />
      <div className="tm-reveal -mx-8" data-tm-step-root>
        <div className={`${TAB_BAR} lg:[grid-auto-columns:minmax(0,1fr)]`} role="tablist">
          {frameworks.map((f) => (
            <button key={f.name} role="tab" data-step>
              {f.name}
            </button>
          ))}
        </div>
        {frameworks.map((f, i) => (
          <div key={f.name} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy !justify-start">
                <span className="tm-pt__ico tm-pt__ico--brand">
                  <img src={f.logo} alt="" loading="lazy" />
                </span>
                <h3 className="mt-4">{f.name}</h3>
                <p>Run your {f.name} suite on HyperExecute as it is, with one YAML file and no grid to maintain.</p>
                <div className="mt-6">
                  <KitLink href={f.langs[0].fw[0][1]}>Read the docs</KitLink>
                </div>
              </div>
              <div className="flex flex-col justify-center px-8 py-6 lg:px-12">
                {f.langs.map((l, li) => (
                  <div key={`${l.lang}-${li}`} className="flex flex-col gap-2 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-start sm:gap-6">
                    <span className="flex w-40 flex-none items-center gap-3 text-b2 font-medium">
                      {l.icon ? <img src={`${LANG_ICON}/${l.icon}`} alt="" className="size-5 object-contain" loading="lazy" /> : <span className="size-5" />}
                      {l.lang}
                    </span>
                    <span className="flex flex-wrap gap-x-6 gap-y-2 text-b3 text-muted-foreground">
                      {l.fw.map(([n, href]) => (
                        <a key={n} href={href} className="transition-colors duration-150 hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:text-foreground">
                          {n}
                        </a>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* setup and pipelines: the same three steps on every CI, then
            every pipeline with a guide, as the automation page's tiles */}
        <div className="grid border-t border-border bg-surface lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col gap-4 border-border px-8 py-8 max-lg:border-b lg:border-r lg:px-12">
            <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">Three steps on every pipeline</span>
            {ciSteps.map((st) => (
              <span key={st.n} className="flex items-center gap-3">
                <span className={`${TILE} font-mono text-b4`}>{st.n}</span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-b2 text-foreground">{st.title}</span>
                  <span className="truncate font-mono text-b4 text-muted-foreground">{st.line}</span>
                </span>
              </span>
            ))}
            <div className="mt-2">
              <KitLink href={`${DOCS}/hyperexecute-integration-with-ci-cd-tools/`}>Read the CI/CD guide</KitLink>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-8 py-8 lg:px-12">
            <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">Works with every CI/CD pipeline</span>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {pipelines.map(([name, slug, icon]) => (
                <li key={name}>
                  <a href={d(slug)} className="group flex items-center gap-3 py-1">
                    <span className={TILE}>
                      {icon ? (
                        <img src={`/img/integrations/color/${icon}.svg`} alt="" className="size-5 object-contain" />
                      ) : (
                        <Workflow size={20} strokeWidth={1.5} aria-hidden />
                      )}
                    </span>
                    <span className="text-b2 text-foreground">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- CI/CD: the steps and pipelines shown under the framework tabs ----------

   The heading and line on the left; every pipeline with a guide as an icon
   tile on the right, then the three steps that are the same on all of them. */

const pipelines: [string, string, string?][] = [
  ["Jenkins", "jenkins-with-hyperexecute", "jenkins"],
  ["GitHub Actions", "github-actions-with-hyperexecute", "github"],
  ["GitLab", "gitlab-integration-with-hyperexecute", "gitlab"],
  ["Azure DevOps", "azure-with-hyperexecute", "azuredevops"],
  ["CircleCI", "circle-ci-with-hyperexecute", "circleci"],
  ["Bitbucket", "bitbucket-pipeline-with-hyperexecute"],
  ["AWS CodePipeline", "aws-codepipeline-with-hyperexecute"],
  ["TeamCity", "teamcity-with-hyperexecute"],
  ["Bamboo CI", "bamboo-integration-with-hyperexecute"],
  ["Travis CI", "travis-ci-with-hyperexecute"],
  ["GoCD", "gocd-integration-with-hyperexecute"],
  ["Semaphore", "semaphore-integration-with-hyperexecute"],
];

const ciSteps = [
  { n: "01", title: "Download the CLI", line: "Linux, macOS or Windows" },
  { n: "02", title: "Set two secrets", line: "LT_USERNAME · LT_ACCESS_KEY" },
  { n: "03", title: "Point it at your YAML", line: "./hyperexecute --config hyperexecute.yaml" },
];

const TILE = "flex size-10 flex-none items-center justify-center rounded-md border border-border bg-surface [box-shadow:var(--tm-shadow-resting-xs)] transition-transform duration-300 group-hover:-translate-y-0.5";

/* ---------- your own cloud: the kit's image cards, as on the automation page ---------- */

const ownCloud = [
  { title: "HyperExecute for private cloud", body: "Run inside your own cloud with whitelabeled dashboards, advanced data retention rules and fallback to the shared cloud for redundancy.", screen: <PrivateCloudScreen />, scene: "cloud" },
  { title: "Enterprise access and governance", body: "SSO, SCIM provisioning, role-based access and audit logs, plus concurrency groups that give each team its own parallel budget.", screen: <GovernanceScreen />, scene: "gov" },
  { title: "AWS, Azure or Google Cloud", body: "Private cloud setup is documented for six AWS regions, runs as an Azure Native Integration in your tenant, and is available on Google Cloud on request.", screen: <CloudsScreen />, scene: "pipe" },
];

function OwnCloud() {
  return (
    <Section>
      <FoldHead
        lead="Deploy HyperExecute in your own cloud"
        title="or on-premise"
        body="The shared cloud is the default. Teams with data residency rules can run HyperExecute in their own cloud account or behind their firewall."
      >
        <PrimaryBtn href={`${SITE}/request-demo/`}>Book a demo</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {ownCloud.map((c) => (
            <div key={c.title} className="tm-cell tm-fcard2">
              <div className="tm-well">
                <Scene scene={`${ATP}/scene-${c.scene}.jpg`} card {...CARD}>
                  {c.screen}
                </Scene>
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- open source: the kit's CTA band ---------- */

function OpenSource() {
  return (
    <Section>
      <div className="tm-reveal -mx-8 flex flex-col gap-6 border-y border-border bg-surface px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h3>Open source</h3>
          <p className="text-b2 text-muted-foreground">
            We strongly believe in the open-source community and owe much of our success to it. To give back, we're offering 10 free parallel sessions of HyperExecute.
          </p>
        </div>
        <KitLink href={`${SITE}/open-source/`}>Get in touch</KitLink>
      </div>
    </Section>
  );
}

/* ---------- products and docs: the kit's link catalog ---------- */

const related = [
  { group: "Orchestration and speed", links: [["AI test orchestration", "/ai-based-test-orchestration/"], ["HyperExecute documentation", "/support/docs/getting-started-with-hyperexecute/"], ["Cypress parallel testing", "/cypress-parallel-testing/"]] },
  { group: "Execution infrastructure", links: [["Automation cloud", "/automation-cloud/"], ["Selenium Grid online", "/selenium-grid-online/"], ["Real device cloud", "/real-device-cloud/"]] },
  { group: "Agents and tooling", links: [["KaneAI", "/kane-ai/"], ["Kane CLI", "/kane-cli/"], ["HyperExecute MCP server", "/hyperexecute-mcp-server/"]] },
  { group: "Enterprise and insights", links: [["Enterprise execution environment", "/enterprise-execution-environment/"], ["Test intelligence", "/test-intelligence/"], ["HyperExecute pricing", "/pricing/"]] },
];

function Related() {
  return (
    <Section>
      <FoldHead
        lead="Products and docs"
        title="to use with HyperExecute"
        body="KaneAI writes tests, Kane CLI runs plain-English browser flows from your terminal, Automation Cloud and Real Device Cloud add browser and device coverage, and Test Intelligence tracks failure trends across runs."
      />
      <div className="tm-reveal tm-join !-mx-8">
        {related.map((r) => (
          <div key={r.group} className="flex flex-col gap-5 !p-8">
            <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">{r.group}</span>
            <ul className="flex flex-col gap-3">
              {r.links.map(([label, path]) => (
                <li key={label}>
                  <KitLink href={`${SITE}${path}`}>{label}</KitLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ: the live page's 23 questions, links as plain text ---------- */

const faq = [
  { q: "What is HyperExecute?", a: "HyperExecute is an AI-native test execution and orchestration cloud from TestMu AI. It runs existing Selenium, Playwright, Cypress and mobile test suites on just-in-time infrastructure instead of a traditional grid, splits and orders tests across machines, and is configured with one YAML file from your CI pipeline." },
  { q: "How is HyperExecute different from a Selenium Grid?", a: "A Selenium Grid routes every command through a hub to a remote node. HyperExecute runs each task on its own virtual machine with no network hops per command, orchestrates how tests are split and ordered, and adds flaky-test detection and AI root cause analysis, so there is no grid for your team to maintain." },
  { q: "How to use HyperExecute?", a: "Add a hyperexecute.yaml file to your project and run the HyperExecute CLI against it. The YAML sets the operating system, concurrency, test discovery and the test command. The TestMu AI MCP server can write that YAML from inside your IDE, and a GUI (Beta) gets Java TestNG projects to a first run without writing YAML." },
  { q: "How does HyperExecute handle flaky tests?", a: "HyperExecute tracks each test over a sliding window of its last 10 runs. A flake rate above a tunable 20% threshold flags the test, with severity high above 75%, medium at 50 to 75% and low below 50%. Tests that fail five times in a row are muted automatically." },
  { q: "How much faster will HyperExecute run my suite?", a: "Up to 70% faster, and results vary by suite. Lereta measured 70% faster test execution after moving to HyperExecute, and Boomi and Dashlane published gains of 78% and about 50% against the setups they replaced. The gain is largest for suites that were slowed by network hops or that ran one test at a time. The figure that counts is your own: run one suite at the same commit and concurrency on your current setup and on HyperExecute, and compare the median wall-clock time." },
  { q: "How is HyperExecute priced, and is there a free plan?", a: "HyperExecute bills by concurrency: one license per parallel test, with no charge per user. The free plan includes 300 minutes of testing on up to 2 concurrent sessions on Windows or Linux, with no credit card. Paid plans cost $103 per parallel a month for Linux, or $159 for Windows, macOS and Linux, billed annually, with unlimited test minutes. With 10 licenses and 50 tests, 10 run and 40 wait in the queue for a free slot. See HyperExecute pricing for current plans." },
  { q: "Do I need to change my code to run my tests on HyperExecute?", a: "No. Your test code runs as it is. What moves is the setup around it: dependency installs go into pre-steps, credentials go into the HyperExecute secrets vault and are referenced from the YAML, and apps behind a firewall need a tunnel." },
  { q: "How is HyperExecute different from other testing clouds?", a: "A grid is built to keep browsers available. HyperExecute is a test orchestration platform built to finish the whole suite sooner, so besides running each test on one VM it can restore dependencies from a cache keyed on your lockfile, and it runs the tests that failed last time first, which shows a broken build early. The Sauce Labs alternative page compares HyperExecute with saucectl sharding and parallel runs. For other device and browser clouds, see the BrowserStack alternative, AWS Device Farm alternative, Kobiton alternative and HeadSpin alternative pages." },
  { q: "How does HyperExecute work?", a: "The CLI reads hyperexecute.yaml, uploads your tests and runs your pre-steps and test discovery. HyperExecute then fans the job out into tasks, one per VM, and streams each task's logs while it runs." },
  { q: "Which frameworks do the HyperExecute AI features support?", a: "AI root cause analysis reads failures from Selenium, Appium, Playwright, Cypress, Detox and Maestro runs. Auto-healing works with Selenium, Playwright and Appium, where it is called Smart Heal on real devices. Flaky test detection covers Selenium tests today, with a Playwright reporter integration." },
  { q: "Is there any limit on parallel testing on HyperExecute?", a: "There is no architectural ceiling; the number of licenses on your plan sets your parallel limit. More VMs shorten a run until the suite is fully fanned out, and past one VM per test entity, extra concurrency adds nothing. HyperExecute recommends a concurrency from your usage." },
  { q: "Which testing frameworks does HyperExecute support?", a: "HyperExecute has deep support for Selenium, Playwright, Cypress, Puppeteer, Appium, Espresso, XCUITest, Maestro and Detox, plus JMeter and Gatling for performance testing. Because the YAML runs any executable test command, any other framework works too, and the orchestration features and real-time logs are native to the platform regardless of framework." },
  { q: "Do mobile tests on HyperExecute run on real devices or emulators?", a: "It depends on the framework. Espresso and XCUITest run on real or virtual devices, Detox on Android real devices and iOS simulators, and Maestro on Android emulators, Android real devices and iOS simulators. Real-device runs need Real Device Cloud licenses alongside HyperExecute." },
  { q: "Can I run performance tests with HyperExecute?", a: "Yes, and paid HyperExecute plans include it: each license carries 100 virtual user hours a month and 100 concurrent users for JMeter tests. Gatling plans run from your hyperexecute.yaml as ordinary jobs on your existing concurrency. Larger load tiers are on the cloud load testing tool page." },
  { q: "In which regions does HyperExecute provide its testing infrastructure?", a: "HyperExecute runs on just-in-time virtual machines on Azure, across 40+ cloud availability regions. The execution region is selected automatically based on where you trigger the HyperExecute CLI, keeping tests close to your infrastructure." },
  { q: "What are the configurations for HyperExecute virtual machines?", a: "Virtual machine configurations vary by operating system, with Linux provisioned at a lower core count than Windows and macOS. The current per-OS specifications are published in the HyperExecute documentation, and enterprise accounts can request a customized execution environment." },
  { q: "How can I integrate HyperExecute with CI/CD platforms?", a: "No plugin is required. Each pipeline downloads the HyperExecute CLI in a job step and runs it against hyperexecute.yaml, so any CI system that can run a shell command works, including ones without a dedicated guide." },
  { q: "What smart CI features does HyperExecute provide?", a: "HyperExecute runs pre and post steps on every VM, sets custom environment variables, pins language runtime versions and collects artifacts. Because the tests are triggered and executed on HyperExecute, your CI runner only starts the job and waits for the result." },
  { q: "How can I test my private web applications on HyperExecute?", a: "Use a tunnel, started from the CLI, to reach local builds, staging sites and private networks. For apps that are public but access-restricted, a Dedicated Proxy routes test traffic through one IP your firewall can whitelist; TestMu AI support enables it for your account." },
  { q: "Which OS does HyperExecute provide to execute tests?", a: "HyperExecute provides the latest Windows, macOS, and Linux virtual machines to run your tests, with multiple versions available across each operating system." },
  { q: "Which browsers are available on HyperExecute to run cross browser tests?", a: "You choose the browsers and versions for each job in hyperexecute.yaml, for example Chrome and Firefox in a matrix, on Windows, macOS or Linux virtual machines. The current browser and version list for each operating system is published in the HyperExecute documentation." },
  { q: "Is HyperExecute available as an on-prem solution?", a: "Yes, as a private cloud in your own AWS or Azure account or on-premise, with Google Cloud on request. Private cloud covers Linux and Windows, so macOS and Safari runs stay on the shared cloud." },
  { q: "How secure is HyperExecute?", a: "Data is encrypted in transit with TLS 1.2 or higher and at rest with AES-256, and secrets sit in HashiCorp Vault, where they are write-only. TestMu AI holds SOC 2 Type 2 and complies with GDPR and CCPA. An org admin can also switch off every AI feature at once, and existing RCA reports stay readable." },
];

/* ---------- page ---------- */

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
        <HowItWorks />
        <Measured />
        <Controls />
        <Frameworks />
        <Performance />
        <OwnCloud />
        <Reasons integrations={false} />
        <Stories content={stories} />
        <OpenSource />
        <Related />
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
