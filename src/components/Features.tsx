import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: '✍️',
      title: 'Human-Quality Writing',
      subtitle: 'Expert-level content generation',
      description: 'AI-powered writing that matches the depth and nuance of human experts, with perfect technical accuracy for Web3 content.'
    },
    {
      icon: '🛡️',
      title: 'Verifiable Synthesis',
      subtitle: 'Transparent source validation',
      description: 'Every claim is backed by verifiable sources with full traceability, ensuring content reliability and building community trust.'
    },
    {
      icon: '🔄',
      title: 'Multi-Agent Workflows',
      subtitle: 'Collaborative AI intelligence',
      description: 'Specialized AI agents work together seamlessly - research, analysis, writing, and review - like a coordinated expert team.'
    },
    {
      icon: '👥',
      title: 'Human-AI Collaboration',
      subtitle: 'Augmented expertise',
      description: 'Perfect harmony between AI efficiency and human insight, allowing experts to focus on strategy while AI handles execution.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;