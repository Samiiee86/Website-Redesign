import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  BadgeCheck,
  Blocks,
  BookOpen,
  CalendarCheck,
  Check,
  ClipboardList,
  Copy,
  FileChartColumn,
  FileText,
  FolderCode,
  MousePointerClick,
  RefreshCw,
  RotateCw,
  ShieldAlert,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import "./index.css";
import { ArrowChip, Section } from "./lib/ui";
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

/* Agent Assurance page (agent-assurance.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, more reasons, FAQ with this page's questions, the
     closing enterprise call and the footer.
   - The hero is the page's own hero fold (Web redesign/hero-folds/
     agent-assurance): its copy, video, scene and copyable install line.
   - Every other section starts from a kit fold, with no eyebrow labels
     over the headings: statement (what agent verification is),
     feature-cards-two-boxes (graded on evidence), the pieces library's
     comparison table (evals against assurance), feature-tour (the four
     phases and the IDE), code-setup (run Rook CLI), feature-pointers (the
     six test types, the one pointer design on the page), reasons (exit
     codes), feature-cards-image (teams; one verdict in three places).

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

function KitLink({ children, href }: { children: ReactNode; href?: string }) {
  const inner = (
    <>
      {children}
      <span className="tm-arw" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </>
  );
  return href ? (
    <a className="tm-link" href={href}>
      {inner}
    </a>
  ) : (
    <span className="tm-link">{inner}</span>
  );
}

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
          <div className="tm-hero__screen">
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
            type scale: H2 line, and the H4 size at regular weight */}
        <h2 className="!leading-[var(--tm-h2-line)]">What is AI agent verification?</h2>
        <p className="!text-[length:var(--tm-h4-size)] !leading-[var(--tm-h4-line)]">
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

/* ---------- graded on evidence: the kit's two cards with boxes ---------- */

const bigCards = [
  {
    scene: "/kit/img/shore.webp",
    ui: `${AA}/agent-assurance-effect.png`,
    title: "Grade the effect, not the account",
    body: "An agent's account of what it did is the weakest evidence available about what it did. It is the one party with a reason to be wrong.",
  },
  {
    scene: "/kit/img/hills.webp",
    ui: `${AA}/agent-assurance-gap.png`,
    title: "Publish the blind spot",
    body: "Anything Agent Assurance could not verify is reported as unverifiable. Never a quiet pass, never a guessed fail, never folded into the pass rate.",
  },
];

const boxes = [
  { icon: FileText, title: "No tests to write", body: "Point it at a repository, a PRD, or a folder of policy docs. It reads what you have and derives functional and adversarial scenarios from it." },
  { icon: ShieldAlert, title: "Adversarial by default", body: "Prompt injection, instruction override, and tool misuse are a first-class scenario family, not an add-on you configure." },
  { icon: RefreshCw, title: "Runs in your CI", body: "Headless subcommands and a JSON report, with published gate recipes for GitHub Actions, Jenkins, and Argo CD." },
];

