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
  return (
    <article className=" gap-4 border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0 sm:flex">
      <div className="mb-2 sm:w-1/3">
        <Image
          className="rounded-lg border-4 border-yellow-500"
          src={`/images/${slugify(title).toLowerCase()}.jpg`}
          alt={title}
          layout="responsive"
          width={200}
          height={200}
        />
      </div>
      <div className="sm:w-2/3">
        <Heading level={3}>
          <Link target="_blank" href={url}>
            {title}
          </Link>
        </Heading>

        <Prose html={body.html} />

        {!!tags.length && <Tags tags={tags.split(',')} />}
      </div>
    </article>
  );
};

export default ProjectItem;
