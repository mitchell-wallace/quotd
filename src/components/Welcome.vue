<template>
  <div class="text-center">
    <h1
      class="text-[100px] font-black tracking-tight px-4 mt-24 max-sm:mt-0 max-sm:text-5xl"
      data-testid="welcome-heading"
    >
      Welcome to <span
        class="bg-clip-text text-transparent"
        :style="{
          'background-image': `linear-gradient(to right, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
        }"
      >
        Quotd.
      </span>
    </h1>
    <div class="max-w-[580px] mx-auto mt-8 aspect-[3/2]">
      <img
        src="/assets/images/hello.webp"
        alt="Astronaut waving hello"
        class="w-full h-full object-cover rounded-md max-sm:rounded-none"
      />
    </div>
    <p class="text-gray-500 mx-auto text-lg mt-8 max-w-[580px] px-4 max-[24rem]:text-base max-[24rem]:mt-4">
      Find daily inspiration right here. Visit <a href="https://ephodstudio.com/" class="underline text-lg">
        our agency website
      </a> or <a href="https://mitchellwallace.dev/" class="underline text-lg">
        my portfolio
      </a> to see more of our work.
    </p>
    <div class="flex justify-center">
      <button
        class="mt-8 max-[24rem]:mt-4 bg-secondary text-secondary-content py-3 px-6 rounded-md text-xl flex items-center hover:brightness-110"
        @click="handleGetInspired"
        type="button"
        data-testid="welcome-get-inspired"
      >
        Get Inspired
        <IconChevronRight :size="18" class="ml-2 -mr-1" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';

const router = useRouter();
const { setActive } = useHeaderStore();

function handleGetInspired() {
  router.push('/app');
  setActive('/app');
}
</script>

<!-- Photo by T Leish: https://www.pexels.com/photo/astronaut-with-a-planet-earth-ball-5258241/ -->
