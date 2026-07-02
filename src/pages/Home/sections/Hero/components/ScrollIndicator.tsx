import React from 'react';
import { motion } from 'framer-motion';

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-safe left-0 right-0 flex flex-col items-center justify-center pb-8 z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 4 }}
    >
      <span className="font-body text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-neutral-400/80 mb-4 antialiased">
        Scroll To Begin
      </span>
      
      {/* Luxury glass capsule indicator */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-7 h-12 rounded-full border border-white/20 flex justify-center items-start pt-2 bg-white/10 backdrop- shadow-[0_10px_20px_rgba(0,0,0,0.1),inset_0_0_10px_rgba(255,255,255,0.2)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        
        {/* Elegant moving arrow inside capsule */}
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center mt-1"
        >
          <div className="w-[1.5px] h-3 bg-gradient-to-b from-transparent via-white to-white rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
