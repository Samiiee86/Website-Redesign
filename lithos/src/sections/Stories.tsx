import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Play, Quote, X } from "lucide-react";
import { storiesGrid } from "../lib/content";
import { Reveal, Section } from "../lib/ui";

const CUSTOMER_VIDEO = "/video/customer.mp4";
/* caption-free b-roll from the same film, for the silent card loop */
const CUSTOMER_PREVIEW = "/video/customer-preview.mp4";

/* Full-screen player. The inline video plays silent on a loop; clicking it
   opens this popup, which starts from the top with sound and controls. */
function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 md:p-10"
    >
      <button
        aria-label="Close video"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={18} />
      </button>
      <motion.video
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-6xl bg-black"
        src={CUSTOMER_VIDEO}
        controls
        autoPlay
        playsInline
      />
    </motion.div>
  );
}

export default function Stories() {
  const { hero, wide } = storiesGrid;
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <Section>
      <Reveal className="mb-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center lg:gap-14">
          <h2 className="tracking-tight">
            <span className="block text-muted-foreground">
              {storiesGrid.lead}
            </span>
            <span className="block">TestMu AI (formerly LambdaTest)</span>
          </h2>
          <p className="max-w-[430px] text-b1 leading-relaxed text-muted-foreground">
            {storiesGrid.body}
          </p>
        </div>
        <button className="btn btn-lg btn-secondary mt-8">
          {storiesGrid.cta}
        </button>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="-mx-8 overflow-hidden border-y border-border bg-surface">
          {/* headline case */}
          <div className="grid lg:grid-cols-[2fr_1fr]">
            {/* the video sits on a white frame; the quote shares the surface */}
            <div className="p-6 lg:pr-0">
              <div
                data-cursor="Play video"
                role="button"
                tabIndex={0}
                onClick={() => setPlayerOpen(true)}
                onKeyDown={(e) => e.key === "Enter" && setPlayerOpen(true)}
                className="group relative h-[270px] cursor-pointer overflow-hidden md:h-full md:min-h-[380px]"
              >
                <video
                  src={CUSTOMER_PREVIEW}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(211deg, rgba(18,18,18,0) 26%, rgba(18,18,18,0.63) 78%)",
                  }}
                />

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6">
                  <div>
                    <p className="pixel text-[44px] leading-none tracking-tight text-white md:text-[56px]">
                      {hero.stat}
                    </p>
                    <p className="mt-2 text-b2 capitalize text-white/90">
                      {hero.statLabel}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 rounded-[6px] border border-white bg-white/10 px-4 py-2 text-b3 font-medium uppercase text-white backdrop-blur-md transition-colors group-hover:bg-white/20">
                    <Play size={13} className="fill-white" />
                    {hero.action}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:pl-6">
              <img
                src={hero.brand}
                alt="Dashlane"
                className="h-9 w-auto max-w-[147px] object-contain object-left"
              />
              <div>
                <Quote size={22} className="text-foreground" />
                <blockquote className="mt-5 max-w-[380px] text-[22px] leading-[1.35] tracking-tight md:text-[24px]">
                  {hero.quote}
                </blockquote>
                <footer className="mt-6 text-b2">
                  {hero.name}
                  <span className="block text-b3 text-muted-foreground">
                    {hero.role}
                  </span>
                </footer>
              </div>
            </div>
          </div>

          {/* supporting cases: two white cards, Best Egg's photo runs to the
              surface edges */}
          <div className="grid border-t border-border lg:grid-cols-[1fr_1fr_2fr]">
            {storiesGrid.cells.map((cell) => (
              <a
                key={cell.brand}
                href={cell.href}
                data-cursor="Read case study"
                className="group flex flex-col justify-between gap-10 border-b border-border p-6 transition-colors duration-500 hover:bg-secondary/40 md:p-8 lg:border-b-0 lg:border-r"
              >
                <div className="flex items-start justify-between gap-4">
                  <img
                    src={cell.brand}
                    alt=""
                    className={`w-auto max-w-[190px] object-contain object-left ${
                      /transavia/.test(cell.brand) ? "h-7" : "h-8"
                    }`}
                  />
                  {/* slides in on hover, like the review cards in More Reasons */}
                  <ArrowUpRight
                    size={18}
                    className="translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100"
                  />
                </div>
                <div>
                  <p className="pixel text-[40px] leading-none tracking-tight">
                    {cell.stat}
                  </p>
                  <p className="mt-3 max-w-[260px] text-b2 leading-relaxed text-muted-foreground">
                    {cell.desc}
                  </p>
                </div>
              </a>
            ))}
            <a
              href={wide.href}
              data-cursor="Read case study"
              className="group relative min-h-[300px] overflow-hidden"
            >
              <img
                src={wide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(54deg, rgba(18,18,18,0.78) 32%, rgba(18,18,18,0) 72%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <img
                  src={wide.brand}
                  alt="Best Egg"
                  className="h-9 w-auto max-w-[157px] object-contain object-left"
                />
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="pixel text-[44px] leading-none tracking-tight text-white">
                      {wide.stat}
                    </p>
                    <p className="mt-3 max-w-[260px] text-b2 capitalize leading-snug text-white/90">
                      {wide.desc}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 rounded-[6px] border border-white bg-white/10 px-4 py-2 text-b3 font-medium uppercase text-white backdrop-blur-md transition-colors group-hover:bg-white/20">
                    {wide.action}
                    <Play size={12} className="fill-white" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Reveal>
      <AnimatePresence>
        {playerOpen && <VideoModal onClose={() => setPlayerOpen(false)} />}
      </AnimatePresence>
    </Section>
  );
}
