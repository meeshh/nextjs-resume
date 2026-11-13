import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedSoftSkills } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import { SkillMeter } from '../../SkillMeter/SkillMeter';
import Languages from '../Languages/Languages';

const SoftSkills: React.FC = () => {
  return (
    <Section icon={faPeopleArrows} title="Soft Skills">
      <ul className="flex flex-col gap-4">
        {sortedSoftSkills.map((skill) => (
          <SkillMeter
            key={skill._id}
            name={skill.name}
            value={skill.knowledge}
          />
        ))}
      </ul>

      <Languages />
    </Section>
  );
};

export default SoftSkills;
