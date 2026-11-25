import { Panel, Rows } from "./ChoosePanels";

/* Small TestMu AI views the device-cloud pages share in their "when to
   choose" bento (BrowserStack, Sauce Labs, Perfecto). Each takes the
   scene behind it, so a page can keep every scene different. */

export const realDevices = (scene: string) => (
  <Panel title="Real devices" note="50,000+" scene={scene}>
    <Rows
      rows={[
        { name: "iPhone 16 Pro", sub: "iOS 18", tag: "Real device", ok: true },
        { name: "Galaxy S25", sub: "Android 15", tag: "Real device", ok: true },
        { name: "Pixel 9", sub: "Android 15", tag: "Real device", ok: true },
      ]}
    />
  </Panel>
);

export const deployment = (scene: string) => (
  <Panel title="Where it runs" scene={scene}>
    <Rows
      rows={[
        { name: "Shared cloud", sub: "Every plan", tag: "Available", ok: true },
        { name: "Private cloud", sub: "Dedicated devices", tag: "Enterprise" },
        { name: "On-premise", sub: "Inside your own network", tag: "Enterprise" },
      ]}
    />
  </Panel>
);

export const hyperexecute = (scene: string) => (
  <Panel title="HyperExecute" note="Up to 70% faster" scene={scene}>
    <Rows
      rows={[
        { name: "Smart test splitting", sub: "Spreads tests across machines", tag: "Built in", ok: true },
        { name: "Automatic retries", sub: "Re-runs flaky tests", tag: "Built in", ok: true },
        { name: "Logs, video and reports", sub: "In one place for every run", tag: "Built in", ok: true },
      ]}
    />
  </Panel>
);

export const kanePlans = (scene: string) => (
  <Panel title="KaneAI" note="Per agent a month, billed annually" scene={scene}>
    <Rows
      rows={[
        { name: "Starter", sub: "$17", tag: "Web tests" },
        { name: "Pro", sub: "$89", tag: "Plus API and database checks" },
        { name: "Max", sub: "$179", tag: "Plus native mobile apps" },
      ]}
    />
  </Panel>
);
