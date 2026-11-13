import React from 'react';
import { sortedLanguages } from 'src/helpers/utils';
import { SkillGroup } from '../SkillGroup';
import LanguageItem from './LanguageItem';

const Languages: React.FC = () => {
  return (
    <SkillGroup title="Languages">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
        {sortedLanguages.map((language) => (
          <LanguageItem key={language._id} {...language} />
        ))}
      </ul>
    </SkillGroup>
  );
};

export default Languages;
