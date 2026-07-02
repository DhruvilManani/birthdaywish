import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  showNext: boolean;
  showPrev: boolean;
  isComplete: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onNext, onPrev, showNext, showPrev, isComplete }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <div className="fixed bottom-safe left-0 w-full px-6 pb-8 md:pb-12 pointer-events-none z-[100] flex justify-between items-end">
          
          {/* Previous Button */}
          <div className="pointer-events-auto">
            <AnimatePresence>
              {showPrev && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  onClick={onPrev}
                  className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#fdfbf7]/90 backdrop-blur-md border border-[#e6b3a6]/40 shadow-[0_8px_32px_rgba(230,179,166,0.15)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
                  aria-label="Previous Chapter"
                >
                  <div className="absolute inset-0 rounded-full bg-[#e6b3a6]/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  <span className="text-[#a87a6b] text-xl md:text-2xl drop-shadow-sm transition-transform duration-300 group-hover:-translate-x-1">←</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Next Button with Float Animation */}
          <div className="pointer-events-auto">
            <AnimatePresence>
              {showNext && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <motion.button
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    onClick={onNext}
                    className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#fdfbf7]/90 backdrop-blur-md border border-[#e6b3a6]/50 shadow-[0_8px_32px_rgba(230,179,166,0.25)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Next Chapter"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#e6b3a6]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                    <span className="text-[#a87a6b] text-xl md:text-2xl drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1">➜</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      )}
    </AnimatePresence>
  );
};
