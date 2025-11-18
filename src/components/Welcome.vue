<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section relative overflow-hidden">
      <!-- Animated background grid -->
      <div class="absolute inset-0 grid-background opacity-30"></div>

      <div class="hero-content relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Main heading with gradient -->
          <h1
            class="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight"
            data-testid="welcome-heading"
          >
            Create Beautiful
            <span
              class="block bg-clip-text text-transparent gradient-text"
              :style="{
                'background-image': `linear-gradient(135deg, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
              }"
            >
              Bible Verse Cards
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform scripture into stunning visual quotes. Share inspiration with beautiful typography and imagery.
          </p>

          <!-- CTA Button -->
          <button
            @click="handleGetInspired"
            type="button"
            data-testid="welcome-get-inspired"
            class="cta-button group relative inline-flex items-center gap-3 px-8 py-4 text-xl font-semibold rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Start Creating</span>
            <IconChevronRight :size="24" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    <!-- Example Cards Showcase -->
    <section class="examples-section py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Share Inspiration, <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">Beautifully</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from stunning backgrounds and elegant typography to create cards that move hearts
          </p>
        </div>

        <!-- Bento grid layout for examples -->
        <div class="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(example, index) in examples"
            :key="index"
            class="example-card group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            :class="example.span"
          >
            <div class="relative aspect-[3/2] overflow-hidden">
              <img
                :src="example.src"
                :alt="example.alt"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works py-20 lg:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Simple. Powerful. Inspiring.</h2>
          <p class="text-xl text-gray-600">Create your perfect verse card in three easy steps</p>
        </div>

        <div class="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div v-for="(step, index) in steps" :key="index" class="step-card text-center group">
            <div class="mb-6 relative inline-block">
              <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span class="text-3xl font-black text-white">{{ index + 1 }}</span>
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ step.title }}</h3>
            <p class="text-gray-600 text-lg leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
          <p class="text-xl text-gray-600">Powerful features for beautiful results</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="feature-card p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-pink-500 mb-6 flex items-center justify-center">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta py-20 lg:py-32 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 relative overflow-hidden">
      <div class="absolute inset-0 grid-background opacity-20"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Create Something Beautiful?
        </h2>
        <p class="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
          Start sharing inspiration today with Quotd
        </p>

        <button
          @click="handleGetInspired"
          type="button"
          class="inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold rounded-2xl bg-white text-gray-900 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
        >
          <span>Get Started Free</span>
          <IconChevronRight :size="24" class="group-hover:translate-x-1 transition-transform" />
        </button>

        <p class="text-white/80 mt-8 text-sm">
          Built by <a href="https://ephodstudio.com/" class="underline hover:text-white transition-colors">Ephod Studio</a>
          · <a href="https://mitchellwallace.dev/" class="underline hover:text-white transition-colors">Mitchell Wallace</a>
        </p>
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

function handleGetInspired() {
  router.push('/app');
  setActive('/app');
}

const examples = [
  {
    src: '/assets/images/quotd-example.png',
    alt: 'Bible verse card with nature background',
    span: 'lg:col-span-2',
  },
  {
    src: '/assets/images/quotd-example-2.png',
    alt: 'Inspirational scripture quote card',
    span: '',
  },
  {
    src: '/assets/images/quotd-example-3.png',
    alt: 'Beautiful Bible verse with mountain scenery',
    span: '',
  },
  {
    src: '/assets/images/quotd-example-4.png',
    alt: 'Scripture card with elegant typography',
    span: 'lg:col-span-2',
  },
];

const steps = [
  {
    title: 'Choose Your Verse',
    description: 'Select from a curated collection of inspiring Bible verses across different translations',
  },
  {
    title: 'Customize Design',
    description: 'Pick from stunning backgrounds and beautiful fonts to match your message',
  },
  {
    title: 'Share & Inspire',
    description: 'Download or share your creation instantly to spread encouragement',
  },
];

const features = [
  {
    icon: '📖',
    title: 'Curated Verses',
    description: 'Carefully selected scriptures from multiple translations',
  },
  {
    icon: '🎨',
    title: 'Beautiful Backgrounds',
    description: 'Stunning nature photography and artistic imagery',
  },
  {
    icon: '✍️',
    title: 'Premium Typography',
    description: 'Elegant fonts optimized for readability and impact',
  },
  {
    icon: '📱',
    title: 'Mobile Ready',
    description: 'Perfect for social media sharing on any device',
  },
  {
    icon: '⚡',
    title: 'Instant Download',
    description: 'Export high-quality images in seconds',
  },
  {
    icon: '🎯',
    title: 'Easy to Use',
    description: 'No design experience needed - just click and create',
  },
];
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

/* Grid background pattern */
.grid-background {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

/* Gradient text animation */
.gradient-text {
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Hover effects */
.cta-button {
  position: relative;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 300ms;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(236, 72, 153, 0.3));
  filter: blur(20px);
}

.cta-button:hover::before {
  opacity: 1;
}

/* Example cards animation on scroll */
.example-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.example-card:nth-child(1) { animation-delay: 0.1s; }
.example-card:nth-child(2) { animation-delay: 0.2s; }
.example-card:nth-child(3) { animation-delay: 0.3s; }
.example-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step cards */
.step-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.step-card:nth-child(1) { animation-delay: 0.1s; }
.step-card:nth-child(2) { animation-delay: 0.2s; }
.step-card:nth-child(3) { animation-delay: 0.3s; }

/* Feature cards */
.feature-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-content {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .examples-section,
  .how-it-works,
  .features-section,
  .final-cta {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
</style>
