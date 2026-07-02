import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';

/* =========================================================
   COMPONENTS
========================================================= */

const Stars = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(60)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          width: Math.random() * 2.5 + 'px',
          height: Math.random() * 2.5 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.8 + 0.2,
          filter: `drop-shadow(0 0 ${Math.random()*3}px rgba(255,255,255,0.8))`
        }}
        animate={{ opacity: [Math.random() * 0.8 + 0.2, 0.1, Math.random() * 0.8 + 0.2] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const ShootingStars = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: '100vw', y: '-20vh', opacity: 0 }}
        animate={{ x: '-20vw', y: '50vh', opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: i * 8 + Math.random() * 5, repeat: Infinity, repeatDelay: 10 + Math.random() * 10, ease: 'linear' }}
        className="absolute w-24 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[-45deg]"
      />
    ))}
  </div>
);

const Moon = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 3, ease: 'easeOut' }}
    className="absolute top-[5%] right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FFF9E6] shadow-[0_0_100px_rgba(255,249,230,0.4),inset_-15px_-15px_30px_rgba(0,0,0,0.1)] z-0"
  />
);

const Lanterns = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(8)].map((_, i) => {
      const size = 20 + Math.random() * 30;
      return (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
          animate={{ y: '-20vh', x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`, opacity: [0, 0.9, 0] }}
          transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, delay: Math.random() * 10, ease: 'linear' }}
          className="absolute rounded-t-full rounded-b-md bg-gradient-to-b from-amber-200 to-orange-400 shadow-[0_0_25px_rgba(251,191,36,0.5)]"
          style={{ width: size, height: size * 1.4 }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-amber-700/50 " />
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1 + Math.random(), repeat: Infinity }} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-100 rounded-full " />
        </motion.div>
      );
    })}
  </div>
);

const ConstellationHeart = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto my-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <motion.path
          d="M50 85 C50 85, 10 55, 10 30 C10 15, 25 10, 35 15 C45 20, 50 30, 50 30 C50 30, 55 20, 65 15 C75 10, 90 15, 90 30 C90 55, 50 85, 50 85 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
        {[
          { cx: 50, cy: 85 }, { cx: 10, cy: 30 }, { cx: 35, cy: 15 },
          { cx: 50, cy: 30 }, { cx: 65, cy: 15 }, { cx: 90, cy: 30 },
          { cx: 30, cy: 55 }, { cx: 70, cy: 55 }
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="1.5"
            fill="#FFF"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, delay: i * 0.4 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,1))" }}
          />
        ))}
      </svg>
    </div>
  );
};

const CinematicFireworks = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          className="absolute"
          style={{ top: `${20 + Math.random() * 50}%`, left: `${20 + Math.random() * 60}%` }}
        >
          {[...Array(15)].map((_, j) => {
            const angle = (j / 25) * Math.PI * 2;
            const distance = 60 + Math.random() * 120;
            const colors = ['#FCD34D', '#F472B6', '#FFF', '#FFE4E1'];
            return (
              <motion.div
                key={j}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                whileInView={{ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, scale: Math.random(), opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5 + Math.random(), delay: i * 1.5, ease: "easeOut" }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: colors[j % colors.length], filter: `drop-shadow(0 0 8px ${colors[j % colors.length]})` }}
              />
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

const TimeCapsule = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex flex-col items-center my-64 z-30 w-full min-h-[400px]">
       {/* Ocean Water */}
       <div className="absolute bottom-0 w-screen h-40 flex justify-center overflow-hidden z-0">
          <motion.div animate={{ x: [-20, 20, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 w-[200%] h-full bg-gradient-to-t from-[#0A192F] to-transparent opacity-60" style={{ borderRadius: '50% 50% 0 0' }} />
          <motion.div animate={{ x: [20, -20, 20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 w-[200%] h-full bg-gradient-to-t from-[#112240] to-transparent opacity-40 mix-blend-overlay" style={{ borderRadius: '40% 60% 0 0' }} />
          <div className="absolute bottom-0 w-48 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent " />
       </div>

       {/* Bottle */}
       <motion.div 
         animate={opened ? {} : { y: [-5, 5, -5], rotate: [-2, 2, -2] }} 
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         onClick={() => setOpened(true)}
         className="relative cursor-pointer z-10 w-24 h-48 flex flex-col items-center group mt-16"
       >
          <div className="absolute -top-12 font-elegant text-stone-300 text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Memory Capsule</div>
          
          {/* Cork */}
          <motion.div 
            animate={opened ? { y: -60, x: 40, rotate: 120, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-8 h-8 bg-amber-800 rounded-sm mb-1 z-20 shadow-md border-x border-amber-900/50" 
          />
          
          {/* Glass Body */}
          <div className="w-8 h-8 border-x-4 border-white/20 bg-white/5 backdrop- relative z-10" />
          <div className="w-full h-full border-4 border-white/20 bg-white/5 backdrop- rounded-b-2xl rounded-t-3xl relative z-10 overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.6)]">
             {/* Reflection */}
             <div className="absolute top-0 left-2 w-3 h-full bg-gradient-to-b from-white/40 to-transparent rounded-full opacity-60" />
             
             {/* Folded Letter */}
             <AnimatePresence>
               {!opened && (
                 <motion.div exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.5 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-16 bg-[#FDFBF7] shadow-inner rounded-sm rotate-6 flex flex-col items-center justify-center opacity-90 border border-stone-200">
                    <div className="w-8 h-[1px] bg-amber-900/20 mb-2" />
                    <div className="w-6 h-[1px] bg-amber-900/20" />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
       </motion.div>

       {/* Opened Letter */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.8, y: 50 }}
         animate={opened ? { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
         transition={{ duration: 1.5, ease: "easeOut" }}
         className="absolute top-0 z-50 bg-[#FDFBF7] w-[90%] max-w-[400px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm border border-stone-200"
       >
          <p className="font-elegant italic text-stone-800 text-xl md:text-2xl leading-relaxed text-center mb-8">
            "Open this website again<br/>
            on your next birthday...<br/><br/>
            and remember<br/>
            how deeply<br/>
            you were loved<br/>
            today."
          </p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: opened ? 1 : 0 }} transition={{ delay: opened ? 3 : 0, duration: 2 }}>
            <p className="font-elegant italic text-stone-800 text-xl md:text-2xl leading-relaxed text-center">
              "I hope<br/>
              next year<br/>
              we'll have<br/>
              even more beautiful memories<br/>
              to add here."
            </p>
            <div className="text-rose-600 text-2xl text-center mt-6">❤️</div>
          </motion.div>
       </motion.div>
    </div>
  );
};

/* =========================================================
   POST-CREDIT SCENE
========================================================= */

const PostCreditScene: React.FC = () => {
  const [scene, setScene] = useState<number>(0);
  const [interaction, setInteraction] = useState<'idle' | 'yes' | 'always'>('idle');

  useEffect(() => {
    const sequence = async () => {
      // Scene 1: Wait 4 seconds (pure black)
      await new Promise(r => setTimeout(r, 4000));
      setScene(1); // Blinking cursor
      
      await new Promise(r => setTimeout(r, 1000));
      setScene(2); // Type "One last thing..."
      
      await new Promise(r => setTimeout(r, 3000));
      setScene(3); // Type "Will you keep making memories with me..."
      
      await new Promise(r => setTimeout(r, 4000));
      setScene(4); // Type "For the rest of our lives?"
      
      await new Promise(r => setTimeout(r, 2000));
      setScene(5); // Heart ❤️ appears
      
      await new Promise(r => setTimeout(r, 2000));
      setScene(6); // Buttons appear
    };
    sequence();
  }, []);

  const handleChoice = (choice: 'yes' | 'always') => {
    if (interaction !== 'idle') return;
    setInteraction(choice);
    setScene(7); // Animation starts
    
    setTimeout(() => {
      setScene(8); // Final Message "I knew your answer already. ❤️"
    }, 4000);
    
    setTimeout(() => {
      setScene(9); // Very Last Message "Now close this website..."
    }, 9000);
    
    setTimeout(() => {
      setScene(10); // Final Visual Moon & Fade
    }, 14000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 2 }}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden font-elegant text-stone-200"
    >
      {/* 
        TYPING SEQUENCE
      */}
      <div className="absolute top-1/3 flex flex-col items-center text-center px-4 w-full">
        {/* Line 1 */}
        <div className="text-xl md:text-2xl h-8 mb-4">
          {scene >= 2 && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: scene >= 7 ? 0 : 1 }} transition={{ duration: 2 }}>
              One last thing...
            </motion.span>
          )}
        </div>

        {/* Line 2 */}
        <div className="text-xl md:text-2xl h-16 mb-4 leading-relaxed">
          {scene >= 3 && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: scene >= 7 ? 0 : 1 }} transition={{ duration: 2 }}>
              Will you keep making<br/>memories with me...
            </motion.span>
          )}
        </div>

        {/* Line 3 */}
        <div className="text-2xl md:text-3xl h-10 mb-4 drop-shadow-md">
          {scene >= 4 && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: scene >= 7 ? 0 : 1 }} transition={{ duration: 2 }}>
              For the rest of our lives?
            </motion.span>
          )}
        </div>

        {/* Heart */}
        <div className="h-8 mb-12">
          {scene >= 5 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: scene >= 7 ? 0 : 1 }} transition={{ type: "spring", duration: 1.5 }} className="text-rose-500 text-2xl">
              ❤️
            </motion.div>
          )}
        </div>

        {/* Cursor */}
        {scene >= 1 && scene < 6 && (
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-1 h-6 bg-stone-300 rounded-full"
          />
        )}
      </div>

      {/* 
        BUTTONS
      */}
      <div className="absolute top-2/3 w-full flex justify-center gap-6 px-4">
        <AnimatePresence>
          {scene === 6 && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: interaction === 'yes' ? 1 : 0, scale: interaction === 'yes' ? 1.1 : 0.8 }}
                onClick={() => handleChoice('yes')}
                className={`px-8 py-3 rounded-full bg-[#FFFDF9] border border-[#E8C3BA] shadow-[0_4px_20px_rgba(232,195,186,0.3)] text-stone-800 tracking-widest text-sm transition-all duration-500 ${interaction === 'yes' ? 'shadow-[0_0_40px_rgba(232,195,186,0.8)]' : ''}`}
              >
                YES ❤️
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: interaction === 'always' ? 1 : 0, scale: interaction === 'always' ? 1.1 : 0.8 }}
                onClick={() => handleChoice('always')}
                className={`px-8 py-3 rounded-full bg-[#FFFDF9] border border-[#E8C3BA] shadow-[0_4px_20px_rgba(232,195,186,0.3)] text-stone-800 tracking-widest text-sm transition-all duration-500 ${interaction === 'always' ? 'shadow-[0_0_40px_rgba(232,195,186,0.8)]' : ''}`}
              >
                ALWAYS ❤️
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 
        CELEBRATION PARTICLES 
      */}
      {scene >= 7 && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          {/* Expanding Heart */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: [0.5, 30], opacity: [0.8, 0] }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute text-[100px] text-rose-500/20"
          >
            ❤️
          </motion.div>
          
          {/* Floating Tiny Hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              initial={{ opacity: 0, y: '20vh', scale: 0.5 }}
              animate={{ opacity: [0, 0.8, 0], y: '-50vh', scale: 1 }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, ease: "easeOut" }}
              className="absolute text-rose-400 text-sm md:text-xl"
              style={{ left: `${30 + Math.random() * 40}%` }}
            >
              ❤️
            </motion.div>
          ))}
          
          {/* Falling Rose Petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              initial={{ opacity: 0, y: '-20vh', x: `${Math.random() * 100}vw`, rotate: 0 }}
              animate={{ opacity: [0, 0.6, 0], y: '100dvh', rotate: 360 }}
              transition={{ duration: 5 + Math.random() * 4, delay: Math.random() * 3, ease: "linear" }}
              className="absolute text-rose-600/60 text-lg "
            >
              🥀
            </motion.div>
          ))}

          {/* Golden Sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 3, repeat: Infinity }}
              className="absolute w-1.5 h-1.5 bg-amber-200 rounded-full "
              style={{ left: `${20 + Math.random() * 60}%`, top: `${30 + Math.random() * 40}%` }}
            />
          ))}
        </div>
      )}

      {/* 
        FINAL MESSAGES 
      */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
        <AnimatePresence>
          {scene === 8 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 2 } }}
              transition={{ duration: 3 }}
              className="text-2xl md:text-3xl text-stone-200 leading-relaxed italic"
            >
              "I knew<br/>your answer<br/>already. ❤️"
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
        {scene >= 9 && scene < 10 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="text-lg md:text-xl text-stone-400 font-cute tracking-widest leading-loose"
          >
            "Now close this website...<br/>and let me hug you<br/>for real."
          </motion.p>
        )}
      </div>

      {/* 
        FINAL VISUAL 
      */}
      <AnimatePresence>
        {scene === 10 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 2, duration: 4 }}
              className="absolute top-1/4 text-4xl "
            >
              🌙
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ delay: 4, duration: 4, repeat: Infinity }}
              className="absolute top-[20%] right-[30%] w-1 h-1 bg-white rounded-full "
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

