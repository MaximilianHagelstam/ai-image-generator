<template>
  <main>
    <section>
      <div class="pt-28 text-gray-600">
        <div class="mx-auto max-w-4xl space-y-5 text-center">
          <h1 class="mx-auto text-4xl font-extrabold text-gray-800 sm:text-6xl">
            Convert text to image in seconds
          </h1>
          <p class="mx-auto max-w-xl">
            Stxl AI make it simple for you to generate cool images in seconds,
            completely for free.
          </p>
          <div
            class="flex items-center justify-center gap-x-3 text-sm font-medium"
          >
            <NuxtLink
              class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-white duration-150 hover:bg-gray-600 active:bg-gray-900"
              to="/generate"
            >
              Generate your QR Code
            </NuxtLink>
            <a
              class="rounded-lg border px-4 py-2.5 text-center text-gray-700 duration-150 hover:bg-gray-50"
              href="https://github.com/MaximilianHagelstam/ai-image-generator"
              target="_blank"
            >
              Learn more
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3">
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
            <img
              alt="image"
              width="500"
              height="500"
              class="rounded-lg"
              src="/sample.png"
            />
          </div>
        </div>
      </div>
    </section>
    <div class="relative my-16 overflow-hidden border-t sm:my-28">
      <div
        class="absolute inset-0 h-full w-full blur-[100px]"
        style="
          background: linear-gradient(
            202.72deg,
            rgba(237, 78, 80, 0.05) 14.76%,
            rgba(152, 103, 240, 0.04) 34.37%,
            rgba(152, 103, 240, 0) 86.62%
          );
        "
      ></div>
      <div class="relative"></div>
    </div>
    <section class="py-16">
      <div class="custom-screen">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-semibold text-gray-800 sm:text-4xl">
            Stxl AI is Proudly Open Source
          </h2>
          <p class="mt-3 text-gray-600">
            Our source code is available on GitHub.
          </p>
          <a
            href="https://github.com/MaximilianHagelstam/ai-image-generator"
            class="mt-4 inline-flex max-w-[200px] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-gray-600 active:bg-gray-900"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              class="h-6 w-6 fill-slate-200 group-hover:fill-slate-700"
            >
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
              ></path>
            </svg>
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
