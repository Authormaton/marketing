import Image from 'next/image';
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
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
}) => {
  if (!fill && (width === undefined || height === undefined)) {
    throw new Error("OptimizedImage: 'width' and 'height' are required when 'fill' is false.");
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
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // A tiny transparent PNG
    />
  );
};

export default OptimizedImage;
