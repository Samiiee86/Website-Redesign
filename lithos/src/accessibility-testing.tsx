import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  Check,
  ClipboardList,
  Code,
  Ear,
  Globe,
  ListChecks,
  ScanEye,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import "./index.css";
import { Section } from "./lib/ui";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import TrustedBy from "./sections/TrustedBy";
import Reasons from "./sections/Reasons";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";
import CompareDuel from "./pieces/CompareDuel";
import { FoldHead } from "./pieces/compare/parts";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* Accessibility testing page (accessibility-testing.html).

   The live page (testmuai.com/accessibility-testing), word for word and in
   its own order, rebuilt from the site's shared folds and the kit:
   - hero: the kit's hero-split, with the live page's scene and its sample
     run card as a white product panel on it
   - at a glance: six facts as joined cells
   - how it works: the kit's feature steps
   - capabilities: the kit's feature pointers, 3 x 2
   - plug-ins vs scans: the pieces library's head to head
   - teams: the kit's pricing cells, without prices
   - related: feature pointers for the four products, then the two
     resource groups as report cells
   - shared folds: logo wall, more reasons (in place of
     the live page's Gartner and numbers strip), FAQ with the page's own
     heading and questions, the closing call with the page's own words */

const SITE = "https://www.testmuai.com";
const SIGNUP = `${SITE}/register/`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* the kit's sliding arrow, on its own */
const Arw = () => (
  <span className="tm-link !border-0 !pb-0" aria-hidden="true">
    <span className="tm-arw">
      <Arrow />
      <Arrow />
    </span>
  </span>
);

/* ---------- hero: kit hero-split ---------- */

const HERO = "/kit/hero/accessibility-testing";

const run: { who: string; what: string; ok: boolean }[] = [
  { who: "scan", what: "WCAG 2.2 AA · 3 pages", ok: true },
  { who: "contrast", what: "button text 3.1:1 · needs 4.5:1", ok: false },
  { who: "screen reader", what: "VoiceOver reads form labels", ok: true },
  { who: "keyboard", what: "focus order matches visual order", ok: true },
];

function Tag({ ok }: { ok: boolean }) {
  return (
    <span
      className={`tag flex-none rounded-sm px-1.5 py-0.5 font-mono text-b5 uppercase tracking-[1px] ${
        ok
          ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]"
          : "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]"
      }`}
    >
      {ok ? "PASS" : "FAIL"}
    </span>
  );
}

/* the live hero's sample run, as a white panel on the scene */
function RunCard() {
  return (
    <div className="flex w-full max-w-[560px] flex-col bg-surface text-left [box-shadow:var(--tm-shadow-resting-md)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className="block size-2 rounded-full bg-[var(--tm-border-default)]" />
            ))}
          </span>
          <span className="font-mono text-b4">a11y · signup-flow</span>
        </span>
        <span className="text-b4 text-muted-foreground">sample run</span>
      </div>
      <ol>
        {run.map((r, i) => (
          <li key={r.who} className={`flex items-center gap-3 px-4 py-3 ${i ? "border-t border-border" : ""}`}>
            <span className="w-24 flex-none font-mono text-b4 text-muted-foreground">{r.who}</span>
            <span className="min-w-0 flex-1 text-b3">{r.what}</span>
            <Tag ok={r.ok} />
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-[var(--tm-bg-fill)] px-4 py-3">
        <span className="font-mono text-b4">1 issue · rule 1.4.3</span>
        <span className="text-b4 text-muted-foreground">issue list with element, rule and fix</span>
      </div>
    </div>
  );
}

const builtFor = ["Accessibility leads", "Front-end developers", "QA engineers", "Compliance teams"];

function Hero() {
  return (
    <section className="tm-hero tm-hero--media">
      <div className="tm-frame tm-hero__inner">
        <nav aria-label="Breadcrumb" className="tm-crumbs mb-8">
          <a href={SITE}>TestMu AI</a>
          <span aria-hidden>/</span>
          <span aria-current="page">Accessibility Testing</span>
        </nav>
        <p className="mb-4 flex items-center gap-2 font-mono text-b4 uppercase tracking-[1px] text-muted-foreground">
          <span>Accessibility Testing</span>
          <span aria-hidden>·</span>
          <time dateTime="2026-11">Updated November 2026</time>
        </p>
        <div className="tm-hero__top">
          <h1>
            <span className="tm-nowrap">Accessibility testing tool</span>
            <span className="tm-nowrap">for websites and native mobile apps.</span>
          </h1>
          <p className="tm-hero__promise">
            TestMu AI's accessibility testing tool scans websites and native
            iOS and Android apps for WCAG 2.2, ADA, Section 508 and European
            Accessibility Act issues. It runs automated checks on real
            devices and with screen readers, then ties each issue to the
            exact rule it fails and the fix.
          </p>
        </div>
        <div className="tm-actions tm-hero__actions">
          <a className="tm-btn tm-btn--primary tm-btn--arrow tm-btn--plain" href={SIGNUP}>
            Start free
            <span className="tm-chip" aria-hidden="true">
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          </a>
          <a className="tm-btn tm-btn--secondary" href={`${SITE}/demo/`}>
            Book a demo
          </a>
          <span className="self-center text-b3 text-muted-foreground">
            Free plan: 25 accessibility scans, valid for lifetime.
          </span>
        </div>
        <ul className="mt-6 flex flex-wrap items-center gap-2">
          <li className="mr-1 font-mono text-b4 uppercase tracking-[1px] text-muted-foreground">Built for</li>
          {builtFor.map((b) => (
            <li key={b} className="tag rounded-sm border border-border bg-surface px-2 py-1 text-b4">
              {b}
            </li>
          ))}
        </ul>
        <div className="tm-hero__stage">
          <img className="tm-scene" src={`${HERO}/hero-bg.png`} alt="Accessibility testing on TestMu AI" />
          <div className="relative z-[1] flex w-full justify-center">
            <RunCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- at a glance: six facts, joined cells ---------- */

const facts: [string, string][] = [
  ["What it is", "Automated and assisted accessibility testing for web and mobile"],
  ["Standards", "WCAG 2.2, ADA, Section 508, European Accessibility Act"],
  ["Surfaces", "Websites, web apps, native iOS and Android apps"],
  ["Methods", "Automated scans, real devices, screen readers"],
  ["Pricing", "Free: 25 scans, valid for lifetime; paid plans on the pricing page"],
  ["Start", "Scan a URL or add accessibility checks to existing tests"],
];

function Glance() {
  return (
    <Section>
      <FoldHead
        lead="Accessibility coverage"
        title="on web and native apps"
        body="Free plan: 25 accessibility scans, valid for lifetime"
      />
      <div className="tm-reveal -mx-8">
        <dl className="tm-grid tm-grid--3">
          {facts.map(([k, v]) => (
            <div key={k} className="tm-cell">
              <dt className="tm-label">{k}</dt>
              <dd className="text-b1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* ---------- how it works: kit feature steps ---------- */

const steps = [
  { title: "Scan", body: "Scan a URL, a sitemap or a mobile app build." },
  { title: "Verify", body: "Confirm issues on real devices and with screen readers." },
  { title: "Fix", body: "Each issue names the element, the WCAG rule and how to fix it." },
];

/* H5 and B2: the kit's 20px step title is off the type scale */
const H5 = "!text-[length:var(--tm-h5-size)] !leading-[var(--tm-h5-line)] !tracking-[var(--tm-h5-tracking)]";

function How() {
  return (
    <Section>
      <FoldHead lead="Scan, review," title="fix, re-scan" />
      <div className="tm-reveal -mx-8">
        <ol className="tm-grid tm-grid--3 tm-steps2">
          {steps.map((s, i) => (
            <li key={s.title} className="tm-cell tm-step">
              <span className="tm-step__n">{i + 1}</span>
              <h3 className={H5}>{s.title}</h3>
              <p className="!text-b2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- capabilities: kit feature pointers ---------- */

const caps = [
  { icon: ShieldCheck, title: "WCAG 2.2, ADA, 508, EAA", body: "Checks mapped to the standards your legal team asks about." },
  { icon: Smartphone, title: "Native mobile apps", body: "Scan iOS and Android apps, not only websites." },
  { icon: Ear, title: "Real devices and screen readers", body: "Confirm issues the way assistive-technology users meet them." },
  { icon: Wrench, title: "Rule-level fixes", body: "Every issue links to the rule it fails and the change that fixes it." },
  { icon: ListChecks, title: "In your test suite", body: "Add accessibility checks to Selenium, Playwright and Cypress tests." },
  { icon: Code, title: "Accessibility DevTools", body: "A browser extension for developers to scan while they build." },
];

function Caps() {
  return (
    <Section>
      <FoldHead lead="WCAG checks" title="for web and native apps" />
      <div className="tm-reveal -mx-8">
        <ul className="tm-grid tm-grid--3">
          {caps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="tm-cell tm-pt">
              <span className="tm-pt__ico">
                <Icon aria-hidden />
              </span>
              <h3 className={H5}>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- plug-ins vs scans: the pieces library's head to head ---------- */

const cmp: MatrixGroup[] = [
  {
    label: "",
    rows: [
      { name: "Scope", values: ["Sites, flows and native apps", "One page at a time"] },
      { name: "Mobile apps", values: ["iOS and Android on real devices", "Not covered"] },
      { name: "Screen readers", values: ["Built into the workflow", "Manual"] },
      { name: "Reporting", values: ["Issue, rule and fix per element", "A list of warnings"] },
    ],
  },
];

/* ---------- teams: the kit's plan cells, without prices ---------- */

const teams = [
  { name: "Startups and SMBs", for: "Start small", items: ["25 free scans, valid for lifetime", "Scheduled scans for WCAG, ADA and Section 508"] },
  { name: "Mid-market", for: "Scale across squads and CI", items: ["Native iOS and Android app scans on real devices", "Issues pushed to Jira with WCAG references"] },
  { name: "Enterprise", for: "Security, control and support", items: ["Custom platform access controls for teams", "Certifications, ESG attestation and continuous monitoring (Trust Center)"] },
];

function Teams() {
  return (
    <Section>
      <FoldHead lead="Accessibility for one site" title="or a design system" />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--3 tm-pcs">
          {teams.map((t) => (
            <div key={t.name} className="tm-cell tm-pc">
              <div className="tm-pc__top">
                <h3 className={H5}>{t.name}</h3>
                <p className="tm-pc__desc">{t.for}</p>
              </div>
              <ul className="tm-pc__list">
                {t.items.map((it) => (
                  <li key={it}>
                    <Check aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- related: four products, then the two resource groups ---------- */

const related = [
  { icon: ScanEye, name: "SmartUI", body: "Pixel and layout diffs on every build", href: `${SITE}/visual-testing-tool/` },
  { icon: Smartphone, name: "Real Device Cloud", body: "Real devices for assistive tech checks", href: `${SITE}/real-device-cloud/` },
  { icon: Globe, name: "Cross Browser Testing", body: "Check every browser and OS version", href: `${SITE}/cross-browser-testing/` },
  { icon: ClipboardList, name: "Test Manager", body: "Track fixes in test management", href: `${SITE}/test-management/` },
];

const resources = [
  { group: "Downloads and installs", label: "Accessibility skill (GitHub)", href: "https://github.com/LambdaTest/agent-skills/tree/main/accessibility-skill" },
  { group: "Customer stories", label: "Higher Education Accessibility case study", href: `${SITE}/customers/higher-education-accessibility/` },
];

function Related() {
  return (
    <Section>
      <FoldHead lead="Test accessibility" title="where you already test" />
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--4">
          {related.map(({ icon: Icon, name, body, href }) => (
            <a key={name} href={href} className="tm-cell tm-pt">
              <span className="tm-pt__ico">
                <Icon aria-hidden />
              </span>
              <h3 className={H5}>{name}</h3>
              <p>{body}</p>
              <Arw />
            </a>
          ))}
        </div>
        {/* the second row meets the first on one hairline */}
        <div className="tm-grid tm-grid--2 !border-t-0">
          {resources.map((r) => (
            <a key={r.group} href={r.href} className="tm-cell tm-report">
              <span className="tm-label">{r.group}</span>
              <p>{r.label}</p>
              <Arw />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ: the live page's five questions ---------- */

const faq: { q: string; a: ReactNode }[] = [
  { q: "What is accessibility testing?", a: "Accessibility testing checks that people with disabilities can use a website or app, including people who use screen readers, keyboards or magnification." },
  { q: "Which standards does TestMu AI check?", a: "WCAG 2.2, ADA, Section 508 and the European Accessibility Act." },
  { q: "Can automated tools find every accessibility issue?", a: "No. Automated scans catch a large share of issues, but some need a human with assistive technology. TestMu AI combines scans with real devices and screen readers." },
  { q: "Does it test native mobile apps?", a: "Yes. TestMu AI scans native iOS and Android apps on real devices, as well as websites." },
  { q: "Can I add accessibility checks to my existing tests?", a: "Yes. Add checks to Selenium, Playwright and Cypress tests, or use Accessibility DevTools in the browser." },
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

      <main className="relative [&_.sticky]:!top-16">
        <GuideLines />

        <TrustedBy />
        <Glance />
        <How />
        <Caps />
        <CompareDuel
          lead="Browser plug-ins vs"
          title="automated accessibility scans"
          body="Accessibility Testing compared with free browser checkers"
          cta="Start free"
          rival={{ name: "Free browser checkers" }}
          head="What matters"
          groups={cmp}
        />
        <Teams />
        <Related />
        <Reasons integrations={false} />
        <Faq title="What teams ask before an accessibility audit" items={faq} />
        <Enterprise
          title="Find accessibility issues before an audit does"
          body="Free plan: 25 accessibility scans, valid for lifetime."
          primary="Start free"
          secondary="Book a demo"
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
