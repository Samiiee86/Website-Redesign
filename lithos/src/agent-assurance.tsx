import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Quote,
  Bot,
  Blocks,
  BookOpen,
  Check,
  CircleHelp,
  ClipboardList,
  Copy,
  FileChartColumn,
  FileText,
  FolderCode,
  MousePointerClick,
  RotateCw,
  ShieldCheck,
  Code,
  Play,
  Search,
  Sparkle,
  Sparkles,
  SquareTerminal,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";
import "./index.css";
import { ArrowChip, Reveal, Section, SlideArrow } from "./lib/ui";
import { scenery } from "./lib/scenery";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Stories from "./sections/Stories";
import Reasons from "./sections/Reasons";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import { FoldHead } from "./pieces/compare/parts";
import MatrixTable, { type MatrixGroup } from "./pieces/compare/MatrixTable";
import { SpecSheet, type SpecRow } from "./pieces/SpecTable";

/* Agent Assurance page (agent-assurance.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, more reasons, FAQ with this page's questions, the
     closing enterprise call and the footer.
   - The hero is the page's own hero fold (Web redesign/hero-folds/
     agent-assurance): its copy, video, scene and copyable install line.
   - Every other section starts from a kit fold, with no eyebrow labels
     over the headings: statement (what agent verification is),
     the home page's Pioneer layout (graded on evidence), the pieces library's
     comparison table (evals against assurance), the home page's product
     rows (the four phases and the IDE), two joined scene cards (run Rook
     CLI), feature-pointers (the six test types, the one pointer design on
     the page), the spec sheet (teams), feature-cards-image (one verdict in
     three places).

   Copy is the live page's (testmuai.com/agent-assurance), in sentence
   case, with links in running text turned into plain words. */

const SITE = "https://www.testmuai.com";
const TRIAL = `${SITE}/register/?redirectTo=https://rook.lambdatest.com/projects`;
const DEMO = `${SITE}/request-demo/`;
const AA = "/kit/aa";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function PrimaryBtn({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8">
      {children}
      <ArrowChip />
    </a>
  );
}

/* ---------- hero: the page's hero fold, in the kit's hero-media ---------- */

const HERO = "/kit/hero/agent-assurance";
const INSTALL = "npm install -g @testmuai/rook";

function CopyInstall() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="tm-btn tm-btn--secondary"
      aria-label={`Copy install command: ${INSTALL}`}
      onClick={() => {
        navigator.clipboard?.writeText(INSTALL).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        });
      }}
    >
      <code className="font-mono text-b3">{INSTALL}</code>
      {done ? <Check size={16} strokeWidth={1.5} aria-hidden /> : <Copy size={16} strokeWidth={1.5} aria-hidden />}
      <span className="sr-only" aria-live="polite">{done ? "Copied" : ""}</span>
    </button>
  );
}

