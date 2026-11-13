import { Skill } from '@content';
import React from 'react';
import Prose from '../../Prose/Prose';

const SkillItem: React.FC<Skill> = ({ body }) => {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <Prose className="mt-0" html={body.html} />
    </div>
  );
};

export default SkillItem;
