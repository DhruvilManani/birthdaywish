import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable hook for scroll-triggered GSAP animations.
 * @param animationCallback Callback defining the timeline animations.
 * @param triggerOptions Custom options to override the default ScrollTrigger configuration.
 */
export const useGsapScrollTrigger = (
  animationCallback: (tl: gsap.core.Timeline, target: HTMLElement) => void,
  triggerOptions: Partial<ScrollTrigger.Vars> = {}
) => {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const target = elementRef.current;
    
    // Set up standard cinematic reveal trigger settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        ...triggerOptions,
      },
    });

    animationCallback(tl, target);

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animationCallback, triggerOptions]);

  return elementRef;
};

/**
 * Reusable hook for smooth GSAP parallax scrolling effects.
 * @param speed Scroll translation multiplier (negative for moving faster/opposite).
 */
export const useGsapParallax = (speed = 0.15) => {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    const target = elementRef.current;

    const tween = gsap.fromTo(
      target,
      { y: 0 },
      {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [speed]);

  return elementRef;
};
