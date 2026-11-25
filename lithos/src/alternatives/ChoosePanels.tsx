import type { ReactNode } from "react";

/* Small TestMu AI views for the "when to choose" bento cells: white
   panels with hairlines on the fill tint, Manrope on the type scale, mono
   only for real code. No scenes and no dark fills inside the cells. */

const ROW = "flex items-center justify-between gap-3 px-4 py-2.5";

export function Panel({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--tm-bg-fill)] p-6">
      <div className="w-full max-w-[440px] border border-border bg-surface [box-shadow:var(--tm-shadow-floating-sm)]">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-b3 font-medium">
          {title}
          {note && <span className="text-b4 font-normal text-muted-foreground">{note}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

/* a small grey tag, 4px corners */
export function Pill({ children, ok }: { children: string; ok?: boolean }) {
  return (
    <span
      className={`tag shrink-0 rounded-sm px-1.5 py-0.5 text-b4 font-medium ${
        ok ? "bg-[var(--tm-green-000)] text-[var(--tm-green-500)]" : "bg-[var(--tm-bg-fill)] text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

/* rows of a name, a grey line under it and a tag on the right */
export function Rows({ rows }: { rows: { name: string; sub: string; tag: string; ok?: boolean }[] }) {
  return (
    <>
      {rows.map((r, i) => (
        <div key={r.name} className={`${ROW} ${i ? "border-t border-border" : ""}`}>
          <span className="flex min-w-0 flex-col">
            <span className="text-b3 font-medium">{r.name}</span>
            <span className="text-b4 text-muted-foreground">{r.sub}</span>
          </span>
          <Pill ok={r.ok}>{r.tag}</Pill>
        </div>
      ))}
    </>
  );
}

/* a code view with framework tabs, the active one underlined */
export function CodePanel({ tabs, active, lines }: { tabs: string[]; active: string; lines: string[] }) {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--tm-bg-fill)] p-6">
      <div className="w-full max-w-[560px] border border-border bg-surface [box-shadow:var(--tm-shadow-floating-sm)]">
        <div className="flex items-center gap-4 border-b border-border px-4 text-b3">
          <span className="py-2.5 font-medium">Export</span>
          {tabs.map((t) => (
            <span
              key={t}
              className={`-mb-px border-b-2 py-2.5 ${
                t === active ? "border-foreground font-medium text-foreground" : "border-transparent text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="overflow-hidden p-4">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-4 whitespace-pre font-mono text-b4 leading-6">
              <span className="w-4 shrink-0 text-right font-mono text-muted-foreground">{i + 1}</span>
              <span className="font-mono">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
