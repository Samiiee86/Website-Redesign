import { motion } from "motion/react";
import { ArrowChip } from "../lib/ui";
import { DEMOS } from "./Demos";
import { hero } from "../lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Hero per the Figma frame: clean page ground, headline left and promise
   right, and one wide painted-seascape card with the KaneAI demo playing in
   its centre — the same momentic-style scripted UI as the Unified fold, so
   the "video" is weightless and never letterboxed. */

const PlanDemo = DEMOS.hero;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-1 flex-col overflow-hidden pb-10 md:pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-7 pt-[72px]">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-14">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-[34px] leading-[1.08] tracking-tight text-foreground md:text-[42px] lg:text-[48px]"
          >
            <span className="block lg:whitespace-nowrap">Assure your AI deployment -</span>
            <span className="block lg:whitespace-nowrap">across enterprise and real world</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="max-w-[320px] text-base leading-relaxed text-muted-foreground md:text-lg lg:justify-self-end"
          >
            We assure that your AI works as intended. Safely and securely.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <button
            data-cursor="Start free"
            className="btn btn-lg btn-primary btn-arrow"
          >
            {hero.primary}
            <ArrowChip />
          </button>
          <button
            data-cursor="Sign up with email"
            className="btn btn-lg btn-secondary"
          >
            {hero.secondary}
          </button>
        </motion.div>

        {/* the media card: Figma seascape, demo playing in the centre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="relative mt-16 min-h-[520px] overflow-hidden border border-border-muted md:mt-20 md:min-h-[640px]"
        >
          <img
            src="/img/hero-lake.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/10" />
          <div className="absolute inset-0 flex items-center justify-center p-7 md:p-14">
            <div className="w-full max-w-[960px]">
              <PlanDemo />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
