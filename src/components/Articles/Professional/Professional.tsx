import React from 'react';
import { sortedProfessionalExperiences } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import ProfessionalItem from '../Professional/ProfessionalItem';

const Professional: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <Section id={id} title="Work Experience">
      <ol className="ml-1.5 pl-6">
        {sortedProfessionalExperiences.map((professional) => (
          <ProfessionalItem key={professional._id} {...professional} />
        ))}
      </ol>
    </Section>
  );
};

export default Professional;
