import ReactPDF from '@react-pdf/renderer';
import { NextApiHandler } from 'next';
import PDF from '../../components/PDF/PDF';
import { getPrivatePersonalInfo } from './personal-info';

const privateInfo = await getPrivatePersonalInfo();

const handler: NextApiHandler = async (req, res) => {
  const pdfStream = await ReactPDF.renderToStream(<PDF privateInfo={privateInfo} />);
  res.setHeader('Content-Type', 'application/pdf');
  pdfStream.pipe(res);
  pdfStream.on('end', () => {});
};

export default handler;
