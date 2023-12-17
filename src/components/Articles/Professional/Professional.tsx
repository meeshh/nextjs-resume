import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedProfessionalExperiences } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import ProfessionalItem from '../Professional/ProfessionalItem';
import { ProfessionalExperience } from '@content';

const Professional: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-4 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faBriefcase} level={2} text="Work Experience" />
        </div>

        {sortedProfessionalExperiences.map((professional: ProfessionalExperience) => (
          <ProfessionalItem key={professional._id} {...professional} />
        ))}
      </div>
    </article>
  );
};

export default Professional;
