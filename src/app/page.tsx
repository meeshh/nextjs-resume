import AboutMe from 'src/components/Articles/AboutMe';
import Achievements from 'src/components/Articles/Achievements';
import Educations from 'src/components/Articles/Educations';
import Certifications from 'src/components/Articles/Certifications';
import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Professional from 'src/components/Articles/Professional';
import Skills from 'src/components/Articles/Skills';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';

const Page: React.FC<PageProps> = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          <AboutMe />
        </div>

        <div className="mt-12">
          <Skills />
        </div>

        <div className="mt-12">
          <Professional />
        </div>

        <div className="mt-12">
          <Certifications />
        </div>

        <div className="mt-12">
          <Educations />
        </div>

        <div className="mt-12">
          <AdditionalInfo />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
