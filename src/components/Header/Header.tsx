import { personal } from '@content';
import { fullName } from '../../helpers/utils';
import { ContactInformation } from '../Articles/ContactInformation';
import { AtAGlance } from './AtAGlance';
import { Heading } from '../Heading/Heading';
import OfferInput, { type OfferAccess } from '../OfferInput/OfferInput';
import Prose from '../Prose/Prose';

interface HeaderProps {
  secret?: string;
  access?: OfferAccess;
}

export const Header: React.FC<HeaderProps> = ({ secret, access = {} }) => {
  return (
    <header id="home" className="border-b border-neutral-6">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_17rem] md:items-center md:gap-12">
          <div className="flex flex-col gap-4">
            <Heading level={1} size={1} className="md:text-6xl">
              {fullName}
            </Heading>
            <p className="text-xl font-medium text-neutral-11 md:text-2xl">
              {personal.title}
            </p>
            <Prose
              className="mt-2 max-w-2xl text-lg text-neutral-11"
              html={personal.body.html}
            />
            {secret && <ContactInformation />}
          </div>
          <AtAGlance />
        </div>
        {secret && (
          <div className="mt-10 md:w-1/2">
            <OfferInput access={access} />
          </div>
        )}
      </div>
    </header>
  );
};
