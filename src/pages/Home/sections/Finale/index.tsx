import React from 'react';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { AnimatedHeading } from '../../../../components/ui/AnimatedHeading';

export const FinaleSection: React.FC = () => {
  return (
    <SectionWrapper id="finale" background="gradient" fullHeight>
      <AnimatedHeading text="Happily Ever After" highlightWords={["Happily", "After"]} />
      <p className="font-cute text-neutral-500 uppercase tracking-widest text-xs md:text-sm mt-4">
        [Section #7: Finale Architecture Ready]
      </p>
    </SectionWrapper>
  );
};
export default FinaleSection;
