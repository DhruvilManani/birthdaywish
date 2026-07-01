import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplane } from './InteractiveDecorations';

export const SixYearsIllustration: React.FC = () => {
  const [showChats, setShowChats] = useState(false);

  const handlePhoneTap = () => {
    setShowChats(true);
    setTimeout(() => setShowChats(false), 2000);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center my-12 pointer-events-none">
      
      {/* Central Phone */}
      <motion.div 
        className="relative w-36 h-56 bg-white rounded-3xl border-[4px] border-neutral-800 shadow-[0_0_20px_rgba(255,255,255,0.6)] overflow-hidden z-20 pointer-events-auto cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] transition-shadow duration-300"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        whileTap={{ scale: 0.98 }}
        onTap={handlePhoneTap}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-neutral-800 rounded-b-xl z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4F4FF] to-rose-50 opacity-60" />
        
        {/* Chat bubbles triggered on tap */}
        <AnimatePresence>
          {showChats && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pt-8 px-3 flex flex-col gap-3 z-20 pointer-events-none"
            >
              {['😊', '😂', '✨', '❤️'].map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, x: idx % 2 === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, type: 'spring' }}
                  className={`px-3 py-1.5 rounded-2xl text-sm shadow-sm max-w-[80%] flex items-center justify-center ${
                    idx % 2 === 0 ? 'self-start bg-white text-neutral-600 rounded-bl-none' : 'self-end bg-rose-light text-white rounded-br-none'
                  }`}
                >
                  {msg}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Clock */}
      <motion.div 
        className="absolute top-4 left-8 z-10 text-golden/60"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Flying Calendar Pages */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute right-8 top-12 w-12 h-14 bg-white border border-neutral-200 rounded-sm shadow-md flex flex-col z-10"
          initial={{ opacity: 0, x: 20, y: 20, rotate: i * 15 }}
          whileInView={{ opacity: [0, 1, 0], x: [20, -40 - (i*10)], y: [20, -60 - (i*20)], rotate: [i*15, -20 + (i*5)] }}
          viewport={{ once: false }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
        >
          <div className="w-full h-3 bg-rose-light rounded-t-sm" />
          <div className="flex-1 flex items-center justify-center">
            <span className="text-neutral-400 text-xs font-bold">{2015 + i*2}</span>
          </div>
        </motion.div>
      ))}

      {/* Paper Airplane looping around */}
      <motion.div
        className="absolute w-full h-full inset-0 flex items-center justify-center pointer-events-none z-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <PaperAirplane className="-translate-y-32 rotate-90 scale-125" />
      </motion.div>

    </div>
  );
};
