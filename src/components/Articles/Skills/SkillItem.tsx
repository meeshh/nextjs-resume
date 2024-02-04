import { Skill } from '@content';
import React from 'react';
import Prose from '../../Prose/Prose';

const SkillItem: React.FC<Skill> = ({ body }) => {
  return (
    <article className="border-t-2 border-neutral-6 py-6 text-center first-of-type:border-none last-of-type:pb-0">
      <Prose html={body.html} />
    </article>
  );
};

export default SkillItem;
