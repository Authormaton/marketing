import Image from "next/image";
import HeroHeader from "./components/HeroHeader";
import Navigation from "./components/Navigation";
import WorkflowDiagram from "./components/WorkflowDiagram";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navigation />

      <div className="bg-gradient-to-b from-[#18122B] to-[#1A1A2E] ">
        <HeroHeader />
        <WorkflowDiagram />
      </div>

      {/* Hero Section */}
      <header className="w-full py-16 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col items-center text-center">
        <Image
          src="/next.svg"
          alt="Logo"
          width={120}
          height={32}
          className="mb-6 dark:invert"
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Our Landing Page
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          Discover our amazing product and how it can help you achieve your
          goals. Simple, fast, and effective.
        </p>
        <a
          href="#features"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="flex-1 w-full max-w-5xl mx-auto py-16 px-4 grid gap-12 sm:grid-cols-3"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/file.svg"
            alt="Feature 1"
            width={48}
            height={48}
            className="mb-4 dark:invert"
          />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Easy to Use
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our platform is designed for simplicity and ease of use, so you can
            focus on what matters.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/window.svg"
            alt="Feature 2"
            width={48}
            height={48}
            className="mb-4 dark:invert"
          />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Modern Design
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enjoy a clean, modern interface that looks great on any device, day
            or night.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/globe.svg"
            alt="Feature 3"
            width={48}
            height={48}
            className="mb-4 dark:invert"
          />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Global Access
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Access your data from anywhere in the world, securely and reliably.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-gray-100 dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400 mt-auto">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