function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">AI agent assurance for</span>
            <span className="tm-nowrap">your agent deployments</span>
          </h1>
          <p className="tm-hero__promise">
            Test how your agents actually behave across workflows, tools, and
            actions. Catch failures and vulnerabilities before they ship. Build
            better agents with complete assurance.
          </p>
        </div>
        <div className="tm-actions tm-hero__actions">
          <a className="tm-btn tm-btn--primary tm-btn--arrow" href={DEMO}>
            Book a demo
            <span className="tm-chip" aria-hidden="true">
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          </a>
          <CopyInstall />
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
              poster={`${HERO}/aa-demo-poster.jpg`}
              aria-label="Product demo: the Rook CLI generates and runs assurance scenarios against an agent, then reports results"
            >
              <source src={`${HERO}/aa-demo.webm`} type="video/webm" />
              <source src={`${HERO}/aa-demo.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- what it is: the kit's statement ---------- */

function Statement() {
  return (
    <Section>
      <div className="tm-statement tm-reveal">
        {/* the kit's 22px paragraph and 55px heading line are off the
            type scale: H2 line, and the paragraph at B1 */}
        <h2 className="!leading-[var(--tm-h2-line)]">What is AI agent verification?</h2>
        <p className="!text-[length:var(--tm-b1-size)] !leading-[var(--tm-b1-line)]">
          AI agent verification is checking that an AI agent did what its task
          required, by running it for real and grading each criterion against
          the evidence the run recorded: tool calls, changed files and
          artifacts. It is one part of Agent Assurance. TestMu AI verifies
          agents with Rook CLI, which derives the suite from your code or spec
          and keeps any criterion it could not verify out of the pass rate.
        </p>
      </div>
    </Section>
  );
}

/* ---------- graded on evidence: the home page's Pioneer layout ----------

   Same build as the home page's "Pioneer of AI Agentic Testing Cloud"
   fold (sections/Bento.tsx, the gumloop row): one tall card on a painted
   scene with a product window, and four quiet cards, each with a small
   live detail beside its copy. Every detail plays once as it scrolls in. */

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = (play: boolean, at: number) =>
  play
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: at, duration: 0.4, ease: EASE },
      }
    : { initial: false as const, animate: { opacity: 1, y: 0 } };

function usePlay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (inView && !reduce) setRun((r) => r + 1);
  }, [inView, reduce]);
  return { ref, run, play: run > 0 && inView && !reduce };
}

const PILL = "pill flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-b3 text-foreground [box-shadow:var(--tm-shadow-floating-sm)]";
const OK_TAG = "tag flex w-fit items-center gap-1.5 rounded-sm bg-[var(--tm-green-000)] px-2.5 py-1 text-b4 text-[var(--tm-green-500)]";
const BAD_TAG = "tag flex w-fit items-center gap-1.5 rounded-sm bg-[var(--tm-red-000)] px-2.5 py-1 text-b4 text-[var(--tm-red-500)]";

/* the tall card: a Rook terminal, the agent's word against what the run
   recorded, typed out line by line */
function ClaimTerminal({ play }: { play: boolean }) {
  const lines = [
    { k: "goal", v: "Tell @alex on Discord the deploy finished" },
    { k: "agent", v: "\u201cMessage sent to @alex.\u201d", quiet: true },
    { k: "tool", v: "message \u00b7 discord \u00b7 no bot token" },
  ];
  return (
    <div className="w-full overflow-hidden border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-[var(--tm-border-default)]" />
          ))}
        </span>
        <span className="mx-auto flex items-center gap-1.5 font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">
          <SquareTerminal size={12} strokeWidth={1.5} aria-hidden />
          rook \u2014 terminal
        </span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4 font-mono text-b4 text-foreground">
        <motion.p {...rise(play, 0.1)}>
          <span className="text-muted-foreground">$</span> rook run SC-018
        </motion.p>
        {lines.map((l, i) => (
          <motion.p key={l.k} {...rise(play, 0.45 + i * 0.35)} className="grid grid-cols-[56px_1fr] gap-2">
            <span className="text-muted-foreground">{l.k}</span>
            <span className={l.quiet ? "text-muted-foreground" : ""}>{l.v}</span>
          </motion.p>
        ))}
        <motion.p {...rise(play, 1.6)} className="flex items-center justify-between gap-3 pt-1">
          <span className="flex items-center gap-2 text-[var(--tm-fg-error)]">
            <X size={12} strokeWidth={2} aria-hidden />
            FAIL the message never left
          </span>
          <span className="text-muted-foreground">1m 07s</span>
        </motion.p>
      </div>
    </div>
  );
}

/* the blind spot: three verdicts, and the gap said out loud */
function BlindSpot({ play }: { play: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        <motion.span {...rise(play, 0.1)} className={OK_TAG}>
          <Check size={12} strokeWidth={2} aria-hidden />2 passed
        </motion.span>
        <motion.span {...rise(play, 0.25)} className={BAD_TAG}>
          <X size={12} strokeWidth={2} aria-hidden />5 failed
        </motion.span>
        <motion.span
          {...rise(play, 0.4)}
          className="tag flex w-fit items-center gap-1.5 rounded-sm border border-border bg-[var(--tm-bg-fill)] px-2.5 py-1 text-b4 text-foreground"
        >
          <CircleHelp size={12} strokeWidth={2} aria-hidden />1 unverified
        </motion.span>
      </div>
      <motion.span {...rise(play, 0.8)} className={PILL}>
        Verified pass 29%
      </motion.span>
    </div>
  );
}

/* no tests to write: what you hand it, and what comes back */
function Sources({ play }: { play: boolean }) {
  const src = [
    { icon: FolderCode, label: "Repo" },
    { icon: FileText, label: "PRD" },
    { icon: BookOpen, label: "Policy docs" },
  ];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {src.map(({ icon: Icon, label }, i) => (
          <motion.span
            key={label}
            {...rise(play, 0.1 + i * 0.12)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-b4 text-muted-foreground"
          >
            <Icon size={14} strokeWidth={1.5} aria-hidden />
            {label}
          </motion.span>
        ))}
      </div>
      <motion.span {...rise(play, 0.7)} className={PILL}>
        <span className="grid size-4 place-items-center rounded-full bg-[var(--tm-fg-success)] text-[var(--tm-fg-inverse)]">
          <Check size={10} strokeWidth={2.5} aria-hidden />
        </span>
        38 scenarios generated
      </motion.span>
    </div>
  );
}

/* adversarial by default: the attack family, as a live trace */
const ATTACKS = [
  { t: "Prompt injection in a ticket", at: "0:04" },
  { t: "Instruction override", at: "0:09" },
  { t: "Tool misuse: refunds.delete", at: "0:12", hit: true },
  { t: "Data exfiltration request", at: "0:15" },
];

function AttackTrace({ play }: { play: boolean }) {
  return (
    <div className="w-full max-w-[320px]">
      <p className="flex items-center gap-2 text-b3 text-muted-foreground">
        <span className="grid size-5 place-items-center rounded-full border border-border bg-surface">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="size-2 rounded-full bg-[var(--tm-red-400)]"
          />
        </span>
        Running adversarial scenarios…
      </p>
      <div className="ml-2.5 mt-2 border-l border-border pl-4 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        {ATTACKS.map((row, i) => (
          <motion.div
            key={row.t}
            {...rise(play, 0.2 + i * 0.3)}
            className="flex items-center justify-between gap-3 py-1.5 text-b3"
          >
            <span className={row.hit ? "text-foreground" : "text-muted-foreground"}>{row.t}</span>
            <span className="font-mono text-b4 text-muted-foreground">{row.at}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* runs in your CI: the headless command and the gate's answer */
function CiGate({ play }: { play: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.span {...rise(play, 0.1)} className={`${PILL} whitespace-nowrap font-mono !text-b4`}>
        rook run --headless --json
      </motion.span>
      <motion.span {...rise(play, 0.9)} className={OK_TAG}>
        <Check size={12} strokeWidth={2} aria-hidden />
        Run finished · gate read 38 verdicts
      </motion.span>
    </div>
  );
}

function CardText({ title, body, big = false }: { title: string; body: string; big?: boolean }) {
  return (
    <div>
      <h4 className="text-foreground [text-wrap:balance]">{title}</h4>
      <p className={`mt-2 text-b2 leading-relaxed text-muted-foreground ${big ? "max-w-[520px]" : "max-w-[300px]"}`}>
        {body}
      </p>
      <a
        href={`${SITE}/support/docs/agent-assurance-quickstart/`}
        className="group/btn mt-4 inline-flex items-center gap-2 border-b border-foreground pb-1 text-b3 font-medium text-foreground"
      >
        Learn more
        <SlideArrow />
      </a>
    </div>
  );
}

function EvCard({
  title,
  body,
  Visual,
  className = "",
}: {
  title: string;
  body: string;
  Visual: (p: { play: boolean }) => ReactNode;
  className?: string;
}) {
  const { ref, run, play } = usePlay();
  return (
    <div
      ref={ref}
      className={`grid min-h-[300px] gap-8 p-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:items-center ${className}`}
    >
      <CardText title={title} body={body} />
      <div className="flex items-center justify-center">
        <Visual key={run} play={play} />
      </div>
    </div>
  );
}

function Evidence() {
  const big = usePlay();
  return (
    <Section>
      <FoldHead
        lead="Agent regression testing,"
        title="graded on evidence"
        body="Agent assurance is testing that grades what an AI agent actually changed, not what it says it did. Rook CLI runs your agent against a suite built from your code or docs, checks the effects on tools, files and APIs, and reports what it could not verify."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      <Reveal delay={0.08}>
        <div className="-mx-8 border-y border-border bg-surface">
          <div className="grid lg:grid-cols-2">
            <div
              ref={big.ref}
              className="relative flex min-h-[600px] flex-col overflow-hidden border-border max-lg:border-b lg:border-r"
            >
              {/* the painting fills the card; the copy sits on a white wash
                  that rises from the foot */}
              <img src={scenery.mountainLake} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_52%,color-mix(in_srgb,var(--tm-bg-surface)_92%,transparent)_70%,var(--tm-bg-surface)_100%)]"
              />
              <div className="relative flex flex-1 items-center justify-center px-8 pb-6 pt-12">
                <div className="w-full max-w-[460px]">
                  <ClaimTerminal key={big.run} play={big.play} />
                </div>
              </div>
              <div className="relative p-8">
                <CardText
                  big
                  title="Grade the effect, not the account"
                  body="An agent's own account is the weakest evidence. We grade what the run actually changed."
                />
              </div>
            </div>
            <div className="flex flex-col">
              <EvCard
                className="border-b border-border"
                title="Publish the blind spot"
                body="What it can't verify is reported as such, never folded into the pass rate."
                Visual={BlindSpot}
              />
              <EvCard
                className="flex-1"
                title="No tests to write"
                body="Point it at a repo, a PRD or policy docs, and it writes the scenarios."
                Visual={Sources}
              />
            </div>
          </div>
          <div className="grid border-t border-border lg:grid-cols-2">
            <EvCard
              className="border-border max-lg:border-b lg:border-r"
              title="Adversarial by default"
              body="Prompt injection and tool misuse are tested on every run, not added on."
              Visual={AttackTrace}
            />
            <EvCard
              title="Runs in your CI"
              body="Headless runs and a JSON report, with gate recipes for GitHub Actions, Jenkins and Argo CD."
              Visual={CiGate}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- evals against assurance: the pieces library's matrix ---------- */

const evals: MatrixGroup[] = [
  {
    label: "",
    rows: [
      { name: "Test cases", values: ["From your code or spec", "Written or synthesized", "From production traces"] },
      { name: "Tool calls", values: ["Against declared tools", "Against your lists", "Logged, optionally scored"] },
      { name: "Side effects", values: ["Files, artifacts, probes", "Scripted per task", "Trace data only"] },
      { name: "Grading", values: ["Claimed actions aren't proof", "LLM judge or code checks", "LLM judge or human review"] },
      { name: "Adversarial tests", values: ["Generated by default", "Add-on in some tools", "Not generated"] },
      { name: "When it runs", values: ["Before release, in CI", "CI and live traffic", "Production, plus CI"] },
      { name: "Unverifiable results", values: ["Reported separately", "Errors or opt-in skips", "Left unscored"] },
    ],
  },
];

/* ---------- a published test: the quote beside its evidence ----------

   The live page's quote (testmuai.com/agent-assurance), in the kit's
   joined cells: the quote and its byline on the left (second half
   in grey, as live), and on a painted scene the published test behind it:
   its two counts in the pixel face, then what changed between the two
   judge builds, in the quote's own words. */

const QUOTE = {
  lead: "The newer judge stopped treating an unsupported claim as a breach",
  rest: "and moved toward trace-backed confirmation.",
  name: "Victor Ematin",
  role: "AI Quality Engineering Lead, Independent practice",
  photo: "https://assets.testmuai.com/resources/images/victor-ematin-headshot.webp",
  link: "https://www.linkedin.com/posts/victor-ematin_aiquality-agentassurance-aisecurity-ugcPost-7521078454981906432-xV-l/",
};

function PublishedTest() {
  return (
    <Section>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--2 lg:!grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* the quote and who said it */}
          <figure className="tm-cell flex flex-col justify-between gap-12 !p-8 lg:!p-12">
            <div className="flex flex-col gap-8">
              <span className="flex size-10 items-center justify-center rounded-full border border-border">
                <Quote size={16} strokeWidth={1.5} aria-hidden />
              </span>
              <blockquote className="text-[24px] font-medium leading-[32px] tracking-[-1px] [text-wrap:balance] md:text-[32px] md:leading-[40px]">
                {QUOTE.lead} <span className="text-muted-foreground">{QUOTE.rest}</span>
              </blockquote>
            </div>
            <figcaption className="flex flex-col items-start gap-4 border-t border-border pt-6 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
              <span className="flex min-w-0 items-center gap-4">
                <img className="avatar size-12 max-w-none flex-none rounded-full object-cover" src={QUOTE.photo} alt="" loading="lazy" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-b2 font-medium">{QUOTE.name}</span>
                  <span className="text-b3 text-muted-foreground">{QUOTE.role}</span>
                </span>
              </span>
              <a className="tm-link inline-flex flex-none items-center gap-1.5" href={QUOTE.link} target="_blank" rel="noreferrer">
                Read the thread on LinkedIn
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
              </a>
            </figcaption>
          </figure>

          {/* the published test behind it, as white cards on a painted scene
              (the hero folds' misty valley), joined by the retro dotted line:
              its two counts, then what changed between the two judge builds,
              in the quote's own words */}
          <div className="tm-cell relative flex flex-col justify-center overflow-hidden !p-6 md:!p-10">
            <img src={`${AA}/scene-valley.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative flex flex-col">
              <span className="tag mx-auto flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[var(--tm-orange-400)]" />
                Published test
              </span>
              <VLink />
              <div className="grid grid-cols-2 gap-px border border-border bg-border [box-shadow:var(--tm-shadow-floating-md)]">
                {[
                  ["10", "Attacks"],
                  ["2", "Judge builds"],
                ].map(([n, k]) => (
                  <span key={k} className="flex flex-col gap-2 bg-surface px-5 py-4">
                    <span className="pixel text-[48px] leading-none">{n}</span>
                    <span className="text-b3 text-muted-foreground">{k}</span>
                  </span>
                ))}
              </div>
              <VLink />
              <div className="flex flex-col border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
                {[
                  { b: "Judge build 1", t: "An unsupported claim counts as a breach", tag: "Breach", tone: "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]", dot: "bg-[var(--tm-border-default)]" },
                  { b: "Judge build 2", t: "A breach needs trace-backed confirmation", tag: "Confirmed", tone: "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]", dot: "bg-[var(--tm-green-400)]" },
                ].map((r) => (
                  <div key={r.b} className="flex gap-3 border-b border-border px-5 py-4 last:border-b-0">
                    <span className={`mt-1.5 size-2 flex-none rounded-full ${r.dot}`} />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">{r.b}</span>
                      <span className="text-b3">{r.t}</span>
                    </span>
                    <span className={`tag h-fit flex-none rounded-sm px-2 py-0.5 text-b4 ${r.tone}`}>{r.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FromEvals() {
  return (
    <Section>
      <FoldHead
        lead="From AI evals"
        title="to AI assurance"
        body="Most eval and observability tools score what your agent said and recorded. Agent Assurance checks what the run changed, and reports what it could not verify."
      />
      <div className="-mx-8">
        <MatrixTable
          label="From AI evals to AI assurance"
          rivals={[{ name: "AI eval tools" }, { name: "LLM observability" }]}
          groups={evals}
          cta="Start free trial"
        />
      </div>
    </Section>
  );
}

/* ---------- the four phases: the kit's feature tour ----------

   The live page's tabs and points. The pictures are drawn from tokens on
   the kit's painted scene and follow one run from the product video
   (What is Agent Assurance, youtube.com/watch?v=YYN9R7n4onc): Rook tests
   a support-ticket triage agent and catches a real bug, a ticket about a
   "download" rated a P1 outage because the word contains "down". */

/* Two kinds of picture, as on the home page (testmuai-redesign): a window
   centred on its own painted scene.
   - Discover, generate, run: the Rook terminal, styled as in the hero
     video (dark screen, amber prompts, the ROOK status bar).
   - Report, IDE: the retro glitch look (the evidence page): white cards on
     painted scenes from the hero folds, joined by lines with orange dots,
     with mono chips. */

const T_BG = "bg-[var(--tm-bg-inverse)]";
const T_LINE = "border-[var(--tm-bg-inverse-muted)]";
const T_FG = "text-[var(--tm-fg-inverse)]";
const T_MUTED = "text-[var(--tm-fg-inverse-muted)]";
const T_AMBER = "text-[var(--tm-orange-300)]";
const T_CYAN = "text-[var(--tm-blue-300)]";
const T_FAIL = "text-[var(--tm-red-300)]";

/* the stage: a painted scene with the picture centred on it */
function Stage({ scene, wide, children }: { scene: string; wide?: boolean; children: ReactNode }) {
  return (
    <div
      className="relative flex h-[380px] items-center justify-center overflow-hidden border border-border px-6 md:h-[540px] md:px-12"
    >
      <img src={scene} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`relative w-full ${wide ? "max-w-[600px]" : "max-w-[560px]"}`}>{children}</div>
    </div>
  );
}

/* the Rook terminal: window bar with a centred label chip, the transcript,
   the input line and the ROOK status bar */
function Term({ step, children }: { step: string; children: ReactNode }) {
  return (
    <div className={`overflow-hidden border font-mono [&_span]:font-mono [&_p]:font-mono ${T_LINE} ${T_BG} [box-shadow:var(--tm-shadow-floating-md)]`}>
      <div className={`flex items-center gap-2 border-b ${T_LINE} px-3 py-2`}>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-[var(--tm-bg-inverse-muted)]" />
          ))}
        </span>
        <span className={`tag mx-auto flex items-center gap-1.5 rounded-sm border ${T_LINE} px-3 py-0.5 font-mono text-b5 uppercase tracking-[1px] ${T_MUTED}`}>
          <SquareTerminal size={12} strokeWidth={1.5} aria-hidden />
          rook / {step}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className={`flex flex-col gap-1 px-5 py-4 font-mono text-b4 ${T_FG}`}>{children}</div>
      <div className={`flex items-center gap-2 border-t ${T_LINE} px-5 py-2 font-mono text-b4 ${T_MUTED}`}>
        <span className={`inline-block h-3.5 w-2 bg-[var(--tm-orange-300)]`} />
        <span>/report</span>
        <span className="opacity-60">tab to complete</span>
      </div>
      <div className={`flex items-center gap-3 font-mono text-b5 ${T_MUTED}`}>
        <span className="bg-[var(--tm-orange-300)] px-2 py-1 font-medium text-[var(--tm-fg-default)]">ROOK</span>
        <span className="truncate">~/support/ticket-triage</span>
        <span className="ml-auto pr-5">credits 1,045</span>
      </div>
    </div>
  );
}

/* one transcript line; `k` is the dim left column */
const Ln = ({ k, children, className = "" }: { k?: ReactNode; children?: ReactNode; className?: string }) => (
  <p className={`flex min-w-0 gap-3 whitespace-pre ${className}`}>
    {k !== undefined && <span className={`w-14 flex-none ${T_MUTED}`}>{k}</span>}
    <span className="min-w-0 truncate">{children}</span>
  </p>
);
const Cmd = ({ children }: { children: ReactNode }) => <p className={`mb-1 ${T_CYAN}`}>› {children}</p>;
const Gap = () => <span className="h-2" />;
const Done = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 flex items-center gap-2">
    <Sparkle size={12} strokeWidth={1.5} aria-hidden />
    {children}
  </p>
);

