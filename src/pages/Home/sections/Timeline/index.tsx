import React, { useEffect } from 'react';
import { useNavigation } from '../../../../context/NavigationContext';
import { SectionWrapper } from '../../../../components/layout/SectionWrapper';
import { AnimatedHeading } from '../../../../components/ui/AnimatedHeading';

interface TimelineSectionProps {
  title?: string;
  subtitle?: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ 
  title = "Our Story Road", 
  subtitle = "[Section #3: Timeline Architecture Ready]" 
}) => {
  const { setChapterComplete } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setChapterComplete(true), 4000);
    return () => clearTimeout(timer);
  }, [setChapterComplete]);

  return (
    <SectionWrapper id="timeline" background="cream" fullHeight>
      <AnimatedHeading text={title} highlightWords={[title.split(' ').pop() || ""]} />
      <p className="font-cute text-neutral-500 uppercase tracking-widest text-xs md:text-sm mt-4 text-center">
        {subtitle}
      </p>
    </SectionWrapper>
  );
};
export default TimelineSection;
