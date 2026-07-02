import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import { SectionWrapper } from '../../../../components/layout/SectionWrapper';

/* =========================================================
   COMPONENTS
========================================================= */

const InteractiveBalloon = ({ delay = 0, xOffset = 0, colorIdx = 0 }) => {
  const [popped, setPopped] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  
  const colors = ['#FCA5A5', '#FCD34D', '#C4B5FD', '#F472B6'];
  const msgs = ["You deserve the world.", "You look cutest when you smile.", "Keep smiling forever.", "You are my everything.", "My favorite person."];
  const msg = useRef(msgs[Math.floor(Math.random() * msgs.length)]).current;

  const handlePop = () => {
    if (popped) return;
    setPopped(true);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  if (popped && !showMsg) return null;

  return (
    <motion.div 
      className="absolute z-[60] cursor-pointer transform-gpu"
      initial={{ y: '20vh', opacity: 0 }}
      whileInView={{ y: 0, opacity: 0.8 }}
      viewport={{ once: true }}
      transition={{ duration: 2, delay: delay * 0.1, ease: "easeOut" }}
      style={{ left: `${20 + Math.random()*60}%`, bottom: `${10 + Math.random() * 20}%`, marginLeft: xOffset }}
      onClick={handlePop}
    >
      {!popped ? (
        <svg width="60" height="80" viewBox="0 0 40 60" fill={colors[colorIdx % colors.length]} className="drop-shadow-md hover:scale-110 transition-transform">
           <path d="M20 0C8.954 0 0 10.745 0 24c0 14.333 16 30 20 36 4-6 20-21.667 20-36C40 10.745 31.046 0 20 0z" />
        </svg>
      ) : (
        <div className="relative flex items-center justify-center">
           {/* Hearts Explosion (Optimized) */}
           {[...Array(3)].map((_, i) => (
              <motion.div key={i} initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: [0, 1.5, 0], x: (Math.random()-0.5)*80, y: (Math.random()-0.5)*80 }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute text-rose-500 text-2xl drop-shadow-sm transform-gpu">❤️</motion.div>
           ))}
           {/* Message */}
           {showMsg && (
             <motion.p initial={{ opacity: 0, scale: 0.5, y: 10 }} animate={{ opacity: 1, scale: 1, y: -20 }} transition={{ duration: 0.4 }} className="absolute whitespace-nowrap font-elegant italic text-rose-800 text-lg md:text-xl bg-white/90 px-5 py-2 rounded-full shadow-lg pointer-events-none text-center border border-rose-100 transform-gpu">
               {msg}
             </motion.p>
           )}
        </div>
      )}
    </motion.div>
  );
};