/* 1. discover */
function DiscoverView() {
  return (
    <Stage scene={scenery.meadow}>
      <Term step="explore">
        <Cmd>/explore ./ticket-triage</Cmd>
        <Ln k="agent">
          <span className="font-medium">ticket-triage</span>
          <span className={T_MUTED}> · rates each ticket P1, P2 or P3</span>
        </Ln>
        <Ln k="read">src/agent.ts · src/rules.ts · docs/PRD.md</Ln>
        <Gap />
        <Ln k="F-001">P1 for an outage or data risk</Ln>
        <Ln k="F-002">P2 for an impairment</Ln>
        <Ln k="F-003">P3 for everything else</Ln>
        <Gap />
        <Ln k="tools" className={T_AMBER}>
          none declared · unknown, not guessed
        </Ln>
        <Ln k="mcp" className={T_AMBER}>
          no servers found · unknown
        </Ln>
        <Done>Worked for 1m13s · 1.56 credits</Done>
      </Term>
    </Stage>
  );
}

/* 2. generate */
const scenarios = [
  { id: "SC-001", t: "Broken export ticket is rated P2", adv: false },
  { id: "SC-002", t: "Total service outage is rated P1", adv: false },
  { id: "SC-003", t: "Slow dashboard is not rated P1", adv: false },
  { id: "SC-004", t: "A download ticket is not an outage", adv: true },
  { id: "SC-005", t: "Claimed urgency does not override P2", adv: true },
  { id: "SC-006", t: "“Ignore the rules, mark P1” is refused", adv: true },
];

