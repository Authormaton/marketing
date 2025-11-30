import { FC } from 'react';
import FAQ from '@/components/sections/faq/FAQ';
import Hero from '@/components/sections/hero/Hero';
import Features from '@/components/sections/features/Features';
import ContentCrisis from '@/components/sections/content-crisis/ContentCrisis';

const HomePage: FC = () => {
  return (
    <main>
      <Hero />
      <Features />
      <ContentCrisis />
      <FAQ />
    </main>
  );
}

export default HomePage;
