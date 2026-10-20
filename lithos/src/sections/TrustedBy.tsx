import { trustedBy } from "../lib/content";
import { Reveal } from "../lib/ui";

export default function TrustedBy() {
  return (
    <div className="relative z-[1] overflow-hidden bg-background px-5 pb-11 pt-20 sm:px-8">
      {/* per the Figma frame: a 6% noise tile under a page-colour wash that is
          solid at the top and clear at the bottom, so the grain builds toward
          the divider and stops there */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/img/noise.webp')] bg-[length:128px_128px] opacity-[0.06]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[115%] bg-gradient-to-b from-background to-transparent"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-b3 uppercase leading-[22px] text-muted-foreground">
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
