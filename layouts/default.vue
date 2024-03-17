<script setup lang="ts">
useSeoMeta({
  title: 'AI Image Generator',
  ogTitle: 'AI Image Generator',
  description: 'Generate images using AI.',
  ogDescription: 'Generate images using AI.',
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
});
</script>

<template>
  <div
    class="mx-auto h-screen max-w-screen-xl bg-white px-4 font-sans text-gray-900 md:px-8"
  >
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
