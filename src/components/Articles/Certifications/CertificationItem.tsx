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
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <Heading level={3} size={4}>
          {secret && url ? (
            <Link target="_blank" rel="noopener noreferrer" href={url}>
              {certification}
            </Link>
          ) : (
            certification
          )}
        </Heading>
        <p className="shrink-0 text-sm font-medium text-accent-11">{issuer}</p>
      </div>
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
