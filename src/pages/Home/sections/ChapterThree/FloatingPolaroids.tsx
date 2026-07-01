import React from 'react';
import { motion } from 'framer-motion';

interface FloatingImageProps {
  src: string;
  alt: string;
  align?: 'left' | 'right' | 'center';
  delay?: number;
}

export const FloatingImage: React.FC<FloatingImageProps> = ({ src, alt, align = 'center', delay = 0 }) => {
  const alignmentClass = align === 'left' ? 'mr-auto ml-4 -rotate-2' : align === 'right' ? 'ml-auto mr-4 rotate-2' : 'mx-auto';

  return (
    <motion.div
      className={`relative w-64 h-64 md:w-80 md:h-80 z-20 ${alignmentClass}`}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        className="w-full h-full rounded-[2rem] overflow-hidden p-1 bg-gradient-to-tr from-white/40 to-white/10 backdrop-blur-sm shadow-xl"
      >
        <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover filter brightness-[1.05] contrast-100"
          />
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50 mix-blend-overlay" />
        </div>
      </motion.div>
    </motion.div>
  );
};
