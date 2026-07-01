import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { LuxuryButton } from '../../../../components/ui/LuxuryButton';
import { scaleIn } from '../../../../utils/animations';

interface MusicPromptProps {
  onChoose: (playMusic: boolean) => void;
}

export const MusicPrompt: React.FC<MusicPromptProps> = ({ onChoose }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm"
    >
      <motion.div variants={scaleIn(0.1, 0.8)} className="w-full max-w-sm">
        <GlassCard className="text-center py-8 px-6 border-white/20" glowColor="pink">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-soft-pink to-light-purple flex items-center justify-center mx-auto mb-6 shadow-soft"
          >
            <Music className="w-7 h-7 text-white" />
          </motion.div>

          <h2 className="text-xl md:text-2xl font-elegant font-semibold text-neutral-800 mb-2 leading-snug">
            Sound On?
          </h2>

          <p className="font-cute text-sm text-neutral-500 mb-8 max-w-xs mx-auto leading-relaxed">
            Would you like to experience this fairytale journey with background music?
          </p>

          <div className="flex flex-col gap-3">
            <LuxuryButton
              variant="primary"
              size="md"
              onClick={() => onChoose(true)}
              className="w-full text-sm font-cute tracking-widest uppercase py-3"
            >
              Yes, play music
            </LuxuryButton>
            
            <LuxuryButton
              variant="secondary"
              size="md"
              onClick={() => onChoose(false)}
              className="w-full text-sm font-cute tracking-widest uppercase py-3 border-transparent"
            >
              Not Now
            </LuxuryButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
export default MusicPrompt;
