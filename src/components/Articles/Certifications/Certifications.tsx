import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedCertifications } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import CertificationItem from '../Certifications/CertificationItem';
import { Certification } from '@content';

type CertificationsProps = {
  secret?: string;
};

const Certifications: React.FC<CertificationsProps> = ({ secret }) => {
  return (
    <article className="rounded-xl bg-neutral-3 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading
            icon={faCertificate}
            level={2}
            text="Certifications"
          />
        </div>

        {sortedCertifications.map((certification: Certification) => (
          <CertificationItem key={certification._id} secret={secret} {...certification} />
        ))}
      </div>
    </article>
  );
};

export default Certifications;
