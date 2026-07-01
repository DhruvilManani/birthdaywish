import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { HeartParticles } from './HeartParticles';
import { MemoryCards } from './MemoryCards';
import { SoftButterfly, HandwrittenNote, MiniStar } from '../ChapterTwo/InteractiveDecorations';

export const ChapterThreeSection: React.FC = () => {
  const handleScrollToNext = () => {
    window.dispatchEvent(new Event('storybook-next-page'));
  };

  return (
    <SectionWrapper id="chapter-three" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 bg-cream-white relative overflow-hidden">
      
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth">
        
        {/* Background Elements */}
        {/* Paper texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Pink Light Leaks */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-rose-light/20 blur-[100px] rounded-full pointer-events-none z-0"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-0 w-[90vw] h-[60vh] bg-lavender-light/20 blur-[120px] rounded-full pointer-events-none z-0"
        />

        {/* Particles */}
        <HeartParticles />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full min-h-full flex flex-col items-center pt-24 pb-48 px-4">
          
          {/* Top Title */}
          <motion.div 
            className="text-center mb-24 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <SoftButterfly className="-top-12 left-4" />
            <h2 className="font-elegant text-4xl md:text-5xl text-rose-dark tracking-wide antialiased mb-4 drop-shadow-sm">
              Friendship became Love
            </h2>
            <p className="font-cute text-neutral-600 text-lg md:text-xl tracking-wider">
              Sometimes the heart knows before we do.
            </p>
            <MiniStar className="-bottom-8 right-12" delay={1} />
          </motion.div>

          {/* Random floating decorations */}
          <HandwrittenNote text="magical." className="absolute top-80 right-4 rotate-12 opacity-80" />
          <SoftButterfly className="absolute top-[40%] right-8" />
          <MiniStar className="absolute top-[60%] left-8" delay={2} />

          {/* Memories Scroll Area */}
          <MemoryCards />

          {/* Cinematic Bottom Transition */}
          <motion.div 
            className="mt-32 mb-16 flex flex-col items-center justify-center cursor-pointer group relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            onClick={handleScrollToNext}
          >
            <motion.h1 
              animate={{ textShadow: ['0px 0px 20px rgba(220,162,159,0.4)', '0px 0px 40px rgba(220,162,159,0.8)', '0px 0px 20px rgba(220,162,159,0.4)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-elegant text-7xl md:text-9xl text-rose-dark/90 tracking-[0.2em] md:tracking-[0.3em] font-light ml-4 select-none group-hover:scale-105 transition-transform duration-700"
            >
              LOVE
            </motion.h1>
            <p className="font-body text-xs tracking-[0.4em] text-neutral-400 mt-6 uppercase group-hover:text-rose-light transition-colors duration-500">
              Continue
            </p>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default ChapterThreeSection;
