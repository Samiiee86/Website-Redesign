import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  NAV,
  announcement,
  headerActions,
  type Card,
  type DescItem,
  type GridMenu,
  type Group,
  type PanelMenu,
  type ProductsMenu,
  type RailBlock,
  type RichItem,
} from "../lib/nav";

/* Global header. Five nav items, four panels, one config.
   Panels are absolutely positioned under the bar, so opening one never
   shifts the page. Every panel is exactly as wide as its own contents. */

const ROW_PLAIN =
  "flex items-center min-h-[34px] px-[9px] -mx-[9px] text-[15px] font-medium text-[#121212] whitespace-nowrap overflow-hidden text-ellipsis transition-colors hover:bg-[#F5F4F0]";
/* the artifact pattern: small tracked caps over each column */
const CAPTION_MONO =
  "font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#7F7F7E]";
const CLOSE_DELAY = 120;

function RichRow({ item }: { item: RichItem }) {
  return (
    <a
      href="#top"
      className="flex items-start gap-[11px] px-[9px] py-[7px] -mx-[9px] transition-colors hover:bg-[#F5F4F0]"
    >
      <img
        src={item.icon}
        alt=""
        aria-hidden
        className="mt-px h-7 w-7 flex-none"
        loading="lazy"
      />
      <span className="min-w-0">
        <span className="flex items-center gap-[7px]">
          <span className="text-[15px] font-medium leading-5 text-[#121212]">
            {item.name}
          </span>
          {item.badge && (
            <span className="bg-[#E7E6DF] px-2 py-px font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#121212]">
              {item.badge}
            </span>
          )}
        </span>
        <span className="block whitespace-normal text-[12px] font-normal leading-[17px] text-[#4D4D4D]">
          {item.desc}
        </span>
      </span>
    </a>
  );
}

