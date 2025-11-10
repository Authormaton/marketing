// src/app/demo/page.tsx
'use client'
import React from 'react'
import Navigation from '@/components/common/Navigation'
interface DemoPageProps {}

const DemoPage: FC<DemoPageProps> = () => {
  return (
      <main id="main-content">
        <h1>Demo</h1>
        <p>This is the demo page. Replace with your actual demo content.</p>
      </main>
    </>
  )
}