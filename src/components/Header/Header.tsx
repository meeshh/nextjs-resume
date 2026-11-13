import { personal } from '@content';
import { firstName, lastName } from '../../helpers/utils';
import { ContactInformation } from '../Articles/ContactInformation';
import { Heading } from '../Heading/Heading';
import OfferInput, { type OfferAccess } from '../OfferInput/OfferInput';
import Prose from '../Prose/Prose';

interface HeaderProps {
  secret?: string;
  access?: OfferAccess;
}

export const Header: React.FC<HeaderProps> = ({ secret, access = {} }) => {
  return (
    <header
      id="home"
      className="relative overflow-hidden border-b border-neutral-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--accent-4),transparent_60%)]"
      />
      <div className="relative container py-16 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="flex flex-1 flex-col gap-4">
            <Heading level={1} size={1} className="md:text-6xl">
              {firstName} <span className="text-accent-11">{lastName}</span>
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
