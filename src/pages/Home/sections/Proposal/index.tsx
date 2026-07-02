import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../../../context/NavigationContext';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { NightSkyParticles } from './NightSkyParticles';

const VideoCallMemory: React.FC = () => {
  return (
    <motion.div 
      className="relative w-72 h-[30rem] mx-auto rounded-[2rem] border-[1px] border-white/10 bg-black/40 overflow-hidden shadow-[0_0_40px_rgba(168,144,254,0.15)] z-20 backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Blurred background image for the caller */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" 
        style={{ backgroundImage: 'url(/images/chapter3/sitting_stars.png)' }}
      />
      
      {/* Self PIP (Picture in Picture) */}
      <div className="absolute top-6 right-4 w-20 h-28 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      {/* Interface Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
          <div className="w-5 h-5 rounded-full border-2 border-white/60" />
        </div>
        <div className="w-12 h-12 rounded-full bg-rose-500/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.5)]">
          <div className="w-6 h-2 bg-white rounded-full rotate-45 transform origin-center translate-y-[-2px]" />
          <div className="w-6 h-2 bg-white rounded-full -rotate-45 transform origin-center translate-y-[-2px] absolute" />
        </div>
      </div>

      <div className="absolute top-6 left-6 text-white/70 font-sans text-xs tracking-wider">
        02:45:12
      </div>
    </motion.div>
  );
};

const ClimaxProposal: React.FC<{ onExplode: () => void }> = ({ onExplode }) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        onExplode();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, onExplode]);

  const wordVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.8,
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div ref={containerRef} className="h-[100dvh] w-full flex items-center justify-center relative z-20">
      <h2 className="font-elegant text-5xl md:text-7xl lg:text-8xl text-white tracking-widest flex flex-col items-center gap-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
        <motion.span custom={0} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={wordVariants}>
          Will
        </motion.span>
        <motion.span custom={1} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={wordVariants}>
          You
        </motion.span>
        <motion.span custom={2} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={wordVariants} className="text-rose-200 mt-4 text-6xl md:text-8xl lg:text-9xl">
          Marry Me?
        </motion.span>
      </h2>
    </div>
  );
};

export const ProposalSection: React.FC = () => {
  const [hasExploded, setHasExploded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setChapterComplete } = useNavigation();

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // Near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // Complete only if the explosion sequence is over or we are at the very bottom
      setChapterComplete(true);
    }
  };

  return (
    <SectionWrapper id="proposal" background="none" fullHeight={false} className="h-[100dvh] p-0 py-0 md:py-0 relative overflow-hidden bg-[#0a0f1d]">
      
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth"
      >
        
        {/* Sky Background Gradient */}
        <div className="absolute top-0 left-0 w-full min-h-[500vh] bg-gradient-to-b from-[#0a0f1d] via-[#12163b] to-black opacity-100 z-0 pointer-events-none" />
        
        {/* Soft Bloom effect when exploded */}
        <motion.div 
          className="fixed inset-0 bg-white z-0 pointer-events-none mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasExploded ? [0, 0.4, 0.1] : 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />

        {/* Dynamic Light Leaks */}
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ opacity: hasExploded ? 0 : [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vh] bg-[#36428c]/30 blur-[150px] rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ opacity: hasExploded ? 0 : [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-10%] w-[90vw] h-[70vh] bg-[#7a5eb5]/20 blur-[150px] rounded-full pointer-events-none"
          />
        </div>

        {/* Particles Engine */}
        <div className="sticky top-0 w-full h-[100dvh] pointer-events-none z-10">
          <NightSkyParticles hasExploded={hasExploded} />
        </div>

        {/* Story Content Wrapper */}
        <div className="absolute top-0 w-full flex flex-col items-center pt-32 z-20 px-4">
          
          {/* Top Title: Chapter Four */}
          <motion.div 
            className="text-center mb-32 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-cute text-neutral-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
              Chapter Four
            </p>
            <h2 className="font-elegant text-4xl md:text-5xl lg:text-6xl text-rose-100 tracking-wide antialiased mb-8 leading-tight drop-shadow-sm">
              The Night <br /> Everything Changed
            </h2>
          </motion.div>

          {/* Scene 1 */}
          <motion.div
            className="my-32 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h3 className="font-elegant text-3xl md:text-5xl text-white/80 leading-relaxed text-center italic">
              "One night... <br/> you were emotional."
            </h3>
          </motion.div>

          {/* Scene 2: Blended Illustration */}
          <motion.div 
            className="relative w-full max-w-2xl mx-auto my-32 flex justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img loading="lazy" src="/images/proposal/emotional_comfort.png" 
              alt="Emotional comfort"
              className="w-full h-auto object-cover mix-blend-screen opacity-90"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
                maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
              }}
            />
          </motion.div>

          {/* Scene 3: Video Call Memory */}
          <div className="w-full my-48">
            <VideoCallMemory />
          </div>

          {/* Scene 4: Typewriter sentences */}
          <div className="w-full flex flex-col gap-48 my-32 max-w-xl mx-auto text-center relative px-4">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-elegant text-2xl md:text-4xl text-rose-100/90 leading-relaxed italic"
            >
              "I only wanted one thing..."
            </motion.h3>

            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-elegant text-2xl md:text-4xl text-rose-100/90 leading-relaxed italic"
            >
              "To make you smile again."
            </motion.h3>

            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-elegant text-2xl md:text-4xl text-rose-100/90 leading-relaxed italic"
            >
              "So I asked..."
            </motion.h3>
          </div>

          {/* Main Moment */}
          <ClimaxProposal onExplode={() => setHasExploded(true)} />

          {/* Ending */}
          <AnimatePresence>
            {hasExploded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 4 }}
                className="w-full h-[100dvh] flex items-center justify-center mt-32 mb-32"
              >
                <h3 className="font-elegant text-3xl md:text-5xl text-white/70 leading-relaxed text-center drop-shadow-sm">
                  "And from that night... <br /><br />
                  we were no longer <br /><br />
                  just friends."
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fade to black spacing */}
          <div className="h-[50vh]" />

        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProposalSection;
