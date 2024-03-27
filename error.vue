<script setup lang="ts">
const error = useError();

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <NuxtLayout name="default">
    <main class="h-vh w-full items-center justify-center text-center">
      <div class="pt-28 text-gray-600">
        <div class="mx-auto max-w-4xl space-y-5 text-center">
          <h1 class="mx-auto text-4xl font-extrabold text-gray-800 sm:text-6xl">
            {{ error?.statusCode }}
          </h1>
          <p class="mx-auto max-w-xl">
            <span v-if="error?.statusCode === 404">
              Sorry, that page doesn't exist.
            </span>
            <span v-else>Oops. It looks like something broke.</span>
          </p>
          <div
            class="flex items-center justify-center gap-x-3 text-sm font-medium"
          >
            <NuxtLink
              class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-white duration-150 hover:cursor-pointer hover:bg-gray-700"
              @click="handleError"
            >
              Go back home
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
