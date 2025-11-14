<template>
  <div class="min-h-screen flex flex-col">
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
