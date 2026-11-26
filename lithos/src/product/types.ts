/* The shape of src/product/data/<slug>.json, made by the extract script
   from each live testmuai.com product page. */

export type Status = { label: string; kind: "pass" | "fail" | "done" | "run" } | null;

export type Run = {
  title: string;
  live: string;
  rows: { who: string; text: string; st: Status }[];
  diff: string[];
  verdict: string;
  evid: string;
};

type Head = { id: string | null; head: string; body: string[] };

export type Sec =
  | (Head & { type: "glance"; price: string; facts: [string, string][] })
  | (Head & { type: "steps"; items: [string, string][] })
  | (Head & { type: "strat"; items: [string, string][] })
  | (Head & { type: "caps"; items: [string, string][] })
  | (Head & {
      type: "cmp";
      caption: string;
      cols: string[];
      rows: string[][];
      notes: string[];
      cta?: string;
      code?: { label: string; lang: string; code: string; note: string } | null;
    })
  | (Head & { type: "groups"; groups: { name: string; count: string; cols: string[]; rows: string[][] }[]; src: string })
  | (Head & {
      type: "mcp";
      setups: { label: string; value: string; button: string; href: string | null }[];
      cards: { name: string; body: string; cta: string; href: string | null; logo: string | null }[];
    })
  | (Head & { type: "devices"; tabs: string[]; groups: { name: string; devices: string[][] }[]; href: string; promos: { title: string; body: string; cta: string; href: string | null; img: string | null }[] })
  | (Head & { type: "data"; cols: string[]; rows: string[][]; src: string })
  | (Head & { type: "teams"; items: { name: string; for: string; items: string[]; dark: boolean }[] })
  | (Head & { type: "stories"; items: { num: string; text: string; cta: string; href: string }[] })
  | (Head & {
      type: "rel";
      items: { name: string; body: string; href: string }[];
      res: { group: string; links: { label: string; href: string }[] }[];
      fw?: { summary: string; groups: { title: string; href: string | null; links: { label: string; href: string }[] }[] } | null;
    })
  | (Head & { type: "faq"; items: { q: string; a: string }[] })
  | { type: "final"; id: string | null; head: string; body: string; ctas: { label: string; href: string | null; primary: boolean }[] };

export type PageData = {
  slug: string;
  title: string;
  description: string;
  crumb: string[];
  hero: {
    eyebrow: string[];
    h1a: string;
    h1b: string;
    lede: string;
    ctas: { label: string; href: string | null; primary: boolean }[];
    note: string;
    chipsLabel: string;
    chips: string[];
    image: { src: string; alt: string } | null;
    run: Run | null;
  };
  sections: Sec[];
};
