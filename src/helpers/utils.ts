import {
  allTechSkills,
  allProfessionalExperiences,
  allEducation,
  allCertifications,
  personal,
  allSoftSkills,
  allLanguages,
  allProjects,
} from '@content';

const sortArray = (array: any) => {
  return array.sort((a: any, b: any) => {
    const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
    const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
    return aOrderNumber - bOrderNumber;
  });
};

export const fullName = `${personal.givenName} ${personal.familyName}`;
export const firstName = personal.givenName;
export const lastName = personal.familyName;

export const sortedProfessionalExperiences = sortArray(
  allProfessionalExperiences,
);

export const sortedCertifications = sortArray(allCertifications);

export const sortedEducations = sortArray(allEducation);

export const sortedTechSkills = sortArray(allTechSkills);

export const sortedSoftSkills = sortArray(allSoftSkills);

export const sortedLanguages = sortArray(allLanguages);

export const sortedProjects = sortArray(allProjects);
