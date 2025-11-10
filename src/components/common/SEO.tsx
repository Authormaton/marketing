import Head from 'next/head';
import { FC } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
}

const SEO: FC<SEOProps> = ({ title, description, keywords, canonicalUrl }) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Authormaton",
    "url": "https://www.authormaton.com",
    "logo": "https://www.authormaton.com/logo.png", // Replace with actual logo URL
    "sameAs": [
      "https://twitter.com/authormaton", // Replace with actual Twitter URL
      "https://linkedin.com/company/authormaton" // Replace with actual LinkedIn URL
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Authormaton",
    "url": "https://www.authormaton.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.authormaton.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Authormaton",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.authormaton.com/logo.png" // Replace with actual logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Authormaton"
    }
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
};

export default SEO;
