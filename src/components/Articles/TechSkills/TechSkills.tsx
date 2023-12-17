import { faCog } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedTechSkills } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import TechSkillItem from '../TechSkills/TechSkillItem';
import { TechSkill } from '@content';

const TechSkills: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-4 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faCog} level={2} text="Technical Skills" />
        </div>

        {sortedTechSkills.map((skill: TechSkill) => (
          <TechSkillItem key={skill._id} {...skill} />
        ))}
      </div>
    </article>
  );
};

export default TechSkills;
