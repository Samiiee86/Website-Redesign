import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "../index.css";
import ProductPage from "./ProductPage";
import type { PageData } from "./types";

/* Entry for every product page: <body data-page="<slug>"> picks the page's
   data file, loaded on its own so each page only downloads its own words. */
const pages = import.meta.glob<{ default: PageData }>("./data/*.json");

const slug = document.body.dataset.page ?? "";
const load = pages[`./data/${slug}.json`];

if (load) {
  load().then(({ default: d }) => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <MotionConfig reducedMotion="user">
          <ProductPage d={d} />
        </MotionConfig>
      </StrictMode>,
    );
  });
}
