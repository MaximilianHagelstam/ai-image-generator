// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/test-utils/module',
  ],
  googleFonts: {
    families: {
      Inter: '100..900',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  typescript: {
    strict: true,
  },
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
});
