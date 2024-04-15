import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import { notFound } from 'next/navigation';
import AccessTable from 'src/components/AccessTable/AccessTable';
import { createClient } from 'src/utils/supabase';
import VisitorsTable, {
  Visitor,
} from 'src/components/VisitorsTable/VisitorsTable';

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
      <div className="container flex gap-4">
        <div className="w-2/3">
          <AccessTable secret={secret as string} />
        </div>
        <div className="w-1/3">
          <VisitorsTable visitors={visitors as Visitor[]} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
