import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { platform } from "../lib/content";
import { Section, SlideArrow } from "../lib/ui";
import { UnifiedHeading } from "./Unified";

/* The platform as one pinned flow, after griffin.com: Plan, Author, Execute,
   Analysis. The step list rides the page's left margin line; the open step
   sits mid-column with its products, finished steps park above it and the
   coming ones below. On the right the same four steps are a stack of
   isometric plates that stays whole: the open step's plate shows its
   screen, in words, and the others park around it as named slabs. Scrolling is the only control. It
   replaces both the static workflow diagram and the product rows, so the
   story is told once. */

const STAGES = [
  {
    name: "Plan",
    title: "Turn requirements into tests",
    body: "Test Manager writes test cases from your stories with AI and keeps every manual and automated run in one place.",
  },
  {
    name: "Author",
    title: "Write tests in plain language",
    body: "Kane AI plans, authors and evolves end-to-end tests from plain language, in the browser, the terminal or your editor.",
  },
  {
    name: "Execute",
    title: "Run every test, up to 70% faster",
    body: "HyperExecute runs what Kane AI writes, or your own suites, across browsers, real devices and emulators.",
  },
  {
    name: "Analysis",
    title: "Know what is safe to ship",
    body: "AI-native insights find flaky tests and the root cause of every failure, so each release call is made on data.",
  },
];

/* the diagram left MCP Server without a line of its own */
const MCP_DESC = "A native MCP server for your coding agents";

const num = (i: number) => String(i + 1).padStart(2, "0");

/* ---------- the product listing for one step ---------- */

