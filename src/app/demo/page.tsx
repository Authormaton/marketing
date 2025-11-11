// src/app/demo/page.tsx
'use client'
import React, { FC } from 'react'
import { ContactForm } from '@/components/ContactForm'

const DemoPage: FC = () => {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Contact Us Demo</h1>
      <ContactForm />
    </main>
  )
}

export default DemoPage;