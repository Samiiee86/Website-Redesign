import Header from "./components/Header";
import GuideLines from "./components/GuideLines";
import Bento, { type PioneerVariant } from "./sections/Bento";

/* Side-by-side review page for the Pioneer fold: the same section rendered
   once per layout option, one after another. Opened with ?options=pioneer. */

const OPTIONS: { variant: PioneerVariant; name: string; note: string }[] = [
  {
    variant: "joined",
    name: "One joined card, white",
    note: "Both products share one bordered surface with a divider down the middle. No paintings, no gaps.",
  },
  {
    variant: "spaced",
    name: "Two spaced cards",
    note: "Separate cards with air between them, and the pair stepped in from the page lines on both sides.",
  },
  {
    variant: "rows",
    name: "Wide rows",
    note: "One full-width card per product: copy on the left, a large painting stage on the right, stacked. More room for each demo.",
  },
  {
    variant: "breakout",
    name: "Break-out window",
    note: "The painting is a band across the top; the window overlaps it, half on the scene and half on white. Depth, and the paintings never meet.",
  },
  {
    variant: "inset",
    name: "Nature with white frame (earlier design)",
    note: "One joined box with a divider; each painting sits inset on a white frame that lines up with the copy below.",
  },
];

export default function PioneerOptions() {
  return (
    <div className="relative min-h-screen bg-background font-body">
      <div aria-hidden className="grain" />
      <Header />
      <main className="relative">
        <GuideLines />
        {OPTIONS.map((o, i) => (
          <div key={o.variant}>
            <div className="relative z-[1] border-t border-border bg-foreground px-5 py-4 text-background sm:px-8">
              <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-8 md:flex-row md:items-baseline md:gap-6">
                <p className="mono text-[11px] uppercase tracking-[0.22em] text-background/60">
                  Option {i + 1} of {OPTIONS.length}
                </p>
                <p className="text-[15px] font-medium">{o.name}</p>
                <p className="text-[13.5px] text-background/70">{o.note}</p>
              </div>
            </div>
            <Bento variant={o.variant} />
          </div>
        ))}
      </main>
    </div>
  );
}
