import React, { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { features as staticFeatures, Feature } from './featuresData';

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featureData, setFeatureData] = useState<Feature[] | null>(null);

  const fetchFeatures = () => {
    setIsLoading(true);
    setError(null);
    // Simulate an API call
    setTimeout(() => {
      try {
        // Simulate a random error for demonstration
        if (Math.random() < 0.2) { // 20% chance of error
          throw new Error('Failed to load features. Please try again.');
        }
        setFeatureData(staticFeatures);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setFeatureData(null);
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Simulate 1.5 seconds loading time
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <FeatureCard key={index} loading={true} title="" subtitle="" description="" />
      ));
    }

    if (error) {
      return (
        <div className="col-span-1 md:col-span-2 text-center p-8 bg-red-900/20 border border-red-700/40 rounded-2xl text-red-300">
          <p className="text-lg font-semibold mb-4">Error: {error}</p>
          <button
            onClick={fetchFeatures}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      );
    }

    if (featureData) {
      return featureData.map((feature, index) => (
        <FeatureCard
          key={index}
          imageSrc={feature.imageSrc}
          imageAlt={feature.imageAlt || feature.title}
          icon={feature.icon}
          title={feature.title}
          subtitle={feature.subtitle}
          description={feature.description}
        />
      ));
    }

    return null; // Should not happen if states are managed correctly
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Features;