import React from 'react';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { AnimatedHeading } from '../../../../components/ui/AnimatedHeading';

export const DreamSection: React.FC = () => {
  return (
    <SectionWrapper id="dream" background="none" fullHeight>
      <AnimatedHeading text="Disney Fairy Tale" highlightWords={["Disney", "Fairy", "Tale"]} />
      <p className="font-cute text-neutral-500 uppercase tracking-widest text-xs md:text-sm mt-4">
        [Section #6: Dream Architecture Ready]
      </p>
    </SectionWrapper>
  );
};
export default DreamSection;
