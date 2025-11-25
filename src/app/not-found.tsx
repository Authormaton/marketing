'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import OptimizedImage from '@/components/common/OptimizedImage';

export default function NotFound() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center relative overflow-hidden"
    >
      <OptimizedImage
        src="/bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        aria-hidden="true"
        fill
      />

      <motion.h1
        variants={fadeIn}
        className="relative z-10 text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-xl"
      >
        404
      </motion.h1>

      <motion.p
        variants={slideUp}
        className="relative z-10 text-2xl md:text-3xl font-semibold text-gray-200 mt-4 mb-8"
      >
        Page Not Found
      </motion.p>

      <motion.p
        variants={slideUp}
        className="relative z-10 text-lg text-gray-300 max-w-md mx-auto mb-8"
      >
        Oops! The page you're looking for doesn't exist or has been moved.
        Don't worry, we'll help you find your way back.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        className="relative z-10 flex flex-wrap justify-center gap-4 mb-12"
      >
        <Link href="/" passHref>
          <motion.a
            variants={slideUp}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Go to Homepage
          </motion.a>
        </Link>
        <Link href="/#features" passHref>
          <motion.a
            variants={slideUp}
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          >
            Explore Features
          </motion.a>
        </Link>
        <Link href="/contact" passHref>
          <motion.a
            variants={slideUp}
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          >
            Contact Us
          </motion.a>
        </Link>
      </motion.div>

      <motion.div
        variants={slideUp}
        className="relative z-10 w-full max-w-md"
      >
        <label htmlFor="search-input" className="sr-only">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Try searching for something..."
          className="w-full px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </motion.div>

      {/* Animated Graphic Placeholder */}
      <motion.div
        variants={fadeIn}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 z-0"
      ></motion.div>
      <motion.div
        variants={fadeIn}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-24 h-24 bg-pink-500 rounded-full opacity-20 z-0"
      ></motion.div>
    </motion.div>
  );
}
