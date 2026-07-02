import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransitionVariants } from '../../utils/animations';
import IntroSection from './sections/Intro';
import HeroSection from './sections/Hero';
import TimelineSection from './sections/Timeline';
import ChapterOneSection from './sections/ChapterOne';
import ChapterThreeSection from './sections/ChapterThree';
import ChapterTwoSection from './sections/ChapterTwo';
import GallerySection from './sections/Gallery';
import RelationshipSection from './sections/Relationship';
import ProposalSection from './sections/Proposal';
import FavoritesSection from './sections/Favorites';
import LetterSection from './sections/Letter';
import FutureDreamsSection from './sections/FutureDreams';
import BirthdaySection from './sections/Birthday';
import GrandFinaleSection from './sections/GrandFinale';
import { StorybookManager } from './StorybookManager';

export const HomePage: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // LAZY COMPONENT REFERENCES ONLY: DO NOT INSTANTIATE <Component /> HERE.
  // This prevents React from building all 13 heavy pages simultaneously on mount.
  const storybookPages = [
    { id: 'hero', component: HeroSection },
    { id: 'timeline', component: TimelineSection },
    { id: 'chapter1', component: ChapterOneSection },
    { id: 'chapter2', component: ChapterTwoSection },
    { id: 'chapter3', component: ChapterThreeSection },
    { id: 'gallery', component: GallerySection },
    { id: 'relationship', component: RelationshipSection },
    { id: 'proposal', component: ProposalSection },
    { id: 'favorites', component: FavoritesSection },
    { id: 'letter', component: LetterSection },
    { id: 'future', component: FutureDreamsSection },
    { id: 'birthday', component: BirthdaySection },
    { id: 'finale', component: GrandFinaleSection }
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col flex-1 w-full h-full bg-[#1a1a1a]"
    >
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-50"
          >
            <IntroSection onBeginJourney={() => setIsIntroComplete(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="storybook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <StorybookManager pages={storybookPages} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default HomePage;
