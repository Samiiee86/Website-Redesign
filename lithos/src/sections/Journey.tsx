import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { platform } from "../lib/content";
import { Section, SlideArrow } from "../lib/ui";
import { UnifiedHeading } from "./Unified";

/* The platform as one pinned flow, after griffin.com: Plan, Author, Execute,
   Analysis. The step list rides the page's left margin line; the open step
   sits mid-column with its products, finished steps park above it and the
   coming ones below. On the right a stack of four plates, one per step,
   travels so the open step's plate is always the one in focus. Scrolling is
   the only control. It replaces both the static workflow diagram and the
   product rows, so the story is told once. */

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

/* ---------- isometric plates ---------- */

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

function Box({
  u,
  v,
  w,
  d,
  h,
  z = 0,
  top = "iso-top",
}: {
  u: number;
  v: number;
  w: number;
  d: number;
  h: number;
  z?: number;
  top?: string;
}) {
  const t = z + h;
  return (
    <g>
      <polygon
        className="iso-side-l"
        points={poly(P(u, v + d, t), P(u + w, v + d, t), P(u + w, v + d, z), P(u, v + d, z))}
      />
      <polygon
        className="iso-side-r"
        points={poly(P(u + w, v, t), P(u + w, v + d, t), P(u + w, v + d, z), P(u + w, v, z))}
      />
      <Flat u={u} v={v} w={w} d={d} z={t} className={top} />
    </g>
  );
}

/* Plan: a test-case table with a side nav; the first cases are ticked */
function PlanArt() {
  return (
    <g className="iso-detail">
      <Flat u={16} v={16} w={36} d={208} className="iso-tint" />
      {[0, 1, 2, 3].map((k) => (
        <Seg key={k} u={24} v={34 + k * 18} len={20} />
      ))}
      <Flat u={64} v={16} w={160} d={22} className="iso-ink" />
      {[84, 62, 92, 70, 54, 80].map((len, k) => {
        const v = 52 + k * 29;
        return (
          <g key={k}>
            <Flat u={64} v={v} w={12} d={12} className={k < 3 ? "iso-ink" : "iso-box"} />
            <Seg u={86} v={v + 6} len={len} />
            <Flat u={196} v={v} w={28} d={12} />
          </g>
        );
      })}
    </g>
  );
}

/* Author: a prompt box, the steps it turns into, and a terminal */
function AuthorArt() {
  const indent = [0, 12, 12, 24, 12, 0];
  return (
    <g className="iso-detail">
      <Flat u={16} v={16} w={208} d={64} />
      <Seg u={28} v={34} len={120} />
      <Seg u={28} v={50} len={84} />
      <Box u={194} v={50} w={20} d={20} h={5} top="iso-ink" />
      {[70, 88, 60, 80, 48, 66].map((len, k) => {
        const v = 100 + k * 20;
        return (
          <g key={k}>
            <Flat u={96} v={v} w={8} d={8} className="iso-ink" />
            <Flat u={112 + indent[k]} v={v} w={len} d={8} className="iso-bar" />
          </g>
        );
      })}
      <Box u={16} v={100} w={64} d={124} h={6} />
      <Flat u={16} v={100} w={64} d={12} z={6} className="iso-ink" />
      {[24, 40, 32, 18, 36].map((len, k) => (
        <Seg key={k} u={26} v={128 + k * 18} len={len} z={6} />
      ))}
    </g>
  );
}

/* Execute: a grid of runners; the tall dark ones are mid-run */
function ExecuteArt() {
  const tall = [
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
  ];
  return (
    <g className="iso-detail">
      {tall.map((row, r) =>
        row.map((on, c) => (
          <Box
            key={`${r}-${c}`}
            u={18 + c * 53}
            v={18 + r * 53}
            w={40}
            d={40}
            h={on ? 16 : 5}
            top={on ? "iso-ink" : "iso-top"}
          />
        )),
      )}
    </g>
  );
}

