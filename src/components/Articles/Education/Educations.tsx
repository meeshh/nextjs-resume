import { faMortarBoard } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedEducations } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import EducationItem from '../Education/EducationItem';
import { Education } from '@content';

const Educations: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-4 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faMortarBoard} level={2} text="Education" />
        </div>

        {sortedEducations.map((education: Education) => (
          <EducationItem key={education._id} {...education} />
        ))}
      </div>
    </article>
  );
};

export default Educations;
