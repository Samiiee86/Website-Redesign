import { ArrowRight, BarChart3, ClipboardList, Smartphone, Zap } from "lucide-react";
import { scenery } from "../lib/scenery";
import { products } from "../lib/content";
import { DEMOS, type DemoKey } from "../components/Demos";
import { Reveal, Section, ArrowChip } from "../lib/ui";

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
      className={`flex flex-col border-border bg-surface ${edges}`}
    >
      {/* chatbase-style card: the sentence leads, the demo sits below and
          melts out of the card's bottom edge */}
      <div className="min-h-[150px] px-7 pb-2 pt-8 md:px-9">
        <p className="max-w-[460px] text-b1 font-medium leading-[1.4] tracking-tight">
          <span className="font-semibold text-foreground">{blurb.name}</span>{" "}
          <span className="font-normal text-muted-foreground">{blurb.rest}</span>
        </p>
        <button className="group/btn mt-3 inline-flex items-center gap-1.5 border-b border-foreground pb-0.5 text-b3 font-medium text-foreground">
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

function UnifiedHeading() {
  return (
    <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14 xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* on wide screens the first line holds together and the second
              wraps once, so the heading sets in three lines */}
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground xl:whitespace-nowrap">
              TestMu AI (formerly LambdaTest)
            </span>
            <span className="block">{products.eyebrow}</span>
          </h2>
          <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
            {products.title}
          </p>
        </div>
        <button
          data-cursor="Start free"
          className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8"
        >
          Start free with Google
          <ArrowChip />
        </button>
      </Reveal>

  );
}

/* previous edition, kept for the options page: four flagship cards with
   live demos over three platform staples */
function BentoGrid() {
  return (
      <Reveal delay={0.08}>
        <div className="-mx-8 border-y border-border bg-surface">
          <div className="grid md:grid-cols-2">
            {BIG_IDS.map((id, i) => (
              <BigCard key={id} id={id} index={i} />
            ))}
          </div>

          {/* the platform staples ride the same surface, one row below */}
          <div className="grid border-t border-border sm:grid-cols-3">
            {SMALL.map(({ icon: Icon, name, desc }, i) => (
              <div
                key={name}
                data-cursor={name}
                className={`group flex flex-col p-6 transition-colors duration-500 hover:bg-secondary/40 md:p-7 ${
                  i < 2 ? "border-border max-sm:border-b sm:border-r" : ""
                }`}
              >
                <Icon
                  size={20}
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                />
                <h4 className="mt-5 tracking-tight">{name}</h4>
                <p className="mt-2 text-b3 leading-relaxed text-muted-foreground">
                  {desc}
                </p>
                <button className="group/btn mt-4 inline-flex items-center gap-1.5 self-start border-b border-foreground pb-0.5 text-b3 font-medium text-foreground">
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
  );
}

/* --- steps edition (default) --------------------------------------------
   The platform products as one quality loop, after devin.ai's numbered
   rows: copy settles at the foot of its column, the live demo sits on a
   painting opposite, and the sides alternate down the page. Changed from
   the reference: hairline rows inside the page box, a product tag and a
   mono step label, and our own painted plates. */

const STEPS = [
  {
    id: "test-manager",
    label: "Plan",
    title: "Plan and manage every test",
    body: "Create test cases with AI, manage and run them in one place, and keep Jira and Azure DevOps in sync both ways.",
    product: "Test Manager",
    icon: ClipboardList,
    scene: scenery.meadow,
  },
  {
    id: "hyperexecute",
    label: "Run",
    title: "Run the whole suite in minutes",
    body: "Up to 70% faster than any cloud grid. AI-native orchestration splits, retries and reports every run on a secure, scalable cloud.",
    product: "HyperExecute",
    icon: Zap,
    scene: scenery.wetland,
  },
  {
    id: "real-device-cloud",
    label: "Cover",
    title: "Test on the devices your users hold",
    body: "Manual and automated testing on 10,000+ real iOS and Android devices, in a public, dedicated or on-premise cloud.",
    product: "Real Device Cloud",
    icon: Smartphone,
    scene: scenery.hills,
  },
  {
    id: "test-insights",
    label: "Decide",
    title: "Know what is safe to ship",
    body: "AI-native analytics show where tests fail and why, so every release call is made on data instead of a hunch.",
    product: "Test Insights",
    icon: BarChart3,
    scene: scenery.dunes,
  },
];

function StepRows() {
  return (
    <div className="-mx-8 border-t border-border">
      {STEPS.map((step, i) => {
        const tab = products.tabs.find((t) => t.id === step.id)!;
        const Demo = DEMOS[tab.demo as DemoKey];
        const Icon = step.icon;
        const flip = i % 2 === 1;
        return (
          <div
            key={step.id}
            className="grid grid-cols-[minmax(0,1fr)] gap-10 border-b border-border px-8 py-12 last:border-b-0 md:py-16 lg:grid-cols-2 lg:gap-16"
          >
            <Reveal
              className={`flex flex-col justify-end ${flip ? "lg:order-2" : ""}`}
            >
              <p className="flex items-baseline gap-4">
                <span className="pixel text-[44px] leading-none text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-b4 uppercase tracking-[0.22em] text-muted-foreground">
                  {step.label}
                </span>
              </p>
              <h3 className="mt-6 tracking-tight">{step.title}</h3>
              <p className="mt-4 max-w-[460px] text-b1 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <span className="inline-flex items-center gap-2 border border-border bg-surface px-2.5 py-1 text-b3 text-foreground">
                  <Icon size={14} />
                  {step.product}
                </span>
                <button className="group/btn inline-flex items-center gap-2 border-b border-foreground pb-1 text-b3 font-medium text-foreground">
                  {tab.cta}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
              <div
                data-cursor={step.product}
                className="relative flex h-[380px] items-center justify-center overflow-hidden border border-border px-6 md:h-[420px] md:px-12"
              >
                <img
                  src={step.scene}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-white/25" />
                <div className="relative w-full max-w-[500px]">
                  <Demo />
                </div>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

export type UnifiedVariant = "steps" | "bento";

export default function Unified({ variant = "steps" }: { variant?: UnifiedVariant }) {
  return (
    <Section id="unified" className={variant === "steps" ? "!pb-0 md:!pb-0" : ""}>
      <UnifiedHeading />
      {variant === "bento" ? <BentoGrid /> : <StepRows />}
    </Section>
  );
}
