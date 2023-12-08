import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedSoftSkills } from 'src/helpers/utils';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import SoftSkillItem from './SoftSkillItem';
import Languages from './Languages';

const SoftSkills: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-3 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faPeopleArrows} level={2} text="Soft Skills" />
        </div>

        {sortedSoftSkills.map((skill) => (
          <SoftSkillItem key={skill._id} {...skill} />
        ))}

        <Languages />
      </div>
    </article>
  );
};

export default SoftSkills;
