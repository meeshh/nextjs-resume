import { PrivateField, personal } from '@content';
import { faLocationCrosshairs, faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons';
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
      <ul className="mt-2">
        <li className="flex">
          <FontAwesomeIcon
            className="text-neutral-12 flex w-4 justify-center items-center mr-4"
            icon={faLocationCrosshairs}
          />{' '}
          {personal.location}
        </li>

        {secret && (
          <>
            <li className="flex">
              <FontAwesomeIcon
                className="text-neutral-12 flex w-4 justify-center items-center mr-4"
                icon={faEnvelope}
              />{' '}
              {email}
            </li>
            <li className="flex">
              <FontAwesomeIcon
                className="text-neutral-12 flex w-4 justify-center items-center mr-4"
                icon={faMobile}
              />{' '}
              {mobile}
            </li>
          </>
        )}
      </ul>
    </article>
  );
};
