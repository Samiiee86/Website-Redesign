import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MotionConfig } from "motion/react";
import App from "./App.tsx";
import PioneerOptions from "./PioneerOptions.tsx";

/* ?options=pioneer opens the Pioneer layout review page instead of the site */
const reviewing = new URLSearchParams(location.search).get("options") === "pioneer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {reviewing ? (
      <MotionConfig reducedMotion="user">
        <PioneerOptions />
      </MotionConfig>
    ) : (
      <App />
    )}
  </StrictMode>,
);
