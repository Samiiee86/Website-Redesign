import { MotionConfig } from "motion/react";
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
        <Header />

        {/* The hero is content-height: no viewport lock, so tall monitors
            don't get a dead band between the sea card and the logo wall. */}
        <Hero />

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
