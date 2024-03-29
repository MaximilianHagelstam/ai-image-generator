// @vitest-environment nuxt
import { $fetch, setup } from '@nuxt/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
import Default from '~/layouts/default.vue';

describe('/', async () => {
  await setup({
    server: true,
  });

  it('renders logo', async () => {
    const res = await $fetch('/');
    expect(res).toContain('Stxl AI');
  });

  it('mounts footer', async () => {
    const component = await mountSuspended(AppFooter);
    expect(component.text()).toContain('Created by');
  });

  it('mounts navbar', async () => {
    const component = await mountSuspended(AppHeader);
    expect(component.text()).toContain('Generate an image');
  });

  it('mounts layout', async () => {
    const component = await mountSuspended(Default);
    expect(component.text()).toContain('Powered by');
  });
});
