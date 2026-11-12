import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ArrowChip, Reveal, Section } from "../lib/ui";
import { Cross, FoldHead, Tick } from "./compare/parts";
import { DOTS, FOCUS, H4, H5 } from "./compare/cells";

/* Spec sheet: each row is a thing (a tool, a plan, a framework) and each
   column is a fact about it. Nobody wins here, so no column is lifted.

   - Columns take turns, off-white then the page ground, as in the Mistral
     reference, from the column names down to the last row. No lines down
     between the columns; the rows are parted by dotted lines that stop
     short of each column edge, as in the ElevenLabs reference. Phones
     show plain white blocks.
   - A row name can be a link (`href`, e.g. the tool's docs): the name
     itself, with an arrow beside it.
   - Column names pin under the header while the rows scroll.
   - Phones: each row becomes a stacked block, with the column name
     repeated above every value. */

/* What one cell can hold:
   "text"            a plain line
   { code }          a file type or command, set in mono
   { text, code }    a line followed by a mono tag
   { ok, text }      a tick or a cross, then a line */
export type SpecCell = string | { text?: string; code?: string; ok?: boolean };

export type SpecRow = {
  name: string;
  /* where the row name leads, e.g. the tool's docs */
  href?: string;
  /* shown in place of the name (the name stays as its alt text) */
  logo?: string;
  /* lift this row out as the one white box, outlined in black on a soft
     shadow, the same treatment as TestMu AI's column in the head to head */
  highlight?: boolean;
  cells: SpecCell[];
};

type Props = {
  lead: string;
  title: string;
  body: ReactNode;
  cta?: string;
  /* the first is the name of the row column, the rest name the facts */
  columns: string[];
  rows: SpecRow[];
};

/* desktop: every other column, the first included, is Mistral's soft
   off-white (#FAFBF8), made from the design system's white mixed 60/40
   with the page ground; the rest show the page ground (#F5F4F0), which
   is already Mistral's cream. */
const LIGHT =
  "lg:bg-[color-mix(in_srgb,var(--tm-bg-surface)_60%,var(--tm-bg-default))]";
const tint = (col: number) => (col % 2 === 0 ? LIGHT : "lg:bg-background");

const GRID =
  "relative grid lg:grid-cols-[minmax(0,1.1fr)_repeat(var(--n),minmax(0,1fr))]";

function Value({ cell, strong = false }: { cell: SpecCell; strong?: boolean }) {
  if (typeof cell === "string")
    return (
      <span
        className={`text-b2 ${strong ? "font-medium text-foreground" : "text-muted-foreground"}`}
      >
        {cell}
      </span>
    );

  return (
    <span className="flex items-start gap-3 text-b2 text-foreground">
      {cell.ok === true && (
        <>
          <Tick />
          <span className="sr-only">Yes:</span>
        </>
      )}
      {cell.ok === false && (
        <>
          <Cross />
          <span className="sr-only">No:</span>
        </>
      )}
      {/* the words wrap beside the tick, never under it */}
      <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        {cell.text && <span>{cell.text}</span>}
        {cell.code && (
          <code className="rounded bg-secondary px-2 py-0.5 font-mono text-b3 text-foreground">
            {cell.code}
          </code>
        )}
      </span>
    </span>
  );
}

export default function SpecTable({
  lead,
  title,
  body,
  cta,
  columns,
  rows,
}: Props) {
  return (
    <Section>
      <FoldHead lead={lead} title={title} body={body}>
        {cta && (
          <a
            href="#top"
            data-cursor="Start free"
            className={`btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8 ${FOCUS}`}
          >
            {cta}
            <ArrowChip />
          </a>
        )}
      </FoldHead>

      <Reveal delay={0.08}>
        <SpecSheet
          label={`${lead} ${title}`}
          columns={columns}
          rows={rows}
          className="-mx-8"
        />
      </Reveal>
    </Section>
  );
}

/* The table on its own, for pages that bring their own section head
   (a kit fold). The caller sets how far it bleeds. */
export function SpecSheet({
  label,
  columns,
  rows,
  className = "",
}: {
  label: string;
  columns: string[];
  rows: SpecRow[];
  className?: string;
}) {
  const facts = columns.slice(1);

  return (
        <div
          role="table"
          aria-label={label}
          className={`relative border-y border-border bg-surface ${className}`}
          style={{ "--n": facts.length } as CSSProperties}
        >
          {/* column names: pinned under the 56px header */}
          <div
            role="row"
            className={`${GRID} sticky top-14 z-10 hidden border-b border-border lg:grid`}
          >
            {columns.map((c, i) => (
              <div
                key={c}
                role="columnheader"
                className={`py-5 text-foreground ${H5} ${tint(i)} ${
                  i === 0 ? "px-8" : "px-6"
                }`}
              >
                {c}
              </div>
            ))}
          </div>

          {rows.map((r, ri) => {
            /* desktop: a dotted line under every cell but the last row's,
               each inset by the cell's own padding, so the dots stop
               short of the next column (as in the ElevenLabs reference) */
            const hl = !!r.highlight;
            /* the lifted row has no dots, and nor does the row above it,
               so no dots run into its outline */
            const dots =
              ri < rows.length - 1 && !hl && !rows[ri + 1]?.highlight
                ? DOTS
                : "";
            /* the lifted row is one white sheet: no column tints */
            const bg = (col: number) => (hl ? "" : tint(col));
            return (
              <div
                key={r.name}
                role="row"
                className={`${GRID} ${
                  hl
                    ? "z-[2] border border-foreground bg-surface shadow-[var(--tm-shadow-floating-md)]"
                    : "border-b border-border lg:border-b-0"
                }`}
              >
                <div
                  role="rowheader"
                  className={`px-4 pb-2 pt-6 lg:px-8 lg:py-0 ${bg(0)}`}
                >
                  <div className={`lg:h-full lg:py-8 ${dots}`}>
                    {r.logo ? (
                      <img
                        src={r.logo}
                        alt={r.name}
                        className="h-5 w-auto lg:h-6"
                      />
                    ) : r.href ? (
                      <a
                        href={r.href}
                        className={`group inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline ${FOCUS}`}
                      >
                        <span className={`${H5} lg:hidden`}>{r.name}</span>
                        <span className={`hidden ${H4} lg:inline`}>
                          {r.name}
                        </span>
                        <ArrowUpRight
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden
                          className="flex-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      <>
                        <span
                          className={`block text-foreground ${H5} lg:hidden`}
                        >
                          {r.name}
                        </span>
                        <span
                          className={`hidden text-foreground ${H4} lg:block`}
                        >
                          {r.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {r.cells.map((cell, i) => (
                  <div
                    key={facts[i]}
                    role="cell"
                    className={`px-4 py-3 last:pb-6 lg:px-6 lg:py-0 lg:last:pb-0 ${bg(i + 1)}`}
                  >
                    <div
                      className={`lg:flex lg:h-full lg:items-center lg:py-8 ${dots}`}
                    >
                      {/* phones: the column name rides above each value */}
                      <span
                        aria-hidden
                        className="mb-1 block text-b3 text-muted-foreground lg:hidden"
                      >
                        {facts[i]}
                      </span>
                      <Value cell={cell} strong={hl} />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
  );
}
