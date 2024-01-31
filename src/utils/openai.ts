import OpenAI from 'openai';
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

const skillVariationsMap: { [key: string]: string[] } = {
  react: ['React JS', 'React', 'React.js'],
  angular: ['Angular', 'AngularJS'],
  vue: ['Vue.js', 'VueJS', 'Vue'],
  webpack: ['Webpack'],
  babel: ['Babel'],
  es6: ['ES6', 'ES2015'],
  es2015: ['ES6', 'ES2015'],
  node: ['Node.js', 'NodeJS', 'Node JS'],
  nodejs: ['Node.js', 'NodeJS', 'Node JS'],
  'node.js': ['Node.js', 'NodeJS', 'Node JS'],
  'node js': ['Node.js', 'NodeJS', 'Node JS'],
  typescript: ['TypeScript', 'TS'],
  ts: ['TypeScript', 'TS'],
  javascript: ['JavaScript', 'JS'],
  js: ['JavaScript', 'JS'],
  'ci/cd': [
    'CI / CD',
    'continuous integration continuous delivery',
    'continuous integration',
    'continuous delivery',
  ],
  'ci / cd': [
    'CI / CD',
    'continuous integration continuous delivery',
    'continuous integration',
    'continuous delivery',
  ],
  'continuous integration': [
    'CI / CD',
    'continuous integration continuous delivery',
    'continuous integration',
    'continuous delivery',
  ],
  'continuous delivery': [
    'CI / CD',
    'continuous integration continuous delivery',
    'continuous integration',
    'continuous delivery',
  ],
  teamwork: ['teamwork', 'team work', 'team-player', 'team player'],
  'team work': ['teamwork', 'team work', 'team-player', 'team player'],
  'team-player': ['teamwork', 'team work', 'team-player', 'team player'],
  'team player': ['teamwork', 'team work', 'team-player', 'team player'],
  'version control': ['version control', 'version-control', 'git'],
  'version-control': ['version control', 'version-control', 'git'],
  'code quality': ['code quality', 'sonarqube', 'sonar qube', 'sonar-qube'],
  sonarqube: ['code quality', 'sonarqube', 'sonar qube', 'sonar-qube'],
  'sonar qube': ['code quality', 'sonarqube', 'sonar qube', 'sonar-qube'],
  'sonar-qube': ['code quality', 'sonarqube', 'sonar qube', 'sonar-qube'],
  'mend.io': ['mend.io', 'mendio', 'mend', 'code analysis tools'],
  mendio: ['mend.io', 'mendio', 'mend', 'code analysis tools'],
  mend: ['mend.io', 'mendio', 'mend', 'code analysis tools'],
  'code analysis tools': ['mend.io', 'mendio', 'mend', 'code analysis tools'],
  scrum: ['scrum', 'agile'],
  agile: ['scrum', 'agile'],
};

function generateSkillVariations(skillString: string | null): string {
  const skills = skillString?.split(',').map((skill) => skill.trim()) || [];

  const variations: string[] = [];

  skills.forEach((skill) => {
    const lowercasedSkill = skill.toLowerCase();
    variations.push(skill);

    const skillVariations = skillVariationsMap[lowercasedSkill];
    if (skillVariations) {
      variations.push(...skillVariations);
    }

    const languageRegex = /^(.*)(?=\s*language)/i;
    const languageMatch = lowercasedSkill.match(languageRegex);

    if (languageMatch) {
      variations.push(languageMatch[1].trim());
    }
  });

  return variations.join(', ');
}

export async function createApiRequest(text: string): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `extract skills keywords from the following job offer and send back as a comma separated string: ${text}`,
        },
      ],
      max_tokens: 64,
      model: 'gpt-3.5-turbo',
    });

    return generateSkillVariations(completion.choices[0].message.content);
  } catch (error) {
    if (error instanceof Error) {
      console.error('OpenAI API Request Error:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}
