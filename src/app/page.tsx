import ContentCrisis from "../components/sections/content-crisis/ContentCrisis";
import Features from "../components/sections/features/Features";
import Hero from "@/components/sections/hero/Hero";
import Navigation from "@/components/common/Navigation";
import SEO from "@/components/common/SEO";
import WritingDemo from "../components/WritingDemo";
import KnowledgeTransform from "../components/KnowledgeTransform";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="bg-black">
      <Navigation />
      <SEO
        title="Authormaton - AI-Powered Content Creation Platform"
        description="Authormaton is an AI-powered platform that transforms your knowledge into high-quality, engaging content at scale. Automate your content creation process."
        keywords="AI, content creation, content marketing, AI writing, content automation, marketing AI"
        canonicalUrl="https://www.authormaton.com"
      />
      <Hero />
      <ContentCrisis />
      <Features />
      <KnowledgeTransform />
      <WritingDemo />
      <Footer />
    </div>
  );
}