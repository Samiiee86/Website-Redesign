import { trustedBy } from "../lib/content";
import { Reveal } from "../lib/ui";

export default function TrustedBy() {
  return (
    <div className="relative z-[1] overflow-hidden border-b border-border bg-background px-5 py-16 sm:px-8">
      <div aria-hidden className="grain" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {trustedBy.label}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-4 lg:grid-cols-8">
            {trustedBy.logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="logo-ink mx-auto h-12 w-auto max-w-[150px] md:h-14"
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
