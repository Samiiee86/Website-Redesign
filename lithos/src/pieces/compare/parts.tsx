import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { Reveal } from "../../lib/ui";
import { H5_LG, type Cell } from "./cells";

/* Shared parts for the comparison family (head to head, matrix, spec
   sheet).

   Modelled on the references Sameer picked (Mistral, Bobbin): a ruled
   grid on the page ground, every column centred, outline ticks, and TestMu AI as the one
   white column, outlined in black and lifted on a shadow, with a flag
   standing on top of it. No added colour: white, the page ground, greys
   and black. */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEW = { once: true, margin: "0px 0px -6% 0px" } as const;

/* Outline icons, as in the ElevenLabs reference: no circle, just the
   mark, in the Lucide shapes at 24px with a 2px stroke (a step up
   from the usual 20px icon, so the marks read clearly in a table). The tick draws itself the first time it scrolls into view.
   `strong` (black) is TestMu AI's; `plain` (grey) is the others'. */
export function Tick({
  delay = 0,
  tone = "strong",
}: {
  delay?: number;
  tone?: "strong" | "plain";
}) {
  const still = useReducedMotion();
  return (
    <span
      aria-hidden
      className={`grid flex-none place-items-center ${
        tone === "strong" ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M4 12l5 5L20 6"
          initial={still ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.5, delay, ease: EASE }}
        />
      </svg>
    </span>
  );
}

/* The "no": a light grey outline cross. */
export function Cross() {
  return (
    <span
      aria-hidden
      className="grid flex-none place-items-center text-[var(--tm-fg-subtle)]"
    >
      <X size={24} strokeWidth={2} />
    </span>
  );
}

/* One value. `ours` draws it for the TestMu AI column. */
export function Mark({
  value,
  ours = false,
  delay = 0,
}: {
  value: Cell;
  ours?: boolean;
  delay?: number;
}) {
  if (value === true)
    return (
      <>
        <Tick delay={delay} tone={ours ? "strong" : "plain"} />
        <span className="sr-only">Included</span>
      </>
    );

  if (value === false)
    return (
      <>
        <Cross />
        <span className="sr-only">Not included</span>
      </>
    );

  const text = typeof value === "object" ? value.text : value;
  return (
    <span
      className={`min-w-0 text-center text-b3 tabular-nums lg:text-b2 ${
        ours ? "font-medium text-foreground" : "text-muted-foreground"
      }`}
    >
      {text}
    </span>
  );
}

/* The top of the TestMu AI column: a flag that stands 36px above the
   table (the design system's "popular" flag), then the logo, centred,
   level with the other column names. The row it lives in is sticky, so
   when it pins under the header the flag tucks away and the logo stays
   in view. */
export function OursHead({
  flag = "Top choice",
  label,
  className = "",
}: {
  flag?: string;
  /* what a screen reader calls the column, when it is more than the
     logo says */
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="columnheader"
      className={`-mt-9 flex flex-col border border-foreground border-b-border bg-surface ${className}`}
    >
      <span className="flex h-9 flex-none items-center justify-center gap-2 bg-[var(--tm-bg-inverse)] font-mono text-b5 uppercase tracking-[0.14em] text-[var(--tm-fg-inverse)] lg:text-b4">
        <Sparkles size={16} strokeWidth={1.5} aria-hidden />
        {flag}
      </span>
      <span className="flex flex-1 items-center justify-center px-3 py-5 lg:px-6 lg:py-6">
        <img
          src="/testmu-logo-dark.svg"
          alt={label ?? "TestMu AI"}
          className="h-5 w-auto max-w-full object-contain lg:h-6"
        />
      </span>
    </div>
  );
}

/* The name of any other column: one line, centred, nothing else. */
export function RivalHead({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      role="columnheader"
      className={`items-center justify-center border-y border-border bg-background px-3 py-5 text-center lg:px-4 lg:py-6 ${className}`}
    >
      <span className={`block text-b3 font-medium text-foreground ${H5_LG}`}>
        {name}
      </span>
    </div>
  );
}

/* A number that counts up once, the first time it scrolls into view.
   The class goes on the element that holds the digits themselves, so the
   pixel face is not reset by the page-wide font rule. */
export function CountUp({
  to,
  className = "",
}: {
  to: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, VIEW);
  const still = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    const run = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => run.stop();
  }, [seen, still, to]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {still ? to : n}
    </span>
  );
}

/* The design system's section head, the same one every fold on the site
   uses: the two-line heading on the left (grey lead line, black main
   line), the description on the right, and any button under both. */
export function FoldHead({
  lead,
  title,
  body,
  children,
}: {
  lead: string;
  title: string;
  body: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-12">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
        <h2>
          <span className="block text-muted-foreground">{lead}</span>
          <span className="block">{title}</span>
        </h2>
        <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      {children}
    </Reveal>
  );
}