function GroupColumn({ group }: { group: Group }) {
  return (
    <div>
      <div className={`${CAPTION_MONO} mb-2`}>{group.caption}</div>
      <div className="flex flex-col">
        {group.rich
          ? group.items.map((item) => <RichRow key={item.name} item={item} />)
          : group.items.map((item) => (
              <a key={item.name} href="#top" className={ROW_PLAIN}>
                {item.name}
                {item.badge && (
                  <span className="ml-2 bg-[#E7E6DF] px-[6px] py-px font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#121212]">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
      </div>
    </div>
  );
}

function Rail({
  blocks,
  cardsCaption,
  cards,
  width,
}: {
  blocks?: RailBlock[];
  cardsCaption?: string;
  cards?: Card[];
  width: number;
}) {
  return (
    <div
      style={{ width }}
      className="flex flex-none flex-col gap-[30px] border-l border-[#E7E6DF] bg-white pb-[22px] pl-8 pr-6 pt-[26px]"
    >
      {blocks?.map((block) => (
        <div key={block.caption}>
          <div className={`${CAPTION_MONO} mb-2`}>{block.caption}</div>
          <div className="flex flex-col">
            {block.items.map((item) => (
              <a key={item} href="#top" className={ROW_PLAIN}>
                {item}
              </a>
            ))}
          </div>
        </div>
      ))}

      {cards && cards.length > 0 && (
        <div>
          {cardsCaption && (
            <div className={`${CAPTION_MONO} mb-2`}>{cardsCaption}</div>
          )}
          <div className="flex flex-col gap-[14px]">
            {cards.map((card) => (
              <a key={card.name} href="#top" className="flex flex-col gap-2.5">
                <img
                  src={card.image}
                  alt=""
                  className="h-auto w-[192px] bg-[#F5F4F0]"
                  loading="lazy"
                />
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium leading-5 text-[#121212]">
                    {card.name}
                  </span>
                  <span className="mt-0.5 block whitespace-normal text-[13px] font-normal leading-[18px] text-[#4D4D4D]">
                    {card.desc}
                  </span>
                  {card.cta && (
                    <span className="mt-2.5 inline-flex items-center gap-1.5 self-start border-b border-[#121212] pb-0.5 text-[13px] font-medium text-[#121212]">
                      {card.cta} <span aria-hidden>→</span>
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PanelShell({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ width }} className="max-w-full">
      {children}
    </div>
  );
}

function ColumnsPanel({ menu }: { menu: PanelMenu }) {
  return (
    <PanelShell width={menu.width}>
      <div className="flex">
        <div className="flex flex-none pb-[22px] pl-7 pt-[26px]">
          {menu.groups.map((group, i) => {
            const w = parseInt(menu.cols.split(" ")[i] ?? "190", 10);
            return (
              <div
                key={group.caption}
                style={{ width: w + (i === 0 ? 24 : 48) }}
                className={i === 0 ? "pr-6" : "border-l border-[#E7E6DF] px-6"}
              >
                <GroupColumn group={group} />
              </div>
            );
          })}
        </div>
        <Rail
          blocks={menu.rail}
          cardsCaption={menu.cardsCaption}
          cards={menu.cards}
          width={menu.railWidth}
        />
      </div>
    </PanelShell>
  );
}

/* a product row in the new panels: name (+badge), optional one-liner */
function DescRow({ item }: { item: DescItem }) {
  return (
    <a
      href="#top"
      className="-mx-[9px] block px-[9px] py-[7px] transition-colors hover:bg-[#F5F4F0]"
    >
      <span className="flex items-center gap-[7px]">
        <span className="text-[15px] font-medium leading-5 text-[#121212]">
          {item.name}
        </span>
        {item.badge && (
          <span className="bg-[#E7E6DF] px-[6px] py-px font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#121212]">
            {item.badge}
          </span>
        )}
      </span>
      {item.desc && (
        <span className="mt-0.5 block whitespace-normal text-[13px] font-normal leading-[18px] text-[#4D4D4D]">
          {item.desc}
        </span>
      )}
    </a>
  );
}

function ProductsPanel({ menu }: { menu: ProductsMenu }) {
  return (
    <PanelShell width={menu.width}>
      <div className="flex pb-[24px] pl-7 pr-8 pt-[26px]">
        {/* Kane, then the agents you build */}
        <div className="w-[354px] flex-none pr-6">
          <div className={`${CAPTION_MONO} mb-2`}>{menu.kane.caption}</div>
          <div className="border border-[#E7E6DF] bg-[#FAFAF8] px-3 py-2">
            {menu.kane.items.map((item) => (
              <DescRow key={item.name} item={item} />
            ))}
          </div>
          <div className="my-5 border-t border-[#E7E6DF]" />
          <div className={`${CAPTION_MONO} mb-2`}>{menu.agentTest.caption}</div>
          <div className="flex flex-col gap-1">
            {menu.agentTest.items.map((item) => (
              <DescRow key={item.name} item={item} />
            ))}
          </div>
        </div>

        <div className="w-[318px] flex-none border-l border-[#E7E6DF] px-6">
          <div className={`${CAPTION_MONO} mb-2`}>{menu.cloud.caption}</div>
          <div className="flex flex-col gap-1">
            {menu.cloud.items.map((item) => (
              <DescRow key={item.name} item={item} />
            ))}
          </div>
        </div>

        <div className="w-[274px] flex-none border-l border-[#E7E6DF] pl-6">
          <div className={`${CAPTION_MONO} mb-2`}>{menu.quality.caption}</div>
          <div className="flex flex-col gap-1">
            {menu.quality.items.map((item) => (
              <DescRow key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function SolutionsPanel({ menu }: { menu: GridMenu }) {
  return (
    <PanelShell width={menu.width}>
      <div className="flex pb-[24px] pl-7 pr-8 pt-[26px]">
        <div className="flex-none pr-6">
          <div className={`${CAPTION_MONO} mb-2`}>By use case</div>
          <div className="grid auto-rows-[34px] grid-cols-[192px_192px_192px] gap-x-7 [grid-auto-flow:column] [grid-template-rows:repeat(6,34px)]">
            {menu.useCases.map((useCase) => (
              <a key={useCase} href="#top" className={ROW_PLAIN}>
                {useCase}
              </a>
            ))}
          </div>
        </div>

        <div className="flex w-[300px] flex-none flex-col border-l border-[#E7E6DF] pl-6">
          <div className={`${CAPTION_MONO} mb-2`}>{menu.services.caption}</div>
          <div className="flex flex-col">
            {menu.services.items.map((svc) => (
              <a key={svc} href="#top" className={ROW_PLAIN}>
                {svc}
              </a>
            ))}
          </div>
          <div className="mt-auto bg-[#EEF2FF] px-4 py-3.5">
            <span className="block text-[15px] font-medium leading-5 text-[#121212]">
              {menu.quote.title}
            </span>
            <a
              href="#top"
              className="mt-2 inline-flex items-center gap-1.5 border-b border-[#121212] pb-0.5 text-[14px] font-medium text-[#121212]"
            >
              {menu.quote.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* bottom strip: enterprise apps beside what AI builds */}
      <div className="flex border-t border-[#E7E6DF]">
        <div className="flex-1 py-[18px] pl-7 pr-6 pb-[22px]">
          <div className={`${CAPTION_MONO} mb-2`}>Enterprise apps we test</div>
          <div className="flex flex-wrap gap-1.5">
            {menu.erp.map((app) => (
              <a
                key={app}
                href="#top"
                className="flex-none whitespace-nowrap border border-[#E7E6DF] bg-[#FAFAF8] px-[11px] py-1 text-[13px] font-medium leading-[18px] text-[#121212] transition-colors hover:border-[#121212]"
              >
                {app}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-none border-l border-[#E7E6DF] py-[18px] pl-6 pr-8 pb-[22px]">
          <div className={`${CAPTION_MONO} mb-2`}>Test what AI builds</div>
          <div className="flex items-center gap-5">
            {menu.aiBuilds.map((tool) => (
              <a
                key={tool}
                href="#top"
                className="whitespace-nowrap text-[15px] font-medium text-[#121212] transition-colors hover:text-[#4D4D4D]"
              >
                {tool}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>("products");
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* a short delay so diagonal travel from button to panel doesn't dismiss it */
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  const active = NAV.find((n) => n.key === open);

  return (
    <>
      <div className="flex h-10 items-center justify-center gap-2.5 bg-[#121212] text-[13px] font-medium leading-none text-white">
        <span>{announcement.text}</span>
        <a href="#top" className="border-b border-white/45 pb-0.5 text-white">
          {announcement.cta}
        </a>
      </div>

      <div
        className="sticky top-0 z-50 bg-[#F5F4F0]"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-8 px-7">
          <a href="#top" className="flex flex-none items-center">
            <img
              src="/testmu-logo-dark.svg"
              alt="TestMu AI"
              className="h-6 w-auto"
            />
          </a>

          <nav className="hidden flex-none items-center gap-0.5 min-[1181px]:flex">
            {NAV.map((item) => (
              <button
                key={item.key}
                aria-expanded={open === item.key}
                aria-controls={
                  item.kind === "plain" ? undefined : `panel-${item.key}`
                }
                onMouseEnter={() => {
                  cancelClose();
                  setOpen(item.kind === "plain" ? null : item.key);
                }}
                onClick={() =>
                  setOpen(
                    item.kind === "plain"
                      ? null
                      : open === item.key
                        ? null
                        : item.key,
                  )
                }
                className={`cursor-pointer whitespace-nowrap px-3 py-2 text-[15px] font-medium text-[#121212] transition-opacity duration-150 hover:opacity-70 ${
                  open === item.key ? "opacity-70" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex flex-none items-center gap-2.5 min-[1181px]:hidden">
            <span className="text-[17px] text-[#4D4D4D]">⌕</span>
            <button
              onClick={() => {
                setDrawer((d) => !d);
                setOpen(null);
              }}
              className="btn btn-sm btn-secondary"
            >
              Menu ☰
            </button>
          </div>

          <div className="ml-auto hidden flex-none items-center gap-2 min-[1181px]:flex [&>*]:flex-none [&_a]:whitespace-nowrap">
            <a href="#top" className="btn btn-sm btn-ghost">
              {headerActions.signIn}
            </a>
            <a href="#top" className="btn btn-sm btn-secondary">
              {headerActions.sales}
            </a>
            <a href="#top" className="btn btn-sm btn-primary">
              {headerActions.start}
            </a>
          </div>
        </div>

        {active && active.kind !== "plain" && (
          <div
            id={`panel-${active.key}`}
            className="absolute inset-x-0 top-full pt-1.5"
          >
            <div className="mx-auto w-full max-w-[1280px] px-7">
              <motion.div
                layout
                transition={{
                  layout: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                }}
                className="panel-in w-fit max-w-full overflow-hidden border border-[#E7E6DF] bg-white shadow-[0_24px_60px_rgba(18,18,18,0.14)]"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    {active.kind === "products" && (
                      <ProductsPanel menu={active} />
                    )}
                    {active.kind === "panel" && <ColumnsPanel menu={active} />}
                    {active.kind === "grid" && <SolutionsPanel menu={active} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        )}

        {drawer && (
          <div className="panel-in absolute inset-x-0 top-full max-h-[78vh] overflow-auto border-t border-[#E7E6DF] bg-white shadow-[0_24px_60px_rgba(18,18,18,0.14)]">
            <div className="px-[22px] pb-[26px] pt-3.5">
              {NAV.map((item) => {
                const on = item.kind !== "plain" && section === item.key;
                const lists: { caption: string; items: string[] }[] = [];
                if (item.kind === "products") {
                  lists.push({
                    caption: item.kane.caption,
                    items: item.kane.items.map((i) => i.name),
                  });
                  lists.push({
                    caption: item.agentTest.caption,
                    items: item.agentTest.items.map((i) => i.name),
                  });
                  lists.push({
                    caption: item.cloud.caption,
                    items: item.cloud.items.map((i) => i.name),
                  });
                  lists.push({
                    caption: item.quality.caption,
                    items: item.quality.items.map((i) => i.name),
                  });
                } else if (item.kind === "grid") {
                  lists.push({ caption: "By use case", items: item.useCases });
                  lists.push({
                    caption: item.services.caption,
                    items: item.services.items,
                  });
                  lists.push({
                    caption: "Test what AI builds",
                    items: item.aiBuilds,
                  });
                  lists.push({
                    caption: "Enterprise apps we test",
                    items: item.erp,
                  });
                } else if (item.kind === "panel") {
                  item.groups.forEach((g) =>
                    lists.push({
                      caption: g.caption,
                      items: g.items.map((i) => i.name),
                    }),
                  );
                  item.rail?.forEach((r) =>
                    lists.push({ caption: r.caption, items: r.items }),
                  );
                }

                return (
                  <div key={item.key} className="border-b border-[#E7E6DF]">
                    <button
                      onClick={() => setSection(on ? null : item.key)}
                      className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-4 text-[17px] font-medium text-[#121212]"
                    >
                      {item.label}
                      <span className="text-[18px] text-[#4D4D4D]">
                        {item.kind === "plain" ? "" : on ? "−" : "+"}
                      </span>
                    </button>
                    {on && (
                      <div className="flex flex-col gap-4 pb-[18px] pt-1">
                        {lists.map((list) => (
                          <div key={list.caption}>
                            <div className="mb-1.5 text-[14px] font-normal text-[#7F7F7E]">
                              {list.caption}
                            </div>
                            <div
                              className={
                                list.items.length > 6
                                  ? "grid grid-cols-2 gap-x-3"
                                  : "flex flex-col"
                              }
                            >
                              {list.items.map((entry) => (
                                <a
                                  key={entry}
                                  href="#top"
                                  className="flex min-h-[44px] items-center border-b border-[#F5F4F0] text-[15px] font-medium text-[#121212]"
                                >
                                  {entry}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-[22px] flex flex-col gap-2.5">
                <a
                  href="#top"
                  className="btn btn-lg btn-primary w-full"
                >
                  Start now →
                </a>
                <a
                  href="#top"
                  className="btn btn-lg btn-secondary w-full"
                >
                  Contact sales
                </a>
                <a
                  href="#top"
                  className="flex h-11 items-center justify-center text-[16px] font-medium text-[#4D4D4D]"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
