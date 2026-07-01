import React from 'react';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { AnimatedHeading } from '../../../../components/ui/AnimatedHeading';

export const LetterSection: React.FC = () => {
  return (
    <SectionWrapper id="letter" background="cream" fullHeight>
      <AnimatedHeading text="With Deep Love" highlightWords={["Love"]} />
      <p className="font-cute text-neutral-500 uppercase tracking-widest text-xs md:text-sm mt-4">
        [Section #5: Letter Architecture Ready]
      </p>
    </SectionWrapper>
  );
};
export default LetterSection;
