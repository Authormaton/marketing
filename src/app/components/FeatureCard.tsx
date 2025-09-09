import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle, description }) => {
  return (
    <div className="relative w-full bg-black/20 rounded-2xl p-6 overflow-hidden hover:bg-black/30 transition-colors duration-300">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-white text-xl font-medium mb-1">{title}</h3>
          <p className="text-purple-400 text-sm mb-3">{subtitle}</p>
          <p className="text-gray-400 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;