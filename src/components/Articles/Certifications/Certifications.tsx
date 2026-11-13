import React from 'react';
import { sortedCertifications } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import CertificationItem from '../Certifications/CertificationItem';

type CertificationsProps = {
  id?: string;
  secret?: string;
};

const Certifications: React.FC<CertificationsProps> = ({ id, secret }) => {
  return (
    <Section id={id} title="Certifications">
      <div className="flex flex-col gap-6">
        {sortedCertifications.map((certification) => (
          <CertificationItem
            key={certification._id}
            {...certification}
            // pass the page secret last so it isn't shadowed by the document's own `secret` field
            secret={secret}
          />
        ))}
      </div>
    </Section>
  );
};

export default Certifications;
