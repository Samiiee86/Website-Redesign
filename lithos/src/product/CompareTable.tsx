import { Sparkles } from "lucide-react";
import { ArrowChip } from "../lib/ui";
import { FOCUS } from "../pieces/compare/cells";

/* The product pages' comparison: the pieces library head to head, drawn
   as one grid where every cell draws its own lines. Nothing is layered
   on top, so the black TestMu AI frame and the grey row lines always
   meet on the same pixel.

   - What matters | TestMu AI | the other option, TestMu AI the widest.
   - Grey head row, white rows, a 1px grey line under every row and an
     outline round the rows that ends at the last row.
   - TestMu AI: white, framed in 2px black from the "Top choice" flag
     down to its button; only this column runs past the last row.
   - Every word at B2 (16px); TestMu AI's values medium and black, the
     other's regular grey.
   - Phones: the TestMu AI and other columns side by side, each feature
     name on its own line above its two values. */

type Props = {
  label: string;
  head: string;
  rival: string;
  rows: { name: string; ours: string; them: string }[];
  cta?: string;
};

const GRID =
  "grid grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)]";
const ROW = "contents";
/* the 2px black sides of the TestMu AI column (desktop) */
const OURS_SIDES = "lg:border-x-2 lg:border-x-[var(--tm-border-emphasis)]";

export default function CompareTable({ label, head, rival, rows, cta }: Props) {
  return (
    <div role="table" aria-label={label} className={`${GRID} text-b2`}>
      {/* the flag above the TestMu AI column */}
      <div role="row" className={ROW}>
        <div aria-hidden className="hidden lg:block" />
        <div
          aria-hidden
          className="flex h-9 items-center justify-center gap-2 bg-[var(--tm-bg-inverse)] font-mono text-b4 uppercase tracking-[0.14em] text-[var(--tm-fg-inverse)]"
        >
          <Sparkles size={16} strokeWidth={1.5} />
          Top choice
        </div>
        <div aria-hidden />
      </div>

      {/* the column names */}
      <div role="row" className={ROW}>
        <div
          role="columnheader"
          className="hidden items-center border-y border-l border-border bg-background px-8 py-6 font-medium text-foreground lg:flex"
        >
          {head}
        </div>
        <div
          role="columnheader"
          className="flex items-center justify-center border-x-2 border-b border-x-[var(--tm-border-emphasis)] border-b-border bg-surface px-4 py-5 lg:px-6 lg:py-6"
        >
          <img src="/testmu-logo-dark.svg" alt="TestMu AI" className="h-5 w-auto lg:h-6" />
        </div>
        <div
          role="columnheader"
          className="flex items-center justify-center border-y border-r border-border bg-background px-4 py-5 text-center font-medium text-foreground lg:px-6 lg:py-6"
        >
          {rival}
        </div>
      </div>

      {/* the rows */}
      {rows.map((r) => (
        <div key={r.name} role="row" className={ROW}>
          <div
            role="rowheader"
            className="col-span-2 border-x border-border bg-surface px-4 pt-4 text-muted-foreground lg:col-span-1 lg:flex lg:items-center lg:border-b lg:border-r-0 lg:px-8 lg:py-6 lg:text-foreground"
          >
            {r.name}
          </div>
          <div
            role="cell"
            className={`flex items-center justify-center border-b border-l border-border bg-surface px-4 py-4 text-center font-medium text-foreground lg:px-6 lg:py-6 ${OURS_SIDES}`}
          >
            {r.ours}
          </div>
          <div
            role="cell"
            className="flex items-center justify-center border-b border-r border-border bg-surface px-4 py-4 text-center text-muted-foreground lg:px-6 lg:py-6"
          >
            {r.them}
          </div>
        </div>
      ))}

      {/* the foot: the button closes the TestMu AI column */}
      {cta && (
        <div role="row" className={ROW}>
          <div aria-hidden className="hidden lg:block" />
          <div className="col-span-2 border-x border-b border-border bg-surface px-4 py-5 lg:col-span-1 lg:border-x-2 lg:border-b-2 lg:border-[var(--tm-border-emphasis)] lg:px-6 lg:py-6">
            <a
              href="#top"
              data-cursor="Start free"
              className={`btn btn-lg btn-primary btn-arrow btn-arrow-plain w-full ${FOCUS}`}
            >
              {cta}
              <ArrowChip />
            </a>
          </div>
          <div aria-hidden className="hidden lg:block" />
        </div>
      )}
    </div>
  );
}
