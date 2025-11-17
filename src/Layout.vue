<template>
  <div
    class="min-h-screen flex flex-col safe-area-layout"
    :style="safeAreaStyle"
  >
    <div class="flex-shrink-0">
      <Header />
    </div>
    <main class="flex-1">
      <router-view />
    </main>
    <div class="flex-shrink-0">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const safeAreaStyle = ref({});

onMounted(async () => {
  // Only apply safe area insets when running in Capacitor
  if (Capacitor.isNativePlatform()) {
    try {
      const { SafeArea } = await import('@capacitor-community/safe-area');

      // Get safe area insets
      const insets = await SafeArea.getSafeAreaInsets();

      // Apply as inline styles
      safeAreaStyle.value = {
        paddingTop: `${insets.insets.top}px`,
        paddingBottom: `${insets.insets.bottom}px`,
        paddingLeft: `${insets.insets.left}px`,
        paddingRight: `${insets.insets.right}px`,
      };

      // Also enable edge-to-edge mode if available
      if (SafeArea.enable) {
        await SafeArea.enable({
          config: {
            customEdgeToEdgeHandler: false,
          },
        });
      }
    } catch (error) {
      console.error('Failed to setup safe area:', error);
    }
  }
});
</script>

<style scoped>
.safe-area-layout {
  /* Fallback for web browsers that support safe-area-inset-* */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
