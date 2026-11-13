import React from 'react';
import { sortedSkills } from 'src/helpers/utils';
import { SkillGroup } from '../SkillGroup';
import SkillItem from './SkillItem';

const Skills: React.FC = () => {
  return (
    <SkillGroup title="Also worked with">
      <div className="divide-y divide-neutral-6">
        {sortedSkills.map((skill) => (
          <SkillItem key={skill._id} {...skill} />
        ))}
      </div>
    </SkillGroup>
  );
};

export default Skills;
