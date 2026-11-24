import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Check, Quote } from "lucide-react";
import { rebrand } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Section } from "../lib/ui";

const KEPT = ["Same login", "Same products", "New AI agents"];

/* The name change, told as a picture: a window on a painted plate where
   the old name is struck through and the new mark comes up as you scroll. */
function NameChange({ progress }: { progress: MotionValue<number> }) {
  const strike = useTransform(progress, [0.05, 0.35], ["0%", "100%"]);
  const oldFade = useTransform(progress, [0.2, 0.45], [1, 0.4]);
  const newIn = useTransform(progress, [0.3, 0.55], [0.15, 1]);
  const newLift = useTransform(progress, [0.3, 0.55], [10, 0]);
  return (
    <div className="relative mt-8 flex h-[200px] items-center justify-center overflow-hidden border border-border px-5">
      <img
        src={scenery.chalkcliff}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
        loading="lazy"
      />
      <div className="relative w-full min-w-0 max-w-[400px] border border-border bg-white shadow-[0_24px_60px_-30px_rgba(18,18,18,0.45)]">
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
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
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-border px-4 py-2.5 sm:justify-between sm:px-5">
          {KEPT.map((k) => (
            <li key={k} className="flex items-center gap-1.5 whitespace-nowrap text-b4 text-foreground">
              <Check size={12} className="text-[#1A7F37]" />
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

/* The video version, as on the live product pages (testmuai.com): the
   note and the CEO's line in a white box beside the rebrand film, as two
   joined boxes. Pages opt in with variant="video"; the home keeps the
   scroll version above. */
const FILM = "https://assets.testmuai.com/resources/videos/LambdaTest-TestMuAI.mp4";

function RebrandVideo() {
  const video = useRef<HTMLVideoElement>(null);
  /* play only while it is on screen */
  useEffect(() => {
    const v = video.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const linkCls =
    "tm-link self-start";
  return (
    <Section>
      <div className="tm-reveal -mx-8">
        <div className="tm-grid tm-grid--2">
          <div className="tm-cell flex flex-col justify-between gap-12 lg:!p-12">
            <div className="flex flex-col gap-4">
              <h3 className="[text-wrap:balance]">LambdaTest is now TestMu AI</h3>
              <p className="text-b1 text-muted-foreground">
                On January 12, 2026, LambdaTest became TestMu AI, the same trusted testing cloud, rebuilt for the AI era.
              </p>
              <p className="text-b1 text-muted-foreground">
                It is now a full-stack agentic AI quality engineering cloud that automates end-to-end testing across web,
                mobile, and AI apps. The platform is AI-native, with autonomous agents that plan, author, run, analyze, and
                optimize your tests.
              </p>
              <a className={`${linkCls} mt-2`} href="https://www.testmuai.com/">
                Visit LambdaTest’s new home
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
            <figure className="flex flex-col gap-6">
              <blockquote className="flex gap-3 text-b1 text-foreground">
                <Quote size={20} strokeWidth={1.5} className="mt-1 flex-none text-muted-foreground" aria-hidden />
                The next era of the world’s first fully Autonomous Agentic AI Quality Engineering Platform is here.
              </blockquote>
              <figcaption className="flex items-center gap-6">
                <img src="/testmu-logo-dark.svg" alt="TestMu AI" className="h-5 w-auto" />
                <span className="flex flex-col">
                  <span className="text-b3 font-medium text-foreground">Asad Khan</span>
                  <span className="text-b4 text-muted-foreground">Co-Founder &amp; CEO</span>
                </span>
              </figcaption>
              <a className={linkCls} href="https://www.testmuai.com/lambdatest-is-now-testmuai/">
                LambdaTest’s next chapter
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
              </a>
            </figure>
          </div>
          <div className="tm-cell relative min-h-[320px] overflow-hidden !p-0 lg:min-h-[530px]">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full bg-[var(--tm-bg-inverse)] object-cover"
              muted
              loop
              playsInline
              preload="none"
              aria-label="LambdaTest is now TestMu AI"
            >
              <source src={FILM} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Rebrand({ variant = "scroll" }: { variant?: "scroll" | "video" }) {
  if (variant === "video") return <RebrandVideo />;
  return <RebrandScroll />;
}

function RebrandScroll() {
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
