import { useEffect, useRef, type ReactNode } from "react";
import { Sparkle, SquareTerminal, type LucideIcon } from "lucide-react";

/* Retro glitch picture parts, as on the home page (testmuai-redesign) and
   the hero-fold videos: a window centred on a painted scene.
   - Stage: the painted scene with the picture centred on it.
   - Term: the dark terminal (window bar with a centred label chip, the
     transcript, an optional orange status bar).
   - AppWindow: the light product window (dots, a centred mono address
     chip, an icon on the right).
   - Glitch: white cards joined by black lines with orange dots, around a
     main card.
   - LazyVideo: plays only while it is on screen (and its tab is open). */

export const T_BG = "bg-[var(--tm-bg-inverse)]";
export const T_LINE = "border-[var(--tm-bg-inverse-muted)]";
export const T_FG = "text-[var(--tm-fg-inverse)]";
export const T_MUTED = "text-[var(--tm-fg-inverse-muted)]";
export const T_AMBER = "text-[var(--tm-orange-300)]";
export const T_CYAN = "text-[var(--tm-blue-300)]";
export const T_OK = "text-[var(--tm-green-300)]";
export const T_FAIL = "text-[var(--tm-red-300)]";

export function Stage({ scene, wide, children }: { scene: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className="relative flex h-[380px] items-center justify-center overflow-hidden border border-border px-6 md:h-[540px] md:px-12">
      <img src={scene} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`relative w-full ${wide ? "max-w-[600px]" : "max-w-[560px]"}`}>{children}</div>
    </div>
  );
}

const Dots = ({ tone }: { tone: string }) => (
  <span className="flex gap-1.5">
    {[0, 1, 2].map((i) => (
      <span key={i} className={`size-2 rounded-full ${tone}`} />
    ))}
  </span>
);

export function Term({
  label,
  bar,
  children,
}: {
  label: string;
  bar?: { name: string; path: string; right: string };
  children: ReactNode;
}) {
  return (
    <div className={`overflow-hidden border font-mono [&_span]:font-mono [&_p]:font-mono ${T_LINE} ${T_BG} [box-shadow:var(--tm-shadow-floating-md)]`}>
      <div className={`flex items-center gap-2 border-b ${T_LINE} px-3 py-2`}>
        <Dots tone="bg-[var(--tm-bg-inverse-muted)]" />
        <span className={`tag mx-auto flex items-center gap-1.5 rounded-sm border ${T_LINE} px-3 py-0.5 text-b5 uppercase tracking-[1px] ${T_MUTED}`}>
          <SquareTerminal size={12} strokeWidth={1.5} aria-hidden />
          {label}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className={`flex flex-col gap-1 px-5 py-4 text-b4 ${T_FG}`}>{children}</div>
      {bar && (
        <div className={`flex items-center gap-3 border-t ${T_LINE} text-b5 ${T_MUTED}`}>
          <span className="bg-[var(--tm-orange-300)] px-2 py-1 font-medium text-[var(--tm-fg-default)]">{bar.name}</span>
          <span className="truncate">{bar.path}</span>
          <span className="ml-auto flex-none pr-5">{bar.right}</span>
        </div>
      )}
    </div>
  );
}

/* one transcript line; `k` is the dim left column */
export const Ln = ({ k, children, className = "" }: { k?: ReactNode; children?: ReactNode; className?: string }) => (
  <p className={`flex min-w-0 gap-3 whitespace-pre ${className}`}>
    {k !== undefined && <span className={`w-14 flex-none ${T_MUTED}`}>{k}</span>}
    <span className="min-w-0 truncate">{children}</span>
  </p>
);
export const Cmd = ({ children }: { children: ReactNode }) => <p className={`mb-1 truncate ${T_CYAN}`}>› {children}</p>;
export const Gap = () => <span className="h-2" />;
export const Done = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 flex items-center gap-2">
    <Sparkle size={12} strokeWidth={1.5} aria-hidden />
    {children}
  </p>
);

export function AppWindow({
  path,
  icon: Icon,
  right,
  children,
}: {
  path: string;
  icon: LucideIcon;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-border bg-surface [box-shadow:var(--tm-shadow-floating-md)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Dots tone="bg-[var(--tm-border-default)]" />
        <span className="tag mx-auto flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-0.5 font-mono text-b5 uppercase tracking-[1px] text-muted-foreground">
          <Icon size={12} strokeWidth={1.5} aria-hidden />
          testmu.ai / {path}
        </span>
        <span className="flex w-[42px] justify-end text-muted-foreground">{right}</span>
      </div>
      {children}
    </div>
  );
}

/* a mono caption row inside a window: label on the left, a tag on the right */
export function Caption({ children, tag }: { children: ReactNode; tag?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
      <span className="font-mono text-b4 uppercase tracking-[2px] text-muted-foreground">{children}</span>
      {tag}
    </div>
  );
}

export const CARD = "flex items-center gap-2 border border-border bg-surface px-4 py-3 text-b3 [box-shadow:var(--tm-shadow-floating-sm)]";
export const CHIP = "tag rounded-sm bg-[var(--tm-bg-fill)] px-2 py-1 font-mono text-b4";
export const LABEL = "tag flex-none rounded-sm border border-border bg-surface px-2 py-0.5 text-b4 text-muted-foreground";
export const OK_PILL = "pill rounded-full border border-[var(--tm-green-200)] bg-[var(--tm-green-000)] px-3 py-1 font-mono text-b4 text-[var(--tm-green-500)]";
export const Dot = () => <span className="size-1.5 flex-none rounded-full bg-[var(--tm-orange-400)]" />;
const HLink = () => (
  <span className="flex min-w-4 flex-1 items-center">
    <Dot />
    <span className="h-px flex-1 bg-[var(--tm-fg-default)]" />
    <Dot />
  </span>
);
const VLink = () => (
  <span className="mx-auto flex h-10 flex-col items-center">
    <Dot />
    <span className="w-px flex-1 bg-[var(--tm-fg-default)]" />
    <Dot />
  </span>
);

export function Glitch({ scene, left, right, main, below }: { scene: string; left: ReactNode; right: ReactNode; main: ReactNode; below: ReactNode }) {
  return (
    <Stage scene={scene} wide>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <div className="hidden flex-1 items-center md:flex lg:hidden xl:flex">
            <div className={`${CARD} flex-none justify-center whitespace-nowrap`}>{left}</div>
            <HLink />
          </div>
          <div className="flex flex-none flex-col gap-3 whitespace-nowrap border border-border bg-surface px-4 py-4 [box-shadow:var(--tm-shadow-floating-md)]">
            {main}
          </div>
          <div className="hidden flex-1 items-center md:flex lg:hidden xl:flex">
            <HLink />
            <div className={`${CARD} flex-none justify-center whitespace-nowrap`}>{right}</div>
          </div>
        </div>
        <VLink />
        <div className={`${CARD} mx-auto`}>{below}</div>
      </div>
    </Stage>
  );
}

export function LazyVideo({ src, poster, label, className = "" }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} muted loop playsInline preload="none" poster={poster} aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
