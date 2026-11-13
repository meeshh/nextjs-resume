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
}) => {
  return (
    <li className="relative pb-10 last:pb-0">
      <span
        aria-hidden
        className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full bg-accent-9 ring-4 ring-neutral-2"
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
