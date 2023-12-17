import { ProfessionalExperience } from '@content';
import {
  faCalendar,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';

const ProfessionalItem: React.FC<ProfessionalExperience> = ({
  body,
  endDate,
  organization,
  startDate,
  title,
  location,
  connectBottom,
  connectTop,
}) => {
  let height = 'h-5/6';
  let verticalPosition = 'top-1/2';
  let translate = '-translate-y-1/2';
  if (connectBottom && connectTop) {
    height = 'h-full';
    verticalPosition = 'top-0';
    translate = '';
  } else if (connectTop) {
    height = 'h-5/6';
    verticalPosition = 'top-0';
    translate = '';
  } else if (connectBottom) {
    height = 'h-5/6';
    verticalPosition = 'bottom-0';
    translate = '';
  }

  return (
    <article className="relative border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <div
        className={`absolute left-0 ${verticalPosition} ${translate} -ml-4 ${height} w-1 border-l-4 border-sky-500 `}
      />
      <div className="flex">
        <Heading level={3} className="flex-auto">
          <span className="px-2 text-neutral-1 text-sky-600">{title}</span>
        </Heading>
        <span>
          <FontAwesomeIcon className="mr-2" icon={faCalendar} />
          {startDate}–{!endDate ? 'Current' : endDate}
        </span>
      </div>

      <div className="mt-1 flex space-x-8 font-medium tracking-wide">
        <span className="text-sm">
          <FontAwesomeIcon className="mr-2" icon={faCalendar} />
          {organization}
        </span>
        {location ? (
          <span className="text-sm">
            <FontAwesomeIcon className="mr-2" icon={faLocationCrosshairs} />
            {location}
          </span>
        ) : (
          <span className="flex-auto" />
        )}
      </div>

      <Prose html={body.html} />
    </article>
  );
};

export default ProfessionalItem;
