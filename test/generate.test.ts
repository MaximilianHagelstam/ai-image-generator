// @vitest-environment nuxt
import { fetch, setup } from '@nuxt/test-utils';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import generateHandler from '~/server/api/generate.post';

describe('/api/generate', async () => {
  await setup({
    server: true,
  });

  registerEndpoint('/api/generate', {
    method: 'POST',
    handler: generateHandler,
  });

  it('return status 404 with GET request', async () => {
    const res = await fetch('/api/generate');
    expect(res.status).toBe(404);
  });

  it('return status 400 when prompt is missing', async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = (await res.json()) as { message: string };

    expect(res.status).toBe(400);
    expect(json.message).toBe('Prompt is required');
  });

  it('return status 400 when prompt is a number', async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 1 }),
    });
    const json = (await res.json()) as { message: string };

    expect(res.status).toBe(400);
    expect(json.message).toBe('Prompt is required');
  });

  it('return status 400 when prompt is too short', async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test' }),
    });
    const json = (await res.json()) as { message: string };

    expect(res.status).toBe(400);
    expect(json.message).toContain('Prompt must be');
  });

  it('return url when request is valid', async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'testing testing' }),
    });
    const json = (await res.json()) as { url: string };

    expect(res.status).toBe(200);
    expect(typeof json.url).toBe('string');
  });
});
