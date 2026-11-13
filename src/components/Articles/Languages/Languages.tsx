import React from 'react';
import { sortedLanguages } from 'src/helpers/utils';
import { Heading } from '../../Heading/Heading';
import LanguageItem from './LanguageItem';

const Languages: React.FC = () => {
  return (
    <div className="mt-8 border-t border-neutral-6 pt-6">
      <Heading level={3} size={5}>
        Languages
      </Heading>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
        {sortedLanguages.map((language) => (
          <LanguageItem key={language._id} {...language} />
        ))}
      </ul>
    </div>
  );
};

export default Languages;