function Evidence() {
  return (
    <Section>
      <FoldHead
        lead="Agent regression testing,"
        title="graded on evidence"
        body="Agent assurance is testing that grades what an AI agent actually changed, not what it says it did. Rook CLI runs your agent against a suite built from your code or docs, checks the effects on tools, files and APIs, and reports what it could not verify."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-bigx">
          <div className="tm-grid tm-grid--2 tm-bigx__pair">
            {bigCards.map((c) => (
              <div key={c.title} className="tm-cell tm-big">
                <img className="tm-scene" src={c.scene} alt="" loading="lazy" />
                <div className="tm-big__copy">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
                <div className="tm-big__ui">
                  <img src={c.ui} alt="" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
          <div className="tm-join">
            {boxes.map(({ icon: Icon, title, body }) => (
              <div key={title} className="tm-bigx__box">
                <Icon className="tm-ico32" size={32} strokeWidth={1.5} aria-hidden />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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

   The live page's tabs, each with its own product picture (already on a
   painted scene) and its three points. */

const phases = [
  {
    tab: "Discover",
    title: "Discover your agent from a repo, PRD, or docs",
    body: "A repository, a PRD, or a folder of policy docs. Where an agent declares nothing, it says so.",
    img: "agent-assurance-discovery.webp",
    points: ["Reads a codebase, a requirements doc, or both together", "Asks local and remote MCP servers what tools exist", "Undeclared fields come back unknown, never guessed"],
  },
  {
    tab: "Generate",
    title: "Generate functional and adversarial scenarios",
    body: "Functional and adversarial scenarios, each carrying its own gradable criteria.",
    img: "agent-assurance-scenarios.webp",
    points: ["Scenarios derived from code, not authored by you", "Adversarial family covers injection and tool misuse", "The criterion is the unit of judgement, not the test"],
  },
  {
    tab: "Run and judge",
    title: "Run your agent and judge what it changed",
    body: "The agent is invoked for real, and each criterion is judged against what actually changed.",
    img: "agent-assurance-evidence.webp",
    points: ["Watches files, artifacts, and every tool call made", "Checks calls against the agent's declared tool surface", "Judges verify read-only and change nothing"],
  },
  {
    tab: "Report",
    title: "Report verdicts as pass, fail, or unable to verify",
    body: "Each verdict quotes the evidence it rests on, and the run states how much of the suite it never got to.",
    img: "agent-assurance-report.webp",
    points: ["Pass, fail, and unable to verify are three verdicts", "Verified pass sits beside the Assurance gap", "Repeat failures cluster onto the criterion they share"],
  },
  {
    tab: "Test in your IDE",
    title: "Test your agent with Rook from Google Antigravity",
    body: "The TestMu AI plugin in the Antigravity Marketplace adds the Rook skill. With Rook CLI installed, the Antigravity agent can run it for you: generate scenarios, run your agent and report the verdicts.",
    img: "agent-assurance-antigravity.webp",
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
      <div className="tm-reveal -mx-8" data-tm-step-root data-autoplay>
        <div className="tm-tour__tabs" role="tablist">
          {phases.map((t) => (
            <button key={t.tab} role="tab" data-step>
              {t.tab}
              <span className="tm-progress" aria-hidden="true" />
            </button>
          ))}
        </div>
        {phases.map((t, i) => (
          <div key={t.tab} className="tm-tour__panel" role="tabpanel" data-step-panel={i} data-hide hidden={i > 0}>
            <div className="tm-tour__main">
              <div className="tm-tour__copy">
                <h3 className="[text-wrap:balance]">{t.title}</h3>
                <p>{t.body}</p>
                <KitLink href={i === phases.length - 1 ? TRIAL : DEMO}>
                  {i === phases.length - 1 ? "Start free trial" : "Book a demo"}
                </KitLink>
              </div>
              <div className="tm-tour__media">
                <img className="tm-fit" src={`${AA}/${t.img}`} alt="" loading="lazy" />
              </div>
            </div>
            <div className="tm-tour__perks">
              {t.points.map((p) => (
                <div key={p}>
                  <b>{p}</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- run Rook CLI: the kit's code setup ---------- */

const C = ({ children }: { children: ReactNode }) => <span className="c">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="s">{children}</span>;

function RunRook() {
  return (
    <Section>
      <div className="tm-setup">
        <div className="tm-reveal">
          <h2 className="tm-head__title">
            <span className="tm-head__lead">Run Rook CLI yourself</span>
            <span className="tm-head__main">or from your coding agent</span>
          </h2>
          <p className="tm-head__text mt-6">Two ways in, both public, both one command.</p>
          <ol className="tm-steps">
            <li>
              <span className="tm-label">01</span>
              <div>
                <b>Install the CLI</b>
                <p>macOS, Linux, Windows x64, or WSL. Node 20+ for npm only. No Docker.</p>
              </div>
            </li>
            <li>
              <span className="tm-label">02</span>
              <div>
                <b>Sign in and point it at your agent</b>
                <p>Sign in, pick a project, and point it at your agent. The quickstart does the whole loop on a sample agent.</p>
              </div>
            </li>
            <li>
              <span className="tm-label">03</span>
              <div>
                <b>Or drive it from your coding agent</b>
                <p>The skill works with Claude Code, Codex CLI, Gemini CLI and 7 more. The skill is not the CLI, so install both.</p>
              </div>
            </li>
          </ol>
          <div className="mt-8">
            <KitLink href={`${SITE}/support/docs/agent-assurance-quickstart/`}>Read the quickstart</KitLink>
          </div>
        </div>
        <div className="tm-reveal">
          <div className="tm-code tm-code--boxed" data-tm-code data-tm-tabs>
            <div className="tm-code__bar">
              <div className="tm-code__tabs" role="tablist">
                <button role="tab" data-tab="npm" aria-selected="true">npm</button>
                <button role="tab" data-tab="brew" aria-selected="false">Homebrew</button>
                <button role="tab" data-tab="skill" aria-selected="false">Coding agent</button>
              </div>
              <div className="tm-code__tools">
                <button className="tm-btn tm-btn--secondary" data-tm-copy>
                  <Copy size={16} strokeWidth={1.5} aria-hidden />
                  Copy
                </button>
                <a className="tm-btn tm-btn--secondary" href={`${SITE}/support/docs/rook-installation/`}>
                  <BookOpen size={16} strokeWidth={1.5} aria-hidden />
                  Docs
                </a>
              </div>
            </div>
            <div data-panel="npm" data-label="Terminal · npm">
              <pre className="!text-b3">
                <C># Node 20+</C>{"\n"}npm install -g @testmuai/rook@latest{"\n\n"}
                <C># sign in, pick a project, point it at your agent</C>{"\n"}rook
              </pre>
            </div>
            <div data-panel="brew" data-label="Terminal · Homebrew" hidden>
              <pre className="!text-b3">
                <C># no Node needed</C>{"\n"}brew install lambdatest/rook/rook{"\n\n"}
                <C># sign in, pick a project, point it at your agent</C>{"\n"}rook
              </pre>
            </div>
            <div data-panel="skill" data-label="Claude Code, Codex CLI, Gemini CLI" hidden>
              <pre className="!text-b3">
                <C># installs the Rook skill for your coding agents</C>{"\n"}npx @testmuai/rook-skill{"\n\n"}
                <C># then ask your agent</C>{"\n"}&gt; <S>Use rook to test my agent against its refund policy</S>
              </pre>
            </div>
          </div>
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

/* ---------- exit codes: the kit's reasons block ----------

   The two codes as big numbers, then the two steps of a real gate as the
   report cards under them. */

const codes = [
  { code: "0", title: "The run finished", body: "Pass or fail, the code reads the same" },
  { code: "1", title: "The command failed", body: "Signed out, refused, unreachable, bad flags, or a run that never started" },
];

const gate = [
  "Step one: confirm the run finished and covered every scenario you selected. A partial run still writes a report.",
  "Step two: read the per-criterion verdicts. Fail the build on those. Treat exit 1 as a broken command, not a failing agent.",
];

function ExitCodes() {
  return (
    <Section>
      <FoldHead
        lead="Exit code 0 means the run finished,"
        title="pass or fail"
        body="Gate on the exit code and you will ship a broken agent. Zero means the run finished. The scenarios inside may all have failed. Gate on the report."
      >
        <PrimaryBtn href={DEMO}>Book a demo</PrimaryBtn>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-reasons">
          <div className="tm-grid tm-grid--2">
            {codes.map((c) => (
              <div key={c.code} className="tm-cell flex flex-col items-center gap-3 px-8 py-10 text-center">
                <p className="tm-label">Exit {c.code}</p>
                <p className="tm-pixel text-[length:var(--tm-h1-size)] leading-none">{c.code}</p>
                <p className="text-b1 font-medium">{c.title}</p>
                <p className="text-b2 text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="tm-grid tm-grid--2">
            {gate.map((g) => (
              <div key={g} className="tm-cell tm-report">
                <p className="!tracking-[var(--tm-h4-tracking)]">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- teams: the kit's image cards ----------

   The live page's second pointer list, changed to image cards so the
   page keeps one pointer design (the six test types). */

const teams = [
  { icon: FolderCode, scene: "/kit/img/hills.webp", title: "Engineers building agents", body: "A generated suite in minutes without writing tests, plus a run-over-run diff that separates a real regression from a flaky scenario." },
  { icon: BadgeCheck, scene: "/kit/img/meadow.webp", title: "QA and test engineering", body: "A unit of coverage that survives scrutiny. Criteria proved against evidence, and an explicit account of everything that was not checked." },
  { icon: FileChartColumn, scene: "/kit/img/shore.webp", title: "Engineering leaders", body: "Two numbers instead of one. Verified pass, which counts only passes and fails, and beside it the Assurance gap, the share of criteria nobody could verify, so you can see how much of the result was observed rather than inferred." },
  { icon: CalendarCheck, scene: "/kit/img/mountain-lake.webp", title: "Platform and DevEx teams", body: "One assurance step that drops into CI for every agent your product teams ship, replacing a homemade eval script per repository." },
  { icon: ShieldCheck, scene: "/kit/img/dunes.webp", title: "Security and risk", body: "Prompt injection and tool misuse become a repeatable test, with a recorded verdict when the agent is compromised. Each attack verdict rests on quotes from the target." },
  { icon: Users, scene: "/kit/img/sunlit-clouds.webp", title: "Compliance and audit", body: "Per-criterion evidence retained as plain files, an explicit record of what could not be verified on each run, and a full session transcript that stays on your machine unless you export it." },
];

function Teams() {
  return (
    <Section>
      <FoldHead
        lead="Agent assurance for QA,"
        title="engineers, and security"
        body="One generated suite, graded on evidence, and what it gives each team that ships or signs off an agent."
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3">
          {teams.map(({ icon: Icon, scene, title, body }) => (
            <div key={title} className="tm-cell tm-fcard2">
              <div className="tm-well grid place-items-center">
                <img className="tm-fit absolute inset-0" src={scene} alt="" loading="lazy" />
                <Icon size={64} strokeWidth={1} className="relative text-[var(--tm-fg-inverse)]" aria-hidden />
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

/* ---------- one verdict, three places: the kit's image cards ---------- */

const places = [
  { img: "agent-assurance-browser.webp", title: "The browser", body: "A local viewer that reads the run off disk with no login, and a hosted view your team shares, with the call graph, versions and run history. Both are read-only: the CLI is what changes anything." },
  { img: "agent-assurance-terminal.webp", title: "The terminal", body: "An interactive session for the engineer who owns the agent. Anything that spends shows you its plan and asks before it runs, so nothing is spent without your say-so." },
  { img: "agent-assurance-ci.webp", title: "Your CI pipeline", body: "Headless subcommands and one JSON document per run. Published gate recipes for GitHub Actions, Jenkins, and Argo CD check the run finished before they read a single verdict." },
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
          {places.map((p) => (
            <div key={p.title} className="tm-cell tm-fcard2">
              <div className="tm-well">
                <img className="tm-fit" src={`${AA}/${p.img}`} alt="" loading="lazy" />
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
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
        <FromEvals />
        <Phases />
        <RunRook />
        <TestTypes />
        <ExitCodes />
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
