'use client';

import { useState, useEffect } from 'react';
import ContentCrisis from "../components/sections/content-crisis/ContentCrisis";
import Features from "../components/sections/features/Features";
import Hero from "@/components/sections/hero/Hero";
import Navigation from "@/components/common/Navigation";
import WritingDemo from "../components/WritingDemo";
import KnowledgeTransform from "../components/KnowledgeTransform";
import Footer from "@/components/common/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate 1.5 seconds of loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black">
      <Navigation loading={loading} />
      <Hero />
      <ContentCrisis />
      <Features />
      <KnowledgeTransform />
      <WritingDemo />
      <Footer />
    </div>
  );
}