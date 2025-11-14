<template>
  <header
    ref="headerRef"
    class="w-full h-14 mb-8 surface border-t-0 border-x-0"
    data-testid="app-header"
  >
    <div class="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <h1
        class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        data-testid="header-logo"
      >
        Quotd.
      </h1>
      <nav class="hidden sm:flex gap-1" data-testid="header-navigation">
        <template v-for="link in links" :key="link.link">
          <a
            v-if="link.link.startsWith('http')"
            :href="link.link"
            target="_blank"
            rel="noopener noreferrer"
            :class="getLinkClass(link)"
            :data-testid="getLinkId(link, 'desktop')"
            @click="opened = false"
          >
            {{ link.label }}
          </a>
          <router-link
            v-else
            :to="link.link"
            :class="getLinkClass(link)"
            :data-testid="getLinkId(link, 'desktop')"
            @click="handleLinkClick(link.link)"
          >
            {{ link.label }}
          </router-link>
        </template>
      </nav>
      <div class="flex items-center gap-2">
        <ColorSchemeToggle />
        <button
          class="sm:hidden p-2 border border-border rounded bg-surface hover:bg-surface-hover"
          @click="opened = !opened"
          aria-label="Toggle navigation"
          type="button"
          data-testid="header-menu-toggle"
        >
          <IconX v-if="opened" :size="20" />
          <IconMenu2 v-else :size="20" />
        </button>
      </div>
    </div>
    <div
      v-if="opened"
      class="sm:hidden absolute left-0 right-0 top-14 bg-surface border-b border-border flex flex-col gap-2 p-4 z-50"
      data-testid="header-mobile-menu"
    >
      <template v-for="link in links" :key="link.link">
        <a
          v-if="link.link.startsWith('http')"
          :href="link.link"
          target="_blank"
          rel="noopener noreferrer"
          :class="getLinkClass(link)"
          :data-testid="getLinkId(link, 'mobile')"
          @click="opened = false"
        >
          {{ link.label }}
        </a>
        <router-link
          v-else
          :to="link.link"
          :class="getLinkClass(link)"
          :data-testid="getLinkId(link, 'mobile')"
          @click="handleLinkClick(link.link)"
        >
          {{ link.label }}
        </router-link>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { IconMenu2, IconX } from '@tabler/icons-vue';
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import ColorSchemeToggle from './ColorSchemeToggle.vue';

const links = [
  { link: '/', label: 'Home' },
  { link: '/app', label: 'App' },
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
];

const opened = ref(false);
const route = useRoute();
const { active, setActive } = useHeaderStore();
const headerRef = ref<HTMLElement>();

watch(() => route.path, (newPath) => {
  setActive(newPath);
});

function handleLinkClick(path: string) {
  setActive(path);
  opened.value = false;
}

function getLinkId(link: typeof links[number], context: 'desktop' | 'mobile') {
  const linkIdBase = `header-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`;
  return context === 'desktop' ? linkIdBase : `${linkIdBase}-${context}`;
}

function getLinkClass(link: typeof links[number]) {
  const base = 'px-3 py-2 rounded text-sm font-medium text-muted';
  const activeClass =
    active === link.link
      ? 'bg-primary text-primary-content'
      : 'hover:bg-surface-hover';
  return `${base} ${activeClass}`;
}

onMounted(() => {
  function handleClick(e: MouseEvent) {
    if (headerRef.value && !headerRef.value.contains(e.target as Node)) {
      opened.value = false;
    }
  }
  document.addEventListener('mousedown', handleClick);

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick);
  });
});
</script>
