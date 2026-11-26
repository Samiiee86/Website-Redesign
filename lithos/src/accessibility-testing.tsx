import { StrictMode, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import {
  Check,
  Code,
  Ear,
  ListChecks,
  Wrench,
  ClipboardList,
  Globe,
  ScanEye,
  ShieldCheck,
  Smartphone,
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

/* an arrow that shows on hover (the box or link around it is a "group") */
const HoverArrow = () => (
  <span aria-hidden className="inline-flex size-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
    <Arrow />
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
      className={`tag flex-none rounded-sm px-2 py-0.5 font-mono text-b4 font-medium uppercase tracking-[1px] ${
        ok
          ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]"
          : "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]"
      }`}
    >
      {ok ? "PASS" : "FAIL"}
    </span>
  );
}

/* the live hero's sample run card, in its own colours: off-white head and
   foot, a green "sample run" light, upper-case mono labels, mono results,
   dashed row lines and a blue mark before the evidence line */
function RunCard() {
  return (
    <div className="flex w-full flex-col border border-border bg-surface text-left [box-shadow:var(--tm-shadow-floating-md)]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-5 py-4">
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className="block size-2.5 rounded-full bg-[var(--tm-border-default)]" />
            ))}
          </span>
          <span className="whitespace-nowrap font-mono text-b3">a11y · signup-flow</span>
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap font-mono text-b4 uppercase tracking-[1px] text-[var(--tm-green-500)]">
          <span aria-hidden className="grid size-4 place-items-center rounded-full bg-[var(--tm-green-000)]">
            <i className="block size-2 rounded-full bg-[var(--tm-green-400)]" />
          </span>
          sample run
        </span>
      </div>
      <ol>
        {run.map((r, i) => (
          <li key={r.who} className={`flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 ${i ? "border-t border-dashed border-border" : ""}`}>
            <span className="w-20 flex-none truncate font-mono sm:w-28 text-b4 uppercase tracking-[1px] text-muted-foreground">{r.who}</span>
            <span className="min-w-0 flex-1 font-mono text-b3">{r.what}</span>
            <Tag ok={r.ok} />
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4">
        <span className="font-mono text-b2 font-medium">1 issue · rule 1.4.3</span>
        <span className="flex items-center gap-2 font-mono text-b4 text-muted-foreground">
          <i aria-hidden className="block size-2.5 flex-none bg-[var(--tm-blue-500)]" />
          issue list with element, rule and fix
        </span>
      </div>
    </div>
  );
}

const builtFor = ["Accessibility leads", "Front-end developers", "QA engineers", "Compliance teams"];

/* the live page's hero, as it is: text on the left (pill label, black and
   grey headline, line, buttons, free plan note, "built for" pills), the
   painted scene on the right with the sample run card overlapping it */
function Hero() {
  return (
    <section className="tm-hero tm-hero--split">
      <div className="tm-frame tm-hero__inner">
        <nav aria-label="Breadcrumb" className="tm-crumbs mb-10">
          <a href={SITE}>TestMu AI</a>
          <span aria-hidden>/</span>
          <span aria-current="page">Accessibility Testing</span>
        </nav>
        <div className="tm-hero__grid lg:!grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="min-w-0">
            <p className="pill mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-b4">
              <ShieldCheck size={16} strokeWidth={1.5} aria-hidden />
              <span className="font-medium">Accessibility Testing</span>
              <span aria-hidden className="text-muted-foreground">·</span>
              <time dateTime="2026-11" className="text-muted-foreground">Updated November 2026</time>
            </p>
            <h1 className="!text-[length:var(--tm-h2-size)] !leading-[var(--tm-h2-line)] !tracking-[var(--tm-h2-tracking)] [text-wrap:balance]">
              Accessibility testing tool{" "}
              <span className="text-muted-foreground">for websites and native mobile apps.</span>
            </h1>
            <p className="tm-hero__promise !max-w-none">
              TestMu AI's accessibility testing tool scans websites and native
              iOS and Android apps for WCAG 2.2, ADA, Section 508 and European
              Accessibility Act issues. It runs automated checks on real
              devices and with screen readers, then ties each issue to the
              exact rule it fails and the fix.
            </p>
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
            </div>
            <p className="mt-4 text-b4 text-muted-foreground">
              Free plan: 25 accessibility scans, valid for lifetime.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              <li className="mr-1 text-b4 text-muted-foreground">Built for</li>
              {builtFor.map((b) => (
                <li key={b} className="pill rounded-full bg-[var(--tm-bg-muted)] px-3 py-1 text-b4">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {/* the scene, with the run card hanging off its lower edge */}
          <div className="relative min-w-0">
            <div className="relative aspect-[16/10] overflow-hidden border border-border">
              <img className="absolute inset-0 size-full object-cover" src={`${HERO}/hero-bg.png`} alt="Accessibility testing on TestMu AI" />
            </div>
            <div className="relative -mt-16 ml-auto w-full sm:w-[92%] lg:-mr-10 lg:-mt-32 lg:w-[78%]">
              <RunCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- at a glance: as on the live page ----------
   Heading and the free plan note on the left; the six facts as a two
   column table of joined white cells on the right. */

const facts: [string, string][] = [
  ["What it is", "Automated and assisted accessibility testing for web and mobile"],
  ["Standards", "WCAG 2.2, ADA, Section 508, European Accessibility Act"],
  ["Surfaces", "Websites, web apps, native iOS and Android apps"],
  ["Methods", "Automated scans, real devices, screen readers"],
  ["Pricing", "Free: 25 scans, valid for lifetime; paid plans on the pricing page"],
  ["Start", "Scan a URL or add accessibility checks to existing tests"],
];

/* boxes as on the home page: edge to edge between the frame lines,
   joined by 1px hairlines, no gaps */
const JOIN = "tm-reveal -mx-8 grid gap-px border-y border-border bg-[var(--tm-border-default)]";

/* the live page's small upper-case label */
const LABEL = "text-b4 font-medium uppercase tracking-[1px] text-muted-foreground";

function Glance() {
  return (
    <Section>
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-[640px] [text-wrap:balance]">Accessibility coverage on web and native apps</h2>
        <p className="self-start border border-border bg-surface px-5 py-3 text-b1 font-medium lg:self-end">
          Free plan: 25 accessibility scans, valid for lifetime
        </p>
      </div>
      <dl className={`${JOIN} sm:grid-cols-2 lg:grid-cols-3`}>
          {facts.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 bg-surface p-8">
              <dt className={LABEL}>{k}</dt>
              <dd className="text-b1">{v}</dd>
            </div>
          ))}
      </dl>
    </Section>
  );
}

/* ---------- how it works: kit feature steps ---------- */

const steps = [
  { title: "Scan", body: "Scan a URL, a sitemap or a mobile app build." },
  { title: "Verify", body: "Confirm issues on real devices and with screen readers." },
  { title: "Fix", body: "Each issue names the element, the WCAG rule and how to fix it." },
];

/* card titles in H4 (24/32), card text in B1 (18/28), the DS sizes */
const H4 = "!text-[length:var(--tm-h4-size)] !leading-[var(--tm-h4-line)] !tracking-[var(--tm-h4-tracking)] !font-medium";

/* as on the live page: a dark band, the heading on one line, three dark
   step cells with mono numbers. Joined cells with hairlines (DS card
   frames), sharp corners. */
function How() {
  return (
    <Section className="!bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
      <h2 className="mb-12 [text-wrap:balance]">Scan, review, fix, re-scan</h2>
      <div className="tm-reveal -mx-8">
        <ol className="grid gap-px border-y border-[var(--tm-bg-inverse-muted)] bg-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)] md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 bg-[var(--tm-bg-inverse-muted)] p-8">
              <span className="font-mono text-b1 font-medium text-[var(--tm-blue-300)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`mt-2 ${H4}`}>{s.title}</h3>
              <p className="text-b1 text-[var(--tm-fg-inverse-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- capabilities: as on the live page ----------
   Heading on the left; the six checks as feature pointers (icon, title,
   line) in joined white cells, two columns, on the right. */

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
      <h2 className="mb-12 max-w-[640px] [text-wrap:balance]">WCAG checks for web and native apps</h2>
      <ul className={`${JOIN} sm:grid-cols-2 lg:grid-cols-3`}>
          {caps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-2 bg-surface p-8">
              <Icon size={40} strokeWidth={1.25} aria-hidden className="mb-4" />
              <h3 className={H4}>{title}</h3>
              <p className="text-b1 text-muted-foreground">{body}</p>
            </li>
          ))}
      </ul>
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

/* ---------- teams: as on the live page ----------
   Three plan cells, joined edge to edge; Enterprise is the dark one. */

const teams = [
  { name: "Startups and SMBs", for: "Start small", items: ["25 free scans, valid for lifetime", "Scheduled scans for WCAG, ADA and Section 508"] },
  { name: "Mid-market", for: "Scale across squads and CI", items: ["Native iOS and Android app scans on real devices", "Issues pushed to Jira with WCAG references"] },
  { name: "Enterprise", for: "Security, control and support", items: ["Custom platform access controls for teams", "Certifications, ESG attestation and continuous monitoring (Trust Center)"], dark: true },
];

function Teams() {
  return (
    <Section>
      <h2 className="mb-12 [text-wrap:balance]">Accessibility for one site or a design system</h2>
      <div className={`${JOIN} md:grid-cols-3`}>
        {teams.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col gap-5 p-8 ${t.dark ? "bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]" : "bg-surface"}`}
          >
            <div className="flex flex-col gap-1">
              <h3 className={H4}>{t.name}</h3>
              <p className={`text-b2 ${t.dark ? "text-[var(--tm-fg-inverse-muted)]" : "text-muted-foreground"}`}>{t.for}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {t.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-b1">
                  <Check size={16} strokeWidth={1.5} aria-hidden className={`mt-1 flex-none ${t.dark ? "text-[var(--tm-green-300)]" : "text-[var(--tm-fg-success)]"}`} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- related: as on the live page ----------
   Four product boxes (icon, name, line), joined; then the two resource
   groups as plain columns under a hairline. */

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
      <h2 className="mb-12 [text-wrap:balance]">Test accessibility where you already test</h2>
      <div className={`${JOIN} sm:grid-cols-2 lg:grid-cols-4`}>
        {related.map(({ icon: Icon, name, body, href }) => (
          <a key={name} href={href} className="group flex flex-col gap-2 bg-surface p-8 transition-colors duration-300 hover:bg-[var(--tm-bg-fill)]">
            <Icon size={40} strokeWidth={1.25} aria-hidden className="mb-4" />
            <h3 className={H4}>{name}</h3>
            <p className="text-b1 text-muted-foreground">{body}</p>
            <span className="mt-auto pt-2"><HoverArrow /></span>
          </a>
        ))}
      </div>
      {/* the resource row joins the boxes above on one hairline */}
      <div className={`${JOIN} !border-t-0 sm:grid-cols-2`}>
        {resources.map((r) => (
          <div key={r.group} className="flex flex-col gap-3 bg-surface p-8">
            <h3 className={`!text-b4 !tracking-[1px] ${LABEL}`}>{r.group}</h3>
            <a href={r.href} className="group inline-flex items-center gap-2 self-start text-b1 font-medium">
              <span className="underline decoration-1 underline-offset-4">{r.label}</span>
              <HoverArrow />
            </a>
          </div>
        ))}
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
        <Faq title="What teams ask before an accessibility audit" items={faq} />
        <Reasons integrations={false} />
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
