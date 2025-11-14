<template>
  <div class="flex flex-col h-screen">
    <!-- Main content area -->
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="flex-shrink-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div class="flex items-center justify-around h-16">
        <!-- App Tab -->
        <router-link
          to="/app"
          class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          :class="isActiveRoute('/app') ? 'text-blue-600' : 'text-gray-600'"
        >
          <IconSparkles :size="24" :stroke="isActiveRoute('/app') ? 2.5 : 2" />
          <span class="text-xs mt-1 font-medium">App</span>
        </router-link>

        <!-- Library Tab -->
        <router-link
          to="/library"
          class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          :class="isActiveRoute('/library') ? 'text-blue-600' : 'text-gray-600'"
        >
          <IconBookmarks :size="24" :stroke="isActiveRoute('/library') ? 2.5 : 2" />
          <span class="text-xs mt-1 font-medium">Library</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { IconSparkles, IconBookmarks } from '@tabler/icons-vue';

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
