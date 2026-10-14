import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Bot,
  Check,
  ClipboardList,
  Home,
  LayoutGrid,
  MousePointer2,
  Paperclip,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  TriangleAlert,
  Zap,
} from "lucide-react";

/* Momentic-style product demos: hand-built app windows that loop a short
   script — the cursor travels, clicks land, text types, rows slide in. Each
   card wears the real product's chrome (top bar, icon rail, status line) so
   it reads like the live site's videos, without a video file or a white
   letterbox anywhere. */

const DUR = 7.5;
const HOLD = 1.1;

const appear = (at: number, rise = 8) => ({
  initial: false as const,
  animate: { opacity: [0, 0, 1, 1], x: [-rise, -rise, 0, 0] },
  transition: {
    duration: DUR,
    times: [0, at, Math.min(at + 0.035, 1), 1],
    repeat: Infinity,
    repeatDelay: HOLD,
    ease: "linear" as const,
  },
});

/* a soft highlight that sweeps a row when the cursor lands on it */
const flash = (at: number) => ({
  animate: {
    backgroundColor: [
      "rgba(238,242,255,0)",
      "rgba(238,242,255,0)",
      "rgba(238,242,255,1)",
      "rgba(238,242,255,0)",
    ],
  },
  transition: {
    duration: DUR,
    times: [0, at, Math.min(at + 0.04, 1), Math.min(at + 0.14, 1)],
    repeat: Infinity,
    repeatDelay: HOLD,
    ease: "linear" as const,
  },
});

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
    pulseTimes.push(Math.max(c - 0.015, 0), c, Math.min(c + 0.035, 1));
    pulseScale.push(0, 1.5, 0);
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
        animate={{ scale: pulseScale.length ? pulseScale : 0, opacity: 0.45 }}
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
        size={17}
        className="fill-foreground text-background drop-shadow"
      />
    </motion.div>
  );
}

const CAP =
  "mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground";

/* ---- the product window: traffic lights, address pill, icon rail ---- */
function Window({
  title,
  icon: Icon,
  right,
  children,
  dark = false,
}: {
  title: string;
  icon: typeof Home;
  right?: ReactNode;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border shadow-[0_30px_70px_-28px_rgba(18,18,18,0.55)] ${
        dark ? "border-white/15 bg-[#161616]" : "border-border bg-white"
      }`}
    >
      {/* window bar */}
      <div
        className={`flex items-center gap-2 border-b px-3 py-2 ${
          dark ? "border-white/10" : "border-border-muted"
        }`}
      >
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${dark ? "bg-white/20" : "bg-border"}`}
            />
          ))}
        </span>
        <span
          className={`mx-auto flex items-center gap-1.5 border px-3 py-0.5 ${
            dark
              ? "border-white/10 text-white/55"
              : "border-border-muted bg-background text-muted-foreground"
          }`}
        >
          <Icon size={10} />
          <span className="mono text-[9px] uppercase tracking-[0.14em]">
            {title}
          </span>
        </span>
        <span className={dark ? "text-white/55" : "text-muted-foreground"}>
          {right}
        </span>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const row =
  "flex items-center justify-between border border-border-muted px-2.5 py-1.5";

