import React from 'react';
import { motion } from 'framer-motion';

export const HeroHeading: React.FC = () => {
  return (
    <motion.div 
      className="text-center z-10 relative flex flex-col items-center justify-center gap-6 mt-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="font-body text-xs md:text-sm text-neutral-500/90 tracking-[0.4em] md:tracking-[0.5em] uppercase font-medium antialiased">
        Happy 21st Birthday
      </h1>
      
      <h2 className="font-elegant text-6xl md:text-8xl font-normal tracking-[0.15em] md:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-br from-neutral-800 via-neutral-600 to-neutral-900 filter drop-shadow-[0_4px_24px_rgba(212,175,55,0.15)] antialiased uppercase leading-none ml-2 md:ml-4">
        Betuu
      </h2>
    </motion.div>
  );
};