const CSSLuxuryCake = () => {
  const [tapped, setTapped] = useState(false);
  const [phase, setPhase] = useState(0);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    setPhase(1); // Make a Wish
    setTimeout(() => setPhase(2), 3000); // I hope every wish comes true
    setTimeout(() => {
      setPhase(0);
      setTapped(false);
    }, 7000); 
  };

  return (
    <div className="relative flex flex-col items-center drop-shadow-[0_20px_40px_rgba(255,192,203,0.3)] cursor-pointer group" onClick={handleTap}>
      
      {/* Tap Glow effect */}
      <motion.div animate={{ opacity: tapped ? 1 : 0, scale: tapped ? 1.4 : 1 }} transition={{ duration: 1 }} className="absolute inset-0 bg-amber-300/30 blur-[60px] rounded-full pointer-events-none z-0" />
      
      {/* Orbiting Sparkles */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-50 pointer-events-none">
         <div className="absolute top-[10%] -left-10 w-2 h-2 bg-amber-300 rounded-full blur-[1px] shadow-[0_0_15px_rgba(252,211,77,1)]" />
         <div className="absolute bottom-[20%] -right-10 w-3 h-3 bg-rose-300 rounded-full blur-[1px] shadow-[0_0_15px_rgba(251,113,133,1)]" />
      </motion.div>

      {/* Candles */}
      <div className="flex gap-6 mb-[-12px] z-40">
         {[1,2,3].map(i => (
           <div key={i} className="w-2.5 h-12 bg-gradient-to-b from-white to-amber-100 rounded-t-full rounded-b-sm relative shadow-sm border border-white/50">
              {/* Flame */}
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8], rotate: [-2, 2, -2] }} 
                 transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }} 
                 className="absolute -top-6 -left-2 w-6 h-8 bg-gradient-to-t from-amber-400 via-amber-200 to-transparent rounded-full blur-[2px] opacity-80" 
                 style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} 
              />
              {/* Glow */}
              <motion.div
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                 className="absolute -top-8 -left-4 w-10 h-10 bg-amber-400 rounded-full blur-[10px] pointer-events-none"
              />
           </div>
         ))}
      </div>
      
      {/* Tier 1 (Top) */}
      <div className="relative w-36 h-20 bg-gradient-to-br from-[#FFF5F7] to-[#FFE4E8] rounded-t-xl rounded-b-md z-30 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border-t border-white/60 border-l border-white/60">
         <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-xl">
            <div className="w-[150%] h-1 bg-white/40 rotate-45 transform -translate-y-4" />
         </div>
         <div className="absolute -bottom-2 left-0 w-full flex justify-around">
            {[...Array(6)].map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-b from-[#FFF5F7] to-[#FFD1DA] shadow-sm border border-white/30" />)}
         </div>
      </div>

      {/* Tier 2 (Middle) */}
      <div className="relative w-56 h-24 bg-gradient-to-br from-[#FFF] to-[#FFF0F3] rounded-t-xl rounded-b-md z-20 -mt-4 shadow-[0_10px_20px_rgba(0,0,0,0.08)] border-t border-white/80 border-l border-white/80">
         <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-60" />
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-60" />
         </div>
         <div className="absolute -bottom-3 left-0 w-full flex justify-around px-2">
            {[...Array(8)].map((_, i) => <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-b from-[#FFF] to-[#FFE4E8] shadow-sm border border-white/40" />)}
         </div>
      </div>

      {/* Tier 3 (Base) */}
      <div className="relative w-[300px] h-32 bg-gradient-to-br from-[#FFE4E8] to-[#FFCCD5] rounded-t-xl rounded-b-lg z-10 -mt-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-t border-white/50 border-l border-white/50">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50 shadow-[0_0_5px_rgba(252,211,77,0.5)]" />
         </div>
         <div className="absolute -bottom-4 left-0 w-full flex justify-around px-4">
            {[...Array(10)].map((_, i) => <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-b from-[#FFE4E8] to-[#FFB3C1] shadow-md border border-white/30" />)}
         </div>
      </div>
      
      {/* Cake Stand */}
      <div className="w-[340px] h-5 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full mt-3 shadow-[0_15px_25px_rgba(0,0,0,0.15)] border border-amber-300/50" />
      <div className="w-40 h-8 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 rounded-b-xl shadow-lg border-x border-b border-amber-400/50 flex flex-col items-center">
         <div className="w-full h-2 bg-black/5 mt-1" />
      </div>

      <div className="absolute -top-24 w-full flex justify-center pointer-events-none">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? -40 : -20 }} className="absolute font-elegant italic text-amber-600 text-3xl whitespace-nowrap drop-shadow-[0_0_10px_rgba(217,119,6,0.5)] z-50 bg-white/40 px-6 py-2 rounded-full backdrop-blur-sm">
           Make a Wish...
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === 2 ? 1 : 0, y: phase === 2 ? -40 : -20 }} className="absolute font-elegant italic text-rose-600 text-3xl whitespace-nowrap drop-shadow-[0_0_10px_rgba(225,29,72,0.3)] z-50 bg-white/40 px-6 py-2 rounded-full backdrop-blur-sm">
           I hope every wish comes true.
         </motion.div>
      </div>
    </div>
  );
};

const GiftBox = ({ title, emoji, opened, onOpen, children }: any) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opened || opening) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
      setOpening(false);
    }, 1800);
  };

  return (
    <div className="relative flex flex-col items-center min-h-[250px] w-full max-w-[320px] mx-auto">
       <motion.div 
         animate={
           opened ? { scale: 0.8, opacity: 0, filter: 'blur(10px)', y: -30, pointerEvents: 'none' } 
           : opening ? { x: [-4, 4, -4, 4, -2, 2, 0], y: [0, -3, 0] } 
           : {}
         }
         transition={{ duration: opening ? 0.6 : 0.8, ease: "easeInOut" }}
         className="absolute inset-0 flex flex-col items-center cursor-pointer z-10"
         onClick={handleOpen}
         whileHover={!opening && !opened ? { scale: 1.05 } : {}}
         whileTap={!opening && !opened ? { scale: 0.95 } : {}}
       >
         {/* Glow on open */}
         <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: opening ? 1 : 0, scale: opening ? 1.8 : 0 }} transition={{ duration: 1 }} className="absolute inset-0 bg-amber-300/40 blur-[40px] rounded-full z-0 pointer-events-none" />
         
             {/* Luxury Gift Box */}
             <div className="w-40 h-40 bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg shadow-xl border border-white/60 relative flex items-center justify-center group overflow-hidden z-10">
                {/* Ribbons */}
                <motion.div animate={opening ? { x: '100%', opacity: 0 } : {}} transition={{ duration: 1, delay: 0.6 }} className="absolute w-full h-6 bg-gradient-to-r from-rose-400 to-rose-300 shadow-sm" />
                <motion.div animate={opening ? { y: '100%', opacity: 0 } : {}} transition={{ duration: 1, delay: 0.6 }} className="absolute h-full w-6 bg-gradient-to-b from-rose-400 to-rose-300 shadow-sm" />
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
             </div>
             {/* Bow */}
             <motion.div animate={opening ? { scale: 1.5, opacity: 0, y: -30 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="absolute -top-6 flex z-10">
                <div className="w-10 h-10 border-[6px] border-rose-400 rounded-full rounded-br-none -rotate-45 -mr-1 shadow-sm" />
                <div className="w-10 h-10 border-[6px] border-rose-400 rounded-full rounded-bl-none rotate-45 -ml-1 shadow-sm" />
             </motion.div>
             
             <p className="mt-8 font-elegant text-stone-700 text-xl tracking-wide flex items-center gap-2 z-10">
               {emoji} {title}
             </p>
             <p className="text-xs text-stone-400 mt-2 uppercase tracking-widest z-10">Tap to open</p>
       </motion.div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.8, y: 30 }}
         animate={opened ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, pointerEvents: 'none' }}
         transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
         className="w-full flex items-center justify-center pt-8"
       >
         {children}
       </motion.div>
    </div>
  );
};

