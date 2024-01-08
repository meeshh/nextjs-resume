import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import GeneratorForm from 'src/components/GeneratorForm/GeneratorForm';

const Generator: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <GeneratorForm />
      <Footer />
    </>
  );
};

export default Generator;
