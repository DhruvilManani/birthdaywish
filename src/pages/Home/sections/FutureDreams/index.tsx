import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { DreamScene } from './components/DreamScene';

// A wrapper to dip background music volume when emotional quotes are on screen
const EmotionalQuote: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  useEffect(() => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(a => {
      if (!a.dataset.originalVolume) {
        a.dataset.originalVolume = a.volume.toString();
      }
      const originalVolume = parseFloat(a.dataset.originalVolume);
      a.volume = isInView ? originalVolume * 0.4 : originalVolume;
    });

    return () => {
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

export const FutureDreamsSection: React.FC = () => {
  const [interactions, setInteractions] = useState<Record<string, boolean>>({});

  const handleScrollToNext = () => {
    window.dispatchEvent(new Event('storybook-next-page'));
  };

  const trigger = (key: string) => {
    setInteractions(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setInteractions(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <SectionWrapper id="future-dreams" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0 relative overflow-hidden bg-[#fdfbf7]">
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth snap-y snap-mandatory">
        
        {/* Paper Texture Background */}
        <div className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none opacity-[0.35] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Intro */}
        <div className="w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center relative snap-start">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={`intro-particle-${i}`}
                initial={{ opacity: 0, y: '100%', x: `${Math.random() * 100}%` }}
                animate={{ opacity: [0, 0.5, 0], y: '-10%', x: `${Math.random() * 100}%` }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                className="absolute w-2 h-2 bg-amber-300 rounded-full blur-[2px] will-change-transform"
              />
            ))}
          </div>

          <motion.div 
            className="text-center relative w-full px-4 z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <p className="font-cute text-stone-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">Chapter Nine</p>
            <h2 className="font-elegant text-4xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide antialiased mb-8 leading-tight drop-shadow-sm uppercase">
              The Future I Dream <br /> With You
            </h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-8" />
            <p className="font-elegant italic text-stone-500 text-xl md:text-2xl tracking-wide max-w-lg mx-auto leading-relaxed">
              "Some dreams are too beautiful<br/><br/>to stay only inside our imagination."
            </p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="mt-24 mx-auto w-px h-16 bg-stone-300" />
          </motion.div>
        </div>

        {/* SCENE 1: Switzerland */}
        <DreamScene 
          id="scene-switzerland"
          imageSrc="/images/future/001.jpg"
          imageAlt="Switzerland Cabin"
          quote={<>"One day...<br/><br/>we'll watch the snow together."</>}
          onSceneTap={() => trigger('snow')}
        >
          {/* Mist */}
          <motion.div animate={{ x: [-50, 50, -50] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-20 left-0 w-[150vw] h-64 bg-white/10 blur-3xl pointer-events-none will-change-transform" />
          {/* Chimney Smoke */}
          <motion.div animate={{ y: [-10, -50], opacity: [0, 0.4, 0], scale: [1, 1.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }} className="absolute top-1/4 right-1/3 w-16 h-32 bg-gray-200/20 blur-xl rounded-full pointer-events-none will-change-transform" />
          {/* Window Glow */}
          <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/20 blur-3xl pointer-events-none will-change-transform" />
          {/* Snow Animation */}
          {[...Array(interactions['snow'] ? 20 : 10)].map((_, i) => (
            <motion.div 
              key={`snow-${i}`}
              initial={{ opacity: 0, y: -20, x: `${Math.random() * 100}vw` }}
              animate={{ opacity: [0, 0.8, 0], y: '100vh', x: `${Math.random() * 100}vw` }}
              transition={{ duration: (interactions['snow'] ? 2 : 5) + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px] will-change-transform"
            />
          ))}
        </DreamScene>

        {/* SCENE 2: Beach Dream */}
        <DreamScene 
          id="scene-beach"
          imageSrc="/images/future/002.jpg"
          imageAlt="Beach Sunset"
          quote={<>"We'll keep walking...<br/><br/>no matter how long the road becomes."</>}
          onSceneTap={() => trigger('ocean')}
        >
          {/* Shimmer */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={`shimmer-${i}`} animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} className="absolute top-[40%] left-[20%] w-2 h-2 bg-amber-200 blur-[2px] rounded-full will-change-transform" style={{ left: `${20 + Math.random() * 60}%`, top: `${35 + Math.random() * 10}%` }} />
          ))}
          {/* Footprints */}
          {[...Array(4)].map((_, i) => (
            <motion.div key={`footprint-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: [0, 0.3, 0.1] }} transition={{ duration: 3, delay: i * 0.5 }} viewport={{ once: false }} className="absolute bottom-12 w-3 h-5 bg-stone-800/30 blur-[1px] rounded-full will-change-transform rotate-12" style={{ left: `${30 + i * 5}%`, bottom: `${10 + i * 2}%` }} />
          ))}
          {/* Subtle Wave Animation & Extra Ripple on Tap */}
          <motion.div 
            animate={interactions['ocean'] ? { y: [0, -10, 0], opacity: [0.1, 0.5, 0.1], scale: [1, 1.05, 1] } : { y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: interactions['ocean'] ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-[150vw] left-[-25vw] h-48 bg-gradient-to-t from-blue-300/20 to-transparent blur-md will-change-transform"
          />
        </DreamScene>

        {/* SCENE 3: Coffee & Rain */}
        <DreamScene 
          id="scene-coffee"
          imageSrc="/images/future/003.jpg"
          imageAlt="Coffee and Rain"
          quote={<>"I don't need perfect weather...<br/><br/>I only need your company."</>}
          onSceneTap={() => trigger('coffee')}
        >
          {/* Lightning */}
          <motion.div animate={{ opacity: [0, 0, 0.8, 0, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.9, 0.92, 0.95, 1] }} className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none will-change-transform" />
          {/* Window Streaks */}
          {[...Array(4)].map((_, i) => (
            <motion.div key={`streak-${i}`} animate={{ y: ['-10%', '110%'], opacity: [0, 0.5, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }} className="absolute top-0 w-1 h-32 bg-white/10 blur-[1px] will-change-transform" style={{ left: `${10 + Math.random() * 80}%` }} />
          ))}
          {/* Coffee Steam */}
          <AnimatePresence>
            <motion.div animate={{ y: [-10, -60], opacity: [0, interactions['coffee'] ? 0.6 : 0.3, 0], scale: [1, interactions['coffee'] ? 2 : 1.5], x: [0, interactions['coffee'] ? 15 : 10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} className="absolute bottom-1/4 left-1/3 w-8 h-24 bg-white/20 blur-xl rounded-full pointer-events-none will-change-transform" />
          </AnimatePresence>
          {/* Rain Animation */}
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={`rain-${i}`}
              initial={{ opacity: 0, y: -50, x: `${Math.random() * 120}vw` }}
              animate={{ opacity: [0, 0.4, 0], y: '100vh', x: `+=${Math.random() * 50 - 25}vw` }}
              transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
              className="absolute w-[1px] h-8 bg-blue-100/50 rotate-12 will-change-transform"
            />
          ))}
        </DreamScene>

        {/* SCENE 4: Future Home */}
        <DreamScene 
          id="scene-home"
          imageSrc="/images/future/004.jpg"
          imageAlt="Future Home"
          quote={<>"Home will never be a place...<br/><br/>Home will always be you."</>}
          onSceneTap={() => trigger('candle')}
        >
          {/* Breathing Lights & Candles */}
          <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/20 blur-3xl pointer-events-none will-change-transform" />
          <motion.div animate={interactions['candle'] ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : { opacity: [0.4, 0.7, 0.4] }} transition={{ duration: interactions['candle'] ? 0.5 : 2, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-orange-400/40 blur-md rounded-full pointer-events-none will-change-transform" />
          
          {/* Moving Plants / Curtains Illusion */}
          <motion.div animate={{ skewX: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-transparent pointer-events-none will-change-transform" />
          
          {/* Dust Animation */}
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={`dust-${i}`}
              initial={{ opacity: 0, y: `${Math.random() * 100}vh`, x: `${Math.random() * 100}vw` }}
              animate={{ opacity: [0, 0.3, 0], y: '-=20vh', x: '+=10vw' }}
              transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
              className="absolute w-1 h-1 bg-amber-100 rounded-full blur-[1px] will-change-transform"
            />
          ))}
        </DreamScene>

        {/* SCENE 5: Our Family */}
        <DreamScene 
          id="scene-family"
          imageSrc="/images/future/005.jpg"
          imageAlt="Our Family"
          quote={<>"Our greatest adventure<br/>won't be travelling...<br/><br/>It will be growing together."</>}
          onSceneTap={() => trigger('butterfly')}
        >
          {/* Sunlight Rays */}
          <motion.div animate={{ x: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-[150vw] h-full bg-gradient-to-br from-amber-200/10 via-transparent to-transparent rotate-12 transform-origin-top-left pointer-events-none will-change-transform" />
          
          {/* Butterfly Animation */}
          {[...Array(interactions['butterfly'] ? 6 : 3)].map((_, i) => (
            <motion.div 
              key={`butterfly-${i}`}
              initial={{ opacity: 0, y: `${50 + Math.random() * 50}vh`, x: `${Math.random() * 100}vw`, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], y: interactions['butterfly'] ? '-=60vh' : '-=40vh', x: `${Math.random() > 0.5 ? '+' : '-'}=30vw`, scale: [0.5, 1, 0.5] }}
              transition={{ duration: interactions['butterfly'] ? 2 + Math.random() * 2 : 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * (interactions['butterfly'] ? 0.5 : 8) }}
              className="absolute text-xl will-change-transform"
            >
              🦋
            </motion.div>
          ))}
        </DreamScene>

        {/* SCENE 6: Dream Car */}
        <DreamScene 
          id="scene-car"
          imageSrc="/images/future/006.jpg"
          imageAlt="Dream Car BMW M5 CS"
          quote={<>"Success means nothing...<br/><br/>unless I celebrate it with you."</>}
        >
          {/* Sunlight Sweeping Reflection & Lens Flare */}
          <motion.div animate={{ x: ['-100vw', '200vw'], opacity: [0, 0.5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/3 left-0 w-[20vw] h-64 bg-white/10 blur-2xl rotate-45 pointer-events-none will-change-transform" />
          <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 right-1/4 w-32 h-32 bg-amber-300/30 blur-[40px] rounded-full pointer-events-none mix-blend-screen will-change-transform" />
          {/* Moving Clouds / Dust */}
          <motion.div animate={{ x: [0, -100] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 left-1/4 w-full h-32 bg-stone-400/10 blur-3xl pointer-events-none will-change-transform" />
        </DreamScene>

        {/* SCENE 7: Growing Old */}
        <DreamScene 
          id="scene-elderly"
          imageSrc="/images/future/007.jpg"
          imageAlt="Growing Old Together"
          quote={
            <EmotionalQuote className="flex flex-col gap-6">
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2 }}>"No matter how old we become..."</motion.span>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2, delay: 2.5 }}>"I still want..."</motion.span>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2, delay: 4 }}>"...to walk beside you."</motion.span>
            </EmotionalQuote>
          }
        >
          {/* Moving Leaves */}
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`leaf-${i}`}
              initial={{ opacity: 0, y: -20, x: `${Math.random() * 100}vw`, rotate: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: '100vh', x: `+=${Math.random() * 60}vw`, rotate: 360 }}
              transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
              className="absolute text-sm text-stone-600/50 will-change-transform"
            >
              🍂
            </motion.div>
          ))}
          {/* Flying Birds */}
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={`bird-${i}`}
              initial={{ opacity: 0, y: '30vh', x: '-10vw' }}
              animate={{ opacity: [0, 0.8, 0], y: '10vh', x: '110vw' }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 4 }}
              className="absolute text-2xl rotate-12 will-change-transform"
            >
              🕊️
            </motion.div>
          ))}
        </DreamScene>

        {/* FINAL PROMISE */}
        <div className="w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center relative snap-start text-center px-4">
          <EmotionalQuote className="absolute inset-0 pointer-events-none">
             {/* We use EmotionalQuote here just to trigger the volume dip for the final scene */}
          </EmotionalQuote>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,transparent_100%)] z-0 will-change-transform"
          />

          {/* Shooting Star */}
          <motion.div 
            initial={{ opacity: 0, x: '120vw', y: '-20vh' }}
            whileInView={{ opacity: [0, 1, 0], x: '-20vw', y: '50vh' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 3, delay: 2, ease: "easeOut" }}
            className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-white rotate-45 z-0 blur-[1px] will-change-transform"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-10"
          >
            <h3 className="font-cute text-5xl md:text-7xl lg:text-8xl text-stone-800 leading-relaxed drop-shadow-sm mb-16">
              "I promise...<br/><br/>
              to never let you<br/>
              walk alone.<br/><br/>
              <span className="text-3xl md:text-5xl text-stone-600">No matter what life brings."</span>
            </h3>

            <motion.div 
              onClick={handleScrollToNext}
              className="mt-24 flex flex-col items-center cursor-pointer group"
            >
              <motion.div className="relative text-5xl md:text-6xl text-amber-500/80 drop-shadow-lg mb-8" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                💛
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 bg-amber-400 blur-[20px] z-[-1] will-change-transform" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 3 }}
              >
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-px h-16 bg-stone-300 mb-8 mx-auto" />
                <p className="font-body text-xs md:text-sm tracking-[0.4em] text-stone-400 uppercase group-hover:text-amber-700 transition-colors duration-500">
                  Continue to The Letter
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default FutureDreamsSection;
