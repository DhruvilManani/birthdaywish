import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface DreamSceneProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  quote: React.ReactNode;
  children?: React.ReactNode;
  onSceneTap?: () => void;
}

export const DreamScene: React.FC<DreamSceneProps> = ({ 
  id, 
  imageSrc, 
  imageAlt, 
  quote, 
  children,
  onSceneTap
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      id={id} 
      ref={ref} 
      onClick={onSceneTap}
      className={`relative w-full min-h-[90vh] md:min-h-[100dvh] flex flex-col items-center justify-center py-24 px-4 overflow-hidden snap-start ${onSceneTap ? 'cursor-pointer' : ''}`}
    >
      {/* Background Image with Mask and Continuous Slow Zoom */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1.15 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ 
          opacity: { duration: 3, ease: "easeOut" },
          scale: { duration: 40, ease: "linear" } 
        }}
        className="absolute inset-0 w-full h-full z-0 origin-center"
      >
        <img loading="lazy" src={imageSrc} 
          alt={imageAlt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-80 md:opacity-100' : 'opacity-0'}`}
          style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }}
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/60 to-transparent pointer-events-none" />
        {/* Golden Warm Bloom for Cinematic Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,223,153,0.15),transparent_70%)] pointer-events-none mix-blend-screen" />
      </motion.div>

      {/* Particle/Effect Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {isInView && children}
      </div>

      {/* Typography Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 mt-[40vh] md:mt-[30vh] text-center max-w-2xl px-6 pointer-events-none"
      >
        <div className="font-elegant italic text-3xl md:text-5xl lg:text-6xl text-stone-800 leading-relaxed drop-shadow-md">
          {quote}
        </div>
      </motion.div>
    </div>
  );
};
