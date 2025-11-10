import React from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';

interface FeatureCardProps {
  imageSrc?: string;
  icon?: string;
  title: string;
  subtitle: string;
  description: string;
  imageAlt?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ imageSrc, icon, title, subtitle, description, imageAlt }) => {
  const titleId = `feature-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div role="article" aria-labelledby={titleId} className="relative w-full bg-gradient-to-br from-black/30 via-black/10 to-purple-900/10 border border-purple-800/30 shadow-xl rounded-2xl p-7 overflow-hidden hover:shadow-2xl hover:border-purple-500/60 transition-all duration-300 group">
      <div className="flex gap-5 items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-900/60 to-black/60 border border-purple-700/40 rounded-xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {imageSrc ? (
            <OptimizedImage
              src={imageSrc}
              alt={imageAlt || title}
              className="w-8 h-8 object-contain"
              width={32} // Corresponds to w-8 (8 * 4 = 32px)
              height={32} // Corresponds to h-8 (8 * 4 = 32px)
            />
          ) : (
            <span className="feature-icon" aria-hidden="true">{icon}</span>
          )}
        </div>
        <div className="flex-1">
          <h3 id={titleId} className="text-white text-2xl font-semibold mb-1 tracking-tight drop-shadow-sm">{title}</h3>
          <p className="text-purple-300 text-sm mb-2 font-medium">{subtitle}</p>
          <p className="text-gray-300 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;