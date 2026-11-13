import { personal } from '@content';
import {
  faEnvelope,
  faLocationCrosshairs,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPrivatePersonalInfo } from 'src/lib/personalInfo';

/** Only rendered on the private page; the details come from a private gist. */
export async function ContactInformation() {
  const { email, mobile } = await getPrivatePersonalInfo();

  return (
    <address className="not-italic">
      <ul className="mt-2 sm:text-center md:text-left">
        <li className="flex items-center justify-center gap-2">
          <FontAwesomeIcon className="w-4" icon={faLocationCrosshairs} />
          <span className="flex-1">{personal.location}</span>
        </li>
        {email && (
          <li className="flex items-center justify-center gap-2">
            <FontAwesomeIcon className="w-4" icon={faEnvelope} />
            <a className="flex-1" href={`mailto:${email}`}>
              {email}
            </a>
          </li>
        )}
        {mobile && (
          <li className="flex items-center justify-center gap-2">
            <FontAwesomeIcon className="w-4" icon={faMobile} />
            <a className="flex-1" href={`tel:${mobile.replace(/\s+/g, '')}`}>
              {mobile}
            </a>
          </li>
        )}
      </ul>
    </address>
  );
}
