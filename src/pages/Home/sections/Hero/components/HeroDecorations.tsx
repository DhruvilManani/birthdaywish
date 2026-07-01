import React from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

interface HeroDecorationsProps {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

export const HeroDecorations: React.FC<HeroDecorationsProps> = ({ pointerX, pointerY }) => {
  // Smooth the pointer values for organic interaction
  const smoothX = useSpring(pointerX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(pointerY, { damping: 25, stiffness: 120 });

  // Map pointer position to gentle offsets
  const parallaxX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30, 30]);
  const parallaxY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [-30, 30]);

  // Inverse parallax for some elements
  const invParallaxX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
  const invParallaxY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [20, -20]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      
      {/* Abstract Glowing Butterflies (Soft luminous pairs) */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }} 
        className="absolute top-[20%] left-[15%] opacity-60 flex gap-1 will-change-transform"
        animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-3 h-4 rounded-full bg-rose-light/50 blur-[3px]" />
        <div className="w-2 h-3 rounded-full bg-rose-light/40 blur-[2px] mt-1" />
      </motion.div>

      <motion.div 
        style={{ x: invParallaxX, y: invParallaxY }} 
        className="absolute top-[35%] right-[18%] opacity-50 flex gap-1 will-change-transform"
        animate={{ y: [0, -12, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-2 h-3 rounded-full bg-golden/40 blur-[2px]" />
        <div className="w-3 h-4 rounded-full bg-golden/50 blur-[3px] mt-1" />
      </motion.div>

      {/* Abstract Floating Petals (Replaces emoji roses) */}
      <motion.div 
        className="absolute top-[60%] left-[25%] opacity-40 will-change-transform"
        animate={{ y: [0, -30, 0], rotate: [-20, 20, -20], scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-4 rounded-br-full rounded-tl-full bg-gradient-to-br from-rose-light to-transparent blur-[2px]" />
      </motion.div>
      
      <motion.div 
        className="absolute top-[25%] right-[25%] opacity-30 will-change-transform"
        animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
         <div className="w-5 h-5 rounded-bl-full rounded-tr-full bg-gradient-to-bl from-soft-pink-light to-transparent blur-[3px]" />
      </motion.div>

      {/* Elegant Floating Orbs */}
      <motion.div 
        className="absolute top-[75%] right-[15%] w-16 h-16 rounded-full bg-gradient-to-tr from-rose-light/10 to-golden/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md will-change-transform"
        animate={{ y: [0, -30, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Interactive Dream Particles (Reacts to cursor/touch) */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div className="w-40 h-40 -mt-20 -ml-20 bg-golden/15 rounded-full blur-[30px] transition-opacity duration-500" />
      </motion.div>

      {/* Cinematic Fairy Lights */}
      <div className="absolute top-[12%] left-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_12px_#fff] animate-pulse" />
      <div className="absolute top-[45%] right-[12%] w-1 h-1 bg-golden-light rounded-full shadow-[0_0_12px_#D4AF37] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[82%] left-[18%] w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#fff] animate-pulse" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-rose-light rounded-full shadow-[0_0_12px_#ffb7c5] animate-pulse" style={{ animationDelay: '0.8s' }} />

    </div>
  );
};
