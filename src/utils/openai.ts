import OpenAI from 'openai';
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

function generateSkillVariations(skillString: string | null): string {
  const skills =
    (skillString && skillString.split(',').map((skill) => skill.trim())) || [];

  const variations: string[] = [];

  skills.forEach((skill) => {
    const lowercasedSkill = skill.toLowerCase();
    variations.push(skill);

    // Add variations based on specific rules
    if (lowercasedSkill.includes('react')) {
      variations.push('React JS', 'React', 'React.js');
    }

    if (lowercasedSkill.includes('angular')) {
      variations.push('Angular', 'AngularJS');
    }

    if (lowercasedSkill.includes('vue')) {
      variations.push('Vue.js', 'VueJS', 'Vue');
    }

    if (lowercasedSkill.includes('webpack')) {
      variations.push('Webpack');
    }

    if (lowercasedSkill.includes('babel')) {
      variations.push('Babel');
    }

    if (lowercasedSkill.includes('es6') || lowercasedSkill.includes('es2015')) {
      variations.push('ES6', 'ES2015');
    }

    if (
      lowercasedSkill.includes('node') ||
      lowercasedSkill.includes('nodejs') ||
      lowercasedSkill.includes('node.js') ||
      lowercasedSkill.includes('node js')
    ) {
      variations.push('Node', 'NodeJS', 'Node.js', 'Node JS');
    }

    if (
      lowercasedSkill.includes('typescript') ||
      lowercasedSkill.includes('ts')
    ) {
      variations.push('TypeScript', 'TS');
    }

    if (
      lowercasedSkill.includes('javascript') ||
      lowercasedSkill.includes('js')
    ) {
      variations.push('JavaScript', 'JS');
    }

    if (
      lowercasedSkill.includes('ci/cd') ||
      lowercasedSkill.includes('ci / cd') ||
      lowercasedSkill.includes('continuous integration') ||
      lowercasedSkill.includes('continuous delivery')
    ) {
      variations.push(
        'CI / CD',
        'continuous integration continuous delivery',
        'continuous integration',
        'continuous delivery',
      );
    }

    // Add more variations for other skills as needed

    if (
      lowercasedSkill.includes('teamwork') ||
      lowercasedSkill.includes('team work') ||
      lowercasedSkill.includes('team-player') ||
      lowercasedSkill.includes('team player')
    ) {
      variations.push('teamwork', 'team work', 'team-player', 'team player');
    }

    if (
      lowercasedSkill.includes('version control') ||
      lowercasedSkill.includes('version-control')
    ) {
      variations.push('version control', 'version-control', 'git');
    }

    if (
      lowercasedSkill.includes('code quality') ||
      lowercasedSkill.includes('sonarqube') ||
      lowercasedSkill.includes('sonar qube') ||
      lowercasedSkill.includes('sonar-qube')
    ) {
      variations.push('code quality', 'sonarqube', 'sonar qube', 'sonar-qube');
    }

    if (
      lowercasedSkill.includes('mend.io') ||
      lowercasedSkill.includes('mendio') ||
      lowercasedSkill.includes('mend') ||
      lowercasedSkill.includes('code analysis tools') ||
      lowercasedSkill.includes('security')
    ) {
      variations.push('mend.io', 'mendio', 'mend', 'code analysis tools');
    }

    if (
      lowercasedSkill.includes('scrum') ||
      lowercasedSkill.includes('agile')
    ) {
      variations.push('scrum', 'agile');
    }

    // Language-specific variations
    const languageRegex = /^(.*)(?=\s*language)/i;
    const languageMatch = lowercasedSkill.match(languageRegex);

    if (languageMatch) {
      variations.push(languageMatch[1].trim());
    }

    // General variations
    variations.push(skill.replace(/-/g, ' ')); // Replace hyphens with spaces
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
