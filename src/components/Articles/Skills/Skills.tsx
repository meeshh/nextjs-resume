import { faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedSkills } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import SkillItem from './SkillItem';

const Skills: React.FC = () => {
  return (
    <Section icon={faCode} title="Other Skills">
      <div className="divide-y divide-neutral-6">
        {sortedSkills.map((skill) => (
          <SkillItem key={skill._id} {...skill} />
        ))}
      </div>
    </Section>
  );
};

export default Skills;
