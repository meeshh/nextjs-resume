import { allSkills } from '@content';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Prose from '../Prose/Prose';
import { SectionHeading } from '../SectionHeading/SectionHeading';

const Skills: React.FC = () => {
  return (
    <article>
      <SectionHeading icon={faCheck} level={5} text="Skills" />

      <div className="mt-2 grid grid-flow-row gap-6 lg:grid-flow-col">
        {allSkills.map((skill) => (
          <div key={skill._id}>
            <Prose className="text-neutral-11" html={skill.body.html} />
          </div>
        ))}
      </div>
    </article>
  );
};

export default Skills;
