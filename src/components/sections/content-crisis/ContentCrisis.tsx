import React from 'react';
import { CrisisCardsGrid } from "./CrisisCards";

interface ContentCrisisHeaderProps {
  title: string;
  description: string;
}

const ContentCrisisHeader: React.FC<ContentCrisisHeaderProps> = ({ title, description }) => (
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
      {title}
    </h2>
    <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
      {description}
    </p>
  </div>
);

export default function ContentCrisis() {
  return (
    <section className="w-full py-16 px-4 bg-[#0a0a12] text-white">
      <ContentCrisisHeader
        title="The Web3 Content Crisis"
        description="Today&apos;s technical content creation is broken. Critical blockchain knowledge remains trapped in silos, while quality expertise becomes increasingly scarce."
      />
      <div className="max-w-6xl mx-auto">
        <CrisisCardsGrid />
      </div>
    </section>
  );
}