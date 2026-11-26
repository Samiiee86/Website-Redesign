import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  Compass,
  Copy,
  FileCheck2,
  PenLine,
  Play,
  X,
} from "lucide-react";
import "./index.css";
import { ArrowChip, Reveal, Section } from "./lib/ui";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Stories from "./sections/Stories";
import Reasons from "./sections/Reasons";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import { FoldHead } from "./pieces/compare/parts";
import { CARD, Fit, Scene, TAB } from "./pieces/Screens";
import {
  AgentScreen,
  BlogCard,
  CoverageScreen,
  DesignScreen,
  DocsCard,
  ExecuteScreen,
  ExploreScreen,
  GateScreen,
  GitHubCard,
  HealStepScreen,
  HeroScreen,
  Pill,
  PlanScreen,
  ReplayScreen,
  ReportScreen,
  SurfacesScreen,
  Term,
  UseCaseScreen,
  type UseCase,
} from "./pieces/KaneScreens";
import { agents } from "./pieces/kaneAgents";

/* Kane CLI page (kane-cli.html), from Sameer's design file
   (Kane-CLI-page-redesign): every word is his; the layout is rebuilt
   from the site's shared folds and the kit's, one reader question per
   fold, top to bottom:

   - what it is: hero (install command, a TUI run beside its browser),
     the coding agents it works with, the logo wall;
   - why: the problem, three numbers and the two ways a change ships;
   - how: the home page's zig-zag rows, explore to report;
   - what you get: a list beside one panel;
   - for agents and pipelines: one big picture, three steps that play
     in turn under their progress lines;
   - proof: the PRISM benchmark card, use cases as the kit's tour,
     builders' quotes, hackathon projects, customer stories;
   - fits your stack: the delivery loop with Kane CLI in the middle;
   - then resources, more reasons, the FAQ, enterprise and the footer.

   Product screens are drawn in the hero-fold look (pieces/KaneScreens). */

const SITE = "https://www.testmuai.com";
const SIGNUP = `${SITE}/register/`;
const DEMO = `${SITE}/request-demo/`;
const ATP = "/kit/atp";

const H5 = "!text-[length:var(--tm-h5-size)] !leading-[var(--tm-h5-line)] !tracking-[var(--tm-h5-tracking)]";
const H4 = "!text-[length:var(--tm-h4-size)] !leading-[var(--tm-h4-line)] !tracking-[var(--tm-h4-tracking)]";
const LABEL = "font-mono text-b4 uppercase tracking-[2px] text-muted-foreground";

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

function PrimaryBtn({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain">
      {children}
      <ArrowChip />
    </a>
  );
}

/* the start / demo pair under a fold head */
const Actions = () => (
  <div className="mt-8 flex flex-wrap items-center gap-3">
    <PrimaryBtn href={SIGNUP}>Start free</PrimaryBtn>
    <a href={DEMO} className="tm-btn tm-btn--secondary">
      Book a demo
    </a>
  </div>
);

