import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../../../context/NavigationContext';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { HeroBackground } from '../Hero/components/HeroBackground';
import { ScrapbookPage } from './ScrapbookPage';

export const ChapterOneSection: React.FC = () => {
  const { setChapterComplete } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setChapterComplete(true), 5000);
    return () => clearTimeout(timer);
  }, [setChapterComplete]);

  return (
    <SectionWrapper id="chapter-one" background="none" fullHeight>
      <div className="relative w-full min-height-screen-safe flex flex-col overflow-hidden pt-safe pb-safe z-10">
        
        {/* Background - Reusing Hero Background for perfect consistency */}
        <HeroBackground />
        
        <div className="relative z-30 flex-1 flex flex-col items-center justify-start w-full max-w-2xl mx-auto px-6 mt-12 md:mt-20">
          
          {/* Section Title */}
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h2 className="font-elegant text-3xl md:text-5xl text-neutral-800 tracking-wider antialiased mb-6">
              Where It All Began...
            </h2>
            <p className="font-elegant italic text-neutral-600/90 text-sm md:text-lg tracking-wide leading-relaxed max-w-md mx-auto">
              Some stories begin with grand moments...<br/>
              Ours began with something beautifully simple.
            </p>
          </motion.div>

          {/* The Scrapbook Memory Page */}
          <ScrapbookPage />
          
        </div>

        {/* Bottom Arrow Indicator */}
        <motion.div 
          className="absolute bottom-safe left-0 right-0 flex flex-col items-center justify-center pb-8 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 3 }}
        >
          <span className="font-body text-xs tracking-widest text-neutral-500/80 mb-3 antialiased">
            But this wasn't the best part...
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-5 border-r-[1.5px] border-b-[1.5px] border-golden rotate-45 rounded-sm" />
          </motion.div>
        </motion.div>
        
      </div>
    </SectionWrapper>
  );
};

export default ChapterOneSection;
