import { BarChart3, ClipboardList, Smartphone, Zap } from "lucide-react";
import { scenery } from "../lib/scenery";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products } from "../lib/content";
import { DEMOS, type DemoKey } from "../components/Demos";
import { Reveal, Section, ArrowChip, SlideArrow } from "../lib/ui";

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
          <SlideArrow />
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
          <h2>
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
                <h4 className="mt-5">{name}</h4>
                <p className="mt-2 text-b3 leading-relaxed text-muted-foreground">
                  {desc}
                </p>
                <button className="group/btn mt-4 inline-flex items-center gap-1.5 self-start border-b border-foreground pb-0.5 text-b3 font-medium text-foreground">
                  Learn more
                  <SlideArrow />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
  );
}

/* --- rows edition (default) ---------------------------------------------
   The platform products as alternating rows, after devin.ai: copy on one
   side (product tag, heading, body, three proof points, link), the live
   demo on a painting opposite. No numbered flow; the Flow diagram above
   already tells that story. */

const STEPS = [
  {
    id: "test-manager",
    title: "Turn requirements into tests with AI",
    body: "Test Manager writes test cases from your stories with AI, keeps every manual and automated run in one place, and syncs both ways with Jira and Azure DevOps.",
    points: [
      "AI writes test cases from your requirements",
      "Manual and automated runs side by side",
      "Two-way sync with Jira and Azure DevOps",
    ],
    product: "Test Manager",
    icon: ClipboardList,
    scene: scenery.meadow,
  },
  {
    id: "hyperexecute",
    title: "Run what KaneAI writes, up to 70% faster",
    body: "Tests authored in KaneAI, or your own suites, run on HyperExecute. AI-native orchestration splits, retries and reports every run on a secure, scalable cloud.",
    points: [
      "Smart test splitting and auto-retries",
      "Selenium, Playwright, Cypress and more",
      "Logs, video and reports for every job",
    ],
    product: "HyperExecute",
    icon: Zap,
    scene: scenery.wetland,
  },
  {
    id: "real-device-cloud",
    title: "Test on the real devices your users hold",
    body: "Point KaneAI or your own suites at 10,000+ real iOS and Android devices, in a public, dedicated or on-premise cloud.",
    points: [
      "Latest and legacy iPhone, Pixel and Galaxy models",
      "Network throttling, geolocation and biometrics",
      "Live UI inspector, logs and session video",
    ],
    product: "Real Device Cloud",
    icon: Smartphone,
    scene: scenery.hills,
  },
  {
    id: "test-insights",
    title: "Let AI tell you what is safe to ship",
    body: "AI-native analytics find flaky tests and the root cause of every failure, so each release call is made on data instead of a hunch.",
    points: [
      "Flaky test detection across every run",
      "AI root cause for failed tests",
      "Custom dashboards for each team",
    ],
    product: "Test Insights",
    icon: BarChart3,
    scene: scenery.dunes,
  },
];

function StepRows() {
  return (
    <div className="-mx-8">
      {STEPS.map((step, i) => {
        const tab = products.tabs.find((t) => t.id === step.id)!;
        const Demo = DEMOS[tab.demo as DemoKey];
        const Icon = step.icon;
        const flip = i % 2 === 1;
        return (
          <div
            key={step.id}
            className={`grid grid-cols-[minmax(0,1fr)] gap-10 px-8 py-12 last:pb-0 md:py-14 md:last:pb-0 lg:gap-14 ${
              flip
                ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
                : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
            }`}
          >
            <Reveal
              className={`flex flex-col justify-end ${flip ? "lg:order-2" : ""}`}
            >
              <p className="mono flex items-center gap-2.5 text-b4 uppercase tracking-[0.18em] text-muted-foreground">
                <Icon size={15} className="text-foreground" />
                {step.product}
              </p>
              <h3 className="mt-5">{step.title}</h3>
              <p className="mt-4 max-w-[480px] text-b1 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <button className="group/btn mt-6 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-b3 font-medium text-foreground">
                {tab.cta}
                <SlideArrow />
              </button>
            </Reveal>

            <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
              <div
                data-cursor={step.product}
                className="relative flex h-[380px] items-center justify-center overflow-hidden border border-border px-6 md:h-[540px] md:px-12"
              >
                <img
                  src={step.scene}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="relative w-full max-w-[560px]">
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

/* --- switcher edition (options page) -----------------------------------------
   One large frame at a time: the product list on the left, the selected
   product's live demo filling a painted stage on the right. It advances on
   its own and holds while the pointer is over the fold. */

const ADVANCE_MS = 9000;

function ProductSwitcher() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  const step = STEPS[active];
  const tab = products.tabs.find((t) => t.id === step.id)!;
  const Demo = DEMOS[tab.demo as DemoKey];

  return (
    <Reveal delay={0.08}>
      <div
        className="-mx-8 grid grid-cols-[minmax(0,1fr)] border-y border-border bg-surface lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div role="tablist" aria-label="Platform products" className="flex flex-col border-border max-lg:border-b lg:border-r">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            const t = products.tabs.find((x) => x.id === s.id)!;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`group/btn relative border-b border-border px-8 py-6 text-left transition-colors duration-300 last:border-b-0 lg:flex-1 ${
                  on ? "bg-surface" : "bg-background/60 hover:bg-background"
                }`}
              >
                {/* progress along the top edge of the open row */}
                {on && (
                  <motion.span
                    key={`bar-${active}-${paused}`}
                    aria-hidden
                    initial={{ scaleX: paused || reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused || reduce ? 0 : ADVANCE_MS / 1000, ease: "linear" }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
                  />
                )}
                <span className="flex items-center gap-3">
                  <Icon size={18} className={on ? "text-foreground" : "text-muted-foreground"} />
                  <span className={`text-b1 font-medium tracking-tight ${on ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.product}
                  </span>
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-3 block text-b2 leading-relaxed text-muted-foreground">
                        {s.body}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 border-b border-foreground pb-1 text-b3 font-medium text-foreground">
                        {t.cta}
                        <SlideArrow />
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* the one large frame */}
        <div
          role="tabpanel"
          data-cursor={step.product}
          className="relative min-h-[460px] overflow-hidden md:min-h-[600px]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={step.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center px-6 md:px-14"
            >
              <img
                src={step.scene}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-white/20" />
              <motion.div
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[640px]"
              >
                <Demo />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

export type UnifiedVariant = "rows" | "switcher" | "bento";

export default function Unified({ variant = "rows" }: { variant?: UnifiedVariant }) {
  return (
    <Section id="unified">
      <UnifiedHeading />
      {variant === "bento" ? <BentoGrid /> : variant === "rows" ? <StepRows /> : <ProductSwitcher />}
    </Section>
  );
}
