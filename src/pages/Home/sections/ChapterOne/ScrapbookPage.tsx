import React from 'react';
import { motion } from 'framer-motion';
import { MaskingTape, NotebookMargin, DrawnStar, PressedFlower, HeartSketch } from './ScrapbookDecorations';
import { MemoryText } from './MemoryText';

export const ScrapbookPage: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto px-4 perspective-1000 my-12 z-20">
      <motion.div
        className="w-full relative will-change-transform"
        animate={{ 
          y: [-6, 6, -6],
          rotateZ: [-0.5, 0.5, -0.5]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Soft shadow that doesn't rotate exactly with the paper to give depth */}
        <div className="absolute inset-0 bg-black/5 blur-[20px] rounded-[10px] transform translate-y-6 scale-95 -z-10" />

        {/* The Scrapbook Paper Base */}
        <div className="relative w-full min-h-[500px] bg-[#FDFBF7] rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.08),inset_0_0_60px_rgba(212,175,55,0.03)] overflow-hidden border border-neutral-200/50">
          
          {/* Subtle Paper Texture via CSS gradients / noise */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
               style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E")',
               }}
          />

          {/* Decorations */}
          <NotebookMargin />
          <MaskingTape position="top-left" />
          <MaskingTape position="bottom-right" />
          
          {/* Subtle doodles scattered */}
          <DrawnStar className="absolute top-12 right-12" delay={0} />
          <DrawnStar className="absolute bottom-24 left-16" delay={1.5} />
          <HeartSketch className="absolute top-32 left-12" />
          
          <PressedFlower className="right-8 bottom-12" />

          {/* Main Story Content */}
          <div className="relative w-full h-full pt-16 pb-20 flex flex-col justify-center">
            <MemoryText />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
