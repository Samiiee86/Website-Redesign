import Header from "./components/Header";
import GuideLines from "./components/GuideLines";
import Bento, { type PioneerVariant } from "./sections/PioneerVariants";

/* Side-by-side review page for the Pioneer fold: the same section rendered
   once per layout option, one after another. Served at /options.html. */

const OPTIONS: { variant: PioneerVariant; name: string; note: string }[] = [
  {
    variant: "inset",
    name: "Nature with white frame, animated",
    note: "One joined box with a divider; each painting sits inset on a white frame that lines up with the copy below.",
  },
  {
    variant: "joined",
    name: "One joined card, white",
    note: "Both products share one bordered surface with a divider down the middle. No paintings: the windows sit on a darker beige ground.",
  },
  {
    variant: "spaced",
    name: "Two spaced cards",
    note: "Separate cards with air between them, and the pair stepped in from the page lines on both sides.",
  },
  {
    variant: "breakout",
    name: "Full painting + hover",
    note: "The painting fills the whole stage behind the window, copy on white below. Hovering a card widens it, lifts its window, replays the demo and fades the other card.",
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
