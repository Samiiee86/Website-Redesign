import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { pioneer } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, Section } from "../lib/ui";

const PANELS = ["/img/panel-kane.png", "/img/panel-cloud.png"];
const SCENES = [scenery.valley, scenery.mist];

function Card({ index }: { index: number }) {
  const card = pioneer.cards[index];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      data-cursor={card.cta}
      className="group relative h-[520px] overflow-hidden md:h-[620px]"
    >
      <motion.img
        src={SCENES[index]}
        alt=""
        style={{ y: sceneY }}
        className="absolute inset-0 h-[112%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <motion.div
        style={{ y: panelY }}
        className="absolute left-[9%] top-10 w-[82%] overflow-hidden border border-white/60 bg-surface shadow-[0_36px_80px_-26px_rgba(18,18,18,0.6)]"
      >
        <img
          src={PANELS[index]}
          alt=""
          className="h-auto w-full"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
        <h3 className="max-w-[460px] text-[26px] leading-[1.15] tracking-tight text-white md:text-[32px]">
          {card.title}
        </h3>
        <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-white/75">
          {card.body}
        </p>
        <button className="group/btn mt-6 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[14px] font-medium text-white transition-colors hover:border-white">
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
        <div className="grid gap-5 md:grid-cols-2">
          <div className="overflow-hidden border border-border-muted">
            <Card index={0} />
          </div>
          <div className="overflow-hidden border border-border-muted">
            <Card index={1} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
