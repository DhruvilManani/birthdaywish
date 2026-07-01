import React from 'react';
import { motion } from 'framer-motion';

interface LoveQuoteProps {
  text: string;
  delay?: number;
}

export const LoveQuote: React.FC<LoveQuoteProps> = ({ text, delay = 0 }) => {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto px-6 py-12 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    >
      {/* Decorative quotes mark */}
      <span className="absolute top-2 left-2 text-6xl text-rose-light/20 font-serif leading-none select-none">"</span>
      
      <p className="font-elegant italic text-xl md:text-2xl text-neutral-700 leading-relaxed text-center relative z-10 drop-shadow-sm">
        {text}
      </p>

      {/* Elegant divider */}
      <div className="flex items-center justify-center mt-6 gap-3 opacity-60">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-dark" />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#DCA29F">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-dark" />
      </div>
    </motion.div>
  );
};
