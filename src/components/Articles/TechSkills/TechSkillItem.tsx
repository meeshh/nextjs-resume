import { TechSkill } from '@content';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Highlighter from 'react-highlight-words';

const TechSkillItem: React.FC<TechSkill> = ({ name, knowledge }) => {
  return (
    <article className="py-2 first-of-type:pt-6 last-of-type:pb-0">
      <Heading level={6}>
        <Highlighter
          searchWords={[]}
          autoEscape={true}
          textToHighlight={name}
        />
        {/* {name} */}
      </Heading>

      <div className="relative h-4 w-full	bg-slate-500">
        <div
          className="absolute left-0 top-0 h-full bg-sky-500"
          style={{ width: `${knowledge}%` }}
        />
      </div>
    </article>
  );
};

export default TechSkillItem;
