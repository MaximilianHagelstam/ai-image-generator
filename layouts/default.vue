<script setup lang="ts">
useSeoMeta({
  title: 'Stxl AI',
  ogTitle: 'Stxl AI',
  description: 'Generate images using AI.',
  ogDescription: 'Generate images using AI.',
});
</script>

<template>
  <div
    class="mx-auto h-screen max-w-screen-xl bg-white px-4 font-sans text-gray-900 md:px-8"
  >
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
