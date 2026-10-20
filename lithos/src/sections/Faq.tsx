import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { faq } from "../lib/content";
import { Section } from "../lib/ui";

/* The live testmuai.com FAQ: heading in its own column, questions as
   full-width ruled rows beside it, the first five shown and the rest
   behind "View more questions". */

const FIRST = 5;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const shown = all ? faq : faq.slice(0, FIRST);

  return (
    <Section className="!py-0 md:!py-0">
      <div className="-mx-8 grid lg:grid-cols-[0.4fr_0.6fr]">
        <div className="px-8 pb-8 pt-16 md:px-16 md:pt-20">
          <h2 className="tracking-[-0.03em] text-foreground">
            Frequently asked questions
          </h2>
        </div>

        <div className="lg:border-l lg:border-border">
          <div className="hidden h-[70px] lg:block" />
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

          {faq.length > FIRST && (
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
