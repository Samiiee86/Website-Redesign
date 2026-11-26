import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Search, Code, Ear, ListChecks, ShieldCheck, Smartphone, Wrench, ScanEye, Globe, ClipboardList, type LucideIcon } from "lucide-react";
import { Section } from "../lib/ui";
import GuideLines from "../components/GuideLines";
import Header from "../components/Header";
import TrustedBy from "../sections/TrustedBy";
import Reasons from "../sections/Reasons";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";
import { Reveal } from "../lib/ui";
import { FoldHead } from "../pieces/compare/parts";
import MatrixTable from "../pieces/compare/MatrixTable";
import SpecTable from "../pieces/SpecTable";
import { iconFor } from "./icons";
import type { PageData, Run, Sec } from "./types";

/* One testmuai.com product page, rebuilt from its live page's data
   (src/product/data/<slug>.json, made by the extract script from the live
   HTML, every word as it is). The approved accessibility testing page is
   the pattern for every section:

   - hero: pill label, black and grey headline, line, buttons, note and
     "built for" pills on the left; the live page's scene on the right
     with its sample run card overlapping it
   - every group of boxes runs edge to edge between the frame lines with
     1px hairlines and no gaps, as on the home page
   - headings on two lines, a grey lead and a black main line
   - card titles H4, card text B1, card icons 40px
   - steps as a dark band with 01-03 mono numbers
   - the comparison as the pieces library head to head; data tables as the
     spec table
   - shared folds: header, logo wall, more reasons (in place of the live
     Gartner and numbers strip), FAQ, the live closing banner, footer */

const SITE = "https://www.testmuai.com";
const DEMO = `${SITE}/demo/`;

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

/* the arrow after an underlined link: always shown, nudging right on hover */
const LinkArrow = () => (
  <span aria-hidden className="ml-2 inline-flex size-4 flex-none align-[-2px] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
    <Arrow />
  </span>
);

/* card titles 20/28 (the kit's own card title size, as Sameer asked), card text B1 (18/28) */
const H4 = "!text-[20px] !leading-[28px] !tracking-[-0.5px] !font-medium";
/* boxes as on the home page: edge to edge between the frame lines,
   joined by 1px hairlines, no gaps */
const JOIN = "tm-reveal -mx-8 grid gap-px border-y border-border bg-[var(--tm-border-default)]";
/* the kit's self-fitting joined frame (2, 3, 4 a row; 5 = 3 + 2 ...) */
const FIT = "tm-reveal tm-join !-mx-8";
const LABEL = "text-b4 font-medium uppercase tracking-[1px] text-muted-foreground";

/* icons the approved accessibility page settled on; everything else is
   picked from the box's own words */
const ICONS: Record<string, LucideIcon> = {
  "Accessibility Testing": ShieldCheck,
  "WCAG 2.2, ADA, 508, EAA": ShieldCheck,
  "Native mobile apps": Smartphone,
  "Real devices and screen readers": Ear,
  "Rule-level fixes": Wrench,
  "In your test suite": ListChecks,
  "Accessibility DevTools": Code,
  SmartUI: ScanEye,
  "Real Device Cloud": Smartphone,
  "Cross Browser Testing": Globe,
  "Test Manager": ClipboardList,
};
const icon = (title: string, body = "") => ICONS[title] ?? iconFor(title, body);

/* ---------- two-line headings ----------
   A grey lead and a black main line, split where the two lines come out
   closest in length, preferring a break before a joining word ("on",
   "for", "or" ...) or after a comma or "vs", never after "a", "the",
   "and" and the like. Short headings (one or two words) stay on one line. */

const LEADS_INTO = new Set(["on", "for", "or", "in", "with", "where", "to", "from", "before", "across", "at", "by", "that", "your", "without", "and"]);
const NEVER_LAST = new Set(["a", "an", "the", "and", "or", "of", "to", "for", "on", "in", "with", "your", "by", "at", "from", "they", "what", "you", "we", "it", "is", "are", "every", "its", "how"]);

