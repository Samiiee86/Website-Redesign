import { motion } from "motion/react";
import { ArrowChip } from "../lib/ui";
import { hero } from "../lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Hero per the Figma frame: clean page ground, headline left and promise
   right, and one wide painted-seascape card with the product video playing in
   a fixed white frame at its centre. The video (home-hero/src) is the live
   TestmuAi recording rebuilt on white: no nature backgrounds, zooms or slides,
   title cards redrawn as dark text, scenes joined with 0.7s crossfades. */

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
            className="tracking-tight text-foreground"
          >
            <span className="block lg:whitespace-nowrap">Assure your AI deployment -</span>
            <span className="block lg:whitespace-nowrap">across enterprise and real world</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="max-w-[320px] text-b2 leading-relaxed text-muted-foreground md:text-b1 lg:justify-self-end"
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
          className="relative mt-16 min-h-[300px] overflow-hidden border border-border-muted sm:min-h-[520px] md:mt-20 md:min-h-[640px]"
        >
          <img
            src="/img/hero-lake.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/10" />
          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7 md:p-14">
            <div className="aspect-[1000/552] w-full max-w-[1000px] overflow-hidden bg-white">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/img/home-demo-poster.jpg"
                disablePictureInPicture
                aria-label="Product demo: plan test scenarios from an objective, author them on a live browser, execute on the cloud, then analyse failures with root cause analysis"
                className="block h-full w-full object-cover"
              >
                <source src="/video/home-demo.webm?v=2" type="video/webm" />
                <source src="/video/home-demo.mp4?v=2" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
