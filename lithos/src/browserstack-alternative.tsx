import { StrictMode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { Check, Copy, SquareArrowOutUpRight } from "lucide-react";
import "./index.css";
import { ArrowChip, Section } from "./lib/ui";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Stories from "./sections/Stories";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import CompareDuel from "./pieces/CompareDuel";
import SpecTable, { type SpecRow } from "./pieces/SpecTable";
import { FoldHead } from "./pieces/compare/parts";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* BrowserStack alternative page (browserstack-alternative.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, FAQ (with this page's questions), the closing
     enterprise call and the footer.
   - The two comparison tables from the pieces library, as they are.
   - Kit folds where the site has nothing for the job: the hero
     (hero-media, with the cross browser testing hero fold's video), the
     reviews (reviews-plain) and the three steps (feature-steps), plus a
     methodology block of joined boxes (tm-join).

   Copy is trimmed from the live page: its 9 product tables (44 rows)
   become one head to head of the rows that differ most, the "other device
   clouds" cards become links on the alternatives' names, and the Gartner
   notice moves into the Gartner FAQ answer. */

/* ---------- head to head: one row group per product pair ---------- */

const duel: MatrixGroup[] = [
  {
    label: "Live testing",
    rows: [
      { name: "Free plan", values: [true, "30-minute trial"] },
      { name: "Idle timeout", values: ["Up to 60 minutes", "10 minutes"] },
      { name: "Desktop price", values: ["$15/mo per session", "$29/mo per user"] },
    ],
  },
  {
    label: "Automation",
    rows: [
      { name: "Load testing", values: [true, "Separate product"] },
      { name: "Selenium grid queue", values: ["Parallels plus 150", "5, or equal to parallels"] },
      { name: "Desktop price, per parallel", values: ["$79", "$99"] },
    ],
  },
  {
    label: "Real devices",
    rows: [
      { name: "Desktop browsers included", values: [true, "Sold separately"] },
      { name: "Apple Pay, SIM, biometrics", values: [true, "Team Pro and up"] },
      { name: "Price, 5 parallel sessions", values: ["$195/mo", "$249/mo for 5 users"] },
    ],
  },
  {
    label: "App automation",
    rows: [
      { name: "AI self-healing", values: [true, "$249 Pro plan only"] },
      { name: "Price per parallel", values: ["$199, web and app", "$199, apps only"] },
    ],
  },
  {
    label: "Visual testing",
    rows: [
      { name: "Accessibility checks", values: [true, false] },
      { name: "25,000 screenshots a month", values: ["$299/mo", "$449/mo"] },
    ],
  },
  {
    label: "Also in the platform",
    rows: [
      { name: "AI test authoring", values: ["From $17 per agent", "Quote only"] },
      { name: "Accessibility site scans", values: ["$159/mo", "Quote only"] },
      { name: "Real devices on-premise", values: [true, false] },
    ],
  },
];

/* ---------- the wider market ---------- */

const altColumns = ["Alternative", "Plans", "Real devices", "Best for", "One limitation"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: [
      "Free plan, then $15/mo per session",
      "50,000+",
      "Web and app teams who want AI test authoring",
      "Dedicated and on-premise devices need Enterprise",
    ],
  },
  {
    name: "Sauce Labs",
    href: "https://www.testmuai.com/saucelabs-alternative/",
    cells: [
      "28-day trial, then $39/mo per test",
      "10,000+",
      "Web and mobile testing with crash reporting",
      "AI agents need an Enterprise plan",
    ],
  },
  {
    name: "TestingBot",
    href: "https://www.testmuai.com/testingbot-alternative/",
    cells: [
      "14-day trial, then €20/mo per user",
      "41",
      "Small teams on euro plans",
      "All devices sit in one Belgian datacenter",
    ],
  },
  {
    name: "TestGrid",
    href: "https://www.testmuai.com/testgrid-alternative/",
    cells: [
      "No self-serve trial; $249/mo per seat",
      "Count not published",
      "On-premise device labs in your network",
      "On-premise AI needs outbound access",
    ],
  },
  {
    name: "AWS Device Farm",
    href: "https://www.testmuai.com/aws-device-farm-alternative/",
    cells: [
      "$0.17 per device minute",
      "2,500+",
      "AWS teams paying per device minute",
      "Runs stop at 150 minutes",
    ],
  },
  {
    name: "Selenium Grid or Playwright",
    cells: [
      "Free and open source",
      "None; bring your own",
      "Full control of browsers, tests and data",
      "You run, scale and patch it yourself",
    ],
  },
];

/* ---------- this page's questions, in the site's FAQ ---------- */


const faq = [
  {
    q: "What is the best BrowserStack alternative?",
    a: (
      <>
        The one that covers the BrowserStack products your team uses, for
        less. TestMu AI has a counterpart for Live, Automate, App Live, App
        Automate, Percy, Accessibility, Low Code Automation and Test
        Management. It prices live testing per parallel session instead of
        per user, and adds KaneAI for writing tests and{" "}
        HyperExecute,
        which runs suites up to 70% faster than traditional grids.
      </>
    ),
  },
  {
    q: "Is there a free BrowserStack alternative?",
    a: "Yes. Most TestMu AI products have a free plan, with no credit card. Automation Free includes 100 lifetime minutes on 2 parallel sessions, HyperExecute Free 300 minutes a month, and SmartUI Free 2,000 screenshots. BrowserStack's core products offer one-time trials of 30 to 100 minutes instead.",
  },
  {
    q: "Is TestMu AI cheaper than BrowserStack?",
    a: (
      <>
        On several products, at{" "}
        annual list prices.
        Desktop live testing is $15 a month per parallel session against $29
        per user. Desktop automation is $79 per parallel against $99. SmartUI
        is $299 a month for 25,000 screenshots against $449 on Percy.
        Real-device app automation is $199 per parallel on both, and TestMu
        AI includes AI self-healing at that price.
      </>
    ),
  },
  {
    q: "Can I test local and private URLs, like with BrowserStack Local?",
    a: "Yes. TestMu AI reaches localhost, staging and firewalled apps through the LT Tunnel CLI or the Underpass desktop app, in live sessions and in automated tests, where you turn it on with the tunnel capability inside LT:Options.",
  },
  {
    q: "Can I run it on-premise, behind my firewall?",
    a: (
      <>
        Yes. TestMu AI offers SaaS, private cloud and on-premise, including a{" "}
        Private Real Device Cloud{" "}
        that hosts real devices in your own infrastructure. BrowserStack's
        docs list no on-premise option for its browser and device clouds.
      </>
    ),
  },
  {
    q: "Which security certifications does TestMu AI hold?",
    a: (
      <>
        SOC 2 Type II, ISO 27001:2022, ISO 27017:2015 and ISO 27701:2019,
        listed in the{" "}
        Trust Center.
        Data is encrypted at rest with AES-256 and in transit with TLS 1.2
        and above.
      </>
    ),
  },
  {
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
  },
];

/* ---------- kit folds ---------- */

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* background from the "vs" hero fold: the compare pages' own scene */
const HERO = "/kit/hero/browserstack-alternative";

/* kit hero-media, with the cross browser testing hero fold's video */
function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">BrowserStack alternatives,</span>
            <span className="tm-nowrap">compared product by product</span>
          </h1>
          <p className="tm-hero__promise">
            Live and automated tests on 3,000+ browsers and 50,000+ real
            devices. Start free, then pay from $15 a month per parallel
            session.
          </p>
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
          <img className="tm-scene" src={`${HERO}/hero-bg.jpg`} alt="" />
          {/* the picture is see-through: the panes sit on the scene itself */}
          <div className="tm-hero__screen !overflow-visible !bg-transparent">
            {/* drawn from tokens in art/browserstack-hero.html, rendered at 2x */}
            <img
              src={`${HERO}/screen.webp`}
              width={2000}
              height={1104}
              fetchPriority="high"
              alt="Are you migrating from BrowserStack? The same Java test before and after, with four lines changed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews: the kit's reviews-plain fold ---------- */

/* The seven reviews the live page shows, word for word, with where each
   was posted. The third one is the wide cell. */
const IMG = "https://assets.testmuai.com/resources/images";
type Review = {
  name: string;
  by: string;
  quote: string;
  img: string;
  url: string;
  /* where it was posted: X uses the kit's X mark, the rest their icon */
  on: "x" | { icon: string; label: string };
};

const reviews: Review[] = [
  {
    name: "Matthew Bryson",
    by: "@mbrysonuk",
    quote: "Second day using @lambdatesting [now TestMu AI] and it's already proven itself a lot faster than Cross Browser Testing and BrowserStack, at half the price!",
    img: `${IMG}/matthew-bryson-review.jpg`,
    url: "https://twitter.com/mbrysonuk/status/1238148964693803009",
    on: "x",
  },
  {
    name: "Eric G",
    by: "Capterra reviewer",
    quote: "Seems like a good alternative to BrowserStack. The inclusion of a free tier is a definite plus. There were a good mix of real devices.",
    img: `${IMG}/lambdaTestReview/capterra-logo-icon-2.png`,
    url: "https://www.capterra.com/p/170732/LambdaTest/reviews/",
    on: { icon: `${IMG}/lambdaTestReview/Capterra.svg`, label: "Posted on Capterra" },
  },
  {
    name: "Hiroyuki Maruno",
    by: "@hirokyMaruno",
    quote: "For cross browser testing, BrowserStack seems to be the default, but it's too heavy, difficult to use, and expensive. So I'm trying out other testing tools. So far, [LambdaTest, now TestMu AI] seems to be the best.",
    img: `${IMG}/peroyuki_-review.png`,
    url: "https://twitter.com/peroyuki_/status/1269886996693962752",
    on: "x",
  },
  {
    name: "Karine Kirche",
    by: "AWS Marketplace",
    quote: "My experiences with BrowserStack and [LambdaTest, now TestMu AI] include conducting very important tests on both products. I was really surprised by LambdaTest. It was a very good service and for the price, I think it is a very good solution.",
    img: `${IMG}/AWS.svg`,
    url: "https://aws.amazon.com/marketplace/pp/prodview-7k2ipipotz3tk",
    on: { icon: `${IMG}/lambdaTestReview/web-icon.svg`, label: "Posted on AWS Marketplace" },
  },
  {
    name: "Youpi78",
    by: "@youpi78",
    quote: "If you've used BrowserStack, give a try to @lambdatesting [now TestMu AI]. It is much faster and very cost-effective.",
    img: `${IMG}/youpi78.png`,
    url: "https://twitter.com/youpi78130/status/1277628858943115264",
    on: "x",
  },
  {
    name: "James Davis",
    by: "CTO at Roster",
    quote: "I evaluated a lot of AI automation testing tools earlier this year and ended up going with @lambdatesting [now TestMu AI]. We've been using them for a couple months and my QA team loves it. KaneAI is ahead of the competition. We highly recommend.",
    img: `${IMG}/james-davis.png`,
    url: "https://www.linkedin.com/posts/inovacode_hi-fellow-techies-our-dev-qa-teams-are-activity-7311091687005593601-Pu0e/",
    on: { icon: `${IMG}/lambdaTestReview/Linkedin.svg`, label: "Posted on LinkedIn" },
  },
  {
    name: "Ben Pritchard",
    by: "@yesiamben",
    quote: "Super top notch customer support from @lambdatesting [now TestMu AI] - just throwing it out there if you're looking for a decent browser testing platform, they get my full double thumbs up. 👍👍",
    img: `${IMG}/ben.png`,
    url: "https://twitter.com/yesiamben/status/1222937857565822976",
    on: "x",
  },
];

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

function Reviews() {
  return (
    <Section>
      <FoldHead
        lead="What reviewers say about"
        title="TestMu AI and BrowserStack"
        body="Reviews from people who used both, as they posted them."
      >
        <a
          href="https://www.testmuai.com/reviews/"
          className="btn btn-lg btn-secondary mt-8"
        >
          View all reviews
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4 tm-rvs tm-rvs--plain">
          {reviews.map((r, i) => (
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

type Step = { title: string; body: string; scene: string; ui: "keys" | "run" | "results" };

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
const PANEL = "tm-fcard__ui flex !w-[84%] flex-col bg-surface";
const ROW = "flex items-center justify-between gap-3 px-4 py-2";
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
function StepUi({ ui }: { ui: Step["ui"] }) {
  if (ui === "keys")
    return (
      <div className={PANEL}>
        <div className="border-b border-border px-4 py-3 text-b3 font-medium">Access keys</div>
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
        <div className="flex items-center justify-between border-b border-border px-4 py-3 text-b3 font-medium">
          Test run
          <span className="text-b4 font-normal text-muted-foreground">Running</span>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className={`${MONO} text-muted-foreground`}>$ mvn test</div>
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
      <div className="flex items-center justify-between border-b border-border px-4 py-3 text-b3 font-medium">
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

function Switch() {
  return (
    <Section>
      <FoldHead
        lead="Switch over"
        title="in three steps"
        body="Keep your Selenium tests when you leave BrowserStack. Three steps from your current suite to your first run on TestMu AI."
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
          {steps.map((w, i) => (
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
                <StepUi ui={w.ui} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- methodology: the kit's reasons fold, numbers first ---------- */

const stats = [
  { label: "Product pairs", value: "9" },
  { label: "Rows compared", value: "44" },
  { label: "Alternatives", value: "6" },
  { label: "Prices checked", value: "Oct 2026" },
];

/* two cards under four numbers, as the kit's reasons fold ships, so every
   other line of the numbers meets a card edge */
const notes = [
  {
    text: "BrowserStack Automate against HyperExecute, one product at a time.",
    link: "Read the comparison",
    href: "https://www.testmuai.com/blog/testmu-vs-browserstack-automate/",
  },
  {
    text: "BrowserStack Live and App Live against TestMu AI, side by side.",
    link: "Read the comparison",
    href: "https://www.testmuai.com/blog/testmu-vs-browserstack-live/",
  },
];

function Methodology() {
  return (
    <Section>
      <FoldHead
        lead="How we compared,"
        title="and our sources"
        body="Each BrowserStack product against its TestMu AI counterpart, from public pricing, product pages and docs. Prices are monthly list prices in USD, billed yearly."
      />
      <div className="tm-reveal -mx-8">
        <div className="tm-reasons">
          <div className="tm-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="tm-label">{s.label}</p>
                <p className="tm-pixel">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="tm-grid tm-grid--2">
            {notes.map((n) => (
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

      {/* the site header is 64px, so the tables' pinned column names sit
          at 64px instead of the library's 56px */}
      <main className="relative [&_.sticky]:!top-16">
        <GuideLines />

        <TrustedBy />
        <div id="compare">
          <CompareDuel
            lead="TestMu AI and BrowserStack,"
            title="product by product"
            body="TestMu AI prices per parallel session; BrowserStack prices Live and App Live per user. Monthly list prices, billed annually, checked October 2026."
            cta="Get started free"
            rival={{ name: "BrowserStack" }}
            groups={duel}
          />
        </div>
        <Switch />
        <div id="alternatives">
          <SpecTable
            lead="Six BrowserStack alternatives,"
            title="side by side"
            body="Plans, real devices, best fit and one limit for each, from every vendor's own pricing pages and docs, checked 23 October 2026."
            columns={altColumns}
            rows={alts}
          />
        </div>
        <GartnerCta />
        <Methodology />
        <Stories />
        <Reviews />
        <Faq items={faq} />
        <Enterprise
          title="Ready to leave BrowserStack?"
          body="Talk to our team about plans, parallel sessions and a move that fits your renewal date."
        />
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