export function split(title: string): [string, string] {
  const w = title.split(" ");
  if (w.length < 3) return ["", title];
  let best = 1;
  let score = Infinity;
  for (let k = 1; k < w.length; k++) {
    const a = w.slice(0, k).join(" ");
    const b = w.slice(k).join(" ");
    let s = Math.abs(a.length - b.length);
    const first = w[k].toLowerCase();
    const last = w[k - 1].toLowerCase();
    if (LEADS_INTO.has(first)) s -= 8;
    if (last.endsWith(",") || last.endsWith(":")) s -= 6;
    if (last === "vs" || last === "vs.") s -= 10;
    if (first === "vs" || first === "vs.") s += 10;
    if (NEVER_LAST.has(last)) s += 20;
    if (s < score) {
      score = s;
      best = k;
    }
  }
  return [w.slice(0, best).join(" "), w.slice(best).join(" ")];
}

function Heading({ text, dark = false, className = "mb-12" }: { text: string; dark?: boolean; className?: string }) {
  const [lead, main] = split(text);
  return (
    <h2 className={`max-w-[760px] [text-wrap:balance] ${className}`}>
      {lead && <span className={`block ${dark ? "text-[var(--tm-fg-inverse-muted)]" : "text-muted-foreground"}`}>{lead}</span>}
      <span className="block">{main}</span>
    </h2>
  );
}

/* a section's description, under its heading */
function Body({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <div className="-mt-6 mb-12 flex max-w-[720px] flex-col gap-3">
      {lines.map((l) => (
        <p key={l} className="text-b1 text-muted-foreground">{l}</p>
      ))}
    </div>
  );
}

/* ---------- hero ---------- */

function Tag({ st }: { st: Run["rows"][number]["st"] }) {
  if (!st) return null;
  const tone =
    st.kind === "pass"
      ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]"
      : st.kind === "fail"
        ? "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]"
        : "bg-[var(--tm-bg-muted)] text-muted-foreground";
  return <span className={`tag flex-none rounded-sm px-1.5 py-0.5 font-mono text-b5 font-medium uppercase tracking-[1px] ${tone}`}>{st.label}</span>;
}

/* the live hero's sample run card, in its own colours: off-white head and
   foot, a green "sample run" light, upper-case mono labels, mono results,
   dashed row lines and a blue mark before the evidence line */
