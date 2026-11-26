import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BellOff,
  Bot,
  Globe,
  Monitor,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  Filter,
  Folder,
  Info,
  Lock,
  MoreHorizontal,
  Package,
  Play,
  Plus,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Wand2,
  SquareTerminal,
  Timer,
  Upload,
  User,
  X,
} from "lucide-react";

/* Product screens in the hero-fold look (Web redesign/retro-glitch): the
   real product UI, white, with hairline controls, green "Passed" pills,
   blue outline tags, dark log panels and the IDE terminal, Manrope for
   words and mono for code. Every colour is a TestMu token (the hero
   videos' palette sits on the same ramps).

   Each screen is drawn at a fixed size, like the 1072 x 552 hero frames,
   and scaled to its box, so it keeps its exact layout at every width. */

/* ---------- frame ---------- */

export function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setS(el.clientWidth / w);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${s})` }}>
        {children}
      </div>
    </div>
  );
}

/* the hero fold's stage: a painted scene with the screen centred on it; rows use the
   home page's stage height (380, 540 from tablet up) */
export function Scene({ scene, w, h, card, children }: { scene: string; w: number; h: number; card?: boolean; children: ReactNode }) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-[var(--tm-bg-fill)] ${
        card ? "h-full p-6" : "h-[380px] border border-border px-6 md:h-[540px] md:px-12"
      }`}
    >
      <img src={scene} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative w-full bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
        <Fit w={w} h={h}>{children}</Fit>
      </div>
    </div>
  );
}

/* row screens: a compact canvas, so on the 540 stage the UI reads at close
   to its real size; the tab screen keeps the hero frames' ratio (1072 x 552) */
export const ROW = { w: 680, h: 480 };
export const TAB = { w: 800, h: 412 };
export const CARD = { w: 420, h: 280 };

/* ---------- parts ---------- */

const ICON = "/kit/atp/icons";
const MONO = "font-mono [&_*]:font-mono";
const SUB = "text-[var(--tm-fg-subtle)]";
const T_FG = "text-[var(--tm-fg-inverse)]";
const T_MUTED = "text-[var(--tm-fg-inverse-muted)]";
const T_OK = "text-[var(--tm-green-200)]";
const T_WARN = "text-[var(--tm-orange-200)]";
const T_FAIL = "text-[var(--tm-red-300)]";
const T_CMD = "text-[var(--tm-blue-200)]";

const Img = ({ n, s = 16, round }: { n: string; s?: number; round?: boolean }) => (
  <img src={`${ICON}/${n}`} alt="" width={s} height={s} className={`!static flex-none !shadow-none ![animation:none] ${round ? "rounded-full" : ""}`} style={{ width: s, height: s }} />
);
const Pass = ({ s = 16 }: { s?: number }) => <Img n="st_pass.png" s={s} />;
const Fail = ({ s = 16 }: { s?: number }) => <Img n="st_fail.png" s={s} />;

