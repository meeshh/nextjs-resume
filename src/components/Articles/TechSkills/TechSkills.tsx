import { faCog } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedTechSkills } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import { SkillMeter } from '../../SkillMeter/SkillMeter';

const TechSkills: React.FC = () => {
  return (
    <Section icon={faCog} title="Technical Skills">
      <ul className="flex flex-col gap-4">
        {sortedTechSkills.map((skill) => (
          <SkillMeter
            key={skill._id}
            name={skill.name}
            value={skill.knowledge}
          />
        ))}
      </ul>
    </Section>
  );
};

export default TechSkills;
