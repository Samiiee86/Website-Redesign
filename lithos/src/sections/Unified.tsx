import { ArrowRight, BarChart3, ClipboardList, Smartphone } from "lucide-react";
import { products } from "../lib/content";
import { scenery } from "../lib/scenery";
import { DEMOS, type DemoKey } from "../components/Demos";
import { Reveal, Section } from "../lib/ui";

/* The Unified Quality Engineering fold, bento edition: the four AI flagship
   products get big cards with their live scripted demos on the paintings,
   and the three platform staples sit below as quiet content cards. One and
   a half screens instead of seven folds. */

const BIG_IDS = ["kane-ai", "agent-testing", "agent-assurance", "hyperexecute"];

const SMALL = [
  {
    icon: ClipboardList,
    name: "Test Manager",
    desc: "Centralized test case management with AI generation and two-way Jira & ADO sync.",
  },
  {
    icon: Smartphone,
    name: "Real Device Cloud",
    desc: "Manual and automated app testing on 10,000+ real iOS and Android devices.",
  },
  {
    icon: BarChart3,
    name: "Test Insights",
    desc: "AI-native test intelligence, analytics and reporting across every run.",
  },
];

const label = (tag: string) =>
  tag
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Ai", "AI")
    .replace("Hyperexecute", "HyperExecute");

function BigCard({ id }: { id: string }) {
  const tab = products.tabs.find((t) => t.id === id)!;
  const Demo = DEMOS[tab.demo as DemoKey];
  return (
    <div
      data-cursor={tab.cta}
      className="flex flex-col border border-border-muted bg-surface"
    >
      <div className="relative h-[380px] overflow-hidden">
        <img
          src={scenery[tab.scene as keyof typeof scenery]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-9">
          <div className="w-full max-w-[440px]">
            <Demo />
          </div>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {label(tab.tag)}
        </p>
        <h3 className="mt-2 text-[20px] leading-[1.25] tracking-tight md:text-[22px]">
          {tab.title}
        </h3>
        <button className="group/btn mt-4 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[14px] font-medium text-foreground">
          {tab.cta}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

export default function Unified() {
  return (
    <Section id="unified">
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="text-[34px] leading-[1.14] tracking-tight md:text-[42px]">
            <span className="block text-muted-foreground">
              TestMu AI (formerly LambdaTest)
            </span>
            <span className="block">{products.eyebrow}</span>
          </h2>
          <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
            {products.title}
          </p>
        </div>
        <button
          data-cursor="Start free"
          className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
        >
          Start free with Google
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {BIG_IDS.map((id) => (
            <BigCard key={id} id={id} />
          ))}
        </div>

        {/* the platform staples: content only, one quiet card each */}
        <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {SMALL.map(({ icon: Icon, name, desc }) => (
            <div
              key={name}
              data-cursor={name}
              className="group border border-border-muted bg-surface p-6 transition-colors duration-500 hover:bg-secondary/40"
            >
              <Icon
                size={20}
                className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
              />
              <h4 className="mt-5 text-[17px] tracking-tight">{name}</h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
