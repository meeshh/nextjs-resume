import React from 'react';
import { sortedTechSkills } from 'src/helpers/utils';
import { SkillMeter } from '../../SkillMeter/SkillMeter';
import { SkillGroup } from '../SkillGroup';

const TechSkills: React.FC = () => {
  return (
    <SkillGroup title="Technical">
      <ul className="flex flex-col gap-4">
        {sortedTechSkills.map((skill) => (
          <SkillMeter
            key={skill._id}
            name={skill.name}
            value={skill.knowledge}
          />
        ))}
      </ul>
    </SkillGroup>
  );
};

export default TechSkills;
