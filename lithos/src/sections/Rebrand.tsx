import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { rebrand } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Section } from "../lib/ui";

const KEPT = ["Same login and API keys", "Same products and integrations", "New AI agents added"];

/* The name change, told as a picture: a window on a painted plate where
   the old name is struck through and the new mark comes up as you scroll. */
function NameChange({ progress }: { progress: MotionValue<number> }) {
  const strike = useTransform(progress, [0.05, 0.35], ["0%", "100%"]);
  const oldFade = useTransform(progress, [0.2, 0.45], [1, 0.4]);
  const newIn = useTransform(progress, [0.3, 0.55], [0.15, 1]);
  const newLift = useTransform(progress, [0.3, 0.55], [10, 0]);
  return (
    <div className="relative mt-10 flex h-[360px] items-center justify-center overflow-hidden border border-border px-5 md:h-[400px]">
      <img
        src={scenery.chalkcliff}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
        loading="lazy"
      />
      <div className="relative w-full max-w-[400px] border border-border bg-white shadow-[0_24px_60px_-30px_rgba(18,18,18,0.45)]">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="mono text-b5 uppercase tracking-[0.2em] text-muted-foreground">
            Rebrand
          </span>
          <span className="pixel text-b4 text-muted-foreground">12.01.2026</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-6">
          <motion.span
            style={{ opacity: oldFade }}
            className="relative text-[24px] font-medium tracking-tight text-foreground"
          >
            LambdaTest
            <motion.span
              aria-hidden
              style={{ width: strike }}
              className="absolute left-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-foreground"
            />
          </motion.span>
          <ArrowRight size={16} className="flex-none text-muted-foreground" />
          <motion.img
            src="/testmu-logo-dark.svg"
            alt="TestMu AI"
            style={{ opacity: newIn, y: newLift }}
            className="h-[20px] w-auto"
          />
        </div>
        <ul className="border-t border-border px-5 py-3">
          {KEPT.map((k) => (
            <li key={k} className="flex items-center gap-2.5 py-1.5 text-b3 text-foreground">
              <Check size={13} className="text-[#1A7F37]" />
              {k}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Each word brightens as the paragraph scrolls through the viewport. */
function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1.6) / total;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Rebrand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const plateRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: plateProgress } = useScroll({
    target: plateRef,
    offset: ["start 0.9", "end 0.5"],
  });
  const words = rebrand.body.split(" ");

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div ref={plateRef}>
          <h2>
            LambdaTest is now TestMu AI
          </h2>
          <NameChange progress={plateProgress} />
        </div>

        <div
          ref={ref}
          className="text-[18px] leading-[1.6] tracking-tight text-foreground md:text-[24px]"
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
