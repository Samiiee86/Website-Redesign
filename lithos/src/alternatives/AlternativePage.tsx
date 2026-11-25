import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { Check, Copy, SquareArrowOutUpRight } from "lucide-react";
import "../index.css";
import { ArrowChip, Section } from "../lib/ui";
import GuideLines from "../components/GuideLines";
import Header from "../components/Header";
import TrustedBy from "../sections/TrustedBy";
import Stories from "../sections/Stories";
import Faq from "../sections/Faq";
import Enterprise from "../sections/Enterprise";
import Footer from "../sections/Footer";
import CompareDuel from "../pieces/CompareDuel";
import SpecTable, { type SpecRow } from "../pieces/SpecTable";
import { FoldHead } from "../pieces/compare/parts";
import type { MatrixGroup } from "../pieces/compare/MatrixTable";

/* The "<rival> alternative" page, shared by every competitor page
   (browserstack-alternative, saucelabs-alternative, ...). Each page only
   brings its own words and data (an AltPage); the flow is the same:

   header, hero, logo wall, head to head, switch steps, other
   alternatives, Gartner banner, how we compared, customer stories,
   reviews, FAQ, enterprise call, footer.

   Shared folds come from the site (header, logo wall, stories, FAQ,
   enterprise, footer); the tables from the pieces library; the hero,
   steps, reviews and methodology from the kit. */

export type Review = {
  name: string;
  by: string;
  quote: string;
  img: string;
  url: string;
  /* where it was posted: X uses the kit's X mark, the rest their icon */
  on: "x" | { icon: string; label: string };
};

export type AltPage = {
  /* the other company, as it is written: "BrowserStack", "Sauce Labs" */
  rival: string;
  hero: {
    /* the H1, one line each */
    lines: [string, string];
    promise: string;
    /* the painted scene behind the picture */
    scene: string;
    /* the picture on the scene: an <img>, or <MigrateShot /> */
    screen: ReactNode;
  };
  duel: { lead: string; title: string; body: string; groups: MatrixGroup[] };
  /* the "switch over" description, and the page's own three steps when
     the move is not a hub change (mabl: export first) */
  switchBody: string;
  switchSteps?: Step[];
  /* the rival's pricing against TestMu AI's, when the rival quotes */
  pricing?: Pricing;
  /* when to choose which, as joined cards */
  choose?: Choose;
  alts: { lead: string; title: string; body: string; columns: string[]; rows: SpecRow[] };
  methodology: {
    body: string;
    stats: { label: string; value: string }[];
    /* two cards, so their edges meet the four numbers' lines */
    notes: { text: string; link: string; href: string }[];
  };
  /* lead defaults to "What reviewers say about" */
  reviews: { lead?: string; title: string; body: string; items: Review[] };
  faq: { q: string; a: ReactNode }[];
  enterprise: { title: string; body: string };
};


/* the Gartner answer every alternative page ends its FAQ with, carrying
   the full citation Gartner asks for */
export const gartnerFaq = {
    q: "Has Gartner recognized TestMu AI?",
    a: (
      <>
        Yes. TestMu AI is a Leader in the 2026 Gartner® Magic Quadrant™ for
        Agentic Software Quality Assurance Platforms. Read the report on our{" "}
        Gartner Magic Quadrant page.
        <span className="mt-4 block text-b3">
          Gartner, Magic Quadrant for Agentic Software Quality Assurance
          Platforms, By Ross Power, Sushant Singhal, C.A. Swan, 12 October
          2026. Gartner and Magic Quadrant are trademarks of Gartner, Inc.
          and/or its affiliates. Gartner does not endorse any company, vendor,
          product or service depicted in its publications, and does not advise
          technology users to select only those vendors with the highest
          ratings or other designation. Gartner publications consist of the
          opinions of Gartner's business and technology insights organization
          and should not be construed as statements of fact. Gartner disclaims
          all warranties, expressed or implied, with respect to this
          publication, including any warranties of merchantability or fitness
          for a particular purpose.
        </span>
      </>
    ),
  };

