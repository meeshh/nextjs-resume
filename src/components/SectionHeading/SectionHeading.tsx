import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading, HeadingProps } from '../Heading/Heading';

interface SectionHeadingProps {
  icon?: IconDefinition;
  level?: HeadingProps['level'];
  text: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  const { icon, level = 3, text } = props;

  return (
    <Heading level={level}>
      <div className="flex items-center gap-2">
        {icon && <FontAwesomeIcon aria-hidden icon={icon} />}
        <div>{text}</div>
      </div>
    </Heading>
  );
};
