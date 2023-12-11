import { faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { sortedProjects } from 'src/helpers/utils';
import { SectionHeading } from '../../SectionHeading/SectionHeading';
import ProjectItem from './ProjectItem';
import { Project } from '@content';

const Projects: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-3 py-12">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faCode} level={2} text="Projects" />
        </div>

        {sortedProjects.map((project: Project) => (
          <ProjectItem key={project._id} {...project} />
        ))}
      </div>
    </article>
  );
};

export default Projects;
