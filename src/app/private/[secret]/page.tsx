import { notFound } from 'next/navigation';
import AboutMe from 'src/components/Articles/AboutMe';
import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Professional from 'src/components/Articles/Professional/Professional';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from '../../../components/Header/Header';
import Educations from 'src/components/Articles/Education/Educations';
import Certifications from 'src/components/Articles/Certifications/Certifications';
import TechSkills from 'src/components/Articles/TechSkills/TechSkills';
import SoftSkills from 'src/components/Articles/SoftSkills/SoftSkills';
import Projects from 'src/components/Articles/Projects/Projects';
import Skills from 'src/components/Articles/Skills/Skills';
import Navbar from 'src/components/Navbar/Navbar';

const privateKey = process.env.PRIVATE_KEY;

const Page: React.FC<PageProps> = async ({ params }) => {
  const { secret } = params;

  if (secret !== privateKey) {
    return notFound();
  }

  return (
    <>
      <Header secret={secret} />
      <Navbar secret={secret} />
      <div className="container pt-12">
        <div className="grid grid-cols-1 gap-6">
          <AboutMe />
        </div>

        <div id="skills" className="mt-12 grid grid-flow-row gap-6 lg:grid-flow-col">
          <TechSkills />
          <SoftSkills />
        </div>

        <div className="mt-12">
          <Skills />
        </div>

        <div id="experience" className="mt-12">
          <Professional />
        </div>

        <div id="certifications" className="mt-12">
          <Certifications secret={secret} />
        </div>

        <div id="projects" className="mt-12">
          <Projects />
        </div>

        <div id="education" className="mt-12">
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
