import { useEffect, useRef, useState } from "react";
import { Check, Lock } from "lucide-react";
import { ArrowChip, Reveal, Section, SlideArrow } from "../lib/ui";
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
          <p className="x-eyebrow text-b3 font-medium">When AI verifies AI</p>
          <div className="x-hero-top">
            {/* left: the headline with the two actions under it */}
            <div>
              <h1 className="x-h1" id="x-h1">
                <span>The AI testing platform</span>
                <span className="x-l2">for your apps and AI agents.</span>
              </h1>
              <div className="mt-10 flex flex-wrap gap-3">
                <button className="btn btn-lg btn-primary btn-arrow">
                  Start free with Google
                  <ArrowChip />
                </button>
                <button className="btn btn-lg btn-secondary btn-arrow btn-arrow-plain">
                  Book a demo
                  <ArrowChip />
                </button>
              </div>
            </div>
            {/* right: the description on top, the Gartner recognition level
                with the buttons */}
            <div className="flex flex-col justify-between gap-8">
              <p className="text-b1 text-foreground">
                TestMu AI (formerly LambdaTest) is an AI testing platform that
                tests web and mobile apps, chat and voice agents, and
                agent-to-agent workflows, then hands you the evidence.
              </p>
              <a href="#x-gartner-note" className="x-award group">
                <svg className="x-mq" width="40" height="40" viewBox="0 0 40 40" aria-hidden>
                  <rect className="x-mq-frame" x="0.5" y="0.5" width="39" height="39" />
                  <rect className="x-mq-lead" x="20" y="0.5" width="19.5" height="19.5" />
                  <line className="x-mq-axis" x1="20" y1="0" x2="20" y2="40" />
                  <line className="x-mq-axis" x1="0" y1="20" x2="40" y2="20" />
                  <circle className="x-mq-dot" cx="31" cy="9" r="3" />
                </svg>
                <span className="text-b3 text-foreground">
                  A Leader in the 2026 Gartner® Magic Quadrant™ for Agentic
                  Software Quality Assurance Platforms*
                </span>
              </a>
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

const CDN_LOGO = "https://assets.testmuai.com/resources/images/testmu-ai/trusted-user/";

/* the site's original sixteen customer logos. `pad` is the blank space each
   logo file carries on its left and right, as a share of its height
   (measured from the SVGs); trimming it lets the columns size to the
   logos themselves, so the first column starts on the text line and the
   last ends on the frame's right edge. */
const PROOF_LOGOS: { name: string; file: string; pad: [number, number] }[] = [
  { name: "Microsoft", file: "microsoft", pad: [19.8 / 60, 19.9 / 60] },
  { name: "OpenAI", file: "openai", pad: [22.8 / 60, 22.3 / 60] },
  { name: "NVIDIA", file: "nvidia", pad: [17.7 / 60, 17.7 / 60] },
  { name: "Boomi", file: "boomi", pad: [33.4 / 60, 33.3 / 60] },
  { name: "GitHub", file: "github", pad: [20.4 / 60, 20.4 / 60] },
  { name: "Best Egg", file: "best-egg", pad: [15.9 / 60, 16.7 / 60] },
  { name: "Workday", file: "workday", pad: [30.7 / 60, 32 / 60] },
  { name: "Akamai", file: "akamai", pad: [30.8 / 60, 30.8 / 60] },
  { name: "Louis Vuitton", file: "lv", pad: [19.9 / 59, 20.4 / 59] },
  { name: "NBCUniversal", file: "nbcuniversal", pad: [11.2 / 59, 11.2 / 59] },
  { name: "City Furniture", file: "city-furniture", pad: [34.7 / 60, 34.7 / 60] },
  { name: "Cox", file: "cox", pad: [36.5 / 60, 36.5 / 60] },
  { name: "Transavia", file: "transavia", pad: [15.9 / 59, 15.9 / 59] },
  { name: "Estée Lauder", file: "estee-lauder", pad: [15.9 / 59, 15.9 / 59] },
  { name: "Tripadvisor", file: "tripadviosr", pad: [9 / 60, 9 / 60] },
  { name: "boohoo", file: "bohoo", pad: [24 / 59, 28 / 59] },
];

