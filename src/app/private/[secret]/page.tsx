import { notFound } from 'next/navigation';
import AboutMe from 'src/components/Articles/AboutMe';
import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Professional from 'src/components/Articles/Professional';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from '../../../components/Header/Header';
import Educations from 'src/components/Articles/Educations';
import Certifications from 'src/components/Articles/Certifications';
import TechSkills from 'src/components/Articles/TechSkills';
import SoftSkills from 'src/components/Articles/SoftSkills';
import Projects from 'src/components/Articles/Projects/Projects';

const privateKey = process.env.PRIVATE_KEY;

const Page: React.FC<PageProps> = async ({ params }) => {
  const { secret } = params;

  if (secret !== privateKey) {
    return notFound();
  }

  return (
    <>
      <Header secret={secret} />

      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          <AboutMe />
        </div>

        <div className="mt-12 grid grid-flow-row gap-6 lg:grid-flow-col">
          <TechSkills />
          <SoftSkills />
        </div>

        <div className="mt-12">
          <Professional />
        </div>

        <div className="mt-12">
          <Certifications secret={secret} />
        </div>

        <div className="mt-12">
          <Projects />
        </div>

        <div className="mt-12">
          <Educations />
        </div>

        <div className="mt-12">
          <AdditionalInfo />
        </div>
      </div>

      <Footer secret={secret} />
    </>
  );
};

export default Page;
