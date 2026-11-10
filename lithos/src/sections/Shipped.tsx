import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { shipped } from "../lib/content";
import { Reveal, Section } from "../lib/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Changelog fold, after devin.ai: the list on the right, and on the left a
   small painted card that follows whichever row you point at. */
export default function Shipped() {
  const [active, setActive] = useState(0);
  const item = shipped.items[active];

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
        <Reveal className="flex flex-col justify-between gap-10">
          <div>
            <h2 className="tracking-tight">{shipped.title}</h2>
            <a
              href={shipped.all.href}
              target="_blank"
              rel="noreferrer"
              className="group/all mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-b3 font-medium text-foreground"
            >
              {shipped.all.label}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
              />
            </a>
          </div>

          {/* preview card, hidden on phones where there is no pointer */}
          <div className="hidden lg:block">
            <p className="mono mb-3 text-b4 tracking-[0.18em] text-muted-foreground">
              [ {String(active + 1).padStart(2, "0")} ]
            </p>
            <div className="relative h-[190px] w-full max-w-[320px] overflow-hidden border border-border bg-surface">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <img
                    src={item.scene}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="mono border border-white/70 bg-white/70 px-3 py-1.5 text-b4 uppercase tracking-[0.18em] text-foreground backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul
            className="border-t border-border"
            onMouseLeave={() => setActive(0)}
          >
            {shipped.items.map((row, i) => (
              <li key={row.title}>
                <a
                  href={row.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-cursor="Read update"
                  className="group grid grid-cols-[56px_1fr_20px] items-center gap-4 border-b border-border py-5 md:grid-cols-[72px_1fr_150px_20px] md:gap-6"
                >
                  <span className="pixel text-b1 text-muted-foreground">
                    {row.date}
                  </span>
                  <span
                    className={`truncate text-b1 tracking-tight transition-colors duration-300 ${
                      active === i ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {row.title}
                  </span>
                  <span className="hidden truncate text-b3 text-muted-foreground md:block">
                    {row.tag}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
