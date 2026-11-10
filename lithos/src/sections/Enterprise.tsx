import { Check } from "lucide-react";
import { enterprise } from "../lib/content";
import { scenery } from "../lib/scenery";
import { Reveal, ArrowChip } from "../lib/ui";

/* The closing fold bookends the hero: a full-width painting that rises out
   of the page colour, the ask set in the sky above the lake. */
export default function Enterprise() {
  return (
    <section className="relative z-[1] w-full overflow-hidden border-t border-border">
      <img
        src={scenery.alplake}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        loading="lazy"
      />
      {/* page colour melts into the painting so the copy sits on calm sky */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #F5F4F0 0%, rgba(245,244,240,0.7) 18%, rgba(245,244,240,0.25) 38%, rgba(245,244,240,0) 55%)",
        }}
      />

      <Reveal>
        <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center px-6 pb-[300px] pt-28 text-center md:pb-[420px] md:pt-36">
          <h2 className="tracking-tight text-foreground">
            Built for the enterprise
          </h2>
          <p className="mt-6 max-w-[520px] text-b1 leading-relaxed text-foreground/70">
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

          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {enterprise.perks.slice(0, 3).map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 border border-border bg-white/80 px-3 py-1.5 text-b3 text-foreground backdrop-blur-sm"
              >
                <Check size={13} className="text-[#1A7F37]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
