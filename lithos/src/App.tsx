import { MotionConfig } from "motion/react";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import Home10 from "./v10/Home10";

/* Version 10 of the home page: the "When AI verifies AI" layout. The earlier
   home (hero, logo wall, Pioneer bento, stack flow and the rest) stays on
   the other version branches. */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background font-body">
        <Header
          banner={{
            text: "Test how your agents actually behave across workflows, tools, and actions |",
            cta: "Try Agent Assurance now! →",
          }}
        />
        <main className="relative">
          <GuideLines />
          <Home10 />
        </main>
      </div>
    </MotionConfig>
  );
}
