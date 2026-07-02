import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ScrapbookPhotoProps {
  src: string;
  alt?: string;
  rotation?: number;
  size?: 'small' | 'medium' | 'large';
  alignment?: 'left' | 'center' | 'right';
  hasTape?: boolean;
  isFavorite?: boolean;
  onClick?: () => void;
  layoutId?: string;
}

export const ScrapbookPhoto: React.FC<ScrapbookPhotoProps> = ({ 
  src, 
  alt = "Beautiful memory", 
  rotation = 0, 
  size = 'medium',
  alignment = 'center',
  hasTape = true,
  isFavorite = false,
  onClick,
  layoutId
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If the image fails to load, gracefully hide this entire component
  if (hasError) return null;

  const sizeClasses = {
    small: 'w-48 md:w-56',
    medium: 'w-64 md:w-80',
    large: 'w-80 md:w-96'
  };

  const alignClasses = {
    left: 'mr-auto ml-4 md:ml-12',
    center: 'mx-auto',
    right: 'ml-auto mr-4 md:mr-12'
  };

  const duration = 0.8 + Math.random() * 0.4; // 0.8s - 1.2s
  const delay = Math.random() * 0.2;

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotate: rotation - 15, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotate: rotation, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, type: "spring", bounce: 0.2 }}
      whileHover={{ scale: 1.03, rotate: rotation + (Math.random() > 0.5 ? 2 : -2), y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
      whileTap={{ scale: 1.03, rotate: rotation + 1, y: -10 }}
      className={`relative ${sizeClasses[size]} ${alignClasses[alignment]} my-8 md:my-16 cursor-pointer will-change-transform z-10 hover:z-30`}
    >
      {/* The Polaroid Container */}
      <div className={`bg-[#fdfbf7] p-3 md:p-4 pb-8 md:pb-12 rounded-sm relative transition-shadow duration-300 ${isFavorite ? 'border-2 border-amber-300 shadow-[0_20px_50px_rgba(251,191,36,0.3)] hover:shadow-[0_25px_60px_rgba(251,191,36,0.5)]' : 'border border-stone-200/50 shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)]'}`}>
        
        {/* Masking Tape */}
        {hasTape && (
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e8e4d9] opacity-80 shadow-sm mix-blend-multiply origin-center" 
            style={{ clipPath: 'polygon(5% 0%, 95% 5%, 98% 95%, 2% 100%)', rotate: -2 }}
            animate={{ rotate: [-2, -1, -2] }}
            transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Favourite Tag */}
        {isFavorite && (
          <div className="absolute -bottom-4 right-4 bg-amber-100 px-3 py-1 rounded-sm shadow-md rotate-[-5deg] border border-amber-200 z-20">
            <span className="font-cute text-amber-700 text-sm">Favourite</span>
          </div>
        )}
        
        {/* The Image */}
        <div className="relative w-full aspect-square md:aspect-[4/5] bg-stone-100 overflow-hidden shadow-inner pointer-events-none">
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'sepia(10%) contrast(105%) brightness(95%)' }}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};