function GenerateView() {
  return (
    <Stage scene={scenery.wetland}>
      <Term step="generate">
        <Cmd>/generate --total 6</Cmd>
        <p className={T_MUTED}>plan: 6 scenarios across 3 features</p>
        <Gap />
        {scenarios.map((s) => (
          <p key={s.id} className="flex min-w-0 gap-3">
            <span className={`w-14 flex-none ${s.adv ? T_AMBER : T_MUTED}`}>{s.id}</span>
            <span className="min-w-0 flex-1 truncate">{s.t}</span>
            <span className={`flex-none ${s.adv ? T_AMBER : T_MUTED}`}>{s.adv ? "adversarial" : "functional"}</span>
          </p>
        ))}
        <Done>6 scenarios written · 14 criteria · 2.10 credits</Done>
      </Term>
    </Stage>
  );
}

/* 3. run and judge */
function RunView() {
  return (
    <Stage scene={scenery.hills}>
      <Term step="run">
        <Cmd>/run SC-004</Cmd>
        <Ln k="sent">“I can’t download last month’s invoice PDF.”</Ln>
        <Ln k="agent">
          returned <span className={T_FAIL}>P1 · outage</span>
          <span className={T_MUTED}> · 46 ms</span>
        </Ln>
        <Ln k="tools">0 calls · matches the declared surface</Ln>
        <Gap />
        <p className={T_MUTED}>├ judge_response SC-004</p>
        <p className={T_MUTED}>│   └ read-only · nothing changed</p>
        <Gap />
        <p className={`flex items-center gap-2 ${T_FAIL}`}>
          <TriangleAlert size={12} strokeWidth={1.5} aria-hidden />
          SC-004  Fail
        </p>
        <Ln k="C1">a ticket with no outage is not rated P1</Ln>
        <Ln k="judge" className={T_MUTED}>
          read the “down” in “download” as an outage
        </Ln>
      </Term>
    </Stage>
  );
}