const wishes = [
  "I hope your smile never fades.",
  "I hope every dream comes true.",
  "I hope life always stays kind to you.",
  "I hope you always stay this adorable.",
  "I hope every birthday becomes even more beautiful.",
  "I'll always celebrate your happiness.",
  "I'll always stand beside you."
];

const WishesCycler = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i+1)%wishes.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-32 flex items-center justify-center w-full px-4">
      <AnimatePresence mode="wait">
        <motion.p 
          key={idx} 
          initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.05 }}
          transition={{ duration: 1 }}
          className="font-elegant italic text-stone-700 text-2xl md:text-3xl text-center leading-relaxed"
        >
          "{wishes[idx]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   MAIN SECTION
========================================================= */

export const BirthdaySection: React.FC = () => {
  const [gifts, setGifts] = useState({ g1: false, g2: false, g3: false, g4: false });
  const allGiftsOpened = gifts.g1 && gifts.g2 && gifts.g3 && gifts.g4;
  
  const containerRef = useRef<HTMLDivElement>(null);



  const endingRef = useRef<HTMLDivElement>(null);
  const endingInView = useInView(endingRef, { amount: 0.6 });

  return (
    <SectionWrapper id="birthday" background="none" fullHeight={false} className="p-0 bg-[#FDFBF7] overflow-hidden">
      <div 
        ref={containerRef}
        className="relative flex flex-col flex-1 w-full h-full overflow-y-auto overflow-x-hidden allow-scroll scroll-smooth"
      >
       
       {/* Background Environment */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Dynamic Sky Transition */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FFF0F5] to-[#FFE4E1]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 4 }}
          />
          
          {/* Fairy Lights & Golden Dust */}
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={`light-${i}`} 
              animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.3, 1] }} 
              transition={{ duration: 4 + Math.random()*4, repeat: Infinity, delay: Math.random()*3, ease: "easeInOut" }} 
              className="absolute w-3 h-3 bg-amber-100 rounded-full blur-[4px]" 
              style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} 
            />
          ))}

          {/* Floating Hearts */}
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={`heartbg-${i}`} 
              animate={{ y: ['110vh', '-10vh'], x: [Math.sin(i)*20, -Math.sin(i)*20], opacity: [0, 0.3, 0] }} 
              transition={{ duration: 15 + Math.random()*10, repeat: Infinity, delay: Math.random()*5, ease: "linear" }} 
              className="absolute text-rose-300 text-lg blur-[1px]" 
              style={{ left: `${10 + Math.random()*80}%`, bottom: '-10%' }}
            >
               ❤️
            </motion.div>
          ))}
          
          {/* Interactive Balloons (Always present) */}
          {[...Array(6)].map((_, i) => (
             <InteractiveBalloon key={`iballoon-${i}`} delay={Math.random()*10} xOffset={Math.sin(i)*40} colorIdx={i} />
          ))}

          {/* Celebration Overlay (Stops when ending is reached) */}
          <AnimatePresence>
            {allGiftsOpened && !endingInView && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="absolute inset-0 z-10"
              >
                 {/* Golden Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-100/30 to-transparent mix-blend-overlay" />
                 
                 {/* Confetti */}
                 {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={`confetti-${i}`} 
                      animate={{ y: ['-10vh', '110vh'], x: [Math.random()*100 - 50, Math.random()*100 - 50], rotate: [0, 360, 720] }} 
                      transition={{ duration: 4 + Math.random()*6, repeat: Infinity, delay: Math.random()*3, ease: "linear" }} 
                      className="absolute w-2.5 h-6 rounded-sm shadow-sm" 
                      style={{ left: `${Math.random()*100}%`, top: '-10%', backgroundColor: ['#FCA5A5', '#FCD34D', '#FFF', '#F472B6'][i % 4] }} 
                    />
                 ))}
                 
                 {/* Rose Petals */}
                 {[...Array(10)].map((_, i) => (
                    <motion.div 
                      key={`petal-${i}`} 
                      animate={{ y: ['-10vh', '110vh'], x: [0, Math.random()*120 - 60], rotate: [0, 180, 360], scale: [0.8, 1, 0.8] }} 
                      transition={{ duration: 6 + Math.random()*6, repeat: Infinity, delay: Math.random()*5, ease: "easeInOut" }} 
                      className="absolute w-5 h-5 bg-gradient-to-br from-rose-400 to-pink-400 rounded-tl-full rounded-br-full shadow-sm opacity-80" 
                      style={{ left: `${Math.random()*100}%`, top: '-10%' }} 
                    />
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
       </div>

       {/* Content Flow */}
       <div className="relative z-20 w-full flex flex-col items-center justify-start pt-32 pb-40 px-4 md:px-0">
          
          {/* TITLE SEQUENCE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2 }}
            className="text-center mb-40 relative"
          >
             <p className="font-elegant tracking-[0.3em] text-stone-500 uppercase text-sm mb-6">Chapter Eleven</p>
             <h1 className="relative font-elegant text-5xl md:text-7xl text-stone-800 drop-shadow-sm mb-8 leading-tight overflow-hidden pb-4">
               {/* Sparkle Sweep */}
               <motion.div animate={{ left: ['-20%', '120%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }} className="absolute top-0 w-12 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 skew-x-12 mix-blend-overlay pointer-events-none z-10" />
               Happy Birthday <br/> 
               <motion.span 
                 animate={{ textShadow: ['0px 0px 5px rgba(244,63,94,0.2)', '0px 0px 20px rgba(244,63,94,0.6)', '0px 0px 5px rgba(244,63,94,0.2)'] }} 
                 transition={{ duration: 3, repeat: Infinity }} 
                 className="text-rose-500 italic relative inline-block"
               >
                 My Baby ❤️
               </motion.span>
             </h1>
             <p className="font-elegant italic text-stone-600 text-xl md:text-2xl max-w-lg mx-auto leading-relaxed mt-12">
               "Today isn't about gifts...<br/><br/>
               Today is about celebrating the most beautiful person who changed my life."
             </p>
          </motion.div>

          {/* SCENE TWO & THREE: CAKE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center mb-48 w-full"
          >
             <CSSLuxuryCake />
             <div className="mt-16 text-center">
                <motion.p 
                  animate={{ filter: ['blur(1px)', 'blur(0px)', 'blur(1px)'], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-elegant italic text-amber-600 text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(217,119,6,0.3)] mb-4"
                >
                  ✨ Happy 21st Birthday ✨
                </motion.p>
                <p className="font-elegant text-stone-800 text-xl tracking-widest uppercase">
                  Baby ❤️
                </p>
             </div>
          </motion.div>

          {/* SCENE FOUR: GIFTS */}
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-48 mb-48">
             
             {/* GIFT ONE */}
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
               <GiftBox title="Birthday Wishes" emoji="❤️" opened={gifts.g1} onOpen={() => setGifts(g => ({ ...g, g1: true }))}>
                  <WishesCycler />
               </GiftBox>
             </motion.div>

             {/* GIFT TWO */}
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
               <GiftBox title="Our Favourite Memory" emoji="📸" opened={gifts.g2} onOpen={() => setGifts(g => ({ ...g, g2: true }))}>
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-3 md:p-4 pb-12 md:pb-16 rounded-sm shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500 relative">
                       {/* Polaroid sparkle */}
                       <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="absolute -top-2 -right-2 text-amber-400 text-xl drop-shadow-md">✨</motion.div>
                       <img loading="lazy" src="/images/memories/001.jpg" alt="Our Memory" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-sm shadow-inner" />
                    </div>
                    <p className="mt-12 font-elegant italic text-stone-700 text-xl md:text-2xl text-center leading-relaxed">
                      My favourite memory...<br/>is every memory with you.
                    </p>
                  </div>
               </GiftBox>
             </motion.div>

             {/* GIFT THREE */}
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
               <GiftBox title="My Biggest Gift" emoji="🎁" opened={gifts.g3} onOpen={() => setGifts(g => ({ ...g, g3: true }))}>
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <p className="font-elegant italic text-rose-900 text-2xl md:text-4xl leading-relaxed">
                      My biggest gift...<br/>is that I get to love you.
                    </p>
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], filter: ['blur(2px)', 'blur(0px)', 'blur(2px)'] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="my-10 text-5xl md:text-6xl text-rose-600 drop-shadow-[0_0_30px_rgba(225,29,72,1)]"
                    >
                      ❤️
                    </motion.div>
                    <p className="font-elegant italic text-stone-600 text-lg md:text-2xl">
                      Nothing could ever be more valuable.
                    </p>
                  </div>
               </GiftBox>
             </motion.div>

             {/* SECRET GIFT FOUR */}
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
               <GiftBox title="Open Only After Smiling 😊" emoji="" opened={gifts.g4} onOpen={() => setGifts(g => ({ ...g, g4: true }))}>
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <p className="font-elegant italic text-stone-700 text-xl md:text-3xl leading-relaxed">
                      "If you're smiling right now...<br/><br/>
                      then this website has already become<br/>
                      the best gift I've ever made for you."
                    </p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-12 px-8 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-elegant tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(244,63,94,0.6)] cursor-pointer border border-rose-300"
                    >
                      Come Hug Me ❤️
                    </motion.div>
                  </div>
               </GiftBox>
             </motion.div>

          </div>

          {/* ENDING SEQUENCE (Only visible after all gifts opened) */}
          <AnimatePresence>
            {allGiftsOpened && (
              <motion.div 
                ref={endingRef}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 50 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 2, delay: 1 }}
                className="w-full flex flex-col items-center text-center mt-32 mb-32 px-4 relative z-30"
              >
                 <h2 className="font-elegant text-5xl md:text-7xl text-rose-900 mb-16 drop-shadow-sm">
                   Happy Birthday,<br/><span className="italic">Baby.</span>
                 </h2>
                 <p className="font-elegant italic text-stone-800 text-2xl md:text-4xl leading-[3rem] md:leading-[4.5rem]">
                   May this year bring you<br/>
                   more happiness,<br/>
                   more peace,<br/>
                   more beautiful memories,<br/>
                   and every dream you've ever wished for.
                 </p>
                 <p className="mt-20 mb-32 font-elegant text-rose-800 text-xl md:text-3xl leading-relaxed">
                   And I hope...<br/>
                   I get to be a part of every single one of them.
                 </p>
                 
                 <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-32 opacity-50" />
                 
                 <p className="font-elegant italic text-stone-600 text-2xl md:text-4xl leading-relaxed mb-32">
                   "I hope...<br/>
                   every birthday of yours...<br/>
                   becomes my favourite day forever."
                 </p>

                 <motion.div 
                   className="w-full flex flex-col items-center justify-center cursor-pointer group"
                 >
                    <motion.div 
                      animate={{ y: [0, 15, 0] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                      className="w-14 h-14 rounded-full bg-rose-100/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(251,113,133,0.4)] border border-rose-300/50 group-hover:bg-rose-200 transition-colors"
                    >
                      <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                 </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endingRef} className="h-[20dvh] w-full" />
       </div>
      </div>
    </SectionWrapper>
  );
};

export default BirthdaySection;
