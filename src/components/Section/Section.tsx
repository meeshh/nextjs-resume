import { PropsWithChildren } from 'react';
import slugify from 'slugify';
import { SectionHeading } from '../SectionHeading/SectionHeading';

interface SectionProps {
  title: string;
  /** Navbar anchor. */
  id?: string;
}

/** An open section under a hairline; the heading labels it for screen readers. */
export const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  children,
  id,
  title,
}) => {
  const headingId = `${slugify(title, { lower: true, strict: true })}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-neutral-6 pt-10 first:border-t-0 first:pt-0"
    >
      <SectionHeading id={headingId} level={2} text={title} />
      <div className="mt-8">{children}</div>
    </section>
  );
};
