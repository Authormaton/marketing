import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

const log = {
  error: console.error,
  info: console.log,
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
  // A default blurDataURL for LQIP if not provided. In a production environment,
  // this would typically be generated dynamically (e.g., during build time or on the server).
  // This is a very small base64 encoded SVG.
  defaultBlurDataURL?: string;
  onLoadingComplete?: (img: HTMLImageElement) => void;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallbackSrc?: string;
}

interface OptimizedImageFillProps extends OptimizedImageProps {
  fill: true;
  width?: never;
  height?: never;
}

interface OptimizedImageFixedProps extends OptimizedImageProps {
  fill?: false;
  width: number;
  height: number;
}

type CombinedOptimizedImageProps = OptimizedImageFillProps | OptimizedImageFixedProps;

const OptimizedImage: React.FC<CombinedOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  sizes,
  priority = false,
  blurDataURL,
  onLoadingComplete,
  onImageError,
  fallbackSrc = "/file.svg", // Default fallback image
  defaultBlurDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDU+PHBhdGggZmlsbD0iI2YwZjBmMCIgZD0iTTAgMGg4djVIMHoiLz48cGF0aCBmaWxsPSIjY2NjIiBkPSJNMCAwSDh2NUgwelIgZmlsdGVyLXVybD0iI2ltYWdlIi8+PC9zdmc+",
}) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackHasError, setFallbackHasError] = useState(false);
  const startTimeRef = React.useRef<number | null>(null);
  const finalBlurDataURL = blurDataURL || defaultBlurDataURL;

  useEffect(() => {
    setHasError(false);
    setFallbackHasError(false);
    startTimeRef.current = performance.now();
  }, [src]);

  const handleLoadingComplete = useCallback((img: HTMLImageElement) => {
    if (startTimeRef.current !== null) {
      const loadTime = performance.now() - startTimeRef.current;
      log.info(`Image loaded: ${src}, Load time: ${loadTime.toFixed(2)}ms`);
    }
    setHasError(false); // Reset error state on successful load
    setFallbackHasError(false); // Reset fallback error state on successful load
    onLoadingComplete?.(img);
  }, [src, onLoadingComplete]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    log.error(`Failed to load image: ${src}`, { event });
    setHasError(true);
    onImageError?.(event);
  }, [src, onImageError]);

  const handleFallbackError = useCallback(() => {
    setFallbackHasError(true);
  }, []);

  if (!fill && (width === undefined || height === undefined)) {
    throw new Error("OptimizedImage: 'width' and 'height' are required when 'fill' is false.");
  }

  if (hasError) {
    if (fallbackHasError) {
      return <img src="/file.svg" alt={`Failed to load ${alt}`} className={className} width={fill ? undefined : width} height={fill ? undefined : height} />;
    }
    return (
      <Image
        src={fallbackSrc}
        alt={`Error loading ${alt}`}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        fill={fill}
        sizes={sizes}
        priority={priority}
        onError={handleFallbackError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder="blur" // Always use blur placeholder for LQIP
      blurDataURL={finalBlurDataURL}
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
    />
  );
};

export default OptimizedImage;
