import { notFound } from 'next/navigation';
import AccessTable from 'src/components/AccessTable/AccessTable';
import { Footer } from 'src/components/Footer/Footer';
import GeneratorForm from 'src/components/GeneratorForm/GeneratorForm';
import { Header } from 'src/components/Header/Header';
import { isAdminKey } from 'src/lib/auth';
import { getUsers, type User } from 'src/lib/redis';

type GeneratorProps = {
  params: Promise<{ secret: string }>;
};

export default async function Generator({ params }: GeneratorProps) {
  const { secret } = await params;

  if (!isAdminKey(secret)) {
    notFound();
  }

  const users = await getUsers().catch((error): User[] => {
    console.error('Failed to load users:', error);
    return [];
  });

  return (
    <>
      <Header />
      <div className="container gap-4">
        <GeneratorForm secret={secret} />
        <AccessTable secret={secret} initialUsers={users} />
      </div>
      <Footer />
    </>
  );
}
