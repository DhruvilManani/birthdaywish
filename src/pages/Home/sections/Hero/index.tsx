import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { HeroBackground } from './components/HeroBackground';
import { HeroImage } from './components/HeroImage';
import { HeroHeading } from './components/HeroHeading';
import { HeroSubtitle } from './components/HeroSubtitle';
import { HeroDecorations } from './components/HeroDecorations';

export const HeroSection: React.FC = () => {
  const pointerX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const pointerY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);


  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <SectionWrapper id="hero" background="none" fullHeight>
      <div className="relative flex-1 flex flex-col justify-center items-center w-full">
        
        {/* Entry Sequence Fade-in Overlay (simulating clouds parting / gold light) */}
        <motion.div 
          className="absolute inset-0 bg-black z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Golden Light Burst on Entry */}
        <motion.div
          className="absolute inset-0 bg-golden z-40 pointer-events-none mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 4, ease: "easeOut" }}
        />

        {/* 1. Background System (7 Layers) */}
        <HeroBackground />

        {/* 2. Touch-Interactive Decorations */}
        <HeroDecorations pointerX={pointerX} pointerY={pointerY} />
        {/* 3. Main Content Container (Centered with breathing space) */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 mt-12 md:mt-16">
          
          <HeroImage />
          
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HeroDecorations pointerX={pointerX} pointerY={pointerY} />
          </div>

          <div className="mt-8">
            <HeroHeading />
            <HeroSubtitle />
          </div>

        </div>
        
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
