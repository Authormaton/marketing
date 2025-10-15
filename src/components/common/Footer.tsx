import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 w-full py-8 px-4 bg-gray-900 text-center text-gray-400 mt-auto border-t border-gray-800 transition-colors duration-300"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-base font-medium text-gray-300">
          &copy; {new Date().getFullYear()} Authormaton. All rights reserved.
        </span>
        <nav className="flex gap-4 mt-2">
          <a
            href="#about"
            className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a
            href="#features"
            className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
