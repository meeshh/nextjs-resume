import { Skill } from '@content';
import React from 'react';
import Prose from '../../Prose/Prose';

const SkillItem: React.FC<Skill> = ({ body }) => {
  return (
    <div>
      <Prose className="mt-0" html={body.html} />
    </div>
  );
};

export default SkillItem;
