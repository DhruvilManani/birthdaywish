import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ImageFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  variant?: 'polaroid' | 'gold' | 'glass' | 'floating';
  aspectRatio?: 'square' | 'portrait' | 'video';
  tilt?: boolean;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  caption,
  className,
  variant = 'polaroid',
  aspectRatio = 'portrait',
  tilt = true,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Spring-like smooth limit rotation to a maximum of 8 degrees for premium stability
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const ratioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    video: 'aspect-video',
  };

  const frameVariants = {
    polaroid: 'bg-white p-5 pb-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] rounded-[4px] border border-neutral-100',
    gold: 'bg-cream-dark p-3.5 border-[3px] border-golden rounded-2xl shadow-luxury ring-[3px] ring-golden-light/40 ring-offset-2 ring-offset-cream-white',
    glass: 'glass-panel p-3.5 rounded-[28px] border border-white/60 shadow-glass',
    floating: 'bg-white/90 p-3.5 rounded-[32px] shadow-float-depth border border-white/40 backdrop-blur-sm',
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(
        'relative w-full overflow-hidden select-none group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        frameVariants[variant],
        className
      )}
    >
      <div className="relative overflow-hidden w-full h-full rounded-[6px] bg-neutral-50 shadow-inner">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104',
            ratioClasses[aspectRatio]
          )}
        />
        {/* Dreamy soft lighting overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {caption && variant === 'polaroid' && (
        <div className="mt-5 text-center">
          <p className="font-cute text-sm md:text-base text-neutral-500 font-medium italic tracking-wide">
            {caption}
          </p>
        </div>
      )}

      {caption && variant !== 'polaroid' && (
        <div className="mt-4 text-center">
          <p className="font-cute text-xs md:text-sm text-neutral-500 font-semibold uppercase tracking-widest">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
};
export default ImageFrame;
