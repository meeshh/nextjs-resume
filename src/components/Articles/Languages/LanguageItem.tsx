import { Language } from '@content';
import React from 'react';
import { Heading } from '../../Heading/Heading';

const MAX_LEVEL = 5;

const LevelIndicator: React.FC<{ level: number }> = ({ level }) => {
  const filled = Math.min(Math.max(Math.round(level), 0), MAX_LEVEL);

  return (
    <div
      className="flex gap-2"
      role="img"
      aria-label={`Proficiency ${filled} out of ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, index) => (
        <span
          key={index}
          className={`inline-block h-4 w-4 rounded-full ${
            index < filled ? 'bg-yellow-500' : 'bg-slate-300'
          }`}
        />
      ))}
    </div>
  );
};

const LanguageItem: React.FC<Language> = ({ language, level }) => {
  return (
    <article className="py-2">
      <Heading level={6}>{language}</Heading>

      <LevelIndicator level={level} />
    </article>
  );
};

export default LanguageItem;
