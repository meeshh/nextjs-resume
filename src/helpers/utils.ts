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

export const fullName = `${personal.givenName} ${personal.familyName}`;

export const sortedProfessionalExperiences = allProfessionalExperiences.sort(
  (a, b) => {
    const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
    const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
    return aOrderNumber - bOrderNumber;
  },
);

export const sortedCertifications = allCertifications.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});

export const sortedEducations = allEducation.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});

export const sortedTechSkills = allTechSkills.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});

export const sortedSoftSkills = allSoftSkills.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});

export const sortedLanguages = allLanguages.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});

export const sortedProjects = allProjects.sort((a, b) => {
  const aOrderNumber = parseInt(a._raw.sourceFileName.replace(/^\D+/g, ''));
  const bOrderNumber = parseInt(b._raw.sourceFileName.replace(/^\D+/g, ''));
  return aOrderNumber - bOrderNumber;
});
