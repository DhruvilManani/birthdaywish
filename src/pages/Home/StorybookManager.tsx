import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { NavigationButtons } from '../../components/ui/NavigationButtons';

interface Page {
  id: string;
  component: React.ComponentType<any>;
}

interface StorybookManagerProps {
  pages: Page[];
}

// Error Boundary to prevent white screens on page crash
class PageErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Page crashed during render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-8 text-center z-[5000]">
          <h2 className="text-2xl font-elegant text-rose-400 mb-4">A Memory Faded</h2>
          <p className="text-stone-400 text-sm max-w-md">
            This chapter encountered an issue. Please use the navigation arrows to safely continue your journey.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Cinematic Storybook Transitions (Strict 700ms limit max)
const storybookVariants: Variants = {
  enter: (direction: number) => ({
    scale: 0.98,
    y: direction > 0 ? 20 : -20,
    opacity: 0,
    zIndex: 0
  }),
  center: {
    zIndex: 1,
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    scale: 1.02,
    y: direction < 0 ? 20 : -20,
    opacity: 0,
    transition: {
      y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }
  })
};

export const StorybookManager: React.FC<StorybookManagerProps> = ({ pages }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isTransitioning = useRef(false);

  const paginate = useCallback((newDirection: number) => {
    // 1. Block spam navigation
    if (isTransitioning.current) return;
    
    // 2. Strict index clamps (never negative, never out of bounds)
    const targetPage = Math.max(0, Math.min(page + newDirection, pages.length - 1));
    
    // 3. Ignore if trying to go out of bounds
    if (targetPage === page) return;

    // 4. Lock transition
    isTransitioning.current = true;
    setPage([targetPage, newDirection]);
    
    // 5. Unlock after strict 700ms max duration
    setTimeout(() => {
      isTransitioning.current = false;
    }, 700);
  }, [page, pages.length]);

  useEffect(() => {
    // Lock body scroll completely. Navigation is exclusively via arrows.
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Guarantee current page index validity
  const validPage = Math.max(0, Math.min(page, pages.length - 1));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black perspective-[1000px]">
      
      {/* 
        Strict 4-State Lifecycle via AnimatePresence mode="sync"
        Ensures immediate mount of new page while old page exits simultaneously,
        preventing any blank screens. Old page fully unmounts immediately after exit.
      */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={validPage}
          custom={direction}
          variants={storybookVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d] will-change-transform"
        >
          <PageErrorBoundary>
            {React.createElement(pages[validPage].component)}
          </PageErrorBoundary>
        </motion.div>
      </AnimatePresence>
      
      {/* Global Navigation Overlay - Only Arrows */}
      <NavigationButtons 
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
        showNext={validPage < pages.length - 1}
        showPrev={validPage > 0}
      />
      
      {/* Global Page Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="flex gap-3">
          {pages.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                idx === validPage ? 'bg-golden scale-[1.8] shadow-[0_0_10px_#D4AF37]' : 'bg-white/20'
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
