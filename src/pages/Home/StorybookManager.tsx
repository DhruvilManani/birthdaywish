import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { NavigationButtons } from '../../components/ui/NavigationButtons';

interface Page {
  id: string;
  component: React.ComponentType<any>;
}

interface StorybookManagerProps {
  pages: Page[];
}

// Cinematic Storybook Transitions
const storybookVariants: Variants = {
  enter: (direction: number) => {
    return {
      scale: 0.98,
      y: direction > 0 ? 20 : -20,
      opacity: 0,
      zIndex: 0
    };
  },
  center: {
    zIndex: 1,
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      scale: 1.02,
      y: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: {
        y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }
    };
  }
};

export const StorybookManager: React.FC<StorybookManagerProps> = ({ pages }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isTransitioning = useRef(false);
  const { isChapterComplete, setChapterComplete } = useNavigation();

  const paginate = useCallback((newDirection: number) => {
    if (isTransitioning.current) return;
    
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < pages.length) {
      isTransitioning.current = true;
      setPage([newPage, newDirection]);
      
      setTimeout(() => {
        isTransitioning.current = false;
      }, 1000);
    }
  }, [page, pages.length]);

  // Reset completion state when page changes
  useEffect(() => {
    setChapterComplete(false);
  }, [page, setChapterComplete]);

  useEffect(() => {
    // Only lock body scroll. We removed global wheel/touch handlers.
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black perspective-[1000px]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={storybookVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d] will-change-transform"
        >
          {React.createElement(pages[page].component)}
        </motion.div>
      </AnimatePresence>
      
      {/* Global Navigation Overlay */}
      <NavigationButtons 
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
        showNext={page < pages.length - 1}
        showPrev={page > 0}
        isComplete={isChapterComplete}
      />
      
      {/* Global Page Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="flex gap-3">
          {pages.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                idx === page ? 'bg-golden scale-[1.8] shadow-[0_0_10px_#D4AF37]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Cinematic Paper Light Overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay z-40 bg-gradient-to-tr from-black/10 via-transparent to-white/5" />
    </div>
  );
};
