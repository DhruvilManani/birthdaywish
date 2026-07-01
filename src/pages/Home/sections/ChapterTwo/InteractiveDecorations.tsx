import React from 'react';
import { motion } from 'framer-motion';

export const PinkWashiTape: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    whileTap={{ scale: 1.05, rotate: 2 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    className={`absolute w-12 h-5 bg-rose-light/50 backdrop-blur-sm z-30 shadow-sm mix-blend-multiply cursor-pointer ${className}`}
    style={{ clipPath: 'polygon(4% 0, 98% 3%, 96% 100%, 2% 96%)', border: '1px solid rgba(255,255,255,0.1)' }}
  />
);

export const PaperClip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    whileTap={{ scale: 1.15, rotate: -15, y: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 8 }}
    className={`absolute z-40 cursor-pointer group ${className}`}
  >
    <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md group-hover:drop-shadow-lg transition-all">
      {/* Shine effect on the clip */}
      <path d="M10 5 v25 a5 5 0 0 0 10 0 V10 a7 7 0 0 0 -14 0 v20 a3 3 0 0 0 6 0 V15" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 10 v15" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
    </svg>
  </motion.div>
);

export const InteractiveSticker: React.FC<{ emoji: string; className?: string }> = ({ emoji, className = '' }) => (
  <motion.div 
    whileTap={{ scale: 1.3, rotate: 15, y: -10 }}
    transition={{ type: "spring", stiffness: 500, damping: 15 }}
    className={`absolute bg-white rounded-full p-2 shadow-sm border border-neutral-100 z-30 cursor-pointer text-xl flex items-center justify-center hover:shadow-md ${className}`}
  >
    {emoji}
  </motion.div>
);

export const MiniStar: React.FC<{ className?: string, delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.div
    whileTap={{ scale: 1.8, rotate: 180, transition: { type: "spring", stiffness: 300, damping: 10 } }}
    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute cursor-pointer z-20 ${className}`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFDF73" stroke="#B59023" strokeWidth="1">
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
    </svg>
  </motion.div>
);

export const HandwrittenNote: React.FC<{ text: string, className?: string }> = ({ text, className = '' }) => (
  <motion.div 
    whileTap={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 12 }}
    className={`absolute bg-[#FFFDF6] shadow-sm rounded-sm p-2 z-20 cursor-pointer border border-neutral-200/50 hover:shadow-md ${className}`}
    style={{ transform: 'rotate(-3deg)' }}
  >
    <p className="font-cute text-rose-dark/80 text-xs md:text-sm">{text}</p>
  </motion.div>
);

export const PaperAirplane: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    animate={{ 
      x: [0, 40, -10, 0], 
      y: [0, -20, 10, 0],
      rotate: [0, -10, 5, 0]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute z-30 opacity-80 ${className}`}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </motion.div>
);

export const SoftButterfly: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    whileTap={{ scale: 1.5, y: -20, opacity: 0 }}
    className={`absolute z-30 opacity-70 cursor-pointer ${className}`}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCA29F" strokeWidth="1.5">
      <path d="M12 12C12 12 14 7 19 7C22 7 22 10 19 14C17 16 12 12 12 12ZM12 12C12 12 10 7 5 7C2 7 2 10 5 14C7 16 12 12 12 12Z" fill="#FCECEB" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 4V12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </motion.div>
);

export const SchoolBell: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    whileTap={{ rotate: [-20, 20, -20, 20, 0] }}
    transition={{ duration: 0.5 }}
    className={`absolute z-30 cursor-pointer opacity-80 ${className}`}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B59023" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </motion.div>
);
