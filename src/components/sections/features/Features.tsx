import React from 'react';
import FeatureCard from './FeatureCard';
import { features } from './featuresData';

const Features = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.icon}
            imageAlt={feature.title}
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