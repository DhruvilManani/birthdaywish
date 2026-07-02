import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../../../context/NavigationContext';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { PrincessParticles } from './PrincessParticles';
import { PinkRosesIsland, PandaIsland, ChildhoodIsland, CoffeeRainIsland, BeachIsland, CastleIsland, DinnerIsland } from './MagicalIslands';

export const FavoritesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setChapterComplete } = useNavigation();

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // Near the bottom (e.g., within 50px)
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setChapterComplete(true);
    }
  };

  return (
    <SectionWrapper id="favorites" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 relative overflow-hidden bg-[#fff0f5]">
      
      <div 
        ref={containerRef} 
        onScroll={handleScroll}
        className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth"
      >
        
        {/* Sky Background Gradient */}
        <div className="absolute top-0 left-0 w-full min-h-[500vh] bg-gradient-to-b from-[#fff0f5] via-[#ffe4e1] to-[#fff0f5] opacity-100 z-0 pointer-events-none" />
        
        {/* Particles Engine */}
        <div className="sticky top-0 w-full h-[100dvh] pointer-events-none z-10">
          <PrincessParticles />
        </div>

        {/* Story Content Wrapper */}
        <div className="absolute top-0 w-full flex flex-col items-center pt-32 z-20 pointer-events-none">
          
          {/* Top Title: Chapter Six */}
          <motion.div 
            className="text-center mb-32 relative w-full px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-cute text-pink-500/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
              Chapter Six
            </p>
            <h2 className="font-elegant text-4xl md:text-6xl lg:text-7xl text-pink-900 tracking-wide antialiased mb-8 leading-tight drop-shadow-sm">
              The Little Things <br />
              That Make You... <br />
              <span className="italic text-rose-500">You</span>
            </h2>
          </motion.div>

          <motion.div 
            className="text-center mb-48 relative w-full px-6 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-elegant italic text-pink-900/80 text-2xl md:text-3xl tracking-wide leading-relaxed">
              "I never needed to ask<br/>what your favourite things were...<br/><br/>because I slowly memorised them all."
            </p>
          </motion.div>

          {/* Magical Islands */}
          <div className="w-full flex flex-col pointer-events-auto">
            <PinkRosesIsland />
            <PandaIsland />
            <ChildhoodIsland />
            <CoffeeRainIsland />
            <BeachIsland />
            <CastleIsland />
            <DinnerIsland />
          </div>

          {/* ENDING */}
          <motion.div 
            className="mt-64 mb-32 flex flex-col items-center justify-center cursor-pointer group relative text-center pointer-events-auto px-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            onClick={() => setChapterComplete(true)}
          >
            <h3 className="font-elegant text-4xl md:text-6xl text-pink-950 leading-relaxed drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
              And somehow... <br /><br />
              <span className="italic opacity-80 text-3xl md:text-5xl my-6 inline-block">every little thing <br/> you loved...</span> <br /><br />
              <span className="text-5xl md:text-7xl text-rose-600 mt-6 inline-block font-light">became my favourite too.</span>
            </h3>
            
            <p className="font-body text-xs tracking-[0.4em] text-pink-900/50 mt-32 uppercase group-hover:text-rose-500 transition-colors duration-500">
              Continue to Gallery
            </p>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default FavoritesSection;
