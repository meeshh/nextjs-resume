import React from 'react';
import { Heading, HeadingProps } from '../Heading/Heading';

interface SectionHeadingProps {
  id?: string;
  level?: HeadingProps['level'];
  text: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  const { id, level = 3, text } = props;

  return (
    <Heading id={id} level={level} size={2}>
      {text}
    </Heading>
  );
};
