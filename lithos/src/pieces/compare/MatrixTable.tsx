import { useId, useState, type CSSProperties } from "react";
import { ArrowChip } from "../../lib/ui";
import { CountUp, Mark, OursHead, RivalHead } from "./parts";
import { DOTS, FOCUS, H5, counts, type Cell } from "./cells";

/* The table itself, shared by the head to head and the matrix.

   Modelled on the Mistral and Bobbin references:
   - No lines down between the columns. Rows are parted by dotted lines
     that stop short of each column edge, as in the ElevenLabs
     reference. The page ground shows through; white is kept for TestMu
     AI alone.
   - Every option column is centred: its name, its ticks, its values.
     Only the feature names on the left read from the left.
   - Column names are one line each. Only TestMu AI carries a logo.
   - TestMu AI is the one white column, outlined in black and lifted on
     a shadow. A flag stands on top of it and the button sits at its
     foot, above the last line.
   - Categories are grey bands across the table, with the white
     TestMu AI column running unbroken through them. The name is H5
     medium over regular feature names.
   - Outline ticks with no circle, as in the ElevenLabs reference:
     black for TestMu AI, grey for the others, a light grey cross for
     "no".
   - TestMu AI can stand first or between the others (`oursAt`).
   - Column names pin under the header while the rows scroll.
   - Phones: each feature name sits above its values, TestMu AI first.
     With more than two other options, a switch picks which one stands
     beside it. */

export type MatrixRival = { name: string };
/* values[0] is TestMu AI, then one per rival, in the rivals' order */
export type MatrixRow = { name: string; values: Cell[] };
export type MatrixGroup = {
  /* leave empty for a table with no groups */
  label: string;
  rows: MatrixRow[];
};

type Props = {
  label: string;
  rivals: MatrixRival[];
  groups: MatrixGroup[];
  /* where TestMu AI stands among the columns: 0 is first */
  oursAt?: number;
  /* end with the "built in" count */
  tally?: boolean;
  /* the button at the foot of the TestMu AI column */
  cta?: string;
};

const BASE = "relative grid grid-cols-[repeat(var(--m),minmax(0,1fr))]";
/* the feature column: 1.5 shares up to three options, 1.7 past that, so
   feature names stay on one line beside the narrower option columns.
   LABEL_FR must match the number in the class. */
const ROOMY = `${BASE} lg:grid-cols-[minmax(0,1.5fr)_repeat(var(--n),minmax(0,1fr))]`;
const TIGHT = `${BASE} lg:grid-cols-[minmax(0,1.7fr)_repeat(var(--n),minmax(0,1fr))]`;

/* Each cell is two boxes: the outer one holds the side padding, the
   inner one the top and bottom padding and, on desktop, the dotted row
   line, so the dots stop short of the next column (as in the ElevenLabs
   reference). */
const LABEL =
  "order-first col-span-full px-4 pb-2 pt-5 lg:order-none lg:col-span-1 lg:flex lg:px-8 lg:py-0";
const LABEL_IN = "flex w-full flex-col justify-center lg:py-6";
/* phones: a white box per row. desktop: clear, the white column shows
   through. */
const OURS =
  "-order-1 flex items-center justify-center border border-border bg-surface px-4 py-4 text-center lg:order-none lg:items-stretch lg:border-0 lg:bg-transparent lg:px-6 lg:py-0";
const RIVAL =
  "items-center justify-center border-b border-border px-4 py-4 text-center lg:items-stretch lg:border-b-0 lg:px-6 lg:py-0";
const CELL_IN = "flex w-full items-center justify-center lg:py-6";
/* the solid line that closes the table on desktop, under its last row,
   the same grey line that runs under the column names at the top */
const END = "lg:!border-b lg:border-border";

type Col = { ours: true } | { ours: false; i: number };

