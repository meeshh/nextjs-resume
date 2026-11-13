import { notFound } from 'next/navigation';
import AccessTable from 'src/components/AccessTable/AccessTable';
import { Footer } from 'src/components/Footer/Footer';
import GeneratorForm from 'src/components/GeneratorForm/GeneratorForm';
import { Header } from 'src/components/Header/Header';
import VisitorsTable from 'src/components/VisitorsTable/VisitorsTable';
import { isAdminKey } from 'src/lib/auth';
import { getUsers, type User } from 'src/lib/redis';
import { getVisitors, type Visitor } from 'src/lib/supabase';

type DashboardProps = {
  params: Promise<{ secret: string }>;
};

export default async function Dashboard({ params }: DashboardProps) {
  const { secret } = await params;

  // authorize before touching any data source
  if (!isAdminKey(secret)) {
    notFound();
  }

  const [users, visitors] = await Promise.all([
    getUsers().catch((error): User[] => {
      console.error('Failed to load users:', error);
      return [];
    }),
    getVisitors().catch((error): Visitor[] => {
      console.error('Failed to load visitors:', error);
      return [];
    }),
  ]);

  return (
    <>
      <Header />
      <div className="container">
        <GeneratorForm secret={secret} />
      </div>
      <div className="container gap-4 lg:flex">
        <div className="w-full lg:w-2/3">
          <AccessTable secret={secret} initialUsers={users} />
        </div>
        <div className="w-full lg:w-1/3">
          <VisitorsTable visitors={visitors} />
        </div>
      </div>
      <Footer />
    </>
  );
}
