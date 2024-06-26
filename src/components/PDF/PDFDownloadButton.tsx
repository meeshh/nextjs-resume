import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ButtonLink from '../Button/ButtonLink';

interface PDFDownloadButtonProps {
  secret?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ secret }) => {
  return (
    <ButtonLink
      href={secret ? `/api/pdf?secret=${secret}` : '/api/pdf'}
      size="md"
    >
      Download
      <FontAwesomeIcon icon={faFilePdf} size="lg" />
    </ButtonLink>
  );
};

export default PDFDownloadButton;
