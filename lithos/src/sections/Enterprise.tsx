import { enterprise } from "../lib/content";
import { Reveal, ArrowChip } from "../lib/ui";

export default function Enterprise() {
  return (
    <section className="relative z-[1] w-full overflow-hidden border-t border-border">
      <Reveal>
        <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center px-6 py-28 text-center md:py-40">
          <h2 className="tracking-tight text-foreground">
            Built for the enterprise
          </h2>
          <p className="mt-6 max-w-[520px] text-b1 leading-relaxed text-muted-foreground">
            {enterprise.body}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              data-cursor="Talk to sales"
              className="btn btn-lg btn-primary btn-arrow btn-arrow-plain"
            >
              {enterprise.primary}
              <ArrowChip />
            </button>
            <button
              data-cursor="Book a slot"
              className="btn btn-lg btn-secondary"
            >
              {enterprise.secondary}
            </button>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
