import { personal } from '@content';
import { firstName, lastName } from '../../helpers/utils';
import { ContactInformation } from '../Articles/ContactInformation';
import { Heading } from '../Heading/Heading';
import OfferInput, { type OfferAccess } from '../OfferInput/OfferInput';

interface HeaderProps {
  secret?: string;
  access?: OfferAccess;
}

export const Header: React.FC<HeaderProps> = ({ secret, access = {} }) => {
  return (
    <header
      id="home"
      className="mb-12 border-b-2 border-neutral-8 bg-slate-950/60 py-12"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-1 flex-col gap-2">
            <Heading level={1}>
              <span className="text-sky-500">{firstName}</span>&nbsp;
              <span>{lastName}</span>
            </Heading>
            <Heading level={2}>{personal.title}</Heading>
            {secret && <ContactInformation />}
          </div>
          {secret && (
            <div className="w-full md:w-5/12">
              <OfferInput access={access} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