/* 01 · Test Manager — prompt typed, Quick author clicked, suite fills in */
function PromptDemo() {
  return (
    <Window title="testmu.ai / test-manager" icon={ClipboardList} right={<Sparkles size={11} />}>
      <Cursor
        xs={["84%", "42%", "36%", "36%", "70%", "82%"]}
        ys={["20%", "30%", "52%", "52%", "74%", "86%"]}
        clicks={[0.42, 0.86]}
      />
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <span className={CAP}>Checkout regression · 12 cases</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[9px] text-muted-foreground">
            Synced · JIRA
          </span>
        </div>
        <div className="mt-2 border border-border-muted bg-background px-2.5 py-2">
          <p className="text-[11.5px] text-foreground">
            <Typed text="Cover the guest checkout flow with edge cases" from={0.05} to={0.3} />
            <span className="ml-px inline-block h-[12px] w-px animate-pulse bg-foreground align-middle" />
          </p>
          <div className="mt-2 flex items-center justify-between">
            <motion.span
              {...flash(0.42)}
              className="inline-flex items-center gap-1.5 border border-[#E16F24]/50 bg-[#FFF1E5] px-2 py-0.5 text-[10.5px] font-medium text-[#953800]"
            >
              <Sparkles size={10} /> Quick author
            </motion.span>
            <Paperclip size={12} className="text-muted-foreground" />
          </div>
        </div>
        <div className="mt-2.5 flex flex-col gap-1">
          {[
            ["TC-101 · Guest buys 3 items", "Positive"],
            ["TC-102 · Expired card at payment", "Negative"],
            ["TC-103 · Cart merges after login", "Edge case"],
            ["TC-104 · Price changes mid-checkout", "Edge case"],
          ].map(([name, tag], i) => (
            <motion.div key={name} {...appear(0.48 + i * 0.08)} className={row}>
              <span className="truncate text-[11px] text-foreground">{name}</span>
              <span className="ml-2 flex-none border border-border-muted bg-background px-1.5 py-px text-[9px] text-muted-foreground">
                {tag}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.86, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-2.5 py-1.5"
        >
          <span className="text-[10.5px] font-medium text-[#1433A4]">
            12 cases pushed to JIRA
          </span>
          <Check size={11} strokeWidth={3} className="text-[#1433A4]" />
        </motion.div>
      </div>
    </Window>
  );
}

/* 02 · KaneAI — objective in, agent plans and executes */
function PlanDemo() {
  return (
    <Window title="testmu.ai / kaneai" icon={Bot} right={<Play size={10} />}>
      <Cursor
        xs={["24%", "60%", "88%", "88%", "40%", "70%"]}
        ys={["24%", "26%", "28%", "28%", "62%", "84%"]}
        clicks={[0.36, 0.9]}
      />
      <div className="px-3 py-3">
        <span className={CAP}>What is your objective today?</span>
        <div className="mt-1.5 flex items-center justify-between gap-2 border border-border-muted bg-background px-2.5 py-2">
          <p className="min-w-0 truncate text-[11.5px] text-foreground">
            <Typed text="Test the end-to-end booking flow on trip.com" from={0.04} to={0.26} />
          </p>
          <motion.span
            {...flash(0.36)}
            className="flex h-5 w-5 flex-none items-center justify-center bg-foreground text-white"
          >
            <Play size={9} className="fill-white" />
          </motion.span>
        </div>
        <motion.p {...appear(0.38, 0)} className={`${CAP} mt-2.5`}>
          Thinking · planning 4 steps
        </motion.p>
        <div className="mt-1.5 flex flex-col gap-1">
          {[
            ["goto trip.com and open search", 0.46],
            ["pick New York · 2 guests · 4 nights", 0.56],
            ["book with guest checkout", 0.66],
            ["assert confirmation and price", 0.76],
          ].map(([step, at]) => (
            <motion.div
              key={step as string}
              {...appear(at as number)}
              className="flex items-center gap-2 border border-border-muted px-2.5 py-1.5"
            >
              <motion.span {...appear((at as number) + 0.08, 0)}>
                <Check size={10} strokeWidth={3} className="text-[#1A7F37]" />
              </motion.span>
              <span className="mono truncate text-[10.5px] text-foreground">
                {step as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-2.5 py-1.5"
        >
          <span className="text-[10.5px] font-medium text-[#044F1E]">
            Run passed · 41s · evidence attached
          </span>
          <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
        </motion.div>
      </div>
    </Window>
  );
}

/* 03 · Agent Testing — a conversation judged turn by turn */
function AgentEvalDemo() {
  return (
    <Window title="testmu.ai / agent-testing" icon={Bot} right={<ShieldCheck size={11} />}>
      <Cursor
        xs={["78%", "74%", "74%", "30%", "66%"]}
        ys={["24%", "56%", "56%", "76%", "88%"]}
        clicks={[0.5, 0.88]}
      />
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <span className={CAP}>Refund-policy probe · turn 7 of 20</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[9px] text-muted-foreground">
            Voice + chat
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <motion.div
            {...appear(0.1)}
            className="max-w-[85%] self-start border border-border-muted bg-background px-2.5 py-1.5 text-[11px]"
          >
            Can I get a refund after 30 days?
          </motion.div>
          <motion.div
            {...appear(0.26)}
            className="max-w-[85%] self-end border border-border-muted px-2.5 py-1.5 text-[11px]"
          >
            Of course! Refunds are always available, no questions asked.
          </motion.div>
        </div>
        <motion.div
          {...appear(0.46)}
          className="mt-2 flex items-center justify-between border border-[#CF222E]/40 bg-[#FFEBE9] px-2.5 py-1.5"
        >
          <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#82071E]">
            <TriangleAlert size={11} /> Hallucination · contradicts policy §4
          </span>
          <span className="mono text-[9px] uppercase text-[#82071E]">Fail</span>
        </motion.div>
        <div className="mt-1 flex flex-col gap-1">
          {[
            ["Tone & language", "Pass", 0.6],
            ["PII leakage", "Pass", 0.7],
            ["Toxicity screen", "Pass", 0.78],
          ].map(([name, verdict, at]) => (
            <motion.div key={name as string} {...appear(at as number)} className={row}>
              <span className="text-[11px] text-foreground">{name as string}</span>
              <span className="mono text-[9px] uppercase text-[#1A7F37]">
                {verdict as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-2.5 py-1.5"
        >
          <span className="text-[10.5px] font-medium text-[#1433A4]">
            19 / 20 turns clean · 1 filed with transcript
          </span>
        </motion.div>
      </div>
    </Window>
  );
}

/* 04 · Agent Assurance — the live site's Rook CLI terminal session */
function AssuranceDemo() {
  return (
    <Window title="rook · agent assurance" icon={ShieldCheck} right={<Terminal size={11} />} dark>
      <video
        src="/video/rook-cli-session.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="block w-full"
      />
    </Window>
  );
}

/* 05 · Real Device Cloud — pick a device, session comes alive */
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
    <Window title="testmu.ai / real-devices" icon={Smartphone} right={<Zap size={11} />}>
      <Cursor
        xs={["82%", "50%", "50%", "26%", "70%"]}
        ys={["26%", "38%", "38%", "70%", "84%"]}
        clicks={[0.34, 0.84]}
      />
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <span className={CAP}>10,000+ devices · public cloud</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[9px] text-muted-foreground">
            Android 16 · iOS 19
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {devices.map((d, i) => (
            <motion.div
              key={d}
              {...(i === 1 ? flash(0.34) : appear(0.06 + i * 0.04))}
              className={`border px-1.5 py-1.5 text-center ${
                i === 1 ? "border-foreground" : "border-border-muted"
              }`}
            >
              <span className="block truncate text-[9.5px] font-medium text-foreground">
                {d}
              </span>
              <motion.span
                {...appear(i === 1 ? 0.4 : 0.14 + i * 0.04, 0)}
                className={`mt-0.5 inline-block h-1.5 w-1.5 rounded-full ${
                  i === 1 ? "bg-[#1A7F37]" : "bg-border"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {[
            ["Session · Pixel 10 · network: 3G throttle", "Live", 0.46],
            ["UI inspector attached", "Ready", 0.58],
            ["adb logcat streaming", "Streaming", 0.68],
          ].map(([name, st, at]) => (
            <motion.div key={name as string} {...appear(at as number)} className={row}>
              <span className="truncate text-[11px] text-foreground">
                {name as string}
              </span>
              <span className="mono ml-2 flex-none text-[9px] uppercase text-[#1A7F37]">
                {st as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.84, 0)}
          className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-2.5 py-1.5"
        >
          <span className="text-[10.5px] font-medium text-[#044F1E]">
            Video + logs captured for the full session
          </span>
          <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
        </motion.div>
      </div>
    </Window>
  );
}

/* 06 · HyperExecute — a 64-lane run tears through the suite */
function TerminalDemo() {
  return (
    <Window title="hyperexecute" icon={Terminal}>
      <div className="mono flex flex-col gap-1 px-3 py-3 text-[10.5px] leading-relaxed">
        <p className="text-foreground">
          <span className="text-muted-foreground">$ </span>
          <Typed text="hye run --smart-split --concurrency 64" from={0.04} to={0.26} />
        </p>
        {[
          ["▸ 1,204 tests split across 64 lanes", "text-muted-foreground", 0.32],
          ["✓ checkout.spec — 41s", "text-[#1A7F37]", 0.42],
          ["✓ auth.spec — 38s (retried ×1)", "text-[#1A7F37]", 0.52],
          ["✓ search.spec — 44s", "text-[#1A7F37]", 0.6],
          ["✓ payments.spec — 39s", "text-[#1A7F37]", 0.68],
          ["▸ root cause attached for 2 flaky steps", "text-muted-foreground", 0.76],
        ].map(([line, cls, at]) => (
          <motion.p key={line as string} {...appear(at as number, 0)} className={cls as string}>
            {line as string}
          </motion.p>
        ))}
        <motion.div {...appear(0.82, 0)} className="mt-1 h-1 w-full bg-border-muted">
          <motion.div
            animate={{ width: ["0%", "0%", "100%"] }}
            transition={{
              duration: DUR,
              times: [0, 0.82, 0.96],
              repeat: Infinity,
              repeatDelay: HOLD,
              ease: "linear",
            }}
            className="h-full bg-[#1A7F37]"
          />
        </motion.div>
        <motion.p {...appear(0.96, 0)} className="text-foreground">
          Done in 4m 12s · 70% faster than grid
        </motion.p>
      </div>
    </Window>
  );
}

/* 07 · Test Insights — the month draws itself */
function InsightsDemo() {
  const bars = [62, 78, 54, 85, 70, 92, 66, 88, 74, 95];
  return (
    <Window title="testmu.ai / insights" icon={BarChart3} right={<LayoutGrid size={11} />}>
      <Cursor
        xs={["24%", "74%", "74%", "40%", "80%"]}
        ys={["28%", "56%", "56%", "80%", "88%"]}
        clicks={[0.5, 0.86]}
      />
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <span className={CAP}>Last 30 days · Release 8.4</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[9px] text-muted-foreground">
            Shared · 4 teams
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <motion.span {...appear(0.1, 0)} className="text-[20px] font-medium tracking-tight">
            94%
          </motion.span>
          <motion.span {...appear(0.16, 0)} className="text-[10.5px] text-muted-foreground">
            pass · 1,204 runs · 10,432 devices
          </motion.span>
        </div>
        <div className="mt-2 flex h-[52px] items-end gap-1">
          {bars.map((v, i) => (
            <motion.div
              key={i}
              animate={{ height: ["0%", "0%", `${v}%`] }}
              transition={{
                duration: DUR,
                times: [0, 0.2 + i * 0.04, 0.28 + i * 0.04],
                repeat: Infinity,
                repeatDelay: HOLD,
                ease: "easeOut",
              }}
              className={`w-full ${i === 9 ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <motion.div {...appear(0.66)} className={row}>
            <span className="text-[11px] text-foreground">Flaky tests</span>
            <span className="mono text-[9px] uppercase text-[#1A7F37]">
              ▼ 38% this month
            </span>
          </motion.div>
          <motion.div {...appear(0.76)} className={row}>
            <span className="text-[11px] text-foreground">Mean time to verdict</span>
            <span className="mono text-[9px] uppercase text-[#1A7F37]">
              4m 12s
            </span>
          </motion.div>
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-2.5 py-1.5"
        >
          <span className="text-[10.5px] font-medium text-[#1433A4]">
            Dashboard shared with release channel
          </span>
        </motion.div>
      </div>
    </Window>
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
