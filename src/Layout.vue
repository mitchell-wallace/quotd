<template>
  <div class="min-h-screen flex flex-col safe-area-layout">
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
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<style scoped>
.safe-area-layout {
  /* Add padding for safe areas on mobile devices (notch, status bar, etc.) */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
