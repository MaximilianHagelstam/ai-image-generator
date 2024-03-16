export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as { prompt: string | undefined };

  if (!body?.prompt || typeof body?.prompt !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body must contain prompt',
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return { id: 'mockId1234' };
  }

  const response = await $fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    }),
  });

  return response;
});