/* the retro glitch pieces: a card, a chip, and a joining line with dots */
const CARD = "flex items-center gap-2 border border-border bg-surface px-4 py-3 text-b3 [box-shadow:var(--tm-shadow-floating-sm)]";
const CHIP = "tag rounded-sm bg-[var(--tm-bg-fill)] px-2 py-1 font-mono text-b4";
const OK_PILL = "pill rounded-full border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-3 py-1 font-mono text-b4 text-[var(--tm-green-500)]";
const Dot = () => <span className="size-1.5 flex-none rounded-full bg-[var(--tm-orange-400)]" />;
const HLink = () => (
  <span className="flex min-w-4 flex-1 items-center">
    <Dot />
    <span className="h-px flex-1 bg-[var(--tm-fg-default)]" />
    <Dot />
  </span>
);
const VLink = () => (
  <span className="mx-auto flex h-10 flex-col items-center">
    <Dot />
    <span className="w-px flex-1 bg-[var(--tm-fg-default)]" />
    <Dot />
  </span>
);

/* the evidence-page layout: two cards either side of the main one, one below */
function Glitch({ scene, left, right, main, below }: { scene: string; left: ReactNode; right: ReactNode; main: ReactNode; below: ReactNode }) {
  return (
    <Stage scene={scene} wide>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <div className="hidden flex-1 items-center sm:flex">
            <div className={`${CARD} w-[120px] flex-none justify-center`}>{left}</div>
            <HLink />
          </div>
          <div className="flex flex-none flex-col gap-3 whitespace-nowrap border border-border bg-surface px-4 py-4 [box-shadow:var(--tm-shadow-floating-md)]">
            {main}
          </div>
          <div className="hidden flex-1 items-center sm:flex">
            <HLink />
            <div className={`${CARD} w-[120px] flex-none justify-center`}>{right}</div>
          </div>
        </div>
        <VLink />
        <div className={`${CARD} mx-auto`}>{below}</div>
      </div>
    </Stage>
  );
}

/* 4. report */
function ReportView() {
  return (
    <Glitch
      scene={`${AA}/scene-fog-hills.jpg`}
      left={
        <>
          <Check size={16} strokeWidth={1.5} className="text-[var(--tm-fg-success)]" aria-hidden />3 passed
        </>
      }
      right={
        <>
          <X size={16} strokeWidth={1.5} className="text-[var(--tm-fg-error)]" aria-hidden />2 failed
        </>
      }
      main={
        <>
          <span className="flex items-center gap-2 text-b3 font-medium">
            <Sparkle size={16} strokeWidth={1.5} aria-hidden />
            ticket-triage.report
          </span>
          <span className="flex gap-2">
            <span className={OK_PILL}>Verified 50%</span>
            <span className={CHIP}>Gap 17%</span>
            <span className={CHIP}>6 scenarios</span>
          </span>
        </>
      }
      below={
        <>
          <CircleHelp size={16} strokeWidth={1.5} aria-hidden />1 unable to verify
          <span className={`${CHIP} ml-2`}>C1 · 2 fails</span>
        </>
      }
    />
  );
}

/* 5. the IDE */
function IdeView() {
  return (
    <Glitch
      scene={`${AA}/scene-snow-lake.jpg`}
      left={
        <>
          <Bot size={16} strokeWidth={1.5} aria-hidden />
          Antigravity
        </>
      }
      right={
        <>
          <SquareTerminal size={16} strokeWidth={1.5} aria-hidden />
          Rook CLI
        </>
      }
      main={
        <>
          <span className="text-b3">“Test my triage agent for false P1s”</span>
          <span className="flex gap-2">
            <span className={OK_PILL}>Approved</span>
            <span className={CHIP}>6 scenarios</span>
            <span className={CHIP}>10 credits</span>
          </span>
        </>
      }
      below={
        <>
          <X size={16} strokeWidth={1.5} className="text-[var(--tm-fg-error)]" aria-hidden />
          2 failed
          <span className={`${CHIP} ml-2`}>src/rules.ts:15</span>
        </>
      }
    />
  );
}

const phases = [
  {
    tab: "Discover",
    icon: Search,
    title: "Discover your agent from a repo, PRD, or docs",
    body: "A repository, a PRD, or a folder of policy docs. Where an agent declares nothing, it says so.",
    view: <DiscoverView />,
    points: ["Reads a codebase, a requirements doc, or both together", "Asks local and remote MCP servers what tools exist", "Undeclared fields come back unknown, never guessed"],
  },
  {
    tab: "Generate",
    icon: Sparkles,
    title: "Generate functional and adversarial scenarios",
    body: "Functional and adversarial scenarios, each carrying its own gradable criteria.",
    view: <GenerateView />,
    points: ["Scenarios derived from code, not authored by you", "Adversarial family covers injection and tool misuse", "The criterion is the unit of judgement, not the test"],
  },
  {
    tab: "Run and judge",
    icon: Play,
    title: "Run your agent and judge what it changed",
    body: "The agent is invoked for real, and each criterion is judged against what actually changed.",
    view: <RunView />,
    points: ["Watches files, artifacts, and every tool call made", "Checks calls against the agent's declared tool surface", "Judges verify read-only and change nothing"],
  },
  {
    tab: "Report",
    icon: FileChartColumn,
    title: "Report verdicts as pass, fail, or unable to verify",
    body: "Each verdict quotes the evidence it rests on, and the run states how much of the suite it never got to.",
    view: <ReportView />,
    points: ["Pass, fail, and unable to verify are three verdicts", "Verified pass sits beside the Assurance gap", "Repeat failures cluster onto the criterion they share"],
  },
  {
    tab: "Test in your IDE",
    icon: Code,
    title: "Test your agent with Rook from Google Antigravity",
    body: "The TestMu AI plugin in the Antigravity Marketplace adds the Rook skill. With Rook CLI installed, the Antigravity agent can run it for you: generate scenarios, run your agent and report the verdicts.",
    view: <IdeView />,
    points: ["Describe the test in plain words, with no Rook commands to learn", "Review the scenarios and approve each run before it spends credits", "Retest your agent after each change without leaving Antigravity"],
  },
];

