import { faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedSkills } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import SkillItem from './SkillItem';
import { Skill } from '@content';

const Skills: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-4 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faCode} level={2} text="Other Skills" />
        </div>

        {sortedSkills.map((skill: Skill) => (
          <SkillItem key={skill._id} {...skill} />
        ))}
      </div>
    </article>
  );
};

export default Skills;
