import React from 'react';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { HeroBackground } from '../Hero/components/HeroBackground';
import { VerticalStoryFlow } from './VerticalStoryFlow';

export const ChapterTwoSection: React.FC = () => {
  return (
    <SectionWrapper id="chapter-two" background="none" fullHeight={false} className="h-full p-0 py-0 md:py-0">
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden allow-scroll">
        
        {/* Reusing Hero/ChapterOne Background for perfect consistency */}
        <HeroBackground />
        
        {/* New 140vh Vertical Scrolling Layout */}
        <VerticalStoryFlow />
        
      </div>
    </SectionWrapper>
  );
};

export default ChapterTwoSection;
