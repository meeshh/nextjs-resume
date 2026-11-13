import React from 'react';
import { sortedEducations } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import EducationItem from '../Education/EducationItem';

const Educations: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <Section id={id} title="Education">
      <div className="flex flex-col gap-10">
        {sortedEducations.map((education) => (
          <EducationItem key={education._id} {...education} />
        ))}
      </div>
    </Section>
  );
};

export default Educations;
