import { ArrowRight } from "lucide-react";
import { pioneer } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, Section } from "../lib/ui";

const PANELS = ["/img/panel-kane.png", "/img/panel-cloud.png"];
const SCENES = [scenery.cliffwalk, scenery.sunsetlake];

/* The two pioneer cards, momentic-style like the fold stages: the painting
   is the full stage with the product UI floating in its centre, and the
   copy sits below the card on the page ground. */
function Card({ index }: { index: number }) {
  const card = pioneer.cards[index];
  return (
    <div data-cursor={card.cta} className="flex h-full flex-col">
      <div className="relative h-[420px] overflow-hidden md:h-[500px]">
        <img
          src={SCENES[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-[520px] overflow-hidden rounded-[16px] border border-white/60 bg-surface shadow-[0_36px_80px_-26px_rgba(18,18,18,0.45)]">
            <img src={PANELS[index]} alt="" className="h-auto w-full" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="flex-1 border-t border-border-muted bg-surface p-7 md:p-8">
        <h3 className="text-[22px] leading-[1.2] tracking-tight text-foreground md:text-[26px]">
          {card.title}
        </h3>
        <p className="mt-2.5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
          {card.body}
        </p>
        <button className="group/btn mt-5 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[14px] font-medium text-foreground">
          {card.cta}
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
        <div className="grid border border-border-muted md:grid-cols-2">
          <div className="border-b border-border-muted md:border-b-0 md:border-r">
            <Card index={0} />
          </div>
          <Card index={1} />
        </div>
      </Reveal>
    </Section>
  );
}
