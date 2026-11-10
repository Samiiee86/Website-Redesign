/**
 * Game type, drawn in VCR OSD Mono.
 *
 * Earlier versions pushed text through the same block quantiser as the sprites.
 * That works for a true bitmap face but wrecks VCR: at the size the layout wants
 * (5-6 blocks of cap height) the quantiser eats whole strokes and the score
 * becomes unreadable. VCR is already a blocky, pixel-styled typeface, so it is
 * drawn straight to the canvas instead and keeps its own letterforms.
 *
 * Sizes are still given in blocks, so the type scales with the scene.
 */

/** Measured from the file: cap height as a fraction of the font size. */
const CAP_RATIO = 0.7324;
const FAMILY = '"VCR OSD Mono", "Geist Pixel Square", monospace';

/* VCR OSD Mono (MrManet, 2015), free for commercial use. Registered here
   rather than in index.css: it is game art, not site type. */
if (typeof document !== "undefined" && "fonts" in document) {
  const vcr = new FontFace("VCR OSD Mono", 'url("/fonts/VCR_OSD_MONO.ttf") format("truetype")', {
    weight: "400",
    style: "normal",
    display: "block",
  });
  document.fonts.add(vcr);
  vcr.load().catch(() => {});
}
/** A touch of tracking, the way an on-screen display would space it. */
const TRACKING = 0.1;

function fontFor(capBlocks: number, cell: number): string {
  return `400 ${(capBlocks * cell) / CAP_RATIO}px ${FAMILY}`;
}

function apply(
  ctx: CanvasRenderingContext2D,
  capBlocks: number,
  cell: number,
): void {
  ctx.font = fontFor(capBlocks, cell);
  ctx.letterSpacing = `${capBlocks * cell * TRACKING}px`;
  ctx.textBaseline = "alphabetic";
}

/** Width of `text` in blocks, at the given cap height. */
export function textWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  capBlocks: number,
  cell: number,
): number {
  apply(ctx, capBlocks, cell);
  return ctx.measureText(text).width / cell;
}

/**
 * Draws `text` with its cap box starting at (col, row) in blocks. Snapping the
 * origin to whole blocks keeps the type sitting on the same grid as the scene
 * even though the glyphs themselves are not quantised.
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  col: number,
  row: number,
  capBlocks: number,
  cell: number,
): void {
  apply(ctx, capBlocks, cell);
  ctx.fillText(
    text,
    Math.round(col) * cell,
    Math.round(row + capBlocks) * cell,
  );
}

/** Picks the first wording that fits, shrinking the cap height before the copy. */
export function fitText(
  ctx: CanvasRenderingContext2D,
  options: string[],
  capBlocks: number,
  cell: number,
  maxCols: number,
): { text: string; cap: number; cols: number } | null {
  for (let cap = capBlocks; cap >= Math.max(3, capBlocks - 3); cap--) {
    for (const text of options) {
      const cols = textWidth(ctx, text, cap, cell);
      if (cols <= maxCols) return { text, cap, cols };
    }
  }
  return null;
}
