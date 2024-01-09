import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import GeneratorForm from 'src/components/GeneratorForm/GeneratorForm';
import { notFound } from 'next/navigation';
import AccessTable from 'src/components/AccessTable/AccessTable';

const privateKey = process.env.RESET_LIMIT_CODE;

const Generator: React.FC<PageProps> = async ({ params }) => {
  const { secret } = params;

  if (secret !== privateKey) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className="container gap-4">
        <div>
          <GeneratorForm secret={secret as string} />
        </div>
        <div>
          <AccessTable secret={secret as string} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Generator;
