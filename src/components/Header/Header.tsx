import { allPrivateFields, personal } from '@content';
import { firstName, lastName } from '../../helpers/utils';
import { Heading } from '../Heading/Heading';
import PDFDownloadButton from '../PDF/PDFDownloadButton';
import { ContactInformation } from '../Articles/ContactInformation';
import OfferInput from '../OfferInput/OfferInput';

interface HeaderProps {
  secret?: string;
}

export const Header: React.FC<HeaderProps> = ({ secret }) => {
  const privateInformation = secret ? [allPrivateFields[1]] : undefined;

  return (
    <div className="mb-12 border-b-2 border-neutral-8 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-1 flex-col gap-2">
            <Heading level={1}>
              <span className="text-sky-500">{firstName}</span>&nbsp;
              <span>{lastName}</span>
            </Heading>
            <Heading color="neutralSubtle" level={2}>
              {personal.title}
            </Heading>
            {secret && (
              <ContactInformation
                secret={secret || undefined}
                privateInformation={privateInformation}
              />
            )}
          </div>
          {secret && (
            <div className="w-full md:w-5/12">
              <PDFDownloadButton secret={secret} />
              <OfferInput />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
