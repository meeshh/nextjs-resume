import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedEducations } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import EducationItem from '../Education/EducationItem';

const Educations: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <Section icon={faGraduationCap} id={id} title="Education">
      <div className="divide-y divide-neutral-6">
        {sortedEducations.map((education) => (
          <EducationItem key={education._id} {...education} />
        ))}
      </div>
    </Section>
  );
};

export default Educations;
