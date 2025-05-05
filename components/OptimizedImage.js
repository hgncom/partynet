import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ src, alt, className, priority = false }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if the image is an external URL
  const isExternalImage = src?.startsWith('http');
  
  // Default image dimensions - can be adjusted based on your design
  const defaultWidth = 1200;
  const defaultHeight = 630;
  
  return (
    <div className={`image-container ${isLoading ? 'image-loading' : 'image-loaded'} ${className || ''}`}>
      {isExternalImage ? (
        <Image
          src={src}
          alt={alt || 'Party.net blog image'}
          width={defaultWidth}
          height={defaultHeight}
          priority={priority}
          onLoadingComplete={() => setIsLoading(false)}
          className="optimized-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // This is needed for external images
          unoptimized={false}
        />
      ) : (
        <Image
          src={src || '/images/party-default.jpg'}
          alt={alt || 'Party.net blog image'}
          fill
          priority={priority}
          onLoadingComplete={() => setIsLoading(false)}
          className="optimized-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
