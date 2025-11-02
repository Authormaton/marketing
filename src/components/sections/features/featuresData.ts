// src/components/sections/features/featuresData.ts
export type Feature =
  | {
      icon: string;
      imageSrc?: never;
      imageAlt?: never;
      title: string;
      subtitle: string;
      description: string;
    }
  | {
      icon?: never;
      imageSrc: string;
      imageAlt: string;
      title: string;
      subtitle: string;
      description: string;
    };

export const features: Feature[] = [
  {
    imageSrc: '/file.svg',
    imageAlt: 'Human-Quality Writing icon',
    title: 'Human-Quality Writing',
    subtitle: 'Expert-level content generation',
    description: 'AI-powered writing that matches the depth and nuance of human experts, with perfect technical accuracy for Web3 content.'
  },
  {
    imageSrc: '/globe.svg',
    imageAlt: 'Verifiable Synthesis icon',
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
