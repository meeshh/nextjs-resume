import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import { notFound } from 'next/navigation';
import AccessTable from 'src/components/AccessTable/AccessTable';
import { createClient } from 'src/utils/supabase';
import VisitorsTable, {
  Visitor,
} from 'src/components/VisitorsTable/VisitorsTable';
import GeneratorForm from 'src/components/GeneratorForm/GeneratorForm';

const privateKey = process.env.RESET_LIMIT_CODE;

const Dashboard: React.FC<PageProps> = async ({ params }) => {
  const supabase = createClient();
  const { data: visitors } = await supabase.from('logs').select('*');

  const { secret } = params;

  if (secret !== privateKey) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className="container">
        <GeneratorForm secret={secret as string} />
      </div>
      <div className="container gap-4 lg:flex">
        <div className="w-full lg:w-2/3">
          <AccessTable secret={secret as string} />
        </div>
        <div className="w-full lg:w-1/3">
          <VisitorsTable visitors={visitors as Visitor[]} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
