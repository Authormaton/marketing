// src/components/common/ScrollProgress.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ScrollProgressProps {
  /**
   * The height of the progress bar in pixels.
   * @default 4
   */
  height?: number;
  /**
   * The color of the progress bar.
   * @default "#3b82f6" (blue-500)
   */
  color?: string;
  /**
   * The background color of the progress bar track.
   * @default "transparent"
   */
  backgroundColor?: string;
  /**
   * The z-index of the progress bar to ensure it stays on top.
   * @default 51
   */
  zIndex?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  height = 4,
  color = "#3b82f6", // Tailwind's blue-500
  backgroundColor = "transparent",
  zIndex = 51,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    if (totalHeight > 0) {
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Initial calculation in case the page is already scrolled on load
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className="fixed left-0 top-0 w-full"
      style={{
        height: `${height}px`,
        backgroundColor: backgroundColor,
        zIndex: zIndex,
      }}
    >
      <div
        className="h-full transition-all duration-100 ease-out"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