/* ---------- kit folds ---------- */

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* kit hero-media: the scene, with this page's picture on it */
function Hero({ hero }: { hero: AltPage["hero"] }) {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">{hero.lines[0]}</span>
            <span className="tm-nowrap">{hero.lines[1]}</span>
          </h1>
          <p className="tm-hero__promise">{hero.promise}</p>
        </div>
        <div className="tm-actions tm-hero__actions">
          <a className="tm-btn tm-btn--primary tm-btn--arrow" href="https://accounts.testmuai.com/register">
            Start free with Google
            <span className="tm-chip" aria-hidden="true">
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          </a>
          <a className="tm-btn tm-btn--secondary" href="https://accounts.testmuai.com/register">
            Start free with Email
          </a>
        </div>
        <div className="tm-hero__stage">
          <img className="tm-scene" src={hero.scene} alt="" />
          {/* the picture is see-through: it sits on the scene itself */}
          <div className="tm-hero__screen !overflow-visible !bg-transparent">
            {hero.screen}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews: the kit's reviews-plain fold ---------- */

function Source({ r }: { r: Review }) {
  return (
    <a href={r.url} target="_blank" rel="noreferrer" className="flex-none">
      {r.on === "x" ? (
        <svg className="tm-review__x" viewBox="0 0 24 24" aria-label="Posted on X">
          <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
        </svg>
      ) : (
        <img className="tm-review__x" src={r.on.icon} alt={r.on.label} loading="lazy" />
      )}
    </a>
  );
}

/* the third review is the wide cell */
function Reviews({ reviews }: { reviews: AltPage["reviews"] }) {
  return (
    <Section>
      <FoldHead lead={reviews.lead ?? "What reviewers say about"} title={reviews.title} body={reviews.body}>
        <a href="https://www.testmuai.com/reviews/" className="btn btn-lg btn-secondary mt-8">
          View all reviews
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4 tm-rvs tm-rvs--plain">
          {reviews.items.map((r, i) => (
            <article key={r.name} className={`tm-cell tm-rv ${i === 2 ? "tm-rv--wide" : ""}`}>
              <div className="tm-rv__body">
                {/* every quote, the wide one too, in B1 (18/28, regular), as on
                    the live site: the kit's 20px and 32px are off the type scale */}
                <blockquote className="!max-w-none !text-b1 !font-normal !tracking-normal">
                  “{r.quote}”
                </blockquote>
              </div>
              <div className="tm-rv__by">
                <img className="tm-rv__av" src={r.img} alt="" loading="lazy" />
                <div>
                  {r.name}
                  <span>{r.by}</span>
                </div>
                <Source r={r} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- switching: the move in three steps ----------

   Kit feature-steps cards. The hero already shows the code change, so
   these show the move itself: your keys, the first run, the results. Each
   is a small TestMu AI view on a painted scene (kit feature card media). */

export type Step = {
  title: string;
  body: string;
  scene: string;
  ui: "keys" | "export" | "run" | "results";
  /* the command the panel shows ("export" and "run") */
  cmd?: string;
  /* the "export" panel's name and done lines, when not a terminal */
  panel?: string;
  lines?: string[];
};

const steps: Step[] = [
  {
    title: "Get your keys",
    body: "Sign up free, then copy your username and access key from Account settings.",
    scene: "/kit/img/shore.webp",
    ui: "keys",
  },
  {
    title: "Point your tests at TestMu AI",
    body: "Change the hub URL and capabilities. Your runner and test logic stay as they are.",
    scene: "/kit/img/hills.webp",
    ui: "run",
  },
  {
    title: "See every result",
    body: "Your suite runs in parallel, with video, logs and screenshots for every test.",
    scene: "/kit/img/meadow.webp",
    ui: "results",
  },
];

/* ---------- Gartner CTA: the banner from Figma (Website, 17022:29139) ---------- */

/* Figma's display sizes, built from the type tokens: 128 = 2 x H1 + 16,
   36 = H3 x 9/8. The rings, line, chart and glow are Figma's own assets. */
const LEADER = "text-[length:calc(var(--tm-h1-size)*8/7)] lg:text-[length:calc(var(--tm-h1-size)*16/7)]";
const MQ_SUB = "text-[length:var(--tm-h4-size)] lg:text-[length:calc(var(--tm-h3-size)*9/8)]";

/* The Magic Quadrant as four joined squares in the banner's style: the
   Leaders square lit white with a glow, TestMu AI as a big black tile in
   it; the other three are frosted glass over the glow and rings. Other
   vendors are unnamed dots, placed roughly as in the report; the full
   citation sits in the Gartner FAQ answer. Built from blocks, not SVG,
   because glass (backdrop blur) only works on page blocks. */
type Quad = { name: string; lit?: boolean; dots: [number, number][] };
const quads: Quad[] = [
  { name: "Challengers", dots: [[66, 66], [80, 59], [87, 73], [72, 80], [56, 86]] },
  { name: "Leaders", lit: true, dots: [[55, 28], [72, 39], [61, 17]] },
  { name: "Niche players", dots: [[12, 47], [82, 28]] },
  { name: "Visionaries", dots: [[19, 41]] },
];
const MONO_LABEL = "font-mono text-b5 uppercase tracking-[1px]";
const AXIS = "font-mono text-b4 uppercase tracking-[1px] text-[var(--tm-fg-inverse)]";
const LINE = "border-[color-mix(in_srgb,var(--tm-fg-inverse)_40%,transparent)]";

function GartnerQuadrant() {
  return (
    <div
      role="img"
      aria-label="Gartner Magic Quadrant, September 2026: TestMu AI in the Leaders quadrant"
      className="relative mx-auto grid flex-none grid-cols-[auto_auto] gap-4 lg:mx-0"
    >
      {/* y axis, read bottom to top, centred on the grid */}
      <span className={`${AXIS} col-start-1 row-start-1 self-center [writing-mode:vertical-rl] rotate-180`}>
        Ability to execute →
      </span>
      <div className="relative col-start-2 row-start-1">
        {/* glow behind the lit square, top right */}
        <span aria-hidden className="absolute right-0 top-0 h-1/2 w-1/2 bg-[var(--tm-fg-inverse)] opacity-40 blur-xl" />

        <div className={`relative grid grid-cols-2 border-l border-t ${LINE}`}>
          {quads.map((q) => (
            <div
              key={q.name}
              className={`relative size-[120px] border-b border-r sm:size-[144px] ${LINE} ${
                q.lit
                  ? "bg-[var(--tm-fg-inverse)] text-[var(--tm-fg-default)]"
                  : "bg-[color-mix(in_srgb,var(--tm-fg-inverse)_6%,transparent)] text-[var(--tm-fg-inverse-muted)] backdrop-blur-md"
              }`}
            >
              <span className={`absolute left-3 top-3 ${MONO_LABEL}`}>{q.name}</span>
              {q.dots.map(([x, y]) => (
                <span
                  key={`${x}-${y}`}
                  aria-hidden
                  className={`absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    q.lit ? "bg-[var(--tm-fg-default)] opacity-25" : "bg-[var(--tm-fg-inverse)] opacity-50"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
              {q.lit && (
                /* the mark and the wordmark on one line, centred in the square */
                <span className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 sm:gap-2">
                  <span className="grid size-6 place-items-center bg-[var(--tm-bg-inverse)] sm:size-8">
                    <svg viewBox="0 0 16.02 18.02" fill="var(--tm-fg-inverse)" aria-hidden className="h-3 w-auto sm:h-4">
                      <path d="M16.0117 0H11.2082V11.6085H16.0117V0Z" />
                      <path d="M4.80469 0H0.00118828V6.60481L4.80469 11.6085V0Z" />
                      <path d="M4.80469 11.6094H0.00118828V18.014H4.80469V11.6094Z" />
                      <path d="M11.207 11.6094H4.80237L8.60514 16.4129H11.207V11.6094Z" />
                    </svg>
                  </span>
                  <img src="/kit/cta/testmu-wordmark-dark.svg" alt="TestMu AI" width={97} height={19} className="h-3 w-auto sm:h-3.5" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* x axis, centred under the grid */}
      <span className={`${AXIS} col-start-2 row-start-2 justify-self-center`}>Completeness of vision →</span>
    </div>
  );
}

function GartnerCta() {
  /* no top or bottom padding: the banner meets the section lines */
  return (
    <Section className="!py-0">
      <div className="relative -mx-8 overflow-hidden bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
        {/* warm horizon glow */}
        <img
          src="/kit/cta/gartner-glow.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[402px] w-full lg:bottom-auto lg:top-10"
        />

        <div className="relative flex flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex flex-col">
            <p className="text-[length:var(--tm-h4-size)] font-medium leading-[var(--tm-h4-line)] tracking-[var(--tm-h4-tracking)]">TestMu AI has been named a</p>
            <div className="flex items-center gap-7">
              <p className={`${LEADER} font-[family-name:var(--tm-font-pixel)] leading-none`}>
                Leader
              </p>
            </div>
            <p className={`${MQ_SUB} font-[family-name:var(--tm-font-pixel)] leading-10 [text-wrap:balance]`}>
              in the Gartner® Magic Quadrant™
            </p>
            <a
              className="tm-btn tm-btn--secondary mt-10 self-start"
              href="https://www.testmuai.com/gartner-magic-quadrant-agentic-software-quality-assurance-platforms/"
            >
              Get the report
              {/* Lucide, at the text's size; stroke 2 matches the 500 text weight */}
              <SquareArrowOutUpRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>

          {/* the quadrant, drawn in the banner's own style (rings and line
              sit under the glow, above) */}
          <GartnerQuadrant />
        </div>
      </div>
    </Section>
  );
}

/* the small product views on each step's painted scene: what you see in
   TestMu AI at that point of the move */
/* centred on its scene: the kit pins card UI to the top left */
const PANEL = "tm-fcard__ui flex !w-[72%] flex-col bg-surface !left-1/2 !top-1/2 -translate-x-1/2 -translate-y-1/2";
const ROW = "flex items-center justify-between gap-3 px-3 py-1.5";
const MONO = "font-mono text-b4";

function Tag({ ok, children }: { ok: boolean; children: string }) {
  return (
    <span
      className={`tag rounded-sm px-1.5 py-0.5 font-mono text-b5 uppercase tracking-[1px] ${
        ok
          ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]"
          : "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]"
      }`}
    >
      {children}
    </span>
  );
}

/* divs, not p: the kit sizes every p in a step card at 16px */
function StepUi({ ui, cmd, panel, lines }: { ui: Step["ui"]; cmd?: string; panel?: string; lines?: string[] }) {
  if (ui === "export")
    return (
      <div className={PANEL}>
        <div className="flex items-center justify-between border-b border-border px-3 py-2 text-b3 font-medium">
          {panel ?? "Terminal"}
          <span className="text-b4 font-normal text-muted-foreground">Done</span>
        </div>
        <div className="flex flex-col gap-2 p-3">
          {cmd && <div className={`${MONO} text-muted-foreground`}>$ {cmd}</div>}
          {(lines ?? ["24 browser tests exported", "Test cases saved as CSV"]).map((l) => (
            <div key={l} className={`${MONO} flex items-center gap-2`}>
              <Check size={16} strokeWidth={2} aria-hidden className="text-[var(--tm-green-500)]" />
              {l}
            </div>
          ))}
        </div>
      </div>
    );

  if (ui === "keys")
    return (
      <div className={PANEL}>
        <div className="border-b border-border px-3 py-2 text-b3 font-medium">Access keys</div>
        {[
          ["Username", "qa-team"],
          ["Access key", "••••••••••••"],
        ].map(([k, v], i) => (
          <div key={k} className={`${ROW} ${i ? "border-t border-border" : ""}`}>
            <span className="flex flex-col gap-0.5">
              <span className="text-b4 text-muted-foreground">{k}</span>
              <span className={MONO}>{v}</span>
            </span>
            {i ? (
              <Copy size={16} strokeWidth={1.5} aria-hidden className="text-muted-foreground" />
            ) : (
              <Tag ok>Copied</Tag>
            )}
          </div>
        ))}
      </div>
    );

  if (ui === "run")
    return (
      <div className={PANEL}>
        <div className="flex items-center justify-between border-b border-border px-3 py-2 text-b3 font-medium">
          Test run
          <span className="text-b4 font-normal text-muted-foreground">Running</span>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <div className={`${MONO} text-muted-foreground`}>$ {cmd ?? "mvn test"}</div>
          <div className={`${MONO} flex items-center gap-2`}>
            <Check size={16} strokeWidth={2} aria-hidden className="text-[var(--tm-green-500)]" />
            Connected to TestMu AI
          </div>
          <div className={`${MONO} flex items-center gap-2`}>
            <Check size={16} strokeWidth={2} aria-hidden className="text-[var(--tm-green-500)]" />
            12 tests in parallel
          </div>
          {/* progress: three quarters done */}
          <span className="mt-1 block h-1 bg-[var(--tm-bg-muted)]">
            <span className="block h-full w-3/4 bg-[var(--tm-green-400)]" />
          </span>
        </div>
      </div>
    );

  return (
    <div className={PANEL}>
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-b3 font-medium">
        Test runs
        <span className="text-b4 font-normal text-muted-foreground">46 of 48 passed</span>
      </div>
      {[
        ["Checkout flow", "Chrome 148", true],
        ["Sign in", "Safari 26", true],
        ["Search filters", "Edge 148", false],
      ].map(([t, b, ok], i) => (
        <div key={t as string} className={`${ROW} ${i ? "border-t border-border" : ""}`}>
          <span className="flex flex-col gap-0.5">
            <span className="text-b4 font-medium">{t}</span>
            <span className="text-b5 text-muted-foreground">{b}</span>
          </span>
          <Tag ok={ok as boolean}>{ok ? "Passed" : "Failed"}</Tag>
        </div>
      ))}
    </div>
  );
}

function Switch({ body, own }: { body: string; own?: Step[] }) {
  return (
    <Section>
      <FoldHead
        lead="Switch over"
        title="in three steps"
        body={body}
      >
        <a
          href="https://accounts.testmuai.com/register"
          className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8"
        >
          Get started free
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <ol className="tm-grid tm-grid--3 tm-steps2">
          {(own ?? steps).map((w, i) => (
            <li key={w.title} className="tm-cell tm-step">
              <span className="tm-step__n">{i + 1}</span>
              {/* H5 and B2: the kit's 20px step title is off the type scale */}
              <h3 className="!mt-4 !text-[length:var(--tm-h5-size)] !leading-[var(--tm-h5-line)] !tracking-[var(--tm-h5-tracking)]">
                {w.title}
              </h3>
              <p className="!mb-6 !mt-1 !text-b2">{w.body}</p>

              {/* what you see in TestMu AI at this step, as the kit's card
                  media: a white panel on a painted scene */}
              <div className="tm-fcard__media mt-auto !aspect-[4/3]">
                <img className="tm-scene" src={w.scene} alt="" loading="lazy" />
                <StepUi ui={w.ui} cmd={w.cmd} panel={w.panel} lines={w.lines} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- pricing: the kit's pricing fold, two plans ----------
   The rival's way of selling against TestMu AI's listed price, as two
   joined plan cells; TestMu AI's carries the kit's ink border and flag. */

export type Pricing = {
  lead: string;
  title: string;
  body: string;
  rival: { price: string; note: string; label: string; items: string[] };
  ours: { price: string; note: string; flag: string; label: string; items: string[] };
};

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Dash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
);

function PricingDuel({ rival, p }: { rival: string; p: Pricing }) {
  return (
    <Section>
      <FoldHead lead={p.lead} title={p.title} body={p.body} />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--2 tm-pcs">
          <div className="tm-cell tm-pc">
            <div className="tm-pc__top">
              <h3>{rival} pricing</h3>
              <div className="tm-pc__price">
                <span className="tm-pixel">{p.rival.price}</span>
                <small>{p.rival.note}</small>
              </div>
            </div>
            <ul className="tm-pc__list">
              <li className="tm-label">{p.rival.label}</li>
              {p.rival.items.map((t) => (
                <li key={t}>
                  <Dash />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="tm-cell tm-pc tm-pc--popular">
            <span className="tm-pc__flag">{p.ours.flag}</span>
            <div className="tm-pc__top">
              <h3>TestMu AI pricing</h3>
              <div className="tm-pc__price">
                <span className="tm-pixel">{p.ours.price}</span>
                <small>{p.ours.note}</small>
              </div>
            </div>
            <ul className="tm-pc__list">
              <li className="tm-label">{p.ours.label}</li>
              {p.ours.items.map((t) => (
                <li key={t}>
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- when to choose which: the kit's bento ----------
   Narrow and wide cells that swap sides each row. Each names the pick in
   a small tag, says the case, and shows it as a small TestMu AI view
   (ChoosePanels) in the cell's media box. */

export type Choose = {
  lead: string;
  title: string;
  body: string;
  items: { pick: string; title: string; body: string; media: ReactNode }[];
};

function ChooseCards({ c }: { c: Choose }) {
  return (
    <Section>
      <FoldHead lead={c.lead} title={c.title} body={c.body} />
      <div className="tm-reveal -mx-8">
        <div className="tm-bento">
          {c.items.map((it, i) => {
            /* narrow, wide / wide, narrow */
            const wide = i % 4 === 1 || i % 4 === 2;
            return (
              <div key={it.title} className={`tm-bento__cell ${wide ? "tm-bento__cell--wide" : "tm-bento__cell--narrow"}`}>
                <span className="tag self-start rounded-sm bg-[var(--tm-bg-fill)] px-1.5 py-0.5 text-b4 font-medium">
                  {it.pick}
                </span>
                <h3 className="tm-h4 mt-2 [text-wrap:balance]">{it.title}</h3>
                {/* B2: the kit's 18px bento line is longer than these */}
                <p className="!text-b2">{it.body}</p>
                <div className="tm-bento__media">{it.media}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- methodology: the kit's reasons fold, numbers first ---------- */

function Methodology({ m }: { m: AltPage["methodology"] }) {
  return (
    <Section>
      <FoldHead
        lead="How we compared,"
        title="and our sources"
        body={m.body}
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-reasons">
          <div className="tm-stats">
            {m.stats.map((s) => (
              <div key={s.label}>
                <p className="tm-label">{s.label}</p>
                <p className="tm-pixel">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="tm-grid tm-grid--2">
            {m.notes.map((n) => (
              <a key={n.text} className="tm-cell tm-report" href={n.href}>
                {/* the kit's 24/32 report line, H4 tracking */}
                <p className="!tracking-[var(--tm-h4-tracking)]">{n.text}</p>
                <span className="tm-link">
                  {n.link}
                  <span className="tm-arw" aria-hidden="true">
                    <Arrow />
                    <Arrow />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- the page ---------- */

declare global {
  interface Window {
    TestMu?: { init: (root?: Element) => void };
  }
}

function Page({ p }: { p: AltPage }) {
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
      <Hero hero={p.hero} />

      {/* the site header is 64px, so the tables' pinned column names sit
          at 64px instead of the library's 56px */}
      <main className="relative [&_.sticky]:!top-16">
        <GuideLines />

        <TrustedBy />
        <div id="compare">
          <CompareDuel
            lead={p.duel.lead}
            title={p.duel.title}
            body={p.duel.body}
            cta="Get started free"
            rival={{ name: p.rival }}
            groups={p.duel.groups}
          />
        </div>
        {p.pricing && <PricingDuel rival={p.rival} p={p.pricing} />}
        {p.choose && <ChooseCards c={p.choose} />}
        <Switch body={p.switchBody} own={p.switchSteps} />
        <div id="alternatives">
          <SpecTable
            lead={p.alts.lead}
            title={p.alts.title}
            body={p.alts.body}
            columns={p.alts.columns}
            rows={p.alts.rows}
          />
        </div>
        <GartnerCta />
        <Methodology m={p.methodology} />
        <Stories />
        <Reviews reviews={p.reviews} />
        <Faq items={p.faq} />
        <Enterprise title={p.enterprise.title} body={p.enterprise.body} />
        <Footer />
      </main>
    </div>
  );
}

export function mountAlternativePage(p: AltPage) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <Page p={p} />
      </MotionConfig>
    </StrictMode>,
  );
}
