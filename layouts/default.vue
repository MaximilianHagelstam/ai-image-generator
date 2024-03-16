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
  <div class="h-screen bg-white font-sans text-slate-900">
    <slot />
  </div>
</template>
