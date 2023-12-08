import { allPrivateFields, personal } from '@content';
import React from 'react';
import { fullName } from '../../helpers/utils';
import { Heading } from '../Heading/Heading';
import PDFDownloadButton from '../PDF/PDFDownloadButton';
import { ContactInformation } from '../Articles/ContactInformation';

interface HeaderProps {
  secret?: string;
}

export const Header: React.FC<HeaderProps> = ({ secret }) => {
  const privateInformation = secret ? [allPrivateFields[1]] : undefined;

  return (
    <div className="mb-12 border-b-2 border-neutral-4 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-1 flex-col gap-2">
            <Heading level={1}>{fullName}</Heading>
            <Heading color="neutralSubtle" level={2}>
              {personal.title}
            </Heading>
            <ContactInformation secret={secret || undefined} privateInformation={privateInformation} />
          </div>
          <PDFDownloadButton secret={secret} />
        </div>
      </div>
    </div>
  );
};
