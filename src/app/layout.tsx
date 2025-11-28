import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "../components/common/ErrorBoundary";
import WebVitalsReporter from "../components/common/WebVitalsReporter";
import { ToastProvider } from "@/hooks/useToast";
import ScrollProgress from "../components/common/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authormaton | Applied AI for Technical Content Generation",
  description:
    "Authormaton is an applied AI-first organization developing specialized, autonomous agents for technical content generation. Our platform addresses the core challenges of technical communication: factual synthesis, data accuracy, and the nuanced application of human-centric tone and style.",
  keywords: [
    "Authormaton",
    "AI content generation",
    "autonomous agents",
    "technical writing",
    "factual synthesis",
    "data accuracy",
    "human-centric communication",
    "AI platform",
    "AI-first organization",
    "technical content",
    "content automation"
  ],
  authors: [{ name: "Authormaton Team", url: "https://authormaton.com" }],
  creator: "Authormaton",
  openGraph: {
    title: "Authormaton | Applied AI for Technical Content Generation",
    description:
      "Specialized, autonomous agents for technical content generation. Factual synthesis, data accuracy, and human-centric style.",
    url: "https://authormaton.com",
    siteName: "Authormaton",
    images: [
      {
        url: "/public/bg.png",
        width: 1200,
        height: 630,
        alt: "Authormaton AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Authormaton | Applied AI for Technical Content Generation",
    description:
      "Specialized, autonomous agents for technical content generation. Factual synthesis, data accuracy, and human-centric style.",
    site: "@authormaton",
    creator: "@authormaton",
    images: ["/public/bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress />
        <ErrorBoundary>
          <ToastProvider>{children}</ToastProvider>
        </ErrorBoundary>
        <WebVitalsReporter />
      </body>
    </html>
  );
}
