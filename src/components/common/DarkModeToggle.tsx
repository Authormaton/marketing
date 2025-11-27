"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "light" | "dark" | "system";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>("system"); // Default to system
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light"); // The actual theme applied

  // Function to get system theme preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // Default to light if no media query support or on server
  }, []);

  // Function to apply the theme to the document
  const applyTheme = useCallback(
    (mode: ThemeMode, systemPref: "light" | "dark") => {
      const newResolvedTheme = mode === "system" ? systemPref : mode;
      setResolvedTheme(newResolvedTheme);

      if (newResolvedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.style.setProperty("color-scheme", newResolvedTheme);
    },
    []
  );

  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Mount-only effect for initial theme setup
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPref = getSystemTheme();

    let initialTheme: ThemeMode = "system";
    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
      initialTheme = storedTheme;
    }

    setTheme(initialTheme);
    applyTheme(initialTheme, systemPref);
  }, [applyTheme, getSystemTheme]); // Effect runs once on mount to set the initial theme based on stored preference or system setting. Theme application is handled by the persistence effect after 'setTheme' updates the state.

  // Effect for listening to system theme changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (themeRef.current === "system") {
          applyTheme("system", getSystemTheme());
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [applyTheme, getSystemTheme]); // No 'theme' in deps, uses ref

  // Effect for persisting theme changes to localStorage
  useEffect(() => {
    const systemPref = getSystemTheme();
    applyTheme(theme, systemPref);
    localStorage.setItem("theme", theme);
  }, [theme, applyTheme, getSystemTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  const getAriaLabel = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system mode";
    return "Switch to light mode";
  };

  const getIcon = () => {
    if (resolvedTheme === "dark") {
      return <Moon className="h-5 w-5" />;
    }
    return <Sun className="h-5 w-5" />;
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={getAriaLabel()}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative group"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-800 dark:text-gray-200"
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
      {theme === "system" && (
        <Laptop className="absolute top-0 left-0 h-3 w-3 text-gray-500 dark:text-gray-400 -translate-x-1 translate-y-3" />
      )}
      <AnimatePresence>
        <motion.span
          key={theme}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
