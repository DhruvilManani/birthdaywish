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

  if (hasError) return null;

  // A random delay so multiple images entering viewport together reveal staggered
  const delay = React.useMemo(() => Math.random() * 0.4, []);
  
  return (
    <motion.img
      src={src}
      alt={alt}
      style={style}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", duration: 1.5, bounce: 0.2, delay }}
      className={`${className} will-change-transform ${!isLoaded ? 'invisible' : 'visible'}`}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  );
};
