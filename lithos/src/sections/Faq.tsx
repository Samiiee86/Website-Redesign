import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { faq } from "../lib/content";
import { Reveal, Section } from "../lib/ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="pb-12 md:pb-16">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className=" text-4xl font-normal leading-[1.05] tracking-[-0.04em] text-foreground md:text-[52px]">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-6 border-b border-border py-6 text-left"
                >
                  <span
                    className={`text-lg tracking-[-0.02em] transition-colors duration-300 md:text-xl ${
                      isOpen
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`mt-1 shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {isOpen ? <Minus size={19} /> : <Plus size={19} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-b border-border"
                    >
                      <p className="max-w-[560px] py-6 text-[15px] leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
