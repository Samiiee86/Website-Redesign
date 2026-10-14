import { motion } from "motion/react";
import {
  Check,
  MousePointer2,
  Paperclip,
  Play,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

/* Momentic-style product demos: small hand-built UI cards that loop a simple
   script — the cursor moves, clicks, text types, rows appear. No video files,
   no white letterboxing: each card is real HTML floating on the scenery, so
   the "recording" is crisp at any size and weighs nothing. */

/* Every demo shares one clock. An element's life is written as fractions of
   that clock: hidden until `at`, then visible to the end of the loop. */
const DUR = 9;
const HOLD = 1.4;

const appear = (at: number, rise = 6) => ({
  initial: false as const,
  animate: { opacity: [0, 0, 1, 1], y: [rise, rise, 0, 0] },
  transition: {
    duration: DUR,
    times: [0, at, Math.min(at + 0.04, 1), 1],
    repeat: Infinity,
    repeatDelay: HOLD,
    ease: "linear" as const,
  },
});

/* text that types itself: a clipped span widening between two beats */
function Typed({
  text,
  from,
  to,
  className = "",
}: {
  text: string;
  from: number;
  to: number;
  className?: string;
}) {
  return (
    <motion.span
      animate={{ width: ["0%", "0%", "100%", "100%"] }}
      transition={{
        duration: DUR,
        times: [0, from, to, 1],
        repeat: Infinity,
        repeatDelay: HOLD,
        ease: "linear",
      }}
      className={`inline-block overflow-hidden whitespace-nowrap align-bottom ${className}`}
    >
      {text}
    </motion.span>
  );
}

/* the travelling cursor: waypoints in % of the card, clicks pulse a ring */
function Cursor({
  xs,
  ys,
  clicks,
}: {
  xs: string[];
  ys: string[];
  clicks: number[];
}) {
  const times = xs.map((_, i) => i / (xs.length - 1));
  const pulseTimes: number[] = [];
  const pulseScale: number[] = [];
  for (const c of clicks) {
    pulseTimes.push(Math.max(c - 0.015, 0), c, Math.min(c + 0.03, 1));
    pulseScale.push(0, 1.6, 0);
  }
  return (
    <motion.div
      animate={{ left: xs, top: ys }}
      transition={{
        duration: DUR,
        times,
        repeat: Infinity,
        repeatDelay: HOLD,
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute z-20"
      aria-hidden
    >
      <motion.span
        animate={{ scale: pulseScale.length ? pulseScale : 0, opacity: 0.5 }}
        transition={{
          duration: DUR,
          times: pulseTimes.length ? pulseTimes : [0],
          repeat: Infinity,
          repeatDelay: HOLD,
          ease: "linear",
        }}
        className="absolute -left-2 -top-2 h-7 w-7 rounded-full border-2 border-foreground"
      />
      <MousePointer2
        size={18}
        className="fill-foreground text-background drop-shadow"
      />
    </motion.div>
  );
}

const CAP = "mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground";
const card =
  "relative w-full border border-border bg-white shadow-[0_30px_70px_-28px_rgba(18,18,18,0.5)]";

/* 01 · Test Manager — a prompt is typed, Quick author clicked, cases appear */
function PromptDemo() {
  return (
    <div className={card}>
      <Cursor
        xs={["82%", "40%", "34%", "34%", "80%"]}
        ys={["18%", "30%", "56%", "56%", "80%"]}
        clicks={[0.5]}
      />
      <div className="border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>Test Manager</span>
      </div>
      <div className="px-4 py-3.5">
        <div className="border border-border-muted bg-background px-3 py-2.5">
          <p className="text-[12px] text-foreground">
            <Typed text="Cover the guest checkout flow with edge cases" from={0.06} to={0.32} />
            <span className="ml-px inline-block h-[13px] w-px animate-pulse bg-foreground align-middle" />
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 border border-[#E16F24]/50 bg-[#FFF1E5] px-2.5 py-1 text-[11px] font-medium text-[#953800]">
              <Sparkles size={11} /> Quick author
            </span>
            <Paperclip size={13} className="text-muted-foreground" />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {[
            ["Guest buys 3 items", "Positive"],
            ["Expired card at payment", "Negative"],
            ["Cart merges after login", "Edge case"],
          ].map(([name, tag], i) => (
            <motion.div
              key={name}
              {...appear(0.56 + i * 0.09)}
              className="flex items-center justify-between border border-border-muted px-3 py-1.5"
            >
              <span className="text-[11.5px] text-foreground">{name}</span>
              <span className="border border-border-muted bg-background px-1.5 py-px text-[9.5px] text-muted-foreground">
                {tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 02 · KaneAI — an objective goes in, the agent plans steps */
function PlanDemo() {
  return (
    <div className={card}>
      <Cursor
        xs={["20%", "55%", "86%", "86%", "30%"]}
        ys={["28%", "30%", "33%", "33%", "78%"]}
        clicks={[0.44]}
      />
      <div className="flex items-center justify-between border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>KaneAI</span>
        <span className={CAP}>What is your objective today?</span>
      </div>
      <div className="px-4 py-3.5">
        <div className="flex items-center justify-between gap-3 border border-border-muted bg-background px-3 py-2.5">
          <p className="min-w-0 truncate text-[12px] text-foreground">
            <Typed text="Test the end-to-end booking flow on trip.com" from={0.05} to={0.3} />
          </p>
          <span className="flex h-6 w-6 flex-none items-center justify-center bg-foreground text-white">
            <Play size={10} className="fill-white" />
          </span>
        </div>
        <motion.p {...appear(0.46, 0)} className={`${CAP} mt-3`}>
          Planning…
        </motion.p>
        <div className="mt-1.5 flex flex-col gap-1.5">
          {[
            "goto trip.com and open search",
            "pick New York · 2 guests · 4 nights",
            "book with guest checkout",
            "assert confirmation and price",
          ].map((step, i) => (
            <motion.div
              key={step}
              {...appear(0.52 + i * 0.1)}
              className="flex items-center gap-2.5 border border-border-muted px-3 py-1.5"
            >
              <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
              <span className="mono text-[11px] text-foreground">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 03 · Agent Testing — a chatbot reply is judged live */
function AgentEvalDemo() {
  return (
    <div className={card}>
      <Cursor
        xs={["80%", "76%", "76%", "26%"]}
        ys={["20%", "62%", "62%", "84%"]}
        clicks={[0.55]}
      />
      <div className="border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>Agent Testing · voice & chat</span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-3.5">
        <motion.div {...appear(0.08)} className="max-w-[80%] self-start border border-border-muted bg-background px-3 py-2 text-[11.5px]">
          Can I get a refund after 30 days?
        </motion.div>
        <motion.div {...appear(0.26)} className="max-w-[80%] self-end border border-border-muted px-3 py-2 text-[11.5px]">
          Of course! Refunds are always available, no questions asked.
        </motion.div>
        <motion.div
          {...appear(0.5)}
          className="mt-1 flex items-center justify-between border border-[#CF222E]/40 bg-[#FFEBE9] px-3 py-2"
        >
          <span className="flex items-center gap-2 text-[11px] font-medium text-[#82071E]">
            <TriangleAlert size={12} /> Contradicts refund policy §4
          </span>
          <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-[#82071E]">
            Fail
          </span>
        </motion.div>
        <motion.div
          {...appear(0.68)}
          className="flex items-center justify-between border border-border-muted px-3 py-2"
        >
          <span className="text-[11px] text-foreground">Tone & language check</span>
          <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-[#1A7F37]">
            Pass
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* 04 · Agent Assurance — criteria graded on evidence, blind spot published */
function AssuranceDemo() {
  return (
    <div className={card}>
      <Cursor
        xs={["24%", "24%", "78%", "78%"]}
        ys={["30%", "52%", "74%", "74%"]}
        clicks={[0.72]}
      />
      <div className="flex items-center justify-between border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>Agent Assurance</span>
        <span className="mono text-[9.5px] text-muted-foreground">
          $ rook run
        </span>
      </div>
      <div className="px-4 py-3.5">
        <div className="flex flex-col gap-1.5">
          {[
            ["Order created via API", "Verified", "#1A7F37"],
            ["Invoice file written", "Verified", "#1A7F37"],
            ["Prompt injection resisted", "Verified", "#1A7F37"],
            ["Email send claimed", "Unverifiable", "#953800"],
          ].map(([name, verdict, color], i) => (
            <motion.div
              key={name}
              {...appear(0.12 + i * 0.13)}
              className="flex items-center justify-between border border-border-muted px-3 py-1.5"
            >
              <span className="text-[11.5px] text-foreground">{name}</span>
              <span
                className="mono text-[9.5px] uppercase tracking-[0.1em]"
                style={{ color }}
              >
                {verdict}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.72)}
          className="mt-2.5 flex items-center gap-2 border border-border-muted bg-background px-3 py-2"
        >
          <ShieldCheck size={13} className="text-foreground" />
          <span className="text-[11px] text-foreground">
            3 verified · 1 published as blind spot — never a quiet pass
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* 05 · Real Device Cloud — a device is picked, session starts */
function DevicesDemo() {
  const devices = [
    "iPhone 17 Pro",
    "Pixel 10",
    "Galaxy S26",
    "iPad Air",
    "iPhone SE",
    "OnePlus 13",
  ];
  return (
    <div className={card}>
      <Cursor
        xs={["80%", "52%", "52%", "80%"]}
        ys={["22%", "42%", "42%", "82%"]}
        clicks={[0.4]}
      />
      <div className="border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>Real Device Cloud · 10,000+ devices</span>
      </div>
      <div className="px-4 py-3.5">
        <div className="grid grid-cols-3 gap-1.5">
          {devices.map((d, i) => (
            <motion.div
              key={d}
              {...appear(0.08 + i * 0.05)}
              className={`border px-2 py-2 text-center ${
                i === 1
                  ? "border-foreground bg-background"
                  : "border-border-muted"
              }`}
            >
              <span className="block text-[10px] font-medium text-foreground">
                {d}
              </span>
              <motion.span
                {...appear(i === 1 ? 0.46 : 0.2 + i * 0.05, 0)}
                className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${
                  i === 1 ? "bg-[#1A7F37]" : "bg-border"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.52)}
          className="mt-2.5 flex items-center justify-between border border-border-muted px-3 py-2"
        >
          <span className="text-[11px] text-foreground">
            Live session · Pixel 10 · Android 16
          </span>
          <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-[#1A7F37]">
            Connected
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* 06 · HyperExecute — the terminal run */
function TerminalDemo() {
  return (
    <div className={`${card} bg-[#121212]`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="mono ml-2 text-[9.5px] uppercase tracking-[0.18em] text-white/50">
          HyperExecute
        </span>
      </div>
      <div className="mono flex flex-col gap-1.5 px-4 py-3.5 text-[11px] leading-relaxed">
        <p className="text-white/80">
          <span className="text-white/40">$ </span>
          <Typed text="hye run --smart-split --concurrency 64" from={0.05} to={0.3} />
        </p>
        {[
          ["▸ 1,204 tests split across 64 lanes", "text-white/60", 0.36],
          ["✓ checkout.spec — 41s", "text-[#6FDD8B]", 0.48],
          ["✓ auth.spec — 38s (retried ×1)", "text-[#6FDD8B]", 0.6],
          ["✓ search.spec — 44s", "text-[#6FDD8B]", 0.72],
        ].map(([line, cls, at]) => (
          <motion.p key={line as string} {...appear(at as number, 0)} className={cls as string}>
            {line as string}
          </motion.p>
        ))}
        <motion.div {...appear(0.82, 0)} className="mt-1 h-1 w-full bg-white/10">
          <motion.div
            animate={{ width: ["0%", "0%", "100%"] }}
            transition={{
              duration: DUR,
              times: [0, 0.82, 0.97],
              repeat: Infinity,
              repeatDelay: HOLD,
              ease: "linear",
            }}
            className="h-full bg-[#6FDD8B]"
          />
        </motion.div>
      </div>
    </div>
  );
}

/* 07 · Test Insights — the month's numbers draw themselves */
function InsightsDemo() {
  const bars = [62, 78, 54, 85, 70, 92, 66, 88, 74, 95];
  return (
    <div className={card}>
      <Cursor
        xs={["20%", "72%", "72%", "40%"]}
        ys={["24%", "58%", "58%", "84%"]}
        clicks={[0.52]}
      />
      <div className="flex items-center justify-between border-b border-border-muted px-4 py-2.5">
        <span className={CAP}>Test Insights · last 30 days</span>
        <span className="mono text-[9.5px] text-muted-foreground">Release 8.4</span>
      </div>
      <div className="px-4 py-3.5">
        <div className="flex items-baseline gap-2">
          <motion.span {...appear(0.1, 0)} className="text-[22px] font-medium tracking-tight">
            94%
          </motion.span>
          <motion.span {...appear(0.18, 0)} className="text-[11px] text-muted-foreground">
            pass · 1,204 runs
          </motion.span>
        </div>
        <div className="mt-3 flex h-[64px] items-end gap-1.5">
          {bars.map((v, i) => (
            <motion.div
              key={i}
              animate={{ height: ["0%", "0%", `${v}%`] }}
              transition={{
                duration: DUR,
                times: [0, 0.22 + i * 0.045, 0.3 + i * 0.045],
                repeat: Infinity,
                repeatDelay: HOLD,
                ease: "easeOut",
              }}
              className={`w-full ${i === 9 ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>
        <motion.div
          {...appear(0.78)}
          className="mt-2.5 flex items-center justify-between border border-border-muted px-3 py-1.5"
        >
          <span className="text-[11px] text-foreground">Flaky tests</span>
          <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-[#1A7F37]">
            ▼ 38% this month
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export const DEMOS = {
  prompt: PromptDemo,
  plan: PlanDemo,
  agentEval: AgentEvalDemo,
  assurance: AssuranceDemo,
  devices: DevicesDemo,
  terminal: TerminalDemo,
  insights: InsightsDemo,
} as const;

export type DemoKey = keyof typeof DEMOS;
