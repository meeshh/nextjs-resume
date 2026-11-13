import React from 'react';
import { sortedSoftSkills } from 'src/helpers/utils';
import { SkillMeter } from '../../SkillMeter/SkillMeter';
import Languages from '../Languages/Languages';
import { SkillGroup } from '../SkillGroup';

const SoftSkills: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <SkillGroup title="Soft skills">
        <ul className="flex flex-col gap-4">
          {sortedSoftSkills.map((skill) => (
            <SkillMeter
              key={skill._id}
              name={skill.name}
              value={skill.knowledge}
            />
          ))}
        </ul>
      </SkillGroup>
      <Languages />
    </div>
  );
};

export default SoftSkills;
