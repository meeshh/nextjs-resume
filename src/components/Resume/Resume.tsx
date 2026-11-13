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
  <main id="resume" className="container flex flex-col gap-16 pt-16">
    <div id="skills" className="flex flex-col gap-16">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
        <TechSkills />
        <SoftSkills />
      </div>
      <Skills />
    </div>

    <Professional id="experience" />
    <Certifications id="certifications" secret={secret} />
    <Projects id="projects" />
    <Educations id="education" />
    <AdditionalInfo />
  </main>
);

export default Resume;
