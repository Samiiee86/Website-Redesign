import type { ReactNode } from "react";
import GuideLines from "./components/GuideLines";
import CompareDuel from "./pieces/CompareDuel";
import CompareMatrix from "./pieces/CompareMatrix";
import SpecTable from "./pieces/SpecTable";
import {
  duel,
  fiveGroups,
  fiveRivals,
  specColumns,
  specRows,
  threeGroups,
  threeRivals,
} from "./pieces/compare/content";

/* The pieces library: every building block for the new TestMu AI pages,
   shown one after another inside the real page frame, parted by a thin
   line, with no labels on them. Add a piece by adding one entry to
   PIECES; its name shows in the header links. */

type Piece = {
  id: string;
  name: string;
  node: ReactNode;
};

const PIECES: Piece[] = [
  {
    id: "head-to-head",
    name: "Head to head",
    node: (
      <CompareDuel
        lead="TestMu AI and BrowserStack,"
        title="line by line"
        body="Same browsers, same devices. The difference is in the limits, and in what you pay per person against what you pay per test running."
        rival={{ name: "BrowserStack" }}
        groups={duel}
      />
    ),
  },
  {
    id: "matrix",
    name: "Matrix",
    node: (
      <CompareMatrix
        lead="Three ways to run your tests,"
        title="one that also writes them"
        body="A grid you host runs your tests when it is up. A rented grid runs what you already wrote. TestMu AI writes the test, runs it, and tells you why it failed."
        cta="Get started free"
        oursAt={1}
        rivals={threeRivals}
        groups={threeGroups}
      />
    ),
  },
  {
    id: "wide-matrix",
    name: "Wide matrix",
    node: (
      <CompareMatrix
        lead="Five ways to test,"
        title="one that does it all"
        body="From people clicking through screens to agents that write and fix the tests. See what each way gives you out of the box."
        rivals={fiveRivals}
        groups={fiveGroups}
      />
    ),
  },
  {
    id: "spec-sheet",
    name: "Spec sheet",
    node: (
      <SpecTable
        lead="Pick the tool."
        title="We run it."
        body={
          <>
            Load test your APIs as part of{" "}
            <a
              href="#top"
              className="text-[var(--tm-fg-link)] underline-offset-4 hover:underline"
            >
              performance testing
            </a>
            . Bring the tool you already use.
          </>
        }
        cta="Start free with Google"
        columns={specColumns}
        rows={specRows}
      />
    ),
  },
];

export default function PiecesLibrary() {
  return (
    <div className="relative min-h-screen bg-background font-body">
      <header className="sticky top-0 z-20 border-b border-border bg-background px-5 sm:px-8">
        <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-6 px-8">
          <a href="/" className="flex items-center gap-3 whitespace-nowrap">
            <img
              src="/testmu-logo-dark.svg"
              alt="TestMu AI"
              className="h-6 w-auto"
            />
            <span className="font-mono text-b4 uppercase tracking-[0.14em] text-muted-foreground">
              Pieces library
            </span>
          </a>
          <nav
            aria-label="Pieces"
            className="hidden items-center gap-6 lg:flex"
          >
            {PIECES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-b3 font-medium text-foreground underline-offset-4 hover:underline"
              >
                {p.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative">
        <GuideLines />

        {PIECES.map((p, i) => (
          <div
            key={p.id}
            id={p.id}
            className={`relative z-[1] scroll-mt-14 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            {p.node}
          </div>
        ))}
      </main>
    </div>
  );
}
