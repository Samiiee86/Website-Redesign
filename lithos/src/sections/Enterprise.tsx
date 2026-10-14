import { ArrowRight } from "lucide-react";
import { enterprise } from "../lib/content";
import { Reveal } from "../lib/ui";

export default function Enterprise() {
  return (
    <section className="relative z-[1] w-full overflow-hidden border-t border-border">
      <Reveal>
        <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center px-6 py-28 text-center md:py-40">
          {/* eyebrow held between two hairlines, like a letterpress rule */}
          <div className="flex w-full max-w-[420px] items-center gap-5">
            <span className="h-px flex-1 bg-border" />
            <p className="mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Enterprise
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="mt-8 text-4xl leading-[1.08] tracking-tight text-foreground md:text-[56px]">
            TestMu AI for Enterprise
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-muted-foreground">
            {enterprise.body}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              data-cursor="Talk to sales"
              className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
            >
              {enterprise.primary}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              data-cursor="Book a slot"
              className="inline-flex items-center justify-center rounded-[10px] border border-border bg-surface px-7 py-3.5 text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary"
            >
              {enterprise.secondary}
            </button>
          </div>

          <p className="mono mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>SOC 2 Type II</span>
            <span className="h-[4px] w-[4px] rotate-45 bg-border" />
            <span>GDPR</span>
            <span className="h-[4px] w-[4px] rotate-45 bg-border" />
            <span>ISO 27001</span>
            <span className="h-[4px] w-[4px] rotate-45 bg-border" />
            <span>24×7 enterprise support</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
