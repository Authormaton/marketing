import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
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
          <form className="flex flex-col sm:flex-row gap-2 mt-2 w-full max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email for newsletter"
              className="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
