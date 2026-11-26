import type { ReactNode } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  FileText,
  GitPullRequest,
  Globe,
  Lock,
  Map as MapIcon,
  MoreHorizontal,
  Plus,
  Smartphone,
  SquareTerminal,
  Star,
  Wand2,
  X,
} from "lucide-react";

/* Kane CLI page: product screens in the hero-fold look (Web redesign/
   retro-glitch): the IDE terminal on dark ink, white product windows with
   hairline controls, green "Passed" pills, mono for code. Every colour is
   a TestMu token. The copy inside each screen is Sameer's design file's
   (Kane-CLI-page-redesign), word for word. Drawn at a fixed size and
   scaled to its box with pieces/Screens' Fit. */

const MONO = "font-mono [&_*]:font-mono";
const SUB = "text-[var(--tm-fg-subtle)]";
const T_FG = "text-[var(--tm-fg-inverse)]";
const T_MUTED = "text-[var(--tm-fg-inverse-muted)]";
const T_OK = "text-[var(--tm-green-200)]";
const T_WARN = "text-[var(--tm-orange-200)]";
const T_FAIL = "text-[var(--tm-red-300)]";
const T_CMD = "text-[var(--tm-blue-200)]";

export function Pill({ tone, children }: { tone: "ok" | "red" | "blue" | "plain" | "warn"; children: ReactNode }) {
  const c = {
    ok: "bg-[var(--tm-green-500)] text-[var(--tm-fg-inverse)]",
    red: "bg-[var(--tm-red-500)] text-[var(--tm-fg-inverse)]",
    blue: "border border-[var(--tm-blue-500)] text-[var(--tm-blue-500)]",
    plain: "border border-border text-foreground",
    warn: "bg-[var(--tm-orange-000)] text-[var(--tm-orange-600)]",
  }[tone];
  return <span className={`pill inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-full px-2 text-b5 font-medium leading-4 ${c}`}>{children}</span>;
}

/* the IDE terminal of the hero videos */
export function Term({ path, tabs, on = 0, status, children }: { path: string; tabs: string[]; on?: number; status?: ReactNode; children: ReactNode }) {
  return (
    <div className={`flex h-full flex-col bg-[var(--tm-bg-inverse)] ${MONO}`}>
      <div className={`flex h-10 flex-none items-center gap-5 border-b border-[var(--tm-bg-inverse-muted)] px-5 text-b5 ${T_MUTED}`}>
        <span className={`flex items-center gap-2 ${T_FG}`}>
          <SquareTerminal size={14} strokeWidth={1.5} aria-hidden /> {path}
        </span>
        <span className="ml-auto flex items-center gap-4">
          {tabs.map((t, i) => (
            <span key={t} className={`flex h-10 items-center border-b-2 ${i === on ? `border-[var(--tm-hero-arrow)] ${T_FG}` : "border-transparent"}`}>
              {t}
            </span>
          ))}
          <span className="flex items-center gap-3">
            <Plus size={12} strokeWidth={1.5} aria-hidden />
            <MoreHorizontal size={12} strokeWidth={1.5} aria-hidden />
            <X size={12} strokeWidth={1.5} aria-hidden />
          </span>
        </span>
      </div>
      <div className={`flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-6 py-5 text-b3 ${T_FG}`}>{children}</div>
      {status && <div className={`flex h-8 flex-none items-center gap-4 border-t border-[var(--tm-bg-inverse-muted)] px-5 text-b5 ${T_MUTED}`}>{status}</div>}
    </div>
  );
}
export const L = ({ children, className = "" }: { children?: ReactNode; className?: string }) => (
  <p className={`h-7 min-w-0 truncate whitespace-pre leading-7 ${className}`}>{children}</p>
);
const Gap = () => <span className="h-2 flex-none" />;
const Rule = () => <span className="my-2 h-px flex-none bg-[var(--tm-bg-inverse-muted)]" />;
const Prompt = ({ children }: { children: ReactNode }) => (
  <L>
    <span className={T_MUTED}>$</span> <span className={T_CMD}>{children}</span>
  </L>
);
const Ask = ({ children }: { children: ReactNode }) => (
  <L>
    <span className={T_WARN}>›</span> {children}
  </L>
);

