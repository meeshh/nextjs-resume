import { additionalInfo } from '@content';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Prose from '../Prose/Prose';
import { SectionHeading } from '../SectionHeading/SectionHeading';

export const AdditionalInfo: React.FC = () => {
  return (
    <article className="py-12 text-center">
      <div className="mb-6 flex justify-center">
        <SectionHeading icon={faGuitar} level={2} text={additionalInfo.title} />
      </div>

      <Prose html={additionalInfo.body.html} />
    </article>
  );
};
