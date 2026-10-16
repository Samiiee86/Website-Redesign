import { ArrowRight, Bot, LayoutGrid, Sparkles } from "lucide-react";
import { pioneer } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, Section } from "../lib/ui";

const PANELS = [
  { shot: "/img/panel-kane.png", title: "testmu.ai / kaneai", icon: Bot, right: Sparkles },
  { shot: "/img/panel-cloud.png", title: "testmu.ai / agentic-cloud", icon: LayoutGrid, right: Sparkles },
];
const SCENES = [scenery.grassea, scenery.chalkcliff];

/* The two pioneer cards, momentic-style like the fold stages: the painting
   is the full stage with the product UI floating in its centre, and the
   copy sits below the card on the page ground. */
function Card({ index }: { index: number }) {
  const card = pioneer.cards[index];
  const PanelIcon = PANELS[index].icon;
  const RightIcon = PANELS[index].right;
  return (
    <div data-cursor={card.cta} className="flex h-full flex-col">
      {/* the painting sits inset on white, its edges on the same line as the
          copy below, so neighbouring paintings never touch */}
      <div className="px-6 pt-6 md:px-7 md:pt-7">
      <div className="relative h-[340px] overflow-hidden md:h-[420px]">
          <img
            src={SCENES[index]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-[520px] overflow-hidden border border-border bg-white shadow-[0_36px_80px_-26px_rgba(18,18,18,0.45)]">
            {/* window chrome, same as the fold demo frames */}
            <div className="flex items-center gap-2 border-b border-border-muted px-3 py-2">
              <span className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-border" />
                ))}
              </span>
              <span className="mx-auto flex items-center gap-1.5 border border-border-muted bg-background px-3 py-0.5 text-muted-foreground">
                <PanelIcon size={10} />
                <span className="mono text-[9px] uppercase tracking-[0.14em]">
                  {PANELS[index].title}
                </span>
              </span>
              <RightIcon size={11} className="text-muted-foreground" />
            </div>
            <img src={PANELS[index].shot} alt="" className="h-[300px] w-full bg-white object-contain p-3" loading="lazy" />
          </div>
        </div>
      </div>

      </div>

      <div className="flex-1 p-6 md:p-7">
        <h3 className="text-[22px] leading-[1.2] tracking-tight text-foreground md:text-[26px]">
          {card.title}
        </h3>
        <p className="mt-2.5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
          {card.body}
        </p>
        <button className="group/btn mt-5 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[14px] font-medium text-foreground">
          Learn more
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

export default function Bento() {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="text-[34px] leading-[1.14] tracking-tight md:text-[42px]">
            <span className="block text-muted-foreground">Pioneer of</span>
            <span className="block">AI Agentic Testing Cloud</span>
          </h2>
          <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
            Autonomous agents that plan and author your tests, running on an
            execution cloud built for any type of test at any scale.
          </p>
        </div>
        <button
          data-cursor="Start free"
          className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
        >
          Start free with Google
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="-mx-8 grid border border-border-muted bg-surface md:grid-cols-2">
          <div className="border-border-muted max-md:border-b md:border-r">
            <Card index={0} />
          </div>
          <Card index={1} />
        </div>
      </Reveal>
    </Section>
  );
}
