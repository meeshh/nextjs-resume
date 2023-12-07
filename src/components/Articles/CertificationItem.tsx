import { Certification } from '@content';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Heading } from '../Heading/Heading';
import Prose from '../Prose/Prose';
import Link from 'next/link';

const CertificationItem: React.FC<Certification> = ({
  certification,
  body,
  issuer,
  url = '#',
  credentialId,
}) => {
  return (
    <article className="border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <Heading level={3}>
        <Link href={url}>{certification}</Link>
      </Heading>

      <div className="mt-1 font-medium tracking-wide">
        <FontAwesomeIcon className="mr-2" icon={faCertificate} />
        {issuer}
      </div>
      {credentialId && (
        <div className="mt-1 text-xs tracking-wide">
          <span className="mr-2">Credential ID:</span>
          <mark className="px-2">{credentialId}</mark>
        </div>
      )}

      <Prose html={body.html} />
    </article>
  );
};

export default CertificationItem;
