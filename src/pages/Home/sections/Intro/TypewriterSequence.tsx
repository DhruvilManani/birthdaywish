import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterSequenceProps {
  sentences: string[];
  onComplete: () => void;
  typeSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterSequence: React.FC<TypewriterSequenceProps> = ({
  sentences,
  onComplete,
  typeSpeed = 60, // ms per char
  pauseDuration = 2000, // ms between sentences
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    let charIndex = 0;
    let typeInterval: number;
    let pauseTimeout: number;

    const currentSentence = sentences[sentenceIndex];
    setDisplayedText('');
    setFadeState('in');

    const type = () => {
      if (charIndex < currentSentence.length) {
        // Handle HTML tags or special chars if any, otherwise just append
        // Adding characters letter by letter
        setDisplayedText((prev) => prev + currentSentence.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Wait before starting to fade out
        pauseTimeout = setTimeout(() => {
          setFadeState('out');
          
          // Wait for fade out animation to finish before moving to next sentence
          setTimeout(() => {
            if (sentenceIndex < sentences.length - 1) {
              setSentenceIndex((prev) => prev + 1);
            } else {
              onComplete();
            }
          }, 800); // match exit transition duration
        }, pauseDuration);
      }
    };

    // Begin typing
    typeInterval = setInterval(type, typeSpeed);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(pauseTimeout);
    };
  }, [sentenceIndex, sentences, onComplete, typeSpeed, pauseDuration]);

  return (
    <div className="absolute inset-0 z-40 bg-black flex items-center justify-center px-8 select-none">
      <AnimatePresence mode="wait">
        {fadeState === 'in' && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-lg"
          >
            <p className="font-elegant text-xl md:text-3xl text-neutral-100 font-medium leading-relaxed tracking-wide whitespace-pre-wrap">
              <span>{sentences[sentenceIndex]?.substring(0, displayedText.length)}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-[3px] h-[1.3em] bg-rose ml-1 translate-y-[2px] -mr-[7px]"
              />
              <span className="invisible">{sentences[sentenceIndex]?.substring(displayedText.length)}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TypewriterSequence;
