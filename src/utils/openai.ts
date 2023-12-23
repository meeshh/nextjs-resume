import OpenAI from 'openai';
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

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

    return completion.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      console.error('OpenAI API Request Error:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}
