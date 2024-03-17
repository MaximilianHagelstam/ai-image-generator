<template>
  <header class="w-full bg-white md:static md:text-sm">
    <nav class="mx-auto flex h-[70px] items-center">
      <div class="flex w-full items-center justify-between">
        <NuxtLink class="flex items-center gap-3" to="/">
          <NuxtImg alt="logo" width="30" height="30" src="/logo.svg" />
          <span class="text-lg font-bold">Stxl AI</span>
        </NuxtLink>
        <NuxtLink
          class="rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-gray-600 active:bg-gray-900"
          to="/start"
        >
          Generate an image
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
