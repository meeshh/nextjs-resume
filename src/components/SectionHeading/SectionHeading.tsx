import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading, HeadingProps } from '../Heading/Heading';

interface SectionHeadingProps {
  icon?: IconDefinition;
  id?: string;
  level?: HeadingProps['level'];
  text: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  const { icon, id, level = 3, text } = props;

  return (
    <Heading id={id} level={level} size={3} className="flex items-center gap-3">
      {icon && (
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-3 text-base text-accent-11"
        >
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {text}
    </Heading>
  );
};
