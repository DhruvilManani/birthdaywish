import React, { useState, useEffect } from 'react';
import { AnimatePresence, animate } from 'framer-motion';
import { useScroll } from '../../../../context/ScrollContext';
import { useAudio } from '../../../../context/AudioContext';
import { BACKGROUND_MUSIC_URL, INTRO_SENTENCES } from '../../../../constants/config';
import DreamyBackground from '../../../../components/ui/DreamyBackground';
import MusicPrompt from './MusicPrompt';
import HeartBeat from './HeartBeat';
import TypewriterSequence from './TypewriterSequence';
import WelcomeScreen from './WelcomeScreen';

type IntroStep = 'music-prompt' | 'heart-beat' | 'typewriter' | 'welcome';

interface IntroSectionProps {
  onBeginJourney?: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onBeginJourney }) => {
  const [step, setStep] = useState<IntroStep>('music-prompt');
  const [bgBrightness, setBgBrightness] = useState(0);
  const { lenis, scrollTo } = useScroll();
  const { play, setTrack } = useAudio();

  // Scroll lock system depending on the current cinematic state
  useEffect(() => {
    if (!lenis) return;
    if (step !== 'welcome') {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [lenis, step]);

  const handleMusicChoice = (playMusic: boolean) => {
    if (playMusic) {
      setTrack(BACKGROUND_MUSIC_URL);
      play();
    }
    setStep('heart-beat');
  };

  const handleHeartBeatComplete = () => {
    setStep('typewriter');
  };

  const handleTypewriterComplete = () => {
    setStep('welcome');
    // Smoothly transition background gradient from dark to fairytale bright
    animate(0, 1, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // Apple easeOutExpo
      onUpdate: (latest) => setBgBrightness(latest),
    });
  };

  const handleBeginJourney = () => {
    if (onBeginJourney) {
      onBeginJourney();
    } else {
      scrollTo('#hero');
    }
  };

  return (
    <section
      id="intro"
      className="relative w-full min-h-[100svh] bg-black text-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* 1. Animated Dreamy Canvas Background */}
      <DreamyBackground brightness={bgBrightness} />

      {/* 2. State-driven cinematic wizard */}
      <AnimatePresence mode="wait">
        {step === 'music-prompt' && (
          <MusicPrompt key="music-prompt" onChoose={handleMusicChoice} />
        )}

        {step === 'heart-beat' && (
          <HeartBeat key="heart-beat" onComplete={handleHeartBeatComplete} />
        )}

        {step === 'typewriter' && (
          <TypewriterSequence
            key="typewriter"
            sentences={INTRO_SENTENCES}
            onComplete={handleTypewriterComplete}
          />
        )}

        {step === 'welcome' && (
          <WelcomeScreen key="welcome" onBegin={handleBeginJourney} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default IntroSection;
