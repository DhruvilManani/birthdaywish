import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface MemoryViewerProps {
  images: { id: string; src: string; isFavorite: boolean }[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

const quotes = [
  "One smile. One lifetime.",
  "Our forever.",
  "This day still feels alive.",
  "Every moment with you is a gift.",
  "My favorite place is right beside you."
];

export const MemoryViewer: React.FC<MemoryViewerProps> = ({ images, activeIndex, onClose, onChangeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const imageControls = useAnimation();
  
  // Audio volume management
  useEffect(() => {
    const audios = document.querySelectorAll('audio');
    const originalVolumes = Array.from(audios).map(a => a.volume);
    audios.forEach(a => {
      a.dataset.originalVolume = a.volume.toString();
      a.volume = a.volume * 0.4;
    });
    
    return () => {
      audios.forEach((a, i) => {
        a.volume = originalVolumes[i] !== undefined ? originalVolumes[i] : (parseFloat(a.dataset.originalVolume || '1'));
      });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeIndex < images.length - 1) onChangeIndex(activeIndex + 1);
      if (e.key === 'ArrowLeft' && activeIndex > 0) onChangeIndex(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length, onClose, onChangeIndex]);

  // Touch logic for Pinch to Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDist = 0;
    let initialScale = 1;

    const getDist = (touches: React.TouchList | TouchList) => {
      return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        initialDist = getDist(e.touches);
        initialScale = scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getDist(e.touches);
        const newScale = Math.min(Math.max(1, initialScale * (dist / initialDist)), 3);
        setScale(newScale);
        imageControls.set({ scale: newScale });
      }
    };

    const handleTouchEnd = () => {
      if (scale < 1) {
        setScale(1);
        imageControls.start({ scale: 1, x: 0, y: 0, transition: { type: 'spring', bounce: 0.3 } });
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, imageControls]);

  // Mouse wheel logic for desktop zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(1, scale - e.deltaY * 0.01), 3);
    setScale(newScale);
    imageControls.start({ scale: newScale });
    if (newScale === 1) {
      imageControls.start({ x: 0, y: 0 });
    }
  };

  // Double tap to zoom
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      imageControls.start({ scale: 1, x: 0, y: 0 });
    } else {
      setScale(2);
      imageControls.start({ scale: 2 });
    }
  };

  const handleDragEnd = (_e: any, info: any) => {
    if (scale === 1 && Math.abs(info.offset.y) > 100) {
      onClose(); // Swipe down/up to close
    }
  };

  const currentImage = images[activeIndex];
  const isZoomed = scale > 1;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfbf7]/90 backdrop-blur-md overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Background vignette & texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] z-0" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.3] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Gold Particles */}
      <motion.div 
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300 rounded-full blur-[1px] pointer-events-none z-0" 
      />

      {/* Close Background Tap */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={onClose} />

      {/* Top Header */}
      <div className="absolute top-6 left-0 w-full flex justify-center z-20 pointer-events-none">
        <span className="font-elegant text-stone-600 text-lg md:text-xl tracking-widest drop-shadow-sm">
          Memory {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full border border-amber-300/50 bg-[#fdfbf7]/50 backdrop-blur-sm text-amber-700 hover:bg-[#fdfbf7] hover:scale-105 transition-all"
        aria-label="Close Viewer"
      >
        ✕
      </button>

      {/* Main Image Container */}
      <div className="relative z-20 w-full max-w-[90vw] h-[80vh] flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            layoutId={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={imageControls}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            drag={isZoomed ? true : "y"}
            dragConstraints={isZoomed ? { top: -200, bottom: 200, left: -200, right: 200 } : { top: 0, bottom: 0 }}
            dragElastic={isZoomed ? 0.1 : 0.8}
            onDragEnd={handleDragEnd}
            onDoubleClick={handleDoubleClick}
            className={`relative p-3 md:p-6 pb-12 md:pb-16 bg-[#fdfbf7] rounded-sm pointer-events-auto touch-none cursor-grab active:cursor-grabbing shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-stone-200/50 flex flex-col items-center justify-center ${currentImage.isFavorite ? 'border-amber-300 shadow-[0_30px_70px_rgba(251,191,36,0.2)]' : ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          >
            <div className="relative w-full h-full max-h-[60vh] aspect-[4/5] md:aspect-auto overflow-hidden shadow-inner">
              <img loading="lazy" src={currentImage.src} 
                alt={`Memory ${activeIndex + 1}`}
                className="w-full h-full object-contain pointer-events-none"
                style={{ filter: 'sepia(10%) contrast(105%) brightness(95%)' }}
              />
            </div>
            
            {/* Paper Strip Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-4 w-full text-center pointer-events-none"
            >
              <p className="font-cute text-stone-600 text-lg md:text-2xl italic tracking-wide">{quote}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-stone-900/10 to-transparent z-30 flex items-center overflow-x-auto overflow-y-hidden px-4 md:px-12 space-x-2 no-scrollbar pointer-events-auto pb-4">
        {images.map((img, idx) => (
          <button
            key={`thumb-${img.id}`}
            onClick={() => { setScale(1); imageControls.start({ scale: 1, x: 0, y: 0 }); onChangeIndex(idx); }}
            className={`relative h-16 shrink-0 aspect-square rounded-sm overflow-hidden transition-all duration-300 ${idx === activeIndex ? 'ring-2 ring-amber-400 scale-110 opacity-100 z-10' : 'opacity-50 hover:opacity-100'}`}
          >
            <img src={img.src} className="w-full h-full object-cover" alt={`Thumb ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      
      {/* Preload images */}
      <div className="hidden">
        {activeIndex > 0 && <img loading="lazy" src={images[activeIndex - 1].src} alt="preload prev" />}
        {activeIndex < images.length - 1 && <img loading="lazy" src={images[activeIndex + 1].src} alt="preload next" />}
      </div>
    </motion.div>
  );
};
