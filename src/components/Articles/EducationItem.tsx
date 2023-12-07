import { faCalendar, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading } from '../Heading/Heading';
// import Prose from '../Prose/Prose';
import { Education } from '@content';
import Link from 'next/link';
import Prose from '../Prose/Prose';

const EducationItem: React.FC<Education> = ({
  degree,
  startYear,
  endYear,
  organization,
  body,
  organizationUrl = '#',
  programUrl = '#',
}) => {
  return (
    <article className="border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <div>
        <Heading level={3} className="flex-auto">
          <Link href={programUrl}>{degree}</Link>
        </Heading>

        <div className="mt-1 flex font-medium tracking-wide">
          <div className="mt-1 flex-auto font-medium tracking-wide">
            <FontAwesomeIcon className="mr-2" icon={faUniversity} />
            <Link href={organizationUrl} target="_blank">
              {organization}
            </Link>
          </div>
          <div>
            <FontAwesomeIcon className="mr-2" icon={faCalendar} />
            {startYear}–{!endYear ? 'Current' : endYear}
          </div>
        </div>
      </div>

      <Prose html={body.html} />
    </article>
  );
};

export default EducationItem;
