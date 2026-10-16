import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Code2,
  Eye,
  LayoutGrid,
  Link2,
  Loader2,
  MousePointerClick,
  Smartphone,
  Sparkles,
  Telescope,
  TextCursorInput,
  Zap,
} from "lucide-react";
import { pioneer } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, Section } from "../lib/ui";

const SCENES = [scenery.grassea, scenery.chalkcliff];
const EASE = [0.16, 1, 0.3, 1] as const;

/* Both panels are drawn in code so they can replay from the start whenever
   their card becomes active. At rest they hold their finished state, so the
   section reads completely without any hover. */

const rise = (play: boolean, at: number) =>
  play
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: at, duration: 0.4, ease: EASE },
      }
    : { initial: false as const, animate: { opacity: 1, y: 0 } };

const STEPS = [
  { icon: Link2, text: "Go to www.testmuai.com", tone: "text-foreground", w: "76%" },
  { icon: MousePointerClick, text: "Click on login", tone: "text-muted-foreground/70", w: "82%" },
  { icon: TextCursorInput, text: "Enter email as johndoe@acme.com", tone: "text-muted-foreground", w: "88%" },
  { icon: TextCursorInput, text: "Enter password as *******", tone: "text-foreground", w: "94%" },
];

function KaneSteps({ play }: { play: boolean }) {
  return (
    <div className="flex h-[250px] flex-col items-center justify-center bg-white px-5">
      <div className="flex w-full flex-col items-center">
        {STEPS.map(({ icon: Icon, text, tone, w }, i) => (
          <motion.div
            key={text}
            {...rise(play, 0.15 + i * 0.35)}
            style={{ width: w, marginTop: i === 0 ? 0 : -6, zIndex: i }}
            className="relative flex items-center gap-2 rounded-[12px] border border-border bg-white px-3 py-2 shadow-[0_6px_14px_-10px_rgba(18,18,18,0.35)]"
          >
            <Icon size={13} className="flex-none text-[#1A7F37]" />
            <span className={`truncate text-[12px] ${tone}`}>{text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        {...rise(play, 1.65)}
        className="mt-4 flex w-full items-center justify-between rounded-[14px] bg-white px-4 py-3 shadow-[0_16px_30px_-16px_rgba(18,18,18,0.4)]"
      >
        <span className="relative overflow-hidden whitespace-nowrap text-[13px] text-foreground">
          <motion.span
            className="inline-block overflow-hidden whitespace-nowrap align-bottom"
            initial={play ? { width: 0 } : false}
            animate={{ width: "auto" }}
            transition={{ delay: 1.95, duration: 0.7, ease: "linear" }}
          >
            Click on Login
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="ml-0.5 inline-block h-3.5 w-px bg-foreground align-middle"
          />
        </span>
        <motion.span
          initial={play ? { scale: 1 } : false}
          animate={play ? { scale: [1, 0.86, 1] } : { scale: 1 }}
          transition={{ delay: 2.8, duration: 0.35 }}
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-foreground text-white"
        >
          <ArrowUp size={13} />
        </motion.span>
      </motion.div>
    </div>
  );
}

const TILES = [
  { icon: Zap, name: "HyperExecute", foot: "try", count: 0 },
  { icon: Telescope, name: "Cross Browser", foot: "run", count: 1 },
  { icon: Smartphone, name: "Real Device", foot: "run", count: 5 },
  { icon: Code2, name: "Automation Cloud", foot: "try", count: 0 },
  { icon: Code2, name: "App Automation", foot: "dash", count: 0 },
  { icon: Eye, name: "Browser Cloud", foot: "builds", count: 0 },
];

function Spark({ play, at }: { play: boolean; at: number }) {
  return (
    <svg viewBox="0 0 40 14" className="h-3.5 w-10" fill="none">
      <motion.path
        d="M1 12 L6 11 L9 3 L13 12 L17 8 L21 11 L25 5 L29 12 L33 9 L39 12"
        stroke="#F0883E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={play ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ delay: at, duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}

function CloudTiles({ play }: { play: boolean }) {
  return (
    <div className="grid h-[250px] grid-cols-2 content-center gap-2 bg-white px-5">
      {TILES.map((t, i) => {
        const Icon = t.icon;
        const at = 0.12 + i * 0.16;
        return (
          <motion.div
            key={t.name}
            {...rise(play, at)}
            className="flex flex-col gap-2 border border-border-muted bg-white px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border border-border-muted bg-background">
                <Icon size={10} className="text-foreground" />
              </span>
              <span className="truncate text-[10.5px] font-medium text-foreground">{t.name}</span>
            </div>
            <span className="h-1 w-[80%] rounded-full bg-border-muted" />
            <div className="flex items-center justify-between">
              {t.foot === "run" ? (
                <span className="flex items-center gap-1 rounded-[4px] bg-[#DAFBE1] px-1.5 py-0.5 text-[9px] text-[#1A7F37]">
                  <Loader2 size={8} className="animate-spin" />
                  {t.count} running
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-[9px] text-[#1F6FEB]">
                  {t.foot === "try" ? "Try now" : t.foot === "dash" ? "View dashboards" : "View builds"}
                  <ArrowUpRight size={8} />
                </span>
              )}
              {t.foot !== "try" && <Spark play={play} at={at + 0.3} />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const PANELS = [
  { title: "testmu.ai / kaneai", icon: Bot, Body: KaneSteps },
  { title: "testmu.ai / agentic-cloud", icon: LayoutGrid, Body: CloudTiles },
];

/* hover only drives the effect on real pointer devices; phones and tablets
   play each card as it scrolls into view instead */
function useCanHover() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const sync = () => setCan(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return can;
}

/* --- shared pieces ------------------------------------------------------ */

export type PioneerVariant = "hover" | "imageTop" | "white" | "soft";

/* a fresh key each time the card turns on restarts its script */
function useReplay(playing: boolean) {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (playing && !reduce) setRun((r) => r + 1);
  }, [playing, reduce]);
  return { run, play: run > 0 && playing && !reduce };
}

function PanelWindow({
  index,
  playing,
  shadow = true,
}: {
  index: number;
  playing: boolean;
  shadow?: boolean;
}) {
  const { title, icon: PanelIcon, Body } = PANELS[index];
  const { run, play } = useReplay(playing);
  return (
    <div
      className={`w-full max-w-[520px] overflow-hidden border border-border bg-white ${
        shadow ? "shadow-[0_36px_80px_-26px_rgba(18,18,18,0.45)]" : "shadow-[0_18px_40px_-24px_rgba(18,18,18,0.3)]"
      }`}
    >
      {/* window chrome, same as the fold demo frames */}
      <div className="flex items-center gap-2 border-b border-border-muted px-3 py-2">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-border" />
          ))}
        </span>
        <span className="mx-auto flex items-center gap-1.5 border border-border-muted bg-background px-3 py-0.5 text-muted-foreground">
          <PanelIcon size={10} />
          <span className="mono text-[9px] uppercase tracking-[0.14em]">{title}</span>
        </span>
        <Sparkles size={11} className="text-muted-foreground" />
      </div>
      <Body key={run} play={play} />
    </div>
  );
}

function Copy({
  index,
  fixedWidth = false,
  link = true,
  quiet = false,
}: {
  index: number;
  fixedWidth?: boolean;
  link?: boolean;
  quiet?: boolean;
}) {
  const card = pioneer.cards[index];
  return (
    /* in the hover variant the copy is laid out at the narrow card's width
       in every state (37% of the row, less padding), so it never rewraps as
       the cards trade width */
    <div className={fixedWidth ? "md:w-[calc(37cqw-56px)]" : ""}>
      <h3
        className={
          quiet
            ? "text-[18px] leading-[1.3] tracking-tight text-foreground md:text-[19px]"
            : "text-[22px] leading-[1.2] tracking-tight text-foreground md:text-[26px]"
        }
      >
        {card.title}
      </h3>
      <p
        className={`max-w-[520px] leading-relaxed text-muted-foreground ${
          quiet ? "mt-2 text-[14.5px]" : "mt-2.5 text-[15px]"
        }`}
      >
        {card.body}
      </p>
      {link && (
        <button className="group/btn mt-5 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[14px] font-medium text-foreground">
          Learn more
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      )}
    </div>
  );
}

function Painting({ index, zoom = false }: { index: number; zoom?: boolean }) {
  return (
    <motion.img
      src={SCENES[index]}
      alt=""
      animate={{ scale: zoom ? 1.04 : 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
    />
  );
}

/* --- hover: text first, the hovered card widens and replays ------------- */

function HoverCard({
  index,
  active,
  canHover,
  onActivate,
}: {
  index: number;
  active: number | null;
  canHover: boolean;
  onActivate: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  const reduce = useReducedMotion();
  const isActive = active === index;
  const dimmed = canHover && active !== null && !isActive;
  const grow = !canHover || reduce || active === null ? 1 : isActive ? 1.7 : 1;

  return (
    <motion.div
      ref={ref}
      data-cursor={pioneer.cards[index].cta}
      tabIndex={0}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      initial={false}
      animate={{ flexGrow: grow, opacity: dimmed ? 0.5 : 1 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      style={{ flexGrow: 1 }}
      className="flex min-w-0 basis-auto flex-col overflow-hidden border border-border-muted bg-surface outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 md:basis-0"
    >
      <div className="flex-1 p-6 md:p-7">
        <Copy index={index} fixedWidth />
      </div>
      <div className="relative h-[340px] flex-none overflow-hidden md:h-[380px]">
        <Painting index={index} zoom={isActive && canHover} />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <PanelWindow index={index} playing={canHover ? isActive : inView} />
        </div>
      </div>
    </motion.div>
  );
}

function HoverRow() {
  const canHover = useCanHover();
  const [active, setActive] = useState<number | null>(null);
  return (
    <div
      className="-mx-8 flex flex-col gap-6 [container-type:inline-size] md:flex-row"
      onMouseLeave={() => setActive(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null);
      }}
    >
      {[0, 1].map((i) => (
        <HoverCard key={i} index={i} active={active} canHover={canHover} onActivate={setActive} />
      ))}
    </div>
  );
}

/* --- static cards: play once each scrolls into view --------------------- */

function InViewCard({
  index,
  render,
  className,
}: {
  index: number;
  render: (playing: boolean) => ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  return (
    <div ref={ref} data-cursor={pioneer.cards[index].cta} className={className}>
      {render(inView)}
    </div>
  );
}

/* image on top: painting stage first, copy on white beneath */
function ImageTopRow() {
  return (
    <div className="-mx-8 grid gap-6 md:grid-cols-2">
      {[0, 1].map((i) => (
        <InViewCard
          key={i}
          index={i}
          className="flex flex-col overflow-hidden border border-border-muted bg-surface"
          render={(playing) => (
            <>
              <div className="relative h-[340px] overflow-hidden md:h-[380px]">
                <Painting index={i} />
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                  <PanelWindow index={i} playing={playing} />
                </div>
              </div>
              <div className="flex-1 p-6 md:p-7">
                <Copy index={i} />
              </div>
            </>
          )}
        />
      ))}
    </div>
  );
}

/* white: no paintings at all, the windows sit on the card's own ground */
function WhiteRow() {
  return (
    <div className="-mx-8 grid gap-6 md:grid-cols-2">
      {[0, 1].map((i) => (
        <InViewCard
          key={i}
          index={i}
          className="flex flex-col border border-border-muted bg-surface"
          render={(playing) => (
            <>
              <div className="flex h-[340px] items-center justify-center px-6 md:h-[380px] md:px-10">
                <PanelWindow index={i} playing={playing} shadow={false} />
              </div>
              <div className="flex-1 border-t border-border-muted p-6 md:p-7">
                <Copy index={i} />
              </div>
            </>
          )}
        />
      ))}
    </div>
  );
}

/* soft: the ElevenLabs reference — rounded tinted cards without borders,
   one window floating centred, the other running off the card's edge, and
   a small quiet caption with no link */
function SoftRow() {
  return (
    <div className="-mx-8 grid gap-4 md:grid-cols-2">
      <InViewCard
        index={0}
        className="flex flex-col overflow-hidden rounded-[20px] bg-[#EFEDE7]"
        render={(playing) => (
          <>
            <div className="flex h-[340px] items-center justify-center px-8 md:h-[400px] md:px-14">
              <PanelWindow index={0} playing={playing} shadow={false} />
            </div>
            <div className="px-8 pb-9 pt-2">
              <Copy index={0} link={false} quiet />
            </div>
          </>
        )}
      />
      <InViewCard
        index={1}
        className="flex flex-col overflow-hidden rounded-[20px] bg-[#EFEDE7]"
        render={(playing) => (
          <>
            {/* this window is anchored top-left and bleeds off the top and
                right edges, like the Studio card in the reference */}
            <div className="relative h-[340px] overflow-hidden md:h-[400px]">
              <div className="absolute left-8 top-0 w-[115%] max-w-none md:left-10">
                <div className="[&>div]:max-w-none">
                  <PanelWindow index={1} playing={playing} shadow={false} />
                </div>
              </div>
            </div>
            <div className="px-8 pb-9 pt-2 md:px-10">
              <Copy index={1} link={false} quiet />
            </div>
          </>
        )}
      />
    </div>
  );
}

export function PioneerRow({ variant }: { variant: PioneerVariant }) {
  if (variant === "imageTop") return <ImageTopRow />;
  if (variant === "white") return <WhiteRow />;
  if (variant === "soft") return <SoftRow />;
  return <HoverRow />;
}

export function PioneerHeading() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
        <h2 className="text-[34px] leading-[1.14] tracking-tight md:text-[42px]">
          <span className="block text-muted-foreground">Pioneer of</span>
          <span className="block">AI Agentic Testing Cloud</span>
        </h2>
        <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
          Autonomous agents that plan and author your tests, running on an
          execution cloud built for any type of test at any scale.
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
    </>
  );
}

export default function Bento({ variant = "hover" }: { variant?: PioneerVariant }) {
  return (
    <Section>
      <Reveal className="mb-12">
        <PioneerHeading />
      </Reveal>
      <Reveal delay={0.08}>
        <PioneerRow variant={variant} />
      </Reveal>
    </Section>
  );
}
