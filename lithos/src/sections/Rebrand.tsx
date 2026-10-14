import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { rebrand } from "../lib/content";
import { Section } from "../lib/ui";

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
  const words = rebrand.body.split(" ");

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="text-[34px] leading-[1.14] tracking-tight md:text-[42px]">
            LambdaTest is now TestMu AI
          </h2>
        </div>

        <div
          ref={ref}
          className="text-[19px] leading-[1.6] tracking-tight text-foreground md:text-[22px]"
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
