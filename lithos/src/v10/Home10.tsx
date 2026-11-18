import { useEffect, useRef } from "react";
import { Check, Lock, ArrowUpRight } from "lucide-react";
import { ArrowChip, Reveal, Section } from "../lib/ui";
import { trustedBy } from "../lib/content";
import Integrations from "../sections/Integrations";
import Stories from "../sections/Stories";
import Faq from "../sections/Faq";
import Enterprise from "../sections/Enterprise";
import Footer from "../sections/Footer";
import { startHome10 } from "./engine";
import "./home10.css";

/* Home, version 10: "When AI verifies AI". The layout, copy and paintings
   come from the new design file; type, spacing, frame lines, buttons and
   corners follow the TestMu design system. The site's own logo wall,
   customer stories, integrations, FAQ, closing CTA and footer stay. */

const FRAME = "relative mx-auto w-full max-w-[1240px] px-8";
const LABEL = "mono text-b4 uppercase tracking-[0.14em] text-muted-foreground";

/* ---------------- hero ---------------- */

function Hero10() {
  return (
    <section className="x-hero pb-16 pt-16 md:pt-20" aria-labelledby="x-h1">
      <div className="x-hero-bg x-bg-hero" aria-hidden />
      <div className="x-mist" aria-hidden />
      <div className="relative px-5 sm:px-8">
        <div className={FRAME}>
          <div className="x-hero-top">
            <div>
              <p className="x-eyebrow text-b3 font-medium">
                <span className="x-st" aria-hidden>
                  <i className="x-c-plan" />
                  <i className="x-c-author" />
                  <i className="x-c-exec" />
                  <i className="x-c-analyse" />
                </span>
                When AI verifies AI
              </p>
              <h1 className="x-h1" id="x-h1">
                <span>The AI testing platform</span>
                <span className="x-l2">for your apps and AI agents.</span>
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-b1 text-foreground">
                TestMu AI (formerly LambdaTest) is an AI testing platform that
                tests web and mobile apps, chat and voice agents, and
                agent-to-agent workflows, then hands you the evidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-lg btn-primary btn-arrow">
                  Start free
                  <ArrowChip />
                </button>
                <button className="btn btn-lg btn-secondary">Book a demo</button>
              </div>
              <p className="x-award text-b4">
                <span className="x-mq" aria-hidden>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                A Leader in the 2026 Gartner® Magic Quadrant™ for Agentic
                Software Quality Assurance Platforms
              </p>
            </div>
          </div>

          <Console />
        </div>
      </div>
    </section>
  );
}

