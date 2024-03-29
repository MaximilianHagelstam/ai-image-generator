import axios from 'axios';
import { ExampleImage, IsProd } from '~/utils/constants';

const replicateApiVersion =
  '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

export const generateImage = async (prompt: string): Promise<string | null> => {
  if (!IsProd) return ExampleImage;

  try {
    const { data: postData, status: postStatus } = await axios.post<{
      urls: { get: string };
    }>(
      'https://api.replicate.com/v1/predictions',
      {
        version: replicateApiVersion,
        input: {
          width: 768,
          height: 768,
          prompt,
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
      throw Error('Error generating image');
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
        throw Error('Error retrieving image');
      }

      if (getData.status === 'succeeded') {
        imageUrl = getData.output[getData.output.length - 1];
        break;
      }
    }

    return imageUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
};
