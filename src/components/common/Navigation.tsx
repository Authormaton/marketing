'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Navigation({ loading = false }: { loading?: boolean }) {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial active link

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const getLinkClasses = (href: string) => {
    const isActive = activeLink === href || (href === '#' && activeLink === '');
    return `text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`;
  };

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav aria-label="Main navigation" aria-busy={loading} className="fixed top-0 z-50 w-full bg-white/5 backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:p-2 focus:text-blue-600">Skip to content</a>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="w-32 h-8 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Authormaton
            </span>
          )}
        </div>
        <div className="flex gap-6">
          {navLinks.map((link) => (
            loading ? (
              <div key={link.href} className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.href)}
                aria-current={link.href === '#' && activeLink === '' || activeLink === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            )
          ))}
        </div>
        {loading ? (
          <div className="w-32 h-10 bg-gray-700 rounded-full animate-pulse"></div>
        ) : (
          <>
            <Link href="/demo" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Request Demo
            </Link>
            <DarkModeToggle />
          </>
        )}
      </div>
    </nav>
  );
}
