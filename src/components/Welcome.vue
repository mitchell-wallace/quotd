<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden px-4 py-20 md:py-32">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            class="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
            data-testid="welcome-heading"
          >
            Create Beautiful
            <span
              class="block bg-clip-text text-transparent mt-2"
              :style="{
                'background-image': `linear-gradient(to right, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
              }"
            >
              Bible Verse Cards
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mt-8 max-w-2xl mx-auto leading-relaxed">
            Transform scripture into stunning visual cards. Share inspiration with beautiful typography and breathtaking nature imagery.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              class="bg-gradient-to-r from-primary to-tertiary text-white py-4 px-8 rounded-lg text-lg font-semibold flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-200"
              @click="handleGetInspired"
              type="button"
              data-testid="welcome-get-inspired"
            >
              Start Creating
              <IconChevronRight :size="20" class="ml-2 -mr-1" />
            </button>
            <a
              href="#examples"
              class="border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              See Examples
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Example Cards Showcase -->
    <section id="examples" class="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Inspiration in Every Card
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Each verse card combines scripture with stunning visuals, ready to share in seconds.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            v-for="(image, index) in exampleImages"
            :key="index"
            class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover aspect-[3/2]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple. Beautiful. Powerful.
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create and share inspiring verse cards.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-200"
          >
            <div
              class="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl"
              :style="{
                'background': `linear-gradient(135deg, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
              }"
            >
              {{ feature.icon }}
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Background Preview Section -->
    <section class="py-20 bg-gray-900 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            50+ Stunning Backgrounds
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from a curated collection of breathtaking nature photography.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          <div
            v-for="i in 12"
            :key="i"
            class="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-200"
          >
            <img
              :src="`/assets/images/core/image-${String(i - 1).padStart(3, '0')}-photo-${backgroundIds[i - 1]}.webp`"
              :alt="`Background ${i}`"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="text-center mt-8">
          <p class="text-gray-400">
            ...and 38 more beautiful images to choose from
          </p>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 md:py-32 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Ready to Share
          <span
            class="bg-clip-text text-transparent"
            :style="{
              'background-image': `linear-gradient(to right, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
            }"
          >
            God's Word?
          </span>
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Start creating beautiful verse cards in seconds. No design skills required.
        </p>
        <button
          class="bg-gradient-to-r from-primary to-tertiary text-white py-4 px-10 rounded-lg text-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center"
          @click="handleGetInspired"
          type="button"
        >
          Get Started Free
          <IconChevronRight :size="22" class="ml-2 -mr-1" />
        </button>

        <div class="mt-16 pt-16 border-t border-gray-200">
          <p class="text-gray-500">
            Created by
            <a href="https://ephodstudio.com/" class="text-primary hover:underline font-medium">
              Ephod Studio
            </a>
            {' '}&middot;{' '}
            <a href="https://mitchellwallace.dev/" class="text-primary hover:underline font-medium">
              Mitchell Wallace
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';

const router = useRouter();
const { setActive } = useHeaderStore();

const exampleImages = [
  {
    src: '/assets/images/hello.webp',
    alt: 'Bible verse card with mountain landscape',
  },
  {
    src: '/assets/images/leaf.webp',
    alt: 'Bible verse card with leaf close-up',
  },
];

const features = [
  {
    icon: '🎨',
    title: 'Beautiful Typography',
    description: 'Choose from 15 handpicked fonts, each optimized for readability and impact.',
  },
  {
    icon: '🖼️',
    title: '50+ Backgrounds',
    description: 'Stunning nature photography that brings your verses to life with visual depth.',
  },
  {
    icon: '⚡',
    title: 'Instant Download',
    description: 'Create and download your verse cards in seconds. Perfect for social media sharing.',
  },
];

const backgroundIds = [
  '1738584672976-3518c132482d',
  '1738249034651-1896f689be58',
  '1738395548716-522475b89043',
  '1738279494075-5183d2eadc05',
  '1737100522891-e8946ac97fd1',
  '1737917818689-f3b3708de5d7',
  '1736185597807-371cae1c7e4e',
  '1737903071772-4d20348b4d81',
  '1736849544918-6ddb5cfc2c42',
  '1737439987404-a3ee9fb95351',
  '1737403428945-c584529b7b17',
  '1705021246536-aecfad654893',
];

function handleGetInspired() {
  router.push('/app');
  setActive('/app');
}
</script>
