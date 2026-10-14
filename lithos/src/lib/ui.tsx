import { type ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Fade + rise as the element scrolls into view. (No blur: animating a
   filter repaints the whole section and hitches the scroll.) */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Scroll-scrubbed vertical drift. `speed` is how far it travels, in px. */
export function Parallax({
  children,
  speed = 80,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  );
}

type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  size?: "md" | "lg";
};

export function Btn({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-95 whitespace-nowrap";
  const sizes = size === "lg" ? "px-8 py-4 text-[15px]" : "px-6 py-3 text-sm";
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-accent/90 hover:shadow-[0_12px_40px_-12px_rgba(232,112,42,0.8)] hover:-translate-y-0.5",
    ghost:
      "border border-border bg-surface text-foreground backdrop-blur-md hover:bg-secondary hover:border-border hover:-translate-y-0.5",
    light:
      "bg-primary text-primary-foreground hover:bg-foreground/85 hover:-translate-y-0.5",
  } as const;

  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

/* Section wrapper: consistent rhythm and max width. */
export function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-[1] border-t border-border px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        {children}
      </div>
    </section>
  );
}

export function Marquee({
  children,
  duration = 40,
  className = "",
  ...rest
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
} & Record<string, unknown>) {
  return (
    <div
      {...rest}
      className={`marquee relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
