'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Navigation({ loading = false }: { loading?: boolean }) {
  const [activeLink, setActiveLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { buttonClick } = useAnalytics();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedMenuRef = useRef(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
      if (isOpen) setIsOpen(false); // Close menu on hash change
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial active link

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!isOpen || !menuRef.current) return;

      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleFocusTrap);

    let timeoutId: NodeJS.Timeout | undefined;

    if (isOpen) {
      // Focus the first focusable element in the menu when it opens
      timeoutId = setTimeout(() => {
        const firstFocusable = menuRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);
      hasOpenedMenuRef.current = true;
    } else if (hasOpenedMenuRef.current) {
      // Return focus to the toggle button when the menu closes
      toggleButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleFocusTrap);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const getLinkClasses = (href: string) => {
    const isActive = activeLink === href || (href === '#' && activeLink === '');
    return `text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`;
  };

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#contact', label: 'Contact' },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        when: "afterChildren"
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <nav aria-label="Main navigation" aria-busy={loading} className="fixed top-0 z-50 w-full bg-white/5 backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:p-2 focus:text-blue-600">Skip to content</a>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="w-32 h-8 bg-gray-700 rounded animate-pulse motion-reduce:animate-none"></div>
          ) : (
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Authormaton
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            loading ? (
              <div key={link.href} className="w-20 h-6 bg-gray-700 rounded animate-pulse motion-reduce:animate-none"></div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.href)}
                aria-current={link.href === '#' && activeLink === '' || activeLink === link.href ? 'page' : undefined}
                onClick={() => buttonClick(`Nav Link: ${link.label}`)}
              >
                {link.label}
              </a>
            )
          ))}
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="w-32 h-10 bg-gray-700 rounded-full animate-pulse motion-reduce:animate-none"></div>
              <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <>
              <Link href="/demo" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => buttonClick('Request Demo Button')}>
                Request Demo
              </Link>
              <DarkModeToggle />
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          {loading ? (
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          ) : (
            <DarkModeToggle />
          )}
          <button
            ref={toggleButtonRef}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              ref={menuRef}
              id="mobile-menu"
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-y-0 right-0 w-64 bg-gray-800 dark:bg-gray-900 p-4 shadow-lg z-50 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-4">
                <button
                  aria-label="Close menu"
                  onClick={toggleMenu}
                  className="text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <motion.div
                className="flex flex-col gap-4"
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  loading ? (
                    <motion.div key={link.href} variants={linkVariants} className="w-full h-8 bg-gray-700 rounded animate-pulse"></motion.div>
                  ) : (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      variants={linkVariants}
                      className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        buttonClick(`Nav Link: ${link.label}`);
                        toggleMenu();
                      }}
                    >
                      {link.label}
                    </motion.a>
                  )
                ))}
                {loading ? (
                  <motion.div variants={linkVariants} className="w-full h-10 bg-gray-700 rounded-full animate-pulse"></motion.div>
                ) : (
                  <motion.div
                    variants={linkVariants}
                  >
                    <Link
                      href="/demo"
                      className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-center"
                      onClick={() => {
                        buttonClick('Request Demo Button');
                        toggleMenu();
                      }}
                    >
                      Request Demo
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
