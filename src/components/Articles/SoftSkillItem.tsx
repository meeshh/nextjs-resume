import { SoftSkill } from '@content';
import React from 'react';
import { Heading } from '../Heading/Heading';

const SoftSkillItem: React.FC<SoftSkill> = ({
  name,
  knowledge
}) => {
  return (
    <article className="py-2 first-of-type:pt-6 last-of-type:pb-0">
      <Heading level={6}>
        {name}
      </Heading>

      <div className='h-4 w-full bg-slate-500	relative'>
        <div className="absolute top-0 left-0 bg-sky-500 h-full" style={{width: `${knowledge}%`}} />
      </div>
    </article>
  );
};

export default SoftSkillItem;