function Btn({ children, tone }: { children: ReactNode; tone?: "go" }) {
  return (
    <span
      className={`button flex h-7 flex-none items-center gap-1.5 whitespace-nowrap rounded-md border px-3 text-b4 font-medium ${
        tone === "go"
          ? "border-transparent bg-[var(--tm-green-500)] text-[var(--tm-fg-inverse)]"
          : "border-border bg-surface text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function Pill({ tone, children }: { tone: "ok" | "blue" | "red" | "warn" | "plain"; children: ReactNode }) {
  const c = {
    ok: "bg-[var(--tm-green-500)] text-[var(--tm-fg-inverse)]",
    blue: "border border-[var(--tm-blue-500)] text-[var(--tm-blue-500)]",
    red: "bg-[var(--tm-red-500)] text-[var(--tm-fg-inverse)]",
    warn: "bg-[var(--tm-orange-000)] text-[var(--tm-orange-600)]",
    plain: "border border-border text-foreground",
  }[tone];
  return <span className={`pill inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-full px-2 text-b5 font-medium leading-4 ${c}`}>{children}</span>;
}

function Field({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`input flex h-7 items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-b4 ${SUB} ${className}`}>
      <Search size={12} strokeWidth={1.5} aria-hidden />
      {children}
    </span>
  );
}

function Tabs({ items, on = 0, className = "" }: { items: ReactNode[]; on?: number; className?: string }) {
  return (
    <div className={`flex gap-6 border-b border-[var(--tm-border-muted)] text-b4 ${className}`}>
      {items.map((t, i) => (
        <span
          key={i}
          className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2 ${i === on ? "border-foreground font-medium text-foreground" : "border-transparent text-muted-foreground"}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* the IDE terminal of the hero videos */
function Terminal({ tabs, on = 0, right, status, children }: { tabs: string[]; on?: number; right: string; status: string[]; children: ReactNode }) {
  return (
    <div className={`flex h-full flex-col bg-[var(--tm-bg-inverse)] ${MONO}`}>
      <div className={`flex h-10 flex-none items-center gap-6 border-b border-[var(--tm-bg-inverse-muted)] px-6 text-b5 uppercase tracking-[1px] ${T_MUTED}`}>
        {tabs.map((t, i) => (
          <span key={t} className={`flex h-10 items-center border-b-2 ${i === on ? `border-[var(--tm-hero-arrow)] ${T_FG}` : "border-transparent"}`}>
            {t}
          </span>
        ))}
        <span className={`ml-auto flex items-center gap-2 normal-case tracking-normal ${T_FG}`}>
          <SquareTerminal size={14} strokeWidth={1.5} aria-hidden />
          {right}
          <span className={`ml-3 flex items-center gap-3 ${T_MUTED}`}>
            <Plus size={12} strokeWidth={1.5} aria-hidden />
            <MoreHorizontal size={12} strokeWidth={1.5} aria-hidden />
            <X size={12} strokeWidth={1.5} aria-hidden />
          </span>
        </span>
      </div>
      <div className={`flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-6 py-4 text-b4 ${T_FG}`}>{children}</div>
      <div className={`flex h-7 flex-none items-center justify-end gap-6 border-t border-[var(--tm-bg-inverse-muted)] px-6 text-b5 ${T_MUTED}`}>
        {status.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
const TL = ({ children, className = "" }: { children?: ReactNode; className?: string }) => (
  <p className={`h-6 min-w-0 truncate whitespace-pre leading-6 ${className}`}>{children}</p>
);

/* a dark log panel with line numbers, as in the HyperExecute dashboard */
function Log({ lines }: { lines: ReactNode[] }) {
  return (
    <div className={`flex flex-col gap-0.5 rounded-b-lg bg-[var(--tm-bg-inverse)] px-4 py-3 text-b5 ${MONO} ${T_FG}`}>
      {lines.map((l, i) => (
        <p key={i} className="flex min-w-0 gap-4 whitespace-pre">
          <span className={`w-4 flex-none text-right ${T_MUTED}`}>{i + 1}</span>
          <span className="min-w-0 truncate">{l}</span>
        </p>
      ))}
    </div>
  );
}

/* ---------- Kane CLI: the terminal run ---------- */

export function KaneCliScreen() {
  const steps = [
    ["Open staging.acme.com", "1.2s"],
    ["Search for running shoes", "0.8s"],
    ["Add the first result to the cart", "1.1s"],
    ["Open the cart and check out", "0.9s"],
    ["Pay with the saved test card", "2.4s"],
    ["Check the order number shows", "0.6s"],
  ];
  return (
    <Terminal tabs={["Problems", "Output", "Terminal", "Ports"]} on={2} right="kane-cli" status={["Ln 1, Col 1", "Spaces: 2", "UTF-8", "{ } YAML"]}>
      <TL className={T_MUTED}>PS C:\Users\username\shop-app&gt;</TL>
      <TL className={T_CMD}>kane-cli run "Check out with a saved card" --browser chrome</TL>
      <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />
      <TL>
        <span className={T_WARN}>◆</span> Objective <span className={T_MUTED}>· 6 steps planned · web · Chrome 128</span>
      </TL>
      <span className="h-2 flex-none" />
      {steps.map(([s, t], i) => (
        <TL key={s}>
          <span className={T_OK}>✓</span> [{i + 1}/6] {s} <span className={T_MUTED}>({t})</span>
        </TL>
      ))}
      <span className="h-2 flex-none" />
      <TL className={T_MUTED}>Saved tests/checkout-saved-card.kane.yaml</TL>
      <TL className={T_MUTED}>Session https://automation.testmuai.com/build/482</TL>
      <TL>
        <span className={T_OK}>PASSED</span> 6 of 6 steps · 7.0s · exit 0
      </TL>
      <span className="h-2 flex-none" />
      <TL className={T_MUTED}>
        PS C:\Users\username\shop-app&gt; <span className="inline-block h-3 w-2 bg-[var(--tm-fg-inverse)] align-middle" />
      </TL>
    </Terminal>
  );
}

/* ---------- KaneAI: authoring in natural language ---------- */

export function AuthoringScreen() {
  const steps = [
    ["Go to staging.acme.com", "Navigate"],
    ["Search for running shoes and open the first result", "Type"],
    ["Add the item to the cart and check out", "Click"],
    ["Pay with the saved test card ending 4242", "Type"],
    ["Check the confirmation shows an order number", "Assert"],
  ];
  const stages = ["Planning", "Authoring", "Executing", "Analysing"];
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-none items-center justify-center gap-2 pt-4">
        {stages.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-6 bg-border" />}
            <span className={`button flex h-7 items-center rounded-md border px-4 text-b4 ${i === 1 ? "border-foreground font-medium" : "border-border text-muted-foreground"}`}>{s}</span>
          </span>
        ))}
      </div>
      <div className="mx-6 mt-3 flex flex-none items-center gap-3 border-b border-[var(--tm-border-muted)] pb-3">
        <span className="button flex size-7 items-center justify-center rounded-md border border-border">
          <ArrowLeft size={12} strokeWidth={1.5} aria-hidden />
        </span>
        <span className="flex flex-col">
          <span className="text-b3 font-medium">Check out with a saved card</span>
          <span className={`flex items-center text-b5 ${SUB}`}>
            Initial prompt <ChevronRight size={12} strokeWidth={1.5} aria-hidden />
          </span>
        </span>
        <span className="ml-auto flex items-center gap-2 text-b4 font-medium">
          <Folder size={14} strokeWidth={1.5} className="text-[var(--tm-blue-500)]" aria-hidden />
          Default / Checkout
        </span>
      </div>
      <div className="mx-6 mt-4 flex flex-none items-center justify-between">
        <span className="text-b4 font-medium">5 steps authored</span>
        <span className={`flex items-center gap-2 text-b5 ${SUB}`}>
          <Img n="chrome.png" s={12} /> Running live in Chrome 128
        </span>
      </div>
      <div className="mx-6 mt-2 flex flex-none flex-col overflow-hidden rounded-lg border border-border">
        {steps.map(([s, k], i) => (
          <div key={s} className="flex h-9 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0">
            <span className={`w-4 flex-none text-b5 ${SUB}`}>{i + 1}</span>
            <span className="min-w-0 flex-1 truncate">{s}</span>
            <Pill tone="blue">{k}</Pill>
            <Pass s={14} />
          </div>
        ))}
      </div>
      <div className="mx-6 mt-4 input flex h-10 flex-none items-center gap-2 rounded-md border border-foreground px-3 text-b4">
        <Sparkles size={14} strokeWidth={1.5} className="text-[var(--tm-blue-500)]" aria-hidden />
        <span className={SUB}>Describe the next step…</span>
        <span className={`ml-auto flex items-center gap-1 text-b5 ${SUB}`}>
          <CornerDownLeft size={12} strokeWidth={1.5} aria-hidden /> Author step
        </span>
      </div>
      <div className="mt-auto flex flex-none items-center gap-3 border-t border-[var(--tm-border-muted)] px-6 py-3">
        <span className={`flex items-center gap-1.5 text-b5 ${SUB}`}>
          <Info size={12} strokeWidth={1.5} aria-hidden /> Steps run as you author them
        </span>
        <span className="ml-auto flex gap-2">
          <Btn>Save as draft</Btn>
          <Btn tone="go">Create and automate</Btn>
        </span>
      </div>
    </div>
  );
}

/* ---------- Playwright: the test detail ---------- */

export function PlaywrightScreen() {
  const tests = [
    ["pays with a saved card", "31s", true],
    ["adds an item to the cart", "18s", true],
    ["applies a promo code", "22s", true],
    ["guest checkout", "27s", false],
    ["searches the catalog", "12s", true],
    ["filters by size", "15s", true],
    ["signs in with SSO", "20s", true],
    ["updates the address", "16s", true],
    ["removes a cart item", "14s", true],
    ["tracks an order", "19s", true],
    ["changes the currency", "13s", true],
  ] as const;
  const cmds = [
    { c: "page.goto", k: "url", v: "https://staging.acme.com", t: "412ms" },
    { c: "getByRole('button').click", k: "role", v: "Add to cart", t: "96ms" },
    { c: "getByLabel('Card').fill", k: "label", v: "4242 4242 4242 4242", t: "88ms" },
    { c: "locator('#pay').click", k: "healed", v: "getByRole('button', { name: 'Pay' })", t: "140ms", healed: true },
    { c: "expect(page).toHaveURL", k: "url", v: "/order/", t: "35ms" },
  ];
  return (
    <div className="flex h-full">
      <div className="flex w-44 flex-none flex-col border-r border-[var(--tm-border-muted)] px-4 pt-4">
        <span className="text-b3 font-medium">Tests</span>
        <Field className="mt-2">Search tests</Field>
        <span className="mt-2 flex items-center gap-3 text-b5">
          <span className="flex items-center gap-1"><Fail s={12} /> 1</span>
          <span className="flex items-center gap-1"><Pass s={12} /> 47</span>
        </span>
        <div className="mt-2 flex flex-col">
          {tests.map(([n, t, ok], i) => (
            <span key={n} className={`flex h-8 items-center gap-2 border-l-2 px-2 text-b5 ${i === 0 ? "border-foreground bg-[var(--tm-bg-muted)] font-medium" : "border-transparent"}`}>
              {ok ? <Pass s={12} /> : <Fail s={12} />}
              <span className="min-w-0 flex-1 truncate">{n}</span>
              <span className={SUB}>{t}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-5 pt-4">
        <span className={`text-b5 ${SUB}`}>Builds › Playwright · nightly › checkout.spec.ts</span>
        <div className="mt-1 flex items-center gap-2">
          <Pill tone="ok"><Check size={10} strokeWidth={2} aria-hidden /> Passed</Pill>
          <span className="min-w-0 truncate text-b3 font-medium">pays with a saved card</span>
          <span className="ml-auto flex gap-2">
            <Btn tone="go">Re-run <ChevronDown size={12} strokeWidth={1.5} aria-hidden /></Btn>
            <span className="button flex size-7 flex-none items-center justify-center rounded-md border border-border"><Copy size={12} strokeWidth={1.5} aria-hidden /></span>
          </span>
        </div>
        <div className="mt-3 flex gap-8 rounded-lg border border-border px-4 py-2 text-b5">
          <span className="flex flex-col gap-0.5"><span className={SUB}>Time taken</span><span className="text-b4 font-medium">31s</span></span>
          <span className="flex flex-col gap-0.5">
            <span className={SUB}>Configuration</span>
            <span className="flex items-center gap-1.5 text-b4"><Img n="chrome.png" s={12} /> 128 · <Img n="windows.png" s={12} /> 11 · 1920 × 1080</span>
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={SUB}>Updated 2 min ago</span>
            <span className="flex items-center gap-1.5 text-b4"><Img n="avatar.png" s={12} round /> username</span>
          </span>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3 pb-4">
          <div className="flex h-24 flex-none overflow-hidden rounded-lg border border-border">
            <img src={`${ICON}/thumb.png`} alt="" className="!static h-full w-36 flex-none object-cover !shadow-none ![animation:none]" />
            <span className="flex flex-1 flex-col justify-center gap-2 px-4 text-b5">
              <span className="text-b4 font-medium">Session recording</span>
              <span className="flex items-center gap-2">
                <Play size={10} strokeWidth={1.5} aria-hidden />
                <span className={MONO}>0:09</span>
                <span className="h-0.5 flex-1 bg-border"><span className="block h-full w-1/3 bg-foreground" /></span>
                <span className={MONO}>0:31</span>
              </span>
            </span>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-border px-3 pt-2">
            <Tabs items={["Commands", "Logs", "Network"]} />
            <span className="mt-2 text-b5 font-medium">5 commands</span>
            {cmds.map((r) => (
              <span key={r.c} className="flex h-7 min-w-0 items-center gap-2 text-b5">
                <Check size={12} strokeWidth={1.5} className="flex-none text-[var(--tm-fg-success)]" aria-hidden />
                <span className={`flex-none ${MONO}`}>{r.c}</span>
                <span className={`tag flex-none rounded-sm border px-1 ${MONO} ${r.healed ? "border-[var(--tm-orange-200)] bg-[var(--tm-orange-000)] text-[var(--tm-orange-600)]" : `border-border ${SUB}`}`}>{r.k}</span>
                <span className="min-w-0 flex-1" />
                <span className={`flex-none ${SUB}`}>{r.t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- parallel runs: the build view ---------- */

export function ParallelScreen() {
  const icons = ["chrome.png", "firefox.png", "edge.png", "chrome.png", "opera.png"];
  const state = (i: number) => (i === 17 || i === 38 ? "fail" : i >= 44 ? "run" : "ok");
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <span className={`text-b5 ${SUB}`}>Builds › Nightly regression</span>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-b2 font-medium">Build #482</span>
        <Pill tone="blue"><span className="size-1.5 rounded-full bg-[var(--tm-blue-500)]" /> Running</Pill>
        <span className="ml-auto flex gap-2">
          <Btn><Filter size={12} strokeWidth={1.5} aria-hidden /> Filters</Btn>
          <Btn><Download size={12} strokeWidth={1.5} aria-hidden /> Export</Btn>
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 overflow-hidden rounded-lg border border-border">
        {[
          ["Tests", "1,240", ""],
          ["Parallel sessions", "50", ""],
          ["Passed", "1,186", "96%"],
          ["Duration", "6m 12s", "vs 4h serial"],
        ].map(([k, v, d], i) => (
          <span key={k} className={`flex flex-col gap-1 px-4 py-3 ${i ? "border-l border-border" : ""}`}>
            <span className={`text-b5 ${SUB}`}>{k}</span>
            <span className="flex items-baseline gap-2">
              <span className="text-h5 font-medium">{v}</span>
              {d && <span className="text-b5 text-[var(--tm-fg-success)]">{d}</span>}
            </span>
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-b4 font-medium">Sessions · 50 at once</span>
        <span className={`flex items-center gap-3 text-b5 ${SUB}`}>
          <span className="flex items-center gap-1"><span className="size-2 bg-[var(--tm-green-200)]" /> Passed</span>
          <span className="flex items-center gap-1"><span className="size-2 bg-[var(--tm-blue-200)]" /> Running</span>
          <span className="flex items-center gap-1"><span className="size-2 bg-[var(--tm-red-200)]" /> Failed</span>
        </span>
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5">
        {Array.from({ length: 50 }).map((_, i) => {
          const s = state(i);
          return (
            <span
              key={i}
              className={`tag flex h-10 items-center justify-center gap-1 rounded-sm border px-1 text-b5 ${
                s === "ok"
                  ? "border-[var(--tm-green-100)] bg-[var(--tm-green-000)]"
                  : s === "fail"
                    ? "border-[var(--tm-red-100)] bg-[var(--tm-red-000)]"
                    : "border-[var(--tm-blue-100)] bg-[var(--tm-bg-accent-muted)]"
              }`}
            >
              <Img n={icons[i % 5]} s={12} />
              <span className={`${MONO} ${SUB}`}>{String(i + 1).padStart(2, "0")}</span>
            </span>
          );
        })}
      </div>
      <div className="mt-5 flex h-1.5 overflow-hidden rounded-full">
        <span className="w-[88%] bg-[var(--tm-green-400)]" />
        <span className="w-[2%] bg-[var(--tm-red-400)]" />
        <span className="flex-1 bg-[var(--tm-blue-200)]" />
      </div>
      <div className={`mt-2 flex items-center gap-4 text-b5 ${SUB}`}>
        <span>1,186 passed</span>
        <span>2 failed, retrying</span>
        <span>52 queued</span>
        <span className="ml-auto flex items-center gap-1.5">
          <Img n="avatar.png" s={12} round /> Triggered by a pull request · main
        </span>
      </div>
    </div>
  );
}

/* ---------- HyperExecute: the job dashboard ---------- */

export function HyperScreen() {
  const tasks = [
    ["1", "1m 12s", true],
    ["2", "1m 24s", true],
    ["3", "1m 41s", false],
    ["4", "1m 06s", true],
  ] as const;
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="button flex size-7 items-center justify-center rounded-md border border-border"><ChevronLeft size={12} strokeWidth={1.5} aria-hidden /></span>
        <span className="text-b3 font-medium">#482</span>
        {["selenium-testng", "win11", "v1", "autosplit"].map((t) => (
          <Pill key={t} tone="blue">{t}</Pill>
        ))}
        <span className="ml-auto flex gap-2">
          <Btn><FileText size={12} strokeWidth={1.5} aria-hidden /> YAML</Btn>
          <Btn><Package size={12} strokeWidth={1.5} aria-hidden /> Artifacts</Btn>
          <Btn><Upload size={12} strokeWidth={1.5} aria-hidden /> Report</Btn>
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3 text-b5">
        <Pill tone="ok"><Check size={10} strokeWidth={2} aria-hidden /> Completed</Pill>
        <span className="flex items-center gap-1"><Clock size={12} strokeWidth={1.5} aria-hidden /> 4m 12s</span>
        <span className="flex items-center gap-1"><Timer size={12} strokeWidth={1.5} aria-hidden /> 70% faster</span>
        <span className="flex items-center gap-1"><User size={12} strokeWidth={1.5} aria-hidden /> username</span>
        <span className="flex h-1.5 w-28 overflow-hidden rounded-full"><span className="w-[92%] bg-[var(--tm-green-500)]" /><span className="flex-1 bg-[var(--tm-orange-300)]" /></span>
        <span className={`${MONO} ${SUB}`}>7be6f667</span>
      </div>
      <Tabs className="mt-3" items={["Tasks", <>Insights <Pill tone="plain">Beta</Pill></>]} />
      <div className="mt-3 flex min-h-0 flex-1 gap-4">
        <div className="flex w-40 flex-none flex-col gap-2">
          <Field>Search</Field>
          <span className={`text-b5 font-medium ${SUB}`}>Execution tasks</span>
          {tasks.map(([n, t, ok], i) => (
            <span key={n} className={`flex flex-col gap-1 whitespace-nowrap rounded-lg border px-3 py-2 ${i === 2 ? "border-transparent bg-[var(--tm-bg-muted)]" : "border-border"}`}>
              <span className="flex items-center gap-2 text-b4 font-medium">{ok ? <Pass s={14} /> : <Fail s={14} />} {n}</span>
              <span className={`flex items-center gap-1 pl-6 text-b5 ${SUB}`}><Clock size={10} strokeWidth={1.5} aria-hidden /> {t} · <Img n="windows.png" s={10} /> Win 11</span>
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center">
            <span className="segment flex overflow-hidden rounded-md border border-border text-b4">
              <span className="px-3 py-1">Pre steps</span>
              <span className="border-x border-border bg-[var(--tm-bg-muted)] px-3 py-1 font-medium">Scenarios</span>
              <span className="px-3 py-1">Post steps</span>
            </span>
            <span className="ml-auto"><Btn><FileText size={12} strokeWidth={1.5} aria-hidden /> Task metrics</Btn></span>
          </div>
          <div className="mt-2 flex h-9 items-center gap-2 rounded-t-lg border border-border px-3 text-b4 font-medium">
            <ChevronDown size={12} strokeWidth={1.5} aria-hidden />
            <Fail s={14} /> payments.spec · pays with a saved card
            <span className={`ml-auto flex items-center gap-1 text-b5 font-normal ${SUB}`}><Clock size={10} strokeWidth={1.5} aria-hidden /> 41s</span>
          </div>
          <Log
            lines={[
              "[INFO] Using auto detected provider TestNG",
              "[INFO] Running TestSuite",
              <span className={T_FAIL}>[ERROR] ElementNotInteractable: #pay-btn</span>,
              <span className={T_WARN}>[WARN] Auto-heal retried with getByRole('button')</span>,
              <span className={T_OK}>[INFO] Tests run: 12, Failures: 0, Errors: 0</span>,
              <span className={T_OK}>[INFO] BUILD SUCCESS</span>,
              <span className={T_MUTED}>[INFO] Total time: 41.2 s</span>,
            ]}
          />
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-border bg-[var(--tm-bg-accent-muted)] px-3 py-2 text-b5">
            <Sparkles size={12} strokeWidth={1.5} className="mt-0.5 flex-none text-[var(--tm-blue-500)]" aria-hidden />
            <span><span className="font-medium">Root cause:</span> the cookie banner covered the pay button. Auto-heal retried and the test passed.</span>
          </div>
          {[
            ["checkout.spec · guest checkout", "38s"],
            ["search.spec · filters by size", "44s"],
          ].map(([n, t]) => (
            <div key={n} className="mt-2 flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-b4 font-medium">
              <ChevronRight size={12} strokeWidth={1.5} aria-hidden />
              <Pass s={14} /> {n}
              <span className={`ml-auto flex items-center gap-1 text-b5 font-normal ${SUB}`}><Clock size={10} strokeWidth={1.5} aria-hidden /> {t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- test reporting: the analytics dashboard ---------- */

const BARS = [62, 80, 48, 74, 90, 56, 70, 84, 66, 92, 58, 76, 88, 64, 72, 94, 60, 82, 70, 86];

export function ReportingScreen() {
  const browsers = [
    ["chrome.png", "Chrome", 198, 190, 8],
    ["firefox.png", "Firefox", 211, 202, 9],
    ["edge.png", "Edge", 172, 166, 6],
    ["opera.png", "Opera", 185, 178, 7],
    ["brave.png", "Brave", 146, 142, 4],
  ] as const;
  const Widget = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="flex min-h-0 flex-col rounded-lg border border-border px-3 py-2">
      <span className="flex items-center gap-1.5 text-b4 font-medium">
        {title} <Info size={10} strokeWidth={1.5} className={SUB} aria-hidden />
        <MoreHorizontal size={12} strokeWidth={1.5} className={`ml-auto ${SUB}`} aria-hidden />
      </span>
      {children}
    </div>
  );
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="text-b2 font-medium">Release 4.2 · daily report</span>
        <span className="ml-auto flex gap-2">
          <Btn>Add widget <ChevronDown size={12} strokeWidth={1.5} aria-hidden /></Btn>
          <Btn>Daily <ChevronDown size={12} strokeWidth={1.5} aria-hidden /></Btn>
          <Btn><Filter size={12} strokeWidth={1.5} aria-hidden /> Filters</Btn>
          <span className="button flex h-7 items-center gap-1.5 rounded-md border border-[var(--tm-blue-200)] bg-[var(--tm-bg-accent-muted)] px-3 text-b4 font-medium">
            <img src={`${ICON}/ai-sparkle.svg`} alt="" className="size-3" /> Copilot
          </span>
        </span>
      </div>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3 pb-5">
        <Widget title="Flakiness summary">
          <span className={`mt-1 flex gap-3 text-b5 ${SUB}`}>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-[var(--tm-green-400)]" /> Stable</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-[var(--tm-orange-300)]" /> Flaky</span>
          </span>
          <span className="mt-2 flex min-h-0 flex-1 items-end gap-1.5">
            {BARS.map((b, i) => (
              <span key={i} className={`flex-1 rounded-t-sm ${i % 4 === 1 ? "bg-[var(--tm-orange-300)]" : "bg-[var(--tm-green-400)]"}`} style={{ height: `${b}%` }} />
            ))}
          </span>
        </Widget>
        <Widget title="Test browser">
          <div className="mt-1 grid grid-cols-[1fr_auto_auto_auto] gap-x-4 text-b5">
            {["Browser", "Runs", "Passed", "Failed"].map((h) => (
              <span key={h} className={`pb-1 ${SUB}`}>{h}</span>
            ))}
            {browsers.map(([ic, n, r, p, f]) => (
              <span key={n} className="contents">
                <span className="flex h-6 items-center gap-1.5"><Img n={ic} s={12} /> {n}</span>
                <span className="flex h-6 items-center">{r}</span>
                <span className="flex h-6 items-center text-[var(--tm-fg-success)]">{p}</span>
                <span className="flex h-6 items-center text-[var(--tm-fg-error)]">{f}</span>
              </span>
            ))}
          </div>
        </Widget>
        <Widget title="Test health snapshot">
          <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-3">
            {[
              ["Total tests", "34,221", "16%"],
              ["Passing", "23,411", "12%"],
              ["Failing", "632", "4%"],
              ["Flaky", "905", "8%"],
              ["Completing", "56", "16%"],
              ["Inconsistent", "32", "2%"],
            ].map(([k, v, d]) => (
              <span key={k} className="flex flex-col">
                <span className={`truncate text-b5 ${SUB}`}>{k}</span>
                <span className="flex items-baseline gap-1">
                  <span className="text-b2 font-medium">{v}</span>
                  <span className="text-b5 text-[var(--tm-fg-success)]">{d} ↑</span>
                </span>
              </span>
            ))}
          </div>
        </Widget>
        <Widget title="Job insights">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="mt-2 min-h-0 w-full flex-1" aria-hidden>
            <polyline fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="stroke-[var(--tm-green-400)]" points="0,40 25,22 50,26 75,14 100,20 125,10 150,16 175,8 200,12" />
            <polyline fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="stroke-[var(--tm-red-400)]" points="0,50 25,44 50,52 75,30 100,48 125,46 150,54 175,40 200,50" />
          </svg>
        </Widget>
      </div>
    </div>
  );
}

/* ---------- enterprise cards ---------- */

export function PrivateCloudScreen() {
  const runners = [
    ["runner-01", "Linux · 32 vCPU", "14 jobs"],
    ["runner-02", "Linux · 32 vCPU", "12 jobs"],
    ["runner-03", "Windows · 16 vCPU", "9 jobs"],
    ["runner-04", "macOS · 12 vCPU", "6 jobs"],
  ];
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <div className="flex items-center gap-2">
        <Cloud size={16} strokeWidth={1.5} aria-hidden />
        <span className="text-b3 font-medium">Private cloud · acme-prod</span>
        <span className="ml-auto"><Pill tone="ok"><Check size={10} strokeWidth={2} aria-hidden /> Connected</Pill></span>
      </div>
      <span className={`mt-1 text-b5 ${SUB}`}>Your VPC · us-east-1 · Kubernetes 1.30</span>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border border-border">
        {runners.map(([n, k, j]) => (
          <span key={n} className="flex h-8 items-center gap-2 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0">
            <Server size={12} strokeWidth={1.5} className={SUB} aria-hidden />
            <span className={`w-20 ${MONO}`}>{n}</span>
            <span className={`flex-1 text-b5 ${SUB}`}>{k}</span>
            <span className="flex items-center gap-1 text-b5 text-[var(--tm-fg-success)]"><span className="size-1.5 rounded-full bg-[var(--tm-green-400)]" /> {j}</span>
          </span>
        ))}
      </div>
      <div className="mt-auto mb-4 flex items-center gap-2 rounded-md border border-border bg-[var(--tm-bg-fill)] px-3 py-2 text-b5">
        <Lock size={12} strokeWidth={1.5} aria-hidden />
        <span className={MONO}>s3://acme-test-artifacts</span>
        <span className={`ml-auto ${SUB}`}>Data stays in your cloud</span>
      </div>
    </div>
  );
}

export function GovernanceScreen() {
  const people = [
    ["AK", "Asha Kumar", "Admin"],
    ["DL", "Dan Lee", "Member"],
    ["MR", "Maria Ruiz", "Member"],
    ["TO", "Tom Okafor", "Viewer"],
  ];
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} strokeWidth={1.5} aria-hidden />
        <span className="text-b3 font-medium">Organization · members</span>
        <span className="ml-auto"><Pill tone="blue">SAML SSO on</Pill></span>
      </div>
      <Tabs className="mt-3" items={["Members", "Roles", "Policies", "Audit log"]} />
      <div className="mt-2 flex flex-col">
        {people.map(([i, n, r]) => (
          <span key={n} className="flex h-8 items-center gap-2 border-b border-[var(--tm-border-muted)] text-b4 last:border-b-0">
            <span className="avatar flex size-5 items-center justify-center rounded-full bg-[var(--tm-bg-muted)] text-b5 font-medium">{i}</span>
            <span className="flex-1">{n}</span>
            <span className="button flex h-6 w-24 items-center justify-between rounded-md border border-border px-2 text-b5">
              {r} <ChevronDown size={10} strokeWidth={1.5} aria-hidden />
            </span>
          </span>
        ))}
      </div>
      <div className={`mt-auto mb-4 flex items-center gap-2 text-b5 ${SUB}`}>
        <Clock size={10} strokeWidth={1.5} aria-hidden /> Audit · username changed Dan Lee to Member · 2m ago
      </div>
    </div>
  );
}

export function PipelineScreen() {
  return (
    <Terminal tabs={["GitHub Actions", "Jenkins", "Azure"]} right="ci" status={["main", "e2e.yml"]}>
      <TL className={T_MUTED}>- name: Run tests on HyperExecute</TL>
      <TL className={T_CMD}>  run: ./hyperexecute --config he.yaml</TL>
      <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />
      <TL><span className={T_OK}>✓</span> Build <span className={T_MUTED}>(48s)</span></TL>
      <TL><span className={T_OK}>✓</span> Job 482 started · 64 lanes</TL>
      <TL><span className={T_OK}>✓</span> 1,204 tests passed <span className={T_MUTED}>(4m 12s)</span></TL>
      <TL><span className={T_WARN}>◆</span> Deploy to staging</TL>
    </Terminal>
  );
}

/* ---------- accessibility: the issue summary (accessibility-devtools) ---------- */

const SEV = [
  { k: "Critical", n: 20, c: "var(--tm-red-500)" },
  { k: "Serious", n: 14, c: "var(--tm-orange-400)" },
  { k: "Moderate", n: 9, c: "var(--tm-blue-500)" },
  { k: "Minor", n: 6, c: "var(--tm-gray-400)" },
];

export function A11yScreen() {
  const total = SEV.reduce((a, b) => a + b.n, 0);
  let at = 0;
  const C = 2 * Math.PI * 30;
  return (
    <div className="flex h-full flex-col px-6 pt-4">
      <div className="flex items-center">
        <Tabs className="flex-1" items={["Issue summary", "All issues", "Mobile view"]} />
        <span className="ml-4 button flex items-center gap-2 rounded-md border border-border px-3 py-1 text-b4 font-medium [box-shadow:var(--tm-shadow-floating-sm)]">
          <Img n="chrome.png" s={14} /> Chrome extension
        </span>
      </div>
      <div className="mt-3 grid grid-cols-5 overflow-hidden rounded-lg border border-border">
        {[
          ["Total issues", "100"],
          ["Issue types", "3"],
          ["Element groups", "25"],
          ["WCAG guidelines", "15"],
          ["Best practices", "43"],
        ].map(([k, v], i) => (
          <span key={k} className={`flex flex-col gap-0.5 px-3 py-2 ${i ? "border-l border-border" : ""}`}>
            <span className={`text-b5 ${SUB}`}>{k}</span>
            <span className="text-h5 font-medium">{v}</span>
          </span>
        ))}
      </div>
      <span className="mt-3 text-b3 font-medium">Issue breakdown</span>
      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-3 pb-4">
        <div className="flex flex-col rounded-lg border border-border px-3 py-2">
          <span className="flex items-center justify-between text-b4">
            Most severe <span className={SUB}><span className="font-medium text-foreground">{total}</span> issues</span>
          </span>
          <div className="mt-2 flex flex-1 items-center gap-4">
            <svg viewBox="0 0 80 80" className="size-24 flex-none -rotate-90" aria-hidden>
              {SEV.map((x) => {
                const len = (x.n / total) * C;
                const el = <circle key={x.k} cx="40" cy="40" r="30" fill="none" strokeWidth="12" stroke={x.c} strokeDasharray={`${len} ${C}`} strokeDashoffset={-at} />;
                at += len;
                return el;
              })}
            </svg>
            <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-border">
              {SEV.map((x) => (
                <span key={x.k} className="flex h-7 items-center gap-2 border-b border-[var(--tm-border-muted)] px-2 text-b5 last:border-b-0">
                  <span className="size-2 flex-none rounded-full" style={{ background: x.c }} />
                  <span className="flex-1">{x.k}</span>
                  <span className="font-medium">{x.n}</span>
                  <ChevronRight size={12} strokeWidth={1.5} className={SUB} aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg border border-border px-3 py-2">
          <span className="flex items-center justify-between text-b4">
            WCAG guidelines <span className={SUB}><span className="font-medium text-foreground">15</span> guidelines</span>
          </span>
          <div className="mt-2 flex flex-col overflow-hidden rounded-md border border-border">
            <span className={`flex h-6 items-center justify-between bg-[var(--tm-bg-fill)] px-2 text-b5 ${SUB}`}>
              <span>WCAG criteria</span>
              <span>Issues</span>
            </span>
            {[
              ["1.3.1 Info and relationships", 24],
              ["1.4.3 Contrast", 18],
              ["4.1.1 Parsing", 12],
              ["4.1.2 Name, role, value", 9],
            ].map(([k, n]) => (
              <span key={k} className="flex h-7 items-center gap-2 border-t border-[var(--tm-border-muted)] px-2 text-b5">
                <span className="min-w-0 flex-1 truncate">{k}</span>
                <span className="flex h-1 w-16 gap-0.5">
                  {SEV.map((x) => (
                    <span key={x.k} className="flex-1" style={{ background: x.c }} />
                  ))}
                </span>
                <span className="w-5 text-right font-medium">{n}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- HyperExecute page: the six features ---------- */

/* a box in the grid diagram */
const Node = ({ icon: Icon, name, note, tone = "" }: { icon: typeof Monitor; name: string; note: string; tone?: string }) => (
  <span className={`flex flex-col items-center gap-1 rounded-lg border border-border bg-surface px-4 py-3 text-center ${tone}`}>
    <Icon size={16} strokeWidth={1.5} aria-hidden />
    <span className="text-b4 font-medium">{name}</span>
    <span className={`text-b5 ${SUB}`}>{note}</span>
  </span>
);
const Hop = ({ bad }: { bad?: boolean }) => (
  <span className="flex flex-1 flex-col items-center gap-1">
    <span className={`flex w-full items-center ${bad ? "text-[var(--tm-red-500)]" : SUB}`}>
      <span className="h-px flex-1 bg-current" />
      <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
    </span>
    {bad && <span className={`tag rounded-sm bg-[var(--tm-red-000)] px-1.5 text-b5 text-[var(--tm-red-500)] ${MONO}`}>hop</span>}
  </span>
);

/* a traditional grid against one HyperExecute VM */
export function GridScreen() {
  return (
    <div className="grid h-full grid-cols-2 gap-px bg-[var(--tm-border-muted)]">
      <div className="flex flex-col bg-surface px-6 pt-5">
        <span className="flex items-center justify-between">
          <span className="text-b3 font-medium">Traditional grid</span>
          <Pill tone="plain">Every command</Pill>
        </span>
        <div className="mt-8 flex items-center">
          <Node icon={FileText} name="Test runner" note="your CI" />
          <Hop bad />
          <Node icon={Server} name="Hub" note="routes" />
          <Hop bad />
          <Node icon={Monitor} name="Node" note="browser" />
        </div>
        <div className="mt-8 flex flex-col gap-2 text-b4">
          {["Logs on separate parts", "Nodes stay up, need patching", "Flakes from the network"].map((t) => (
            <span key={t} className="flex items-center gap-2"><X size={12} strokeWidth={1.5} className="text-[var(--tm-red-500)]" aria-hidden /> {t}</span>
          ))}
        </div>
        <span className="mt-auto mb-5 flex items-baseline gap-2 border-t border-[var(--tm-border-muted)] pt-3">
          <span className={`text-b5 ${SUB}`}>Suite run</span>
          <span className="text-h5 font-medium">41m 20s</span>
        </span>
      </div>
      <div className="flex flex-col bg-surface px-6 pt-5">
        <span className="flex items-center justify-between">
          <span className="text-b3 font-medium">HyperExecute</span>
          <Pill tone="ok"><Check size={10} strokeWidth={2} aria-hidden /> 0 hops</Pill>
        </span>
        <div className="mt-8 flex flex-col gap-2 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] p-3">
          <span className={`flex items-center justify-between text-b5 ${SUB}`}>
            <span className={MONO}>task VM · vm-07</span>
            <span>one machine</span>
          </span>
          <div className="flex items-center gap-2">
            <Node icon={FileText} name="Test runner" note="your script" />
            <Node icon={Monitor} name="Browser" note="same VM" />
            <Node icon={Package} name="Deps" note="cached" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-b4">
          {["Logs kept per test", "VM wiped after the run", "Fewer infra flakes"].map((t) => (
            <span key={t} className="flex items-center gap-2"><Check size={12} strokeWidth={1.5} className="text-[var(--tm-fg-success)]" aria-hidden /> {t}</span>
          ))}
        </div>
        <span className="mt-auto mb-5 flex items-baseline gap-2 border-t border-[var(--tm-border-muted)] pt-3">
          <span className={`text-b5 ${SUB}`}>Suite run</span>
          <span className="text-h5 font-medium">12m 24s</span>
          <span className="text-b5 text-[var(--tm-fg-success)]">70% faster</span>
        </span>
      </div>
    </div>
  );
}

/* the live page's release-regression job: 24 VMs from one YAML value */
export function SplitScreen() {
  const done = (i: number) => i < 19;
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="text-b3 font-medium">release-regression</span>
        <Pill tone="blue"><span className="size-1.5 rounded-full bg-[var(--tm-blue-500)]" /> Running</Pill>
        <span className={`ml-auto text-b5 ${SUB} ${MONO}`}>autosplit: true · concurrency: 24</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-b4 font-medium">24 parallel VMs</span>
        <span className={`text-b5 ${SUB}`}>19 done · 5 running</span>
      </div>
      <div className="mt-2 grid grid-cols-8 gap-1.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`tag flex h-10 flex-col items-center justify-center rounded-sm border text-b5 ${
              done(i) ? "border-[var(--tm-green-100)] bg-[var(--tm-green-000)]" : "border-[var(--tm-blue-100)] bg-[var(--tm-bg-accent-muted)]"
            }`}
          >
            <span className={`${MONO} ${SUB}`}>vm-{String(i + 1).padStart(2, "0")}</span>
            <span className={done(i) ? "text-[var(--tm-fg-success)]" : "text-[var(--tm-blue-500)]"}>{done(i) ? "passed" : "running"}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-border">
        {[
          ["Each VM runs", "Test runner, browser, dependencies"],
          ["How the suite splits", "By test discovery, no shard scripts"],
        ].map(([k, v], i) => (
          <span key={k} className={`flex flex-col gap-0.5 px-4 py-3 ${i ? "border-l border-border" : ""}`}>
            <span className={`text-b5 ${SUB}`}>{k}</span>
            <span className="text-b4 font-medium">{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* AI root cause analysis on a failed test */
export function RcaScreen() {
  const kinds = ["Product", "Script", "Environment", "No action"];
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <Fail s={16} />
        <span className="text-b3 font-medium">checkout.spec · pays with a saved card</span>
        <span className="ml-auto"><Btn><Sparkles size={12} strokeWidth={1.5} aria-hidden /> AI RCA</Btn></span>
      </div>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3 pb-5">
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border px-3 py-2">
            <span className={`text-b5 ${SUB}`}>Failure type</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {kinds.map((k, i) => (
                <span key={k} className={`tag rounded-sm border px-2 py-0.5 text-b5 ${i === 0 ? "border-foreground bg-[var(--tm-bg-inverse)] text-[var(--tm-fg-inverse)]" : `border-border ${SUB}`}`}>{k}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <span className={`flex h-7 items-center justify-between bg-[var(--tm-bg-fill)] px-3 text-b5 ${SUB}`}>
              <span className={MONO}>git diff · 7be6f667</span>
              <span>pricing.ts</span>
            </span>
            <div className={`flex flex-col px-3 py-2 text-b5 ${MONO}`}>
              <span className="bg-[var(--tm-red-000)] text-[var(--tm-red-500)]">- total = sum(items)</span>
              <span className="bg-[var(--tm-green-000)] text-[var(--tm-green-500)]">+ total = sum(items) * rate</span>
              <span className={SUB}>  return round(total)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--tm-blue-200)] bg-[var(--tm-bg-accent-muted)] px-4 py-3">
          <span className="flex items-center gap-2 text-b4 font-medium">
            <img src={`${ICON}/ai-sparkle.svg`} alt="" className="!static size-3.5 !shadow-none ![animation:none]" /> Root cause
            <span className={`ml-auto text-b5 font-normal ${SUB}`}>in 24s</span>
          </span>
          <span className="text-b4">The total is multiplied by an exchange rate that is undefined for saved cards, so the pay button stays disabled.</span>
          <span className={`mt-1 text-b5 ${SUB}`}>Steps to fix</span>
          {["Default rate to 1 when the card has no currency", "Add a unit test for saved-card totals", "Rerun the failed scenarios only"].map((t, i) => (
            <span key={t} className="flex items-start gap-2 text-b4">
              <span className={`flex size-4 flex-none items-center justify-center rounded-full bg-surface text-b5 ${MONO}`}>{i + 1}</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* flaky test detection over the last 10 runs */
export function FlakyScreen() {
  const rows = [
    { n: "search filters by size", b: "chrome.png", r: 82, sev: "High", muted: true },
    { n: "applies a promo code", b: "firefox.png", r: 64, sev: "Medium" },
    { n: "guest checkout", b: "edge.png", r: 41, sev: "Low" },
    { n: "signs in with SSO", b: "chrome.png", r: 27, sev: "Low" },
    { n: "tracks an order", b: "firefox.png", r: 8, sev: "" },
  ];
  const tone = (s: string) =>
    s === "High" ? "bg-[var(--tm-red-000)] text-[var(--tm-red-500)]" : s === "Medium" ? "bg-[var(--tm-orange-000)] text-[var(--tm-orange-600)]" : "bg-[var(--tm-bg-fill)] text-muted-foreground";
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="text-b3 font-medium">Flaky tests</span>
        <span className="ml-auto flex gap-2">
          <Btn>Window: last 10 runs <ChevronDown size={12} strokeWidth={1.5} aria-hidden /></Btn>
          <Btn>Threshold 20% <ChevronDown size={12} strokeWidth={1.5} aria-hidden /></Btn>
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-border">
        <div className={`grid h-8 grid-cols-[minmax(0,1fr)_120px_120px_96px] items-center gap-3 bg-[var(--tm-bg-fill)] px-4 text-b5 ${SUB}`}>
          <span>Test · browser</span><span>Last 10 runs</span><span>Flake rate</span><span>Severity</span>
        </div>
        {rows.map((r) => (
          <div key={r.n} className="grid h-11 grid-cols-[minmax(0,1fr)_120px_120px_96px] items-center gap-3 border-t border-[var(--tm-border-muted)] px-4 text-b4">
            <span className="flex min-w-0 items-center gap-2"><Img n={r.b} s={12} /><span className="truncate">{r.n}</span>{r.muted && <BellOff size={12} strokeWidth={1.5} className={SUB} aria-hidden />}</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={`h-3 flex-1 rounded-sm ${(i * 7 + r.r) % 100 < r.r ? "bg-[var(--tm-red-300)]" : "bg-[var(--tm-green-300)]"}`} />
              ))}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--tm-bg-fill)]"><span className="block h-full bg-foreground" style={{ width: `${r.r}%` }} /></span>
              <span className={`w-8 text-right text-b5 ${MONO}`}>{r.r}%</span>
            </span>
            <span>{r.sev ? <span className={`tag rounded-sm px-2 py-0.5 text-b5 ${tone(r.sev)}`}>{r.muted ? "Muted" : r.sev}</span> : <span className={`text-b5 ${SUB}`}>Stable</span>}</span>
          </div>
        ))}
      </div>
      <span className={`mt-3 flex items-center gap-1.5 text-b5 ${SUB}`}>
        <Info size={12} strokeWidth={1.5} aria-hidden /> Failed five times in a row: muted until you unmute it
      </span>
    </div>
  );
}

/* auto-healing: the broken locator and the healed one */
export function HealScreen() {
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <Pass s={16} />
        <span className="text-b3 font-medium">checkout.spec · pays with a saved card</span>
        <span className="ml-auto"><Pill tone="ok"><Wand2 size={10} strokeWidth={2} aria-hidden /> Healed</Pill></span>
      </div>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--tm-red-200)] bg-[var(--tm-red-000)] px-4 py-3">
          <span className="flex items-center justify-between text-b5"><span className="font-medium">Original locator</span><span className={`tag rounded-sm border border-[var(--tm-red-200)] px-1 ${MONO} text-[var(--tm-red-500)]`}>xpath</span></span>
          <span className={`text-b4 text-[var(--tm-red-500)] ${MONO}`}>//*[@id='pay-btn']</span>
          <span className={`text-b5 ${SUB}`}>Not found after the release</span>
        </div>
        <span className="flex items-center"><ArrowRight size={16} strokeWidth={1.5} aria-hidden /></span>
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-4 py-3">
          <span className="flex items-center justify-between text-b5"><span className="font-medium">Healed locator</span><span className={`tag rounded-sm border border-[var(--tm-green-200)] px-1 ${MONO} text-[var(--tm-green-500)]`}>css</span></span>
          <span className={`text-b4 text-[var(--tm-green-500)] ${MONO}`}>button[data-test='pay']</span>
          <span className={`text-b5 ${SUB}`}>Rebuilt from the recorded DOM</span>
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-border">
        <Tabs className="px-4 pt-2" items={["Commands", "Heal log", "DOM"]} on={1} />
        {[
          ["Record", "DOM snapshot taken at the last pass", "1.2s"],
          ["Detect", "//*[@id='pay-btn'] matched nothing", "0.3s"],
          ["Heal", "Matched by text, role and position", "0.4s"],
          ["Continue", "Clicked, run carried on", "0.1s"],
        ].map(([k, v, t]) => (
          <span key={k} className="flex h-9 items-center gap-3 border-t border-[var(--tm-border-muted)] px-4 text-b4">
            <Check size={12} strokeWidth={1.5} className="text-[var(--tm-fg-success)]" aria-hidden />
            <span className="w-16 font-medium">{k}</span>
            <span className={`min-w-0 flex-1 truncate ${SUB}`}>{v}</span>
            <span className={`text-b5 ${SUB}`}>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* the live page's agent skill transcript */
export function SkillScreen() {
  return (
    <Terminal tabs={["Problems", "Output", "Terminal"]} on={2} right="claude-code" status={["hyperexecute-skill", "UTF-8"]}>
      <TL><span className={T_MUTED}>$</span> <span className={T_CMD}>npx skills add https://github.com/LambdaTest/agent-skills.git \</span></TL>
      <TL className={T_CMD}>    --skill hyperexecute-skill</TL>
      <TL><span className={T_MUTED}>$</span> export LT_USERNAME=<span className={T_WARN}>"&lt;your_username&gt;"</span></TL>
      <TL><span className={T_MUTED}>$</span> export LT_ACCESS_KEY=<span className={T_WARN}>"&lt;your_access_key&gt;"</span></TL>
      <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />
      <TL><span className={T_WARN}>&gt;</span> run my Playwright suite on HyperExecute</TL>
      <span className="h-2 flex-none" />
      <TL><span className={T_OK}>✓</span> hyperexecute.yaml written and validated</TL>
      <TL><span className={T_WARN}>?</span> Submit the job to HyperExecute cloud? <span className={T_MUTED}>(y/N)</span> y</TL>
      <TL><span className={T_OK}>✓</span> Job submitted, logs and artifacts downloaded</TL>
      <span className="h-2 flex-none" />
      <TL className={T_MUTED}>
        <Bot size={12} strokeWidth={1.5} className="mr-2 inline" aria-hidden />
        48 passed · 1.9m · <Globe size={12} strokeWidth={1.5} className="mx-1 inline" aria-hidden /> hyperexecute.lambdatest.com/job/482
      </TL>
    </Terminal>
  );
}

/* ---------- HyperExecute page: a load test run (JMeter on HyperExecute) ---------- */

const RPS = [38, 52, 61, 70, 78, 84, 88, 86, 90, 94, 92, 96, 95, 97, 93, 96, 98, 97, 99, 96];
const LAT = [30, 28, 29, 31, 30, 33, 36, 40, 52, 61, 58, 44, 38, 35, 33, 32, 31, 30, 31, 30];

export function LoadScreen() {
  const line = (pts: number[]) => pts.map((v, i) => `${(i / (pts.length - 1)) * 200},${60 - v * 0.55}`).join(" ");
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="text-b3 font-medium">checkout-load.jmx</span>
        <Pill tone="blue"><span className="size-1.5 rounded-full bg-[var(--tm-blue-500)]" /> Running</Pill>
        <span className={`ml-auto text-b5 ${SUB} ${MONO}`}>JMeter · 2,000 users · 6 regions</span>
      </div>
      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-lg border border-border">
        {[
          ["Throughput", "1,240 req/s"],
          ["p95 response", "312 ms"],
          ["Errors", "0.4%"],
        ].map(([k, v], i) => (
          <span key={k} className={`flex flex-col gap-1 px-4 py-3 ${i ? "border-l border-border" : ""}`}>
            <span className={`text-b5 ${SUB}`}>{k}</span>
            <span className="text-h5 font-medium">{v}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-col rounded-lg border border-border px-3 py-2">
        <span className="flex items-center justify-between text-b5">
          <span className="font-medium">Requests and response time</span>
          <span className={`flex gap-3 ${SUB}`}>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-[var(--tm-green-400)]" /> req/s</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-[var(--tm-orange-300)]" /> p95</span>
          </span>
        </span>
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="mt-2 h-24 w-full" aria-hidden>
          <polyline fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="stroke-[var(--tm-green-400)]" points={line(RPS)} />
          <polyline fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="stroke-[var(--tm-orange-300)]" points={line(LAT)} />
        </svg>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-border">
        {[
          ["POST /api/cart", "412 ms", "0.9%", true],
          ["GET /api/products", "128 ms", "0.1%", false],
          ["POST /api/checkout", "286 ms", "0.3%", false],
        ].map(([e, t, er, slow]) => (
          <span key={e as string} className="flex h-8 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b5 last:border-b-0">
            <span className={`min-w-0 flex-1 truncate ${MONO}`}>{e as string}</span>
            <span className={slow ? "text-[var(--tm-orange-600)]" : SUB}>{t as string}</span>
            <span className={`w-10 text-right ${SUB}`}>{er as string}</span>
            {slow && <span className="tag rounded-sm bg-[var(--tm-orange-000)] px-1.5 text-[var(--tm-orange-600)]">slows first</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- HyperExecute page: where the private cloud runs ---------- */

/* the clouds' own coloured logos (devicon, MIT) */
const CLOUD_LOGO = "/img/integrations/color";

export function CloudsScreen() {
  const clouds = [
    ["aws.svg", "AWS", "6 regions documented", "ok"],
    ["azure.svg", "Microsoft Azure", "Azure Native Integration", "ok"],
    ["googlecloud.svg", "Google Cloud", "On request", "plain"],
  ] as const;
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <div className="flex items-center gap-2">
        <Cloud size={16} strokeWidth={1.5} aria-hidden />
        <span className="text-b3 font-medium">Deploy HyperExecute to</span>
        <span className="ml-auto"><Pill tone="plain">Your account</Pill></span>
      </div>
      <span className={`mt-1 text-b5 ${SUB}`}>Your cloud account, or on-premise behind your firewall</span>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border border-border">
        {clouds.map(([img, n, note, tone], i) => (
          <span key={n} className={`flex h-10 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0 ${i === 0 ? "bg-[var(--tm-bg-fill)]" : ""}`}>
            <span className="button flex size-7 flex-none items-center justify-center rounded-md border border-border bg-surface">
              <img src={`${CLOUD_LOGO}/${img}`} alt="" className="!static size-5 object-contain !shadow-none ![animation:none]" />
            </span>
            <span className="flex-1 font-medium">{n}</span>
            <Pill tone={tone}>{tone === "ok" && <Check size={10} strokeWidth={2} aria-hidden />} {note}</Pill>
          </span>
        ))}
      </div>
      <div className={`mt-auto mb-4 flex items-center gap-2 text-b5 ${SUB}`}>
        <Info size={12} strokeWidth={1.5} aria-hidden /> The shared cloud stays the default and the fallback
      </div>
    </div>
  );
}

/* ---------- HyperExecute page: measure it on your own suite ----------

   One suite, pinned to one commit, run five times on the current grid and
   on HyperExecute at the same concurrency; the medians compared. `step`
   brings forward the part each of the four steps is about. */

const GRID_RUNS = ["41m 12s", "40m 58s", "42m 03s", "41m 30s", "41m 47s"];
const HE_RUNS = ["12m 21s", "12m 05s", "12m 40s", "12m 18s", "12m 33s"];

export function MeasureScreen({ step }: { step: number }) {
  const on = (k: number) => `transition-opacity duration-500 ${step === k ? "" : "opacity-40"}`;
  const Col = ({ name, runs, median, flaky, fast }: { name: string; runs: string[]; median: string; flaky: string; fast?: boolean }) => (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <span className={`flex h-9 items-center justify-between bg-[var(--tm-bg-fill)] px-3 text-b4 font-medium ${on(1)}`}>
        {name}
        <span className={`tag rounded-sm border border-border bg-surface px-1.5 text-b5 ${MONO}`}>concurrency 24</span>
      </span>
      <div className={`flex flex-col gap-1.5 px-3 py-2 ${on(2)}`}>
        {runs.map((r, i) => (
          <span key={i} className="flex items-center gap-2 text-b5">
            <span className={`w-10 ${SUB} ${MONO}`}>run {i + 1}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--tm-bg-fill)]">
              <span className={`block h-full ${fast ? "w-[30%] bg-[var(--tm-green-400)]" : "w-full bg-[var(--tm-gray-400)]"}`} />
            </span>
            <span className={`w-14 text-right ${MONO}`}>{r}</span>
          </span>
        ))}
      </div>
      <span className={`flex items-center justify-between border-t border-[var(--tm-border-muted)] px-3 py-2 ${on(3)}`}>
        <span className="flex flex-col">
          <span className={`text-b5 ${SUB}`}>Median</span>
          <span className="text-h5 font-medium">{median}</span>
        </span>
        <span className="flex flex-col items-end">
          <span className={`text-b5 ${SUB}`}>Results changed</span>
          <span className={`text-b4 font-medium ${fast ? "text-[var(--tm-fg-success)]" : "text-[var(--tm-red-500)]"}`}>{flaky}</span>
        </span>
      </span>
    </div>
  );
  return (
    <div className="flex h-full flex-col px-6 pt-5">
      <div className="flex items-center gap-2">
        <span className="text-b3 font-medium">checkout-regression</span>
        <span className={`tag flex items-center gap-1 rounded-sm border border-foreground px-1.5 text-b5 ${MONO} ${on(0)}`}>
          <Lock size={10} strokeWidth={1.5} aria-hidden /> commit 7be6f66
        </span>
        <span className={`ml-auto text-b5 ${SUB}`}>Same suite, same commit, 5 runs each</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Col name="Current grid" runs={GRID_RUNS} median="41m 30s" flaky="4.2%" />
        <Col name="HyperExecute" runs={HE_RUNS} median="12m 21s" flaky="0.3%" fast />
      </div>
      <div className={`mt-3 flex items-center justify-between rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-4 py-2.5 ${on(3)}`}>
        <span className="text-b4">Median wall-clock time</span>
        <Pill tone="ok"><Check size={10} strokeWidth={2} aria-hidden /> 70% faster on this suite</Pill>
      </div>
    </div>
  );
}
