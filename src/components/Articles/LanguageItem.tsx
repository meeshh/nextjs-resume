import { Language } from '@content';
import React from 'react';
import { Heading } from '../Heading/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const PrintLevel = ({ x, y }: { x: number; y: number }) => {
  const filledCircleIcon = <FontAwesomeIcon className='text-yellow-400' icon={faCircle} />;
  const emptyCircleIcon = <FontAwesomeIcon className='text-gray-400' icon={faCircle} />;
  const charactersA = Array(x).fill(filledCircleIcon);
  const charactersB = Array(y - x).fill(emptyCircleIcon);
  const resultIcons = charactersA.concat(charactersB);

  return (
    <div>
      {resultIcons.map((icon, index) => (
        <span className='mr-2' key={index}>{icon}</span>
      ))}
    </div>
  );
};

const LanguageItem: React.FC<Language> = ({ language, level }) => {
  return (
    <article className="py-2">
      <Heading level={6}>{language}</Heading>

      <PrintLevel x={level} y={5} />
    </article>
  );
};

export default LanguageItem;
