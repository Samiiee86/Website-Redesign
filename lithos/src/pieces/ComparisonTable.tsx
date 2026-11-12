import type { CSSProperties } from "react";
import { Check, Minus } from "lucide-react";
import { ArrowChip, Reveal, Section } from "../lib/ui";

/* Comparison table. One fold: heading, description, one button, then the
   table running edge to edge between the page guide lines.

   - The first column is always ours and carries the fill and the top rule.
   - The column names stay pinned under the header while the rows scroll.
   - On phones each feature name sits on its own line above its values, so
     nothing is squeezed and nothing scrolls sideways.

   Everything on screen comes from the props below; swap the content, keep
   the piece. */

/* true = included, false = not included, text = a short note */
type Value = boolean | string;

export type CompareColumn = { name: string; note: string };
export type CompareRow = { name: string; hint?: string; values: Value[] };
export type CompareGroup = { label: string; rows: CompareRow[] };

type Props = {
  lead?: string;
  title?: string;
  body?: string;
  cta?: string;
  columns?: CompareColumn[];
  groups?: CompareGroup[];
};

const COLUMNS: CompareColumn[] = [
  { name: "TestMu AI", note: "Agentic AI testing cloud" },
  { name: "Legacy cloud", note: "Browser and device grids" },
  { name: "In-house grid", note: "Selenium you host yourself" },
];

const GROUPS: CompareGroup[] = [
  {
    label: "AI agents",
    rows: [
      {
        name: "Write tests in plain English",
        hint: "Describe the flow and the agent builds the test.",
        values: [true, false, false],
      },
      {
        name: "Self-healing tests",
        hint: "Tests fix their own locators when the page changes.",
        values: [true, "Add-on", false],
      },
      {
        name: "AI root cause analysis",
        hint: "Every failure comes with the likely reason.",
        values: [true, "Limited", false],
      },
      {
        name: "Agent testing",
        hint: "Test your chatbots and voice agents with agents.",
        values: [true, false, false],
      },
    ],
  },
  {
    label: "Speed",
    rows: [
      {
        name: "Parallel test runs",
        values: ["Unlimited", "By plan", "By hardware"],
      },
      {
        name: "Smart test orchestration",
        hint: "HyperExecute groups and orders tests for you.",
        values: ["Up to 70% faster", false, false],
      },
      {
        name: "Flaky test detection",
        values: [true, "Add-on", false],
      },
    ],
  },
  {
    label: "Coverage",
    rows: [
      {
        name: "Browsers and operating systems",
        values: ["3,000+", "3,000+", "What you install"],
      },
      {
        name: "Real devices",
        values: ["10,000+", "By plan", "What you buy"],
      },
      {
        name: "Visual regression testing",
        values: [true, "Add-on", false],
      },
      {
        name: "Accessibility testing",
        values: [true, "Add-on", false],
      },
    ],
  },
  {
    label: "Security and support",
    rows: [
      {
        name: "SOC 2 Type II and ISO 27001",
        values: [true, true, "Your job"],
      },
      {
        name: "Single sign-on",
        values: [true, "Enterprise only", "Your job"],
      },
      {
        name: "24/7 support",
        values: [true, "By plan", false],
      },
    ],
  },
];

/* phones: one track per column, the feature name spans them all.
   desktop: a wider first track for the feature name. */
const GRID =
  "grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:grid-cols-[minmax(0,1.5fr)_repeat(var(--cols),minmax(0,1fr))]";

/* a value cell; the first column (ours) is filled */
const cell = (i: number) =>
  `flex items-center px-3 py-4 lg:border-l lg:border-border lg:px-6 lg:py-5 ${
    i === 0 ? "bg-[var(--tm-bg-fill)] pl-4" : "border-l border-border"
  }`;

function Mark({ value, ours }: { value: Value; ours: boolean }) {
  if (value === true)
    return (
      <>
        <Check size={20} strokeWidth={1.5} aria-hidden className="text-foreground" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus
          size={20}
          strokeWidth={1.5}
          aria-hidden
          className="text-[var(--tm-gray-400)]"
        />
        <span className="sr-only">Not included</span>
      </>
    );
  return (
    <span
      className={`text-b3 ${ours ? "font-medium text-foreground" : "text-muted-foreground"}`}
    >
      {value}
    </span>
  );
}

export default function ComparisonTable({
  lead = "How TestMu AI compares",
  title = "to the tools you know",
  body = "Agents, speed, coverage and security, side by side. Every row is something your team will ask for in the first month.",
  cta = "Get started free",
  columns = COLUMNS,
  groups = GROUPS,
}: Props) {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2>
            <span className="block text-muted-foreground">{lead}</span>
            <span className="block">{title}</span>
          </h2>
          <p className="max-w-[430px] text-b1 text-muted-foreground">{body}</p>
        </div>
        <button
          data-cursor="Start free"
          className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8"
        >
          {cta}
          <ArrowChip />
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          role="table"
          aria-label={`${lead} ${title}`}
          className="-mx-8 border-t border-border bg-surface"
          style={{ "--cols": columns.length } as CSSProperties}
        >
          {/* column names: pinned under the 56px header while rows scroll */}
          <div
            role="row"
            className={`${GRID} sticky top-14 z-10 border-b border-border bg-surface`}
          >
            <div
              role="columnheader"
              className="hidden items-end px-8 py-5 font-mono text-b4 uppercase tracking-[0.14em] text-muted-foreground lg:flex"
            >
              Compare
            </div>
            {columns.map((c, i) => (
              <div
                key={c.name}
                role="columnheader"
                className={`relative !items-start flex-col justify-center ${cell(i)}`}
              >
                {i === 0 && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-foreground"
                  />
                )}
                <span className="block text-b3 font-medium text-foreground lg:text-b1">
                  {c.name}
                </span>
                <span className="hidden text-b3 text-muted-foreground lg:block">
                  {c.note}
                </span>
              </div>
            ))}
          </div>

          {groups.map((g) => (
            <div key={g.label} role="rowgroup">
              <div role="row" className="border-b border-border bg-background">
                <div
                  role="columnheader"
                  aria-colspan={columns.length + 1}
                  className="px-4 py-3 font-mono text-b4 uppercase lg:px-8 tracking-[0.14em] text-muted-foreground"
                >
                  {g.label}
                </div>
              </div>

              {g.rows.map((r) => (
                <div
                  key={r.name}
                  role="row"
                  className={`${GRID} border-b border-border transition-colors duration-200 hover:bg-secondary/40`}
                >
                  <div
                    role="rowheader"
                    className="col-span-full px-4 pb-3 pt-4 lg:col-span-1 lg:px-8 lg:py-5"
                  >
                    <span className="block text-b2 font-medium text-foreground">
                      {r.name}
                    </span>
                    {r.hint && (
                      <span className="block text-b3 text-muted-foreground">
                        {r.hint}
                      </span>
                    )}
                  </div>
                  {r.values.map((v, i) => (
                    <div key={columns[i].name} role="cell" className={cell(i)}>
                      <Mark value={v} ours={i === 0} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
