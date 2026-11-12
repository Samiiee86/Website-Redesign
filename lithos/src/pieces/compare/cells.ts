/* The value types and small helpers the comparison pieces share. */

/* What one cell can hold:
   true            a tick
   false           a dash
   "text"          a short note, e.g. "Add-on"
   { ok: true }    counts as built in for the tally row */
export type Cell =
  | boolean
  | string
  | { text: string; ok?: boolean };

/* a text value that also counts as "built in" */
export const yes = (text: string): Cell => ({ text, ok: true });

export const counts = (c: Cell) =>
  c === true || (typeof c === "object" && c.ok === true);

/* keyboard focus, from the palette: a 2px blue ring */
export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tm-bg-accent)]";

/* Type inside the tables is Manrope on the design system scale: H5 for
   column names, B2 for row names and values. No grey lines under
   anything: every row and value is one line. H5 and H4 are written out here because table cells are not
   headings. Column names, the corner label included, are Manrope H5 in
   black, and so are the category bands. Space Mono is used only for the
   flag and for real code. */
export const MONO =
  "font-mono text-b4 uppercase tracking-[0.14em] text-muted-foreground";
export const H5 =
  "text-[length:var(--tm-h5-size)] font-medium leading-[var(--tm-h5-line)] tracking-[var(--tm-h5-tracking)]";
export const H4 =
  "text-[length:var(--tm-h4-size)] font-medium leading-[var(--tm-h4-line)] tracking-[var(--tm-h4-tracking)]";
/* H5 from the desktop size up (phones keep the smaller size they had) */
export const H5_LG =
  "lg:text-[length:var(--tm-h5-size)] lg:leading-[var(--tm-h5-line)] lg:tracking-[var(--tm-h5-tracking)]";

/* the ElevenLabs row line, desktop only: small dots in the border grey,
   6px apart, along the bottom of a cell's inner box */
export const DOTS =
  "lg:bg-[radial-gradient(circle,var(--tm-border-default)_1px,transparent_1.5px)] lg:bg-[length:6px_4px] lg:bg-bottom lg:bg-repeat-x";