/* previous / next arrows, shared by the list and the carousel */
function Arrows({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return (
    <span className="flex gap-2">
      <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className="tm-btn tm-btn--secondary !h-10 !w-10 !p-0">
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
      </button>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`} className="tm-btn tm-btn--secondary !h-10 !w-10 !p-0">
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
      </button>
    </span>
  );
}

/* ---------- hero: the kit's hero-media, with the install command ---------- */

const WORDS = ["developers", "QA leads", "coding agents"];
const INSTALL = { npm: "npm install -g @testmuai/kane-cli", brew: "brew install testmuai/kane/kane-cli" };

/* the audience word, typed and deleted in turn */
function Typed() {
  const [w, setW] = useState(0);
  const [n, setN] = useState(WORDS[0].length);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = WORDS[w];
    let t: number;
    if (!del && n === word.length) t = window.setTimeout(() => setDel(true), 2200);
    else if (del && n === 0) t = window.setTimeout(() => {
      setDel(false);
      setW((w + 1) % WORDS.length);
    }, 350);
    else t = window.setTimeout(() => setN(n + (del ? -1 : 1)), del ? 45 : 90);
    return () => clearTimeout(t);
  }, [w, n, del]);
  return (
    <span className="tm-nowrap">
      Agent for <span className="sr-only">developers, QA leads and coding agents</span>
      <span aria-hidden className="!inline">
        {WORDS[w].slice(0, n) || "\u00a0"}
        <span className="ml-1 !inline-block h-[0.8em] w-[3px] translate-y-[0.05em] animate-pulse bg-[var(--tm-hero-arrow)]" />
      </span>
    </span>
  );
}

function Install() {
  const [pm, setPm] = useState<keyof typeof INSTALL>("npm");
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(INSTALL[pm]).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    });
  };
  return (
    <div className="input flex h-11 w-full max-w-[480px] items-center gap-3 rounded-md border border-border bg-surface pl-4 pr-1">
      {/* npm / brew as quiet text, the picked one in ink; a hairline before the command */}
      <span className="flex flex-none items-center gap-3 border-r border-border pr-3" role="tablist" aria-label="Install with">
        {(Object.keys(INSTALL) as (keyof typeof INSTALL)[]).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={k === pm}
            onClick={() => setPm(k)}
            className={`button font-mono text-b4 transition-colors ${k === pm ? "text-foreground" : "text-[var(--tm-fg-subtle)] hover:text-foreground"}`}
          >
            {k}
          </button>
        ))}
      </span>
      <code className="min-w-0 flex-1 truncate text-left font-mono text-b4">{INSTALL[pm]}</code>
      <button type="button" onClick={copy} aria-label="Copy the install command" className="tm-btn tm-btn--secondary !h-9 !w-9 flex-none !border-0 !p-0 text-muted-foreground">
        {done ? <Check size={16} strokeWidth={1.5} aria-hidden /> : <Copy size={16} strokeWidth={1.5} aria-hidden />}
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <a
            href="https://www.producthunt.com/products/lambdatest?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-kane-cli-2"
            className="pill mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-b4"
          >
            <span className="font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">Product Hunt</span>
            <span className="font-medium">#1 Product of the Day</span>
          </a>
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">Kane CLI: End-to-End Testing</span>
            <Typed />
          </h1>
          <p className="tm-hero__promise">
            Kane CLI tests your app the way a user would, in a real browser and on mobile, and returns a pass or fail backed by evidence.
          </p>
        </div>
        <div className="tm-actions tm-hero__actions flex-wrap items-center">
          <a className="tm-btn tm-btn--primary tm-btn--arrow" href={SIGNUP}>
            Start free
            <span className="tm-chip" aria-hidden="true">
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          </a>
          <a className="tm-btn tm-btn--secondary" href={DEMO}>
            Book a demo
          </a>
          <span className="w-full lg:ml-auto lg:w-auto lg:min-w-[440px]">
            <Install />
          </span>
        </div>
        <div className="tm-hero__stage">
          <img className="tm-scene" src={`${ATP}/scene-cli.jpg`} alt="" />
          <div className="tm-hero__screen !max-w-[1072px] !aspect-[1072/552]">
            <Fit w={1072} h={552}>
              <HeroScreen />
            </Fit>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- the problem: HyperExecute's feature pointers ----------

   Four joined white cells, as on HyperExecute's "measure it": the three
   numbers in Geist Pixel, then the same change shipped with and without
   Kane CLI. No charts: one look per cell. */

const problem = [
  { k: "Rejected PRs", n: "~50%", t: "of agent-written PRs get rejected, even when every test is green." },
  { k: "Review queue", n: "5x", t: "longer wait before an agent-written PR gets a review." },
  { k: "Main branch", n: "3 in 10", t: "builds on main fail." },
];

function Problem() {
  return (
    <Section>
      <FoldHead lead="Code ships faster" title="than you can prove it works" body="A quick click-through catches the obvious. It leaves nothing the next person can check." />
      <div className="tm-reveal -mx-8">
        <ul className="tm-grid tm-grid--4">
          {problem.map((p) => (
            <li key={p.k} className="tm-cell tm-pt">
              <span className={LABEL}>{p.k}</span>
              <span className="pixel mt-auto pt-8 text-[length:var(--tm-h1-size)] leading-none">{p.n}</span>
              <p>{p.t}</p>
            </li>
          ))}
          {/* the same change, shipped two ways */}
          <li className="tm-cell tm-pt">
            <span className={LABEL}>A change is made</span>
            <span className="mt-auto flex flex-col gap-3 pt-8 text-b2">
              <span className="flex items-center gap-2 text-muted-foreground">
                <X size={16} strokeWidth={1.5} className="flex-none text-[var(--tm-fg-error)]" aria-hidden />
                <span>Without Kane CLI: a quick click-through, nothing to hand over</span>
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} strokeWidth={1.5} className="flex-none text-[var(--tm-fg-success)]" aria-hidden />
                <span>With Kane CLI: a verdict with evidence</span>
              </span>
            </span>
            <p>steps · screenshots · logs</p>
          </li>
        </ul>
      </div>
    </Section>
  );
}

/* ---------- how it works: the zig-zag rows, explore to report ---------- */

const stages = [
  { n: "01", tab: "Explore", icon: Compass, title: "Learn the whole app before you test it", body: "Give Kane CLI a URL. An exploration agent walks your web app in up to 20 cloud browsers, maps every screen, control and flow, and flags problems on the way.", screen: <ExploreScreen />, scene: "cli" },
  { n: "02", tab: "Plan", icon: ClipboardList, title: "Turn the spec into what must be true", body: "Kane CLI reads your spec or the Exploration map and lists the acceptance criteria. Nothing runs until you approve them.", screen: <PlanScreen />, scene: "author" },
  { n: "03", tab: "Design", icon: PenLine, title: "One test per criterion, linked back to it", body: "Kane CLI writes a plain-English test for every approved criterion, so each test has one clear reason to exist. You review them before anything runs.", screen: <DesignScreen />, scene: "kane" },
  { n: "04", tab: "Execute", icon: Play, title: "Run it where users are", body: "Every test runs in a real browser or on mobile, on your machine or the TestMu AI cloud. Each step keeps its screenshot, console and network log.", screen: <ExecuteScreen />, scene: "par" },
  { n: "05", tab: "Report", icon: FileCheck2, title: "What is proven, what failed, what is still open", body: "The report maps every result to its criterion and seals the evidence, so a reviewer can check it without rerunning anything.", screen: <ReportScreen />, scene: "rep" },
];

function HowItWorks() {
  return (
    <Section>
      <FoldHead
        lead="From a URL"
        title="to a verdict you can trust"
        body={
          <>
            Explore, plan, design, execute, report. You approve the plan and review the tests. Kane CLI does the walking, the writing and the proving.
            <span className="mt-3 block">Specs change. Kane CLI flags every test the change affects.</span>
          </>
        }
      >
        <Actions />
      </FoldHead>
      <div className="-mx-8">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const flip = i % 2 === 1;
          return (
            <div
              key={s.tab}
              className={`grid grid-cols-[minmax(0,1fr)] gap-10 px-8 py-12 last:pb-0 md:py-14 md:last:pb-0 lg:gap-14 ${
                flip ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
              }`}
            >
              <Reveal className={`flex flex-col justify-center ${flip ? "lg:order-2" : ""}`}>
                <p className="mono flex items-center gap-2.5 text-b4 uppercase tracking-[0.18em] text-muted-foreground">
                  <Icon size={16} strokeWidth={1.5} className="text-foreground" aria-hidden />
                  {s.n} {s.tab}
                </p>
                <h3 className="mt-5 [text-wrap:balance]">{s.title}</h3>
                <p className="mt-4 max-w-[480px] text-b1 text-muted-foreground">{s.body}</p>
              </Reveal>
              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                <Scene scene={`${ATP}/scene-${s.scene}.jpg`} w={600} h={380}>
                  {s.screen}
                </Scene>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- what you get: a list beside one panel ---------- */

const gets = [
  { title: "Drive web and mobile in one sentence", body: "Browser and mobile automation from a natural language prompt, with no selectors to write.", link: "See all five surfaces", screen: <SurfacesScreen />, scene: "mat" },
  { title: "Replay the crash, step by step", body: "Every step, screenshot and log is recorded, so you can walk back through any failure.", link: "Learn more about evidence", screen: <ReplayScreen />, scene: "rdc" },
  { title: "Track every requirement to a run", body: "Link tests to your requirements and see which ones a real run has proven.", link: "Learn more about coverage", screen: <CoverageScreen />, scene: "gov" },
];

function WhatYouGet() {
  const [at, setAt] = useState(0);
  const go = (d: number) => setAt((i) => (i + d + gets.length) % gets.length);
  const g = gets[at];
  return (
    <Section>
      <FoldHead
        lead="A testing agent for you"
        title="A co-agent for coding agents"
        body="KaneAI is the TestMu AI end-to-end testing agent. Kane CLI brings it to the terminal, so you and your coding agents can verify every change."
      />
      <div className="tm-reveal grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col justify-between gap-8">
          <ul className="flex flex-col" role="tablist" aria-label="What you get">
            {gets.map((x, i) => (
              <li key={x.title} className="border-t border-border last:border-b">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === at}
                  onClick={() => setAt(i)}
                  className={`flex w-full flex-col gap-2 py-6 text-left transition-colors ${i === at ? "text-foreground" : "text-[var(--tm-fg-subtle)] hover:text-foreground"}`}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-b4">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-medium ${H5.replaceAll("!", "")}`}>{x.title}</span>
                  </span>
                  {i === at && <span className="pl-10 text-b2 text-muted-foreground">{x.body}</span>}
                </button>
                {i === at && (
                  <span className="-mt-2 block pb-6 pl-10">
                    <KitLink href={SIGNUP}>{x.link}</KitLink>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Arrows onPrev={() => go(-1)} onNext={() => go(1)} label="feature" />
        </div>
        <Scene scene={`${ATP}/scene-${g.scene}.jpg`} w={680} h={420}>
          {g.screen}
        </Scene>
      </div>
    </Section>
  );
}

/* ---------- made for agents and pipelines: HyperExecute's bento ----------

   The big card on a painted scene for coding agents, two cards stacked
   beside it for CI and healing, each with its small picture. */

const modes = [
  {
    code: "--agent",
    k: "For coding agents",
    title: "Built for coding agents to call",
    body: (
      <>
        Add <code className="tag rounded-sm bg-[var(--tm-bg-fill)] px-1 font-mono text-b4">--agent</code> and every run streams structured NDJSON, so Claude Code, Cursor or Codex can parse results, read screenshots on failure and decide what to do next.
      </>
    ),
    link: ["Get the AGENTS.md for Kane CLI", `${SITE}/kane-cli-agent/AGENTS.md`],
    screen: <AgentScreen />,
  },
  {
    code: "exit 0",
    k: "For CI",
    title: "Gate every pull request",
    body: (
      <>
        The run you do locally works the same in CI with <code className="tag rounded-sm bg-[var(--tm-bg-fill)] px-1 font-mono text-b4">--headless</code> and{" "}
        <code className="tag rounded-sm bg-[var(--tm-bg-fill)] px-1 font-mono text-b4">--timeout</code>. Clear exit codes let your pipeline block the merge.
      </>
    ),
    link: ["See the GitHub Action", SIGNUP],
    screen: <GateScreen />,
  },
  {
    code: "heal",
    k: "Self-healing",
    title: "Heals the path, never the verdict",
    body: <>When the UI drifts, Kane CLI re-finds the element by what it is. Flow-heal re-reasons the path only when a step can't be healed. A wrong total is always a bug.</>,
    link: ["How healing works", SIGNUP],
    screen: <HealStepScreen />,
  },
];

/* one bento card: copy, link, and its picture in a framed window */
function ModeCopy({ m, big }: { m: (typeof modes)[number]; big?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-3">
        <code className="tag rounded-sm border border-border bg-surface px-2 font-mono text-b4">{m.code}</code>
        <span className={LABEL}>{m.k}</span>
      </span>
      <h3 className={`[text-wrap:balance] ${big ? H4 : H5}`}>{m.title}</h3>
      <p className="max-w-[520px] text-b2 text-muted-foreground">{m.body}</p>
      <span className="mt-1">
        <KitLink href={m.link[1]}>{m.link[0]}</KitLink>
      </span>
    </div>
  );
}

const Window = ({ children, w, h }: { children: ReactNode; w: number; h: number }) => (
  <div className="w-full overflow-hidden border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
    <Fit w={w} h={h}>{children}</Fit>
  </div>
);

function AgentsPipelines() {
  const [agent, ci, heal] = modes;
  return (
    <Section>
      <FoldHead lead="Made for agents" title="and pipelines" body="Structured output for coding agents, exit codes for CI, and healing that never touches the verdict." />
      <div className="tm-reveal -mx-8 border-y border-border bg-surface">
        <div className="grid lg:grid-cols-2">
          {/* the big card: the painting fills it, the copy sits on a white wash */}
          <div className="relative flex min-h-[560px] flex-col overflow-hidden border-border max-lg:border-b lg:border-r">
            <img src={`${ATP}/scene-pipe.jpg`} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" decoding="async" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_52%,color-mix(in_srgb,var(--tm-bg-surface)_92%,transparent)_70%,var(--tm-bg-surface)_100%)]"
            />
            <div className="relative flex flex-1 items-center justify-center px-8 pb-6 pt-12">
              <div className="w-full max-w-[480px]">
                <Window w={800} h={340}>{agent.screen}</Window>
              </div>
            </div>
            <div className="relative p-8">
              <ModeCopy m={agent} big />
            </div>
          </div>
          <div className="flex flex-col">
            {[ci, heal].map((m, i) => (
              <div key={m.code} className={`flex flex-1 flex-col gap-8 p-8 ${i === 0 ? "border-b border-border" : ""}`}>
                <div className="bg-[var(--tm-bg-fill)] p-6">
                  <Window w={560} h={220}>{m.screen}</Window>
                </div>
                <ModeCopy m={m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- PRISM benchmark: the Agent Assurance card ---------- */

const scores = [
  ["Reliability", "88.7%", 88.7, "Same right answer, run after run."],
  ["Perception", "86.7%", 86.7, "Reads the page like a person does."],
  ["Intent", "77.9%", 77.9, "Does only what the test asked."],
] as const;

function Prism() {
  return (
    <>
      <Section className="!pb-0">
        <FoldHead
          lead="PRISM benchmark"
          title="Ranked #1 for browser testing"
          body="50 real browser scenarios, scored on whether a pass means the flow worked. Our nightly Verification Bench compares Kane CLI with coding agents driving Playwright MCP."
        />
      </Section>
      {/* the BrowserStack alternative's Gartner banner: ink, warm glow, the
          big pixel figure left, the three scores on glass right */}
      <Section className="!py-0">
        <figure className="relative -mx-8 overflow-hidden bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
          <img src="/kit/cta/gartner-glow.svg" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[402px] w-full lg:bottom-auto lg:top-10" />
          <div className="relative flex flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col">
              <p className="font-mono text-b4 uppercase tracking-[2px] text-[var(--tm-fg-inverse-muted)]">Overall score · 2026-Q4</p>
              <p className="pixel mt-6 text-[length:calc(var(--tm-h1-size)*8/7)] leading-none lg:text-[length:calc(var(--tm-h1-size)*16/7)]">76.7%</p>
              <figcaption className="mt-4 text-[length:var(--tm-h4-size)] font-medium leading-[var(--tm-h4-line)] tracking-[var(--tm-h4-tracking)]">#1 of 7 tools on the PRISM benchmark</figcaption>
              <a className="tm-btn tm-btn--secondary mt-10 self-start" href={SIGNUP}>
                See the leaderboard
              </a>
            </div>
            <div className="flex w-full flex-col border border-[color-mix(in_srgb,var(--tm-fg-inverse)_40%,transparent)] bg-[color-mix(in_srgb,var(--tm-fg-inverse)_6%,transparent)] backdrop-blur-md lg:max-w-[480px]">
              {scores.map(([k, v, pct, t]) => (
                <div key={k} className="flex flex-col gap-3 border-b border-[color-mix(in_srgb,var(--tm-fg-inverse)_40%,transparent)] px-6 py-5 last:border-b-0">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-b2 font-medium">{k}</span>
                    <span className="pixel text-[24px] leading-none">{v}</span>
                  </span>
                  <span className="h-1.5 w-full bg-[color-mix(in_srgb,var(--tm-fg-inverse)_16%,transparent)]">
                    <span className="block h-full bg-[var(--tm-fg-inverse)]" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="text-b3 text-[var(--tm-fg-inverse-muted)]">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </figure>
      </Section>
    </>
  );
}

/* ---------- keep your stack: the delivery loop, Kane CLI in the middle ---------- */

const loop: [string, string, string][] = [
  ["explore run --url shop.example.com", "Explore", "38 screens"],
  ["plan specs/guest-checkout.md", "Plan", "3 criteria"],
  ["design --from AC-1..AC-3", "Design", "3 tests"],
  ["testrun run --browser chrome,android", "Execute", "Chrome · mobile"],
  ["report --seal", "Report", "Evidence sealed"],
  ["heal --selectors", "Heal", "Self-healing"],
  ["cloud --parallel 20", "Cloud", "TestMu AI"],
  ["trace --attach pr/482", "Trace", "1 recorded"],
];

const T_MUTED = "text-[var(--tm-fg-inverse-muted)]";
const T_OK = "text-[var(--tm-green-200)]";
const T_CMD = "text-[var(--tm-blue-200)]";

/* the three windows of one loop: the coding agent's prompt, the kane-cli
   commands it runs, the pull request they land on */
function StackScreen({ agent }: { agent: string }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6 p-6">
      <div className="overflow-hidden rounded-lg">
        <Term path={`~/shop · ${agent.toLowerCase()}`} tabs={[agent.toLowerCase()]} status={<>Ask your agent to do something</>}>
          <p className="leading-7">
            <span className="text-[var(--tm-orange-200)]">›</span> Fix guest checkout and prove it works before you open the PR.
          </p>
          <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />
          {loop.map(([c, k, r]) => (
            <p key={k} className="flex h-6 items-center gap-4 whitespace-nowrap text-b4 leading-6">
              <span className="min-w-0 truncate">
                <span className={T_MUTED}>kane-cli</span> <span className={T_CMD}>{c}</span>
              </span>
              <span className="ml-auto flex-none">
                <span className={T_MUTED}>{k}</span> <span className={T_OK}>{r}</span>
              </span>
            </p>
          ))}
          <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />
          <p className="leading-7">
            <span className={T_OK}>●</span> Done. 3 of 3 criteria proven. Verdict and evidence posted to PR #482.
          </p>
        </Term>
      </div>
      <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex flex-col gap-1 border-b border-border px-5 py-4">
          <span className="font-mono text-b5 text-[var(--tm-fg-subtle)]">GitHub · Pull request</span>
          <span className="text-b2 font-medium">Fix guest checkout email #482</span>
          <span className="text-b5 text-[var(--tm-fg-subtle)]">{agent.toLowerCase().replaceAll(" ", "-")} wants to merge 3 commits into main</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-5 py-4">
          <span className="text-b5 text-[var(--tm-fg-subtle)]">Waiting for checks…</span>
          <div className="flex flex-col rounded-lg border border-border">
            <span className="flex items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 py-2.5">
              <span className="flex flex-col">
                <span className="font-mono text-b4 font-medium">kane-cli / verify</span>
                <span className="text-b5 text-[var(--tm-fg-subtle)]">3 of 3 criteria proven · 41.6s</span>
              </span>
              <span className="ml-auto">
                <Pill tone="ok">Passed</Pill>
              </span>
            </span>
            {[
              ["AC-1", "Guest can check out"],
              ["AC-2", "Email is shown"],
              ["AC-3", "Total matches cart"],
            ].map(([k, v]) => (
              <span key={k} className="flex h-9 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0">
                <span className="w-10 font-mono text-b5 text-[var(--tm-fg-subtle)]">{k}</span>
                <span className="flex-1">{v}</span>
                <span className="text-b5 text-[var(--tm-fg-success)]">✓ proven</span>
              </span>
            ))}
          </div>
          <span className="font-mono text-b5 text-[var(--tm-fg-subtle)]">screenshots · console · network · steps · r/7c41e</span>
          <span className="mt-auto flex items-center gap-2 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-3 py-2 text-b4">
            <Check size={14} strokeWidth={1.5} className="text-[var(--tm-fg-success)]" aria-hidden />
            <span className="font-medium">Verdict posted</span>
            <span className="text-[var(--tm-fg-subtle)]">Evidence attached to PR #482</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* the agents on the tab row: the six the design names first */
const STACK_AGENTS = agents.slice(0, 6);

function KeepStack() {
  const [at, setAt] = useState(0);
  const a = STACK_AGENTS[at];
  return (
    <Section>
      <FoldHead
        lead="Keep your stack"
        title="Put proof at the center"
        body="The delivery loop your team already runs, with Kane CLI as the validation engine in the middle. Kane CLI adds proof. It doesn't replace a tool you run."
      />
      <div className="tm-reveal flex flex-col gap-6">
        {/* the coding agents as tabs, one card on the scene below follows the pick */}
        <div className="-mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="For every coding agent you build with">
          {STACK_AGENTS.map((x, i) => (
            <button
              key={x.name}
              type="button"
              role="tab"
              aria-selected={i === at}
              onClick={() => setAt(i)}
              className={`pill flex h-11 flex-none items-center gap-2 rounded-full px-4 text-b2 transition-colors ${
                i === at ? "bg-surface text-foreground [box-shadow:var(--tm-shadow-resting-xs)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg viewBox={x.viewBox} className="size-5 flex-none" fill="currentColor" fillRule="evenodd" aria-hidden dangerouslySetInnerHTML={{ __html: x.body }} />
              {x.name}
            </button>
          ))}
        </div>
        <div className="-mx-8 relative overflow-hidden border-y border-border px-6 py-10 md:px-12 md:py-16" role="tabpanel">
          <img src={`${ATP}/scene-he.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative mx-auto w-full max-w-[1040px] bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
            <Fit w={1120} h={500}>
              <StackScreen agent={a.name} />
            </Fit>
          </div>
          {/* what stays as it is */}
          <div className="relative mt-4 flex flex-wrap justify-center gap-2">
            {[
              ["Deploy", "your pipeline"],
              ["Operate", "your infrastructure"],
            ].map(([k, v]) => (
              <span key={k} className="pill inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-b4 [box-shadow:var(--tm-shadow-resting-xs)]">
                <span className="font-medium">{k}</span>
                <span className="text-muted-foreground">{v}</span>
                <span className="font-mono text-b5 uppercase tracking-[1px] text-[var(--tm-fg-subtle)]">Unchanged</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- what teams can assure: the kit's tour, one tab per flow ---------- */

const TAB_BAR = "tm-tour__tabs [&>button]:!py-3 [&>button]:!text-b2 [&>button]:whitespace-nowrap";

const cases: (UseCase & { name: string; why: string })[] = [
  { name: "3DS challenge", why: "The 3D Secure step breaks naive automation.", prompt: "Pay with a 3DS test card and approve the challenge iframe", must: "challenge completes and payment succeeds", url: "pay.example.com/checkout", file: "3ds-challenge.test.md", steps: ["Add the 3DS test card", "Approve the challenge iframe", "Payment receipt shown"] },
  { name: "One-click checkout", why: "Most revenue goes through this path.", prompt: "Buy an item with saved address and payment, reach order confirmation", must: "order number shown, and the total matches the product page", url: "shop.example.com/iphone", file: "one-click-checkout.test.md", bug: true, steps: ["Open the product page", "Buy with saved address and card", "Compare order total with product page"] },
  { name: "Login with 2FA", why: "Every account sits behind this step.", prompt: "Log in with the OTP challenge in the test environment", must: "dashboard loads with masked accounts", url: "bank.example.com/login", file: "login-2fa.test.md", steps: ["Sign in with test credentials", "Enter the OTP code", "Check account numbers are masked"] },
  { name: "Promo application", why: "A wrong discount costs money on every order.", prompt: "Apply a promo and verify the discount math", must: "total drops by the promo value", url: "eats.example.com/basket", file: "promo-application.test.md", steps: ["Add two items to the basket", "Apply code SAVE20", "Recalculate the total"] },
  { name: "Instant book checkout", why: "One failed step loses the booking.", prompt: "Complete an instant book with a test payment", must: "trip confirmed in the trips tab", url: "stays.example.com/book", file: "instant-book.test.md", steps: ["Pick dates and a listing", "Pay with a test card", "Open the trips tab"] },
  { name: "Record edit through overlays", why: "Loading overlays break automation.", prompt: "Edit an account field and save through loading overlays", must: "saved value persists after reload", url: "crm.example.com/accounts/42", file: "record-edit.test.md", steps: ["Open the account record", "Edit the field and save", "Reload and read the value"] },
];
const CASE_SCENES = ["cbt", "at", "gov", "vt", "cloud", "hx"];

function UseCases() {
  return (
    <Section>
      <FoldHead
        lead="What teams can assure"
        title="with Kane CLI"
        body="Real flows in payments, e-commerce, banking and CRM. Each one is a natural language prompt and the result Kane CLI has to return."
      >
        <div className="mt-8">
          <KitLink href={SIGNUP}>See the use case library</KitLink>
        </div>
      </FoldHead>
      <div className="tm-reveal -mx-8" data-tm-step-root data-autoplay>
        <div className={`${TAB_BAR} lg:[grid-auto-columns:auto] lg:[&>button]:!px-3`} role="tablist">
          {cases.map((c) => (
            <button key={c.name} role="tab" data-step>
              {c.name}
              <span className="tm-progress" aria-hidden="true" />
            </button>
          ))}
        </div>
        {cases.map((c, i) => (
          <div key={c.name} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy">
                <span className="tag self-start rounded-sm border border-border bg-surface px-2 font-mono text-b5 uppercase tracking-[1px]">Real browser</span>
                <h3>{c.name}</h3>
                <p>{c.why}</p>
                <dl className="flex flex-col gap-3 text-b3">
                  <div className="flex flex-col gap-1">
                    <dt className={LABEL}>Prompt</dt>
                    <dd>“{c.prompt}”</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className={LABEL}>Must return</dt>
                    <dd>{c.must}</dd>
                  </div>
                </dl>
              </div>
              <div className="tm-tour__media">
                <img className="tm-fit" src={`${ATP}/scene-${CASE_SCENES[i]}.jpg`} alt="" decoding="async" />
                <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-10">
                  <div className="w-full border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
                    <Fit {...TAB}>
                      <UseCaseScreen c={c} />
                    </Fit>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- builders: the Agent Assurance quote card, as a carousel ---------- */

const builders = [
  { name: "Zephyr", handle: "@Zephyr_cryt", where: "on X", quote: "For the recorded run, Kane caught a real broken task flow. Elenchos sent that evidence back to Gemini, the agent fixed the implementation, and Kane passed every acceptance criterion on the second attempt." },
  { name: "Lammy.Sol", handle: "@lammy_sol", where: "on X", quote: "I wasn't just asking an AI agent to build an e-commerce application and assuming everything worked. I used Kane as part of the process of checking real user flows in the browser." },
  { name: "Abhinav Pangaria", handle: "@abhinavpangaria", where: "2nd place, Kane CLI Online Hackathon", quote: "My coding agent marked a task done. The chart it built drew the same data twice. So for the @testmuai Kane CLI hackathon I built a gate: Claude Code cannot stop until a real browser agrees. It placed 2nd." },
  { name: "Hareesh Vemasani", handle: "on Product Hunt", where: "", quote: "The build-fast, trust-slow gap is very real. I like how Kane CLI focuses not just on running tests, but on producing evidence teams can actually trust and share." },
];

const initials = (n: string) =>
  n
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function Builders() {
  const [at, setAt] = useState(0);
  const go = (d: number) => setAt((i) => (i + d + builders.length) % builders.length);
  return (
    <Section>
      <FoldHead lead="From builders," title="in their own words" body="Built something with Kane CLI? Post the run and tag @testmuai.">
        <div className="mt-8 flex flex-wrap gap-6">
          <KitLink href="https://x.com/testmuai">Share on X</KitLink>
          <KitLink href={SIGNUP}>Join the next hackathon</KitLink>
        </div>
      </FoldHead>
      <div className="tm-reveal flex flex-col gap-6" aria-roledescription="carousel" aria-label="Builders' quotes">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${at * 100}%)` }}>
            {builders.map((b, i) => (
              <div key={b.name} className="w-full flex-none" aria-hidden={i !== at} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${builders.length}`}>
                <figure className="grid h-full gap-10 border border-border bg-[var(--tm-bg-fill)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:p-12">
                  <div className="flex flex-col gap-10 lg:gap-16">
                    <p className={LABEL}>{b.where || b.handle}</p>
                    <div className="flex flex-1 flex-col justify-between gap-10 lg:pl-[16%]">
                      <blockquote className="relative text-[24px] leading-[32px] tracking-[-1px] md:text-[32px] md:leading-[40px]">
                        <span className="absolute right-full pr-1.5" aria-hidden>
                          “
                        </span>
                        {b.quote}”
                      </blockquote>
                      <figcaption className="flex flex-col">
                        <span className="text-b2 font-medium">{b.name}</span>
                        <span className="text-b3 text-muted-foreground">{b.where ? b.handle : "on Product Hunt"}</span>
                      </figcaption>
                    </div>
                  </div>
                  <span className="flex size-40 items-center justify-center self-start border border-border bg-surface md:size-48 lg:self-center" aria-hidden>
                    <span className="pixel text-[length:var(--tm-h2-size)] leading-none">{initials(b.name)}</span>
                  </span>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            {builders.map((b, i) => (
              <button
                key={b.name}
                type="button"
                onClick={() => setAt(i)}
                aria-label={`Show ${b.name}`}
                className={`pill h-1.5 rounded-full transition-all duration-300 ${i === at ? "w-6 bg-[var(--tm-fg-default)]" : "w-1.5 bg-[var(--tm-border-default)]"}`}
              />
            ))}
            <span className="ml-3 font-mono text-b4 text-muted-foreground">
              {String(at + 1).padStart(2, "0")} / {String(builders.length).padStart(2, "0")}
            </span>
          </span>
          <Arrows onPrev={() => go(-1)} onNext={() => go(1)} label="quote" />
        </div>
      </div>
    </Section>
  );
}

/* ---------- hackathon projects: joined cells, 4 x 2 ---------- */

const projects = [
  { name: "demo.studio", place: "1st place", body: "Give a URL and a goal; get a narrated demo video of the live product. Kane CLI is the hands on the page.", by: "Sam Felix" },
  { name: "GuardianKane", place: "2nd place", body: "A verification loop around Claude Code that won't let 'done' mean 'I say it's done.'", by: "Abhinav", repo: "18Abhinav07/adventures-with-kane" },
  { name: "KANE vs. ABLE", place: "3rd place", body: "One AI builds an escape room. Kane must prove it's solvable in a real browser.", by: "Christine Lall" },
  { name: "Signed Off", body: "Turns a signed freelance scope into a page showing each promise verified in a real browser.", by: "@PhiBao", repo: "PhiBao/signed-off" },
  { name: "LENS", body: "AI changes one thing. LENS replays business flows in real Chrome and blocks the agent until they hold.", by: "@Enoch208", repo: "Enoch208/lens" },
  { name: "mutiny", body: "A falsification gate: break one promised behavior and flag any Kane test that stays green.", by: "@sneg55", repo: "sneg55/mutiny" },
  { name: "Pactora", body: "An escrow marketplace. Kane CLI catches the bug the type checker can't; Claude Code patches it.", by: "@mrnetwork0001", repo: "mrnetwork0001/Pactora" },
  { name: "Playtest Studio", place: "Kane CLI Hack Day, SF", body: "Declare a browser game's rules in plain English, and Kane plays it to prove they hold.", by: "@Jiyungi", repo: "Jiyungi/playtest-studio" },
];

function Hackathon() {
  return (
    <Section>
      <FoldHead
        lead="Hackathon projects"
        title="that run on Kane CLI"
        body="Real projects from the Kane CLI Online Hackathon (69 teams, August 2026) and the Kane CLI Hack Day in San Francisco."
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-join tm-join--square !mx-0">
          {projects.map((p) => {
            const inner = (
              <>
                <span className="flex min-h-6 items-center justify-between gap-3">
                  {p.place ? (
                    <span className={`tag rounded-sm px-2 font-mono text-b5 uppercase tracking-[1px] ${p.place.includes("place") ? "bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]" : "border border-border"}`}>{p.place}</span>
                  ) : (
                    <span />
                  )}
                  {p.repo && <ArrowRight size={16} strokeWidth={1.5} className="-rotate-45 text-[var(--tm-fg-subtle)] transition-colors group-hover:text-foreground" aria-hidden />}
                </span>
                <h3 className={`mt-8 ${H5}`}>{p.name}</h3>
                <p className="mt-2 text-b3 text-muted-foreground">{p.body}</p>
                <span className="mt-auto pt-6 font-mono text-b4 text-muted-foreground">{p.repo ?? p.by}</span>
              </>
            );
            return p.repo ? (
              <a key={p.name} href={`https://github.com/${p.repo}`} className="group flex flex-col">
                {inner}
              </a>
            ) : (
              <div key={p.name} className="flex flex-col">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- resources: the kit's image cards ---------- */

const resources = [
  { title: "Blog", body: "The post that introduced Kane CLI.", cta: "Read the blog", href: `${SITE}/blog/introducing-kane-cli/`, screen: <BlogCard />, scene: "author" },
  { title: "Documentation", body: "Install, configure and run Kane CLI in about 2 minutes.", cta: "View documentation", href: `${SITE}/docs/kane-cli-introduction`, screen: <DocsCard />, scene: "cli" },
  { title: "GitHub", body: "Browse the source, file issues and follow the roadmap.", cta: "Open GitHub", href: "https://github.com/LambdaTest/kane-cli/", screen: <GitHubCard />, scene: "pw" },
];

function Resources() {
  return (
    <Section>
      <FoldHead lead="Resources and links" title="Start with Kane CLI" body="Read the launch post, install from the docs and follow the work on GitHub." />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {resources.map((r) => (
            <a key={r.title} href={r.href} className="tm-cell tm-fcard2">
              <div className="tm-well">
                <Scene scene={`${ATP}/scene-${r.scene}.jpg`} card {...CARD}>
                  {r.screen}
                </Scene>
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <span className="tm-link mt-2 self-start">
                {r.cta}
                <span className="tm-arw" aria-hidden="true">
                  <Arrow />
                  <Arrow />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ: the design file's questions, links as plain text ---------- */

const Code = ({ children }: { children: ReactNode }) => <code className="tag rounded-sm bg-[var(--tm-bg-fill)] px-1 font-mono text-b4">{children}</code>;

const faq = [
  {
    q: "What is Kane CLI?",
    a: 'Kane CLI is an AI CLI testing tool for you and your coding agents: a Web CLI for browser automation and a Mobile CLI for mobile automation. You describe what should happen in plain English, for example "log in as an admin, open the billing page, and verify the plan shows Enterprise", and Kane CLI checks it in a real Chrome browser or your mobile app. You do not write selectors or scripts, and there is no framework to learn.',
  },
  {
    q: "How do you verify code written by a coding agent?",
    a: "Run the user journeys the change touches, end to end, before you merge it. Kane CLI is the testing agent a coding agent such as Claude Code, Cursor or Codex calls for this: it runs the flow in a real browser or on mobile and returns an evidence-backed pass or fail. Every run saves the steps with their screenshots, the console and network logs and the verdict, so a reviewer can check what the coding agent's change actually did.",
  },
  {
    q: "What evidence does Kane CLI keep, and who can open it?",
    a: "Every run saves the steps with their screenshots, the console and network logs, and the verdict in a .evidence file. Open it at evidence.lambdatest.com (opening it there uploads nothing), in TestMu AI Test Manager, where runs upload by default, or from the pull request comment the GitHub Action posts.",
  },
  {
    q: "What exactly counts as a pass?",
    a: (
      <>
        A pass means every acceptance criterion for that scenario is satisfied. One passing assertion is not enough, and neither is the model's own account of what happened. You write the criteria, and Kane CLI checks whether they hold.
        <span className="mt-3 block">Kane CLI's reasoning decides how to get through the flow. A separate verification step decides the verdict.</span>
      </>
    ),
  },
  {
    q: "When does auto-healing become dangerous?",
    a: (
      <>
        Healing has two tiers. Step-heal is the common case: one step's target moved or its markup changed, so Kane CLI re-finds that element by what it is, wherever it now sits. Every other step is untouched. Flow-heal runs only when a step can't be healed at all, and it re-reasons the path, never the acceptance criteria. A wrong total is reported as a bug and is never healed into a pass.
        <span className="mt-3 block">Healing works best when an element's address changes and its meaning stays the same. When a button keeps its label but now does something else, Kane CLI is built to fail the step.</span>
      </>
    ),
  },
  {
    q: "How is this different from Playwright, Cypress or Selenium?",
    a: "Those are browser automation frameworks you write and maintain by hand, and the maintenance grows with the app. With Kane CLI you describe the flow, it checks it against your live app, keeps passing tests, and repairs them when the UI drifts. When you want code, export any flow to Playwright. To compare it with plain-English and codeless test tools instead, see the testRigor alternative, Virtuoso alternative, ACCELQ alternative and Testim alternative pages.",
  },
  {
    q: "Does it work with Claude Code, Cursor and Codex?",
    a: (
      <>
        Yes, that's one of the main reasons it exists. Every run supports an <Code>--agent</Code> flag that switches output to structured NDJSON, so an agent can parse results, read screenshots on failure, and decide what to do next. Point your agent to testmuai.com/kane-cli-agent/AGENTS.md and it learns when and how to call Kane CLI, or save it in your repo as AGENTS.md or CLAUDE.md. See the Agent MD file for Kane CLI. The how-to guides for coding agents cover verifying a change, reproducing a bug, saving a test and gating a pull request. If you are weighing it against Momentic's MCP server or mabl's agentic testing harness, the Momentic alternative and mabl alternative pages compare them.
      </>
    ),
  },
  {
    q: "Can I use it in CI?",
    a: (
      <>
        Yes. The terminal testing you do locally runs the same way in CI: use <Code>--headless</Code> and <Code>--timeout</Code>, and add <Code>--agent</Code> for structured NDJSON you can parse in a post-step. Kane CLI exits with 0 on pass, 1 on fail, 2 on setup or auth errors, and 3 on timeout, so your pipeline can gate on it.
      </>
    ),
  },
  {
    q: "Is Kane CLI free?",
    a: "The CLI is free to install. Runs use KaneAI credits from your TestMu AI account, on your own machine or on the TestMu AI cloud grid. You can start free with 10,000 credits, valid for 30 days: claim them on this page.",
  },
];

/* ---------- page ---------- */

declare global {
  interface Window {
    TestMu?: { init: (root?: Element) => void };
  }
}

function Page() {
  const kit = useRef<HTMLDivElement>(null);
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
        <Problem />
        <HowItWorks />
        <WhatYouGet />
        <AgentsPipelines />
        <Prism />
        <KeepStack />
        <UseCases />
        <Builders />
        <Hackathon />
        <Stories />
        <Resources />
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
