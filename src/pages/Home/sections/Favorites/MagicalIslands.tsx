import React from 'react';
import { motion } from 'framer-motion';

const IslandWrapper: React.FC<{ children: React.ReactNode, text: string, align?: 'left'|'right' }> = ({ children, text, align = 'left' }) => {
  return (
    <div className={`w-full max-w-4xl mx-auto flex flex-col ${align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 my-48 px-6`}>
      <motion.div 
        className="w-full md:w-1/2 flex justify-center relative"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <motion.div 
        className="w-full md:w-1/2 flex justify-center text-center md:text-left"
        initial={{ opacity: 0, x: align === 'left' ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      >
        <h3 className="font-elegant text-3xl md:text-4xl text-rose-950/80 leading-relaxed italic drop-shadow-sm">
          "{text}"
        </h3>
      </motion.div>
    </div>
  );
};

export const PinkRosesIsland: React.FC = () => {
  return (
    <IslandWrapper text="You'll always choose pink." align="left">
      <div className="relative w-64 h-64 bg-pink-100/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,192,203,0.6)] backdrop-blur-sm border border-pink-200">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ff69b4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
            <path d="M12 22c4-4 8-8 8-12a4 4 0 0 0-8-4 4 4 0 0 0-8 4c0 4 4 8 8 12z" fill="#ffb6c1" fillOpacity="0.5"/>
            <path d="M12 22V12" />
            <path d="M12 12a4 4 0 1 0-8-4" />
            <path d="M12 12a4 4 0 1 1 8-4" />
          </svg>
        </motion.div>
        {/* Falling Petals */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-300/60 rounded-full blur-[1px]"
            initial={{ top: '20%', left: `${20 + i * 20}%` }}
            animate={{ top: '120%', left: `${10 + i * 30}%`, rotate: 360, opacity: [0, 1, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
          />
        ))}
      </div>
    </IslandWrapper>
  );
};

export const PandaIsland: React.FC = () => {
  return (
    <IslandWrapper text="You are as adorable as one." align="right">
      <div className="relative w-64 h-64 bg-white/40 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.8)] backdrop-blur-sm border border-white/60">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl drop-shadow-xl"
        >
          🐼
        </motion.div>
      </div>
    </IslandWrapper>
  );
};

export const ChildhoodIsland: React.FC = () => {
  return (
    <IslandWrapper text="Your inner child is my favourite." align="left">
      <div className="relative w-64 h-64 bg-blue-100/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(173,216,230,0.6)] backdrop-blur-sm border border-blue-200">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Doraemon inspired original shape */}
          <div className="relative w-32 h-32 bg-[#42a5f5] rounded-full flex flex-col items-center justify-end overflow-hidden border-2 border-[#1e88e5] shadow-lg">
            <div className="w-28 h-24 bg-white rounded-t-[50px] rounded-b-full flex flex-col items-center pt-2 relative">
              <div className="flex gap-4">
                <div className="w-6 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center"><div className="w-2 h-3 bg-black rounded-full" /></div>
                <div className="w-6 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center"><div className="w-2 h-3 bg-black rounded-full" /></div>
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full mt-1 z-10 border border-black" />
              <div className="w-[2px] h-8 bg-black" />
              <div className="absolute top-12 flex justify-between w-24">
                <div className="flex flex-col gap-1 w-8"><div className="w-full h-[2px] bg-black rotate-12"/><div className="w-full h-[2px] bg-black"/><div className="w-full h-[2px] bg-black -rotate-12"/></div>
                <div className="flex flex-col gap-1 w-8"><div className="w-full h-[2px] bg-black -rotate-12"/><div className="w-full h-[2px] bg-black"/><div className="w-full h-[2px] bg-black rotate-12"/></div>
              </div>
            </div>
            <div className="w-20 h-3 bg-red-600 rounded-full absolute bottom-[-5px] border border-black" />
          </div>
        </motion.div>
      </div>
    </IslandWrapper>
  );
};

export const CoffeeRainIsland: React.FC = () => {
  return (
    <IslandWrapper text="Coffee + Rain always felt like us." align="right">
      <div className="relative w-64 h-64 bg-slate-800/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.1)] backdrop-blur-md border border-slate-400/30 overflow-hidden">
        {/* Rain */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-[1px] h-4 bg-blue-300/40"
            initial={{ top: -20, left: `${Math.random() * 100}%` }}
            animate={{ top: '100%' }}
            transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: Math.random() }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-8xl drop-shadow-lg"
        >
          ☕
          {/* Steam */}
          <motion.div
            className="absolute -top-8 left-4 w-4 h-12 bg-white/40 blur-md rounded-full"
            animate={{ y: [0, -20, -40], x: [0, 5, -5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -top-6 left-12 w-4 h-12 bg-white/30 blur-md rounded-full"
            animate={{ y: [0, -30, -50], x: [0, -5, 5], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </motion.div>
      </div>
    </IslandWrapper>
  );
};

const BlendedIllustrationIsland: React.FC<{ src: string, text: string, align: 'left'|'right' }> = ({ src, text, align }) => {
  return (
    <IslandWrapper text={text} align={align}>
      <img loading="lazy" src={src} 
        alt={text}
        className="w-72 h-72 object-cover mix-blend-multiply"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)'
        }}
      />
    </IslandWrapper>
  );
};

export const BeachIsland: React.FC = () => <BlendedIllustrationIsland src="/images/favorites/beach.png" text="If peace had a place... it would look like this." align="left" />;
export const CastleIsland: React.FC = () => <BlendedIllustrationIsland src="/images/favorites/castle.png" text="You deserve a world made just for you." align="right" />;
export const DinnerIsland: React.FC = () => <BlendedIllustrationIsland src="/images/favorites/dinner.png" text="The quickest way to your smile." align="left" />;
