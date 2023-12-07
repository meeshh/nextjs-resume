import { PrivateField, personal } from '@content';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ContactInformationProps {
  privateInformation?: PrivateField[];
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  privateInformation,
}) => {
  return (
    <article>
      <ul className="mt-2">
        <li>
          <FontAwesomeIcon
            className="text-neutral-12"
            icon={faLocationCrosshairs}
          />{' '}
          {personal.location}
        </li>

        {/* private access required */}
        {privateInformation?.map((privateField) => (
          <li className="mt-3" key={privateField.label}>
            <strong>{privateField.label}</strong>{' '}
            <div dangerouslySetInnerHTML={{ __html: privateField.body.html }} />
          </li>
        ))}
      </ul>
    </article>
  );
};
