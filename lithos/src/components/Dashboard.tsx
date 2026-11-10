import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Gauge,
  HelpCircle,
  Home,
  KeyRound,
  Layers,
  MonitorSmartphone,
  Radar,
  ScanEye,
  Settings,
  Sparkles,
  Telescope,
  Zap,
} from "lucide-react";

/* A close read of the real TestMu AI dashboard: icon rail, product grid,
   Kane CLI promo, quick links, integrations and the empty Recents state. */

const RAIL = [
  Home,
  Sparkles,
  Radar,
  Layers,
  ScanEye,
  MonitorSmartphone,
  Gauge,
  Telescope,
  Zap,
  CirclePlus,
  Settings,
];

const PRODUCTS = [
  {
    name: "KaneAI",
    desc: "Plan, author, and evolve end-to-end tests using KaneAI agents.",
    action: "Try now",
  },
  {
    name: "Test Manager",
    desc: "Plan runs, create test cases, track execution, and get coverage visibility.",
    action: "Try now",
  },
  {
    name: "Agent Testing",
    desc: "Deploy autonomous AI evaluators for chatbots, voice assistants and calling agents.",
    action: "Try now",
  },
  {
    name: "Automation",
    desc: "Execute web and app automation tests on desktop and mobile devices.",
    action: "View builds",
  },
  {
    name: "Real Device",
    desc: "Exploratory tests for native and web apps on real devices.",
    action: "Start Testing",
  },
  {
    name: "HyperExecute",
    desc: "Run any kind of automated tests, blazingly fast. Made for enterprises.",
    action: "View builds",
  },
];

const QUICK_LINKS = [
  "Account settings",
  "API docs",
  "Changelog",
  "Support docs",
];

const INTEGRATIONS = [
  "#E16F24",
  "#5273EC",
  "#0B1B58",
  "#1637B3",
  "#121212",
  "#E16F24",
  "#98AEFE",
  "#7F7F7E",
  "#5273EC",
  "#FB8F44",
  "#4AC26B",
  "#121212",
];

export default function Dashboard() {
  const [active, setActive] = useState(0);

  return (
    <div className="select-none overflow-hidden  bg-surface text-[10px] text-foreground">
      <div className="flex">
        {/* icon rail */}
        <aside className="hidden w-[46px] shrink-0 flex-col items-center gap-4 border-r border-border-muted py-3 sm:flex">
          <span className="flex h-6 w-6 items-center justify-center  bg-foreground">
            <img src="/testmu-logo-white.svg" alt="" className="h-2.5 w-auto" />
          </span>
          {RAIL.map((Icon, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex h-7 w-7 items-center justify-center  transition-colors ${
                active === i
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70"
              }`}
            >
              <Icon size={14} />
            </button>
          ))}
          <div className="mt-auto flex flex-col items-center gap-3 text-muted-foreground">
            <HelpCircle size={14} />
            <KeyRound size={14} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* top bar */}
          <div className="flex items-center gap-3 border-b border-border-muted px-4 py-2.5">
            <span className="font-medium">Home</span>
            <div className="ml-auto flex items-center gap-2.5 text-muted-foreground">
              <Bell size={13} />
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BC4C00] text-[10px] font-medium text-white">
                S
              </span>
              <span className=" bg-[#E16F24] px-2.5 py-1 text-[10px] font-medium text-white">
                Upgrade Now
              </span>
            </div>
          </div>

          <div className="flex gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium">
                  Agentic Platform for Quality Engineering
                </p>
                <span className=" border border-border-muted px-2.5 py-1 text-[10px]">
                  Invite members
                </span>
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.name}
                    className=" border border-border-muted p-3 transition-colors hover:border-border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center  border border-border-muted">
                        <Sparkles size={10} className="text-muted-foreground" />
                      </span>
                      <span className="text-[12px] font-medium">
                        {p.name}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] leading-[1.6] text-muted-foreground">
                      {p.desc}
                    </p>
                    <p className="mt-3 text-[10px] text-[#5273EC]">
                      {p.action} ↗
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-center text-[10px] text-[#5273EC]">
                View more ⌄
              </p>

              <p className="mt-4 text-[12px] font-medium">Recents</p>
              <div className="mt-2 flex flex-col items-center justify-center  border border-dashed border-border-muted py-8">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
                  <ScanEye size={13} />
                </span>
                <p className="mt-3 text-[10px] font-medium">
                  No recent tests so far
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Seems like you have not run any tests yet. Try out real time
                  testing now.
                </p>
                <span className="mt-3  bg-[#1A7F37] px-3 py-1.5 text-[10px] font-medium text-white">
                  Start Testing
                </span>
              </div>
            </div>

            {/* right column */}
            <div className="hidden w-[220px] shrink-0 flex-col gap-4 lg:flex">
              <div className="overflow-hidden  bg-[#EEF2FF] p-3">
                <div className="flex items-start justify-between">
                  <p className="text-[14px] font-semibold tracking-tight">
                    Kane CLI
                  </p>
                  <span className=" bg-[#1A7F37] px-2 py-0.5 text-[10px] font-medium text-white">
                    Try for Free →
                  </span>
                </div>
                <p className="mt-1 text-[10px] font-medium leading-snug">
                  Browser Automation Tool for Testing
                </p>
                <div className="mono mt-2.5  bg-[#121212] px-2 py-2 text-[10px] leading-[1.7] text-[#d3d2cd]">
                  <p>$ kane-cli login</p>
                  <p className="text-white/50">
                    Opening browser for authentication...
                  </p>
                  <p className="text-[#6FDD8B]">
                    ✓ Logged in as dev@example.com
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-medium">Quick links</p>
                <ul className="mt-2 flex flex-col gap-2 border-t border-border-muted pt-2">
                  {QUICK_LINKS.map((l) => (
                    <li
                      key={l}
                      className="flex items-center gap-2 text-[10px] text-muted-foreground"
                    >
                      <ChevronRight size={10} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-medium">Integrations</p>
                  <span className="text-[10px] text-[#5273EC]">View all</span>
                </div>
                <div className="mt-2 grid grid-cols-6 gap-2">
                  {INTEGRATIONS.map((c, i) => (
                    <span
                      key={i}
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">
        <ChevronDown />
      </span>
    </div>
  );
}
