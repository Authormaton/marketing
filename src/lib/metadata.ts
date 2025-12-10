import type { Metadata } from 'next';

const AUTHORMATION_LOGO_PATH = '/bg.png';

interface SEOProps {
  title: string;
  description: string;
  keywords: string | string[];
  canonicalUrl: string;
}

export function generateSEOMetadata({ title, description, keywords, canonicalUrl }: SEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Authormaton',
    url: 'https://www.authormaton.com',
    logo: `https://www.authormaton.com${AUTHORMATION_LOGO_PATH}`, // Use the centralized logo path
    sameAs: [
      'https://twitter.com/authormaton', // Placeholder: Replace with actual Twitter profile
      'https://www.linkedin.com/company/authormaton', // Placeholder: Replace with actual LinkedIn profile
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Authormaton',
    url: 'https://www.authormaton.com',
    // Removed SearchAction as /search route is not implemented
  };
}
