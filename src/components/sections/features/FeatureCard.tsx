import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle, description }) => {
  return (
    <div className="relative w-full bg-gradient-to-br from-black/30 via-black/10 to-purple-900/10 border border-purple-800/30 shadow-xl rounded-2xl p-7 overflow-hidden hover:shadow-2xl hover:border-purple-500/60 transition-all duration-300 group">
      <div className="flex gap-5 items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-900/60 to-black/60 border border-purple-700/40 rounded-xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <span className="drop-shadow-lg select-none" aria-hidden="true">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-white text-2xl font-semibold mb-1 tracking-tight drop-shadow-sm">{title}</h3>
          <p className="text-purple-300 text-sm mb-2 font-medium">{subtitle}</p>
          <p className="text-gray-300 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;