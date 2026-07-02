import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { ScrapbookFlow } from './ScrapbookFlow';

export const GallerySection: React.FC = () => {
  const handleScrollToNext = () => {
    window.dispatchEvent(new Event('storybook-next-page'));
  };

  return (
    <SectionWrapper id="gallery" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 relative overflow-hidden bg-[#fdfbf7]">
      
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth">
        
        {/* Paper Texture Background */}
        <div className="absolute top-0 left-0 w-full min-h-[500vh] pointer-events-none opacity-[0.4] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Dynamic Light Leaks (Sun Rays) */}
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[120vw] h-[100vh] bg-[#fcd34d]/20 blur-[150px] rounded-full pointer-events-none transform origin-top-right mix-blend-overlay"
          />
          {/* Light particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute rounded-full bg-white/40 blur-sm pointer-events-none"
              style={{ top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw`, width: Math.random() * 10 + 5, height: Math.random() * 10 + 5 }}
              animate={{ y: [0, -50, 0], opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
            />
          ))}
        </div>

        {/* Story Content Wrapper */}
        <div className="absolute top-0 w-full flex flex-col items-center pt-32 z-20">
          
          {/* Top Title: Chapter Seven */}
          <motion.div 
            className="text-center mb-32 relative w-full px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-cute text-stone-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
              Chapter Seven
            </p>
            <h2 className="font-elegant text-4xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide antialiased mb-8 leading-tight drop-shadow-sm uppercase">
              Our Beautiful <br /> Memories
            </h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-8" />
            <p className="font-elegant italic text-stone-500 text-xl md:text-2xl tracking-wide max-w-lg mx-auto leading-relaxed">
              "The moments we captured...<br/><br/>and the countless beautiful ones<br/>we forgot to photograph."
            </p>
            
            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-24 mx-auto w-px h-16 bg-stone-300"
            />
          </motion.div>

          {/* Flowing Scrapbook Gallery */}
          <ScrapbookFlow />

          {/* ENDING */}
          <motion.div 
            className="mt-48 mb-32 flex flex-col items-center justify-center cursor-pointer group relative text-center px-6 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            onClick={handleScrollToNext}
          >
            <h3 className="font-elegant text-3xl md:text-5xl text-stone-800 leading-relaxed drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
              Every picture <br />
              <span className="italic text-stone-600 text-2xl md:text-4xl my-4 inline-block">holds a heartbeat.</span> <br /><br />
              Every memory <br />
              <span className="text-4xl md:text-6xl text-amber-700/80 mt-4 inline-block font-light italic">holds a forever.</span>
            </h3>
            
            <motion.div 
              className="relative mt-24 mb-12 text-5xl md:text-6xl text-amber-500/80 drop-shadow-lg"
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🤍
              <motion.div
                className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full blur-[1px]"
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-stone-300 mb-8"
            />
            
            <p className="font-body text-xs tracking-[0.4em] text-stone-400 mt-4 uppercase group-hover:text-amber-700 transition-colors duration-500">
              Continue to Letter
            </p>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default GallerySection;
