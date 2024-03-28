import { $fetch, setup } from '@nuxt/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
import Default from '~/layouts/default.vue';

describe('landing page', async () => {
  await setup({
    server: true,
  });

  it('renders stxl ai', async () => {
    expect(await $fetch('/')).toContain('Stxl AI');
  });

  it('can mount footer', async () => {
    const component = await mountSuspended(AppFooter);
    expect(component.text()).toContain('Maximilian');
  });

  it('can mount navbar', async () => {
    const component = await mountSuspended(AppHeader);
    expect(component.text()).toContain('Generate');
  });

  it('can mount layout', async () => {
    const component = await mountSuspended(Default);
    expect(component.text()).toContain('Generate');
  });
});
