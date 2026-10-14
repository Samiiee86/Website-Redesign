import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Quote } from "lucide-react";
import { products } from "../lib/content";
import { scenery } from "../lib/scenery";
import { DEMOS, type DemoKey } from "../components/Demos";
import { Reveal, Section } from "../lib/ui";

/* The Unified Quality Engineering fold: a sticky bar of seven product tabs
   over one continuous box. Each product gets its own muted landscape with a
   live hand-built demo floating on it — the momentic.ai treatment, no video
   files and no white letterboxing. The bar both scrolls-to on click and
   follows along as you scroll. */

type Tab = (typeof products.tabs)[number];

function Accordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-6 border-t border-border-muted">
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-border-muted">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
          >
            <span className="text-[15px] font-medium tracking-tight text-foreground">
              {item.title}
            </span>
            <ChevronDown
              size={16}
              className={`flex-none text-muted-foreground transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-[400px] pb-4 text-[14px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function Panel({ tab }: { tab: Tab }) {
  const Demo = DEMOS[tab.demo as DemoKey];
  return (
    <div
      id={`unified-${tab.id}`}
      className="grid scroll-mt-[128px] border-t border-border-muted lg:min-h-[640px] lg:grid-cols-[0.95fr_1.25fr]"
    >
      {/* copy sill */}
      <div className="flex flex-col p-8 lg:p-10">
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {tab.tag}
        </p>
        <h3 className="mt-4 max-w-[420px] text-[24px] leading-[1.25] tracking-tight md:text-[28px]">
          {tab.title}
        </h3>
        <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-muted-foreground">
          {tab.body}
        </p>
        {"accordion" in tab && tab.accordion ? (
          <Accordion items={tab.accordion} />
        ) : tab.points.length > 0 ? (
          <div className="mt-6">
            {"listCaption" in tab && tab.listCaption && (
              <p className="text-[15px] font-medium tracking-tight text-foreground">
                {tab.listCaption}
              </p>
            )}
            <ul className="mt-3 flex flex-col gap-2.5">
              {tab.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <Check
                    size={15}
                    strokeWidth={2.4}
                    className="mt-[2px] shrink-0 text-foreground"
                  />
                  <span className="text-[13.5px] leading-snug text-foreground">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {"install" in tab && tab.install && (
          <div className="mono mt-6 inline-flex items-center gap-2.5 self-start border border-border-muted bg-background px-3.5 py-2 text-[12.5px] text-foreground">
            <span className="select-none text-muted-foreground">$</span>
            {tab.install}
          </div>
        )}
        <button className="group mt-7 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-[14px] font-medium transition-colors">
          {tab.cta}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {"quote" in tab && tab.quote && (
          <figure className="mt-auto pt-8">
            <Quote size={16} className="text-muted-foreground" />
            <blockquote className="mt-2.5 max-w-[400px] text-[14px] leading-relaxed text-foreground">
              {tab.quote.text}
            </blockquote>
            <figcaption className="mt-3 text-[13px]">
              {tab.quote.name}
              <span className="block text-[12px] text-muted-foreground">
                {tab.quote.role}
              </span>
            </figcaption>
          </figure>
        )}
      </div>

      {/* the demo stage: muted landscape, floating UI, looping script */}
      <div className="relative min-h-[420px] overflow-hidden border-t border-border-muted lg:border-l lg:border-t-0">
        <img
          src={scenery[tab.scene as keyof typeof scenery]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        {/* mute the painting so the UI reads first */}
        <div className="absolute inset-0 bg-background/25" />
        <div className="absolute inset-0 flex items-center justify-center p-7 md:p-12">
          <div className="w-full max-w-[460px]">
            <Demo />
          </div>
        </div>
      </div>
    </div>
  );
}

const label = (tag: string) =>
  tag
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Ai", "AI")
    .replace("Hyperexecute", "HyperExecute");

export default function Unified() {
  const [active, setActive] = useState(products.tabs[0].id);
  const boxRef = useRef<HTMLDivElement>(null);

  /* the bar follows the scroll: whichever panel owns the middle of the
     viewport owns the tab highlight */
  useEffect(() => {
    const panels = products.tabs
      .map((t) => document.getElementById(`unified-${t.id}`))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id.replace("unified-", ""));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => {
    document
      .getElementById(`unified-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section id="unified">
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="text-[34px] leading-[1.14] tracking-tight md:text-[42px]">
            <span className="block text-muted-foreground">
              TestMu AI (formerly LambdaTest)
            </span>
            <span className="block">{products.eyebrow}</span>
          </h2>
          <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
            {products.title}
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
        <div ref={boxRef} className="border border-border-muted bg-surface">
          {/* seven product tabs, stuck under the site header */}
          <div className="sticky top-16 z-20 flex overflow-x-auto border-b border-border-muted bg-background">
            {products.tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => jump(t.id)}
                className={`flex-1 whitespace-nowrap border-r border-border-muted px-4 py-3.5 text-[13.5px] font-medium transition-colors last:border-r-0 ${
                  active === t.id
                    ? "border-b-2 border-b-foreground bg-surface text-foreground"
                    : "bg-background text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                }`}
              >
                {label(t.tag)}
              </button>
            ))}
          </div>

          {products.tabs.map((t) => (
            <Panel key={t.id} tab={t} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