/* =========================================================
   MAIN SECTION
========================================================= */

export const GrandFinaleSection: React.FC = () => {
  const [finaleState, setFinaleState] = useState<'idle' | 'hug' | 'blackout' | 'post-credit'>('idle');

  const handleHug = () => {
    setFinaleState('hug');
    setTimeout(() => {
      setFinaleState('blackout');
      // 16 seconds after blackout starts, trigger post-credit
      setTimeout(() => {
        setFinaleState('post-credit');
      }, 16000);
    }, 8000);
  };

  const handleReplay = () => {
    window.location.reload();
  };

  if (finaleState === 'post-credit') {
    return <PostCreditScene />;
  }

  // If we are in the blackout phase, return just the black screen
  if (finaleState === 'blackout') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 4 }} 
        className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center pointer-events-auto overflow-hidden px-4"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }} // Fade out before post-credit
          transition={{ delay: 2, duration: 12, times: [0, 0.1, 1] }}
          className="text-center flex flex-col items-center justify-center w-full"
        >
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ delay: 2, duration: 6, times: [0, 0.2, 1], ease: "easeInOut" }} 
            className="font-elegant italic text-stone-300 text-2xl md:text-3xl leading-relaxed absolute inset-x-0 mx-auto"
          >
            "Every ending becomes beautiful...<br/>when it's with you."
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 9, duration: 3 }} 
            className="font-elegant text-stone-200 text-3xl md:text-5xl mt-12 mb-8 drop-shadow-lg leading-tight"
          >
            See You<br/>In Every Lifetime ❤️
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 10, duration: 3 }} 
            className="font-elegant text-stone-500 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-12"
          >
            Crafted with love by<br/><span className="text-stone-400 mt-2 inline-block">Dhruvil</span><br/><span className="text-stone-600">2026</span>
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  // If in the Hug phase, return just the hug overlay over everything
  if (finaleState === 'hug') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2 }} 
        className="fixed inset-0 bg-[#0A0F1D] z-[900] flex items-center justify-center px-6 pointer-events-auto"
      >
        <p className="font-elegant italic text-stone-200 text-2xl md:text-4xl text-center leading-[3rem]">
          "Now close this website...<br/><br/>
          come here...<br/><br/>
          and give me the biggest hug.<br/><br/>
          I've been waiting<br/>
          since the first page. ❤️"
        </p>
      </motion.div>
    );
  }

  // Standard Finale View
  return (
    <SectionWrapper id="grand-finale" background="none" fullHeight={false} className="p-0 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <motion.div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-[#FFE4E1] via-[#1A1025] to-[#050B14]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 5 }}
      />
      <div className="fixed inset-0 z-0 bg-[#050B14] opacity-80 pointer-events-none" />

      {/* Global Particles */}
      <Stars />
      <ShootingStars />
      <Moon />

      <div className="relative z-20 w-full flex flex-col items-center justify-start pt-32 pb-40 px-4 md:px-0">
         
         {/* SCENE 2: Lanterns Environment setup */}
         <Lanterns />

         {/* SCENE 3: Constellation */}
         <motion.div className="w-full text-center mt-32 mb-64 z-20">
            <ConstellationHeart />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 3, delay: 1 }}
              className="font-elegant italic text-stone-300 text-2xl md:text-3xl max-w-lg mx-auto leading-relaxed mt-12 px-4 drop-shadow-md"
            >
              "No matter where life takes us...<br/>
              I'll always find my way back to you."
            </motion.p>
         </motion.div>

         {/* SCENE 4 & 5: Fireworks and Typography */}
         <div className="relative w-full flex flex-col items-center justify-center min-h-[100dvh] my-32 z-20">
            <CinematicFireworks />
            
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true, margin: "-20%" }} 
              transition={{ duration: 3 }}
              className="text-center"
            >
               <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="font-elegant text-5xl md:text-7xl text-stone-200 drop-shadow-lg mb-8">
                 I Love You
               </motion.p>
               <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5, duration: 2 }} className="font-elegant italic text-rose-400 text-4xl md:text-5xl drop-shadow-lg mb-20">
                 Baby ❤️
               </motion.p>
               <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 6, duration: 3 }} className="font-elegant italic text-stone-300 text-2xl md:text-4xl leading-relaxed max-w-2xl mx-auto px-4">
                 "Thank you<br/><br/>
                 for making my life<br/><br/>
                 the happiest story<br/>
                 I've ever lived."
               </motion.p>
            </motion.div>
         </div>

         {/* SCENE 6: Calm & Promise */}
         <motion.div 
           initial={{ opacity: 0 }} 
           whileInView={{ opacity: 1 }} 
           viewport={{ once: true, margin: "-20%" }} 
           transition={{ duration: 4 }} 
           className="w-full text-center my-64 z-20"
         >
            <p className="font-elegant italic text-stone-300 text-3xl md:text-5xl leading-[4rem] drop-shadow-md">
              "I'll choose you<br/>
              again...<br/>
              and again...<br/>
              and again."
            </p>
         </motion.div>

         {/* TIME CAPSULE */}
         <TimeCapsule />

         {/* FINAL PROMISE */}
         <motion.div 
           initial={{ opacity: 0 }} 
           whileInView={{ opacity: 1 }} 
           viewport={{ once: true, margin: "-10%" }} 
           transition={{ duration: 4 }} 
           className="w-full flex flex-col items-center my-48 z-20"
         >
            <h2 className="font-elegant text-5xl md:text-7xl text-stone-200 mb-12 drop-shadow-lg text-center leading-tight">
              See You<br/>In Every Lifetime.
            </h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 3, duration: 2 }} 
              className="font-elegant italic text-rose-400 text-2xl md:text-3xl"
            >
              Forever Yours, <br/>Dhruvil ❤️
            </motion.p>
         </motion.div>

         {/* LAST INTERACTION BUTTONS */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true, margin: "0%" }} 
           transition={{ delay: 6, duration: 2 }} 
           className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mt-16 mb-48 z-30 px-6"
         >
            <button 
              onClick={handleReplay}
              className="w-full md:w-auto px-8 py-4 rounded-full border border-stone-600 bg-white/5 backdrop- text-stone-300 font-elegant tracking-widest uppercase hover:bg-white/10 hover:border-stone-400 transition-all duration-300"
            >
              ❤️ Replay Our Story
            </button>
            <button 
              onClick={handleHug}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-stone-200 text-stone-900 font-elegant tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              🤍 Close With A Hug
            </button>
         </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default GrandFinaleSection;
