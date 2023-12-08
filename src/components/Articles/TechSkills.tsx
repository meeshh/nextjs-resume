import { faCogs } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedTechSkills } from 'src/helpers/utils';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import TechSkillItem from './TechSkillItem';

const TechSkills: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-3 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faCogs} level={2} text="Technical Skills" />
        </div>

        {sortedTechSkills.map((skill) => (
          <TechSkillItem key={skill._id} {...skill} />
        ))}
      </div>
    </article>
  );
};

export default TechSkills;
