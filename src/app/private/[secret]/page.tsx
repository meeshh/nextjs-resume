import { notFound } from 'next/navigation';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import Navbar from 'src/components/Navbar/Navbar';
import Resume from 'src/components/Resume/Resume';
import { isPrivateKey } from 'src/lib/auth';

type PrivatePageProps = {
  params: Promise<{ secret: string }>;
};

export default async function PrivatePage({ params }: PrivatePageProps) {
  const { secret } = await params;

  if (!isPrivateKey(secret)) {
    notFound();
  }

  return (
    <>
      <Navbar secret={secret} />
      <Header secret={secret} />
      <Resume secret={secret} />
      <Footer secret={secret} />
    </>
  );
}
