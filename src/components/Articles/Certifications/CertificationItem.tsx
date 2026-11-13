import { Certification } from '@content';
import Link from 'next/link';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';

const CertificationItem: React.FC<Certification> = ({
  certification,
  body,
  issuer,
  url,
  credentialId,
  secret,
}) => {
  return (
    <article className="py-6 first:pt-0 last:pb-0">
      <Heading level={3} size={4}>
        {secret && url ? (
          <Link target="_blank" rel="noopener noreferrer" href={url}>
            {certification}
          </Link>
        ) : (
          certification
        )}
      </Heading>

      <p className="mt-1 text-sm font-medium text-accent-11">{issuer}</p>
      {secret && credentialId && (
        <p className="mt-2 text-xs text-neutral-11">
          Credential ID{' '}
          <code className="rounded bg-neutral-4 px-1.5 py-0.5 font-mono text-neutral-12">
            {credentialId}
          </code>
        </p>
      )}

      <Prose html={body.html} />
    </article>
  );
};

export default CertificationItem;
