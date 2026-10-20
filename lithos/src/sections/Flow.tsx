import { motion } from "motion/react";
import {
  Blocks,
  Bot,
  Check,
  ClipboardList,
  Cloud,
  Container,
  GitBranch,
  MessageSquare,
  Puzzle,
  Settings,
  Shield,
  Sparkles,
  SquareTerminal,
  Workflow,
  Zap,
} from "lucide-react";
import { platform } from "../lib/content";
import { Reveal, Section } from "../lib/ui";

/* The Figma workflow diagram, animated in place.
   No scroll choreography: everything plays once, on entering the viewport.
   Cards rise in left to right; each card's rows follow it in a stagger; the
   dashed elbow connectors fade up between neighbours and their dashes march
   toward the next stage forever after — the same trick the live site uses to
   feel alive without ever being in a half-state. */

const EASE = [0.16, 1, 0.3, 1] as const;

const HEAD_ICONS = {
  clipboard: ClipboardList,
  bot: Bot,
  zap: Zap,
  sparkles: Sparkles,
} as const;

/* the little capability glyphs under Kane CLI, as in the frame */
const CLI_GLYPHS = [Sparkles, Settings, Shield, SquareTerminal];

/* this lucide build ships no brand marks, so the chips carry tool glyphs */
const INTEGRATION_GLYPHS = [
  GitBranch,
  Workflow,
  MessageSquare,
  Blocks,
  Puzzle,
  Container,
  Cloud,
];

/* per-card entrance: the column rises, then its rows follow */
const card = (i: number) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-18% 0px -18% 0px" },
  transition: { duration: 0.7, delay: i * 0.14, ease: EASE },
});

const row = (cardIndex: number, rowIndex: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-18% 0px -18% 0px" },
  transition: {
    duration: 0.5,
    delay: cardIndex * 0.14 + 0.18 + rowIndex * 0.07,
    ease: EASE,
  },
});

/* Dashed elbow between two cards: out of the header, half the gap across,
   down through the body, then into the next card with an arrowhead. Drawn in
   a fixed 44x120 box that hangs in the grid gap. */
function Connector({ index }: { index: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-18% 0px -18% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.14 + 0.4, ease: EASE }}
      width="44"
      height="120"
      viewBox="0 0 44 120"
      aria-hidden
      className="absolute -right-[44px] top-6 z-10 hidden text-muted-foreground lg:block"
    >
      <path
        d="M0 14 H 22 V 106 H 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="conn-dash"
      />
      <path d="M34 101.5 L 42 106 L 34 110.5 Z" fill="currentColor" />
    </motion.svg>
  );
}

function CheckRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check size={13} strokeWidth={2.4} className="mt-[3px] shrink-0" />
      <span className="text-[13px] leading-snug text-foreground">{text}</span>
    </li>
  );
}

function Stage({
  stage,
  index,
  last,
}: {
  stage: (typeof platform.stages)[number];
  index: number;
  last: boolean;
}) {
  const Icon = HEAD_ICONS[stage.icon as keyof typeof HEAD_ICONS];
  let r = 0; /* running row counter so the stagger flows down the card */

  return (
    <motion.div
      {...card(index)}
      className="relative border border-border-muted bg-surface shadow-[0_22px_44px_-32px_hsl(var(--foreground)/0.3)]"
    >
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-border-muted px-5 py-4">
        <Icon size={16} strokeWidth={1.8} />
        <p className="mono text-[12px] font-medium uppercase tracking-[0.14em]">
          {stage.key}
        </p>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5">
        {stage.products.map((p) => (
          <motion.div
            key={p.name}
            {...row(index, r++)}
            className={
              "highlight" in p && p.highlight
                ? "-mx-2 bg-secondary/60 px-3 py-3"
                : ""
            }
          >
            <p className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-foreground">
              {p.name}
              {"badge" in p && p.badge && (
                <span className="mono bg-[#E7E6DF] px-[6px] py-px text-[10px] font-medium uppercase tracking-[0.08em] text-[#121212]">
                  {p.badge}
                </span>
              )}
            </p>
            {p.desc && (
              <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
                {p.desc}
              </p>
            )}
            {p.name === "Kane CLI" && (
              <div className="mt-2.5 flex items-center gap-2.5 text-muted-foreground">
                {CLI_GLYPHS.map((G, gi) => (
                  <G key={gi} size={13} strokeWidth={1.8} />
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {stage.checks.length > 0 && (
          <>
            <motion.div
              {...row(index, r++)}
              className="border-t border-dashed border-border"
            />
            <ul className="flex flex-col gap-2.5">
              {stage.checks.map((c) => (
                <motion.div key={c} {...row(index, r++)}>
                  <CheckRow text={c} />
                </motion.div>
              ))}
            </ul>
          </>
        )}
      </div>

      {!last && <Connector index={index} />}
    </motion.div>
  );
}

export default function Flow() {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">One platform,</span>
            <span className="block">every stage of testing</span>
          </h2>
          <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
            Most teams read this left to right — you don&rsquo;t have to. Test
            Manager can hand its cases straight to HyperExecute. Join at
            whichever step your team is on.
          </p>
        </div>
      </Reveal>

      {/* the four stages, connected */}
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-11 lg:px-6">
        {platform.stages.map((s, i) => (
          <Stage key={s.key} stage={s} index={i} last={i === 3} />
        ))}
      </div>

      {/* integrations + deployment, as in the frame */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:px-6">
        <Reveal delay={0.1}>
          <div className="flex h-full flex-wrap items-center gap-5 border border-border-muted bg-surface px-6 py-4">
            <p className="text-[14px] font-medium tracking-tight">
              {platform.integrations.label}
            </p>
            <div className="flex items-center gap-2">
              {INTEGRATION_GLYPHS.map((G, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.06,
                    ease: EASE,
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-surface"
                >
                  <G size={14} strokeWidth={1.8} />
                </motion.span>
              ))}
            </div>
            <p className="mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {platform.integrations.more}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex h-full flex-wrap items-center justify-between gap-4 border border-border-muted bg-surface px-6 py-4">
            <p className="text-[14px] font-medium tracking-tight">
              {platform.deployment.label}:
            </p>
            <p className="text-[13px] text-muted-foreground">
              {platform.deployment.options.join("  |  ")}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
