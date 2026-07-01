import React from 'react';
import { motion } from 'framer-motion';

// 1. Tape on Corners
export const MaskingTape: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left': return 'top-[-10px] left-[-20px] -rotate-45';
      case 'top-right': return 'top-[-10px] right-[-20px] rotate-45';
      case 'bottom-left': return 'bottom-[-10px] left-[-20px] rotate-[35deg]';
      case 'bottom-right': return 'bottom-[-10px] right-[-20px] -rotate-[35deg]';
    }
  };

  return (
    <div 
      className={`absolute w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm z-20 mix-blend-overlay ${getPositionClasses()}`}
      style={{ 
        clipPath: 'polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    />
  );
};

// 2. Notebook Margin
export const NotebookMargin: React.FC = () => {
  return (
    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-rose-light/20 z-0 border-l border-rose-light/10" />
  );
};

// 3. Hand-drawn Stars
export const DrawnStar: React.FC<{ className?: string, delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`w-6 h-6 text-golden-dark/40 ${className}`}
    animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
  </motion.svg>
);

// 4. Pressed Flower
export const PressedFlower: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    className={`absolute opacity-60 mix-blend-multiply flex items-center justify-center ${className}`}
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5C22 5 25 10 25 15C25 20 20 25 20 25C20 25 15 20 15 15C15 10 18 5 20 5Z" fill="#E64D6E" fillOpacity="0.3" />
      <path d="M35 20C35 18 30 15 25 15C20 15 15 20 15 20C15 20 20 25 25 25C30 25 35 22 35 20Z" fill="#E64D6E" fillOpacity="0.3" />
      <path d="M20 35C18 35 15 30 15 25C15 20 20 15 20 15C20 15 25 20 25 25C25 30 22 35 20 35Z" fill="#E64D6E" fillOpacity="0.3" />
      <path d="M5 20C5 22 10 25 15 25C20 25 25 20 25 20C25 20 20 15 15 15C10 15 5 18 5 20Z" fill="#E64D6E" fillOpacity="0.3" />
      <circle cx="20" cy="20" r="3" fill="#B59023" fillOpacity="0.6" />
    </svg>
  </motion.div>
);

// 5. Small Heart Sketch
export const HeartSketch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`w-5 h-5 text-rose-dark/30 ${className}`}
  >
    <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.9 7.9 7.9-7.9 1-1a5.5 5.5 0 000-7.8z" />
  </svg>
);
