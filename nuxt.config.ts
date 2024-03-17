// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-security'],
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
  routeRules: {
    '/api/generate': {
      security: {
        rateLimiter: {
          tokensPerInterval: 3, // an IP address can make 3 req / 24 hrs
          interval: 24 * 60 * 60 * 1_000, // 24 hrs
          headers: false,
          throwError: true,
        },
      },
    },
  },
  devtools: { enabled: false },
});
