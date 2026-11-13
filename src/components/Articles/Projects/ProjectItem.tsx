import { Project } from '@content';
import slugify from 'slugify';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';
import Link from 'next/link';
import Image from 'next/image';
import Tags from 'src/components/Tags/Tags';

const ProjectItem: React.FC<Project> = ({
  title,
  body,
  url = '#',
  tags = '',
}) => {
  const tagList = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <article className="gap-4 border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0 sm:flex">
      <div className="mb-2 sm:w-1/3">
        <Image
          className="w-full rounded-lg border-4 border-yellow-500"
          src={`/images/${slugify(title).toLowerCase()}.jpg`}
          alt={title}
          width={400}
          height={400}
          sizes="(min-width: 640px) 33vw, 100vw"
        />
      </div>
      <div className="sm:w-2/3">
        <Heading level={3}>
          <Link target="_blank" rel="noopener noreferrer" href={url}>
            {title}
          </Link>
        </Heading>

        <Prose html={body.html} />

        <Tags tags={tagList} />
      </div>
    </article>
  );
};

export default ProjectItem;
