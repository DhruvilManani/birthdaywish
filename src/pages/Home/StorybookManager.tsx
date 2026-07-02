import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
      filter: 'brightness(1.5) blur(20px)',
      zIndex: 0
    };
  },
  center: {
    zIndex: 1,
    scale: 1,
    y: 0,
    opacity: 1,
    filter: 'brightness(1) blur(0px)',
    transition: {
      y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.5, ease: 'easeOut' },
    }
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      scale: 1.02,
      y: direction < 0 ? 20 : -20,
      opacity: 0,
      filter: 'brightness(0.8) blur(10px)',
      transition: {
        y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.4, ease: 'easeIn' },
      }
    };
  }
};

export const StorybookManager: React.FC<StorybookManagerProps> = ({ pages }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  
  // Wrap around logic or strict clamping. Let's strictly clamp.
  const paginate = useCallback((newDirection: number) => {
    if (isTransitioning.current) return;
    
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < pages.length) {
      isTransitioning.current = true;
      setPage([newPage, newDirection]);
      
      // Cooldown to prevent rapid scrolling. Match the longest animation duration.
      setTimeout(() => {
        isTransitioning.current = false;
      }, 600);
    }
  }, [page, pages.length]);

  useEffect(() => {
    const isChapterTwo = pages[page].id === 'chapter-two';

    const handleWheel = (e: WheelEvent) => {
      if (isChapterTwo) return; // Completely ignore wheel in Chapter Two
      
      if (Math.abs(e.deltaY) > 30) {
        paginate(e.deltaY > 0 ? 1 : -1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isChapterTwo) return; // Completely ignore touch in Chapter Two
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isChapterTwo) return; // Completely ignore touch in Chapter Two
      if (touchStartY.current === null) return;
      
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (e.cancelable) {
        e.preventDefault();
      }
      
      if (Math.abs(deltaY) > 60) {
        paginate(deltaY > 0 ? 1 : -1);
        touchStartY.current = null;
      }
    };

    const handleNextPage = () => paginate(1);
    const handlePrevPage = () => paginate(-1);

    // If ChapterTwo is active, we can allow passive events so browser scrolling is smooth
    window.addEventListener('wheel', handleWheel, { passive: isChapterTwo });
    window.addEventListener('touchstart', handleTouchStart, { passive: isChapterTwo });
    window.addEventListener('touchmove', handleTouchMove, { passive: isChapterTwo });
    window.addEventListener('storybook-next-page', handleNextPage);
    window.addEventListener('storybook-prev-page', handlePrevPage);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('storybook-next-page', handleNextPage);
      window.removeEventListener('storybook-prev-page', handlePrevPage);
      document.body.style.overflow = '';
    };
  }, [paginate, page, pages]);

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
