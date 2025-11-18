import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
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
}) => {
  const [hasError, setHasError] = useState(false);
  const startTimeRef = React.useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, [src]);

  const handleLoadingComplete = (img: HTMLImageElement) => {
    if (startTimeRef.current) {
      const loadTime = performance.now() - startTimeRef.current;
      console.log(`Image loaded: ${src}, Load time: ${loadTime.toFixed(2)}ms`);
    }
    setHasError(false); // Reset error state on successful load
    onLoadingComplete?.(img);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${src}`, event);
    setHasError(true);
    onImageError?.(event);
  };

  if (!fill && (width === undefined || height === undefined)) {
    throw new Error("OptimizedImage: 'width' and 'height' are required when 'fill' is false.");
  }

  if (hasError) {
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
      loading={priority ? "eager" : "lazy"} // Eager load if priority is true
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="} // A tiny transparent PNG
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
    />
  );
};

export default OptimizedImage;
