import { Certification } from '@content';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';
import Link from 'next/link';

const CertificationItem: React.FC<Certification> = ({
  certification,
  body,
  issuer,
  url = '#',
  credentialId,
  secret,
}) => {
  return (
    <article className="border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <Heading level={3}>
        {secret ? (
          <Link target="_blank" href={url}>
            {certification}
          </Link>
        ) : (
          certification
        )}
      </Heading>

      <div className="mt-1 font-medium tracking-wide">
        <FontAwesomeIcon className="mr-2" icon={faCertificate} />
        {issuer}
      </div>
      {secret && credentialId && (
        <div className="mt-1 text-xs tracking-wide">
          <span className="mr-2">Credential ID:</span>
          <span className="bg-purple-500 px-2 text-white">{credentialId}</span>
        </div>
      )}

      <Prose html={body.html} />
    </article>
  );
};

export default CertificationItem;
