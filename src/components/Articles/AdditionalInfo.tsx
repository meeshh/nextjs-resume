import { additionalInfo } from '@content';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Prose from '../Prose/Prose';
import { Section } from '../Section/Section';

export const AdditionalInfo: React.FC = () => {
  return (
    <Section icon={faGuitar} title={additionalInfo.title}>
      <Prose className="mt-0" html={additionalInfo.body.html} />
    </Section>
  );
};
