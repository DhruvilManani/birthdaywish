import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { LuxuryButton } from '../../../../components/ui/LuxuryButton';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { FloatingContainer } from '../../../../components/ui/FloatingContainer';
import { fadeIn, scaleIn, blurReveal } from '../../../../utils/animations';

interface WelcomeScreenProps {
  onBegin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBegin }) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[100svh] relative z-10 px-6 select-none">
      {/* Floating Disney-inspired Magic Sparkle elements */}
      <div className="absolute top-12 left-6">
        <FloatingContainer duration={5} yRange={10} delay={0.2}>
          <Sparkles className="w-6 h-6 text-soft-pink opacity-60" />
        </FloatingContainer>
      </div>
      <div className="absolute bottom-20 right-6">
        <FloatingContainer duration={7} yRange={15} delay={0.5}>
          <Sparkles className="w-8 h-8 text-golden opacity-50" />
        </FloatingContainer>
      </div>

      {/* Main Glass Panel */}
      <GlassCard 
        className="w-full text-center py-10 px-6 border-white/40 shadow-soft" 
        glowColor="pink" 
        hoverEffect={false}
      >
        {/* Glowing floating flower/fairy ornament */}
        <FloatingContainer duration={4} yRange={6} rotateRange={2}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-soft-pink-dark to-peach flex items-center justify-center mx-auto mb-6 shadow-soft border border-white/30">
            <span className="text-2xl">✨</span>
          </div>
        </FloatingContainer>

        {/* Title Stagger */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col items-center"
        >
          {/* "Happy Birthday" */}
          <motion.h1
            variants={blurReveal(0, 0.8)}
            className="text-4xl md:text-5xl font-elegant font-semibold text-neutral-800 tracking-wide mb-1"
          >
            Happy Birthday
          </motion.h1>

          {/* "Betuu" with high premium gradient */}
          <motion.h2
            variants={blurReveal(0, 0.8)}
            className="text-5xl md:text-6xl font-elegant font-bold tracking-widest bg-gradient-to-r from-rose via-peach-dark to-golden bg-clip-text text-transparent mb-6 drop-shadow-[0_2px_10px_rgba(255,107,139,0.15)]"
          >
            Betuu
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={fadeIn('up', 0, 0.8)}
            className="font-cute text-sm md:text-base text-neutral-500 mb-10 max-w-xs leading-relaxed"
          >
            Welcome to your little universe.
          </motion.p>

          {/* Luxury Button */}
          <motion.div variants={scaleIn(0.2, 0.8)}>
            <LuxuryButton
              variant="primary"
              size="lg"
              onClick={onBegin}
              className="px-10 py-4 shadow-luxury text-sm md:text-base font-cute tracking-widest uppercase border border-white/20"
            >
              Begin The Journey
            </LuxuryButton>
          </motion.div>
        </motion.div>
      </GlassCard>
    </div>
  );
};
export default WelcomeScreen;
