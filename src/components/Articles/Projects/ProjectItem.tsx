import { Project } from '@content';
import React from 'react';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';
import Link from 'next/link';

const ProjectItem: React.FC<Project> = ({ title, body, url = '#' }) => {
  return (
    <article className="border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
      <Heading level={3}>
        <Link target="_blank" href={url}>
          {title}
        </Link>
      </Heading>

      <Prose html={body.html} />
    </article>
  );
};

export default ProjectItem;
