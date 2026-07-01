import React from 'react';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { AnimatedHeading } from '../../../../components/ui/AnimatedHeading';

export const GallerySection: React.FC = () => {
  return (
    <SectionWrapper id="gallery" background="gradient" fullHeight>
      <AnimatedHeading text="Beautiful Memories" highlightWords={["Beautiful", "Memories"]} />
      <p className="font-cute text-neutral-500 uppercase tracking-widest text-xs md:text-sm mt-4">
        [Section #4: Gallery Architecture Ready]
      </p>
    </SectionWrapper>
  );
};
export default GallerySection;
