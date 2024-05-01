import { defineEventHandler } from 'h3';
import { MaxPromptLength, MinPromptLength } from '~/utils/constants';
import { generateImage } from '~/utils/generate';

type RequestBody = { prompt: string };

const validateBody = (
  body: RequestBody,
): { isValid: boolean; message: string } => {
  if (!body?.prompt || typeof body?.prompt !== 'string') {
    return { isValid: false, message: 'Prompt is required' };
  }

  if (
    body.prompt.trim().length < MinPromptLength ||
    body.prompt.trim().length > MaxPromptLength
  ) {
    return {
      isValid: false,
      message: `Prompt must be between ${MinPromptLength} and ${MaxPromptLength}`,
    };
  }

  return { isValid: true, message: '' };
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as RequestBody;

  const { isValid, message } = validateBody(body);
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: message,
    });
  }

  const url = await generateImage(body.prompt);
  if (!url) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating image',
    });
  }

  return { url };
});