export default function MatrixTable({
  label,
  rivals,
  groups,
  oursAt = 0,
  tally = false,
  cta,
}: Props) {
  const [pick, setPick] = useState(0);
  const pickerId = useId();

  /* phones can hold TestMu AI plus two others; past that, pick one */
  const picker = rivals.length > 2;
  const n = rivals.length + 1;
  const roomy = n <= 3;
  const GRID = roomy ? ROOMY : TIGHT;
  const LABEL_FR = roomy ? 1.5 : 1.7;

  /* the columns in the order they stand */
  const at = Math.min(Math.max(oursAt, 0), rivals.length);
  const cols: Col[] = rivals.map((_, i) => ({ ours: false as const, i }));
  cols.splice(at, 0, { ours: true });

  const rows = groups.flatMap((g) => g.rows);
  const built = (c: Col) =>
    rows.filter((r) => counts(r.values[c.ours ? 0 : c.i + 1])).length;

  /* a rival column: on phones only the picked one shows */
  const show = (i: number) =>
    picker && i !== pick ? "hidden lg:flex" : "flex";

  /* the dotted line under a row: every row has one, except the last row
     before a category band or before the foot */
  const dotted = (gi: number, ri: number) => {
    if (ri < groups[gi].rows.length - 1) return DOTS;
    const next = groups[gi + 1];
    if (next) return next.label ? "" : DOTS;
    return tally ? DOTS : "";
  };

  const key = (c: Col) => (c.ours ? "ours" : c.i);

  return (
    <>
      {picker && (
        <div className="mb-6 px-4 lg:hidden">
          <p id={pickerId} className="mb-2 text-b3 text-muted-foreground">
            Compare TestMu AI with
          </p>
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="group"
              aria-labelledby={pickerId}
              className="inline-flex rounded-md border border-border bg-secondary p-1"
            >
              {rivals.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  aria-pressed={i === pick}
                  onClick={() => setPick(i)}
                  className={`h-8 whitespace-nowrap rounded px-3 text-b3 font-medium transition-colors duration-200 ${FOCUS} ${
                    i === pick
                      ? "bg-surface text-foreground shadow-[var(--tm-shadow-resting-sm)]"
                      : "text-muted-foreground hover:bg-[var(--tm-segment-hover)]"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* pt-9 leaves room for the flag that stands above the table */}
      <div
        role="table"
        aria-label={label}
        className="relative pt-9"
        style={{ "--n": n, "--m": picker ? 2 : n } as CSSProperties}
      >
        {/* desktop: the white column, one sheet from the flag to the foot */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 hidden border border-foreground bg-surface shadow-[var(--tm-shadow-floating-md)] lg:block"
          style={{
            left: `${((LABEL_FR + at) / (LABEL_FR + n)) * 100}%`,
            width: `${100 / (LABEL_FR + n)}%`,
          }}
        />

        {/* column names: pinned under the 56px header */}
        <div role="row" className={`${GRID} sticky top-14 z-10`}>
          <div
            role="columnheader"
            className={`hidden items-center border-y border-border bg-background px-8 py-6 text-foreground lg:flex ${H5}`}
          >
            Features
          </div>
          {cols.map((c) =>
            c.ours ? (
              <OursHead key="ours" className="-order-1 lg:order-none" />
            ) : (
              <RivalHead
                key={key(c)}
                name={rivals[c.i].name}
                className={show(c.i)}
              />
            ),
          )}
        </div>

        {groups.map((g, gi) => (
          <div key={g.label || gi} role="rowgroup">
            {/* the group name: a grey band across the whole table, as in
                Sameer's earlier comparison design. The name is H5 in
                medium weight over regular feature names. The white TestMu AI
                column stays white through the band, one unbroken column. No
                lines on the band: its colour parts it from the rows. */}
            {g.label && (
              <div role="row" className={GRID}>
                <div
                  role="columnheader"
                  className="order-first col-span-full flex items-center bg-[var(--tm-bg-fill)] px-4 py-3 lg:order-none lg:col-span-1 lg:px-8 lg:py-4"
                >
                  <span className={`block text-foreground ${H5}`}>
                    {g.label}
                  </span>
                </div>
                {cols.map((c) => (
                  <div
                    key={key(c)}
                    aria-hidden
                    className={`hidden lg:block ${
                      c.ours ? "" : "bg-[var(--tm-bg-fill)]"
                    }`}
                  />
                ))}
              </div>
            )}

            {g.rows.map((r, ri) => {
              const end =
                !tally && gi === groups.length - 1 && ri === g.rows.length - 1
                  ? END
                  : "";
              return (
                <div key={r.name} role="row" className={GRID}>
                  <div role="rowheader" className={`${LABEL} ${end}`}>
                    <div className={`${LABEL_IN} ${dotted(gi, ri)}`}>
                      <span className="block text-b2 text-foreground">
                        {r.name}
                      </span>
                    </div>
                  </div>
                  {cols.map((c, ci) => (
                    <div
                      key={key(c)}
                      role="cell"
                      className={`${c.ours ? OURS : `${RIVAL} ${show(c.i)}`} ${end}`}
                    >
                      <div className={`${CELL_IN} ${dotted(gi, ri)}`}>
                        <Mark
                          value={r.values[c.ours ? 0 : c.i + 1]}
                          ours={c.ours}
                          delay={ci * 0.08}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}

        {/* the total, counted from the rows above */}
        {tally && (
          <div role="row" className={GRID}>
            <div role="rowheader" className={`${LABEL} ${END}`}>
              <div className={LABEL_IN}>
                <span className="block text-b2 font-medium text-foreground">
                  Built in
                </span>
              </div>
            </div>
            {cols.map((c) => (
              <div
                key={key(c)}
                role="cell"
                className={`${c.ours ? OURS : `${RIVAL} ${show(c.i)}`} ${END}`}
              >
                <div className={CELL_IN}>
                  <span className="flex items-baseline gap-1">
                    <CountUp
                      to={built(c)}
                      className={`pixel text-[32px] leading-none tracking-tight lg:text-[48px] ${
                        c.ours ? "text-foreground" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-b3 text-muted-foreground">
                      / {rows.length}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* the foot: the button in the TestMu AI column; the other columns
            end at the last row, with nothing below them */}
        <div className={GRID}>
          <div aria-hidden className="hidden lg:block" />
          {cols.map((c) =>
            !c.ours ? (
              <div key={key(c)} aria-hidden className="hidden lg:block" />
            ) : cta ? (
              <div
                key="ours"
                className="-order-1 col-span-full border border-t-0 border-border bg-surface px-4 py-5 lg:order-none lg:col-span-1 lg:border-0 lg:bg-transparent lg:px-6 lg:py-6"
              >
                <a
                  href="#top"
                  data-cursor="Start free"
                  className={`btn ${roomy ? "btn-lg" : "btn-sm"} btn-primary btn-arrow btn-arrow-plain w-full ${FOCUS}`}
                >
                  {cta}
                  <ArrowChip />
                </a>
              </div>
            ) : (
              <div key="ours" aria-hidden className="hidden h-6 lg:block" />
            ),
          )}
        </div>
      </div>
    </>
  );
}
