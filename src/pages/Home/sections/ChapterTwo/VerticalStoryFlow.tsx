import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypewriterStory } from './TypewriterStory';
import { SixYearsIllustration } from './SixYearsIllustration';
import { PinkWashiTape, PaperClip, InteractiveSticker, MiniStar, SoftButterfly, HandwrittenNote } from './InteractiveDecorations';

export const VerticalStoryFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredNext = useRef(false);
  useEffect(() => {
    hasTriggeredNext.current = false;
    const scrollContainer = containerRef.current;
    
    if (!scrollContainer) return;
    
    // Reset scroll on mount
    scrollContainer.scrollTop = 0;

    return () => {
      // Reset scroll on unmount so reopening starts from beginning
      scrollContainer.scrollTop = 0;
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center pt-24 pb-32 px-4 z-20">
      
      {/* Background Enhancements (Paper texture & Light rays) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E")' }} />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100dvh] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
      />

      {/* Title */}
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h3 className="font-body text-xs text-neutral-500/80 tracking-[0.4em] uppercase font-medium antialiased mb-4">
          Chapter Two
        </h3>
        <h2 className="font-elegant text-3xl md:text-4xl text-neutral-800 tracking-wide antialiased max-w-sm mx-auto leading-snug">
          From Strangers...<br/>
          <span className="text-2xl md:text-3xl text-neutral-600/90 italic">To Best Friends.</span>
        </h2>
        <SoftButterfly className="-top-8 -right-4" />
      </motion.div>

      {/* Primary Illustration (School Students) */}
      <motion.div 
        className="w-full max-w-sm mx-auto mb-24 relative"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
      >
        {/* Scrapbook Decorations around the image */}
        <PinkWashiTape className="-top-3 left-8 rotate-3 z-30" />
        <PinkWashiTape className="-bottom-3 right-8 -rotate-2 z-30" />
        <PaperClip className="top-10 -left-3 z-40" />
        <MiniStar className="-top-6 right-4" delay={0.5} />
        <InteractiveSticker emoji="🌸" className="-bottom-6 left-4" />
        <HandwrittenNote text="2015" className="top-1/2 -right-8 rotate-6" />

        <motion.div 
          animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-[6px] border-white/80 backdrop-blur-sm"
        >
          <img loading="lazy" src="/images/chapter2/school_students.png" 
            alt="School friends illustration" 
            className="w-full h-full object-cover filter sepia-[0.15] brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-light/40 to-transparent mix-blend-overlay pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Secondary Illustration (6 Years) */}
      <SixYearsIllustration />

      {/* Typewriter Story Sequence */}
      <TypewriterStory />

    {/* Manual continue button removed, automatic transition handles this */}
      
    </div>
  );
};
