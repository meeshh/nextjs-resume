import { Project } from '@content';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import Tags from 'src/components/Tags/Tags';
import { Heading } from '../../Heading/Heading';
import Prose from '../../Prose/Prose';

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
    <article className="flex flex-col gap-6 py-8 first:pt-0 last:pb-0 sm:flex-row">
      <div className="sm:w-1/3">
        <Image
          className="aspect-square w-full rounded-xl border border-neutral-6 object-cover"
          src={`/images/${slugify(title).toLowerCase()}.jpg`}
          // decorative: the heading beside it names the project
          alt=""
          width={400}
          height={400}
          sizes="(min-width: 640px) 33vw, 100vw"
        />
      </div>
      <div className="sm:w-2/3">
        <Heading level={3} size={4}>
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
