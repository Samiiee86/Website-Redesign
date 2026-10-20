import { ArrowRight, MapPin } from "lucide-react";
import { footer, footerExtra } from "../lib/content";
import { Reveal } from "../lib/ui";

const AI_TOOLS = ["ChatGPT", "Claude", "Perplexity", "Grok", "Gemini"];

const CERTS = [
  "HIPAA",
  "GDPR",
  "AICPA SOC",
  "CSA",
  "CCPA",
  "ADA",
  "ISO 27001",
  "ISO 9001",
  "FSQS",
  "ESG",
  "EU AI ACT",
  "RESPONSIBLE AI",
];

const SOCIALS = ["Facebook", "X", "LinkedIn", "YouTube", "GitHub", "Pinterest"];

export default function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden bg-foreground pt-16 text-background">
      <div className="relative mx-auto w-full max-w-[1240px] px-9 sm:px-16">
        <div className="grid gap-10 pb-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
          {/* identity column */}
          <Reveal>
            <img
              src="/testmu-logo-white.svg"
              alt="TestMu AI"
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-[320px] text-b3 leading-relaxed text-background/60">
              {footerExtra.blurb}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button className="group inline-flex items-center gap-2 rounded-[8px] bg-background px-4 py-2.5 text-b3 font-medium text-foreground transition-transform duration-300 hover:-translate-y-0.5">
                {footerExtra.primary}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button className="rounded-[8px] border border-background/40 px-4 py-2.5 text-b3 font-medium text-background transition-colors duration-300 hover:bg-background/10">
                {footerExtra.secondary}
              </button>
            </div>

            <div className="mt-6">
              <p className="text-b4 text-background/55">
                {footerExtra.summarize}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                {AI_TOOLS.map((tool) => (
                  <span
                    key={tool}
                    title={tool}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-background/25 text-[8px] text-background/70"
                  >
                    {tool.slice(0, 2)}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-[320px] text-b4 leading-relaxed text-background/50">
              {footerExtra.compliance}
            </p>
            <div className="mt-3 grid max-w-[300px] grid-cols-6 gap-1.5">
              {CERTS.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="flex h-8 items-center justify-center border border-background/15 bg-background/[0.06] px-0.5 text-center text-[6px] leading-tight text-background/55"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-6 text-b4 leading-relaxed text-background/55">
              <p className="text-background/75">{footerExtra.address.title}</p>
              <p className="mt-1.5 flex items-center gap-1.5">
                <MapPin size={11} />
                {footerExtra.address.label}
              </p>
              {footerExtra.address.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>

          {/* link columns — four across, like the live site */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {footer.groups.slice(0, 4).map((group, i) => (
              <Reveal key={group.title} delay={i * 0.05}>
                <p className="text-b4 uppercase tracking-[0.18em] text-background/45">
                  {group.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-b3 leading-snug text-background/60 transition-colors duration-300 hover:text-background"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* stack the remaining groups under the last two columns */}
                {i === 2 && (
                  <>
                    <p className="mt-8 text-b4 uppercase tracking-[0.18em] text-background/45">
                      {footer.groups[4].title}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {footer.groups[4].links.map((link) => (
                        <li key={link}>
                          <a
                            href="#top"
                            className="text-b3 leading-snug text-background/60 transition-colors duration-300 hover:text-background"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {i === 3 && (
                  <>
                    <p className="mt-8 text-b4 uppercase tracking-[0.18em] text-background/45">
                      {footer.groups[5].title}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {footer.groups[5].links.slice(0, 10).map((link) => (
                        <li key={link}>
                          <a
                            href="#top"
                            className="text-b3 leading-snug text-background/60 transition-colors duration-300 hover:text-background"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 text-b4 uppercase tracking-[0.18em] text-background/45">
                      {footer.whatsNew.title}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {footer.whatsNew.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#top"
                            className="text-b3 leading-snug text-background/60 transition-colors duration-300 hover:text-background"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        <div
          data-game-align
          className="flex flex-col gap-4 border-t border-background/15 py-6 text-b4 text-background/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{footerExtra.bottom.legal}</p>
          <p>{footerExtra.bottom.built}</p>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <span
                key={s}
                title={s}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-background/12 text-[8px] text-background/70"
              >
                {s.slice(0, 2)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* full-bleed play area, last thing on the page */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-background/15">
      </div>
    </footer>
  );
}
