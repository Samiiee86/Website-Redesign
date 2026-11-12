import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
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

const A = ({ href, children }: { href: string; children: string }) => (
  <a
    href={href}
    className="text-[var(--tm-fg-link)] underline-offset-4 hover:underline"
  >
    {children}
  </a>
);

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
        <A href="https://www.testmuai.com/hyperexecute/">HyperExecute</A>,
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
        <A href="https://www.testmuai.com/pricing/">annual list prices</A>.
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
        <A href="https://www.testmuai.com/private-real-device-cloud/">
          Private Real Device Cloud
        </A>{" "}
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
        <A href="https://www.testmuai.com/trust/security/">Trust Center</A>.
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
        <A href="https://www.testmuai.com/gartner-magic-quadrant-agentic-software-quality-assurance-platforms/">
          Gartner Magic Quadrant page
        </A>
        .
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

const HERO = "/kit/hero/cross-browser-testing";

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
          <div className="tm-hero__screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${HERO}/cbt-demo-poster.jpg`}
              aria-label="A live test session in Chrome on Windows 11"
            >
              <source src={`${HERO}/cbt-demo.webm`} type="video/webm" />
              <source src={`${HERO}/cbt-demo.mp4`} type="video/mp4" />
            </video>
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

const MIGRATION = "https://www.testmuai.com/support/docs/browserstack-to-testmu-migration-guide/";

/* inline code, as in the spec sheet */
const C = ({ children }: { children: string }) => (
  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-b3 text-foreground">
    {children}
  </code>
);

/* ---------- three steps: the kit's feature-steps fold ---------- */

const steps = [
  {
    title: "Copy your username and access key",
    body: (
      <>
        In Account settings, open Password &amp; Security, then copy your
        username and access key into your <C>.env</C> file.
      </>
    ),
  },
  {
    title: "Point tests at the TestMu AI hub",
    body: (
      <>
        Set the hub URL to <C>hub.lambdatest.com/wd/hub</C>. Keep your test
        runner, unless it runs through the BrowserStack SDK.
      </>
    ),
  },
  {
    title: "Update your capabilities",
    body: (
      <>
        Rebuild <C>bstack:options</C> as <C>LT:Options</C> in the
        Capabilities Generator. Your Selenium test logic stays the same.
      </>
    ),
  },
];

function Steps() {
  return (
    <Section>
      <FoldHead
        lead="Move from BrowserStack"
        title="in three steps"
        body={
          <>
            Keep your Selenium tests and change how they connect. The{" "}
            <A href={MIGRATION}>migration guide</A> covers Selenium 3 and 4.
          </>
        }
      >
        <a
          href="https://accounts.testmuai.com/register"
          className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8"
        >
          Start testing now
          <ArrowChip />
        </a>
      </FoldHead>
      <div className="tm-reveal -mx-8">
        <ol className="tm-grid tm-grid--3 tm-steps2">
          {steps.map((s, i) => (
            <li key={s.title} className="tm-cell tm-step">
              <span className="tm-step__n">{i + 1}</span>
              {/* H5 and B2: the kit's 20px step title is off the type scale */}
              <h3 className="!text-[length:var(--tm-h5-size)] !leading-[var(--tm-h5-line)] !tracking-[var(--tm-h5-tracking)]">
                {s.title}
              </h3>
              <p className="!text-b2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- methodology: section head plus joined boxes ---------- */

const facts: { label: string; value: ReactNode }[] = [
  { label: "Last updated", value: "November 2026" },
  { label: "What we compared", value: "9 product pairs, 44 feature and pricing rows" },
  {
    label: "Sources",
    value: (
      <>
        BrowserStack's pricing, product pages and docs, checked 14 October
        2026, and TestMu AI's plans and docs. How we check facts:{" "}
        <A href="https://www.testmuai.com/editorial-policy/">editorial policy</A>.
      </>
    ),
  },
  {
    label: "One product at a time",
    value: (
      <span className="flex flex-col gap-2">
        <A href="https://www.testmuai.com/blog/testmu-vs-browserstack-automate/">BrowserStack Automate vs HyperExecute</A>
        <A href="https://www.testmuai.com/blog/testmu-vs-browserstack-live/">BrowserStack Live and App Live vs TestMu AI</A>
        <A href="https://www.testmuai.com/blog/testmu-vs-browserstack-test-management/">BrowserStack Test Management review</A>
        <A href="https://www.testmuai.com/testmu-alternative/">TestMu AI alternatives</A>
      </span>
    ),
  },
];

function Methodology() {
  return (
    <Section>
      <FoldHead
        lead="How we compared"
        title="each BrowserStack product"
        body="Each BrowserStack product against its TestMu AI counterpart, on features and monthly list price for annual billing. Where a feature is plan-gated or sold separately, the table names that plan."
      />
      <div className="tm-join tm-reveal !-mx-8">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-3">
            <span className="tm-label">{f.label}</span>
            <span className="text-b2 text-foreground">{f.value}</span>
          </div>
        ))}
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
            cta="Start free"
            rival={{ name: "BrowserStack" }}
            groups={duel}
          />
        </div>
        <div id="alternatives">
          <SpecTable
            lead="Six BrowserStack alternatives,"
            title="side by side"
            body="Plans, real devices, best fit and one limit for each, from every vendor's own pricing pages and docs, checked 23 October 2026."
            columns={altColumns}
            rows={alts}
          />
        </div>
        <Methodology />
        <Reviews />
        <Stories />
        <Steps />
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
