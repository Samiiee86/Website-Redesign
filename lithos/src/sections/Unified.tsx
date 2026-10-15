import { ArrowRight, BarChart3, ClipboardList, Smartphone } from "lucide-react";
import { products } from "../lib/content";
import { DEMOS, type DemoKey } from "../components/Demos";
import { Reveal, Section } from "../lib/ui";

/* The Unified Quality Engineering fold, bento edition: the four AI flagship
   products get big cards with their live scripted demos on the paintings,
   and the three platform staples sit below as quiet content cards. One and
   a half screens instead of seven folds. */

const BIG_IDS = ["kane-ai", "agent-testing", "agent-assurance", "hyperexecute"];

const BLURBS: Record<string, { name: string; rest: string }> = {
  "kane-ai": {
    name: "Kane AI",
    rest: "plans, authors and evolves end-to-end tests from plain language.",
  },
  "agent-testing": {
    name: "Agent Testing",
    rest: "evaluates chat, voice and video agents for hallucination, tone and compliance.",
  },
  "agent-assurance": {
    name: "Agent Assurance",
    rest: "proves how your agents behave across real workflows and tools.",
  },
  hyperexecute: {
    name: "HyperExecute",
    rest: "tears through your whole suite on a blazing-fast orchestration cloud.",
  },
};

const SMALL = [
  {
    icon: ClipboardList,
    name: "Test Manager",
    desc: "Centralized test case management with AI generation and two-way Jira & ADO sync.",
    cta: "More About Test Management",
  },
  {
    icon: Smartphone,
    name: "Real Device Cloud",
    desc: "Manual and automated app testing on 10,000+ real iOS and Android devices.",
    cta: "More About Real Device Cloud",
  },
  {
    icon: BarChart3,
    name: "Test Insights",
    desc: "AI-native test intelligence, analytics and reporting across every run.",
    cta: "More About Test Insights",
  },
];

function BigCard({ id, index }: { id: string; index: number }) {
  const tab = products.tabs.find((t) => t.id === id)!;
  const Demo = DEMOS[tab.demo as DemoKey];
  const edges = [
    index % 2 === 0 ? "md:border-r" : "",
    index < 2 ? "md:border-b" : "",
    index < 3 ? "max-md:border-b" : "",
  ].join(" ");
  const blurb = BLURBS[id];
  return (
    <div
      data-cursor={tab.cta}
      className={`flex flex-col border-border-muted bg-surface ${edges}`}
    >
      {/* chatbase-style card: the sentence leads, the demo sits below and
          melts out of the card's bottom edge */}
      <div className="min-h-[150px] px-7 pb-2 pt-8 md:px-9">
        <h3 className="max-w-[460px] text-[19px] leading-[1.4] tracking-tight md:text-[21px]">
          <span className="font-semibold text-foreground">{blurb.name}</span>{" "}
          <span className="font-normal text-muted-foreground">{blurb.rest}</span>
        </h3>
        <button className="group/btn mt-3 inline-flex items-center gap-1.5 border-b border-foreground pb-0.5 text-[13px] font-medium text-foreground">
          Learn more
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-x-0 top-5 flex justify-center px-7 md:px-9">
          <div
            className={`w-full max-w-[560px] ${tab.demo === "assurance" ? "scale-[0.62]" : "scale-[0.78]"}`}
            style={{ transformOrigin: "top center" }}
          >
            <Demo />
          </div>
        </div>
        {tab.demo !== "assurance" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[hsl(var(--surface))] to-transparent" />
        )}
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
        <div className="-mx-8 border border-border-muted bg-surface">
          <div className="grid md:grid-cols-2">
            {BIG_IDS.map((id, i) => (
              <BigCard key={id} id={id} index={i} />
            ))}
          </div>

          {/* the platform staples ride the same surface, one row below */}
          <div className="grid border-t border-border-muted sm:grid-cols-3">
            {SMALL.map(({ icon: Icon, name, desc }, i) => (
              <div
                key={name}
                data-cursor={name}
                className={`group flex flex-col p-6 transition-colors duration-500 hover:bg-secondary/40 md:p-7 ${
                  i < 2 ? "border-border-muted max-sm:border-b sm:border-r" : ""
                }`}
              >
                <Icon
                  size={20}
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                />
                <h4 className="mt-5 text-[17px] tracking-tight">{name}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {desc}
                </p>
                <button className="group/btn mt-4 inline-flex items-center gap-1.5 self-start border-b border-foreground pb-0.5 text-[13px] font-medium text-foreground">
                  Learn more
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