/* a light browser window: dots, the address and the browser name */
function Browser({ url, right, children }: { url: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-10 flex-none items-center gap-3 border-b border-border px-4">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-[var(--tm-border-default)]" />
          ))}
        </span>
        <span className={`input flex h-6 flex-1 items-center gap-2 rounded-md border border-border bg-[var(--tm-bg-fill)] px-2 text-b5 ${SUB}`}>
          <Lock size={10} strokeWidth={1.5} aria-hidden />
          <span className={MONO}>{url}</span>
        </span>
        {right}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ---------- hero: the TUI run beside the browser it drives ---------- */

const HERO_STEPS: [string, string, string][] = [
  ["open", "/shop/iphone", "1.3s"],
  ["click", "\"Add to cart\"", "2.2s"],
  ["fill", "email field", "2.9s"],
  ["click", "\"Continue\"", "3.4s"],
  ["assert", "email is shown", "1.8s"],
  ["assert", "total matches cart", "1.6s"],
];

export function HeroScreen() {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <Term path="~/shop" tabs={["tui", "--headless", "--agent"]} status={<><span className={T_OK}>●</span> authenticated · chrome<span className="ml-auto">Mode: run</span></>}>
        <Prompt>kane-cli --tui</Prompt>
        <Ask>Check out without signing in. Verify the email and the total.</Ask>
        <Rule />
        {HERO_STEPS.map(([v, t, s]) => (
          <L key={v + t}>
            <span className={T_OK}>✓</span> <span className="inline-block w-14">{v}</span> {t} <span className={T_MUTED}>{s}</span>
          </L>
        ))}
        <Gap />
        <L>
          <span className={`${T_OK} font-medium`}>PASSED</span> 6/6 steps in 41.6s
        </L>
        <L className={T_MUTED}>exit 0 · evidence r/7c41e</L>
      </Term>
      <Browser url="ecommerce-playground.io" right={<span className={`text-b5 ${SUB}`}>Chrome</span>}>
        <div className="flex h-full flex-col px-5 py-4">
          <span className="flex items-center justify-between">
            <span className="text-b3 font-medium">Playground store</span>
            <span className={`text-b5 ${SUB} ${MONO}`}>CART (0)</span>
          </span>
          <div className="mt-4 flex gap-4 rounded-lg border border-border p-3">
            <span className="grid size-20 flex-none place-items-center rounded-md bg-[var(--tm-bg-fill)]">
              <Smartphone size={28} strokeWidth={1.5} className={SUB} aria-hidden />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-b3 font-medium">iPhone</span>
              <span className="text-h5 font-medium">$146.00</span>
            </span>
          </div>
          <span className="input mt-4 flex h-9 items-center rounded-md border border-border px-3 text-b4">guest@example.com</span>
          <span className="button mt-3 flex h-9 items-center justify-center rounded-md border border-border text-b4 font-medium">Checkout as guest</span>
          <span className="button mt-2 flex h-9 items-center justify-center rounded-md bg-[var(--tm-button-primary)] text-b4 font-medium text-[var(--tm-fg-inverse)]">Continue</span>
          <span className="mt-auto flex items-center justify-between rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-3 py-2">
            <Pill tone="ok">
              <Check size={10} strokeWidth={2} aria-hidden /> PASSED
            </Pill>
            <span className={`text-b5 ${SUB}`}>2 of 2 checks</span>
          </span>
        </div>
      </Browser>
    </div>
  );
}

/* ---------- how it works: explore, plan, design, execute, report ---------- */

