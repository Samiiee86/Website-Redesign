import { stats, trustedBy } from "../lib/content";
import { Reveal } from "../lib/ui";

/* the twelve best-known names: 4 x 3 joined boxes */
const WALL = [
  "microsoft",
  "openai",
  "nvidia",
  "github",
  "workday",
  "akamai",
  "nbcuniversal",
  "estee-lauder",
  "tripadviosr",
  "boomi",
  "cox",
  "lv",
];

export default function TrustedBy() {
  const logos = WALL.map((n) => trustedBy.logos.find((l) => l.name === n)!);
  return (
    <section className="relative z-[1] overflow-hidden bg-background px-5 pb-24 pt-20 sm:px-8">
      {/* the same grain and wash as the plain logo wall */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/img/noise.webp')] bg-[length:128px_128px] opacity-[0.06]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[115%] bg-gradient-to-b from-background to-transparent"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-8">
        {/* heading on the left, the numbers on the right */}
        <Reveal className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="[text-wrap:balance]">
            <span className="block text-muted-foreground">
              Powering testing for
            </span>
            <span className="block">the world's best teams</span>
          </h2>
          <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="mono text-b4 uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="pixel mt-3 text-[48px] leading-none tracking-tight">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* customer logos in joined boxes, edge to edge on the frame lines */}
        <Reveal delay={0.06}>
          <div className="tm-join [--tm-pad:32px] max-sm:!grid-cols-2 max-sm:[&>*:last-child]:!col-auto">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="logo-ink h-14 w-auto max-w-[160px]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
