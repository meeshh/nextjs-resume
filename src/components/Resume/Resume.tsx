import { AdditionalInfo } from 'src/components/Articles/AdditionalInfo';
import Certifications from 'src/components/Articles/Certifications/Certifications';
import Educations from 'src/components/Articles/Education/Educations';
import Professional from 'src/components/Articles/Professional/Professional';
import Projects from 'src/components/Articles/Projects/Projects';
import Skills from 'src/components/Articles/Skills/Skills';
import SoftSkills from 'src/components/Articles/SoftSkills/SoftSkills';
import TechSkills from 'src/components/Articles/TechSkills/TechSkills';
import { Section } from 'src/components/Section/Section';

interface ResumeProps {
  secret?: string;
}

/** The résumé body shared by the public and the private page. Section ids are the navbar anchors. */
const Resume: React.FC<ResumeProps> = ({ secret }) => (
  <main id="resume" className="container flex flex-col gap-16 pt-12">
    <Section id="skills" title="Skills">
      <div className="flex flex-col gap-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <TechSkills />
          <SoftSkills />
        </div>
        <Skills />
      </div>
    </Section>

    <Professional id="experience" />
    <Certifications id="certifications" secret={secret} />
    <Projects id="projects" />
    <Educations id="education" />
    <AdditionalInfo />
  </main>
);

export default Resume;
