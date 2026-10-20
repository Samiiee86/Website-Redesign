import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Accessibility,
  BarChart3,
  Bot,
  ClipboardList,
  Eye,
  FileText,
  Gauge,
  Plug,
} from "lucide-react";
import { folds } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, Section } from "../lib/ui";

const ICONS = {
  clipboard: ClipboardList,
  plug: Plug,
  file: FileText,
  bot: Bot,
  eye: Eye,
  accessibility: Accessibility,
  gauge: Gauge,
  chart: BarChart3,
} as const;

type Fold = (typeof folds)[number];

/* Headline tile: painted landscape, product panel floating over it, copy on the sill. */
function Feature({ feature }: { feature: Fold["features"][number] }) {
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
      data-cursor={feature.cta}
      className="group relative h-[460px] overflow-hidden md:h-[540px]"
    >
      <motion.img
        src={scenery[feature.scene as keyof typeof scenery]}
        alt=""
        style={{ y: sceneY }}
        className="absolute inset-0 h-[112%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      <motion.div
        style={{ y: panelY }}
        className="absolute left-1/2 top-9 w-[80%] -translate-x-1/2 overflow-hidden  border border-white/60 bg-surface shadow-[0_30px_70px_-24px_rgba(18,18,18,0.55)]"
      >
        <img
          src={feature.panel}
          alt=""
          className="h-[220px] w-full object-cover object-left-top"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
        <h3 className="tracking-tight text-white">
          {feature.name}
        </h3>
        <p className="mt-3 max-w-[440px] text-b3 leading-relaxed text-white/75">
          {feature.desc}
        </p>
        <button className="group/btn mt-5 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-b3 font-medium text-white transition-colors hover:border-white">
          {feature.cta}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

function Fold({ fold }: { fold: Fold }) {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">{fold.lead}</span>
            <span className="block">{fold.subject}</span>
          </h2>
          <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
            {fold.body}
          </p>
        </div>
        <button
          data-cursor="Start free"
          className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-b3 font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
        >
          {fold.cta}
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="overflow-hidden  border border-border bg-surface">
          <div className="grid md:grid-cols-2">
            {fold.features.map((f, i) => (
              <div
                key={f.name}
                className={i === 0 ? "md:border-r md:border-border" : ""}
              >
                <Feature feature={f} />
              </div>
            ))}
          </div>

          <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {fold.cells.map((cell, i) => {
              const Icon = ICONS[cell.icon as keyof typeof ICONS];
              return (
                <div
                  key={cell.name}
                  data-cursor={cell.name}
                  className={`group p-7 transition-colors duration-500 hover:bg-secondary/50 ${
                    i < 3 ? "lg:border-r lg:border-border" : ""
                  } ${i % 2 === 0 ? "sm:border-r sm:border-border" : ""} ${
                    i < 2 ? "border-b border-border lg:border-b-0" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      size={20}
                      className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                    />
                    <ArrowUpRight
                      size={16}
                      className="translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100"
                    />
                  </div>
                  <h4 className="mt-6 tracking-tight">
                    {cell.name}
                  </h4>
                  <p className="mt-2.5 text-b3 leading-relaxed text-muted-foreground">
                    {cell.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default function Products() {
  return (
    <>
      {folds.map((fold) => (
        <Fold key={fold.id} fold={fold} />
      ))}
    </>
  );
}
