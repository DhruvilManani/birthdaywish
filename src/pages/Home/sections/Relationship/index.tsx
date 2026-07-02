import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { SafeImage } from './components/SafeImage';
import { TimelineBlock } from './components/TimelineBlock';
import { ScrapbookMemory } from './components/ScrapbookMemory';
import { LuxuryIconGrid } from './components/LuxuryIconGrid';

// A wrapper to dip background music volume when emotional quotes are on screen
const EmotionalQuote: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  useEffect(() => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(a => {
      // Store original volume only once
      if (!a.dataset.originalVolume) {
        a.dataset.originalVolume = a.volume.toString();
      }
      
      const originalVolume = parseFloat(a.dataset.originalVolume);
      if (isInView) {
        a.volume = originalVolume * 0.4;
      } else {
        a.volume = originalVolume;
      }
    });

    return () => {
      // Ensure volume is restored if component unmounts
      audios.forEach(a => {
        if (a.dataset.originalVolume) {
          a.volume = parseFloat(a.dataset.originalVolume);
        }
      });
    };
  }, [isInView]);

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }}>
      {children}
    </motion.div>
  );
};

export const RelationshipSection: React.FC = () => {
  const handleScrollToNext = () => {
    window.dispatchEvent(new Event('storybook-next-page'));
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  return (
    <SectionWrapper id="relationship" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 relative overflow-hidden bg-[#fdfbf7]">
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth">
        
        {/* Paper Texture Background */}
        <div className="absolute top-0 left-0 w-full min-h-[500vh] pointer-events-none opacity-[0.35] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Sunlight Leaks */}
        <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-[#fff5d1]/30 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#f9dec9]/20 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="absolute top-0 w-full flex flex-col items-center pt-32 z-20 pb-32">
          
          {/* CHAPTER INTRO */}
          <motion.div 
            className="text-center mb-32 relative w-full px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-cute text-stone-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">Chapter Eight</p>
            <h2 className="font-elegant text-4xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide antialiased mb-8 leading-tight drop-shadow-sm uppercase">
              Our Little <br /> Love Story
            </h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-8" />
            <EmotionalQuote className="font-elegant italic text-stone-500 text-xl md:text-2xl tracking-wide max-w-lg mx-auto leading-relaxed">
              "We never needed a perfect world...<br/><br/>we only needed each other."
            </EmotionalQuote>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="mt-24 mx-auto w-px h-16 bg-stone-300" />
          </motion.div>

          {/* SECTION ONE: OFFICIALLY US */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-48 px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="relative w-full aspect-[4/3] md:aspect-video rounded-sm overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white"
            >
              <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                <SafeImage src="/images/relationship/001.jpg" alt="Officially Us" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-sm shadow-lg flex flex-col items-center">
                <p className="font-cute text-stone-400 text-xs tracking-widest uppercase mb-1">MAY</p>
                <p className="font-elegant text-3xl text-stone-800">1</p>
                <p className="font-cute text-stone-400 text-[10px] tracking-widest uppercase mt-1">2025</p>
                <div className="absolute -top-3 -right-3 text-red-400 text-xl rotate-12 drop-shadow-sm">❤️</div>
              </div>
            </motion.div>

            <EmotionalQuote className="text-center">
              <h3 className="font-elegant italic text-2xl md:text-4xl text-stone-700 leading-relaxed">"1 May 2025, 1:00 AM... <br/> The night our forever began."</h3>
            </EmotionalQuote>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-wrap justify-center gap-8 mt-16 w-full">
              <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: -10 }, visible: { opacity: 1, y: 0, rotate: -3, transition: { type: "spring", duration: 1.5 } } }} className="w-40 md:w-56 aspect-[3/4] p-2 bg-white shadow-lg rounded-sm"><SafeImage src="/images/relationship/002.jpg" alt="Memory" className="w-full h-full object-cover" /></motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: 10 }, visible: { opacity: 1, y: 0, rotate: 4, transition: { type: "spring", duration: 1.5 } } }} className="w-40 md:w-56 aspect-[3/4] p-2 bg-white shadow-lg rounded-sm mt-8"><SafeImage src="/images/relationship/003.jpg" alt="Memory" className="w-full h-full object-cover" /></motion.div>
            </motion.div>
          </div>

          {/* SECTION TWO: OUR DAILY ROUTINE */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-48 px-4 relative">
            <h3 className="font-elegant text-3xl md:text-5xl text-stone-800 tracking-widest uppercase mb-24 text-center">Our Daily Routine</h3>
            
            <TimelineBlock time="Morning" title="Good Morning" icon="🌅" />
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", duration: 1.5 }} className="w-48 aspect-square p-2 bg-white shadow-md rounded-sm rotate-3 my-8 ml-auto mr-8"><SafeImage src="/images/relationship/004.jpg" alt="Routine" className="w-full h-full object-cover" /></motion.div>
            
            <TimelineBlock time="Midday" title="College" icon="🎓" />
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", duration: 1.5 }} className="w-48 aspect-square p-2 bg-white shadow-md rounded-sm rotate-[-4deg] my-8 mr-auto ml-8"><SafeImage src="/images/relationship/005.jpg" alt="Routine" className="w-full h-full object-cover" /></motion.div>

            <TimelineBlock time="Afternoon" title="Random Reels" icon="📱" />
            <TimelineBlock time="Evening" title="Evening Call" icon="☕" />
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", duration: 1.5 }} className="w-56 aspect-[4/3] p-2 bg-white shadow-md rounded-sm rotate-2 my-8 mx-auto"><SafeImage src="/images/relationship/006.jpg" alt="Routine" className="w-full h-full object-cover" /></motion.div>

            <TimelineBlock time="Night" title="Late Night Talks" icon="🌙" />
            <TimelineBlock time="Midnight" title="Good Night" icon="🤍" isLast={true} />
          </div>

          {/* SECTION THREE: OUR SAFE PLACE */}
          <div className="w-full min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center py-32 mb-48 shadow-[0_0_100px_rgba(0,0,0,0.05)] border-y border-stone-200/50">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="w-full max-w-4xl mx-auto px-4 text-center">
              <h3 className="font-elegant text-4xl md:text-6xl text-stone-800 mb-16">Our Safe Place</h3>
              
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="w-full flex justify-center gap-4 md:gap-8 mb-24 overflow-x-auto px-4 pb-8 no-scrollbar snap-x">
                <motion.div variants={{ hidden: { opacity: 0, x: -30, rotate: -10 }, visible: { opacity: 1, x: 0, rotate: -2, transition: { type: "spring", duration: 1.5 } } }} className="shrink-0 w-64 md:w-80 aspect-square p-3 bg-white shadow-lg rounded-sm snap-center"><SafeImage src="/images/relationship/007.jpg" alt="Safe Place" className="w-full h-full object-cover" /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: 10 }, visible: { opacity: 1, y: 0, rotate: 1, transition: { type: "spring", duration: 1.5 } } }} className="shrink-0 w-64 md:w-80 aspect-square p-3 bg-white shadow-lg rounded-sm snap-center translate-y-8"><SafeImage src="/images/relationship/008.jpg" alt="Safe Place" className="w-full h-full object-cover" /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 30, rotate: 5 }, visible: { opacity: 1, x: 0, rotate: 3, transition: { type: "spring", duration: 1.5 } } }} className="shrink-0 w-64 md:w-80 aspect-square p-3 bg-white shadow-lg rounded-sm snap-center"><SafeImage src="/images/relationship/009.jpg" alt="Safe Place" className="w-full h-full object-cover" /></motion.div>
              </motion.div>
              
              <EmotionalQuote>
                <h4 className="font-elegant italic text-3xl md:text-5xl text-stone-600 leading-relaxed">"You slowly became <br/> my safest place."</h4>
              </EmotionalQuote>
            </motion.div>
          </div>

          {/* SECTION FOUR: SMALL LITTLE MOMENTS */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-48 px-4 overflow-hidden">
            <h3 className="font-elegant text-3xl md:text-5xl text-stone-800 tracking-widest uppercase mb-16 text-center">Small Little Moments</h3>
            <ScrapbookMemory src="/images/relationship/010.jpg" caption="The happiest evenings." align="left" decoration="tape" rotation={-4} />
            <ScrapbookMemory src="/images/relationship/011.jpg" caption="The random laughter." align="right" decoration="flower" rotation={5} />
            <ScrapbookMemory src="/images/relationship/012.jpg" caption="The comfortable silence." align="center" decoration="clip" rotation={-2} />
          </div>

          {/* SECTION FIVE: WHY I NEVER STOPPED FALLING */}
          <div className="w-full mb-48">
            <h3 className="font-elegant text-3xl md:text-5xl text-stone-800 tracking-widest uppercase mb-16 text-center px-4">Why I Never Stopped Falling</h3>
            <LuxuryIconGrid />
          </div>

          {/* SECTION SIX: OUR FAVORITE PLACE */}
          <div className="w-full flex flex-col items-center mb-32 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100/30 to-transparent z-0 pointer-events-none" />
            <h3 className="font-elegant text-3xl md:text-5xl text-stone-800 tracking-widest uppercase mb-16 text-center z-10">Our Favorite Place</h3>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="w-full max-w-3xl aspect-[16/9] md:aspect-[21/9] bg-stone-200 mb-16 rounded-sm overflow-hidden shadow-2xl border border-stone-200 z-10">
              <SafeImage src="/images/relationship/013.jpg" alt="Favorite Place" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex justify-center gap-6 mb-24 z-10 w-full px-4">
              <motion.div variants={{ hidden: { opacity: 0, x: -20, rotate: -10 }, visible: { opacity: 1, x: 0, rotate: -3, transition: { type: "spring", duration: 1.5 } } }} className="w-1/2 max-w-[200px] aspect-square p-2 bg-white shadow-md rounded-sm"><SafeImage src="/images/relationship/014.jpg" alt="Place" className="w-full h-full object-cover" /></motion.div>
              <motion.div variants={{ hidden: { opacity: 0, x: 20, rotate: 10 }, visible: { opacity: 1, x: 0, rotate: 2, transition: { type: "spring", duration: 1.5 } } }} className="w-1/2 max-w-[200px] aspect-square p-2 bg-white shadow-md rounded-sm translate-y-4"><SafeImage src="/images/relationship/015.jpg" alt="Place" className="w-full h-full object-cover" /></motion.div>
            </motion.div>
            <EmotionalQuote className="text-center z-10">
              <h4 className="font-elegant italic text-2xl md:text-4xl text-stone-700 leading-relaxed">"We never needed expensive places.<br/><br/>The river,<br/>our conversations,<br/>and your smile<br/>were enough."</h4>
            </EmotionalQuote>
          </div>

          {/* ENDING */}
          <motion.div 
            className="mt-32 mb-16 flex flex-col items-center justify-center cursor-pointer group relative text-center px-6 w-full z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            onClick={handleScrollToNext}
          >
            {/* Background brightens slightly at the end */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] z-[-1] scale-150 pointer-events-none"
            />
            
            <div className="w-16 h-1 bg-amber-400/50 mx-auto mb-24 rounded-full" />
            
            <h3 className="font-elegant text-4xl md:text-6xl text-stone-800 leading-relaxed drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
              "I still choose you... <br />
              <span className="italic text-stone-600 text-3xl md:text-5xl mt-6 inline-block">every single day."</span>
            </h3>
            
            <motion.div className="relative mt-24 mb-12 text-4xl text-amber-500/80 drop-shadow-lg" animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              💛
              {/* Gathering golden particles */}
              <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 bg-amber-400 blur-[20px] z-[-1]" />
            </motion.div>
            
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-px h-12 bg-stone-300 mb-8" />
            
            <p className="font-body text-xs tracking-[0.4em] text-stone-400 mt-4 uppercase group-hover:text-amber-700 transition-colors duration-500">
              Continue to Chapter Nine
            </p>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default RelationshipSection;
