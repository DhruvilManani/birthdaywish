import React, { useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { HandwrittenNote, MiniStar, SoftButterfly } from '../ChapterTwo/InteractiveDecorations';
import { useNavigation } from '../../../../context/NavigationContext';

// A beautifully blended image that fades into the background seamlessly
const BlendedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={`relative w-full max-w-2xl mx-auto flex justify-center items-center ${className}`}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-auto object-cover max-h-[70vh] mix-blend-multiply"
        style={{
          // This creates a radial gradient mask to perfectly fade the edges into nothing
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
        }}
      />
    </motion.div>
  );
};

// Integrated Instagram-style memory conversation (faded, no hard borders)
const InstaMemoryChat: React.FC = () => {
  return (
    <motion.div 
      className="w-full max-w-md mx-auto my-32 flex flex-col gap-6 px-8 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Date Divider */}
      <div className="text-center font-cute text-neutral-400 text-xs tracking-widest uppercase mb-4 opacity-70">
        December 14, 2019
      </div>

      {/* Chat bubbles integrated into the page with no hard borders, soft gradients */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="self-end max-w-[80%] font-body text-neutral-600 bg-rose-100/30 px-6 py-4 rounded-[2rem] rounded-tr-sm backdrop-blur-sm"
      >
        <p>I had the best time today 😊</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="self-start max-w-[80%] font-body text-neutral-700 bg-white/40 px-6 py-4 rounded-[2rem] rounded-tl-sm backdrop-blur-sm"
      >
        <p>Me too! Let's talk tomorrow night.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.5, duration: 1 }}
        className="self-end max-w-[80%] font-body text-neutral-600 bg-rose-100/30 px-6 py-4 rounded-[2rem] rounded-tr-sm backdrop-blur-sm"
      >
        <p>Can't wait! Goodnight ✨</p>
      </motion.div>
    </motion.div>
  );
};

// Floating Text sentences
const FloatingSentence: React.FC<{ text: string; delay?: number; align?: 'left'|'center'|'right' }> = ({ text, delay = 0, align = 'center' }) => {
  const alignmentClass = align === 'left' ? 'text-left md:mr-auto' : align === 'right' ? 'text-right md:ml-auto' : 'text-center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={`w-full px-6 py-8 ${alignmentClass}`}
    >
      <h3 className="font-elegant text-3xl md:text-5xl text-rose-dark/90 leading-relaxed drop-shadow-sm italic">
        {text}
      </h3>
    </motion.div>
  );
};

export const VisualMoments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setChapterComplete } = useNavigation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.98) {
        setChapterComplete(true);
      }
    });
  }, [scrollYProgress, setChapterComplete]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto flex flex-col items-center pb-32 relative z-10">
      
      {/* 2. Animated paragraph fades in */}
      <motion.p
        className="font-elegant text-2xl md:text-4xl text-neutral-700 leading-relaxed text-center mt-8 mb-32 max-w-xl px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        I don't know when it happened...
      </motion.p>

      {/* 3. Instagram-style conversation */}
      <InstaMemoryChat />

      {/* 4. Blend AI illustration: School friends walking */}
      <div className="relative w-full my-32">
        <BlendedImage src="/images/chapter3/students_walking.png" alt="School friends walking" />
        <HandwrittenNote text="always together" className="absolute top-12 right-[10%] rotate-12 opacity-80 z-20" />
      </div>

      {/* 5. Sunset transition happens in the background via ChapterThree index.tsx scroll values */}

      {/* 6. AI illustration: Talking every evening (stars) */}
      <div className="relative w-full my-32 mt-64">
        <BlendedImage src="/images/chapter3/sitting_stars.png" alt="Talking under stars" />
        <SoftButterfly className="absolute top-1/4 left-[10%] z-20" />
        <MiniStar className="absolute top-1/2 right-[15%] z-20" delay={0.5} />
      </div>

      {/* 7. Floating handwritten sentences staggered */}
      <div className="w-full flex flex-col gap-32 my-48 max-w-2xl mx-auto relative px-4">
        <FloatingSentence text="Thousands of conversations..." align="left" />
        <FloatingSentence text="Every evening call..." align="right" delay={0.2} />
        <FloatingSentence text="Every little moment..." align="left" delay={0.2} />
        <FloatingSentence text="Without realising..." align="right" delay={0.2} />
        <FloatingSentence text="I had already fallen in love." align="center" delay={0.4} />
      </div>

      {/* 8. Bottom transition text */}
      <motion.div 
        className="mt-32 mb-16 flex flex-col items-center justify-center cursor-pointer group relative text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        onClick={() => setChapterComplete(true)}
      >
        <h3 className="font-elegant text-4xl md:text-6xl text-rose-900 leading-relaxed drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
          And then... <br />
          <span className="italic opacity-80 text-3xl md:text-5xl my-4 inline-block">one beautiful night...</span> <br />
          <span className="text-5xl md:text-7xl text-rose-600 mt-6 inline-block font-light">everything changed.</span>
        </h3>
        
        <p className="font-body text-xs tracking-[0.4em] text-neutral-400 mt-24 uppercase group-hover:text-rose-light transition-colors duration-500">
          Continue
        </p>
      </motion.div>

    </div>
  );
};
