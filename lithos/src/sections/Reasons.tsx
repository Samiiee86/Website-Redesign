import { ArrowUpRight, Check, Star } from "lucide-react";
import { asSeenOn, reasons, reviews, security, stats } from "../lib/content";
import { Marquee, Reveal, Section, ArrowChip, SlideArrow } from "../lib/ui";
import { CERT_NAMES, CertMark } from "../components/CertMarks";
import { scenery } from "../lib/scenery";

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

const integrationsCard = reasons.cards[2];

const MCP_CLIENTS = [
  { name: "Claude", src: "/img/integrations/color/claude.svg" },
  { name: "Cursor", src: "/img/integrations/color/cursor.svg" },
  { name: "VS Code", src: "/img/integrations/color/vscode.svg" },
  { name: "GitHub Copilot", src: "/img/integrations/color/copilot.svg" },
  { name: "Windsurf", src: "/img/integrations/color/windsurf.svg" },
];

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
          <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
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
        <div className="-mx-8 border-y border-border bg-surface">
          {/* numbers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-8 py-10 text-center ${
                  i < 3
                    ? "border-b border-border sm:border-b-0 lg:border-r"
                    : ""
                } ${i === 0 ? "sm:border-r sm:border-border" : ""} ${
                  i === 1
                    ? "sm:border-b sm:border-border lg:border-b-0"
                    : ""
                }`}
              >
                <p className="text-b4 uppercase tracking-[0.22em] text-muted-foreground">
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
          <div className="grid border-t border-border md:grid-cols-2">
            {reasons.reports.map((report, i) => (
              <div
                key={report.title}
                data-cursor="Read report"
                className={`group p-8 transition-colors duration-500 hover:bg-secondary/40 ${
                  i === 0
                    ? "border-b border-border md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <p className="max-w-[420px] text-b1 leading-snug tracking-tight">
                  {report.title}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-b3 font-medium">
                  {report.cta}
                  <SlideArrow />
                </span>
              </div>
            ))}
          </div>

          {/* enterprise-grade security (line badges) beside the MCP card */}
          <div className="grid border-t border-border lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-8 border-b border-border p-8 lg:border-b-0 lg:border-r">
              <div>
                <h3 className="tracking-tight">{security.title}</h3>
                <p className="mt-3 max-w-[480px] text-b2 leading-relaxed text-muted-foreground">
                  {security.body}
                </p>
              </div>
              <div className="mt-auto grid grid-cols-4 gap-x-3 gap-y-6 sm:grid-cols-7 sm:gap-x-4 sm:gap-y-6">
                {CERT_NAMES.map((name) => (
                  <div
                    key={name}
                    className="mx-auto h-14 w-14 text-foreground/60 transition-colors duration-300 hover:text-foreground sm:h-[68px] sm:w-[68px]"
                  >
                    <CertMark name={name} />
                  </div>
                ))}
              </div>
            </div>

            {/* integrations & MCP: a coding agent calling TestMu through MCP,
                and the agents it works with */}
            <div className="flex flex-col gap-6 p-8">
              <div>
                <h3 className="tracking-tight">{integrationsCard.title}</h3>
                <p className="mt-3 max-w-[360px] text-b2 leading-relaxed text-muted-foreground">
                  {integrationsCard.body}
                </p>
              </div>
              {/* the coding agents it plugs into, joined to one status pill
                  (after gumloop.com's connections card) */}
              <div className="relative mt-auto flex flex-col items-center overflow-hidden border border-border px-4 py-9">
                <img
                  src={scenery.treetop}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="relative flex flex-col items-center">
                <div className="flex items-end gap-2.5">
                  {MCP_CLIENTS.map((c, i) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className={`flex items-center justify-center rounded-[9px] border bg-white transition-transform duration-300 hover:-translate-y-0.5 ${
                        i === 0
                          ? "h-11 w-11 border-foreground/30 shadow-[0_6px_16px_-10px_rgba(18,18,18,0.5)]"
                          : "h-9 w-9 border-border"
                      }`}
                    >
                      <img src={c.src} alt={c.name} className={i === 0 ? "h-5 w-5" : "h-4 w-4"} loading="lazy" />
                    </span>
                  ))}
                </div>
                <span aria-hidden className="h-5 border-l border-dashed border-foreground/40" />
                <span className="flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-b3 text-foreground shadow-[0_6px_18px_-12px_rgba(18,18,18,0.35)]">
                  Connected to the TestMu AI MCP server
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1A7F37] text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                </span>
                </div>
              </div>
            </div>
          </div>

          {/* ratings */}
          <div className="grid border-t border-border lg:grid-cols-3">
            {reviews.vendors.map((vendor, i) => (
              <a
                key={vendor.name}
                href={vendor.href}
                data-cursor={`Read ${vendor.name}`}
                className={`group flex flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-secondary/40 ${
                  i < 2
                    ? "border-b border-border lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-b2 font-medium tracking-tight">
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
                    <span className="ml-1 text-b3 text-muted-foreground">
                      / {vendor.outOf}
                    </span>
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Stars rating={vendor.rating} />
                    <span className="text-b3 text-muted-foreground">
                      {vendor.count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* press */}
          <div className="border-t border-border px-8 py-10">
            <p className="mb-8 text-center text-b4 uppercase tracking-[0.28em] text-muted-foreground">
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
