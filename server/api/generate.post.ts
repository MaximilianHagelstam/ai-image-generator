import axios from 'axios';

const exampleResult =
  'https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png';

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as { prompt: string | undefined };

  if (!body?.prompt || typeof body?.prompt !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body must contain prompt',
    });
  }

  if (body.prompt.length < 10 || body.prompt.length > 160) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prompt must be between 10 and 160 characters',
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    return {
      url: exampleResult,
    };
  }

  const { data: postData, status: postStatus } = await axios.post<{
    id: string;
  }>(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
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

  const { data: getData, status: getStatus } = await axios.get<{
    results: [{ output: string[] }];
  }>(`https://api.replicate.com/v1/predictions?id=${postData.id}`, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (getStatus !== 200) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error retrieving image',
    });
  }

  const result = getData.results.find(
    (result) => result?.output && result.output[0].length !== 0,
  );

  if (!result) {
    throw createError({
      statusCode: 500,
      statusMessage: 'There was an error generating the image',
    });
  }

  return { url: result.output[0] };
});
