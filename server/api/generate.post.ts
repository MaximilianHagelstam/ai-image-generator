import { MaxPromptLength, MinPromptLength } from '~/utils/constants';
import { generateImage } from '~/utils/generate';
import { uploadImage } from '~/utils/upload';

const exampleResult =
  'https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png';

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

  if (process.env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    return {
      url: exampleResult,
    };
  }

  const imageUrl = await generateImage(body.prompt);
  if (!imageUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating image',
    });
  }

  const url = await uploadImage(imageUrl);
  if (!url) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error uploading image',
    });
  }

  return { url };
});
