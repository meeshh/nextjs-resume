import { additionalInfo } from '@content';
import React from 'react';
import Prose from '../Prose/Prose';
import { Section } from '../Section/Section';

export const AdditionalInfo: React.FC = () => {
  return (
    <Section title={additionalInfo.title}>
      <Prose
        className="mt-0 text-justify hyphens-auto"
        html={additionalInfo.body.html}
      />
    </Section>
  );
};
