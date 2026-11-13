import {
  allCertifications,
  allEducation,
  allLanguages,
  allProfessionalExperiences,
  allProjects,
  allSkills,
  allSoftSkills,
  allTechSkills,
  personal,
} from '@content';

type OrderedDocument = { _raw: { sourceFileName: string } };

const orderOf = (doc: OrderedDocument) =>
  parseInt(doc._raw.sourceFileName.replace(/^\D+/g, ''), 10) || 0;

// files are prefixed with their position (e.g. `00-foo.md`); copy before sorting so the generated arrays stay untouched
const sortByFileName = <T extends OrderedDocument>(docs: T[]): T[] =>
  [...docs].sort((a, b) => orderOf(a) - orderOf(b));

export const fullName = `${personal.givenName} ${personal.familyName}`;
export const firstName = personal.givenName;
export const lastName = personal.familyName;
export const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

export const sortedProfessionalExperiences = sortByFileName(
  allProfessionalExperiences,
);
export const sortedCertifications = sortByFileName(allCertifications);
export const sortedEducations = sortByFileName(allEducation);
export const sortedTechSkills = sortByFileName(allTechSkills);
export const sortedSoftSkills = sortByFileName(allSoftSkills);
export const sortedSkills = sortByFileName(allSkills);
export const sortedLanguages = sortByFileName(allLanguages);
export const sortedProjects = sortByFileName(allProjects);
