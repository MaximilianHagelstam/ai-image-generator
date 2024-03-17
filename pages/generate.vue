<script setup lang="ts">
const prompt = ref('');
const result = ref('');

const promptSuggestions = [
  'A city view with clouds',
  'A beautiful glacier',
  'A forest overlooking a mountain',
  'A saharan desert',
];

const generateImage = async () => {
  try {
    const data = (await $fetch('/api/generate', {
      method: 'POST',
      body: {
        prompt: prompt.value.trim(),
      },
    })) as { url: string };
    result.value = data.url;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <main>
    <div
      class="mb-0 flex w-full flex-col items-center justify-center p-4 sm:mb-28 lg:p-0"
    >
      <div
        class="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-12"
      >
        <div class="col-span-1">
          <h1 class="mb-10 text-3xl font-bold">Generate an image</h1>
          <div class="flex flex-col gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="prompt">
                Prompt
              </label>
              <input
                id="prompt"
                v-model="prompt"
                name="prompt"
                type="text"
                minlength="10"
                maxlength="160"
                required
                class="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
              />
            </div>
            <div class="my-2">
              <p class="mb-3 text-sm font-medium">Prompt suggestions</p>
              <div
                class="grid grid-cols-1 gap-3 text-center text-sm text-gray-500 sm:grid-cols-2"
              >
                <button
                  v-for="promptSuggestion in promptSuggestions"
                  :key="promptSuggestion"
                  class="cursor-pointer rounded-2xl border p-2 transition hover:bg-gray-100"
                  @click="prompt = promptSuggestion"
                >
                  {{ promptSuggestion }}
                </button>
              </div>
            </div>
            <button
              class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-gray-600 active:bg-gray-900"
              @click="generateImage"
            >
              ✨ Generate
            </button>
            <div v-if="result.length !== 0">
              <p>Response: {{ result }}</p>
            </div>
          </div>
        </div>
        <div class="col-span-1"></div>
      </div>
    </div>
  </main>
</template>
