import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = "", style }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // A random delay so multiple images entering viewport together reveal staggered
  const delay = React.useMemo(() => Math.random() * 0.4, []);

  return (
    <div className={`relative overflow-hidden bg-stone-200/20 ${className}`} style={style}>
      <motion.img
        src={hasError ? '/images/placeholder.jpg' : src} // Use placeholder if error
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay }}
        className="w-full h-full object-cover will-change-transform"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      {/* Optional: Add a CSS loader or just the soft bg-stone-200/20 we have on the parent */}
    </div>
  );
};
