import React from 'react';
import { LoveQuote } from './LoveQuotes';
import { FloatingImage } from './FloatingPolaroids';

export const MemoryCards: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-24 py-16">
      
      {/* Memory 1 */}
      <div className="flex flex-col gap-8 relative">
        <FloatingImage src="/images/chapter3/phone.png" alt="Talking over the phone" align="left" />
        <LoveQuote text="Talking every single day slowly became the best part of my routine." delay={0.2} />
      </div>

      {/* Memory 2 */}
      <div className="flex flex-col gap-8 relative">
        <FloatingImage src="/images/chapter3/school.png" alt="School memories" align="right" />
        <LoveQuote text="I used to tease her every chance I got." delay={0.2} />
      </div>

      {/* Memory 3 */}
      <div className="flex flex-col gap-8 relative">
        <FloatingImage src="/images/chapter3/sky.png" alt="Night sky with stars" align="left" />
        <LoveQuote text="Phone calls slowly became my favourite place." delay={0.2} />
      </div>

      {/* Memory 4 */}
      <div className="flex flex-col gap-8 relative">
        <FloatingImage src="/images/chapter3/street.png" alt="Silhouettes under street lights" align="right" />
        <LoveQuote text="Without realizing it... she had already become home." delay={0.2} />
      </div>

    </div>
  );
};