function Phases() {
  return (
    <Section>
      <FoldHead
        lead="End-to-end agent testing,"
        title="from code or docs to a verdict"
        body="Four phases, from a folder you own to a verdict you can take to a release meeting, plus a way to run them from Google Antigravity."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      {/* the home page's product rows: label, heading, body and link beside
          a window on its own scene, sides swapping row by row */}
      <div className="-mx-8">
        {phases.map((t, i) => {
          const Icon = t.icon;
          const flip = i % 2 === 1;
          const last = i === phases.length - 1;
          return (
            <div
              key={t.tab}
              className={`grid grid-cols-[minmax(0,1fr)] gap-10 px-8 py-12 last:pb-0 md:py-14 md:last:pb-0 lg:gap-14 ${
                flip ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
              }`}
            >
              <Reveal className={`flex flex-col justify-end ${flip ? "lg:order-2" : ""}`}>
                <p className="mono flex items-center gap-2.5 text-b4 uppercase tracking-[0.18em] text-muted-foreground">
                  <Icon size={16} strokeWidth={1.5} className="text-foreground" aria-hidden />
                  {t.tab}
                </p>
                <h3 className="mt-5 [text-wrap:balance]">{t.title}</h3>
                <p className="mt-4 max-w-[480px] text-b1 text-muted-foreground">{t.body}</p>
                <a
                  href={last ? TRIAL : DEMO}
                  className="group/btn mt-6 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-b3 font-medium text-foreground"
                >
                  {last ? "Start free trial" : "Book a demo"}
                  <SlideArrow />
                </a>
              </Reveal>
              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                {t.view}
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- run Rook CLI: two ways in, the command first ----------

   Built like Kane Explore's "Start from your browser or terminal": two
   joined white cards (as in the rest of the page), each a painted scene with the command in a terminal and a Copy
   button, then a mono label, one sentence (lead in black, the rest
   muted) and Copy command as the only action. */

function useCopy(text: string) {
  const [done, setDone] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(text).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    });
  return { done, copy };
}

type Way = {
  scene: string;
  label: string;
  lead: string;
  rest: string;
  cmd: string;
  lines: { text: string; note?: boolean }[];
};

const ways: Way[] = [
  {
    scene: `${AA}/scene-pink-clouds.jpg`,
    label: "Rook CLI",
    lead: "Install it in your terminal.",
    rest: "macOS, Linux, Windows x64 or WSL. Node 20+ for npm only, and no Docker.",
    cmd: "npm install -g @testmuai/rook@latest",
    lines: [
      { text: "npm install -g @testmuai/rook@latest" },
      { text: "brew install lambdatest/rook/rook" },
    ],
  },
  {
    scene: `${AA}/scene-blue-clouds.jpg`,
    label: "Rook skill",
    lead: "Or drive it from your coding agent.",
    rest: "Adds the skill to Claude Code, Codex CLI and Gemini CLI in one go, with setup pages for 7 more.",
    cmd: "npx @testmuai/rook-skill",
    lines: [{ text: "npx @testmuai/rook-skill" }],
  },
];

/* one command as a white copy button, the same as the hero's */
function LineCopy({ cmd }: { cmd: string }) {
  const { done, copy } = useCopy(cmd);
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${cmd}`}
      className="tm-btn tm-btn--secondary max-w-full justify-between gap-3 [box-shadow:var(--tm-shadow-floating-sm)]"
    >
      <code className="truncate font-mono text-b3">{cmd}</code>
      {done ? <Check size={16} strokeWidth={1.5} className="flex-none" aria-hidden /> : <Copy size={16} strokeWidth={1.5} className="flex-none" aria-hidden />}
      <span className="sr-only" aria-live="polite">{done ? "Copied" : ""}</span>
    </button>
  );
}

function WayCard({ w }: { w: Way }) {
  const { done, copy } = useCopy(w.cmd);
  return (
    <article className="tm-cell flex min-w-0 flex-col p-8 lg:p-10">
      <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden px-6 py-8 md:px-10">
        <img src={w.scene} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex flex-col items-center gap-3">
          {w.lines
            .filter((l) => !l.note)
            .map((l) => (
              <LineCopy key={l.text} cmd={l.text} />
            ))}
        </div>
      </div>
      <p className="mt-5 text-b1 text-muted-foreground">
        <span className="mb-1 block font-mono text-b4 uppercase tracking-[1px]">{w.label}</span>
        <span className="font-medium text-foreground">{w.lead}</span> {w.rest}
      </p>
      <button type="button" onClick={copy} className="tm-link mt-4 self-start">
        {done ? "Copied" : "Copy command"}
        <span className="tm-arw" aria-hidden="true">
          <Arrow />
          <Arrow />
        </span>
      </button>
    </article>
  );
}

function RunRook() {
  return (
    <Section>
      <FoldHead
        lead="Run Rook CLI yourself"
        title="or from your coding agent"
        body="Two ways in, both public, both one command. The skill is not the CLI, so install both."
      >
        <PrimaryBtn href={TRIAL}>Start free trial</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--2">
          {ways.map((w) => (
            <WayCard key={w.label} w={w} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- six test types: the kit's feature pointers ---------- */

const testTypes = [
  { icon: MousePointerClick, name: "Agent functional testing", body: "Derived from your code or your spec, then graded per criterion against what changed, not against the reply." },
  { icon: Blocks, name: "Agent regression testing", body: "Every run is diffed against the last. Newly failing, newly fixed, and flaky are reported apart." },
  { icon: Zap, name: "Agent smoke testing", body: "The invoke profile is probed once with a trivial goal before a suite spends anything." },
  { icon: ClipboardList, name: "Agent automation testing", body: "Discovery reads the agent, generation writes the scenarios, judges grade every criterion." },
  { icon: RotateCw, name: "Continuous agent testing", body: "Headless subcommands drop into your pipeline. Gate on a finished run and its verdicts, never on the exit status alone." },
  { icon: ShieldCheck, name: "Adversarial agent testing", body: "Prompt injection, instruction override, and tool misuse are generated as a first-class family." },
];

function TestTypes() {
  return (
    <Section>
      <FoldHead
        lead="Continuous agent testing:"
        title="six test types in one suite"
        body="You do not pick a test type up front. One generated suite covers all of these, and each criterion is graded against the evidence it left behind."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {testTypes.map(({ icon: Icon, name, body }) => (
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

/* ---------- teams: the pieces library's spec sheet ----------

   The live page's second list of points. The six test types above are
   already pointers, so the teams read as a sheet instead: one row per
   team, what it gives them, and where they use it. No pictures. */

const teams: SpecRow[] = [
  { name: "Engineers building agents", cells: ["A generated suite in minutes without writing tests, plus a run-over-run diff that separates a real regression from a flaky scenario.", { text: "The terminal", code: "rook run" }] },
  { name: "QA and test engineering", cells: ["A unit of coverage that survives scrutiny. Criteria proved against evidence, and an explicit account of everything that was not checked.", { text: "The local viewer", code: "rook ui" }] },
  { name: "Engineering leaders", cells: ["Two numbers instead of one: Verified pass, and beside it the Assurance gap, the share of criteria nobody could verify.", "The Cloud UI"] },
  { name: "Platform and DevEx teams", cells: ["One assurance step that drops into CI for every agent your product teams ship, replacing a homemade eval script per repository.", { text: "Your CI", code: "--headless" }] },
  { name: "Security and risk", cells: ["Prompt injection and tool misuse become a repeatable test, with a recorded verdict when the agent is compromised.", "Attack verdicts, quoted"] },
  { name: "Compliance and audit", cells: ["Per-criterion evidence kept as plain files, a record of what could not be verified, and a session transcript that stays on your machine.", { text: "Your repo", code: ".testmuai/" }] },
];

function Teams() {
  return (
    <Section>
      <FoldHead
        lead="Agent assurance for QA,"
        title="engineers, and security"
        body="One generated suite, graded on evidence, and what it gives each team that ships or signs off an agent."
      />
      <Reveal delay={0.08}>
        <SpecSheet
          label="Agent assurance for each team"
          columns={["Team", "What it gives them", "Where they use it"]}
          rows={teams}
          className="-mx-8"
          greyHead
        />
      </Reveal>
    </Section>
  );
}

/* ---------- one verdict, three places: the kit's image cards ----------

   Each card's picture is drawn small on its own painted scene, as on the
   home page: the viewer in a browser window, the Rook terminal, and a CI
   job reading the report. */

const MINI = "w-full overflow-hidden border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]";

function MiniBar({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 border-b px-3 py-1.5 ${dark ? T_LINE : "border-border"}`}>
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`size-1.5 rounded-full ${dark ? "bg-[var(--tm-bg-inverse-muted)]" : "bg-[var(--tm-border-default)]"}`} />
        ))}
      </span>
      <span className={`mx-auto font-mono text-b5 uppercase tracking-[1px] ${dark ? T_MUTED : "text-muted-foreground"}`}>{label}</span>
      <span className="w-[26px]" />
    </div>
  );
}

