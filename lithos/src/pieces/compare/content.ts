import { yes } from "./cells";
import type { MatrixGroup, MatrixRival } from "./MatrixTable";
import type { SpecRow } from "../SpecTable";

/* The words shown in the pieces library. Swap these for real page copy;
   the pieces themselves hold no content.

   - duel: from the live "BrowserStack alternative" page.
   - spec: from the live API load testing page. Each tool's `href` is a
     placeholder ("#top"); point it at that tool's docs page.
   - the two matrices: sample content against generic options, not real
     products, so nothing here states a fact about a named competitor. */

/* ---------- head to head ---------- */

export const duel: MatrixGroup[] = [
  {
    label: "Manual testing",
    rows: [
      { name: "ChromeOS testing", values: [true, false] },
      {
        name: "Geolocation, throttling, WCAG",
        values: [true, "Not in $29 or $39 plans"],
      },
      {
        name: "Idle timeout",
        values: [
          "Up to 60 minutes",
          "10 minutes",
        ],
      },
      { name: "Free access", values: [true, "One-time 30-minute trial"] },
      {
        name: "Desktop price, unlimited minutes",
        values: [
          "$15/mo per session",
          "$29/mo per user",
        ],
      },
      {
        name: "Real device price",
        values: [
          "$39/mo, apps included",
          "$39/mo, browsers only",
        ],
      },
    ],
  },
  {
    label: "Automation",
    rows: [
      {
        name: "Test orchestration",
        values: [
          "Up to 70% faster",
          "Rerun, fail fast, skip flaky",
        ],
      },
      { name: "Load testing", values: [true, "Separate Load Testing product"] },
      {
        name: "Selenium grid queue",
        values: [
          "Parallels plus 150",
          "5, or equal to parallels",
        ],
      },
    ],
  },
];

/* ---------- matrix, three options ---------- */

/* TestMu AI stands between these two (oursAt={1}) */
export const threeRivals: MatrixRival[] = [
  { name: "A grid you host" },
  { name: "A rented grid" },
];

export const threeGroups: MatrixGroup[] = [
  {
    label: "",
    rows: [
      { name: "Writes the test from plain English", values: [true, false, false] },
      {
        name: "Heals tests when the page changes",
        values: [true, false, "Add-on"],
      },
      { name: "Tells you why a test failed", values: [true, false, "Limited"] },
      {
        name: "Runs tests side by side",
        values: [yes("Unlimited"), yes("By hardware"), yes("By plan")],
      },
      {
        name: "Real phones and tablets",
        values: [yes("10,000+"), "What you buy", yes("By plan")],
      },
      {
        name: "Browsers and operating systems",
        values: [yes("3,000+"), yes("What you install"), yes("3,000+")],
      },
      {
        name: "SOC 2 Type II and ISO 27001",
        values: [true, "Your job", true],
      },
      {
        name: "Someone answers at 3am",
        values: [true, false, yes("By plan")],
      },
    ],
  },
];

/* ---------- matrix, five options ---------- */

export const fiveRivals: MatrixRival[] = [
  { name: "Device cloud" },
  { name: "In-house grid" },
  { name: "Emulators" },
  { name: "Manual QA" },
];

export const fiveGroups: MatrixGroup[] = [
  {
    label: "Writing tests",
    rows: [
      {
        name: "Write tests in plain English",
        values: [true, false, false, false, false],
      },
      {
        name: "Self-healing tests",
        values: [true, "Add-on", false, false, false],
      },
    ],
  },
  {
    label: "Running tests",
    rows: [
      {
        name: "Parallel test runs",
        values: [yes("Unlimited"), "By plan", "By hardware", "By laptop", false],
      },
      {
        name: "Real devices",
        values: [yes("10,000+"), yes("By plan"), "What you buy", false, "What you own"],
      },
      {
        name: "Runs on every commit",
        values: [true, true, true, true, false],
      },
    ],
  },
  {
    label: "Finding the cause",
    rows: [
      {
        name: "AI root cause analysis",
        values: [true, "Limited", false, false, false],
      },
      {
        name: "Video, logs and network per test",
        values: [true, true, "Build it", false, false],
      },
    ],
  },
  {
    label: "Trust",
    rows: [
      {
        name: "SOC 2 Type II and ISO 27001",
        values: [true, true, "Your job", "Your job", "Your job"],
      },
    ],
  },
];

/* ---------- spec sheet ---------- */

export const specColumns = [
  "Tool",
  "Plan format",
  "Runs natively on TestMu AI",
  "Where it fits",
];

export const specRows: SpecRow[] = [
  {
    name: "Apache JMeter",
    href: "#top",
    cells: [
      { code: ".jmx" },
      { ok: true, text: "Portal project type" },
      "Large existing plans, GUI authoring, CSV data",
    ],
  },
  {
    name: "Gatling",
    href: "#top",
    cells: [
      { text: "Java DSL", code: ".java" },
      { ok: true, text: "Portal and hyperexecute.yaml" },
      "Load as code, versioned with the service",
    ],
  },
  {
    name: "k6",
    href: "#top",
    cells: [
      { text: "JavaScript", code: ".js" },
      { ok: true, text: "YAML and CLI driven" },
      "Script-first teams already on k6",
    ],
  },
];
