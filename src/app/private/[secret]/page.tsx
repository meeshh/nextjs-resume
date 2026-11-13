import { notFound } from 'next/navigation';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import Navbar from 'src/components/Navbar/Navbar';
import Resume from 'src/components/Resume/Resume';
import { isPrivateKey } from 'src/lib/auth';

type PrivatePageProps = {
  params: Promise<{ secret: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PrivatePage({
  params,
  searchParams,
}: PrivatePageProps) {
  const { secret } = await params;

  if (!isPrivateKey(secret)) {
    notFound();
  }

  const { id, email } = await searchParams;

  return (
    <>
      <Header secret={secret} access={{ id: first(id), email: first(email) }} />
      <Navbar secret={secret} />
      <Resume secret={secret} />
      <Footer secret={secret} />
    </>
  );
}
