import { ProfessionalExperience } from '@content';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';
import { twMerge } from 'tailwind-merge';

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
  return (
    <li className="group relative pb-10 last:pb-0">
      {/* rail down to the next (older) role: accent within one company, fading out after the first job */}
      <span
        aria-hidden
        className={twMerge(
          'absolute top-3 -bottom-3 -left-[19px] w-0.5 bg-neutral-6 group-last:bottom-0 group-last:bg-transparent group-last:bg-linear-to-b group-last:from-neutral-6',
          connectBottom && 'bg-accent-9',
        )}
      />
      <span
        aria-hidden
        className={twMerge(
          'absolute top-1.5 -left-6 h-3 w-3 rounded-full border-2 border-neutral-8 bg-neutral-1',
          (connectTop || connectBottom) && 'border-accent-9',
          !endDate && 'border-accent-9 bg-accent-9 ring-4 ring-accent-4',
        )}
      />
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
