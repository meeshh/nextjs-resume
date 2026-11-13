import AboutMe from 'src/components/Articles/AboutMe';
import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Certifications from 'src/components/Articles/Certifications/Certifications';
import Educations from 'src/components/Articles/Education/Educations';
import Professional from 'src/components/Articles/Professional/Professional';
import Projects from 'src/components/Articles/Projects/Projects';
import Skills from 'src/components/Articles/Skills/Skills';
import SoftSkills from 'src/components/Articles/SoftSkills/SoftSkills';
import TechSkills from 'src/components/Articles/TechSkills/TechSkills';

interface ResumeProps {
  secret?: string;
}

/** The résumé body shared by the public and the private page. Section ids are the navbar anchors. */
const Resume: React.FC<ResumeProps> = ({ secret }) => (
  <main id="resume" className="container pt-12">
    <div className="grid grid-cols-1 gap-6">
      <AboutMe />
    </div>

    <div
      id="skills"
      className="mt-12 grid grid-flow-row gap-6 lg:grid-flow-col"
    >
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
  </main>
);

export default Resume;
