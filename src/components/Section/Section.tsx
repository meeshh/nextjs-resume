import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PropsWithChildren } from 'react';
import slugify from 'slugify';
import { SectionHeading } from '../SectionHeading/SectionHeading';

interface SectionProps {
  icon: IconDefinition;
  title: string;
  /** Navbar anchor; most sections are reached through a wrapper instead. */
  id?: string;
}

/** A titled card; the heading labels the section for screen readers. */
export const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  children,
  icon,
  id,
  title,
}) => {
  const headingId = `${slugify(title, { lower: true, strict: true })}-heading`;

  return (
    <section id={id} aria-labelledby={headingId}>
      <SectionHeading icon={icon} id={headingId} level={2} text={title} />
      <div className="mt-5 rounded-2xl border border-neutral-6 bg-neutral-2 p-6 md:p-8">
        {children}
      </div>
    </section>
  );
};
