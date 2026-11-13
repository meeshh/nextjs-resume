import { personal } from '@content';
import { sortedLanguages, sortedProfessionalExperiences } from './utils';

// dates are free text ("2024", "Oct 2026"); the year is what counts here
const yearOf = (date?: string) =>
  Number(date?.match(/\d{4}/)?.[0]) || undefined;

const firstYear = Math.min(
  ...sortedProfessionalExperiences
    .map((job) => yearOf(job.startDate))
    .filter((year): year is number => !!year),
);

/** The facts a recruiter scans for, all read from the content so a deploy keeps them current. */
export const glance = {
  current: sortedProfessionalExperiences.find((job) => !job.endDate),
  location: personal.location,
  years: Number.isFinite(firstYear)
    ? new Date().getFullYear() - firstYear
    : undefined,
  languages: sortedLanguages.map((l) => l.language),
};
