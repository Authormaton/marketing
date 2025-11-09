import Navigation from "@/components/common/Navigation";
import Hero from "@/components/sections/hero/Hero";
import ContentCrisis from "@/components/sections/content-crisis/ContentCrisis";
import Features from "@/components/sections/features/Features";
import KnowledgeTransform from "@/components/KnowledgeTransform";
import WritingDemo from "@/components/WritingDemo";
import Footer from "@/components/common/Footer";

export default function Loading() {
  return (
    <div className="bg-black">
      <Navigation loading={true} />
      <Hero />
      <ContentCrisis />
      <Features />
      <KnowledgeTransform />
      <WritingDemo />
      <Footer />
    </div>
  );
}