// @vitest-environment nuxt
import { fetch, setup } from '@nuxt/test-utils';
import { describe, expect, it } from 'vitest';

describe('/api/generate', async () => {
  await setup({
    server: true,
  });

  it('return status 404 with GET request', async () => {
    const { status } = await fetch('/api/generate');
    expect(status).toBe(404);
  });

  it('return status 400 when prompt is missing', async () => {
    const { status } = await fetch('/api/generate', { method: 'POST' });
    expect(status).toBe(400);
  });
});
