// src/app/demo/page.tsx
'use client'
import React from 'react'
import Navigation from '@/components/common/Navigation'
import SEO from '@/components/common/SEO'

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <SEO
        title="Authormaton Demo - Experience AI Content Creation"
        description="Explore the Authormaton demo and see how our AI-powered platform can transform your content creation workflow."
        keywords="AI demo, content creation demo, Authormaton demo, AI writing tool demo"
        canonicalUrl="https://www.authormaton.com/demo"
      />
      <main id="main-content">
        <h1>Demo</h1>
        <p>This is the demo page. Replace with your actual demo content.</p>
      </main>
    </>
  )
}