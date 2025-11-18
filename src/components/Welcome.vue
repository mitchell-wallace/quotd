<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 py-20">
      <!-- Animated gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 opacity-60"></div>

      <!-- Floating decorative elements -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

      <div class="relative z-10 text-center max-w-6xl mx-auto">
        <!-- Main heading with artistic typography -->
        <div class="mb-8">
          <h1 class="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4">
            Transform Words
            <br />
            Into
            <span
              class="bg-clip-text text-transparent inline-block"
              :style="{
                'background-image': `linear-gradient(135deg, ${themeGradients.logo.from}, ${themeGradients.logo.to}, #a855f7)`,
              }"
            >
              Art
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create beautiful, shareable Bible verse cards with stunning typography and nature photography
          </p>
        </div>

        <!-- CTA Button -->
        <button
          class="group mt-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-4 px-10 rounded-full text-xl font-bold flex items-center mx-auto hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-pink-500/50"
          @click="handleGetInspired"
          type="button"
          data-testid="welcome-get-inspired"
        >
          Start Creating
          <IconSparkles :size="24" class="ml-2 group-hover:rotate-12 transition-transform" />
        </button>

        <!-- Scroll indicator -->
        <div class="mt-16 animate-bounce">
          <IconChevronDown :size="32" class="mx-auto text-gray-400" />
        </div>
      </div>
    </section>

    <!-- Showcase Gallery Section -->
    <section class="relative py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl md:text-6xl font-black text-center mb-4">
          See What You Can
          <span
            class="bg-clip-text text-transparent"
            :style="{
              'background-image': `linear-gradient(135deg, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
            }"
          >
            Create
          </span>
        </h2>
        <p class="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Each verse card is a unique work of art, combining scripture with breathtaking visuals
        </p>

        <!-- Bento Grid Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
          <!-- Large featured card -->
          <div class="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 hover:scale-[1.02]">
            <img
              src="/assets/images/quotd-example.png"
              alt="Featured verse card example"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Smaller cards -->
          <div class="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 hover:scale-[1.02]">
            <img
              src="/assets/images/quotd-example-2.png"
              alt="Verse card example 2"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div class="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-[1.02]">
            <img
              src="/assets/images/quotd-example-3.png"
              alt="Verse card example 3"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <!-- Wide card -->
          <div class="md:col-span-3 md:row-span-1 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-pink-500/30 transition-all duration-500 hover:scale-[1.02]">
            <img
              src="/assets/images/quotd-example-4.png"
              alt="Verse card example 4"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <!-- Nature image preview -->
          <div class="md:col-span-3 md:row-span-1 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 hover:scale-[1.02]">
            <img
              src="/assets/images/core/image-006-photo-1736185597807-371cae1c7e4e.webp"
              alt="Beautiful nature background"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/80 to-pink-500/80 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="text-white text-2xl font-bold">50+ Backgrounds</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconPalette :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-3">Beautiful Typography</h3>
            <p class="text-gray-600 leading-relaxed">
              Choose from 15 carefully curated fonts, each with perfect spacing and sizing for maximum impact
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconPhoto :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-3">Stunning Imagery</h3>
            <p class="text-gray-600 leading-relaxed">
              50+ handpicked nature photographs that perfectly complement scripture and inspire reflection
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconShare :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-3">Share Instantly</h3>
            <p class="text-gray-600 leading-relaxed">
              Download high-quality images or share directly to social media with one tap
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="relative py-32 px-4 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/40 to-pink-500/40 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <h2 class="text-5xl md:text-7xl font-black mb-6">
          Start Creating
          <br />
          <span
            class="bg-clip-text text-transparent"
            :style="{
              'background-image': `linear-gradient(135deg, ${themeGradients.logo.from}, ${themeGradients.logo.to}, #a855f7)`,
            }"
          >
            Beautiful Verses
          </span>
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join others in sharing faith through art. It's free, easy, and inspiring.
        </p>

        <button
          class="group bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-5 px-12 rounded-full text-2xl font-bold flex items-center mx-auto hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-pink-500/50"
          @click="handleGetInspired"
          type="button"
        >
          Get Inspired Now
          <IconArrowRight :size="28" class="ml-3 group-hover:translate-x-1 transition-transform" />
        </button>

        <!-- Creator attribution -->
        <div class="mt-16 text-gray-500 text-sm">
          Created by
          <a href="https://mitchellwallace.dev/" class="underline hover:text-pink-500 transition-colors">
            Mitchell Wallace
          </a>
          ·
          <a href="https://ephodstudio.com/" class="underline hover:text-pink-500 transition-colors">
            Ephod Studio
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IconSparkles, IconChevronDown, IconPalette, IconPhoto, IconShare, IconArrowRight } from '@tabler/icons-vue';
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

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(15px) translateX(-15px);
  }
  66% {
    transform: translateY(-10px) translateX(10px);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
}
</style>