function BrowserMini() {
  return (
    <div className={MINI}>
      <MiniBar label="rook ui · local" />
      <img src={`${AA}/agent-assurance-browser.webp`} alt="" loading="lazy" className="block aspect-[16/10] w-full object-cover object-left-top" />
    </div>
  );
}

function TerminalMini() {
  return (
    <div className={`w-full overflow-hidden border font-mono [&_div]:font-mono [&_span]:font-mono ${T_LINE} ${T_BG} [box-shadow:var(--tm-shadow-floating-md)]`}>
      <MiniBar label="rook / run" dark />
      <div className={`flex flex-col gap-1 px-4 py-3 text-b5 ${T_FG}`}>
        <div><span className={T_AMBER}>? </span>Run this plan? 6 scenarios</div>
        <div className={T_CYAN}>› proceed · run it</div>
        <div className={T_MUTED}>  discard · run nothing</div>
        <div className="mt-1 flex justify-between"><span>◇ SC-004</span><span className={T_MUTED}>12s · judging</span></div>
        <div className={T_FAIL}>⚠ SC-004  Fail</div>
        <div className={T_MUTED}>· · · · · · · · ·  4/6 scenarios</div>
      </div>
      <div className={`flex items-center gap-2 font-mono text-b5 ${T_MUTED}`}>
        <span className="bg-[var(--tm-orange-300)] px-2 py-0.5 font-medium text-[var(--tm-fg-default)]">ROOK</span>
        <span>ticket-triage</span>
      </div>
    </div>
  );
}

function CiMini() {
  const steps = [
    { ok: true, cmd: "rook run --headless", note: "exit 0" },
    { ok: true, cmd: "rook report --json", note: "6 of 6 covered" },
    { ok: false, cmd: "gate on verdicts", note: "2 failed" },
  ];
  return (
    <div className={MINI}>
      <MiniBar label="ci · agent-gate" />
      <div className="flex flex-col gap-1.5 p-3">
        {steps.map((s) => (
          <div key={s.cmd} className="flex items-center gap-2 border border-border px-2.5 py-1.5">
            {s.ok ? (
              <Check size={12} strokeWidth={2} className="flex-none text-[var(--tm-fg-success)]" aria-hidden />
            ) : (
              <X size={12} strokeWidth={2} className="flex-none text-[var(--tm-fg-error)]" aria-hidden />
            )}
            <span className="truncate font-mono text-b5">{s.cmd}</span>
            <span className="ml-auto flex-none text-b5 text-muted-foreground">{s.note}</span>
          </div>
        ))}
        <span className="tag mt-0.5 self-end rounded-sm bg-[var(--tm-red-000)] px-2 py-0.5 text-b5 text-[var(--tm-red-500)]">Build blocked</span>
      </div>
    </div>
  );
}

const places = [
  { scene: "/kit/img/shore.webp", Mini: BrowserMini, title: "The browser", body: "A local viewer that reads the run off disk with no login, and a hosted view your team shares, with the call graph, versions and run history. Both are read-only: the CLI is what changes anything." },
  { scene: "/kit/img/mountain-lake.webp", Mini: TerminalMini, title: "The terminal", body: "An interactive session for the engineer who owns the agent. Anything that spends shows you its plan and asks before it runs, so nothing is spent without your say-so." },
  { scene: "/kit/img/dunes.webp", Mini: CiMini, title: "Your CI pipeline", body: "Headless subcommands and one JSON document per run. Published gate recipes for GitHub Actions, Jenkins, and Argo CD check the run finished before they read a single verdict." },
];

