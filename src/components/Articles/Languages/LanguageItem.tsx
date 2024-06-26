import { Language } from '@content';
import React from 'react';
import { Heading } from '../../Heading/Heading';

const PrintLevel = ({ x, y }: { x: number; y: number }) => {
  const filledCircleIcon = (
    <div
      className="bg-yellow-500"
      style={{
        display: 'inline-block',
        width: 16,
        height: 16,
        borderRadius: '50%',
      }}
    ></div>
  );
  const emptyCircleIcon = (
    <div
      className="bg-slate-300"
      style={{
        display: 'inline-block',
        width: 16,
        height: 16,
        borderRadius: '50%',
      }}
    ></div>
  );
  const charactersA = Array(x).fill(filledCircleIcon);
  const charactersB = Array(y - x).fill(emptyCircleIcon);
  const resultIcons = charactersA.concat(charactersB);

  return (
    <div>
      {resultIcons.map((icon, index) => (
        <span className="mr-2" key={index}>
          {icon}
        </span>
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