function Listing({ index }: { index: number }) {
  const stage = platform.stages[index];
  return (
    <>
      <ul className="mt-5 border-t border-border">
        {stage.products.map((p) => (
          <li key={p.name} className="border-b border-border">
            <a
              href="#top"
              className="group/btn flex items-start justify-between gap-4 py-2"
            >
              {/* name beside its one-liner; on phones the one-liner drops below */}
              <span className="grid min-w-0 flex-1 gap-x-4 sm:grid-cols-[152px_minmax(0,1fr)]">
                <span className="flex items-center gap-2 text-b3 font-medium text-foreground">
                  {p.name}
                  {"badge" in p && p.badge && (
                    <span className="mono rounded-sm bg-secondary px-1 text-b5 font-medium uppercase text-foreground">
                      {p.badge}
                    </span>
                  )}
                </span>
                <span className="flow-desc text-b3 text-muted-foreground">
                  {p.desc || (p.name === "MCP Server" ? MCP_DESC : "")}
                </span>
              </span>
              <SlideArrow className="mt-1" />
            </a>
          </li>
        ))}
      </ul>
      {stage.checks.length > 0 && (
        <ul
          className={`mt-4 grid gap-x-6 gap-y-1 ${
            stage.checks.length > 3 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {stage.checks.map((c) => (
            <li key={c} className="flex items-start gap-2 text-b3 text-foreground">
              <Check
                size={16}
                strokeWidth={1.5}
                className="mt-[2px] flex-none text-muted-foreground"
              />
              {c}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- the flow, drawn as an isometric stack ---------- */

type Pt = readonly [number, number];
const N = 240; /* plate edge, in plane units */
const T = 12; /* plate thickness */

/* plane (u, v) at height z, to the screen */
const P = (u: number, v: number, z = 0): Pt => [
  (u - v) * 0.866,
  (u + v) * 0.5 - z,
];
const poly = (...p: Pt[]) =>
  p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

function Flat({
  u,
  v,
  w,
  d,
  z = 0,
  className = "iso-box",
}: {
  u: number;
  v: number;
  w: number;
  d: number;
  z?: number;
  className?: string;
}) {
  return (
    <polygon
      className={className}
      points={poly(P(u, v, z), P(u + w, v, z), P(u + w, v + d, z), P(u, v + d, z))}
    />
  );
}

/* a rule running along u */
function Seg({ u, v, len, z = 0 }: { u: number; v: number; len: number; z?: number }) {
  const [x1, y1] = P(u, v, z);
  const [x2, y2] = P(u + len, v, z);
  return <line className="iso-line" x1={x1} y1={y1} x2={x2} y2={y2} />;
}

/* words lying on a plate: the baseline starts at (u, v) and runs along u */
function Word({
  u,
  v,
  z = 0,
  anchor,
  className = "text-b3 fill-foreground",
  children,
}: {
  u: number;
  v: number;
  z?: number;
  anchor?: "middle" | "end";
  className?: string;
  children: string;
}) {
  const [x, y] = P(u, v, z);
  return (
    <text
      transform={`matrix(0.866 0.5 -0.866 0.5 ${x.toFixed(1)} ${y.toFixed(1)})`}
      textAnchor={anchor}
      className={className}
    >
      {children}
    </text>
  );
}

function Box({
  u,
  v,
  w,
  d,
  h,
  z = 0,
  top = "iso-top",
  blue = false,
}: {
  u: number;
  v: number;
  w: number;
  d: number;
  h: number;
  z?: number;
  top?: string;
  blue?: boolean;
}) {
  const t = z + h;
  return (
    <g>
      <polygon
        className={blue ? "iso-side-l iso-blue-l" : "iso-side-l"}
        points={poly(P(u, v + d, t), P(u + w, v + d, t), P(u + w, v + d, z), P(u, v + d, z))}
      />
      <polygon
        className={blue ? "iso-side-r iso-blue-r" : "iso-side-r"}
        points={poly(P(u + w, v, t), P(u + w, v + d, t), P(u + w, v + d, z), P(u + w, v, z))}
      />
      <Flat u={u} v={v} w={w} d={d} z={t} className={top} />
    </g>
  );
}

const ON_SOFT = "text-b3 font-medium iso-t-blue";
const CAPTION = "mono text-b5 uppercase fill-muted-foreground";

/* Plan: Test Manager's list of test cases, the AI-written ones ready to run */
function PlanArt() {
  const cases = [
    "Log in with email",
    "Reset password",
    "Pay by saved card",
    "Search a product",
    "Edit address",
  ];
  return (
    <g className="iso-detail">
      <Flat u={16} v={16} w={208} d={26} className="iso-soft" />
      <Word u={26} v={34} className={ON_SOFT}>
        Test cases
      </Word>
      {cases.map((title, k) => {
        const v = 54 + k * 34;
        return (
          <g key={title}>
            <Flat u={16} v={v} w={16} d={16} className={k < 3 ? "iso-ink" : "iso-box"} />
            <Word u={42} v={v + 13}>
              {title}
            </Word>
            <Flat u={184} v={v} w={40} d={16} className={k < 3 ? "iso-go" : "iso-box"} />
            <Word
              u={204}
              v={v + 12}
              anchor="middle"
              className={`mono text-b5 uppercase ${k < 3 ? "iso-t-go" : "fill-muted-foreground"}`}
            >
              {k < 3 ? "Ready" : "Draft"}
            </Word>
          </g>
        );
      })}
    </g>
  );
}

/* Author: a plain-language prompt, the steps Kane AI writes, and the CLI */
function AuthorArt() {
  const steps = ["Open the store", "Add to cart", "Pay with card", "Order placed"];
  return (
    <g className="iso-detail">
      <Flat u={16} v={16} w={208} d={66} />
      <Word u={26} v={32} className={CAPTION}>
        Prompt
      </Word>
      <Word u={26} v={56}>
        Test the checkout flow
      </Word>
      <Box u={196} v={62} w={18} d={14} h={5} top="iso-ink" blue />
      {steps.map((step, k) => {
        const v = 98 + k * 26;
        return (
          <g key={step}>
            <Flat u={96} v={v} w={10} d={10} className="iso-ink" />
            <Word u={114} v={v + 10}>
              {step}
            </Word>
          </g>
        );
      })}
      <Box u={16} v={98} w={64} d={126} h={6} />
      <Flat u={16} v={98} w={64} d={14} z={6} className="iso-ink" />
      <Word u={22} v={130} z={6} className="mono text-b5 fill-foreground">
        $ kane
      </Word>
      {[24, 40, 32, 18, 36].map((len, k) => (
        <Seg key={k} u={22} v={146 + k * 16} len={len} z={6} />
      ))}
    </g>
  );
}

/* Execute: one runner per browser and device: the tall blue ones are
   mid-run, the green ones have passed, the white one is queued */
function ExecuteArt() {
  const grid = [
    ["Chrome", "Safari", "Edge"],
    ["Firefox", "Pixel 9", "iPhone"],
    ["Galaxy", "iPad", "Opera"],
  ];
  const tall = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
  ];
  return (
    <g className="iso-detail">
      {grid.map((row, r) =>
        row.map((name, c) => {
          const on = tall[r][c] === 1;
          const u = 16 + c * 72;
          const v = 16 + r * 72;
          const h = on ? 16 : 5;
          return (
            <g key={name}>
              <Box
                u={u}
                v={v}
                w={58}
                d={58}
                h={h}
                blue={on}
                top={on ? "iso-soft" : name === "Opera" ? "iso-top" : "iso-go"}
              />
              <Word
                u={u + 29}
                v={v + 34}
                z={h}
                anchor="middle"
                className={on ? ON_SOFT : "text-b3 fill-foreground"}
              >
                {name}
              </Word>
            </g>
          );
        }),
      )}
    </g>
  );
}

/* Analysis: result bars along the back, the findings, and two insight cards */
function AnalysisArt() {
  const bars = [18, 32, 26, 46, 38, 58];
  const findings = ["3 flaky tests", "1 root cause", "2 tests healed"];
  return (
    <g className="iso-detail">
      {bars.map((h, k) => (
        <Box
          key={k}
          u={20 + k * 34}
          v={20}
          w={22}
          d={22}
          h={h}
          blue={k === bars.length - 1}
          top={k === bars.length - 1 ? "iso-ink" : "iso-top"}
        />
      ))}
      <Seg u={16} v={56} len={208} />
      <Flat u={16} v={72} w={140} d={152} />
      <Word u={26} v={90} className={CAPTION}>
        Findings
      </Word>
      {findings.map((text, k) => {
        const v = 104 + k * 36;
        return (
          <g key={text}>
            <Flat u={26} v={v} w={12} d={12} className={["iso-warn", "iso-ink", "iso-go"][k]} />
            <Word u={46} v={v + 11}>
              {text}
            </Word>
          </g>
        );
      })}
      <Flat u={168} v={72} w={56} d={70} className="iso-warn" />
      <polyline
        className="iso-line iso-line-warn"
        points={poly(P(176, 126), P(186, 98), P(196, 118), P(206, 88), P(216, 106))}
      />
      <Flat u={168} v={154} w={56} d={70} className="iso-go" />
      <Word u={196} v={190} anchor="middle" className="pixel text-b1 iso-t-go">
        98%
      </Word>
      <Word u={196} v={208} anchor="middle" className={CAPTION}>
        Pass
      </Word>
    </g>
  );
}

const ART = [PlanArt, AuthorArt, ExecuteArt, AnalysisArt];

/* two product callouts per plate: the label, a lead, and where it lands */
const TAGS: { l: [string, Pt]; r: [string, Pt] }[] = [
  { l: ["Test Manager", P(24, 96)], r: ["AI test cases", P(150, 29)] },
  { l: ["Kane CLI", P(48, 170, 6)], r: ["Kane AI", P(170, 50)] },
  { l: ["HyperExecute", P(45, 175, 16)], r: ["Real Device Cloud", P(189, 104, 16)] },
  { l: ["Test Intelligence", P(32, 110)], r: ["Flaky tests", P(200, 100)] },
];

const CHAR = 8.9; /* advance of one tracked mono capital, in view units */
const TAG_Y = 0; /* callouts sit in the gap between this plate and the pile above */

function Tag({ side, text, to }: { side: "l" | "r"; text: string; to: Pt }) {
  const left = side === "l";
  const x = left ? -264 : 124;
  const [tx, ty] = to;
  const from = left ? x + 20 + text.length * CHAR : x - 8;
  return (
    <g>
      <polyline className="iso-lead" points={`${from},${TAG_Y} ${tx},${TAG_Y} ${tx},${ty}`} />
      <circle cx={tx} cy={ty} r={2.5} className="iso-pin" />
      <circle cx={x} cy={TAG_Y} r={3} className="fill-accent" />
      <text
        x={x + 12}
        y={TAG_Y}
        dominantBaseline="central"
        className="mono fill-foreground text-b4 uppercase tracking-[0.14em]"
      >
        {text}
      </text>
    </g>
  );
}

/* One plate. Parked plates are blank slabs that only carry their name; the
   open one shows its screen and its callouts. */
function Plate({
  index,
  on,
  named = false,
}: {
  index: number;
  on: boolean;
  named?: boolean;
}) {
  const Art = ART[index];
  return (
    <g className="iso-layer" data-on={on}>
      <Box u={0} v={0} w={N} d={N} h={T} z={-T} />
      <Art />
      {named && (
        <>
          <text
            x={-222}
            y={N / 2 + T / 2}
            textAnchor="end"
            dominantBaseline="central"
            className="mono text-b4 uppercase tracking-[0.14em]"
          >
            <tspan className="fill-muted-foreground">{num(index)}</tspan>
            <tspan dx={8} className={`iso-name ${on ? "fill-foreground" : "fill-muted-foreground"}`}>
              {STAGES[index].name}
            </tspan>
          </text>
          <g className="iso-tags" data-on={on}>
            <Tag side="l" text={TAGS[index].l[0]} to={TAGS[index].l[1]} />
            <Tag side="r" text={TAGS[index].r[0]} to={TAGS[index].r[1]} />
          </g>
        </>
      )}
    </g>
  );
}

const MOVE = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };
const PARK = 44; /* between two parked plates */
const ABOVE = 244; /* from the open plate up to the pile above it: clear of its screen */
const BELOW = 76; /* from the open plate down to the pile under it */

/* The whole stack stays in view. Finished steps pile up above the open
   plate and the coming ones wait in a pile beneath it, the same way the
   step labels park on the left; the open plate works its way down. */
function Stack({ active }: { active: number }) {
  const last = STAGES.length - 1;
  const rel = (j: number) =>
    j === active
      ? 0
      : j < active
        ? -ABOVE - (active - 1 - j) * PARK
        : BELOW + (j - active - 1) * PARK;
  /* keep the stack as a whole centred in the panel */
  const shift = -(rel(0) + rel(last) + N + T) / 2;
  const at = (j: number) => rel(j) + shift;
  return (
    <svg viewBox="-326 -320 620 640" className="h-full w-full" aria-hidden>
      {/* dashed guides down the stack's corners, marching toward the last plate */}
      {[-208, 208].map((x) => (
        <motion.line
          key={x}
          className="iso-guide conn-dash"
          x1={x}
          x2={x}
          initial={false}
          animate={{ y1: at(0) + N / 2, y2: at(last) + N / 2 }}
          transition={MOVE}
        />
      ))}
      {STAGES.map((_, k) => {
        /* painted back to front: the last plate first */
        const j = last - k;
        return (
          <motion.g key={j} initial={false} animate={{ y: at(j) }} transition={MOVE}>
            <Plate index={j} on={j === active} named />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ---------- the step rail ---------- */

const ROW = 32; /* height of one parked step label */

function Marker({ state }: { state: "done" | "on" | "next" }) {
  return (
    <span
      aria-hidden
      className={`absolute -left-8 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background transition-colors duration-500 ${
        state === "on" ? "border-accent" : "border-transparent"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-500 ${
          state === "on" ? "bg-accent" : state === "done" ? "bg-foreground" : "bg-border"
        }`}
      />
    </span>
  );
}

function Rail({ active }: { active: number }) {
  const col = useRef<HTMLDivElement>(null);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ H: 0, h: STAGES.map(() => 0) });
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const measure = () =>
      setSize({
        H: col.current?.clientHeight ?? 0,
        h: bodies.current.map((el) => el?.offsetHeight ?? 0),
      });
    measure();
    const ro = new ResizeObserver(measure);
    if (col.current) ro.observe(col.current);
    bodies.current.forEach((el) => el && ro.observe(el));
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);

  const rest = STAGES.length - 1; /* labels parked at any moment */
  const yOf = (j: number) => {
    if (j < active) return j * ROW;
    if (j > active) return size.H - (STAGES.length - j) * ROW;
    const room = size.H - rest * ROW - ROW - size.h[active];
    return active * ROW + Math.max(0, room / 2);
  };
  const move = ready ? "flow-move" : "";

  return (
    <div ref={col} className="flow-rail absolute inset-y-8 left-8 right-12">
      {STAGES.map((s, j) => {
        const on = j === active;
        const y = yOf(j);
        return (
          <div key={s.name}>
            <div
              className={`absolute left-0 top-0 flex h-8 items-center gap-3 ${move}`}
              style={{ transform: `translateY(${y}px)` }}
            >
              <Marker state={on ? "on" : j < active ? "done" : "next"} />
              <span className="mono text-b4 text-muted-foreground">{num(j)}</span>
              <span
                className={`mono text-b4 uppercase tracking-[0.14em] transition-colors duration-500 ${
                  on ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.name}
              </span>
            </div>
            <div
              ref={(el) => {
                bodies.current[j] = el;
              }}
              className={`absolute inset-x-0 top-0 ${move} ${
                on ? "flow-body-on" : "flow-body-off"
              }`}
              style={{ transform: `translateY(${y + ROW}px)` }}
              {...(on ? {} : { inert: "" })}
            >
              <h3 className="mt-2">{s.title}</h3>
              <p className="mt-3 text-b2 text-muted-foreground">{s.body}</p>
              <Listing index={j} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- pinned (desktop) ---------- */

const HEADER = 56; /* the fixed header the panel pins under */

function Pinned() {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const travel = r.height - (window.innerHeight - HEADER);
      const p = Math.min(1, Math.max(0, (HEADER - r.top) / travel));
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      setActive(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={track} className="flow-track -mx-8">
      <div className="flow-pin grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] border-t border-border">
        <div className="relative">
          {/* how far through the flow you are, drawn on the page's margin line */}
          <span
            ref={bar}
            aria-hidden
            className="absolute -left-px top-0 h-full w-px origin-top bg-foreground"
            style={{ transform: "scaleY(0)" }}
          />
          <Rail active={active} />
        </div>

        <div className="relative overflow-hidden border-l border-border p-8">
          <Stack active={active} />
        </div>
      </div>
    </div>
  );
}

/* ---------- stacked (phones, tablets, very short screens) ---------- */

function Stacked() {
  return (
    <div className="flex flex-col gap-16">
      {STAGES.map((s, j) => (
        <div key={s.name}>
          <p className="flex items-center gap-3">
            <span className="mono text-b4 text-muted-foreground">{num(j)}</span>
            <span className="mono text-b4 uppercase tracking-[0.14em] text-foreground">
              {s.name}
            </span>
          </p>
          <h3 className="mt-3">{s.title}</h3>
          <p className="mt-3 text-b2 text-muted-foreground">{s.body}</p>
          <div className="mt-6 flex justify-center border border-border px-4 py-8">
            <svg viewBox="-216 -8 432 268" className="w-full max-w-[460px]" aria-hidden>
              <Plate index={j} on />
            </svg>
          </div>
          <Listing index={j} />
        </div>
      ))}
    </div>
  );
}

const PIN_QUERY = "(min-width: 1024px) and (min-height: 620px)";

function usePinned() {
  const [pinned, setPinned] = useState(() => window.matchMedia(PIN_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const on = () => setPinned(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return pinned;
}

export default function Journey() {
  const pinned = usePinned();
  return (
    <Section id="unified" className={pinned ? "!pb-0" : ""}>
      <UnifiedHeading />
      {pinned ? <Pinned /> : <Stacked />}
    </Section>
  );
}
