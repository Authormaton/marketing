'use client';

import React, { useState } from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
  
      try {
        const response = await fetch('/api/newsletter-subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          setStatus('success');
          setEmail(''); // Clear email on success
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        setStatus('error');
      }
    };
  
    return (
    <footer
      id="contact"
      className="scroll-mt-24 w-full py-12 px-4 bg-gray-900 text-gray-400 mt-auto border-t border-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Copyright and Navigation */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-base font-medium text-gray-300">
            &copy; {new Date().getFullYear()} Authormaton. All rights reserved.
          </span>
          <nav className="flex flex-col gap-2 mt-2">
            <a
              href="#about"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-300">Connect With Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://twitter.com/authormaton"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://github.com/authormaton"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/company/authormaton"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter Signup Placeholder */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-300">Stay Updated</h3>
          <p className="text-gray-500 text-sm">
            Subscribe to our newsletter for the latest news and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-2 w-full max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email for newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-500 text-sm mt-2">Successfully subscribed!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">Subscription failed. Please try again.</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