function Console() {
  return (
    <div
      className="x-console text-b4"
      id="x-console"
      role="region"
      aria-label="Product demo: a sample verification run"
    >
      <div className="x-c-bar">
        <span className="x-c-live font-medium">
          <i className="x-dot-live" aria-hidden />
          Live demo <small className="font-normal">sample run</small>
        </span>
        <div className="x-chips" role="radiogroup" aria-label="Focus a lane">
          <button type="button" className="x-chip x-all text-b4 font-medium" role="radio" aria-checked="true" data-f="">
            All lanes
          </button>
          <button type="button" className="x-chip text-b4 font-medium" role="radio" aria-checked="false" data-f="0" tabIndex={-1}>
            <i aria-hidden />
            <span>
              Web &amp; mobile<span className="x-lg"> app</span>
            </span>
          </button>
          <button type="button" className="x-chip text-b4 font-medium" role="radio" aria-checked="false" data-f="1" tabIndex={-1}>
            <i aria-hidden />
            <span>
              Chat &amp; voice<span className="x-lg"> agent</span>
            </span>
          </button>
          <button type="button" className="x-chip text-b4 font-medium" role="radio" aria-checked="false" data-f="2" tabIndex={-1}>
            <i aria-hidden />
            <span className="x-lg">Agent workflows</span>
            <span className="x-sh">Workflows</span>
          </button>
        </div>
        <span className="x-c-meta mono">
          <b>sample-store v2.14</b> <span id="x-c-run">run 1 of 2</span>
        </span>
      </div>

      <div className="x-c-grid" id="x-c-grid">
        <div className="x-agents" aria-label="Verification agents">
          {[
            ["x-a-plan", "P", "Planner"],
            ["x-a-author", "A", "Author"],
            ["x-a-exec", "E", "Executor"],
            ["x-a-analyse", "An", "Analyst"],
          ].map(([c, g, n]) => (
            <div key={n} className={`x-agent ${c}`}>
              <div className="x-agent-h">
                <span className="x-glyph mono text-b5" aria-hidden>
                  {g}
                </span>
                <span className="text-b3 font-medium">{n}</span>
                <span className="x-agent-s mono text-b5">idle</span>
              </div>
              <div className="x-agent-d mono text-b5">waiting</div>
              <div className="x-agent-bar">
                <i />
              </div>
            </div>
          ))}
        </div>

        <article className="x-lane" aria-label="Human to app check">
          <div className="x-lane-h">
            <span className="text-b3 font-medium">Human ↔ App</span>
            <span className="x-lane-p mono text-b5">Kane CLI</span>
          </div>
          <p className="x-lane-t mono text-b4">
            web / <b>guest checkout</b>
          </p>
          <ul className="x-steps mono text-b4">
            {["Open /cart as a guest", "Apply code WELCOME10", "Pay with a test card", "Order total matches cart"].map((s) => (
              <li key={s}>
                <i className="x-ic" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="x-verdict">
            <div className="x-vd text-b4 mono">
              <span>waiting for run</span>
            </div>
          </div>
        </article>

        <article className="x-lane" aria-label="Human to agent check">
          <div className="x-lane-h">
            <span className="text-b3 font-medium">Human ↔ Agent</span>
            <span className="x-lane-p mono text-b5">Agent Testing</span>
          </div>
          <p className="x-lane-t mono text-b4">
            voice / <b>refund-bot</b>
          </p>
          <div className="x-wave" aria-hidden />
          <div className="x-bubbles text-b4">
            <div className="x-bub u">My order arrived broken. I want a refund.</div>
            <div className="x-bub b" id="x-bot-line">
              Sorry about that. Full refund done, plus a $50 credit.
            </div>
            <div className="x-bub e text-b4 mono" id="x-eval-line">
              evaluator: checking refund policy
            </div>
          </div>
          <div className="x-verdict">
            <div className="x-vd text-b4 mono">
              <span>waiting for run</span>
            </div>
          </div>
        </article>

        <article className="x-lane" aria-label="Agent to agent check">
          <div className="x-lane-h">
            <span className="text-b3 font-medium">Agent ↔ Agent</span>
            <span className="x-lane-p mono text-b5">Rook</span>
          </div>
          <p className="x-lane-t mono text-b4">
            tool calls / <b>support → payments</b>
          </p>
          <svg className="x-graph" viewBox="0 0 300 50" width="300" height="50" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <rect x="1" y="11" width="112" height="28" />
            <text x="57" y="29" textAnchor="middle">support-agent</text>
            <rect x="187" y="11" width="112" height="28" />
            <text x="243" y="29" textAnchor="middle">payments-agent</text>
            <line className="edge" x1="113" y1="25" x2="187" y2="25" />
            <circle className="pkt" id="x-pkt" cx="0" cy="25" r="3.5" opacity="0" />
          </svg>
          <ul className="x-steps mono text-b4">
            {["lookup_order(4471)", "issue_refund(order, amount)", "notify_customer(order)"].map((s) => (
              <li key={s}>
                <i className="x-ic" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="x-verdict">
            <div className="x-vd text-b4 mono">
              <span>waiting for run</span>
            </div>
          </div>
        </article>
      </div>

      <div className="x-c-foot">
        <div className="x-log mono text-b4" id="x-log" aria-hidden />
        <div className="x-seal">
          <div className="x-ev mono text-b4">
            <div className="x-ev-h">
              <span id="x-ev-name">.evidence</span>
              <span className="hash" id="x-ev-hash">
                not sealed
              </span>
            </div>
            <div className="x-ev-bar">
              <i id="x-ev-bar" />
            </div>
          </div>
          <div className="x-gate" id="x-gate" role="status">
            <i className="lamp" aria-hidden />
            <div>
              <div className="gt text-b3 font-medium" id="x-gate-t">
                Release gate
              </div>
              <div className="gs mono text-b5" id="x-gate-s">
                waiting for verdicts
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="x-tl mono text-b5">
        <button className="x-tl-btn" id="x-tl-play" type="button" aria-label="Pause demo">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <g id="x-ic-pause" fill="currentColor">
              <rect x="2" y="1" width="3" height="10" />
              <rect x="7" y="1" width="3" height="10" />
            </g>
            <path id="x-ic-play" d="M3 1.5v9l7-4.5z" fill="currentColor" display="none" />
          </svg>
        </button>
        <div className="x-tl-runs" role="group" aria-label="Choose run">
          <button type="button" className="mono text-b5" data-run="0" aria-pressed="true">
            Run 1
          </button>
          <button type="button" className="mono text-b5" data-run="1" aria-pressed="false">
            Run 2, after fix
          </button>
        </div>
        <div className="x-track" id="x-track" role="slider" tabIndex={0} aria-label="Scrub demo timeline" aria-valuemin={0} aria-valuemax={12} aria-valuenow={0}>
          <i className="seg sg1" />
          <span className="lbl lb1">plan</span>
          <i className="seg sg2" />
          <span className="lbl lb2">author</span>
          <i className="seg sg3" />
          <span className="lbl lb3">execute</span>
          <i className="seg sg4" />
          <span className="lbl lb4">analyse</span>
          <i className="fill" id="x-tl-fill" />
          <i className="head" id="x-tl-head" />
        </div>
        <span className="x-tl-t" id="x-tl-t">
          0.0s
        </span>
      </div>
    </div>
  );
}

/* ---------------- proof ---------------- */

/* blank space each logo file carries on its left and right, as a share of
   its height (measured from the SVGs), so the row's outer logos can sit
   on the text line and the frame's right edge */
const LOGO_PAD: Record<string, [number, number]> = {
  microsoft: [19.8 / 60, 19.9 / 60],
  openai: [22.8 / 60, 22.3 / 60],
  nvidia: [17.7 / 60, 17.7 / 60],
  boomi: [33.4 / 60, 33.3 / 60],
  github: [20.4 / 60, 20.4 / 60],
  "best-egg": [15.9 / 60, 16.7 / 60],
  workday: [30.7 / 60, 32 / 60],
  akamai: [30.8 / 60, 30.8 / 60],
  lv: [19.9 / 59, 20.4 / 59],
  nbcuniversal: [11.2 / 59, 11.2 / 59],
  "city-furniture": [34.7 / 60, 34.7 / 60],
  cox: [36.5 / 60, 36.5 / 60],
  transavia: [15.9 / 59, 15.9 / 59],
  "estee-lauder": [15.9 / 59, 15.9 / 59],
  tripadviosr: [9 / 60, 9 / 60],
  bohoo: [24 / 59, 28 / 59],
};

const RESULTS = [
  {
    n: "78%",
    who: "Boomi",
    text: "cut test run time by 78% on HyperExecute.",
    quote: "We have tripled our tests and are now executing tests in less than 2 hours.",
    cite: "Hrishi Potdar, Boomi",
  },
  { n: "99.9%", who: "Dashlane", text: "reduced flaky tests by 99.9%." },
  { n: "70%", who: "Transavia", text: "runs its tests 70% faster." },
];

function Proof10() {
  return (
    <Section>
      <Reveal>
        <h3 className="max-w-[30em] text-foreground [text-wrap:balance]">
          18,000+ enterprises and 3M+ users in 132 countries have run 1.5B+
          tests on TestMu AI.
        </h3>
      </Reveal>
      <Reveal delay={0.06}>
        {/* two rows of eight: the first logo starts on the text line and the
            last one ends on the frame's right edge */}
        <div className="mt-12 flex flex-col gap-12 border-y border-border py-10">
          {[trustedBy.logos.slice(0, 8), trustedBy.logos.slice(8)].map((row, r) => (
            <div
              key={r}
              className="x-logo-row grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-4 lg:flex lg:justify-between lg:gap-0"
            >
              {row.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="logo-ink h-12 w-auto max-w-[150px] md:h-14"
                  style={
                    {
                      "--pl": LOGO_PAD[logo.name]?.[0] ?? 0,
                      "--pr": LOGO_PAD[logo.name]?.[1] ?? 0,
                    } as React.CSSProperties
                  }
                  loading="lazy"
                />
              ))}
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="tm-join mt-12 [--tm-pad:32px]">
          {RESULTS.map((r) => (
            <figure key={r.who} className="x-res m-0">
              <b className="pixel text-[48px] font-normal leading-none tracking-tight">{r.n}</b>
              <p className="mt-4 text-b2 text-muted-foreground">
                <strong className="font-medium text-foreground">{r.who}</strong> {r.text}
              </p>
              {r.quote && (
                <blockquote className="m-0">
                  <q className="text-b1 font-medium text-foreground">{r.quote}</q>
                  <cite className="mt-2 block text-b3 not-italic text-muted-foreground">{r.cite}</cite>
                </blockquote>
              )}
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- where are you starting ---------------- */

const PATHS = [
  {
    title: "Startup: give your coding agent a tester",
    steps: [
      ["Install Kane CLI", "Sign in with OAuth."],
      ["Describe a flow", "Kane runs it."],
      ["Gate on the exit code", "1 files a bug."],
    ],
    cta: "Start free",
    note: "Needs Node 18+.",
  },
  {
    title: "Growing team: a verdict on every pull request",
    steps: [
      ["Keep your suites", "Run them on HyperExecute."],
      ["Add the GitHub Action", "Kane CLI posts the verdict."],
      ["Test your agents", "With Agent Testing and Rook."],
    ],
    cta: "Compare plans",
    note: "Paid plans from $17/mo.",
  },
  {
    title: "Enterprise: one release gate for every team",
    steps: [
      ["Cover every lane", "Apps and agents."],
      ["Choose where data lives", "US, EU or on-prem."],
      ["Connect identity", "SAML SSO and SCIM."],
    ],
    cta: "Book a demo",
    note: "Your inputs and outputs never train any LLM.",
  },
];

function Seg() {
  return (
    <div className="tm-seg" role="group" aria-label="Your team" data-seg>
      {["Startup", "Growing team", "Enterprise"].map((s, i) => (
        <button key={s} type="button" aria-pressed={i === 0} tabIndex={i === 0 ? 0 : -1}>
          {s}
        </button>
      ))}
    </div>
  );
}

function Route10() {
  return (
    <Section id="start">
      <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal>
          <h2 className="mb-8 [text-wrap:balance]">Where are you starting?</h2>
          <Seg />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="border border-border bg-surface p-[var(--tm-pad)] [--tm-pad:32px]">
            {PATHS.map((p, i) => (
              <div key={p.title} className="x-path" hidden={i !== 0}>
                <h4 className="mb-6 [text-wrap:balance]">{p.title}</h4>
                <ol className="tm-join x-seg-steps m-0 list-none">
                  {p.steps.map(([b, s]) => (
                    <li key={b} className="text-b3 text-muted-foreground">
                      <b className="block text-b2 font-medium text-foreground">{b}</b>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button className="btn btn-lg btn-primary">{p.cta}</button>
                  <small className="text-b3 text-muted-foreground">{p.note}</small>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- everything you can test ---------------- */

const HUB: { k: string; c: string; items: [string, string][] }[] = [
  {
    k: "Apps people use",
    c: "x-c-author",
    items: [
      ["AI test automation", "KaneAI turns plain English into end-to-end tests and replays them deterministically."],
      ["AI testing agent for the terminal", "Kane CLI: browser tests your coding agent writes and runs in CI."],
      ["Cross browser testing", "Manual and automated tests on 3,000+ browsers."],
      ["Real device testing", "Real Device Cloud: 50,000+ real mobile devices."],
      ["Visual regression testing", "SmartUI compares screenshots against an approved baseline."],
      ["Accessibility testing", "Finds accessibility issues in sites and apps."],
    ],
  },
  {
    k: "AI agents",
    c: "x-c-exec",
    items: [
      ["AI agent testing", "Agent Testing covers chatbot, voice agent and IVR testing with simulated customers."],
      ["AI assurance for agent workflows", "Agent Assurance (Rook) tests agents that call tools and other agents."],
      ["Browsers for AI agents", "Browser Cloud: cloud browsers your agents drive through Playwright."],
    ],
  },
  {
    k: "Run and manage",
    c: "x-c-analyse",
    items: [
      ["Test orchestration", "HyperExecute runs Selenium, Playwright, Cypress and Appium up to 70% faster than a traditional grid."],
      ["Test case management", "Test Manager: manual and automated test cases in one place."],
      ["Test analytics", "Test Insights puts results from every TestMu AI product in one view."],
    ],
  },
];

function Hub10() {
  return (
    <Section id="products">
      <Reveal className="mb-12">
        <h2 className="[text-wrap:balance]">
          <span className="block text-muted-foreground">Everything you can test</span>
          <span className="block">with TestMu AI</span>
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="tm-join [--tm-pad:32px]">
          {HUB.map((col) => (
            <div key={col.k}>
              <p className={`flex items-center gap-2 ${LABEL}`}>
                <i className={`inline-block h-2 w-2 ${col.c}`} aria-hidden />
                {col.k}
              </p>
              <ul className="mt-4 list-none p-0">
                {col.items.map(([t, d]) => (
                  <li key={t} className="border-b border-border py-5 last:border-b-0">
                    <a href="#" className="group inline-flex items-center gap-1 text-foreground no-underline">
                      <h5 className="m-0">{t}</h5>
                      <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <p className="mt-2 text-b3 text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- the three-chapter story ---------------- */

const PRS = [
  ["A1", "One-tap checkout"],
  ["A2", "Refund-bot: new cancellation policy"],
  ["A1", "Returns agent calls carrier API"],
  ["A3", "Upgrade payments SDK"],
  ["A2", "Voice line hands off to a person"],
];
const LEDGER: [string, string, "p" | "f" | "u", string, string][] = [
  ["09:41", "Checkout journeys", "p", "Pass", "7a1e…04bc"],
  ["09:44", "Refund-bot, voice", "f", "Fail", "c90d…7f31"],
  ["09:46", "Returns handoff", "u", "Unable to verify", "2be4…9a0e"],
  ["10:12", "Refund-bot, after fix", "p", "Pass", "e55f…13d8"],
  ["10:19", "Returns handoff, re-run", "p", "Pass", "81c2…b6f4"],
];

function Chapter({
  n,
  tone,
  bg,
  title,
  body,
  children,
}: {
  n: number;
  tone: "dark" | "light";
  bg: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article className="x-chap" data-tone={tone}>
      <div className={`x-chap-bg ${bg}`} aria-hidden />
      <div className="x-pin">
        <div className="x-chap-copy">
          <p className="mono mb-4 text-b4 opacity-75">{n} of 3</p>
          <h2 className="mb-6 [text-wrap:balance]">{title}</h2>
          <p className="max-w-[26em] text-b1">{body}</p>
        </div>
        {children}
      </div>
    </article>
  );
}

function Story10() {
  return (
    <section className="x-story" id="x-story" aria-label="How TestMu AI works">
      <div className="x-story-bg" aria-hidden>
        <div className="x-bg-night" />
        <div className="x-bg-dawn" id="x-s-dawn">
          <div className="x-sun" id="x-sun" />
        </div>
        <div className="x-bg-day" id="x-s-day" />
        <ol className="x-rail text-b4 font-medium" id="x-rail">
          {["AI builds it", "TestMu verifies it", "You keep the evidence"].map((s, i) => (
            <li key={s} className={i === 0 ? "on" : ""}>
              <i>
                <b />
              </i>
              {s}
            </li>
          ))}
        </ol>
      </div>

      <Chapter n={1} tone="dark" bg="x-bg-night" title="AI builds it." body="Coding agents open pull requests faster than you can review them. Often the only check is the agent that wrote the change.">
        <div className="x-panel text-b3">
          <div className="x-p-head text-b4 font-medium">
            Merge queue <span className="sm font-normal">sample run</span>
            <span className="t mono">today</span>
          </div>
          <ul className="x-prs" id="x-prs">
            {PRS.map(([a, t]) => (
              <li key={t}>
                <span className="av mono text-b5">{a}</span>
                <span className="nm font-medium">
                  {t}
                  <small className="mono text-b5 font-normal">coding agent</small>
                </span>
                <span className="x-pchip text-b5 font-medium">Merged</span>
              </li>
            ))}
          </ul>
          <div className="x-gap">
            <b id="x-gapn">47</b>
            <span className="text-b4 font-medium">changes this week that only their builder checked</span>
          </div>
        </div>
      </Chapter>

      <Chapter n={2} tone="dark" bg="x-bg-dawn" title="TestMu verifies it." body="Separate agents test the release on real devices and browsers, and talk to your AI agents like customers do.">
        <div className="x-panel text-b4">
          <div className="x-p-head font-medium">
            Same release, two reports <span className="sm font-normal">sample run</span>
          </div>
          <div className="x-two">
            <div className="x-rep self">
              <p className="x-rep-t text-b3 font-medium">The builder's own check</p>
              <p className="rep-by mono text-b5">coding agent</p>
              <ul>
                {["Unit tests pass", "Lint and types clean", "Self-review: looks good"].map((s) => (
                  <li key={s}>
                    <i className="p text-b5">ok</i>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="end font-medium">Ready to merge</p>
            </div>
            <div className="x-rep tm">
              <p className="x-rep-t text-b3 font-medium">TestMu AI, independent</p>
              <p className="rep-by mono text-b5">KaneAI, Agent Testing, Rook</p>
              <ul>
                <li>
                  <i className="p text-b5">pass</i>Checkout on 4 browsers, 2 phones
                </li>
                <li>
                  <i className="f text-b5">fail</i>Refund-bot offers credit above policy
                </li>
                <li>
                  <i className="u text-b5">unable</i>Carrier sandbox down, not guessed
                </li>
              </ul>
              <p className="end font-medium">Release held, bug filed</p>
            </div>
          </div>
          <p className="x-indep font-medium">
            <Check size={16} strokeWidth={1.5} aria-hidden />
            The builder never grades its own work. Your evals still run.
          </p>
        </div>
      </Chapter>

      <Chapter n={3} tone="light" bg="x-bg-day" title="You keep the evidence." body="Every run keeps steps, screenshots, video, logs and a verdict, ready for your release gate and your auditor.">
        <div className="x-panel light text-b3">
          <div className="x-p-head text-b4 font-medium">
            Evidence ledger <span className="sm font-normal">sample run</span>
            <span className="t mono">release v2.14</span>
          </div>
          <table className="x-ledger">
            <thead>
              <tr className="text-b4">
                <th scope="col">Time</th>
                <th scope="col">Run</th>
                <th scope="col">Verdict</th>
                <th scope="col" className="x-hide-m">
                  Sealed
                </th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map(([t, r, k, v, h]) => (
                <tr key={t} className="r">
                  <td className="mono text-b4 text-muted-foreground">{t}</td>
                  <td>{r}</td>
                  <td>
                    <span className={`x-vt ${k} font-medium`}>{v}</span>
                  </td>
                  <td className="x-hide-m">
                    <span className="hash mono text-b4">
                      <Lock size={16} strokeWidth={1.5} aria-hidden />
                      {h}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="x-gate2" id="x-gate2">
            <span className="sw" aria-hidden />
            <span>
              <b id="x-g2b">Release gate: held</b>
              <span className="sub text-b4" id="x-g2s">
                Waiting on verdicts
              </span>
            </span>
            <code className="mono text-b4" id="x-g2c">
              blocked
            </code>
          </div>
          <a className="x-evlink text-b3 font-medium" href="#">
            <Lock size={16} strokeWidth={1.5} aria-hidden />
            Kane CLI saves each run as a .evidence file you can open later.
          </a>
        </div>
      </Chapter>
    </section>
  );
}

/* ---------------- terminal and CI ---------------- */

const PROMPT =
  "Read https://www.testmuai.com/llms.txt. Install Kane CLI with npm install -g @testmuai/kane-cli and run kane-cli login --oauth, then ask me to approve the sign-in. Write a plain-English test for our checkout flow, run it with kane-cli testrun run --headless, and report the exit code and the .evidence path. Ask me before choosing any paid plan.";

function Dev10() {
  return (
    <section className="x-dev relative z-[1] px-5 py-24 sm:px-8 md:py-32" id="developers">
      <div className={`${FRAME} grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20`}>
        <div>
          <h2 className="[text-wrap:balance]">
            <span className="block text-[color:var(--tm-fg-inverse-muted)]">Run AI tests from</span>
            <span className="block">your terminal and CI</span>
          </h2>
          <p className="mb-8 mt-6 max-w-[28em] text-b1 text-[color:var(--tm-fg-inverse-muted)]">
            One command runs your tagged tests in parallel and returns an exit
            code for CI or your coding agent.
          </p>
          <ul className="x-codes mono text-b4 m-0 mb-8 grid max-w-[420px] list-none grid-cols-2 gap-px border border-[color:var(--tm-bg-inverse-muted)] bg-[color:var(--tm-bg-inverse-muted)] p-0" aria-label="Kane CLI exit codes">
            {[
              ["0", "pass"],
              ["1", "fail"],
              ["2", "setup or sign-in"],
              ["3", "timeout"],
            ].map(([c, s]) => (
              <li key={c} data-c={c} className={c === "0" ? "on" : ""}>
                <b>{c}</b>
                {s}
              </li>
            ))}
          </ul>
          <div className="x-prompt">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-b2 font-medium">Paste this to your coding agent</p>
              <button className="btn btn-sm btn-outline-inverse" type="button" data-copy-from="x-agent-prompt">
                Copy prompt
              </button>
            </div>
            <p id="x-agent-prompt" className="mono text-b4 text-[color:var(--tm-fg-inverse-muted)]">
              {PROMPT}
            </p>
          </div>
        </div>

        <div className="x-term" id="x-term">
          <div className="x-term-bar">
            <span className="d" />
            <span className="d" />
            <span className="d" />
            <div className="x-tabs text-b3" role="tablist" aria-label="Ways to run">
              <button role="tab" id="x-t-term" aria-controls="x-p-term" aria-selected="true">
                Terminal
              </button>
              <button role="tab" id="x-t-gh" aria-controls="x-p-gh" aria-selected="false" tabIndex={-1}>
                GitHub Actions
              </button>
              <button role="tab" id="x-t-mcp" aria-controls="x-p-mcp" aria-selected="false" tabIndex={-1}>
                MCP
              </button>
            </div>
          </div>
          <div className="x-pane text-b4" id="x-p-term" role="tabpanel" aria-labelledby="x-t-term" tabIndex={0}>
            <button className="btn btn-sm btn-outline-inverse x-copy" type="button" data-copy="npm install -g @testmuai/kane-cli">
              Copy install
            </button>
            <pre id="x-term-out" aria-live="off" />
          </div>
          <div className="x-pane text-b4" id="x-p-gh" role="tabpanel" aria-labelledby="x-t-gh" tabIndex={0} hidden>
            <button className="btn btn-sm btn-outline-inverse x-copy" type="button" data-copy-from="x-gh-yaml">
              Copy
            </button>
            <pre id="x-gh-yaml">
              <span className="c"># .github/workflows/verify.yml</span>
              {"\n"}
              <span className="k">on</span>: [pull_request]{"\n"}
              <span className="k">permissions</span>:{"\n"}
              {"  "}
              <span className="k">contents</span>: read{"\n"}
              {"  "}
              <span className="k">pull-requests</span>: write{"\n"}
              <span className="k">jobs</span>:{"\n"}
              {"  "}
              <span className="k">verify</span>:{"\n"}
              {"    "}
              <span className="k">runs-on</span>: ubuntu-latest{"\n"}
              {"    "}
              <span className="k">steps</span>:{"\n"}
              {"      - "}
              <span className="k">uses</span>: actions/checkout@v4{"\n"}
              {"      - "}
              <span className="k">uses</span>: <span className="s">testmuai/kane-cli/github-action@main</span>
              {"\n"}
              {"        "}
              <span className="k">with</span>:{"\n"}
              {"          "}
              <span className="k">test-files</span>: <span className="s">"tests/**/*_test.md"</span>
              {"\n"}
              {"          "}
              <span className="k">username</span>: {"${{ secrets.TM_USERNAME }}"}
              {"\n"}
              {"          "}
              <span className="k">access-key</span>: {"${{ secrets.TM_ACCESS_KEY }}"}
            </pre>
            <div className="x-ghs text-b4" id="x-ghs">
              <i aria-hidden />
              <span id="x-ghs-t">verify / kane-cli: passed, verdict posted to the pull request</span>
              <code className="mono" id="x-ghs-c">
                exit 0
              </code>
            </div>
          </div>
          <div className="x-pane text-b4" id="x-p-mcp" role="tabpanel" aria-labelledby="x-t-mcp" tabIndex={0} hidden>
            <button className="btn btn-sm btn-outline-inverse x-copy" type="button" data-copy="claude mcp add --transport http mcp-testmu https://mcp.testmuai.com/mcp">
              Copy
            </button>
            <pre>
              <span className="p">$ </span>claude mcp add --transport http mcp-testmu \{"\n"}
              {"    "}https://mcp.testmuai.com/mcp{"\n"}
              <span className="c"># Works in Cursor, Claude Code, Copilot, Codex and Antigravity.</span>
              {"\n"}
              <span className="c"># Tools cover HyperExecute, automation logs,</span>
              {"\n"}
              <span className="c"># accessibility and SmartUI. Sign-in is OAuth.</span>
              {"\n\n"}
              <span className="p">$ </span>npm install -g @testmuai/rook@latest{"\n"}
              <span className="c"># Rook maps what your agent can do, then tests and judges it.</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- pricing ---------------- */

const PLANS = [
  {
    tag: "Fits startups",
    name: "Free",
    price: "$0",
    pre: "",
    post: "",
    for: "Try it on a real project first.",
    list: ["KaneAI free tier", "10,000 Kane CLI credits for 30 days", "300 HyperExecute minutes"],
    cta: "Start free",
  },
  {
    tag: "Fits growing teams",
    name: "Paid plans",
    price: "$17",
    pre: "From",
    post: "/mo",
    for: "A verdict and evidence on every pull request.",
    list: ["KaneAI from $17/mo", "Agent Assurance from $44/mo", "HyperExecute and real devices"],
    cta: "See all prices",
  },
  {
    tag: "Fits enterprises",
    name: "Enterprise",
    price: "Custom",
    pre: "",
    post: "",
    for: "One release gate for all your apps and agents.",
    list: ["SAML SSO, SCIM, SOC 2 Type II, ISO 27001", "US or EU data residency", "Private cloud or on-prem"],
    cta: "Book a demo",
  },
];

function Plans10() {
  return (
    <Section id="pricing">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="[text-wrap:balance]">TestMu AI pricing</h2>
          <p className="mt-4 text-b1 text-muted-foreground">Billed annually. Pick where you are starting.</p>
        </div>
        <Seg />
      </Reveal>
      <Reveal delay={0.06}>
        <div className="tm-join [--tm-pad:32px]">
          {PLANS.map((p) => (
            <article key={p.name} className="x-plan">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h5 className="m-0">{p.name}</h5>
                <span className="x-tag tm-lbl tm-lbl--sm">{p.tag}</span>
              </div>
              <p className="m-0 flex items-baseline gap-2 text-[32px] font-medium leading-[40px] tracking-[-1px]">
                {p.pre && <small className="text-b3 font-normal tracking-normal text-muted-foreground">{p.pre}</small>}
                {p.price}
                {p.post && <small className="text-b3 font-normal tracking-normal text-muted-foreground">{p.post}</small>}
              </p>
              <p className="mb-6 mt-2 text-b2 text-muted-foreground">{p.for}</p>
              <ul className="m-0 mb-8 grid list-none gap-3 border-t border-border p-0 pt-6 text-b3">
                {p.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <button className="btn btn-lg btn-secondary mt-auto w-full justify-center">{p.cta}</button>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- questions ---------------- */

const FAQ = [
  {
    q: "What is TestMu AI?",
    a: "TestMu AI is an AI testing platform for apps and AI agents. KaneAI and Kane CLI test web and mobile apps. Agent Testing tests chat and voice agents, and Agent Assurance (Rook) tests agent-to-agent workflows. Tests run on HyperExecute, 50,000+ real devices and 3,000+ browsers.",
  },
  {
    q: "Is TestMu AI the same as LambdaTest?",
    a: "Yes. LambdaTest renamed itself TestMu AI on January 12, 2026. Existing products such as HyperExecute, SmartUI and the Real Device Cloud carried over under the new name. The platform now also tests AI agents, with Agent Testing and Agent Assurance.",
  },
  {
    q: "How do you test AI agents?",
    a: "From the outside, the way customers and other agents meet them. Agent Testing sends simulated callers to chat, voice, phone and IVR agents, and 15+ evaluator agents score each conversation. Rook maps what an agent can do, writes adversarial tests against it and reports each check as pass, fail or unable to verify.",
  },
  {
    q: "Does TestMu AI replace evals?",
    a: "No, it complements them. Evals score a model while you build it. TestMu AI tests the shipped app or agent from the outside, including the tools it calls, using agents that did not write the code. Run evals during development and TestMu AI before and after each release.",
  },
  {
    q: "How much does TestMu AI cost?",
    a: "You can start free. KaneAI has a free tier, Kane CLI includes 10,000 credits for 30 days and HyperExecute includes 300 free minutes. Paid plans are billed annually and start at $17/mo for KaneAI and $44/mo for Agent Assurance. Enterprise pricing is custom.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "No. Your inputs and outputs are never used to train any LLM. TestMu AI holds SOC 2 Type II and ISO 27001, supports GDPR, SAML SSO and SCIM, and offers US or EU data residency. Enterprise plans can also run in a private cloud or on-prem.",
  },
  {
    q: "Can AI coding agents use TestMu AI?",
    a: "Yes. A coding agent can install Kane CLI or Rook from npm and connect the TestMu AI MCP server. It can read llms.txt and pricing.md for context. A person approves sign-in and any paid plan.",
  },
];

/* ---------------- the page ---------------- */

export default function Home10() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    return startHome10(root.current);
  }, []);
  return (
    <div className="h10" ref={root}>
      <Hero10 />
      <Proof10 />
      <Route10 />
      <Hub10 />
      <Story10 />
      <Dev10 />
      <Integrations />
      <Stories />
      <Plans10 />
      <Faq items={FAQ} />
      <Enterprise />
      <Footer />
    </div>
  );
}
