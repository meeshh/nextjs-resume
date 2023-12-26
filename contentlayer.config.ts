import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Personal = defineDocumentType(() => ({
  name: 'Personal',
  filePathPattern: 'personal.md',
  isSingleton: true,
  fields: {
    givenName: {
      type: 'string',
      description: 'Your first name or given name',
      required: true,
    },
    familyName: {
      type: 'string',
      description: 'Your last name or family name',
      required: true,
    },
    title: {
      type: 'string',
      description: 'Your current job title or a short description of your goal',
      required: true,
    },
    location: {
      type: 'string',
      description:
        'Your general location of residence, not your personal address',
      required: true,
    },
    twitterUsername: {
      type: 'string',
      description: 'Your Twitter username without the "@" symbol',
      required: false,
    },
  },
}));

export const Skill = defineDocumentType(() => ({
  name: 'Skill',
  filePathPattern: 'skills/*.md',
}));

export const Language = defineDocumentType(() => ({
  name: 'Language',
  filePathPattern: 'languages/*.md',
  fields: {
    language: {
      type: 'string',
      description: 'The name of the language',
      required: true,
    },
    level: {
      type: 'number',
      description: 'A descriptor of your proficiency in this language (1 to 5)',
      required: true,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.md',
  fields: {
    title: {
      type: 'string',
      description: 'The name of the project',
      required: true,
    },
    url: {
      type: 'string',
      description: 'The url of the project',
      required: true,
    },
  },
}));

export const ProfessionalExperience = defineDocumentType(() => ({
  name: 'ProfessionalExperience',
  filePathPattern: 'professionalExperiences/*.md',
  fields: {
    title: {
      type: 'string',
      description: 'Your most recent title at this organization',
      required: true,
    },
    organization: {
      type: 'string',
      description: 'The name of the company or organization you worked with',
      required: true,
    },
    startDate: {
      type: 'string',
      description: 'A descriptor of when you started the position',
      required: true,
    },
    endDate: {
      type: 'string',
      description:
        'If you no longer work with this organization, provide a descriptor of when you ended the position',
      required: false,
    },
    location: {
      type: 'string',
      description: 'The general location of the organization',
      required: false,
    },
    secret: {
      type: 'string',
      description: 'Whether the info should behave as secret or not',
      required: false,
    },
    connectTop: {
      type: 'boolean',
      description:
        'Whether the position is connected to the one that is newer (same company but different role)',
      required: false,
    },
    connectBottom: {
      type: 'boolean',
      description:
        'Whether the position is connected to the one that is older (same company but different role)',
      required: false,
    },
  },
}));

export const TechSkill = defineDocumentType(() => ({
  name: 'TechSkill',
  filePathPattern: 'techSkills/*.md',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the skill',
      required: true,
    },
    knowledge: {
      type: 'number',
      description: 'The percentage of knowledge of the skill',
      required: true,
    },
  },
}));

export const SoftSkill = defineDocumentType(() => ({
  name: 'SoftSkill',
  filePathPattern: 'softSkills/*.md',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the skill',
      required: true,
    },
    knowledge: {
      type: 'number',
      description: 'The percentage of knowledge of the skill',
      required: true,
    },
  },
}));

export const Education = defineDocumentType(() => ({
  name: 'Education',
  filePathPattern: 'educations/*.md',
  fields: {
    degree: {
      type: 'string',
      description:
        'The name of the degree or certification of your achievement',
      required: true,
    },
    organization: {
      type: 'string',
      description:
        'The name of the school, organization, or program you earned your education from',
      required: true,
    },
    startYear: {
      type: 'string',
      description: 'The year you started your education',
      required: true,
    },
    endYear: {
      type: 'string',
      description: 'The year you earned your degree',
      required: true,
    },
    organizationUrl: {
      type: 'string',
      description: 'The url of the organization',
      required: false,
    },
    programUrl: {
      type: 'string',
      description: 'The url of the program',
      required: false,
    },
    secret: {
      type: 'string',
      description: 'Whether the info should behave as secret or not',
      required: false,
    },
  },
}));

export const Certification = defineDocumentType(() => ({
  name: 'Certification',
  filePathPattern: 'certifications/*.md',
  fields: {
    certification: {
      type: 'string',
      description: 'The name of the certification',
      required: true,
    },
    issuer: {
      type: 'string',
      description:
        'The name of the organization, or program you earned your certification from',
      required: true,
    },
    completionYear: {
      type: 'string',
      description: 'The year you earned your certification',
      required: true,
    },
    url: {
      type: 'string',
      description: 'The url of the certification',
      required: false,
    },
    credentialId: {
      type: 'string',
      description: 'The credential ID of the certification',
      required: false,
    },
    secret: {
      type: 'string',
      description: 'Whether the info should behave as secret or not',
      required: false,
    },
  },
}));

export const AdditionalInfo = defineDocumentType(() => ({
  name: 'AdditionalInfo',
  filePathPattern: 'additionalInfo.md',
  isSingleton: true,
  fields: {
    title: {
      type: 'string',
      description: 'The name of the additional info section',
      required: true,
    },
  },
}));

export const PrivateField = defineDocumentType(() => ({
  name: 'PrivateField',
  filePathPattern: 'privateFields/*.md',
  fields: {
    label: {
      type: 'string',
      description: 'A label to describe the private field',
      required: true,
    },
    mobile: {
      type: 'string',
      description: 'The value of the private field on mobile devices',
      required: false,
    },
    email: {
      type: 'string',
      description: 'The value of the private field on email clients',
      required: false,
    },
  },
}));

export default makeSource({
  contentDirPath: 'edit-me/content',
  documentTypes: [
    Personal,
    Skill,
    ProfessionalExperience,
    TechSkill,
    SoftSkill,
    Certification,
    Education,
    AdditionalInfo,
    PrivateField,
    Project,
    Language,
  ],
});
