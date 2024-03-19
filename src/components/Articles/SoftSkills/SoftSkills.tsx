import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedSoftSkills } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import SoftSkillItem from '../SoftSkills/SoftSkillItem';
import Languages from '../Languages/Languages';
import { SoftSkill } from '@content';

const SoftSkills: React.FC = () => {
  return (
    <article className="rounded-xl bg-slate-800 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faPeopleArrows} level={2} text="Soft Skills" />
        </div>

        {sortedSoftSkills.map((skill: SoftSkill) => (
          <SoftSkillItem key={skill._id} {...skill} />
        ))}

        <Languages />
      </div>
    </article>
  );
};

export default SoftSkills;
