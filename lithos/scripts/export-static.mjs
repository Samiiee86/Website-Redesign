/* Exports every product page as plain HTML for the team: one .html per
   page, one shared CSS file, a small script for the parts that switch
   (device lists, copy buttons, tabs), and the images and fonts the pages
   use. No React needed to open or reuse them.

   node scripts/export-static.mjs <out-dir>
*/
import { build, createServer } from "vite";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] || "../product-pages-html");
const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const TMP = path.join(OUT, ".build");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* 1. the CSS: the same file the built pages load */
await build({ logLevel: "error", build: { outDir: TMP, emptyOutDir: true } });
const sample = fs.readFileSync(path.join(TMP, "cypress-testing.html"), "utf8");
const cssHref = sample.match(/href="\/(assets\/[^"]+\.css)"/)[1];
let css = fs.readFileSync(path.join(TMP, cssHref), "utf8");
css = css
  .replaceAll("url(../assets/img/", "url(../img/")
  .replaceAll("url(/", "url(../")
  .replaceAll("url('/", "url('../")
  .replaceAll('url("/', 'url("../');
fs.mkdirSync(path.join(OUT, "css"), { recursive: true });
/* parts drawn but switched off (other brands' device lists) stay hidden
   even when their classes set a display */
css += "\n[hidden]{display:none!important}\n";
fs.writeFileSync(path.join(OUT, "css/testmu-pages.css"), css);
fs.rmSync(TMP, { recursive: true, force: true });

/* 2. the pages, rendered on the computer (no browser) */
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const React = (await import("react")).default;
const { renderToStaticMarkup } = await import("react-dom/server");
const { default: ProductPage } = await vite.ssrLoadModule("/src/product/ProductPage.tsx");

const esc = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const used = new Set(["favicon_black.svg", "favicon_white.svg", "img/noise.webp"]);
const slugs = fs.readdirSync("src/product/data").filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort();
const pages = [];

const origError = console.error;
console.error = (m, ...r) => (String(m).includes("fetchPriority") ? 0 : origError(m, ...r));

for (const slug of slugs) {
  const d = JSON.parse(fs.readFileSync(`src/product/data/${slug}.json`, "utf8"));
  let body = renderToStaticMarkup(React.createElement(ProductPage, { d }));

  /* the scroll-in animations start hidden: show everything as it ends */
  body = body
    .replace(/ style="([^"]*)"/g, (m, st) => {
      const kept = st
        .split(";")
        .filter((p) => p && !/^\s*opacity\s*:\s*0(\.0+)?\s*$/.test(p) && !/^\s*transform\s*:\s*(translate[XY]?\([^)]*\)\s*)+$/.test(p) && !/^\s*filter\s*:\s*blur/.test(p))
        .join(";");
      return kept ? ` style="${kept}"` : "";
    })
    .replace(/class="([^"]*)"/g, (m, c) => `class="${c.split(/\s+/).filter((x) => x !== "tm-reveal").join(" ")}"`)
    .replace(/fetchPriority=/g, "fetchpriority=");

  /* local files: note them for copying, and make the paths relative */
  body = body.replace(/(src|href|poster)="\/(?!\/)([^"#?]*)"/g, (m, attr, p) => {
    if (fs.existsSync(path.join(PUB, p)) && fs.statSync(path.join(PUB, p)).isFile()) {
      used.add(p);
      return `${attr}="${p}"`;
    }
    return m;
  });
  body = body.replace(/url\((&#x27;|')?\/(img|kit|fonts)\//g, (m, q) => `url(${q ?? ""}${m.includes("img/") ? "img/" : m.includes("kit/") ? "kit/" : "fonts/"}`);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(d.title)}</title>
<meta name="description" content="${esc(d.description)}">
<link rel="icon" href="favicon_black.svg" type="image/svg+xml" media="(prefers-color-scheme: light)">
<link rel="icon" href="favicon_white.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)">
<link rel="stylesheet" href="css/testmu-pages.css">
</head>
<body class="tm" data-page="${slug}">
<div id="root">${body}</div>
<script src="js/testmu-pages.js" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
  pages.push({ slug, name: d.crumb?.[d.crumb.length - 1] ?? slug, size: html.length });
}
await vite.close();

/* 3. the files the pages and CSS point at */
for (const f of fs.readdirSync(path.join(PUB, "fonts"))) used.add(`fonts/${f}`);
for (const p of used) {
  const to = path.join(OUT, p);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(path.join(PUB, p), to);
}

/* 4. the script for the parts that switch */
fs.mkdirSync(path.join(OUT, "js"), { recursive: true });
fs.copyFileSync(path.join(ROOT, "scripts/testmu-pages.js"), path.join(OUT, "js/testmu-pages.js"));

/* 5. an index of every page */
const rows = pages
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((p) => `      <li><a href="${p.slug}.html">${esc(p.name)}</a> <span>${p.slug}.html</span></li>`)
  .join("\n");
fs.writeFileSync(
  path.join(OUT, "index.html"),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Product pages</title>
<link rel="stylesheet" href="css/testmu-pages.css">
<style>
  main { max-width: var(--tm-frame, 1232px); margin: 0 auto; padding: 64px 40px; }
  ul { list-style: none; margin: 40px 0 0; padding: 0; border-top: 1px solid var(--tm-border-default); }
  li { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--tm-border-default); }
  a { color: var(--tm-fg-default); text-decoration: underline; text-underline-offset: 4px; }
  span { font-family: "Space Mono", monospace; font-size: 12px; color: var(--tm-fg-subtle); }
</style>
</head>
<body class="tm" style="background: var(--tm-bg-default)">
<main>
  <h1>Product pages</h1>
  <p>${pages.length} pages. Open any file in a browser, or copy its markup. All pages share css/testmu-pages.css and js/testmu-pages.js.</p>
  <ul>
${rows}
  </ul>
</main>
</body>
</html>
`,
);

console.log(`${pages.length} pages, ${used.size} files -> ${OUT}`);
