import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';

const FadeInParagraph: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <motion.p 
    initial={{ opacity: 0, filter: 'blur(3px)', y: 20 }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 1.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.p>
);

export const LetterSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // Dynamic Background: Brightens in the middle, darkens slightly at the end
  const bgBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95]);
  
  // Ambient Particles fade out towards the end to focus on the message
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.8, 0.8, 0]);

  const handleNext = () => {
    window.dispatchEvent(new Event('storybook-next-page'));
  };

  return (
    <SectionWrapper id="letter" background="none" fullHeight={false} className="p-0 bg-[#FDFBF7] overflow-x-hidden">
      
      {/* Interactive Envelope Overlay (Blocks scrolling until opened) */}
      <AnimatePresence>
        {!isOpened && (
          <EnvelopeOpening onOpenComplete={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      <motion.div ref={containerRef} style={{ filter: `brightness(${bgBrightness})` }} className={`relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth transition-opacity duration-1000 ${isOpened ? 'opacity-100 allow-scroll' : 'opacity-0 overflow-hidden h-screen'}`}>
        
        {/* Dynamic Background Environment */}
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
           {/* Warm Cream Gradient */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,253,245,1)_0%,rgba(240,235,225,1)_100%)]" />
           
           {/* Subtle Paper Texture */}
           <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
           
           {/* Fold Lines (Subtle vertical and horizontal shadows) */}
           <div className="absolute inset-0 flex flex-col justify-evenly opacity-20">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-900/10 to-transparent" />
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-900/10 to-transparent" />
           </div>

           {/* Micro Animations (Fade out on scroll) */}
           <motion.div style={{ opacity: particlesOpacity }} className="absolute inset-0">
             {/* Golden Dust */}
             {[...Array(8)].map((_, i) => (
                <motion.div key={`dust-${i}`} animate={{ y: [-10, -30], opacity: [0, 0.3, 0], x: Math.sin(i)*10 }} transition={{ duration: 6 + Math.random()*5, repeat: Infinity, delay: Math.random()*5 }} className="absolute w-[2px] h-[2px] bg-amber-400 rounded-full blur-[1px]" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} />
             ))}
             {/* Fairy Lights */}
             {[...Array(4)].map((_, i) => (
                <motion.div key={`light-${i}`} animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: 4 + Math.random()*4, repeat: Infinity, delay: Math.random()*2 }} className="absolute w-3 h-3 bg-amber-200 rounded-full blur-[4px]" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} />
             ))}
           </motion.div>
        </div>

        {/* The Letter Content */}
        <div className="relative w-full z-20 pb-40 px-5 sm:px-6 md:px-20 min-h-screen pt-32">
          {/* Paper container restricting width to 90% on mobile for comfortable margins */}
          <div className="w-[92%] max-w-2xl mx-auto font-cute text-stone-800 text-[19px] md:text-[23px] leading-[3rem] md:leading-[3.5rem] tracking-wide" style={{ textShadow: '0.2px 0.2px 0.5px rgba(0,0,0,0.05)' }}>
            
            <FadeInParagraph className="mb-10">Dear Baby,</FadeInParagraph>
            <FadeInParagraph className="mb-10">I don't even know where to begin.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Maybe I should start from the day we first met.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Back then, we were just two school students who had absolutely no idea that life was quietly writing one of the most beautiful stories for us.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I still remember the day you asked me for a writing pad in school.</FadeInParagraph>
            <FadeInParagraph className="mb-10">At that moment it felt like one of the most ordinary moments of my life.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Today, when I look back...</FadeInParagraph>
            <FadeInParagraph className="mb-10">it feels like destiny quietly introduced me to the girl who would later become my whole world.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We spent years together as friends.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We laughed.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We argued.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We studied.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We shared random conversations.</FadeInParagraph>
            <FadeInParagraph className="mb-10">At that time I never imagined that one day those ordinary conversations would become my favourite memories.</FadeInParagraph>
            <FadeInParagraph className="mb-10">As the years passed...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I slowly started noticing little things about you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">The way you behaved.</FadeInParagraph>
            <FadeInParagraph className="mb-10">The way you smiled.</FadeInParagraph>
            <FadeInParagraph className="mb-10">The way your childish side suddenly appeared for absolutely no reason.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And honestly...</FadeInParagraph>
            <FadeInParagraph className="mb-10">that childish version of you still melts my heart every single time.</FadeInParagraph>
            <FadeInParagraph className="mb-10">In today's world...</FadeInParagraph>
            <FadeInParagraph className="mb-10">it's difficult to find someone who is kind, innocent and family oriented.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But you are exactly that.</FadeInParagraph>
            <FadeInParagraph className="mb-10">That's probably the first time I silently thought...</FadeInParagraph>
            <FadeInParagraph className="mb-10">"If I ever marry someone...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I want my wife to be exactly like her."</FadeInParagraph>
            <FadeInParagraph className="mb-10">I never told you that.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Maybe because I was too shy.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Maybe because I wasn't even sure what these feelings were.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But somewhere inside my heart...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I already knew.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Time passed.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Our friendship became stronger.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We started sharing things that we never told anyone else.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Slowly...</FadeInParagraph>
            <FadeInParagraph className="mb-10">without even realizing...</FadeInParagraph>
            <FadeInParagraph className="mb-10">you became the first person I wanted to tell everything.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every happy news.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every bad day.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every random thought.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every dream.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And that's when I realised...</FadeInParagraph>
            <FadeInParagraph className="mb-10">you were no longer just my best friend.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You had quietly become my safe place.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You never asked me to change.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You accepted my quiet nature.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You accepted my introvert personality.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You accepted every version of me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for loving someone who doesn't always know how to express everything.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for always understanding the things I couldn't even explain.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Sometimes I wonder...</FadeInParagraph>
            <FadeInParagraph className="mb-10">what I did to deserve someone like you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who cares for me more than anyone else.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who stands beside me no matter what happens.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who loves me even when I'm difficult to understand.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Baby...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I don't say it enough...</FadeInParagraph>
            <FadeInParagraph className="mb-10">but you are truly...</FadeInParagraph>
            <FadeInParagraph className="mb-10">my everything.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Then came the night that changed everything.</FadeInParagraph>
            <FadeInParagraph className="mb-10">1st May 2025.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Around 1 o'clock in the morning.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You were emotional.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Life wasn't being kind to you that night.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And honestly...</FadeInParagraph>
            <FadeInParagraph className="mb-10">all I wanted at that moment was to make you smile again.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We were on an Instagram video call.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You probably thought it was just another late-night conversation.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But my heart had already made a decision.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I don't know how I gathered the courage.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Because you know me...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I'm not the kind of person who speaks big words easily.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My hands were shaking.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My heart was racing.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Yet somehow...</FadeInParagraph>
            <FadeInParagraph className="mb-10">those four words finally escaped my heart.</FadeInParagraph>
            <FadeInParagraph className="mb-10">"Will you marry me?"</FadeInParagraph>
            <FadeInParagraph className="mb-10">That single moment changed my entire life.</FadeInParagraph>
            <FadeInParagraph className="mb-10">From that night...</FadeInParagraph>
            <FadeInParagraph className="mb-10">you were no longer just the girl I loved.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You became the person I wanted to spend my entire life with.</FadeInParagraph>
            <FadeInParagraph className="mb-10">One of the happiest moments for me wasn't just our relationship.</FadeInParagraph>
            <FadeInParagraph className="mb-10">It was when my family accepted you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Watching them treat you like their own daughter...</FadeInParagraph>
            <FadeInParagraph className="mb-10">made me realise that maybe God was quietly answering every prayer I never spoke out loud.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for respecting my family.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for loving them the way you love me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for making me believe that love can actually feel peaceful.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Some of my favourite memories were never expensive trips.</FadeInParagraph>
            <FadeInParagraph className="mb-10">They were the evenings we spent together.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Sitting quietly.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Talking about absolutely anything.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Especially those peaceful moments at Riverfront.</FadeInParagraph>
            <FadeInParagraph className="mb-10">No fancy plans.</FadeInParagraph>
            <FadeInParagraph className="mb-10">No luxury restaurants.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Just you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">The river.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And conversations that somehow made every problem feel smaller.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Baby...</FadeInParagraph>
            <FadeInParagraph className="mb-10">do you know what my favourite place actually is?</FadeInParagraph>
            <FadeInParagraph className="mb-10">It isn't Riverfront.</FadeInParagraph>
            <FadeInParagraph className="mb-10">It isn't Switzerland.</FadeInParagraph>
            <FadeInParagraph className="mb-10">It isn't Somnath.</FadeInParagraph>
            <FadeInParagraph className="mb-10">It is wherever you are.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Because every place becomes beautiful when you're beside me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I know I'm not perfect.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I'm quiet.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Sometimes too quiet.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Sometimes I don't express things the way you deserve.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Sometimes I struggle to explain what I'm feeling.</FadeInParagraph>
            <FadeInParagraph className="mb-10">For all those moments...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I'm truly sorry.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But please never mistake my silence for a lack of love.</FadeInParagraph>
            <FadeInParagraph className="mb-10">The truth is...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I have loved you in thousands of ways that I never knew how to put into words.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You are the first person I think about when something good happens.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And somehow...</FadeInParagraph>
            <FadeInParagraph className="mb-10">you're also the first person I need when life becomes difficult.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You've become my biggest strength.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And somehow...</FadeInParagraph>
            <FadeInParagraph className="mb-10">your biggest strength became me too.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I don't know if I'll ever become the perfect boyfriend.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But every single day...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I'll keep trying to become a better man for you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">When I think about our future...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I don't dream about perfect days.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about ordinary ones.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about making coffee for you on lazy mornings.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about watching the rain together without saying a single word.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about travelling the world with you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Especially Switzerland...</FadeInParagraph>
            <FadeInParagraph className="mb-10">because I know how much we both want to see those beautiful mountains together.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about visiting Somnath with you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Not because it's just a place...</FadeInParagraph>
            <FadeInParagraph className="mb-10">but because I want every important chapter of my life to have you standing beside me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I dream about the little home we'll build one day.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Not the biggest house.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Not the most expensive one.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Just a warm home.</FadeInParagraph>
            <FadeInParagraph className="mb-10">A place filled with laughter.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Fairy lights.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Plants.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Your favourite pink decorations.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Your childish smile running around every room.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And maybe one day...</FadeInParagraph>
            <FadeInParagraph className="mb-10">a little boy...</FadeInParagraph>
            <FadeInParagraph className="mb-10">and a little girl...</FadeInParagraph>
            <FadeInParagraph className="mb-10">who remind us of the love that started all those years ago.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Maybe one day...</FadeInParagraph>
            <FadeInParagraph className="mb-10">we'll even buy our dream BMW.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Maybe we'll laugh remembering how impossible it once felt.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But honestly...</FadeInParagraph>
            <FadeInParagraph className="mb-10">none of those dreams matter if you're not there beside me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Because I've realised something very important.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My biggest dream has never been Switzerland.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Or a BMW.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Or a beautiful house.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My biggest dream...</FadeInParagraph>
            <FadeInParagraph className="mb-10">has always been you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for staying.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for believing in me.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for accepting someone who sometimes struggles to express himself.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for loving my silence.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Thank you...</FadeInParagraph>
            <FadeInParagraph className="mb-10">for becoming my peace.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I know life won't always be easy.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We'll have misunderstandings.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We'll have difficult days.</FadeInParagraph>
            <FadeInParagraph className="mb-10">We'll have moments where everything feels heavy.</FadeInParagraph>
            <FadeInParagraph className="mb-10">But if there's one promise I want you to remember forever...</FadeInParagraph>
            <FadeInParagraph className="mb-10">it's this.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I will never stop choosing you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Again.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And again.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And again.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every single day.</FadeInParagraph>
            <FadeInParagraph className="mb-10">No matter how busy life becomes.</FadeInParagraph>
            <FadeInParagraph className="mb-10">No matter how old we become.</FadeInParagraph>
            <FadeInParagraph className="mb-10">No matter how many years pass.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I will always come back to the same decision.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You.</FadeInParagraph>
            <FadeInParagraph className="mb-10">If one day you ever doubt yourself...</FadeInParagraph>
            <FadeInParagraph className="mb-10">look back at this letter.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And remember...</FadeInParagraph>
            <FadeInParagraph className="mb-10">there is someone in this world who still looks at you and feels unbelievably lucky.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who still smiles after seeing your name on the screen.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who still gets excited before every call.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who still melts because of your childish behaviour.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Someone who still believes that asking you,</FadeInParagraph>
            <FadeInParagraph className="mb-10">"Will you marry me?"</FadeInParagraph>
            <FadeInParagraph className="mb-10">was the best decision he ever made.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Baby...</FadeInParagraph>
            <FadeInParagraph className="mb-10">Happy Birthday.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I hope this birthday gives you every happiness you deserve.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I hope every dream in your heart slowly becomes reality.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I hope your smile never fades.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And I secretly hope...</FadeInParagraph>
            <FadeInParagraph className="mb-10">that every birthday for the rest of my life...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I get to celebrate it with you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I love you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">More than my words will ever be able to explain.</FadeInParagraph>
            <FadeInParagraph className="mb-10">More than any website could ever show.</FadeInParagraph>
            <FadeInParagraph className="mb-10">More than any gift could ever prove.</FadeInParagraph>
            <FadeInParagraph className="mb-10">You are...</FadeInParagraph>
            <FadeInParagraph className="mb-10">my safest place.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My biggest blessing.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My favourite person.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My home.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My peace.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My today.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My tomorrow.</FadeInParagraph>
            <FadeInParagraph className="mb-10">My forever.</FadeInParagraph>
            <FadeInParagraph className="mb-10">And if life gives me another chance...</FadeInParagraph>
            <FadeInParagraph className="mb-10">In another world...</FadeInParagraph>
            <FadeInParagraph className="mb-10">In another lifetime...</FadeInParagraph>
            <FadeInParagraph className="mb-10">I would still search for you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I would still choose you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">I would still fall in love with you.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Every single time.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Happy Birthday, Baby.</FadeInParagraph>
            <FadeInParagraph className="mb-10">See You In Every Lifetime.</FadeInParagraph>
            <FadeInParagraph className="mb-10">Forever Yours,</FadeInParagraph>
            
            {/* Signature Area with ink finishing effect */}
            <motion.p 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mb-32 text-[26px] md:text-[32px] text-stone-900"
            >
              Dhruvil ❤️
            </motion.p>

            <EndingSequence onComplete={handleNext} />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