const RESULTS = [
  {
    n: "78%",
    who: "Boomi",
    text: "cut test run time by 78% on HyperExecute.",
    quote: "We have tripled our tests and are now executing tests in less than 2 hours.",
    cite: "Hrishi Potdar, Boomi",
    href: "https://www.testmuai.com/customers/boomi/",
  },
  {
    n: "99.9%",
    who: "Dashlane",
    text: "reduced flaky tests by 99.9%.",
    quote: "HyperExecute is a stable test orchestration platform and has excellent customer support.",
    cite: "Sagar Uday Kumar, Dashlane",
    href: "https://www.testmuai.com/customers/dashlane/",
  },
  {
    n: "70%",
    who: "Transavia",
    text: "runs its tests 70% faster.",
    quote: "Their support and cost-effectiveness exceeded our expectations.",
    cite: "Daniel de Bruijn, Transavia",
    href: "https://www.testmuai.com/hyperexecute/",
  },
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
        {/* eight columns over two rows: each column is as wide as its
            widest logo, the columns spread edge to edge, and both rows
            share them, so the logos line up top and bottom */}
        <div className="x-logos mt-12 border-y border-border py-10">
          {PROOF_LOGOS.map((logo) => (
            <img
              key={logo.file}
              src={CDN_LOGO + logo.file + ".svg"}
              alt={logo.name}
              className="logo-ink h-12 w-auto md:h-14"
              style={{ "--pl": logo.pad[0], "--pr": logo.pad[1] } as React.CSSProperties}
              loading="lazy"
            />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        {/* each result is one link; number, line, quote and name sit on
            shared rows so the three read across as one band */}
        <div className="tm-join x-results mt-12 [--tm-pad:32px]">
          {RESULTS.map((r) => (
            <a key={r.who} href={r.href} className="x-res group text-foreground no-underline">
              <div className="flex items-start justify-between gap-4">
                <b className="pixel text-[48px] font-normal leading-none tracking-tight">{r.n}</b>
                <SlideArrow className="mt-2 text-foreground" />
              </div>
              <p className="text-b2 text-muted-foreground">
                <strong className="font-medium text-foreground">{r.who}</strong> {r.text}
              </p>
              <q className="text-b1 font-medium text-foreground">{r.quote}</q>
              <cite className="text-b3 not-italic text-muted-foreground">{r.cite}</cite>
            </a>
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
    cta: "Start for free",
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
    note: "Your inputs and outputs are never used to train any LLM models.",
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
                  <button className="btn btn-lg btn-primary btn-arrow btn-arrow-plain">
                    {p.cta}
                    <ArrowChip />
                  </button>
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

const P = ({ children }: { children: React.ReactNode }) => (
  <b className="font-medium text-foreground">{children}</b>
);
const U = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-foreground underline underline-offset-4">
    {children}
  </a>
);
/* an underlined text button inside a line of text: the underline is enough */
const TB = ({ children, className = "tm-tbtn--lg" }: { children: React.ReactNode; className?: string }) => (
  <a href="#" className={`tm-tbtn ${className}`}>
    {children}
  </a>
);

const HUB: { k: string; c: string; items: [string, React.ReactNode][] }[] = [
  {
    k: "Apps people use",
    c: "x-c-author",
    items: [
      ["AI test automation", <><P>KaneAI</P> turns plain English into end-to-end tests and replays them deterministically.</>],
      ["AI testing agent for the terminal", <><P>Kane CLI</P>: browser tests your coding agent writes and runs in CI.</>],
      ["Cross browser testing", "Manual and automated tests on 3,000+ browsers."],
      ["Real device testing", <><P>Real Device Cloud</P>: 50,000+ real mobile devices.</>],
      ["Visual regression testing", <><P>SmartUI</P> compares screenshots against an approved baseline.</>],
      ["Accessibility testing", "Finds accessibility issues in sites and apps."],
    ],
  },
  {
    k: "AI agents",
    c: "x-c-exec",
    items: [
      ["AI agent testing", <><P>Agent Testing</P> covers <U>chatbot testing</U>, <U>voice agent testing</U> and <U>IVR testing</U> with simulated customers.</>],
      ["AI assurance for agent workflows", <><P>Agent Assurance</P> (Rook) tests agents that call tools and other agents.</>],
      ["Browsers for AI agents", <><P>Browser Cloud</P>: cloud browsers your agents drive through Playwright.</>],
    ],
  },
  {
    k: "Run and manage",
    c: "x-c-analyse",
    items: [
      ["Test orchestration", <><P>HyperExecute</P> runs Selenium, Playwright, Cypress and Appium up to 70% faster than a traditional grid.</>],
      ["Test case management", <><P>Test Manager</P>: manual and automated test cases in one place.</>],
      ["Test analytics", <><P>Test Insights</P> puts results from every TestMu AI product in one view.</>],
    ],
  },
];

function Hub10() {
  return (
    <Section id="products">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="[text-wrap:balance]">
          <span className="block text-muted-foreground">Everything you can test</span>
          <span className="block">with TestMu AI</span>
        </h2>
        <p className="text-b2 text-muted-foreground">
          New to this? Read <TB>what AI testing is</TB> or compare <TB>AI testing tools</TB>.
        </p>
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
                      <h5 className="m-0 decoration-1 underline-offset-4 group-hover:underline">{t}</h5>
                      <SlideArrow />
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
  title: [string, string];
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article className="x-chap" data-tone={tone}>
      <div className={`x-chap-bg ${bg}`} aria-hidden />
      <div className="x-pin">
        <div className="x-chap-copy">
          <p className="mono mb-4 text-b3 opacity-75">{n} of 3</p>
          <h2 className="mb-6">
            <span className="block">{title[0]}</span>
            <span className="block">{title[1]}</span>
          </h2>
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
        <ol className="x-rail text-b2 font-medium" id="x-rail">
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

      <Chapter n={1} tone="dark" bg="x-bg-night" title={["AI", "builds it."]} body="Coding agents open pull requests faster than you can review them. Often the only check is the agent that wrote the change.">
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

      <Chapter n={2} tone="dark" bg="x-bg-dawn" title={["TestMu", "verifies it."]} body="Separate agents test the release on real devices and browsers, and talk to your AI agents like customers do.">
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

      <Chapter n={3} tone="light" bg="x-bg-day" title={["You keep", "the evidence."]} body="Every run keeps steps, screenshots, video, logs and a verdict, ready for your release gate and your auditor.">
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
          <a className="x-evlink text-b3 font-medium underline underline-offset-4" href="#">
            <Lock size={16} strokeWidth={1.5} aria-hidden />
            Kane CLI saves each run as a .evidence file you open at evidence.lambdatest.com.
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
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[color:var(--tm-bg-inverse-muted)] pt-6 text-b2 text-[color:var(--tm-fg-inverse-muted)]">
            <button type="button" className="btn btn-lg btn-inverse btn-arrow btn-arrow-plain">
              Start for free
              <ArrowChip />
            </button>
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
              <span className="k">uses</span>: <span className="s">LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run@main</span>
              {"\n"}
              {"        "}
              <span className="k">with</span>:{"\n"}
              {"          "}
              <span className="k">test-files</span>: <span className="s">"tests/**/*_test.md"</span>
              {"\n"}
              {"          "}
              <span className="k">username</span>: {"${{ secrets.LT_USERNAME }}"}
              {"\n"}
              {"          "}
              <span className="k">access-key</span>: {"${{ secrets.LT_ACCESS_KEY }}"}
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
            <button className="btn btn-sm btn-outline-inverse x-copy" type="button" data-copy="claude mcp add --transport http mcp-lambdatest https://mcp.lambdatest.com/mcp">
              Copy
            </button>
            <pre>
              <span className="p">$ </span>claude mcp add --transport http mcp-lambdatest \{"\n"}
              {"    "}https://mcp.lambdatest.com/mcp{"\n"}
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
    cta: "Start for free",
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
      <Reveal className="mb-24 flex flex-wrap items-end justify-between gap-6">
        <h2 className="[text-wrap:balance]">TestMu AI pricing</h2>
        <Seg />
      </Reveal>
      <Reveal delay={0.06}>
        <div className="tm-join [--tm-pad:32px]">
          {PLANS.map((p) => (
            <article key={p.name} className="x-plan">
              <span className="x-tag text-b3 font-medium">{p.tag}</span>
              <h5 className="m-0 mb-4">{p.name}</h5>
              <p className="m-0 flex items-baseline gap-2">
                {p.pre && <small className="text-b3 font-normal tracking-normal text-muted-foreground">{p.pre}</small>}
                <span className="text-[48px] font-medium leading-[58px] tracking-[-2px]">{p.price}</span>
                {p.post && <small className="text-b3 font-normal tracking-normal text-muted-foreground">{p.post}</small>}
              </p>
              <p className="mb-6 mt-2 text-b2 text-muted-foreground">{p.for}</p>
              <ul className="m-0 mb-8 grid list-none gap-3 border-t border-border p-0 pt-6 text-b3">
                {p.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <button className="btn btn-lg btn-secondary btn-arrow btn-arrow-plain mt-auto w-full justify-center">
                {p.cta}
                <ArrowChip />
              </button>
            </article>
          ))}
        </div>
      </Reveal>
      <p className="mt-6 text-b2 text-muted-foreground">
        Billed annually. Full list: <TB>pricing</TB> or <TB>pricing.md</TB>.
      </p>
    </Section>
  );
}

/* ---------------- questions ---------------- */

const FAQ = [
  {
    q: "What is TestMu AI?",
    a: "TestMu AI is an AI testing platform for apps and AI agents, made by LambdaTest, Inc. KaneAI and Kane CLI test web and mobile apps. Agent Testing tests chat and voice agents, and Agent Assurance (Rook) tests agent-to-agent workflows. Tests run on HyperExecute, 50,000+ real devices and 3,000+ browsers.",
  },
  {
    q: "Is TestMu AI the same as LambdaTest?",
    a: "Yes. LambdaTest renamed itself TestMu AI on January 12, 2026. The company is still LambdaTest, Inc., and existing products such as HyperExecute, SmartUI and the Real Device Cloud carried over under the new name. The platform now also tests AI agents, with Agent Testing and Agent Assurance.",
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
    a: "You can start free. KaneAI has a free tier, Kane CLI includes 10,000 credits for 30 days and HyperExecute includes 300 free minutes. Paid plans are billed annually and start at $17/mo for KaneAI and $44/mo for Agent Assurance. Enterprise pricing is custom, and Agent Testing is priced with sales.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "No. Your inputs and outputs are never used to train any LLM models. TestMu AI holds SOC 2 Type II and ISO 27001, supports GDPR, SAML SSO and SCIM, and offers US or EU data residency. Enterprise plans can also run in a private cloud or on-prem.",
  },
  {
    q: "Can AI coding agents use TestMu AI?",
    a: "Yes. A coding agent can install Kane CLI with npm install -g @testmuai/kane-cli, or Rook with npm install -g @testmuai/rook@latest, and connect the MCP server at https://mcp.lambdatest.com/mcp. It can read /llms.txt and /pricing.md for context. A person approves sign-in and any paid plan.",
  },
];

/* the design's closing notes, set in the FAQ's two columns: the links
   for AI agents on the left, the Gartner note (the hero's asterisk) on
   the right */
const AGENT_LINKS = ["llms.txt", "This page as Markdown", "pricing.md", "MCP server"];

function SmallPrint() {
  return (
    <aside className="relative z-[1] border-t border-border px-5 sm:px-8" aria-label="Notes">
      <div className="mx-auto grid w-full max-w-[1240px] lg:grid-cols-[0.4fr_0.6fr]">
        <div className="px-8 py-12 md:px-16">
          <p className={LABEL}>For AI agents</p>
          <ul className="mt-4 list-none p-0">
            {AGENT_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className="tm-tbtn tm-tbtn--lg group py-1">
                  {l}
                  <SlideArrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border px-8 py-12 md:px-16 lg:border-l lg:border-t-0" id="x-gartner-note">
          <p className={LABEL}>Notes</p>
          <p className="mt-4 text-b2 text-muted-foreground">
            * Gartner, Magic Quadrant for Agentic Software Quality Assurance Platforms, Ross Power, Sushant Singhal, C.A. Swan, 12 October 2026. Gartner does not endorse any company, vendor, product or service depicted in its publications, and does not advise technology users to select only those vendors with the highest ratings or other designation. Gartner publications consist of the opinions of Gartner's business and technology insights organization and should not be construed as statements of fact. Gartner disclaims all warranties, expressed or implied, with respect to this publication, including any warranties of merchantability or fitness for a particular purpose. GARTNER and MAGIC QUADRANT are trademarks of Gartner, Inc. and/or its affiliates.
          </p>
          <p className="mt-4 text-b2 text-muted-foreground">Customer results are each customer's own. Demos show sample runs.</p>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- the ⌘K panel for agents ---------------- */

type PalItem = { ico: string; label: string; small: string; copy?: string; copyFrom?: string; page?: boolean; href?: string };
const PAL: PalItem[] = [
  { ico: "md", label: "Copy this page as Markdown", small: "for your LLM", page: true },
  { ico: "↳", label: "Copy a prompt for your coding agent", small: "Kane CLI", copyFrom: "x-agent-prompt" },
  { ico: "mcp", label: "Copy MCP server command", small: "mcp.lambdatest.com", copy: "claude mcp add --transport http mcp-lambdatest https://mcp.lambdatest.com/mcp" },
  { ico: "$", label: "Copy Kane CLI install", small: "npm", copy: "npm install -g @testmuai/kane-cli" },
  { ico: "$", label: "Copy Rook install", small: "npm", copy: "npm install -g @testmuai/rook@latest" },
  { ico: "txt", label: "Open llms.txt", small: "/llms.txt", href: "/llms.txt" },
  { ico: "md", label: "Open this page as Markdown", small: "/index.md", href: "/index.md" },
  { ico: "$", label: "Open pricing as Markdown", small: "/pricing.md", href: "/pricing.md" },
];

function pageMarkdown(root: HTMLElement) {
  const L = ["# TestMu AI (formerly LambdaTest): the AI testing platform for your apps and AI agents", ""];
  L.push(root.querySelector(".x-hero-top p.text-b1")?.textContent ?? "", "");
  root.querySelectorAll("#products .tm-join > div").forEach((col) => {
    L.push("## " + (col.querySelector("p")?.textContent ?? ""));
    col.querySelectorAll("li").forEach((li) => L.push(`- ${li.querySelector("h5")?.textContent}: ${li.querySelector("p")?.textContent}`));
    L.push("");
  });
  L.push("## FAQ");
  FAQ.forEach((f) => L.push("", "### " + f.q, "", f.a));
  return L.join("\n");
}

function Palette({ root }: { root: React.RefObject<HTMLDivElement | null> }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [act, setAct] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const say = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 1600);
  };
  const shown = PAL.filter((it) => !q.trim() || it.label.toLowerCase().includes(q.toLowerCase().trim()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-pal]")) setOpen(true);
    };
    const onToast = (e: Event) => say((e as CustomEvent<string>).detail);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("x-toast", onToast);
    return () => {
      window.removeEventListener("x-toast", onToast);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);
  useEffect(() => {
    if (open) {
      setQ("");
      setAct(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  const run = async (it: PalItem) => {
    if (it.href) {
      window.location.href = it.href;
      return;
    }
    const text = it.page
      ? pageMarkdown(root.current!)
      : it.copyFrom
        ? (document.getElementById(it.copyFrom)?.textContent ?? "")
        : (it.copy ?? "");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked */
    }
    setOpen(false);
    say(it.page ? "Page copied as Markdown" : "Copied to clipboard");
  };

  return (
    <>
      {open && (
        <div className="x-pal" role="dialog" aria-modal="true" aria-label="For agents" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="x-pal-box">
            <div className="x-pal-in">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                ref={input}
                type="text"
                className="text-b2"
                placeholder="Shortcuts for AI agents"
                aria-label="Filter commands"
                autoComplete="off"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setAct(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setAct((a) => (a + 1) % Math.max(shown.length, 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setAct((a) => (a - 1 + shown.length) % Math.max(shown.length, 1));
                  } else if (e.key === "Enter" && shown[act]) {
                    e.preventDefault();
                    run(shown[act]);
                  }
                }}
              />
              <kbd className="mono rounded-sm border border-current px-1 text-b5 opacity-60">esc</kbd>
            </div>
            <ul role="listbox" aria-label="Commands">
              {shown.map((it, i) => (
                <li key={it.label}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === act}
                    className={`x-pal-it text-b3 font-medium ${i === act ? "act" : ""}`}
                    onMouseEnter={() => setAct(i)}
                    onClick={() => run(it)}
                  >
                    <span className="ico mono text-b5">{it.ico}</span>
                    {it.label}
                    <small className="mono text-b5">{it.small}</small>
                  </button>
                </li>
              ))}
            </ul>
            <div className="x-pal-foot text-b4">
              <span>↑↓ to move</span>
              <span>↵ to run</span>
              <span>esc to close</span>
            </div>
          </div>
        </div>
      )}
      <div className={`x-toast text-b3 font-medium ${toast ? "on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

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
      <Plans10 />
      <Faq items={FAQ} title="Questions about TestMu AI" />
      <SmallPrint />
      <Palette root={root} />
      <Enterprise />
      <Footer />
    </div>
  );
}
