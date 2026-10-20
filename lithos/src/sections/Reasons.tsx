import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { asSeenOn, reasons, reviews, stats } from "../lib/content";
import { Marquee, Reveal, Section, ArrowChip } from "../lib/ui";

function Stars({ rating }: { rating: string }) {
  const value = parseFloat(rating);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < Math.round(value)
              ? "fill-foreground text-foreground"
              : "text-border"
          }
        />
      ))}
    </div>
  );
}

export default function Reasons() {
  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">
              More Reasons to Love
            </span>
            <span className="block">TestMu AI (formerly LambdaTest)</span>
          </h2>
          <p className="max-w-[430px] text-[16px] leading-relaxed text-muted-foreground">
            {reasons.body}
          </p>
        </div>
        <button
          data-cursor="Start free"
          className="btn btn-lg btn-primary btn-arrow btn-arrow-plain mt-8"
        >
          Start free with Google
          <ArrowChip />
        </button>
      </Reveal>

      {/* one continuous grid — flush cells, hairline dividers, square corners */}
      <Reveal delay={0.08}>
        <div className="-mx-8 border-y border-border-muted bg-surface">
          {/* numbers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-8 py-10 text-center ${
                  i < 3
                    ? "border-b border-border-muted sm:border-b-0 lg:border-r"
                    : ""
                } ${i === 0 ? "sm:border-r sm:border-border-muted" : ""} ${
                  i === 1
                    ? "sm:border-b sm:border-border-muted lg:border-b-0"
                    : ""
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="pixel mt-3 text-[38px] leading-none tracking-tight md:text-[44px]">
                  {s.value}
                  {s.suffix}
                </p>
              </div>
            ))}
          </div>

          {/* analyst reports */}
          <div className="grid border-t border-border-muted md:grid-cols-2">
            {reasons.reports.map((report, i) => (
              <div
                key={report.title}
                data-cursor="Read report"
                className={`group p-8 transition-colors duration-500 hover:bg-secondary/40 ${
                  i === 0
                    ? "border-b border-border-muted md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <p className="max-w-[420px] text-[19px] leading-snug tracking-tight">
                  {report.title}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-[14px] font-medium">
                  {report.cta}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            ))}
          </div>

          {/* the three proofs — copy first, artwork beneath */}
          <div className="grid border-t border-border-muted lg:grid-cols-3">
            {reasons.cards.map((card, i) => (
              <div
                key={card.title}
                data-cursor="Learn more"
                className={`flex flex-col gap-6 p-8 ${
                  i < 2
                    ? "border-b border-border-muted lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div>
                  <h3 className="tracking-tight">{card.title}</h3>
                  <p className="mt-3 max-w-[330px] text-[15px] leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
                <img
                  src={card.image}
                  alt=""
                  className="mt-auto w-full max-w-[380px] object-contain object-left"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* ratings */}
          <div className="grid border-t border-border-muted lg:grid-cols-3">
            {reviews.vendors.map((vendor, i) => (
              <a
                key={vendor.name}
                href={vendor.href}
                data-cursor={`Read ${vendor.name}`}
                className={`group flex flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-secondary/40 ${
                  i < 2
                    ? "border-b border-border-muted lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[15px] font-medium tracking-tight">
                    {vendor.name}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <div>
                  <p className="pixel text-[40px] leading-none tracking-tight">
                    {vendor.rating}
                    <span className="ml-1 text-sm text-muted-foreground">
                      / {vendor.outOf}
                    </span>
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Stars rating={vendor.rating} />
                    <span className="text-[13px] text-muted-foreground">
                      {vendor.count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* press */}
          <div className="border-t border-border-muted px-8 py-10">
            <p className="mb-8 text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {asSeenOn.label}
            </p>
            <Marquee duration={38}>
              {asSeenOn.logos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="logo-ink mx-10 h-11 w-auto shrink-0 md:mx-12 md:h-12"
                  loading="lazy"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