/* =========================================
   Interactive Envelope (Tap to Open)
========================================= */
const EnvelopeOpening = ({ onOpenComplete }: { onOpenComplete: () => void }) => {
  const [stage, setStage] = useState<'idle'|'opening'|'done'>('idle');

  const handleTap = () => {
    if (stage !== 'idle') return;
    setStage('opening');
    
    // Complete sequence after 3 seconds
    setTimeout(() => {
      setStage('done');
      onOpenComplete();
    }, 3000);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0]"
      animate={{ opacity: stage === 'opening' ? [1, 1, 0] : 1 }}
      transition={{ duration: 3, times: [0, 0.8, 1], ease: "easeInOut" }}
    >
       {/* Background Paper Texture for consistency */}
       <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
       
       <motion.div 
         className="relative w-[320px] md:w-[500px] aspect-[4/3] flex items-center justify-center drop-shadow-2xl z-10"
         animate={stage === 'opening' ? { y: [0, 0, '100vh'] } : {}}
         transition={{ duration: 3, times: [0, 0.6, 1], ease: "easeInOut" }}
       >
          <div className="absolute inset-0 bg-[#E8DCC4] rounded-sm shadow-inner" />
          
          <motion.div 
            className="absolute w-[92%] h-[110%] bg-[#FDFBF7] rounded-sm shadow-md top-[-5%] flex flex-col items-center pt-8 overflow-hidden origin-top"
            animate={stage === 'opening' ? { y: ['0%', '-50%', '-20%'], scale: [1, 1, 4] } : {}}
            transition={{ duration: 3, times: [0, 0.4, 0.8], ease: "easeInOut" }}
          >
             <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
             <div className="w-20 h-[1px] bg-amber-800/10 mb-4" />
             <div className="w-16 h-[1px] bg-amber-800/10" />
          </motion.div>
          
          <div className="absolute bottom-0 w-full h-[65%] bg-[#F3E8D0] rounded-b-sm z-20 shadow-sm" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}>
              <div className="absolute inset-0 border-t border-amber-600/20" />
          </div>

          <div className="absolute inset-0 w-full h-full bg-[#EFE3C8] z-[15]" style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%, 100% 100%, 50% 50%, 100% 0%)' }} />

          <motion.div 
            animate={stage === 'opening' ? { rotateX: [0, 180], zIndex: [35, 5] } : { zIndex: 35 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 w-full h-[60%] bg-[#F5EAD4] rounded-t-sm origin-top drop-shadow-md" 
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
          >
             <div className="absolute inset-0 border-b-2 border-amber-500/30" />
             <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 font-elegant italic text-amber-900/80 text-xl md:text-2xl whitespace-nowrap">
               To My Baby ❤️
             </div>
          </motion.div>

          <motion.div 
            onClick={handleTap}
            animate={stage === 'opening' ? { scale: [1, 1.4, 0], opacity: [1, 0, 0] } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-[55%] -translate-y-1/2 z-40 w-16 h-16 bg-red-800 rounded-full shadow-lg flex items-center justify-center border border-red-900/50 cursor-pointer group"
          >
             {stage === 'idle' && (
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-red-600/40 blur-md pointer-events-none" 
                />
             )}
             <div className="w-12 h-12 rounded-full border border-red-950/40 flex items-center justify-center text-red-200/90 font-elegant italic text-2xl drop-shadow-sm group-hover:scale-105 transition-transform">
               R
             </div>
          </motion.div>
       </motion.div>
       
       {stage === 'idle' && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="absolute bottom-20 font-elegant italic text-stone-500 text-lg tracking-widest uppercase pointer-events-none"
         >
           Tap to open
         </motion.div>
       )}
    </motion.div>
  );
};


/* =========================================
   Cinematic Ending Sequence
========================================= */
const EndingSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [started, setStarted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.8 }}
      className="relative w-full h-[50vh] flex flex-col items-center justify-center"
    >
      {started && (
        <motion.div
           className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto"
           initial={{ opacity: 0, backgroundColor: 'rgba(250, 246, 240, 1)' }}
           animate={{ 
             opacity: 1, 
             backgroundColor: [
               'rgba(250, 246, 240, 1)', // Cream
               'rgba(250, 246, 240, 1)',
               'rgba(89, 60, 42, 1)',    // Soft Warm Brown
               'rgba(89, 60, 42, 1)',
               'rgba(244, 204, 204, 1)', // Soft Pink
               'rgba(244, 204, 204, 1)',
               'rgba(255, 235, 180, 1)', // Golden Light
             ] 
           }}
           transition={{ duration: 40, times: [0, 0.15, 0.18, 0.5, 0.53, 0.82, 0.85] }}
        >
          {/* Phase 1: Envelope & Folding (0s - 8s) */}
          <motion.div 
            animate={{ opacity: [1, 1, 0], scale: [1, 1, 0.9] }}
            transition={{ duration: 8, times: [0, 0.9, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="relative w-[300px] md:w-[450px] aspect-[4/3] flex items-center justify-center drop-shadow-2xl">
                <div className="absolute inset-0 bg-[#E8DCC4] rounded-sm shadow-inner" />
                
                {/* Foldable Paper */}
                <motion.div 
                  initial={{ y: '-80%' }}
                  animate={{ y: ['-80%', '-80%', '0%'] }} 
                  transition={{ duration: 5, times: [0, 0.6, 1] }}
                  className="absolute w-[92%] h-[60%] bg-[#FDFBF7] top-0 z-10 flex flex-col"
                >
                   <motion.div 
                     initial={{ rotateX: 0 }}
                     animate={{ rotateX: -179 }}
                     transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                     className="absolute w-full h-[80%] bg-[#FDFBF7] top-[-80%] origin-bottom shadow-sm flex flex-col justify-end pb-4 items-center"
                     style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
                   >
                     <div className="w-20 h-[1px] bg-amber-900/10 mb-4" />
                     <div className="w-24 h-[1px] bg-amber-900/10" />
                   </motion.div>
                   
                   <motion.div 
                     initial={{ rotateX: 180 }}
                     animate={{ rotateX: 1 }} 
                     transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                     className="absolute w-full h-[80%] bg-[#F8F4E6] top-[-80%] origin-bottom shadow-md"
                     style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
                   />
                   
                   <div className="w-full h-full bg-[#FDFBF7] flex flex-col items-center pt-4">
                     <div className="w-16 h-[1px] bg-amber-900/10 mb-4" />
                     <div className="w-20 h-[1px] bg-amber-900/10" />
                   </div>

                   <motion.div 
                     initial={{ rotateX: 0 }}
                     animate={{ rotateX: 179 }}
                     transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
                     className="absolute w-full h-[80%] bg-[#FDFBF7] bottom-[-80%] origin-top shadow-sm flex flex-col items-center pt-4"
                     style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
                   >
                     <div className="w-24 h-[1px] bg-amber-900/10 mb-4" />
                     <div className="w-12 h-[1px] bg-amber-900/10" />
                   </motion.div>
                   
                   <motion.div 
                     initial={{ rotateX: -180 }}
                     animate={{ rotateX: -1 }}
                     transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
                     className="absolute w-full h-[80%] bg-[#F5EFE0] bottom-[-80%] origin-top shadow-lg"
                     style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
                   />
                </motion.div>

                <div className="absolute bottom-0 w-full h-[65%] bg-[#F3E8D0] rounded-b-sm z-20 shadow-sm" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }} />
                <div className="absolute inset-0 w-full h-full bg-[#EFE3C8] z-[15]" style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%, 100% 100%, 50% 50%, 100% 0%)' }} />

                <motion.div 
                  initial={{ rotateX: 180, zIndex: 5 }}
                  animate={{ rotateX: 0, zIndex: 30 }} 
                  transition={{ duration: 1.5, delay: 5.5, ease: "easeInOut" }}
                  className="absolute top-0 w-full h-[60%] bg-[#F5EAD4] rounded-t-sm origin-top drop-shadow-md" 
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as any}
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.1, delay: 6.25 }}
                  className="absolute top-0 w-full h-[60%] bg-[#F5EAD4] rounded-t-sm origin-top drop-shadow-md z-[35]" 
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
                />

                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }} 
                  transition={{ duration: 1, delay: 6.5, ease: "easeOut" }}
                  className="absolute top-[55%] -translate-y-1/2 z-40 w-16 h-16 bg-red-700 rounded-full shadow-[0_4px_15px_rgba(185,28,28,0.5)] flex items-center justify-center border-2 border-amber-400"
                >
                   <div className="text-amber-300 text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">❤️</div>
                </motion.div>
             </div>
          </motion.div>

          {/* Phase 2: Thank You Screen (8s - 20s) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none text-center">
             <motion.p animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }} transition={{ duration: 5, times: [0, 0.2, 0.8, 1], delay: 8 }} className="absolute font-elegant italic text-amber-100/90 text-2xl md:text-4xl tracking-wide leading-relaxed">
               Some feelings... <br/> <span className="text-xl md:text-3xl mt-4 block">are impossible to fit inside a single letter.</span>
             </motion.p>
             <motion.p animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }} transition={{ duration: 5, times: [0, 0.2, 0.8, 1], delay: 14 }} className="absolute font-elegant italic text-amber-100/90 text-2xl md:text-4xl tracking-wide">
               So I made this entire journey for you.
             </motion.p>
          </div>

          {/* Phase 3: Surprise Messages (20s - 34s) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none text-center">
             <motion.p animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }} transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 21 }} className="absolute font-elegant italic text-stone-800 text-2xl md:text-4xl">
               But wait...
             </motion.p>
             <motion.p animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }} transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 25 }} className="absolute font-elegant italic text-stone-800 text-2xl md:text-4xl">
               I still have one more surprise...
             </motion.p>
             <motion.p animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }} transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 29 }} className="absolute font-elegant italic text-stone-800 text-2xl md:text-4xl">
               Because today...
             </motion.p>
             <motion.p animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }} transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 33 }} className="absolute font-elegant italic text-stone-800 text-3xl md:text-5xl font-bold">
               isn't just another day.
             </motion.p>
          </div>

          {/* Phase 4: Birthday Transition (36s+) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 36 }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          >
             {/* Micro-animations: Confetti, Balloons */}
             {[...Array(6)].map((_, i) => (
                <motion.div key={`confetti-${i}`} animate={{ y: ['-10vh', '110vh'], x: [Math.random()*100 - 50, Math.random()*100 - 50], rotate: [0, 360] }} transition={{ duration: 4 + Math.random()*3, repeat: Infinity, delay: Math.random()*2, ease: "linear" }} className="absolute w-2 h-4 rounded-sm z-10" style={{ left: `${Math.random()*100}%`, top: '-10%', backgroundColor: ['#FCA5A5', '#FCD34D', '#A7F3D0', '#C4B5FD'][i % 4] }} />
             ))}
             {[...Array(3)].map((_, i) => (
                <motion.div key={`balloon-${i}`} animate={{ y: ['110vh', '-20vh'], x: [Math.sin(i)*20, -Math.sin(i)*20] }} transition={{ duration: 6 + Math.random()*4, repeat: Infinity, delay: Math.random()*3, ease: "linear" }} className="absolute z-0 opacity-40 mix-blend-multiply" style={{ left: `${10 + Math.random()*80}%`, bottom: '-20%' }}>
                  <svg width="40" height="60" viewBox="0 0 40 60" fill={['#FCA5A5', '#FCD34D', '#C4B5FD'][i % 3]}><path d="M20 0C8.954 0 0 10.745 0 24c0 14.333 16 30 20 36 4-6 20-21.667 20-36C40 10.745 31.046 0 20 0z" /></svg>
                </motion.div>
             ))}
             
             {/* Cake Silhouette */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, y: 20 }}
               animate={{ opacity: 0.8, scale: 1, y: 0 }}
               transition={{ duration: 2, delay: 37 }}
               className="text-7xl mb-8 drop-shadow-xl"
             >
               🎂
             </motion.div>
             
             {/* Glowing Arrow / Prompt to proceed to Chapter 11 */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 38 }}
               className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group z-50 pt-48"
               onClick={onComplete}
               onWheel={onComplete}
               onTouchMove={onComplete}
             >
               <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="font-elegant text-stone-800 text-xl tracking-widest mb-4">
                 Scroll to celebrate...
               </motion.span>
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/40 group-hover:bg-white/80 transition-colors">
                 <svg className="w-6 h-6 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
               </motion.div>
             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LetterSection;
