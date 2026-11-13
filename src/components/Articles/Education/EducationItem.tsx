import { Education } from '@content';
import Link from 'next/link';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';

const EducationItem: React.FC<Education> = ({
  degree,
  startYear,
  endYear,
  organization,
  body,
  organizationUrl,
  programUrl,
}) => {
  return (
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <Heading level={3} size={4}>
          {programUrl ? (
            <Link target="_blank" rel="noopener noreferrer" href={programUrl}>
              {degree}
            </Link>
          ) : (
            degree
          )}
        </Heading>
        <p className="shrink-0 text-sm font-medium text-neutral-11 tabular-nums">
          {startYear} – {endYear || 'Present'}
        </p>
      </div>

      <p className="mt-1 text-sm font-medium text-accent-11">
        {organizationUrl ? (
          <Link
            href={organizationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization}
          </Link>
        ) : (
          organization
        )}
      </p>

      <Prose className="text-justify hyphens-auto" html={body.html} />
    </article>
  );
};

export default EducationItem;
