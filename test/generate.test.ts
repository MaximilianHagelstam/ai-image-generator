import { $fetch, setup } from '@nuxt/test-utils';
import { describe, expect, it } from 'vitest';

describe('landing page', async () => {
  await setup({
    server: true,
  });

  it('Renders Stxl AI', async () => {
    expect(await $fetch('/')).toContain('Stxl AI');
  });
});
