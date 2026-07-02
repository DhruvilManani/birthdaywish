import type { Variants } from 'framer-motion';

// Fade In variant generator
export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
  delay = 0,
  duration = 0.8
): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

// Scale In variant generator
export const scaleIn = (delay = 0, duration = 0.8): Variants => {
  return {
    hidden: {
      scale: 0.85,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

// Blur Reveal variant generator
export const blurReveal = (delay = 0, duration = 1.0): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

// Page transitions
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
