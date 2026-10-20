import { asSeenOn } from "../lib/content";
import { Marquee, Reveal } from "../lib/ui";

export default function AsSeenOn() {
  return (
    <div className="relative z-[1] border-t border-border py-16">
      <Reveal className="mb-10 px-4 text-center sm:px-8">
        <p className="text-b4 uppercase tracking-[0.28em] text-muted-foreground">
          {asSeenOn.label}
        </p>
      </Reveal>
      <Marquee duration={38}>
        {asSeenOn.logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="logo-ink mx-8 h-6 w-auto shrink-0 md:mx-12 md:h-7"
            loading="lazy"
          />
        ))}
      </Marquee>
    </div>
  );
}
