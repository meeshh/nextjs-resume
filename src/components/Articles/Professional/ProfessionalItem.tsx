import { ProfessionalExperience } from '@content';
import {
  faCalendar,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    verticalPosition = 'top-0';
    translate = '';
  } else if (connectBottom) {
    verticalPosition = 'bottom-0';
    translate = '';
  }

  return (
    <article className="relative border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <div
        className={`absolute left-0 ${verticalPosition} ${translate} -ml-4 ${height} w-1 border-l-4 border-sky-500 `}
      >
        {!connectTop && (
          <div
            className={`absolute -left-2 -top-2 h-3 w-3 rounded-full bg-sky-700`}
          />
        )}
        {!connectBottom && (
          <div
            className={`absolute -bottom-2 -left-2  h-3 w-3 rounded-full bg-sky-700`}
          />
        )}
      </div>
      <div className="flex">
        <Heading level={3} className="flex-auto">
          <span className="px-2 text-neutral-1 text-sky-500">{title}</span>
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