/* Analysis: bars along the back, findings listed in front */
function AnalysisArt() {
  const bars = [20, 36, 28, 52, 40, 64];
  return (
    <g className="iso-detail">
      {bars.map((h, k) => (
        <Box
          key={k}
          u={20 + k * 35}
          v={24}
          w={22}
          d={22}
          h={h}
          top={k === bars.length - 1 ? "iso-ink" : "iso-top"}
        />
      ))}
      <Seg u={16} v={62} len={208} />
      <Flat u={16} v={84} w={96} d={140} />
      {[52, 40, 56, 36, 48].map((len, k) => {
        const v = 100 + k * 24;
        return (
          <g key={k}>
            <Flat u={28} v={v} w={10} d={10} className={k < 2 ? "iso-ink" : "iso-box"} />
            <Seg u={46} v={v + 5} len={len} />
          </g>
        );
      })}
      <Flat u={124} v={84} w={100} d={64} className="iso-tint" />
      <Flat u={136} v={98} w={40} d={14} className="iso-ink" />
      <Seg u={136} v={128} len={64} />
      <Flat u={124} v={160} w={100} d={64} />
      {[70, 50, 62].map((len, k) => (
        <Seg key={k} u={136} v={176 + k * 16} len={len} />
      ))}
    </g>
  );
}

const ART = [PlanArt, AuthorArt, ExecuteArt, AnalysisArt];

/* two product callouts per plate: the label, a lead, and where it lands */
const TAGS: { l: [string, Pt]; r: [string, Pt] }[] = [
  { l: ["Test Manager", P(34, 120)], r: ["AI test cases", P(150, 58)] },
  { l: ["Kane CLI", P(48, 170, 6)], r: ["Kane AI", P(160, 40)] },
  { l: ["HyperExecute", P(91, 197, 16)], r: ["Real Device Cloud", P(144, 38, 16)] },
  { l: ["Test Intelligence", P(60, 150)], r: ["Auto-healing", P(136, 35, 52)] },
];

const CHAR = 8.9; /* advance of one tracked mono capital, in view units */

function Tag({ side, text, to }: { side: "l" | "r"; text: string; to: Pt }) {
  const left = side === "l";
  const x = left ? -264 : 124;
  const y = left ? 4 : -22;
  const [tx, ty] = to;
  const from = left ? x + 20 + text.length * CHAR : x - 8;
  return (
    <g className="iso-tag">
      <polyline className="iso-lead" points={`${from},${y} ${tx},${y} ${tx},${ty}`} />
      <circle cx={tx} cy={ty} r={2} className="fill-foreground" />
      <circle cx={x} cy={y} r={3} className="fill-accent" />
      <text
        x={x + 12}
        y={y}
        dominantBaseline="central"
        className="mono fill-foreground text-b4 uppercase tracking-[0.14em]"
      >
        {text}
      </text>
    </g>
  );
}

function Plate({ index, on, tags = false }: { index: number; on: boolean; tags?: boolean }) {
  const Art = ART[index];
  return (
    <g className="iso-layer" data-on={on}>
      <Box u={0} v={0} w={N} d={N} h={T} z={-T} />
      <Art />
      {tags && (
        <>
          <Tag side="l" text={TAGS[index].l[0]} to={TAGS[index].l[1]} />
          <Tag side="r" text={TAGS[index].r[0]} to={TAGS[index].r[1]} />
        </>
      )}
    </g>
  );
}

const MOVE = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };
const STEP = 170; /* resting distance between plates */
const CLEAR = 110; /* extra room around the plate in focus */

/* The stack. Each plate's place is counted from the one in focus, which
   stays put in the middle of the panel; the others close up above and
   below it. */
function Stack({ active }: { active: number }) {
  const at = (j: number) =>
    j === active ? 0 : (j - active) * STEP + (j > active ? CLEAR : -CLEAR);
  const first = at(0);
  const last = at(STAGES.length - 1);
  return (
    <svg
      viewBox="-290 -30 580 312"
      className="w-full max-w-[660px] overflow-visible"
      aria-hidden
    >
      {/* dashed guides down the stack's corners, marching toward the last plate */}
      {[-208, 208].map((x) => (
        <motion.line
          key={x}
          className="iso-guide conn-dash"
          x1={x}
          x2={x}
          initial={false}
          animate={{ y1: first + N / 2, y2: last + N / 2 }}
          transition={MOVE}
        />
      ))}
      {STAGES.map((_, k) => {
        /* painted back to front: the last plate first */
        const j = STAGES.length - 1 - k;
        return (
          <motion.g key={j} initial={false} animate={{ y: at(j) }} transition={MOVE}>
            <Plate index={j} on={j === active} tags />
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

        <div className="relative flex items-center justify-center overflow-hidden border-l border-border px-8">
          <Stack active={active} />
          <p className="absolute bottom-8 left-8 flex items-baseline gap-2">
            <span className="pixel flow-count text-foreground">{num(active)}</span>
            <span className="mono text-b4 text-muted-foreground">
              / {num(STAGES.length - 1)}
            </span>
          </p>
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
            <svg viewBox="-230 -40 460 312" className="w-full max-w-[460px]" aria-hidden>
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
