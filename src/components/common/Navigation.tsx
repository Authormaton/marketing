import { useState, useEffect } from 'react';

export default function Navigation() {
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

  return (
    <nav aria-label="Main navigation" className="fixed top-0 z-50 w-full bg-white/5 backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:p-2 focus:text-blue-600">Skip to content</a>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Authormaton
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className={getLinkClasses('#')}
            aria-current={activeLink === '#' || activeLink === '' ? 'page' : undefined}
          >
            Home
          </a>
          <a
            href="#features"
            className={getLinkClasses('#features')}
            aria-current={activeLink === '#features' ? 'page' : undefined}
          >
            Features
          </a>
          <a
            href="#contact"
            className={getLinkClasses('#contact')}
            aria-current={activeLink === '#contact' ? 'page' : undefined}
          >
            Contact
          </a>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Request Demo
        </button>
      </div>
    </nav>
  );
}
