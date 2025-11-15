"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Laptop } from "lucide-react";

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

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as ThemeMode;
    const initialTheme = storedTheme || "system";
    setTheme(initialTheme);

    const systemPref = getSystemTheme();
    applyTheme(initialTheme, systemPref);

    // Listen for changes in system theme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system", getSystemTheme());
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme, getSystemTheme, theme]);

  // Effect to update theme when 'theme' state changes
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
      return <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />;
    }
    return <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />;
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={getAriaLabel()}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative"
    >
      {getIcon()}
      {theme === "system" && (
        <Laptop className="absolute top-0 left-0 h-3 w-3 text-gray-500 dark:text-gray-400 -translate-x-1 translate-y-3" />
      )}
    </button>
  );
};

export default DarkModeToggle;
