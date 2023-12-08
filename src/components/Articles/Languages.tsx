import React from 'react';
import { sortedLanguages } from 'src/helpers/utils';
import LanguageItem from './LanguageItem';
import { Heading } from '../Heading/Heading';

const Languages: React.FC = () => {
  return (
    <div className='text-center border-t-2 mt-6'>
      <Heading level={3} className="mt-4">
        Languages
      </Heading>
      <div className='grid grid-rows-2 grid-flow-col gap-x-6'>
        {sortedLanguages.map((language) => (
          <LanguageItem key={language._id} {...language} />
        ))}
      </div>
    </div>
  );
};

export default Languages;
