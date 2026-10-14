import { MotionConfig } from "motion/react";
import CursorPill from "./components/CursorPill";
import ScrollProgress from "./components/ScrollProgress";
import GuideLines from "./components/GuideLines";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustedBy from "./sections/TrustedBy";
import Bento from "./sections/Bento";
import Flow from "./sections/Flow";
import Unified from "./sections/Unified";
import Stories from "./sections/Stories";
import Reasons from "./sections/Reasons";
import Rebrand from "./sections/Rebrand";
import Faq from "./sections/Faq";
import Enterprise from "./sections/Enterprise";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background font-body">
        <ScrollProgress />
        <CursorPill />
        <Header />

        {/* The hero fills the first screen but is never clipped: the section
            grows with its content, so the dashboard (image today, video later)
            always ends inside it instead of being cut by the fold. */}
        <div className="flex min-h-[calc(100vh-104px)] flex-col">
          <Hero />
        </div>

        <main className="relative">
          <GuideLines />

          <TrustedBy />
          <Bento />
          <Flow />
          <Unified />
          <Stories />
          <Reasons />
          <Rebrand />
          <Faq />
          <Enterprise />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}
