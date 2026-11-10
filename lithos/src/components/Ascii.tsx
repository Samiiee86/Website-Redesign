import { useEffect, useMemo, useState } from "react";

const CHARS = " ·:-=+*#%@";

/* A slow-drifting field of characters. Cheap: one string rebuilt a few times
   a second, no canvas, no per-character DOM nodes. */
export default function Ascii({
  rows = 14,
  cols = 60,
  speed = 900,
  className = "",
  density = 1,
}: {
  rows?: number;
  cols?: number;
  speed?: number;
  className?: string;
  density?: number;
}) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setT((v) => v + 1), speed);
    return () => window.clearInterval(id);
  }, [speed]);

  const field = useMemo(() => {
    const lines: string[] = [];
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        const wave =
          Math.sin(x * 0.28 + t * 0.35) * Math.cos(y * 0.42 - t * 0.2) +
          Math.sin((x + y) * 0.16 + t * 0.12);
        const n = ((wave + 2) / 4) * density;
        line +=
          CHARS[
            Math.max(
              0,
              Math.min(CHARS.length - 1, Math.round(n * (CHARS.length - 1))),
            )
          ];
      }
      lines.push(line);
    }
    return lines.join("\n");
  }, [rows, cols, t, density]);

  return (
    <pre
      aria-hidden
      className={`pointer-events-none select-none whitespace-pre font-mono text-[10px] leading-[1.15] tracking-[0.12em] text-foreground/[0.14] ${className}`}
      style={{ fontFamily: "'Space Mono', ui-monospace, SFMono-Regular, monospace" }}
    >
      {field}
    </pre>
  );
}
