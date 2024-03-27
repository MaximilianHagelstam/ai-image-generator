<script setup lang="ts">
import { MaxPromptLength, MinPromptLength } from '~/utils/constants';

const prompt = ref('');
const result = ref('');
const latencySeconds = ref(0);
const isLoading = ref(false);
const isError = ref(false);

const promptSuggestions = [
  'A city view with clouds',
  'A beautiful glacier',
  'A forest overlooking a mountain',
  'A saharan desert',
];

const generateImage = async () => {
  isLoading.value = true;
  const start = Date.now();

  try {
    const data = await $fetch('/api/generate', {
      method: 'POST',
      body: {
        prompt: prompt.value.trim(),
      },
    });
    result.value = data.url;
  } catch (error) {
    isError.value = true;
  }

  const end = Date.now();
  latencySeconds.value = (end - start) / 1_000;
  isLoading.value = false;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  useNuxtApp().$toast.info('✅ Link copied to clipboard', {
    autoClose: 2000,
    icon: false,
    hideProgressBar: true,
    position: 'bottom-right',
    dangerouslyHTMLString: true,
  });
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
          <form
            class="flex flex-col gap-4"
            method="post"
            @submit.prevent="generateImage"
          >
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="prompt">
                Prompt
              </label>
              <input
                id="prompt"
                v-model="prompt"
                name="prompt"
                type="text"
                :minlength="MinPromptLength"
                :maxlength="MaxPromptLength"
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
                  type="button"
                  @click="prompt = promptSuggestion"
                >
                  {{ promptSuggestion }}
                </button>
              </div>
            </div>
            <button
              class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-700"
              :disabled="isLoading"
            >
              ✨ {{ isLoading ? '. . .' : 'Generate' }}
            </button>
          </form>
          <p
            v-if="isError && !isLoading"
            class="mt-4 text-sm font-medium leading-none text-red-600"
          >
            There was an error generating the image
          </p>
        </div>
        <div class="col-span-1">
          <div
            v-if="isLoading"
            class="h-[500px] w-[500px] animate-pulse rounded-lg bg-gray-200"
          />
          <div
            v-if="result.length !== 0 && !isLoading && !isError"
            class="relative flex h-auto flex-col items-center justify-center"
          >
            <div
              class="group relative mx-auto flex max-w-full flex-col items-center justify-center gap-y-2 rounded-lg border border-gray-300 p-2 shadow"
            >
              <NuxtImg
                alt="generation result"
                width="500"
                height="500"
                class="rounded-lg"
                :src="result"
                format="webp"
              />
              <p class="text-sm italic text-gray-400">
                {{ `Image took ${latencySeconds} seconds to generate.` }}
              </p>
            </div>
            <div class="mt-4 flex justify-center gap-5">
              <button
                class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-700"
                @click="downloadImage(result, 'stxl-ai-image.png')"
              >
                Download
              </button>
              <button
                class="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-medium hover:bg-gray-100"
                @click="copyToClipboard(result)"
              >
                ✂️ Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
