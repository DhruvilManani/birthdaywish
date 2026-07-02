import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { HeartParticles } from './HeartParticles';
import { VisualMoments } from './VisualMoments';

export const ChapterThreeSection: React.FC = () => {
  return (
    <SectionWrapper id="chapter-three" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 relative overflow-hidden bg-[#faf7f2]">
      
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth">
        
        {/* Background Elements: Very long gradient stretching the whole page height */}
        <div className="absolute top-0 left-0 w-full min-h-[400vh] bg-gradient-to-b from-transparent via-[#ffdcb0]/30 to-[#3b2f63]/40 opacity-80 z-0 pointer-events-none" />
        
        {/* Paper texture */}
        <div className="absolute top-0 left-0 w-full min-h-[400vh] pointer-events-none opacity-[0.25] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Dynamic Light Leaks (Fixed position behind scrolling content) */}
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] right-[-10%] w-[80vw] h-[80vh] bg-[#ffb7a1]/20 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-10%] w-[90vw] h-[70vh] bg-[#a890fe]/15 blur-[120px] rounded-full pointer-events-none"
          />
        </div>

        {/* Particles Engine (Sticky) */}
        <div className="sticky top-0 w-full h-screen pointer-events-none z-0">
          <HeartParticles />
        </div>

        {/* Story Content Wrapper (Scrolls over sticky background) */}
        <div className="absolute top-0 w-full flex flex-col items-center pt-24 z-10 px-4">
          
          {/* Top Title: 1. Large Title */}
          <motion.div 
            className="text-center mb-12 relative w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h2 className="font-elegant text-5xl md:text-7xl text-rose-900 tracking-wide antialiased leading-tight drop-shadow-sm px-4">
              When Friendship <br className="hidden md:block"/> Quietly Became Love
            </h2>
          </motion.div>

          {/* The rest of the visual flow */}
          <VisualMoments />

        </div>
      </div>
    </SectionWrapper>
  );
};

export default ChapterThreeSection;
