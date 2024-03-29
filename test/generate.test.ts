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
    const { status } = await fetch('/api/generate');
    expect(status).toBe(404);
  });

  it('return status 400 when prompt is missing', async () => {
    const { status } = await fetch('/api/generate', { method: 'POST' });
    expect(status).toBe(400);
  });

  it('return status 400 when prompt is too short', async () => {
    const { status } = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test' }),
    });
    expect(status).toBe(400);
  });

  it('return status 400 when prompt is a number', async () => {
    const { status } = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 1 }),
    });
    expect(status).toBe(400);
  });
});
