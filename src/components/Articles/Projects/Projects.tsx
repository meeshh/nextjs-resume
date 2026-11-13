import React from 'react';
import { sortedProjects } from 'src/helpers/utils';
import { Section } from '../../Section/Section';
import ProjectItem from './ProjectItem';

const Projects: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <Section id={id} title="Projects">
      <div className="divide-y divide-neutral-6">
        {sortedProjects.map((project) => (
          <ProjectItem key={project._id} {...project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
