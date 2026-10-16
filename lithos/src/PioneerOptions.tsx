import Header from "./components/Header";
import GuideLines from "./components/GuideLines";
import Bento, { type PioneerVariant } from "./sections/Bento";

/* Side-by-side review page for the Pioneer fold: the same section rendered
   once per layout option, one after another. Opened with ?options=pioneer. */

const OPTIONS: { variant: PioneerVariant; name: string; note: string }[] = [
  {
    variant: "imageTop",
    name: "Image on top",
    note: "Painting and demo first, copy on white below. Each demo plays as the card scrolls into view.",
  },
  {
    variant: "hover",
    name: "Hover expand",
    note: "Copy first, painting below. Hovering a card widens it, fades the other and replays its demo. This is what variation-4 shows today.",
  },
  {
    variant: "white",
    name: "White background",
    note: "No paintings. The product windows sit on the white card itself, so the two cards can never merge.",
  },
  {
    variant: "soft",
    name: "Soft cards (ElevenLabs style)",
    note: "Rounded tinted cards with no borders. One window floats centred, the other runs off the card's edge, with a quiet caption and no link.",
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
