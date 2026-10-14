import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  "mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground";

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
          <span className="mono text-[10.5px] uppercase tracking-[0.14em]">
            {title}
          </span>
        </span>
        <span className={dark ? "text-white/55" : "text-muted-foreground"}>
          {right}
        </span>
      </div>
      <div className="flex min-h-[400px] min-w-0 flex-col justify-center">{children}</div>
    </div>
  );
}

const row =
  "flex items-center justify-between border border-border-muted px-3.5 py-2.5";

/* 01 · Test Manager — prompt typed, Quick author clicked, suite fills in */
function PromptDemo() {
  return (
    <Window title="testmu.ai / test-manager" icon={ClipboardList} right={<Sparkles size={11} />}>
      <Cursor
        xs={["84%", "42%", "36%", "36%", "70%", "82%"]}
        ys={["20%", "30%", "52%", "52%", "74%", "86%"]}
        clicks={[0.42, 0.86]}
      />
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className={CAP}>Checkout regression · 12 cases</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[10.5px] text-muted-foreground">
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
              className="inline-flex items-center gap-1.5 border border-[#E16F24]/50 bg-[#FFF1E5] px-2 py-0.5 text-[12px] font-medium text-[#953800]"
            >
              <Sparkles size={10} /> Quick author
            </motion.span>
            <Paperclip size={12} className="text-muted-foreground" />
          </div>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {[
            ["TC-101 · Guest buys 3 items", "Positive"],
            ["TC-102 · Expired card at payment", "Negative"],
            ["TC-103 · Cart merges after login", "Edge case"],
            ["TC-104 · Price changes mid-checkout", "Edge case"],
          ].map(([name, tag], i) => (
            <motion.div key={name} {...appear(0.48 + i * 0.08)} className={row}>
              <span className="truncate text-[12.5px] text-foreground">{name}</span>
              <span className="ml-2 flex-none border border-border-muted bg-background px-1.5 py-px text-[10.5px] text-muted-foreground">
                {tag}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.86, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-3.5 py-2"
        >
          <span className="text-[12px] font-medium text-[#1433A4]">
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
      <div className="px-5 py-4">
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
        <div className="mt-1.5 flex flex-col gap-1.5">
          {[
            ["goto trip.com and open search", 0.46],
            ["pick New York · 2 guests · 4 nights", 0.56],
            ["book with guest checkout", 0.66],
            ["assert confirmation and price", 0.76],
          ].map(([step, at]) => (
            <motion.div
              key={step as string}
              {...appear(at as number)}
              className="flex items-center gap-2 border border-border-muted px-3.5 py-2"
            >
              <motion.span {...appear((at as number) + 0.08, 0)}>
                <Check size={10} strokeWidth={3} className="text-[#1A7F37]" />
              </motion.span>
              <span className="mono truncate text-[12px] text-foreground">
                {step as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-3.5 py-2"
        >
          <span className="text-[12px] font-medium text-[#044F1E]">
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
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className={CAP}>Refund-policy probe · turn 7 of 20</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[10.5px] text-muted-foreground">
            Voice + chat
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <motion.div
            {...appear(0.1)}
            className="max-w-[85%] self-start border border-border-muted bg-background px-3.5 py-2 text-[12.5px]"
          >
            Can I get a refund after 30 days?
          </motion.div>
          <motion.div
            {...appear(0.26)}
            className="max-w-[85%] self-end border border-border-muted px-3.5 py-2 text-[12.5px]"
          >
            Of course! Refunds are always available, no questions asked.
          </motion.div>
        </div>
        <motion.div
          {...appear(0.46)}
          className="mt-2 flex items-center justify-between border border-[#CF222E]/40 bg-[#FFEBE9] px-3.5 py-2"
        >
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#82071E]">
            <TriangleAlert size={11} /> Hallucination · contradicts policy §4
          </span>
          <span className="mono text-[10.5px] uppercase text-[#82071E]">Fail</span>
        </motion.div>
        <div className="mt-1 flex flex-col gap-1.5">
          {[
            ["Tone & language", "Pass", 0.6],
            ["PII leakage", "Pass", 0.7],
            ["Toxicity screen", "Pass", 0.78],
          ].map(([name, verdict, at]) => (
            <motion.div key={name as string} {...appear(at as number)} className={row}>
              <span className="text-[12.5px] text-foreground">{name as string}</span>
              <span className="mono text-[10.5px] uppercase text-[#1A7F37]">
                {verdict as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-3.5 py-2"
        >
          <span className="text-[12px] font-medium text-[#1433A4]">
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
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className={CAP}>10,000+ devices · public cloud</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[10.5px] text-muted-foreground">
            Android 16 · iOS 19
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {devices.map((d, i) => (
            <motion.div
              key={d}
              {...(i === 1 ? flash(0.34) : appear(0.06 + i * 0.04))}
              className={`border px-1.5 py-1.5 text-center ${
                i === 1 ? "border-foreground" : "border-border-muted"
              }`}
            >
              <span className="block truncate text-[11px] font-medium text-foreground">
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
        <div className="mt-2 flex flex-col gap-1.5">
          {[
            ["Session · Pixel 10 · network: 3G throttle", "Live", 0.46],
            ["UI inspector attached", "Ready", 0.58],
            ["adb logcat streaming", "Streaming", 0.68],
          ].map(([name, st, at]) => (
            <motion.div key={name as string} {...appear(at as number)} className={row}>
              <span className="truncate text-[12.5px] text-foreground">
                {name as string}
              </span>
              <span className="mono ml-2 flex-none text-[10.5px] uppercase text-[#1A7F37]">
                {st as string}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...appear(0.84, 0)}
          className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-3.5 py-2"
        >
          <span className="text-[12px] font-medium text-[#044F1E]">
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
      <div className="mono flex flex-col gap-1.5 px-5 py-4 text-[12px] leading-relaxed">
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
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className={CAP}>Last 30 days · Release 8.4</span>
          <span className="border border-border-muted bg-background px-1.5 py-px text-[10.5px] text-muted-foreground">
            Shared · 4 teams
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <motion.span {...appear(0.1, 0)} className="text-[26px] font-medium tracking-tight">
            94%
          </motion.span>
          <motion.span {...appear(0.16, 0)} className="text-[12px] text-muted-foreground">
            pass · 1,204 runs · 10,432 devices
          </motion.span>
        </div>
        <div className="mt-2 flex h-[52px] items-end gap-1.5">
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
        <div className="mt-2 flex flex-col gap-1.5">
          <motion.div {...appear(0.66)} className={row}>
            <span className="text-[12.5px] text-foreground">Flaky tests</span>
            <span className="mono text-[10.5px] uppercase text-[#1A7F37]">
              ▼ 38% this month
            </span>
          </motion.div>
          <motion.div {...appear(0.76)} className={row}>
            <span className="text-[12.5px] text-foreground">Mean time to verdict</span>
            <span className="mono text-[10.5px] uppercase text-[#1A7F37]">
              4m 12s
            </span>
          </motion.div>
        </div>
        <motion.div
          {...appear(0.88, 0)}
          className="mt-2 flex items-center justify-between bg-[#EEF2FF] px-3.5 py-2"
        >
          <span className="text-[12px] font-medium text-[#1433A4]">
            Dashboard shared with release channel
          </span>
        </motion.div>
      </div>
    </Window>
  );
}


/* 00 · Hero — the live site's hero video (TestmuAi.webm), rebuilt as a
   script inside one fixed white frame: four chapters loop — Planning,
   Authoring, Executing, Analysing — no video file, no backdrop of its own. */
const HERO_CHAPTERS = ["Planning", "Authoring", "Executing", "Analysing"];
const CHAPTER_MS = 5600;

const hAppear = (at: number, rise = 8) => ({
  initial: { opacity: 0, y: rise },
  animate: { opacity: 1, y: 0 },
  transition: { delay: at, duration: 0.38, ease: "easeOut" as const },
});

function HeroTyped({ text, from, dur }: { text: string; from: number; dur: number }) {
  return (
    <span className="relative inline-block overflow-hidden whitespace-nowrap align-bottom">
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: from, duration: dur, ease: "linear" }}
        className="inline-block overflow-hidden whitespace-nowrap"
      >
        {text}
      </motion.span>
    </span>
  );
}

function HeroPlanning() {
  /* two beats: the chat box settles first and gets typed into, then the
     screen advances to the generated test cases */
  const [screen, setScreen] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setScreen(1), 3050);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {screen === 0 ? (
        <motion.div
          key="chat"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex h-full flex-col items-center justify-center pb-6"
        >
          <motion.p {...hAppear(0.15, 0)} className={CAP}>
            What is your objective today?
          </motion.p>
          <motion.div
            {...hAppear(0.3)}
            className="mono mt-3 flex w-full max-w-[480px] items-center gap-1.5 border border-border bg-surface px-3 py-2.5 text-[12px] text-foreground shadow-[0_8px_24px_-12px_rgba(18,18,18,0.18)]"
          >
            <span className="select-none text-muted-foreground">&gt; </span>
            <HeroTyped
              text="Test the end-to-end booking flow — New York · 2 guests · entire place"
              from={1.1}
              dur={1.5}
            />
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-auto h-3 w-[2px] flex-none bg-foreground"
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="cases"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className={CAP}>Planning · 4 scenarios generated</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {[
              ["Search New York · 2 guests · entire place", 0.3],
              ["Apply filters and open a listing", 0.7],
              ["Book with guest and payment details", 1.1],
              ["Validate confirmation and price breakdown", 1.5],
            ].map(([t, at]) => (
              <motion.div key={t as string} {...hAppear(at as number)} className={row}>
                <span className="truncate text-[12.5px] text-foreground">{t as string}</span>
                <Check size={11} strokeWidth={2.6} className="ml-2 flex-none text-[#1A7F37]" />
              </motion.div>
            ))}
          </div>
          <motion.div
            {...hAppear(2.0, 0)}
            className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-3.5 py-2"
          >
            <span className="text-[12px] font-medium text-[#044F1E]">
              Plan ready · handing over to authoring
            </span>
            <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroAuthoring() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className={CAP}>Recording interaction · airbnb.co.in</p>
        <span className="mono flex items-center gap-1.5 text-[10.5px] uppercase text-[#B3261E]">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#B3261E]" />
          Rec
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {[
          ["Go to airbnb.co.in", 0.3],
          ["Click on ‘Where’ · type ‘New York’", 0.9],
          ["Click on ‘Search’", 1.5],
          ["Select ‘Entire place’ · open a listing", 2.1],
          ["Fill guest details · reach checkout", 2.7],
        ].map(([t, at], i) => (
          <motion.div key={i} {...hAppear(at as number)} className={row}>
            <span className="truncate text-[12.5px] text-foreground">{t as string}</span>
            <motion.span {...hAppear((at as number) + 0.25, 0)}>
              <Check size={11} strokeWidth={2.6} className="ml-2 flex-none text-[#1A7F37]" />
            </motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div
        {...hAppear(3.6, 0)}
        className="mt-2 flex items-center justify-between bg-[#DAFBE1] px-3.5 py-2"
      >
        <span className="text-[12px] font-medium text-[#044F1E]">
          Steps saved to KaneAI · replayable on any device
        </span>
        <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
      </motion.div>
    </div>
  );
}

function HeroExecuting() {
  return (
    <div className="mono flex flex-col gap-[3px] text-[12px] leading-relaxed">
      <p className="text-foreground">
        <span className="text-muted-foreground">$ </span>
        <HeroTyped text="hye run suite/booking --tests 100" from={0.15} dur={1.0} />
      </p>
      <motion.p {...hAppear(1.3, 0)} className="text-muted-foreground">
        Test distribution: 80 pass · 10 fail · 10 skipped
      </motion.p>
      {[
        ["Test #3: PASSED", "text-[#1A7F37]", 1.7],
        ["Test #7: PASSED", "text-[#1A7F37]", 2.0],
        ["Test #78: SKIPPED", "text-[#9A6700]", 2.3],
        ["Test #12: FAILED", "text-[#B3261E]", 2.6],
        ["Test #41: PASSED", "text-[#1A7F37]", 2.9],
      ].map(([t, cls, at]) => (
        <motion.p key={t as string} {...hAppear(at as number, 0)} className={cls as string}>
          {t as string}
        </motion.p>
      ))}
      <motion.div {...hAppear(3.3, 0)} className="mt-1 h-1 w-full bg-border-muted">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 3.4, duration: 1.3, ease: "linear" }}
          className="h-full bg-[#1A7F37]"
        />
      </motion.div>
      <motion.p {...hAppear(4.7, 0)} className="text-foreground">
        Batch 1/1 · 100 tests in 4m 12s
      </motion.p>
    </div>
  );
}

function HeroAnalysing() {
  return (
    <div>
      <p className={CAP}>Failure analysis · release 8.4</p>
      <motion.div
        {...hAppear(0.3)}
        className="mt-2 flex items-center justify-between bg-[#FFEBE9] px-3.5 py-2"
      >
        <span className="mono truncate text-[11.5px] text-[#8B1A12]">
          TypeError: products.map is not a function · products.js:108
        </span>
        <span className="mono ml-2 flex-none text-[10.5px] uppercase text-[#B3261E]">Fail</span>
      </motion.div>
      <div className="mt-1.5 flex gap-1.5">
        {[
          ["Timeout Error ×1", 0.8],
          ["Assertion Error ×1", 1.0],
        ].map(([t, at]) => (
          <motion.span
            key={t as string}
            {...hAppear(at as number, 0)}
            className="border border-border-muted bg-background px-2 py-0.5 text-[11.5px] text-foreground"
          >
            {t as string}
          </motion.span>
        ))}
      </div>
      <motion.div
        {...hAppear(1.5)}
        className="mt-2 inline-flex items-center gap-1.5 border border-border bg-surface px-2.5 py-1 text-[12px] font-medium text-foreground"
      >
        <Sparkles size={11} />
        Generate RCA
      </motion.div>
      <motion.div {...hAppear(2.3)} className="mt-2 flex flex-col gap-1.5">
        <div className={row}>
          <span className="truncate text-[12.5px] text-foreground">
            Root cause: empty inventory rendered before fetch resolves
          </span>
        </div>
      </motion.div>
      <motion.div
        {...hAppear(3.1, 0)}
        className="mt-1.5 flex items-center justify-between bg-[#DAFBE1] px-3.5 py-2"
      >
        <span className="text-[12px] font-medium text-[#044F1E]">
          Fix suggested · guard products before .map · PR drafted
        </span>
        <Check size={11} strokeWidth={3} className="text-[#1A7F37]" />
      </motion.div>
    </div>
  );
}

const HERO_SCENES = [HeroPlanning, HeroAuthoring, HeroExecuting, HeroAnalysing];

export function HeroDemo() {
  const [ch, setCh] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCh((c) => (c + 1) % 4), CHAPTER_MS);
    return () => clearInterval(t);
  }, []);
  const Scene = HERO_SCENES[ch];
  return (
    <Window title="testmu.ai / multi-agent" icon={Bot} right={<Play size={11} />}>
      {/* chapter chips, like the video's title card */}
      <div className="flex border-b border-border-muted">
        {HERO_CHAPTERS.map((c, i) => (
          <button
            key={c}
            onClick={() => setCh(i)}
            className={`mono flex-1 whitespace-nowrap px-2 py-1.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
              ch === i
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="relative h-[460px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={ch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 px-5 py-4"
          >
            <Scene />
          </motion.div>
        </AnimatePresence>
      </div>
    </Window>
  );
}

export const DEMOS = {
  hero: HeroDemo,
  prompt: PromptDemo,
  plan: PlanDemo,
  agentEval: AgentEvalDemo,
  assurance: AssuranceDemo,
  devices: DevicesDemo,
  terminal: TerminalDemo,
  insights: InsightsDemo,
} as const;

export type DemoKey = keyof typeof DEMOS;
