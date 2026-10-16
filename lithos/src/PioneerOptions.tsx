import Header from "./components/Header";
import GuideLines from "./components/GuideLines";
import Bento, { type PioneerVariant } from "./sections/Bento";

/* Side-by-side review page for the Pioneer fold: the same section rendered
   once per layout option, one after another. Opened with ?options=pioneer. */

const OPTIONS: { variant: PioneerVariant; name: string; note: string }[] = [
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
    variant: "framed",
    name: "Nature with white frame (your screenshot)",
    note: "Exactly the version from two days back: one joined box, paintings inset on a white frame, and your original product screenshots in the windows.",
  },
  {
    variant: "breakout",
    name: "Break-out window + hover",
    note: "Painting band on top, window overlapping onto white. Hovering a card widens it, lifts its window, replays the demo and fades the other card.",
  },
  {
    variant: "inset",
    name: "Nature with white frame, animated",
    note: "Same structure as option 3, but the windows are the live animated demos instead of the static screenshots.",
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
