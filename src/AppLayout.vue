<template>
  <div class="flex flex-col h-screen">
    <!-- Main content area -->
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div class="flex items-center justify-around h-16">
        <!-- Home Tab -->
        <router-link
          to="/app"
          class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          :class="isActiveRoute('/app') ? 'text-[#fbbf24]' : 'text-gray-600 dark:text-gray-400'"
        >
          <IconHome :size="24" :stroke="isActiveRoute('/app') ? 2.5 : 2" />
          <span class="text-xs mt-1 font-medium">Home</span>
        </router-link>

        <!-- Library Tab -->
        <router-link
          to="/library"
          class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          :class="isActiveRoute('/library') ? 'text-[#fbbf24]' : 'text-gray-600 dark:text-gray-400'"
        >
          <IconBookmarks :size="24" :stroke="isActiveRoute('/library') ? 2.5 : 2" />
          <span class="text-xs mt-1 font-medium">Library</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IconHome, IconBookmarks } from '@tabler/icons-vue';

const route = useRoute();

const isActiveRoute = (path: string): boolean => {
  return route.path === path;
};
</script>

<style scoped>
/* Safe area for devices with notches/home indicators */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