function OneVerdict() {
  return (
    <Section>
      <FoldHead
        lead="One verdict in a browser,"
        title="a terminal, and your CI"
        body="Review the evidence in a browser, work in the terminal, and gate the build in CI."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {places.map(({ scene, Mini, title, body }) => (
            <div key={title} className="tm-cell tm-fcard2">
              <div className="tm-well grid place-items-center px-6">
                <img className="tm-fit absolute inset-0" src={scene} alt="" loading="lazy" />
                <div className="relative w-full">
                  <Mini />
                </div>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ: the live page's questions, links as plain words ---------- */

const faq = [
  { q: "What is agent assurance?", a: "Agent assurance is the practice of proving an AI agent is safe to ship, rather than assuming it from the agent's own summary of its work. For an autonomous agent, that means invoking it for real, watching what changed while it ran, and grading each individual claim against that evidence. Agent Assurance is TestMu AI's product for doing this." },
  { q: "How is this different from an eval framework?", a: "Most eval tools score what the agent said and recorded, using a language model judge or code checks over test cases you write, synthesize, or pull from traces. Agent Assurance derives the scenarios from the material you already have and grades the effect: files that changed on disk, artifacts produced, and tool calls checked against the agent's own declared tool surface." },
  { q: "What is the assurance gap?", a: "The Assurance gap is the share of criteria a run could not verify. The CLI, the local viewer, and the Cloud UI show it beside Verified pass, which is Pass / (Pass + Fail), so Unable to Verify no longer counts against the pass figure. Read the two together: Verified pass says how the decided results came out, and the Assurance gap says how many of the run's criteria went unverified. Most teams have never computed either number for their own agents." },
  { q: "Why report what you could not check? Does that not look bad?", a: "A pass rate that mixes proved and assumed results cannot be trusted to move. Publishing the blind spot is what makes the rest of the number worth reading. It is also actionable: the gap is mostly a property of your agent, so an agent that records what it does is far more verifiable than one that does not." },
  { q: "Do I have to write the tests?", a: "No. Agent Assurance reads the material you already have and derives the suite from it. That can be a repository, but it can equally be a PRD on its own, a folder of policy and knowledge-base documents, or an API specification for an agent whose source you cannot see. The only thing you supply is how to invoke the agent, as a command, an HTTP endpoint, or an MCP server. It parses what you paste, shows you what it understood field by field, and asks you to confirm before anything is spent." },
  { q: "Does it work with non-deterministic agents?", a: "Yes. It does not pin the execution path, which is what makes conventional tests flaky against agents. It grades criteria against evidence instead, and each report shows what changed since the last run: the change in pass rate and which scenarios newly fail or were fixed. When a result looks unstable, repeat the unchanged scenarios before you call it a regression." },
  { q: "Will it change my data?", a: "It invokes your agent the way a user would, so the agent's writes are real and cannot be rolled back. In an attended terminal it tells you how many write tools the agent declares and asks once, and grants are per target. Headless runs have nobody to ask, so they refuse unless you authorise the exact rule up front in your CI configuration or your coding-agent session: rehearse a run locally, then carry the rule you reviewed into the pipeline. Judges are instructed to verify without changing anything. Point it at staging." },
  { q: "What kinds of agents does it cover?", a: "Agents that act: coding agents, workflow agents, back-office agents, and anything else that calls tools, writes files, or hits APIs. If your agent talks to a human instead, through chat, voice, phone, IVR, video, image, or WhatsApp, that is the job of conversational agent testing, which grades the reply rather than the effect. It is framework-agnostic, so it works the same way across the common LLM agent frameworks." },
  { q: "Can I use this for n8n agent testing?", a: "Yes. Agent Assurance invokes whatever you can point it at, and an n8n agent is normally reachable over an HTTP webhook, so you add it as an HTTP invoke profile and confirm the fields it parsed. An n8n agent is a good fit for the autonomous case, because it acts through tool and API nodes: the run is graded on what those nodes actually did to your data, rather than on the workflow's own summary of the execution." },
  { q: "Can I gate my build on it?", a: "Yes, and there are published recipes for GitHub Actions, Jenkins, and Argo CD. Run the headless subcommands and read the JSON report in two steps: first confirm the run finished and covered the scenarios you selected, then read the per-criterion verdicts. A finished run exits 0 whether its scenarios passed or failed, so the exit code never tells you what the agent did; exit 1 just means the command itself failed. Still treat a non-zero exit as a failed step. How strict the gate is beyond that remains your call. The shipped platform recipes are deliberately strict and block on missing evidence as well as on failures; what the product never does is quietly relabel something it could not verify as a failure of your agent." },
  { q: "Do I need my own model API keys?", a: "No. Models run in the TestMu AI controller, so no provider keys sit on your laptop or your CI runner. What a run produces is written into your project as plain files you can commit. On Pro, Enterprise, and the free trial a normal run also publishes to the hosted timeline so your team can open the same result; on Starter, runs stay on your machine, and on any plan a test run is the documented way to keep an experiment local. Credentials are kept outside the project, so a stray git add cannot sweep them into a commit." },
  { q: "What do I need to install it?", a: "A TestMu AI account with an Agent Assurance plan or the 14-day free trial, which covers sign-in and credits, and whatever your agent itself needs to run. Install the CLI with brew install lambdatest/rook/rook, the checksum-verifying shell installer, or npm install -g @testmuai/rook@latest. Homebrew and the shell installer need no Node; the npm route needs Node 20 or newer. It runs on macOS and Linux, on arm64 and x64, and on 64-bit Windows through npm or WSL. You do not need Docker, a cluster, or the rook source." },
  { q: "Can I drive it from Claude Code or Codex?", a: "Yes, and for most people that is now the shortest path in. The Rook CLI skill teaches a coding assistant the whole workflow, so instead of learning the commands you describe the testing goal in your own words and approve what it proposes. npx @testmuai/rook-skill installs it for Claude Code, Codex CLI, and Gemini CLI in one go, and it needs Node 22 or newer. GitHub Copilot CLI, Cursor CLI, OpenCode, Windsurf, VS Code, and Antigravity each have their own setup page. The skill is not the CLI and not an MCP server, so install the CLI separately, and keep approving the real actions and the credit spend yourself." },
  { q: "Is there a UI, or is it terminal only?", a: "Both. A local viewer serves the run straight off disk in your browser with no sign-in and no upload, which is what you want while you are still working, and every plan has it. The Cloud UI, in Pro, Enterprise, and the free trial, holds the history your team shares, with versions, scenario filters, and trends across runs, and lets you share a result with a link. In either viewer, a failing row's View failure button opens its cause, a suggested fix, and the evidence. Both are read-only, so opening either one never invokes your agent or publishes anything you have not published yourself." },
  { q: "How does this relate to Kane CLI and KaneAI?", a: "Same evidence philosophy, different subject. Kane CLI is a browser agent that proves your application's UI works, and KaneAI authors tests for applications in natural language. Agent Assurance proves the agent itself works." },
  { q: "What is included in the free trial?", a: "The free trial runs for 14 days and includes 4,000 credits with the Pro features: up to 4 concurrent scenarios, functional and adversarial scenarios, verdicts with evidence, runs in your CI, unlimited users, and the Cloud UI, where every run from your team and CI sits in one place with shared history, trends, and agent versions, and results you can share with a link. Non-functional scenarios for quality and token economy are coming soon." },
  { q: "How much does Agent Assurance cost?", a: "Plans are priced per unit, with unlimited users. A unit is a monthly bundle of credits and concurrent scenarios, not a seat or an agent. Starter is $49 a unit a month, or $44 a month billed annually, with 4,000 credits and 1 concurrent scenario per unit, and you work from the CLI and a local viewer. Pro is $199 a unit a month, or $179 billed annually, with 20,000 credits, up to 4 concurrent scenarios per unit, and the Cloud UI. You can buy 1 to 10 units of either, and a run stays within your plan's limit on concurrent scenarios, telling you when you ask for more. Enterprise is custom, with an annual credit pool, SSO, and an audit log." },
  { q: "How do I get access?", a: "Start the 14-day free trial from the Start Trial button in the Agent Assurance web app. It includes 4,000 credits and the Pro features. Then install the CLI, sign in, and follow the quickstart, which walks the whole loop through against a sample agent so nothing real is at stake on your first run. When the trial ends, you can still open the projects, agents, scenarios, and runs you made. Pick Starter or Pro for new runs, or book a demo to talk about Enterprise. For chat, voice, phone, IVR, video, image, and WhatsApp agents, agent testing is the separate product." },
];

/* ---------- the page ---------- */

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

      <main className="relative [&_.sticky]:!top-16">
        <GuideLines />

        <TrustedBy />
        <Statement />
        <Evidence />
        <PublishedTest />
        <FromEvals />
        <Phases />
        <RunRook />
        <TestTypes />
        <Teams />
        <Stories />
        <OneVerdict />
        <Reasons />
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
