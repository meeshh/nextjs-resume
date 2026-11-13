import { Language } from '@content';
import React from 'react';

const MAX_LEVEL = 5;

const LevelIndicator: React.FC<{ level: number }> = ({ level }) => {
  const filled = Math.min(Math.max(Math.round(level), 0), MAX_LEVEL);

  return (
    <div
      className="flex gap-1.5"
      role="img"
      aria-label={`Proficiency ${filled} out of ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, index) => (
        <span
          key={index}
          className={`inline-block h-2.5 w-2.5 rounded-full ${
            index < filled ? 'bg-accent-9' : 'bg-neutral-6'
          }`}
        />
      ))}
    </div>
  );
};

const LanguageItem: React.FC<Language> = ({ language, level }) => {
  return (
    <li className="flex flex-col gap-2">
      <span className="text-sm font-medium text-neutral-12">{language}</span>
      <LevelIndicator level={level} />
    </li>
  );
};

export default LanguageItem;
