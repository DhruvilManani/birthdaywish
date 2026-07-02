import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

import { useAudio } from '../../../../context/AudioContext';
import { BACKGROUND_MUSIC_URL } from '../../../../constants/config';
import DreamyBackground from '../../../../components/ui/DreamyBackground';
import MusicPrompt from './MusicPrompt';

type IntroStep = 'loading' | 'music-prompt' | 'done';

interface IntroSectionProps {
  onBeginJourney?: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onBeginJourney }) => {
  const [step, setStep] = useState<IntroStep>('loading');
  const [bgBrightness, setBgBrightness] = useState(0);
  const { play, setTrack } = useAudio();

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        setStep('music-prompt');
      }, 3000); // 1s fade in + 2s display
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleMusicChoice = (playMusic: boolean) => {
    if (playMusic) {
      setTrack(BACKGROUND_MUSIC_URL);
      play();
    }
    setStep('done');
    animate(0, 1, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setBgBrightness(latest),
    });
    if (onBeginJourney) onBeginJourney();
  };

  return (
    <section id="intro" className="relative flex flex-col flex-1 w-full h-full bg-black text-white justify-center items-center overflow-hidden z-50">
      <DreamyBackground brightness={bgBrightness} />
      
      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center z-10 px-4"
          >
             <p className="font-elegant italic text-stone-200 text-2xl md:text-4xl drop-shadow-md leading-[3rem]">
               "Made with love...<br/>
               Just for Baby ❤️"
             </p>
          </motion.div>
        )}

        {step === 'music-prompt' && (
          <MusicPrompt key="music-prompt" onChoose={handleMusicChoice} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default IntroSection;
