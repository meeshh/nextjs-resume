import ReactPDF from '@react-pdf/renderer';
import { NextApiHandler } from 'next';
import PDF from '../../components/PDF/PDF';

const privateKey = process.env.PRIVATE_KEY;

const handler: NextApiHandler = async (req, res) => {
  const pdfStream = await ReactPDF.renderToStream(<PDF />);
  res.setHeader('Content-Type', 'application/pdf');
  pdfStream.pipe(res);
  pdfStream.on('end', () => {});
};

export default handler;
