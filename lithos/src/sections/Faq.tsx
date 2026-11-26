import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { faq } from "../lib/content";
import { Section } from "../lib/ui";

/* The live testmuai.com FAQ: heading in its own column, questions as
   full-width ruled rows beside it, the first eight shown and the rest
   behind "View more questions". */

const FIRST = 8;
const EASE = [0.16, 1, 0.3, 1] as const;

/* `items` swaps in a page's own questions; the home page uses the default. */
export default function Faq({
  items = faq,
  title = "Frequently asked questions",
  stacked = false,
}: {
  items?: { q: string; a: ReactNode }[];
  /* a page's own FAQ heading; the home page keeps the default */
  title?: string;
  /* the heading on top across the frame, the questions full width under
     it (the product pages, as on the live pages) */
  stacked?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, FIRST);

  return (
    <Section className="!py-0 md:!py-0">
      <div className={`-mx-8 grid ${stacked ? "" : "lg:grid-cols-[0.4fr_0.6fr]"}`}>
        <div className={stacked ? "px-8 pb-12 pt-16 md:pt-24" : `px-8 pb-8 pt-16 md:pt-20 ${title.length > 30 ? "" : "md:px-16"}`}>
          {/* side column: a longer page heading steps down to H3 so it
              still breaks into two balanced lines */}
          <h2
            className={`text-foreground [text-wrap:balance] ${!stacked && title.length > 30 ? "lg:!text-[32px] lg:!leading-[40px] lg:!tracking-[-1px]" : ""}`}
          >
            {title}
          </h2>
        </div>

        <div className={stacked ? "" : "lg:border-l lg:border-border"}>
          {!stacked && <div className="hidden h-[70px] lg:block" />}
          {shown.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-b1 tracking-[-0.01em] text-foreground transition-colors duration-200 hover:bg-secondary/40"
                >
                  {item.q}
                  {isOpen ? (
                    <Minus size={20} strokeWidth={1.5} className="flex-none" />
                  ) : (
                    <Plus size={20} strokeWidth={1.5} className="flex-none" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[640px] px-6 pb-7 text-b2 leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {items.length > FIRST && (
            <div className="border-t border-border">
              <button
                onClick={() => {
                  if (all && open !== null && open >= FIRST) setOpen(null);
                  setAll((a) => !a);
                }}
                aria-expanded={all}
                className="flex w-full items-center justify-center gap-2 py-6 text-b2 text-foreground transition-colors duration-200 hover:bg-secondary/40"
              >
                {all ? "View fewer questions" : "View more questions"}
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${all ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