export function ExploreScreen() {
  const screens = Array.from({ length: 24 });
  return (
    <Term path="~/shop · exploration map" tabs={["explore"]}>
      <Prompt>kane-cli explore run --url https://shop.example.com</Prompt>
      <L className={T_MUTED}>· 20 cloud browsers</L>
      <Rule />
      <div className="mt-1 grid grid-cols-3 gap-2">
        {[
          ["38", "screens"],
          ["9", "flows"],
          ["2", "findings"],
        ].map(([n, k]) => (
          <span key={k} className="flex flex-col gap-1 rounded-md border border-[var(--tm-bg-inverse-muted)] px-3 py-2">
            <span className={`text-h4 ${n === "2" ? T_WARN : T_FG}`}>{n}</span>
            <span className={`text-b5 ${T_MUTED}`}>{k}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-8 gap-1.5">
        {screens.map((_, i) => (
          <span
            key={i}
            className={`h-6 rounded-sm border ${i === 9 || i === 17 ? "border-[var(--tm-orange-300)]" : "border-[var(--tm-bg-inverse-muted)]"} ${i % 5 === 0 ? "bg-[var(--tm-bg-inverse-muted)]" : ""}`}
          />
        ))}
      </div>
      <Gap />
      <L>
        <span className={T_OK}>✓</span> map saved <span className={T_MUTED}>· 2 findings flagged on the way</span>
      </L>
    </Term>
  );
}

export function PlanScreen() {
  return (
    <Term path="~/shop · kane-cli" tabs={["plan"]}>
      <Prompt>kane-cli --tui</Prompt>
      <Ask>Plan tests for the password reset spec</Ask>
      <Rule />
      <L>
        <span className={`${T_MUTED} inline-block w-12`}>MD</span> specs/password-reset.md <span className={T_OK}>read</span>
      </L>
      <L>
        <span className={`${T_MUTED} inline-block w-12`}>MAP</span> exploration · shop.example.com <span className={T_OK}>read</span>
      </L>
      <Gap />
      <L className={T_MUTED}>found 3 criteria</L>
      {[
        ["AC-1", "Reset link is emailed"],
        ["AC-2", "New password signs in"],
        ["AC-3", "Old password is rejected"],
      ].map(([k, v]) => (
        <L key={k}>
          <span className={`${T_CMD} inline-block w-12`}>{k}</span> {v}
        </L>
      ))}
      <Gap />
      <L>
        <span className={T_WARN}>?</span> Approve 3 criteria <span className={T_WARN}>›</span> <span className={T_OK}>yes</span>
      </L>
    </Term>
  );
}

export function DesignScreen() {
  return (
    <Term path="~/shop · kane-cli" tabs={["design"]}>
      <Ask>Write the tests</Ask>
      <Rule />
      {[
        ["reset_link_emailed.test.md", "AC-1"],
        ["new_password_signs_in.test.md", "AC-2"],
        ["old_password_rejected.test.md", "AC-3"],
      ].map(([f, a]) => (
        <L key={f}>
          <span className={T_OK}>+</span> {f} <span className={T_CMD}>→ {a}</span>
        </L>
      ))}
      <Gap />
      <L className={T_MUTED}>3 tests written, each linked to its criterion</L>
      <Gap />
      <L>
        <span className={T_WARN}>?</span> Review tests <span className={T_WARN}>›</span> <span className={T_OK}>approved</span>
      </L>
    </Term>
  );
}

export function ExecuteScreen() {
  return (
    <Term path="~/shop · kane-cli" tabs={["execute"]} status={<>Chrome · local · 3 tests</>}>
      <Prompt>kane-cli testrun run</Prompt>
      <L className={T_MUTED}>Chrome · local · 3 tests</L>
      <Rule />
      <L>
        <span className={T_OK}>✓</span> reset link is emailed <span className={T_MUTED}>4.1s</span>
      </L>
      <L>
        <span className={T_FAIL}>✕</span> new password signs in <span className={T_MUTED}>6.8s</span>
      </L>
      <L className={T_MUTED}>· old password is rejected   not run</L>
      <Gap />
      <L>
        <span className={T_OK}>1 passed</span> <span className={T_MUTED}>·</span> <span className={T_FAIL}>1 failed</span> <span className={T_MUTED}>· 1 not run</span>
      </L>
    </Term>
  );
}

export function ReportScreen() {
  const rows: [string, string, string, "ok" | "red" | "plain"][] = [
    ["AC-1", "Reset link is emailed", "✓ proven", "ok"],
    ["AC-2", "New password signs in", "✕ failed", "red"],
    ["AC-3", "Old password is rejected", "○ open", "plain"],
  ];
  return (
    <div className="flex h-full flex-col bg-surface px-6 pt-5">
      <div className="flex items-center gap-2">
        <FileText size={16} strokeWidth={1.5} aria-hidden />
        <span className="text-b3 font-medium">~/shop · kane-cli · report</span>
        <span className="ml-auto text-b4">
          Coverage <span className={SUB}>· 1 of 3 proven</span>
        </span>
      </div>
      <div className="mt-4 flex flex-col overflow-hidden rounded-lg border border-border">
        {rows.map(([k, v, s, t]) => (
          <div key={k} className="flex flex-col gap-2 border-b border-[var(--tm-border-muted)] px-4 py-3 last:border-b-0">
            <span className="flex items-center gap-3 text-b3">
              <span className={`w-10 text-b4 ${SUB} ${MONO}`}>{k}</span>
              <span className="flex-1">{v}</span>
              <Pill tone={t}>{s}</Pill>
            </span>
            {k === "AC-2" && (
              <span className="flex gap-1.5 pl-[48px]">
                {["screenshot", "console", "network", "steps"].map((x) => (
                  <span key={x} className={`tag rounded-sm border border-border bg-[var(--tm-bg-fill)] px-1.5 text-b5 ${MONO}`}>
                    {x}
                  </span>
                ))}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-4 py-3 text-b4">
        <span className="size-2 rounded-full bg-[var(--tm-green-500)]" />
        <span className="font-medium">Evidence sealed</span>
        <span className={`ml-auto ${SUB} ${MONO}`}>r/7c41e</span>
      </div>
    </div>
  );
}

/* ---------- what you get: surfaces, replay, coverage ---------- */

export function SurfacesScreen() {
  const devices: [string, string][] = [
    ["Web", "Chrome"],
    ["Android", "Emulator"],
    ["iOS", "Simulator"],
  ];
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className={`flex h-12 flex-none items-center gap-2 border-b border-border bg-[var(--tm-bg-inverse)] px-5 text-b4 ${MONO} ${T_FG}`}>
        <span className={T_MUTED}>~/my-app $</span>
        <span className={T_CMD}>kane-cli run "Log in and verify the home feed loads"</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-4 p-5">
        {devices.map(([d, k], i) => (
          <div key={d} className={`flex flex-col overflow-hidden border border-border ${i === 0 ? "rounded-lg" : "rounded-2xl"}`}>
            <span className="flex items-center justify-between border-b border-border px-3 py-2 text-b5">
              <span className="font-medium">{d}</span>
              <span className={SUB}>{k}</span>
            </span>
            <div className="flex flex-1 flex-col gap-2 p-3">
              <span className="h-3 w-2/3 rounded-sm bg-[var(--tm-bg-muted)]" />
              {[0, 1, 2].map((r) => (
                <span key={r} className="flex items-center gap-2">
                  <span className="size-6 flex-none rounded-full bg-[var(--tm-bg-fill)]" />
                  <span className="h-2 flex-1 rounded-sm bg-[var(--tm-bg-fill)]" />
                </span>
              ))}
              <span className="mt-auto">
                <Pill tone="ok">
                  <Check size={10} strokeWidth={2} aria-hidden /> feed loaded
                </Pill>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReplayScreen() {
  return (
    <div className="flex h-full flex-col bg-surface px-5 pt-4">
      <div className="flex items-center gap-2">
        <span className="text-b3 font-medium">Replay · step 3</span>
        <Pill tone="red">Failed</Pill>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {["Step 1", "Step 2", "Step 3", "Step 4"].map((s, i) => (
          <span
            key={s}
            className={`flex h-8 items-center justify-center rounded-md border text-b5 ${
              i === 2 ? "border-[var(--tm-red-300)] bg-[var(--tm-red-000)] font-medium text-[var(--tm-red-500)]" : i < 2 ? "border-[var(--tm-green-200)] bg-[var(--tm-green-000)]" : `border-border ${SUB}`
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 pb-4">
        <div className="flex flex-col overflow-hidden rounded-lg border border-border">
          <span className={`flex h-7 items-center bg-[var(--tm-bg-fill)] px-3 text-b5 ${SUB} ${MONO}`}>shop.example.com/cart</span>
          <div className="flex flex-1 flex-col justify-end gap-2 p-3">
            <span className="h-2 w-1/2 rounded-sm bg-[var(--tm-bg-fill)]" />
            <span className="h-2 w-2/3 rounded-sm bg-[var(--tm-bg-fill)]" />
            <span className="mt-2 flex items-center justify-between rounded-md border border-[var(--tm-red-300)] px-3 py-2">
              <span className="text-b4">Total</span>
              <span className="text-h5 font-medium text-[var(--tm-red-500)]">$152.00</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-1.5">
            {["screenshot", "console", "net"].map((t, i) => (
              <span key={t} className={`tag rounded-sm border px-1.5 text-b5 ${MONO} ${i === 0 ? "border-foreground" : `border-border ${SUB}`}`}>
                {t}
              </span>
            ))}
          </span>
          <div className={`flex flex-col gap-1 rounded-lg bg-[var(--tm-bg-inverse)] px-3 py-3 text-b5 ${MONO} ${T_FG}`}>
            <span className={T_FAIL}>✕ assert total = $146.00</span>
            <span className={T_MUTED}>got $152.00</span>
            <span className={T_MUTED}>console: 0 errors</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoverageScreen() {
  const rows: [string, string, boolean][] = [
    ["REQ-1", "Guest can check out", true],
    ["REQ-2", "Email is on the review", true],
    ["REQ-3", "Coupon applies once", false],
  ];
  const C = 2 * Math.PI * 30;
  return (
    <div className="flex h-full flex-col bg-surface px-5 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-b3 font-medium">
          Coverage · <span className="text-foreground">2</span> <span className={SUB}>of 3 proven</span>
        </span>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 items-center gap-6">
        <span className="relative grid size-28 flex-none place-items-center">
          <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r="30" fill="none" strokeWidth="8" className="stroke-[var(--tm-bg-fill)]" />
            <circle cx="40" cy="40" r="30" fill="none" strokeWidth="8" className="stroke-[var(--tm-green-400)]" strokeDasharray={`${C * 0.67} ${C}`} />
          </svg>
          <span className="pixel text-[24px]">67%</span>
        </span>
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border">
          {rows.map(([k, v, ok]) => (
            <span key={k} className="flex h-11 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0">
              <span className={`w-11 text-b5 ${SUB} ${MONO}`}>{k}</span>
              <span className="flex-1">{v}</span>
              <Pill tone={ok ? "ok" : "plain"}>{ok ? "Proven" : "Still open"}</Pill>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- made for agents and pipelines ---------- */

export function AgentScreen() {
  const rows: [string, ReactNode, string][] = [
    ["step", <>click "Continue"</>, "ok"],
    ["assert", <>AC-2 total <span className={T_MUTED}>$146.00</span> got <span className={T_FAIL}>$152.00</span></>, "fail"],
    ["shot", <>r/7c41e/3.png</>, "attached"],
    ["verdict", <>pass: false</>, "exit 1"],
  ];
  return (
    <Term path="kane-cli run … --agent" tabs={["NDJSON"]}>
      {rows.map(([k, v, s]) => (
        <L key={k}>
          <span className={T_MUTED}>{"{"}</span>
          <span className={`${T_CMD} inline-block w-20`}> "{k}"</span> {v}{" "}
          <span className={s === "ok" || s === "attached" ? T_OK : T_FAIL}>{s}</span>
          <span className={T_MUTED}> {"}"}</span>
        </L>
      ))}
      <Rule />
      <L>
        <span className={T_WARN}>◆</span> Claude Code reads the failure and patches the total
      </L>
    </Term>
  );
}

export function GateScreen() {
  return (
    <div className="flex h-full flex-col bg-surface px-5 pt-4">
      <div className="flex items-center gap-2">
        <GitPullRequest size={16} strokeWidth={1.5} aria-hidden />
        <span className="text-b3 font-medium">PR #482 · checks</span>
        <span className="ml-auto">
          <Pill tone="ok">
            <Check size={10} strokeWidth={2} aria-hidden /> All passed
          </Pill>
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-border px-4 py-3">
        <span className="grid size-5 place-items-center rounded-full bg-[var(--tm-green-500)] text-[var(--tm-fg-inverse)]">
          <Check size={12} strokeWidth={2} aria-hidden />
        </span>
        <span className="flex flex-col">
          <span className={`text-b4 font-medium ${MONO}`}>kane-cli / verify</span>
          <span className={`text-b5 ${SUB}`}>6 of 6 criteria proven · 41s</span>
        </span>
        <span className={`ml-auto text-b5 ${SUB}`}>evidence ↗</span>
      </div>
      <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg border border-border">
        {[
          ["0", "pass"],
          ["1", "fail"],
          ["2", "setup / auth"],
          ["3", "timeout"],
        ].map(([n, k], i) => (
          <span key={n} className={`flex flex-col gap-1 px-3 py-3 ${i ? "border-l border-border" : ""} ${i === 0 ? "bg-[var(--tm-green-000)]" : ""}`}>
            <span className="pixel text-[24px] leading-none">{n}</span>
            <span className={`text-b5 ${SUB}`}>{k}</span>
          </span>
        ))}
      </div>
      <span className={`tag mt-3 self-start rounded-sm border border-border bg-[var(--tm-bg-fill)] px-2 py-1 text-b5 ${MONO}`}>--headless --timeout 300</span>
    </div>
  );
}

export function HealStepScreen() {
  return (
    <div className="flex h-full flex-col bg-surface px-5 pt-4">
      <div className="flex items-center gap-2">
        <span className={`text-b3 font-medium`}>step 3 · click "Continue"</span>
        <span className="ml-auto">
          <Pill tone="ok">
            <Wand2 size={10} strokeWidth={2} aria-hidden /> Healed
          </Pill>
        </span>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--tm-red-200)] bg-[var(--tm-red-000)] px-4 py-3">
          <span className="text-b5 font-medium">Before</span>
          <span className={`text-b4 text-[var(--tm-red-500)] ${MONO}`}>#btn-continue</span>
        </div>
        <span className="flex items-center text-b3">→</span>
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-4 py-3">
          <span className="text-b5 font-medium">Re-found by meaning</span>
          <span className={`text-b4 text-[var(--tm-green-500)] ${MONO}`}>button "Continue"</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border px-4 py-3">
        <Lock size={16} strokeWidth={1.5} aria-hidden />
        <span className="flex flex-col">
          <span className={`text-b4 font-medium ${MONO}`}>AC-2 · total = $146.00</span>
          <span className={`text-b5 ${SUB}`}>Criteria locked. Never healed into a pass.</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- what teams can assure: one use case ---------- */

export type UseCase = { url: string; file: string; prompt: string; steps: string[]; must: string; bug?: boolean };

export function UseCaseScreen({ c }: { c: UseCase }) {
  return (
    <Browser url={c.url} right={<span className={`text-b5 ${SUB}`}>Real browser</span>}>
      <div className="flex h-full flex-col px-5 py-4">
        <span className="flex items-center gap-2">
          <FileText size={14} strokeWidth={1.5} aria-hidden />
          <span className={`text-b4 font-medium ${MONO}`}>{c.file}</span>
          {c.bug && (
            <span className="ml-auto">
              <Pill tone="red">Found a bug</Pill>
            </span>
          )}
        </span>
        <span className={`mt-3 rounded-md bg-[var(--tm-bg-inverse)] px-3 py-2 text-b5 ${MONO} ${T_FG}`}>
          <span className={T_MUTED}>$ kane-cli run</span> <span className={T_CMD}>“{c.prompt}”</span>
        </span>
        <div className="mt-3 flex flex-col overflow-hidden rounded-lg border border-border">
          {c.steps.map((s, i) => (
            <span key={s} className="flex h-10 items-center gap-3 border-b border-[var(--tm-border-muted)] px-3 text-b4 last:border-b-0">
              <span className={`grid size-5 place-items-center rounded-full bg-[var(--tm-bg-fill)] text-b5 ${MONO}`}>{i + 1}</span>
              <span className="flex-1">{s}</span>
              <Check size={14} strokeWidth={1.5} className="text-[var(--tm-fg-success)]" aria-hidden />
            </span>
          ))}
        </div>
        <span className="mt-auto flex flex-col gap-1 rounded-lg border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-4 py-3">
          <span className={`text-b5 uppercase tracking-[1px] ${SUB} ${MONO}`}>Must return</span>
          <span className="text-b3 font-medium">{c.must}</span>
        </span>
      </div>
    </Browser>
  );
}

/* ---------- resources: blog, docs, GitHub ---------- */

export function BlogCard() {
  return (
    <Browser url="testmuai.com/blog">
      <div className="flex h-full flex-col justify-end gap-2 bg-[var(--tm-bg-fill)] px-5 py-4">
        <span className="tag self-start rounded-sm border border-border bg-surface px-1.5 text-b5">Product</span>
        <span className="text-h5 font-medium">Introducing Kane CLI</span>
        <span className="h-2 w-2/3 rounded-sm bg-[var(--tm-bg-muted)]" />
      </div>
    </Browser>
  );
}

export function DocsCard() {
  return (
    <Term path="docs · quick start" tabs={["~2 min"]}>
      <Prompt>npm install -g @testmuai/kane-cli</Prompt>
      <Prompt>kane-cli run "…"</Prompt>
      <L className={T_OK}>✓</L>
    </Term>
  );
}

export function GitHubCard() {
  return (
    <Browser url="github.com">
      <div className="flex h-full flex-col px-5 py-4">
        <span className="flex items-center gap-2 text-b3">
          <Globe size={14} strokeWidth={1.5} aria-hidden />
          TestMu AI / <span className="font-medium">kane-cli</span>
          <span className="ml-auto flex items-center gap-1 text-b5">
            <Star size={12} strokeWidth={1.5} aria-hidden /> Star
          </span>
        </span>
        <span className="mt-3 flex gap-4 border-b border-border text-b4">
          {["Issues", "Roadmap", "Releases"].map((t, i) => (
            <span key={t} className={`-mb-px border-b-2 pb-2 ${i === 0 ? "border-[var(--tm-hero-arrow)] font-medium" : `border-transparent ${SUB}`}`}>
              {t}
            </span>
          ))}
        </span>
        <span className="mt-3 flex flex-col gap-2">
          {[0, 1, 2].map((r) => (
            <span key={r} className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--tm-green-400)]" />
              <span className="h-2 flex-1 rounded-sm bg-[var(--tm-bg-fill)]" />
            </span>
          ))}
        </span>
      </div>
    </Browser>
  );
}

/* tiny unused-import guard: keep the icon set tree-shaken */
export const _icons = { ChevronDown, Copy, MapIcon };
