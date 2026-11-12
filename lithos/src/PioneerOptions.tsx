import Header from "./components/Header";
import GuideLines from "./components/GuideLines";
import type { ReactNode } from "react";
import Bento from "./sections/Bento";
import Unified from "./sections/Unified";
import Flow from "./sections/Flow";

/* Review page for layout options: each option renders its section, one
   after another. Opened with ?options=pioneer or /options.html. */

const OPTIONS: { id: string; name: string; note: string; render: () => ReactNode }[] = [
  {
    id: "hover",
    name: "Pioneer · Joined five (previous home)",
    note: "The earlier home layout: two big painted cards over three shorter ones, all on one joined surface. The home page now uses the Gumloop grid.",
    render: () => <Bento variant="hover" />,
  },
  {
    id: "unified-bento",
    name: "Unified · Bento (previous)",
    note: "The earlier Unified fold: four flagship cards with live demos over three platform cards. The home page now uses alternating product rows.",
    render: () => <Unified variant="bento" />,
  },
  {
    id: "flow-diagram",
    name: "Flow · Static diagram (previous home)",
    note: "The four stages as connected cards. This version's home page tells the same story in the pinned scrolling flow.",
    render: () => <Flow />,
  },
  {
    id: "unified-sticky",
    name: "Unified · Sticky scroll (previous home)",
    note: "Copy scrolls on the left while one demo frame stays pinned on the right. Replaced here by the pinned Plan to Analysis flow.",
    render: () => <Unified variant="sticky" />,
  },
  {
    id: "unified-rows",
    name: "Unified · Alternating rows (previous home)",
    note: "Four rows with copy on one side and the demo on a painting on the other, alternating sides.",
    render: () => <Unified variant="rows" />,
  },
  {
    id: "unified-switcher",
    name: "Unified · One-frame switcher",
    note: "A product list on the left and one large demo frame on the right that changes every 9 seconds. The home page now uses alternating product rows.",
    render: () => <Unified variant="switcher" />,
  },
  {
    id: "inset",
    name: "Pioneer · Nature with white frame, animated",
    note: "One joined box with a divider; each painting sits inset on a white frame that lines up with the copy below.",
    render: () => <Bento variant="inset" />,
  },
  {
    id: "joined",
    name: "Pioneer · One joined card, white",
    note: "Both products share one bordered surface with a divider down the middle. No paintings: the windows sit on a darker beige ground.",
    render: () => <Bento variant="joined" />,
  },
  {
    id: "spaced",
    name: "Pioneer · Two spaced cards",
    note: "Separate cards with air between them, and the pair stepped in from the page lines on both sides.",
    render: () => <Bento variant="spaced" />,
  },
  {
    id: "breakout",
    name: "Pioneer · Full painting + hover",
    note: "The painting fills the whole stage behind the window, copy on white below. Hovering a card widens it, lifts its window, replays the demo and fades the other card.",
    render: () => <Bento variant="breakout" />,
  },
];

export default function PioneerOptions() {
  return (
    <div className="relative min-h-screen bg-background font-body">
      <Header />
      <main className="relative">
        <GuideLines />
        {OPTIONS.map((o, i) => (
          <div key={o.id}>
            <div className="relative z-[1] border-t border-border bg-foreground px-5 py-4 text-background sm:px-8">
              <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-8 md:flex-row md:items-baseline md:gap-6">
                <p className="mono text-[10px] uppercase tracking-[0.22em] text-background/60">
                  Option {i + 1} of {OPTIONS.length}
                </p>
                <p className="text-[14px] font-medium">{o.name}</p>
                <p className="text-[14px] text-background/70">{o.note}</p>
              </div>
            </div>
            {o.render()}
          </div>
        ))}
      </main>
    </div>
  );
}
