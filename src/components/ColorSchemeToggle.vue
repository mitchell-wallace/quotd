<template>
  <div class="relative">
    <button
      aria-label="Toggle color scheme"
      class="border border-border rounded p-2 bg-surface text-base-content"
      @click="open = !open"
      type="button"
    >
      <component :is="currentIcon" />
    </button>
    <ul v-if="open" class="absolute right-0 mt-2 w-32 bg-surface border border-border rounded shadow-md text-sm">
      <li>
        <button
          class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
          @click="setAndClose('light')"
          type="button"
        >
          <IconSun class="w-4 h-4 mr-2" /> Light
        </button>
      </li>
      <li>
        <button
          class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
          @click="setAndClose('dark')"
          type="button"
        >
          <IconMoon class="w-4 h-4 mr-2" /> Dark
        </button>
      </li>
      <li>
        <button
          class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
          @click="setAndClose('auto')"
          type="button"
        >
          <IconBrightnessAuto class="w-4 h-4 mr-2" /> Auto
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-vue';

type Scheme = 'light' | 'dark' | 'auto';

const open = ref(false);
const scheme = ref<Scheme>((localStorage.getItem('color-scheme') as Scheme) || 'auto');

function applyScheme(schemeValue: Scheme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = schemeValue === 'dark' || (schemeValue === 'auto' && prefersDark);
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
}

const currentIcon = computed(() => {
  return scheme.value === 'auto' ? IconBrightnessAuto : scheme.value === 'dark' ? IconMoon : IconSun;
});

function setAndClose(value: Scheme) {
  scheme.value = value;
  open.value = false;
}

watch(scheme, (newScheme) => {
  applyScheme(newScheme);
  localStorage.setItem('color-scheme', newScheme);
});

onMounted(() => {
  applyScheme(scheme.value);

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => {
    if (scheme.value === 'auto') applyScheme('auto');
  };
  mql.addEventListener('change', handler);

  onUnmounted(() => {
    mql.removeEventListener('change', handler);
  });
});
</script>
