import { ArrowUpRight } from "lucide-react";
import { shipped } from "../lib/content";
import { Reveal, Section, SlideArrow } from "../lib/ui";

/* Changelog fold: heading on the left, the latest releases as a quiet list
   on the right (layout after devin.ai). */
export default function Shipped() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
        <Reveal>
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">{shipped.lead}</span>
            <span className="block">{shipped.title}</span>
          </h2>
          <p className="mt-6 max-w-[340px] text-b1 leading-relaxed text-muted-foreground">
            {shipped.body}
          </p>
          <a
            href={shipped.all.href}
            target="_blank"
            rel="noreferrer"
            className="group/all mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-b3 font-medium text-foreground"
          >
            {shipped.all.label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="border-t border-border">
            {shipped.items.map((row) => (
              <li key={row.title}>
                <a
                  href={row.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Read update"
                  className="group grid grid-cols-[56px_1fr_20px] items-center gap-4 border-b border-border py-5 md:grid-cols-[64px_1fr_120px_20px] md:gap-6"
                >
                  <span className="pixel text-b1 text-muted-foreground">
                    {row.date}
                  </span>
                  <span className="truncate text-b1 font-medium tracking-tight text-foreground">
                    {row.title}
                  </span>
                  <span className="hidden truncate text-b3 text-muted-foreground md:block">
                    {row.tag}
                  </span>
                  <SlideArrow />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
