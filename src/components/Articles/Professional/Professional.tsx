import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedProfessionalExperiences } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import ProfessionalItem from '../Professional/ProfessionalItem';

const Professional: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <Section icon={faBriefcase} id={id} title="Work Experience">
      <ol className="ml-1.5 border-l-2 border-neutral-6 pl-6">
        {sortedProfessionalExperiences.map((professional) => (
          <ProfessionalItem key={professional._id} {...professional} />
        ))}
      </ol>
    </Section>
  );
};

export default Professional;