function RunCard({ run }: { run: Run }) {
  /* the live page's terminal card is black; every other card is white */
  const dark = run.variant === "terminal";
  const shell = dark
    ? "border-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)] bg-[var(--tm-bg-inverse)] text-[var(--tm-bg-muted)]"
    : "border-border bg-surface";
  const bar = dark
    ? "border-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)] bg-[var(--tm-bg-inverse-muted)]"
    : "border-border bg-background";
  const muted = dark ? "text-[var(--tm-fg-inverse-muted)]" : "text-muted-foreground";
  const rule = dark ? "border-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)]" : "border-border";
  return (
    <div className={`flex w-full flex-col border text-left ${dark ? "[box-shadow:var(--tm-shadow-floating-lg)]" : "[box-shadow:var(--tm-shadow-floating-md)]"} ${shell}`}>
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${bar}`}>
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex flex-none gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className={`block size-2.5 rounded-full ${dark ? "bg-[var(--tm-fg-inverse-muted)]" : "bg-[var(--tm-border-default)]"}`} />
            ))}
          </span>
          <span className="truncate font-mono text-b4">{run.title}</span>
        </span>
        {run.live && (
          <span className={`flex flex-none items-center gap-2 whitespace-nowrap font-mono text-b4 uppercase tracking-[1px] ${dark ? "text-[var(--tm-green-200)]" : "text-[var(--tm-green-500)]"}`}>
            <span aria-hidden className={`grid size-4 place-items-center rounded-full ${dark ? "bg-[color-mix(in_srgb,var(--tm-green-200)_25%,transparent)]" : "bg-[var(--tm-green-000)]"}`}>
              <i className={`block size-2 rounded-full ${dark ? "bg-[var(--tm-green-200)]" : "bg-[var(--tm-green-400)]"}`} />
            </span>
            {run.live}
          </span>
        )}
      </div>
      {run.diff.length > 0 && (
        /* the visual diff: baseline and current, the middle block moved */
        <div className="grid grid-cols-2 gap-px border-b border-border bg-[var(--tm-border-default)]">
          {run.diff.map((p, i) => (
            <div key={p} className="flex flex-col gap-2 bg-background p-4">
              <span className="font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">{p}</span>
              <i className="block h-2 w-3/4 bg-[var(--tm-bg-muted)]" />
              <i className={`block h-6 w-1/2 ${i ? "translate-x-3 bg-[var(--tm-red-000)] outline outline-1 outline-[var(--tm-red-400)]" : "bg-[var(--tm-bg-muted)]"}`} />
              <i className="block h-2 w-2/3 bg-[var(--tm-bg-muted)]" />
            </div>
          ))}
        </div>
      )}
      <ol className={dark ? "py-2" : ""}>
        {run.rows.map((r, i) => (
          <li
            key={`${r.who}-${i}`}
            className={`flex items-center gap-3 px-4 py-2 ${i && !dark ? `border-t border-dashed ${rule}` : ""}`}
          >
            {r.pr && <span aria-hidden className="flex-none font-mono text-b4 text-[var(--tm-green-200)]">{r.pr}</span>}
            <span className={`w-20 flex-none truncate font-mono text-b5 uppercase tracking-[1px] sm:w-24 ${muted}`}>{r.who}</span>
            <span className="min-w-0 flex-1 font-mono text-b4">{r.text}</span>
            <Tag st={r.st} />
          </li>
        ))}
      </ol>
      {(run.verdict || run.evid) && (
        <div className={`flex flex-col gap-1 border-t px-4 py-3 ${bar}`}>
          {run.verdict && (
            <span className={`font-mono text-b3 font-medium ${dark ? "text-[var(--tm-green-200)]" : ""}`}>{run.verdict}</span>
          )}
          {run.evid && (
            <span className={`flex items-center gap-2 font-mono text-b4 ${muted}`}>
              <i aria-hidden className="block size-2.5 flex-none bg-[var(--tm-blue-500)]" />
              {run.evid}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Cta({ c, i }: { c: PageData["hero"]["ctas"][number]; i: number }) {
  const href = c.href ?? DEMO;
  if (i === 0)
    return (
      <a className="tm-btn tm-btn--primary tm-btn--arrow tm-btn--plain" href={href}>
        {c.label}
        <span className="tm-chip" aria-hidden="true">
          <span>
            <Arrow />
            <Arrow />
          </span>
        </span>
      </a>
    );
  return (
    <a className="tm-btn tm-btn--secondary" href={href}>
      {c.label}
    </a>
  );
}

function Hero({ d }: { d: PageData }) {
  const h = d.hero;
  const Pill = icon(h.eyebrow[0] ?? "", d.slug);
  return (
    <section className="tm-hero tm-hero--split relative z-[2] lg:!pt-10">
      <div className="tm-frame tm-hero__inner">
        {d.crumb.length > 1 && (
          <nav aria-label="Breadcrumb" className="tm-crumbs mb-6">
            {d.crumb.map((c, i) =>
              i < d.crumb.length - 1 ? (
                <span key={c} className="contents">
                  <a href={SITE}>{c}</a>
                  <span aria-hidden>/</span>
                </span>
              ) : (
                <span key={c} aria-current="page">{c}</span>
              ),
            )}
          </nav>
        )}
        <div className="tm-hero__grid lg:!grid-cols-[minmax(0,1fr)_466px]">
          <div className="min-w-0">
            {h.eyebrow.length > 0 && (
              <p className="pill mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-b4">
                <Pill size={16} strokeWidth={1.5} aria-hidden />
                <span className="font-medium">{h.eyebrow[0]}</span>
                {h.eyebrow.slice(1).map((e) => (
                  <span key={e} className="contents">
                    <span aria-hidden className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{e}</span>
                  </span>
                ))}
              </p>
            )}
            <h1 className="!text-[length:var(--tm-h2-size)] !leading-[var(--tm-h2-line)] !tracking-[var(--tm-h2-tracking)] [text-wrap:balance]">
              {h.h1a}
              {h.h1b && (
                <>
                  {" "}
                  <span className="text-muted-foreground">{h.h1b}</span>
                </>
              )}
            </h1>
            {h.lede && <p className="tm-hero__promise !max-w-none">{h.lede}</p>}
            <div className="tm-actions tm-hero__actions">
              {h.ctas.map((c, i) => (
                <Cta key={c.label} c={c} i={i} />
              ))}
            </div>
            {h.note && <p className="mt-4 text-b4 text-muted-foreground">{h.note}</p>}
            {h.chips.length > 0 && (
              <ul className="mt-6 flex flex-wrap items-center gap-2">
                {h.chipsLabel && <li className="mr-1 text-b4 text-muted-foreground">{h.chipsLabel}</li>}
                {h.chips.map((b) => (
                  <li key={b} className="pill rounded-full bg-[var(--tm-bg-muted)] px-3 py-1 text-b4">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* the scene, with the run card overlapping its lower edge by 40px
              (80% wide, as on the live page); with
              no scene on the live page, the card stands on its own */}
          <div className="relative min-w-0">
            {h.image ? (
              <>
                {/* the whole picture at its own shape in the live page's 466px
                    column: no crop, live size */}
                <div className="overflow-hidden border border-border">
                  <img className="block h-auto w-full" src={h.image.src} alt={h.image.alt} fetchPriority="high" />
                </div>
                {h.run && (
                  <div className="relative -mt-10 ml-auto w-full sm:-mr-3 sm:w-4/5">
                    <RunCard run={h.run} />
                  </div>
                )}
              </>
            ) : (
              h.run && <RunCard run={h.run} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- sections ---------- */

/* at a glance, in the live page's order: the heading and the plan note on
   the left, the six facts as a two-column table of joined white cells on
   the right, running out to the right frame line */
function Glance({ s }: { s: Extract<Sec, { type: "glance" }> }) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Heading text={s.head} className="" />
          {s.price && <p className="border border-border bg-surface px-5 py-3 text-b1 font-medium">{s.price}</p>}
        </div>
        <dl className="tm-reveal -mx-8 grid gap-px self-start border-y border-border bg-[var(--tm-border-default)] sm:grid-cols-2 lg:mx-0 lg:-mr-8 lg:border-l">
          {s.facts.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 bg-surface p-8">
              <dt className={LABEL}>{k}</dt>
              <dd className="text-b1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* a dark band, three dark step cells with mono numbers */
function Steps({ s }: { s: Extract<Sec, { type: "steps" }> }) {
  return (
    <Section className="!bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
      <Heading text={s.head} dark />
      {s.body.length > 0 && (
        <div className="-mt-6 mb-12 flex max-w-[720px] flex-col gap-3">
          {s.body.map((l) => (
            <p key={l} className="text-b1 text-[var(--tm-fg-inverse-muted)]">{l}</p>
          ))}
        </div>
      )}
      <div className="tm-reveal -mx-8">
        <ol className="grid gap-px border-y border-[var(--tm-bg-inverse-muted)] bg-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)] md:grid-cols-3">
          {s.items.map(([title, body], i) => (
            <li key={title} className="flex flex-col gap-2 bg-[var(--tm-bg-inverse-muted)] p-8">
              <span className="font-body text-b1 font-medium text-[var(--tm-blue-300)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`mt-2 ${H4}`}>{title}</h3>
              <p className="text-b1 text-[var(--tm-fg-inverse-muted)]">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* feature pointers: icon, title, line, in joined white cells */
function Caps({ s }: { s: Extract<Sec, { type: "caps" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <ul className={`${JOIN} sm:grid-cols-2 lg:grid-cols-3`}>
        {s.items.map(([title, body]) => {
          const Icon = icon(title, body);
          return (
            <li key={title} className="flex flex-col gap-2 bg-surface p-8">
              <Icon size={40} strokeWidth={1.25} aria-hidden className="mb-4" />
              <h3 className={H4}>{title}</h3>
              <p className="text-b1 text-muted-foreground">{body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* a numbered plan (the AI testing strategy): joined cells, mono numbers */
function Strat({ s }: { s: Extract<Sec, { type: "strat" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <ol className={FIT}>
        {s.items.map(([title, body], i) => (
          <li key={title} className="flex flex-col gap-2 !p-8">
            <span className="font-body text-b1 font-medium text-[var(--tm-fg-link)]">{String(i + 1).padStart(2, "0")}</span>
            <h3 className={`mt-2 ${H4}`}>{title}</h3>
            <p className="text-b1 text-muted-foreground">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* the live page's comparison, as the pieces library head to head */
/* the kit's code block: a bar with the snippet's name and Copy, the
   numbered lines, and the live page's note under it */
function CodePanel({ c }: { c: NonNullable<Extract<Sec, { type: "cmp" }>["code"]> }) {
  const [copied, setCopied] = useState(false);
  /* the live page's black terminal: name and Copy on top, the commands,
     the note under them */
  return (
    <div className="flex flex-col bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]">
      <div className="flex items-center justify-between gap-4 border-b border-[color-mix(in_srgb,var(--tm-fg-inverse)_12%,transparent)] px-6 py-3">
        <span className="font-mono text-b4 text-[var(--tm-fg-inverse-muted)]">{c.label}</span>
        <button
          type="button"
          /* as on the live terminal: a dark grey fill, no outline, mono */
          className="btn inline-flex items-center gap-1.5 rounded-md !border-0 !shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tm-fg-link)] bg-[var(--tm-bg-inverse-muted)] px-3 py-1.5 font-mono text-b4 text-[var(--tm-bg-muted)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--tm-fg-inverse)_16%,transparent)]"
          onClick={() => {
            navigator.clipboard?.writeText(c.code).then(() => setCopied(true));
          }}
        >
          Copy
          {copied && <Check size={16} strokeWidth={1.5} aria-hidden />}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto px-6 py-6 font-mono text-b3 leading-[var(--tm-b2-line)] text-[var(--tm-bg-muted)]">
        <code>{c.code}</code>
      </pre>
      {c.note && <p className="px-6 pb-6 text-b3 text-[var(--tm-fg-inverse-muted)]">{c.note}</p>}
    </div>
  );
}

/* the live page's comparison as the pieces library head to head; with a
   code snippet (as on the live page) the black terminal sits on its left */
function Compare({ s }: { s: Extract<Sec, { type: "cmp" }> }) {
  const [lead, title] = split(s.head);
  const lines = [s.caption, ...s.body, ...s.notes].filter(Boolean);
  return (
    <Section>
      <FoldHead
        lead={lead}
        title={title}
        body={
          <>
            {lines.map((l, i) => (
              <span key={l} className={i ? "mt-3 block" : "block"}>
                {l}
              </span>
            ))}
          </>
        }
      />
      {s.code ? (
        /* as on the live page: the terminal (narrower, its own height) and
           the table side by side, with space between them */
        <div className="tm-reveal grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <CodePanel c={s.code} />
          {/* the same framed head to head as on every other page */}
          <MatrixTable
            label={`${lead} ${title}`}
            rivals={[{ name: s.cols[1] }]}
            groups={[{ label: "", rows: s.rows.map(([name, them, us]) => ({ name, values: [us, them] })) }]}
            cta={s.cta}
            head={s.cols[0]}
            plain
            oursWeight={1.4}
          />
        </div>
      ) : (
        <Reveal delay={0.08} className="-mx-8">
          <MatrixTable
            label={`${lead} ${title}`}
            rivals={[{ name: s.cols[1] }]}
            groups={[{ label: "", rows: s.rows.map(([name, them, us]) => ({ name, values: [us, them] })) }]}
            cta={s.cta}
            head={s.cols[0]}
            plain
            oursWeight={1.4}
          />
        </Reveal>
      )}
    </Section>
  );
}

/* browser lists by operating system: one ruled row per system that opens
   to its table */
function Groups({ s }: { s: Extract<Sec, { type: "groups" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={[...s.body, s.src].filter(Boolean)} />
      <div className="tm-reveal -mx-8 border-t border-border">
        {s.groups.map((g) => (
          <details key={g.name} className="group border-b border-border bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-8 py-5 transition-colors duration-200 hover:bg-[var(--tm-bg-fill)] [&::-webkit-details-marker]:hidden">
              <span className="text-b1 font-medium">
                {g.name} <span className="font-normal text-muted-foreground">{g.count}</span>
              </span>
              <ChevronDown size={20} strokeWidth={1.5} aria-hidden className="flex-none transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="overflow-x-auto border-t border-border">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="bg-background">
                    {g.cols.map((c) => (
                      <th key={c} scope="col" className={`px-8 py-3 ${LABEL}`}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r, i) => (
                    <tr key={i} className="border-t border-border">
                      {r.map((c, j) => (
                        <td key={j} className={`px-8 py-3 text-b2 ${j === r.length - 1 ? "font-mono" : ""}`}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* the MCP setup: the server URL and two commands, each with Copy, then one
   box per AI client */
function CopyLine({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex min-w-0 items-center gap-3 border border-border bg-background px-4 py-2">
      <code className="min-w-0 flex-1 break-all font-mono text-b3">{value}</code>
      <button
        type="button"
        aria-label="Copy"
        className="tm-ibtn tm-ibtn--invisible tm-ibtn--sm flex-none"
        onClick={() => navigator.clipboard?.writeText(value).then(() => setCopied(true))}
      >
        {copied ? <Check size={16} strokeWidth={1.5} aria-hidden /> : <ClipboardList size={16} strokeWidth={1.5} aria-hidden />}
      </button>
    </div>
  );
}

function Mcp({ s }: { s: Extract<Sec, { type: "mcp" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <div className={`${FIT} mb-0`}>
        {s.setups.map((u) => (
          <div key={u.label} className="flex flex-col gap-3 !p-8">
            <span className={LABEL}>{u.label}</span>
            <CopyLine value={u.value} />
            {u.button && u.href && (
              <a className="tm-btn tm-btn--primary tm-btn--arrow tm-btn--plain self-start" href={u.href}>
                {u.button}
                <span className="tm-chip" aria-hidden="true">
                  <span>
                    <Arrow />
                    <Arrow />
                  </span>
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
      <div className={`${FIT} !border-t-0`}>
        {s.cards.map((c) => (
          <a key={c.name} href={c.href ?? "#"} className="group flex flex-col gap-2 !p-8 transition-colors duration-300 hover:bg-[var(--tm-bg-fill)]">
            {c.logo && <img src={c.logo} alt={`${c.name} logo`} width={40} height={40} className="mb-4 size-10 object-contain" loading="lazy" />}
            <h3 className={H4}>{c.name}</h3>
            <p className="text-b1 text-muted-foreground">{c.body}</p>
            <span className="mt-auto inline-flex items-center pt-2 text-b1 font-medium">
              <span className="underline decoration-1 underline-offset-4">{c.cta}</span>
              <LinkArrow />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* the real device list: Live or Automation, a brand, a search, and the
   brand's devices in joined cells */
function Devices({ s }: { s: Extract<Sec, { type: "devices" }> }) {
  const [tab, setTab] = useState(0);
  const [brand, setBrand] = useState(0);
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const src = ql ? s.groups.flatMap((g) => g.devices) : s.groups[brand].devices;
    return ql ? src.filter(([n]) => n.toLowerCase().includes(ql)) : src;
  }, [s.groups, brand, q]);
  return (
    <Section>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="tm-seg" role="group" aria-label="Testing type">
          {s.tabs.map((t, i) => (
            <button key={t} type="button" aria-pressed={tab === i} onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>
        <label className="tm-field w-full lg:w-[400px]">
          <span className="tm-field__box">
            <Search aria-hidden />
            <input type="search" aria-label="Search devices" value={q} onChange={(e) => setQ(e.target.value)} />
          </span>
        </label>
      </div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Brand">
        {s.groups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            aria-pressed={!q && brand === i}
            onClick={() => {
              setBrand(i);
              setQ("");
            }}
            className={`pill rounded-full border px-3 py-1 text-b3 transition-colors duration-200 ${!q && brand === i ? "border-[var(--tm-border-emphasis)] bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]" : "border-border bg-surface hover:bg-[var(--tm-bg-fill)]"}`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <ul className={`${JOIN} sm:grid-cols-2 lg:grid-cols-4`}>
        {list.map(([name, ver], i) => (
          <li key={`${name}-${ver}-${i}`} className="bg-surface">
            <a href={s.href} className="group flex items-center justify-between gap-3 px-6 py-4 transition-colors duration-200 hover:bg-[var(--tm-bg-fill)]">
              <span className="text-b2">{name}</span>
              <span className="flex-none font-mono text-b4 text-muted-foreground">{ver}</span>
            </a>
          </li>
        ))}
      </ul>
      {s.promos.length > 0 && (
        /* the live list's two side offers, as dark joined boxes under it */
        <div className={`${FIT} !border-t-0 !bg-[var(--tm-bg-inverse-muted)]`}>
          {s.promos.map((p) => (
            <div key={p.title} className="relative flex min-h-[200px] flex-col items-start gap-3 overflow-hidden !bg-[var(--tm-bg-inverse)] !p-8 text-[var(--tm-fg-inverse)]">
              <h3 className={H4}>{p.title}</h3>
              <p className="max-w-[420px] text-b1 text-[var(--tm-fg-inverse-muted)]">{p.body}</p>
              <a className="tm-btn tm-btn--secondary relative z-[1] mt-auto" href={p.href ?? `${SITE}/contact-us/`}>
                {p.cta}
              </a>
              {p.img && <img src={p.img} alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-0 max-h-[160px] w-auto" loading="lazy" />}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* a reference table (types, browsers, devices ...), as the spec table */
function Data({ s }: { s: Extract<Sec, { type: "data" }> }) {
  const [lead, title] = split(s.head);
  const lines = [...s.body, s.src].filter(Boolean);
  return (
    <SpecTable
      lead={lead}
      title={title}
      body={
        (
          <>
            {lines.map((l, i) => (
              <span key={l} className={i ? "mt-3 block" : "block"}>
                {l}
              </span>
            ))}
          </>
        ) as unknown as string
      }
      columns={s.cols}
      rows={s.rows.map(([name, ...cells]) => ({ name, cells }))}
    />
  );
}

function Teams({ s }: { s: Extract<Sec, { type: "teams" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <div className={`${JOIN} md:grid-cols-3`}>
        {s.items.map((t) => (
          <div key={t.name} className={`flex flex-col gap-5 p-8 ${t.dark ? "bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]" : "bg-surface"}`}>
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

/* customer results: a big number (Manrope) on the left, the line and the
   case study link on the right */
function Stories({ s }: { s: Extract<Sec, { type: "stories" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <div className={FIT}>
        {s.items.map((st) => (
          /* like the HyperExecute quote card: the number on the left, the
             line and the link on the right */
          <a key={st.href} href={st.href} className="group grid items-start gap-6 !p-8 transition-colors duration-300 hover:bg-[var(--tm-bg-fill)] lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-10 lg:!p-10">
            <span className="font-body text-[length:var(--tm-h1-size)] font-medium leading-none tracking-[var(--tm-h1-tracking)]">{st.num}</span>
            <span className="flex flex-col gap-6">
              <span className="block max-w-[640px] text-[length:var(--tm-h4-size)] leading-[var(--tm-h4-line)] tracking-[var(--tm-h4-tracking)] [text-wrap:balance]">
                {st.text}
              </span>
              <span className="inline-flex items-center whitespace-nowrap text-b1 font-medium">
                <span className="underline decoration-1 underline-offset-4">{st.cta.replace(/\s*→\s*$/, "")}</span>
                <LinkArrow />
              </span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Related({ s }: { s: Extract<Sec, { type: "rel" }> }) {
  return (
    <Section>
      <Heading text={s.head} />
      <Body lines={s.body} />
      <div className={FIT}>
        {s.items.map(({ name, body, href }) => {
          const Icon = icon(name, body);
          return (
            <a key={name} href={href} className="group flex flex-col gap-2 !p-8 transition-colors duration-300 hover:bg-[var(--tm-bg-fill)]">
              <Icon size={40} strokeWidth={1.25} aria-hidden className="mb-4" />
              <h3 className={`flex items-center gap-2 ${H4}`}>
                {name}
                <HoverArrow />
              </h3>
              <p className="text-b1 text-muted-foreground">{body}</p>
            </a>
          );
        })}
      </div>
      {s.res.length > 0 && (
        /* the resource row joins the boxes above on one hairline */
        <div className={`${FIT} !border-t-0`}>
          {s.res.map((r) => (
            <div key={r.group} className="flex flex-col gap-3 !p-8">
              <h3 className={`!text-b4 !tracking-[1px] ${LABEL}`}>{r.group}</h3>
              <ul className="flex flex-col gap-2">
                {r.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group inline text-b1 font-medium">
                      <span className="underline decoration-1 underline-offset-4">{l.label}</span>
                      <LinkArrow />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {s.fw && (
        <details className="tm-reveal group -mx-8 block border-b border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-8 py-5 text-b1 font-medium transition-colors duration-200 hover:bg-[var(--tm-bg-fill)] [&::-webkit-details-marker]:hidden">
            {s.fw.summary}
            <ChevronDown size={20} strokeWidth={1.5} aria-hidden className="flex-none transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <dl className="grid gap-px border-t border-border bg-[var(--tm-border-default)] sm:grid-cols-2 lg:grid-cols-3">
            {s.fw.groups.map((g) => (
              <div key={g.title} className="flex flex-col gap-3 bg-surface p-8">
                <dt className="text-b1 font-medium">
                  {g.href ? (
                    <a href={g.href} className="group inline">
                      <span className="underline decoration-1 underline-offset-4">{g.title}</span>
                      <LinkArrow />
                    </a>
                  ) : (
                    g.title
                  )}
                </dt>
                {g.links.length > 0 && (
                  <dd className="flex flex-wrap gap-x-4 gap-y-2 text-b2 text-muted-foreground">
                    {g.links.map((l) => (
                      <a key={l.label} href={l.href} className="hover:text-foreground hover:underline hover:underline-offset-4">{l.label}</a>
                    ))}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </details>
      )}
    </Section>
  );
}

/* ---------- closing call: the live page's dark banner ----------
   Black, with the live page's blue glow rising from the right; the
   heading, line and buttons centred, as on the home page's closing call.
   Runs edge to edge between the frame lines, sharp corners. */

function Final({ s, ctas }: { s: Extract<Sec, { type: "final" }>; ctas: PageData["hero"]["ctas"] }) {
  const list = s.ctas.length ? s.ctas : ctas;
  return (
    <Section className="!pt-0 md:!pt-0">
      <div className="tm-reveal relative -mx-8 overflow-hidden bg-[var(--tm-bg-inverse)] px-8 py-24 text-center text-[var(--tm-fg-inverse)] md:py-28">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(ellipse_60%_80%_at_75%_45%,color-mix(in_srgb,var(--tm-blue-500)_55%,transparent),color-mix(in_srgb,var(--tm-blue-900)_45%,transparent)_45%,transparent_75%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <h2 className="[text-wrap:balance]">{s.head}</h2>
          {s.body && <p className="text-b1 text-[var(--tm-fg-inverse-muted)]">{s.body}</p>}
          <div className="tm-actions mt-6 justify-center">
            {list.map((c, i) =>
              i === 0 ? (
                <a key={c.label} className="tm-btn tm-btn--secondary tm-btn--arrow tm-btn--plain" href={c.href ?? DEMO}>
                  {c.label}
                  <span className="tm-chip" aria-hidden="true">
                    <span>
                      <Arrow />
                      <Arrow />
                    </span>
                  </span>
                </a>
              ) : (
                <a key={c.label} className="tm-btn tm-btn--outline-inverse" href={c.href ?? DEMO}>
                  {c.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- page ---------- */

declare global {
  interface Window {
    TestMu?: { init: (root?: Element) => void };
  }
}

export default function ProductPage({ d }: { d: PageData }) {
  const kit = useRef<HTMLDivElement>(null);

  /* start the kit script on the kit folds once they are drawn (once only:
     StrictMode runs effects twice in development) */
  useEffect(() => {
    const el = kit.current;
    if (!el || el.dataset.tmReady) return;
    el.dataset.tmReady = "1";
    window.TestMu?.init(el);
  }, []);

  const final = d.sections.find((s) => s.type === "final") as Extract<Sec, { type: "final" }> | undefined;
  const faq = d.sections.find((s) => s.type === "faq") as Extract<Sec, { type: "faq" }> | undefined;

  const body: ReactNode[] = d.sections.map((s, i) => {
    switch (s.type) {
      case "glance":
        return <Glance key={i} s={s} />;
      case "steps":
        return <Steps key={i} s={s} />;
      case "caps":
        return <Caps key={i} s={s} />;
      case "strat":
        return <Strat key={i} s={s} />;
      case "cmp":
        return <Compare key={i} s={{ ...s, cta: d.hero.ctas[0]?.label }} />;
      case "data":
        return <Data key={i} s={s} />;
      case "groups":
        return <Groups key={i} s={s} />;
      case "mcp":
        return <Mcp key={i} s={s} />;
      case "devices":
        return <Devices key={i} s={s} />;
      case "teams":
        return <Teams key={i} s={s} />;
      case "stories":
        return <Stories key={i} s={s} />;
      case "rel":
        return <Related key={i} s={s} />;
      default:
        return null;
    }
  });

  return (
    <div ref={kit} className="relative min-h-screen bg-background font-body">
      <Header />
      <Hero d={d} />

      <main className="relative [&_.sticky]:!top-16">
        <GuideLines />

        <TrustedBy />
        {body}
        {faq && <Faq title={faq.head} items={faq.items} />}
        {/* numbers in Manrope on these pages, not the pixel face */}
        <div className="contents [&_.pixel]:![font-family:var(--tm-font-sans)] [&_.pixel]:!font-medium [&_.tm-pixel]:![font-family:var(--tm-font-sans)]">
          <Reasons integrations={false} />
        </div>
        {final && <Final s={final} ctas={d.hero.ctas} />}
        <Footer />
      </main>
    </div>
  );
}
