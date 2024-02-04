import { PrivateField, personal } from '@content';
import {
  faLocationCrosshairs,
  faEnvelope,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPrivatePersonalInfo } from 'src/pages/api/personal-info';

interface ContactInformationProps {
  privateInformation?: PrivateField[];
  secret?: string;
}

export const ContactInformation: React.FC<ContactInformationProps> = async ({
  secret,
}) => {
  const { email = '', mobile = '' } = await getPrivatePersonalInfo();

  return (
    <article>
      <ul className="mt-2 sm:text-center md:text-left">
        <li className="flex items-center justify-center gap-2">
          <FontAwesomeIcon className="w-4" icon={faLocationCrosshairs} />
          <span className="flex-1">{personal.location}</span>
        </li>

        {secret && (
          <>
            <li className="flex items-center justify-center gap-2">
              <FontAwesomeIcon className="w-4" icon={faEnvelope} />
              <span className="flex-1">{email}</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FontAwesomeIcon className="w-4" icon={faMobile} />
              <span className="flex-1">{mobile}</span>
            </li>
          </>
        )}
      </ul>
    </article>
  );
};
