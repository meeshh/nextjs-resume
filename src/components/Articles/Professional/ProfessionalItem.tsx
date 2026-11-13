import { ProfessionalExperience } from '@content';
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
}) => {
  return (
    <li className="relative pb-10 last:pb-0">
      {/* same company as the older role below: the rail between them turns accent */}
      {connectBottom && (
        <span
          aria-hidden
          className="absolute top-3 -bottom-3 -left-[26px] w-0.5 bg-accent-9"
        />
      )}
      {/* points up, toward the present */}
      <svg
        aria-hidden
        viewBox="0 0 14 12"
        className="absolute top-1.5 -left-[32px] h-3 w-3.5 overflow-visible"
      >
        <path
          d="M7 0.5L13.5 11.5H0.5Z"
          strokeLinejoin="round"
          className="fill-accent-9 stroke-neutral-1"
          strokeWidth={3}
          paintOrder="stroke"
        />
      </svg>
      <article>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <Heading level={3} size={4}>
            {title}
          </Heading>
          <p className="shrink-0 text-sm font-medium text-neutral-11 tabular-nums">
            {startDate} – {endDate || 'Present'}
          </p>
        </div>
        <p className="mt-1 text-sm font-medium text-accent-11">
          {organization}
          {location && (
            <span className="font-normal text-neutral-11"> · {location}</span>
          )}
        </p>
        <Prose html={body.html} />
      </article>
    </li>
  );
};

export default ProfessionalItem;
