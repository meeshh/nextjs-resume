import React from 'react';
import { sortedLanguages } from 'src/helpers/utils';
import LanguageItem from './LanguageItem';
import { Heading } from '../../Heading/Heading';
import { Language } from '@content';

const Languages: React.FC = () => {
  return (
    <div className="mt-6 border-t-2 text-center">
      <Heading level={3} className="mt-4">
        Languages
      </Heading>
      <div className="grid grid-flow-col grid-rows-2 gap-x-6">
        {sortedLanguages.map((language: Language) => (
          <LanguageItem key={language._id} {...language} />
        ))}
      </div>
    </div>
  );
};

export default Languages;
