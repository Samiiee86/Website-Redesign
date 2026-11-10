import { integrations } from "../lib/content";
import { Reveal, Section } from "../lib/ui";

/* Integrations fold, after elevenlabs.io/agents: the pitch on the left, the
   tools as a calm list of brand-colour marks on the right. */
export default function Integrations() {
  return (
    <Section>
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
          <div>
            <h2>
              <span className="block text-muted-foreground">
                {integrations.lead}
              </span>
              <span className="block">{integrations.title}</span>
            </h2>
            <p className="mt-4 max-w-[380px] text-b2 leading-relaxed text-muted-foreground">
              {integrations.body}
            </p>
            <button data-cursor="See all" className="btn btn-lg btn-secondary mt-8">
              {integrations.cta}
            </button>
          </div>

          <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-4 sm:grid-cols-3">
            {integrations.items.map((item) => (
              <li key={item.name}>
                <a
                  href="#top"
                  data-cursor={`Connect ${item.name}`}
                  className="group flex items-center gap-3 py-1"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[6px] border border-border bg-white shadow-[0_1px_2px_rgba(18,18,18,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <img
                      src={`/img/integrations/color/${item.icon}.svg`}
                      alt=""
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                    />
                  </span>
                  <span className="text-b2 text-foreground">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
