import { ArrowUpRight } from "lucide-react";
import { integrations } from "../lib/content";
import { LineMark, Reveal, Section } from "../lib/ui";

/* Integrations fold. Each tool is an outlined mark in one ink, with a line on
   what the connection does for you (after devin.ai and elevenlabs.io/agents). */
export default function Integrations() {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">
              {integrations.lead}
            </span>
            <span className="block">{integrations.title}</span>
          </h2>
          <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
            {integrations.body}
          </p>
        </div>
        <button
          data-cursor="See all"
          className="btn btn-lg btn-secondary mt-8"
        >
          {integrations.cta}
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="-mx-8 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {integrations.items.map((item) => (
            <a
              key={item.name}
              href="#top"
              data-cursor={`Connect ${item.name}`}
              className="group relative flex min-h-[208px] flex-col justify-between gap-10 bg-surface p-8 transition-colors duration-500 hover:bg-[#FAFAF8]"
            >
              <LineMark
                src={`/img/integrations/${item.icon}.svg`}
                label={item.name}
                className="h-10 w-10 text-foreground/55 transition-colors duration-300 group-hover:text-foreground"
              />
              <div>
                <p className="text-b2 font-medium tracking-tight text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-b3 text-muted-foreground">
                  {item.desc}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="absolute right-6 top-6 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
