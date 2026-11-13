import { after } from 'next/server';
import { MAX_OFFER_LENGTH, MIN_OFFER_LENGTH } from 'src/helpers/constants';
import { errorMessage, FORBIDDEN_MESSAGE, readJson } from 'src/lib/api';
import { extractSkillKeywords } from 'src/lib/openai';
import { DAILY_LIMIT, redis } from 'src/lib/redis';
import { logVisit } from 'src/lib/supabase';

export async function POST(request: Request) {
  const { input, email, id } = await readJson<{
    input: string;
    email: string;
    id: string;
  }>(request);

  if (typeof email !== 'string' || !email || typeof id !== 'string' || !id) {
    return Response.json({ error: FORBIDDEN_MESSAGE }, { status: 403 });
  }

  if (typeof input !== 'string' || input.trim().length < MIN_OFFER_LENGTH) {
    return Response.json(
      { error: `Text too short (min ${MIN_OFFER_LENGTH} characters)` },
      { status: 400 },
    );
  }
  if (input.length > MAX_OFFER_LENGTH) {
    return Response.json(
      { error: `Text too long (max ${MAX_OFFER_LENGTH} characters)` },
      { status: 400 },
    );
  }

  try {
    const userEmail = await redis.hget<string>(id, 'email');
    if (!userEmail) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    if (userEmail !== email) {
      return Response.json(
        { error: 'User does not have access' },
        { status: 403 },
      );
    }

    // atomic increment so parallel requests can't slip past the limit
    const count = await redis.hincrby(id, 'count', 1);
    if (count > DAILY_LIMIT) {
      await redis.hincrby(id, 'count', -1);
      return Response.json(
        {
          error:
            'You have exceeded your limit. Please wait for tomorrow to try again.',
        },
        { status: 429 },
      );
    }

    let keywords: string[];
    try {
      keywords = await extractSkillKeywords(input);
    } catch (error) {
      // don't charge the user for our own upstream failure
      await redis.hincrby(id, 'count', -1);
      throw error;
    }

    // logging must never fail or slow down the user's request
    after(() =>
      logVisit(id, email).catch((error) =>
        console.error('Failed to log visit:', errorMessage(error)),
      ),
    );

    return Response.json({ keywords });
  } catch (error) {
    console.error('OpenAI API Request Error:', errorMessage(error));
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
