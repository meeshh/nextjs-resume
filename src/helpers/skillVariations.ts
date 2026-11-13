// expands AI-extracted keywords with common spellings so more of the résumé text matches

const ciCd = [
  'CI / CD',
  'continuous integration continuous delivery',
  'continuous integration',
  'continuous delivery',
];
const teamwork = ['teamwork', 'team work', 'team-player', 'team player'];
const versionControl = ['version control', 'version-control', 'git'];
const codeQuality = ['code quality', 'sonarqube', 'sonar qube', 'sonar-qube'];
const mend = ['mend.io', 'mendio', 'mend', 'code analysis tools'];
const node = ['Node.js', 'NodeJS', 'Node JS'];
const agile = ['scrum', 'agile'];

const skillVariationsMap: Record<string, string[]> = {
  react: ['React JS', 'React', 'React.js'],
  angular: ['Angular', 'AngularJS'],
  vue: ['Vue.js', 'VueJS', 'Vue'],
  webpack: ['Webpack'],
  babel: ['Babel'],
  es6: ['ES6', 'ES2015'],
  es2015: ['ES6', 'ES2015'],
  node,
  nodejs: node,
  'node.js': node,
  'node js': node,
  typescript: ['TypeScript', 'TS'],
  ts: ['TypeScript', 'TS'],
  javascript: ['JavaScript', 'JS'],
  js: ['JavaScript', 'JS'],
  'ci/cd': ciCd,
  'ci / cd': ciCd,
  'continuous integration': ciCd,
  'continuous delivery': ciCd,
  teamwork,
  'team work': teamwork,
  'team-player': teamwork,
  'team player': teamwork,
  'version control': versionControl,
  'version-control': versionControl,
  'code quality': codeQuality,
  sonarqube: codeQuality,
  'sonar qube': codeQuality,
  'sonar-qube': codeQuality,
  'mend.io': mend,
  mendio: mend,
  mend,
  'code analysis tools': mend,
  scrum: agile,
  agile,
};

export function generateSkillVariations(skillString: string): string[] {
  const variations = new Set<string>();

  skillString
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)
    .forEach((skill) => {
      const lowercasedSkill = skill.toLowerCase();
      variations.add(skill);
      skillVariationsMap[lowercasedSkill]?.forEach((v) => variations.add(v));

      const languageMatch = lowercasedSkill.match(/^(.+?)\s*language/i);
      if (languageMatch) variations.add(languageMatch[1].trim());
    });

  return [...variations];
}
