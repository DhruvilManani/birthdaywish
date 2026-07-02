import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransitionVariants } from '../../utils/animations';
import IntroSection from './sections/Intro';
import HeroSection from './sections/Hero';
import TimelineSection from './sections/Timeline';
import GallerySection from './sections/Gallery';
import LetterSection from './sections/Letter';
import DreamSection from './sections/Dream';
import FinaleSection from './sections/Finale';
import ChapterOneSection from './sections/ChapterOne';
import ChapterTwoSection from './sections/ChapterTwo';
import ChapterThreeSection from './sections/ChapterThree';
import { StorybookManager } from './StorybookManager';

export const HomePage: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // Map the existing components to the requested Storybook Pages
  const storybookPages = [
    { id: 'hero', component: <HeroSection /> },
    { id: 'chapter1', component: <ChapterOneSection /> },
    { id: 'chapter2', component: <ChapterTwoSection /> },
    { id: 'chapter3', component: <ChapterThreeSection /> },
    { id: 'timeline', component: <TimelineSection title="Our Story Timeline" subtitle="From Then to Now" /> },
    { id: 'gallery', component: <GallerySection /> },
    { id: 'letter', component: <LetterSection /> },
    { id: 'dream', component: <DreamSection /> },
    { id: 'finale', component: <FinaleSection /> },
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-screen bg-black overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-50"
          >
            <IntroSection onBeginJourney={() => setIsIntroComplete(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="storybook"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <StorybookManager pages={storybookPages} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default HomePage;
