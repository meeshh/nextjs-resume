import { personal } from '@content';
import { fullName } from '../../helpers/utils';
import { ContactInformation } from '../Articles/ContactInformation';
import { Heading } from '../Heading/Heading';
import Prose from '../Prose/Prose';

interface HeaderProps {
  secret?: string;
}

export const Header: React.FC<HeaderProps> = ({ secret }) => {
  return (
    <header id="home">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <Heading level={1} size={1} className="md:text-6xl">
            {fullName}
          </Heading>
          <p className="text-xl font-medium text-neutral-11 md:text-2xl">
            {personal.title}
          </p>
          <Prose
            className="mt-2 text-lg text-neutral-11"
            html={personal.body.html}
          />
          {secret && <ContactInformation />}
        </div>
      </div>
    </header>
  );
};
