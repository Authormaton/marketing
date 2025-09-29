

import ContentCrisis from "../components/sections/content-crisis/ContentCrisis";
import Features from "../components/Features";
import Hero from "@/components/sections/hero/Hero";
import Navigation from "@/components/common/Navigation";
import WritingDemo from "../components/WritingDemo";
import KnowledgeTransform from "../components/KnowledgeTransform";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="bg-black">
      <Navigation />
      <Hero />
      <ContentCrisis />
      <Features />
      <KnowledgeTransform />
      <WritingDemo />
      <Footer />
    </div>
  );
}