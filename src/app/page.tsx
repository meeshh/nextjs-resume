import AboutMe from 'src/components/Articles/AboutMe';
import Educations from 'src/components/Articles/Education/Educations';
import Certifications from 'src/components/Articles/Certifications/Certifications';
import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Professional from 'src/components/Articles/Professional/Professional';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import TechSkills from 'src/components/Articles/TechSkills/TechSkills';
import SoftSkills from 'src/components/Articles/SoftSkills/SoftSkills';
import Projects from 'src/components/Articles/Projects/Projects';
import Skills from 'src/components/Articles/Skills/Skills';

const Page: React.FC<PageProps> = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          <AboutMe />
        </div>

        <div className="mt-12 grid grid-flow-row gap-6 lg:grid-flow-col">
          <TechSkills />
          <SoftSkills />
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
          <Projects />
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
