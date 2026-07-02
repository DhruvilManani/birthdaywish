import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../../../../context/AudioContext';

interface HeroImageProps {
  src?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src = '/images/girlfriend/hero.jpg' }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { audioRef } = useAudio();

  useEffect(() => {
    let fadeOutTimer: ReturnType<typeof setTimeout>;
    let normalizeInterval: ReturnType<typeof setTimeout>;
    
    const timer = setTimeout(() => {
      setIsRevealed(true);
      
      // Bump music volume slightly when image appears
      if (audioRef.current) {
        const originalVolume = audioRef.current.volume;
        audioRef.current.volume = Math.min(1, originalVolume + 0.3);
        
        // Smoothly normalize after 3 seconds
        fadeOutTimer = setTimeout(() => {
          if (audioRef.current) {
            normalizeInterval = setInterval(() => {
              if (audioRef.current && audioRef.current.volume > originalVolume) {
                audioRef.current.volume = Math.max(originalVolume, audioRef.current.volume - 0.05);
              } else {
                clearInterval(normalizeInterval);
              }
            }, 200);
          }
        }, 3000);
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
      clearInterval(normalizeInterval);
    };
  }, [audioRef]);

  return (
    <div className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[4/5] mx-auto z-10 my-8 will-change-transform">
      {/* Gentle floating animation for the entire frame container - very subtle */}
      <motion.div
        className="w-full h-full will-change-transform"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Luxury Glass Frame */}
        <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.1)] border border-golden/30 backdrop-blur-sm">
          
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              // Initial State: Soft golden particles before reveal
              <motion.div
                key="particles"
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-golden blur-[2px]"
                    style={{
                      width: `${Math.random() * 4 + 2}px`,
                      height: `${Math.random() * 4 + 2}px`,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random()
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              // Reveal State: The Image
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {!imageError ? (
                  <img 
                    src={src} 
                    alt="Hero" 
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-[50%_20%] transform translate-z-0" 
                  />
                ) : (
                  // Graceful fallback if image fails to load
                  <div className="w-full h-full bg-gradient-to-br from-rose-light/60 to-lavender-dark/60 mix-blend-overlay" />
                )}
                
                {/* Subtle Reflection and Light Bloom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_0_40px_rgba(255,255,255,0.1)] pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
        
        {/* Soft Depth Shadow / Glow behind the frame */}
        <div className="absolute -inset-2 bg-golden/10 blur-[30px] rounded-[30px] -z-10 animate-pulse-slow" />
      </motion.div>
    </div>
  );
};
