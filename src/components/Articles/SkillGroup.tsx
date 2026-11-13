import { PropsWithChildren } from 'react';
import { Heading } from '../Heading/Heading';

/** One group inside the Skills section. */
export const SkillGroup: React.FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => (
  <div>
    <Heading level={3} size={5} className="text-neutral-11">
      {title}
    </Heading>
    <div className="mt-5">{children}</div>
  </div>
);
