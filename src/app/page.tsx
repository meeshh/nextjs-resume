import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import Navbar from 'src/components/Navbar/Navbar';
import Resume from 'src/components/Resume/Resume';

export default function Page() {
  return (
    <>
      <Navbar />
      <Header />
      <Resume />
      <Footer />
    </>
  );
}
