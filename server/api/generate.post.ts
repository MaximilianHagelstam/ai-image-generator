import axios from 'axios';
import { MaxPromptLength, MinPromptLength } from '~/utils/constants';
import { uploadImage } from '~/utils/upload';

const exampleResult =
  'https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png';
const replicateApiVersion =
  '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as { prompt: string | undefined };

  if (!body?.prompt || typeof body?.prompt !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prompt is required',
    });
  }

  if (
    body.prompt.length < MinPromptLength ||
    body.prompt.length > MaxPromptLength
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `Prompt must be between ${MinPromptLength} and ${MaxPromptLength} characters`,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    return {
      url: exampleResult,
    };
  }

  const { data: postData, status: postStatus } = await axios.post<{
    urls: { get: string };
  }>(
    'https://api.replicate.com/v1/predictions',
    {
      version: replicateApiVersion,
      input: {
        width: 768,
        height: 768,
        prompt: body.prompt,
        refine: 'expert_ensemble_refiner',
        scheduler: 'K_EULER',
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: '',
        prompt_strength: 0.8,
        num_inference_steps: 25,
      },
    },
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (postStatus !== 201) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating image',
    });
  }

  let imageUrl = '';
  while (imageUrl.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data: getData, status: getStatus } = await axios.get<{
      status: 'succeeded' | 'failed' | 'processing';
      output: string[];
    }>(postData.urls.get, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (getStatus !== 200 || getData.status === 'failed') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error retrieving image',
      });
    }

    if (getData.status === 'succeeded') {
      imageUrl = getData.output[getData.output.length - 1];
      break;
    }
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
