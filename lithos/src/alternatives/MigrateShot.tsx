import { useLayoutEffect, useRef, type ReactNode } from "react";
import "./migrate-shot.css";

/* The hero picture for a "<rival> alternative" page, drawn on the page:
   "Are you migrating from? <rival>" over the same test before and after.

   It is laid out at 1000 x 552 (the kit's hero screen) and scaled to the
   width of the box it sits in, so it shrinks like an image on phones.

   A code line is a list of pieces:
     "text"          plain code
     { s: "..." }    a string, in blue
     { w: "..." }    a word that changes (red before, green after)
     { sw: "..." }   a word that changes, inside a string
   A line is a change when `change` is set. A `filler` row is an empty,
   unnumbered row that keeps the two sides level when one side has a line
   the other has not (as in a split diff). Past nine rows the lines sit
   closer so the code still fits. */

type Piece = string | { s: string } | { w: string } | { sw: string };
export type ShotLine = { change?: boolean; filler?: boolean; code: Piece[] };

const W = 1000;

function Code({ lines, side }: { lines: ShotLine[]; side: "before" | "after" }) {
  let n = 0;
  return (
    <div className={`mshot__code ${lines.length > 9 ? "mshot__code--tight" : ""}`}>
      {lines.map((l, i) =>
        l.filler ? (
          <div key={i} className="mshot__ln mshot__fill" aria-hidden>
            {" "}
          </div>
        ) : (
        <div
          key={i}
          className={`mshot__ln ${l.change ? (side === "before" ? "mshot__del" : "mshot__add") : ""}`}
        >
          <i>{++n}</i>
          <b>{l.change ? (side === "before" ? "−" : "+") : ""}</b>
          <span>
            {l.code.length === 0
              ? " "
              : l.code.map((p, j): ReactNode =>
                  typeof p === "string" ? (
                    p
                  ) : "s" in p ? (
                    <span key={j} className="mshot__s">{p.s}</span>
                  ) : "w" in p ? (
                    <span key={j} className="mshot__w">{p.w}</span>
                  ) : (
                    <span key={j} className="mshot__s">
                      "<span className="mshot__w">{p.sw}</span>"
                    </span>
                  ),
                )}
          </span>
        </div>
        ),
      )}
    </div>
  );
}

export default function MigrateShot({
  rival,
  before,
  after,
}: {
  rival: string;
  before: ShotLine[];
  after: ShotLine[];
}) {
  const box = useRef<HTMLDivElement>(null);
  const shot = useRef<HTMLDivElement>(null);

  /* scale the 1000px drawing to the box's width */
  useLayoutEffect(() => {
    const el = box.current;
    const inner = shot.current;
    if (!el || !inner) return;
    const fit = () => {
      inner.style.transform = `scale(${el.clientWidth / W})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      role="img"
      aria-label={`Are you migrating from ${rival}? The same test before and after, with the lines that change marked`}
      className="relative h-full w-full"
    >
      <div ref={shot} className="mshot" aria-hidden>
        <div className="mshot__ask">
          <p>Are you migrating from?</p>
          <span className="mshot__pick">
            {rival}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
            <svg className="mshot__cursor" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="var(--tm-bg-surface)" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M4.04 2.63a1 1 0 0 1 1.04-.22l15.5 5.9a1 1 0 0 1-.06 1.9l-6.4 1.87a1 1 0 0 0-.68.68l-1.87 6.4a1 1 0 0 1-1.9.06L3.82 3.67a1 1 0 0 1 .22-1.04z" />
            </svg>
          </span>
        </div>

        <div className="mshot__panes">
          <div className="mshot__pane">
            <div className="mshot__top">
              <span className="mshot__tag">Before</span>
              {rival}
            </div>
            <Code lines={before} side="before" />
          </div>
          <div className="mshot__pane">
            <div className="mshot__top">
              <span className="mshot__tag">After</span>
              TestMu AI
            </div>
            <Code lines={after} side="after" />
          </div>
        </div>
      </div>
    </div>
  );
}
