<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Create Beautiful
          <span class="gradient-text">Bible Verse</span>
          Graphics
        </h1>
        <p class="hero-subtitle">
          Transform scripture into stunning visual inspiration. Choose from beautiful backgrounds,
          elegant fonts, and hundreds of verses to create shareable images in seconds.
        </p>
        <button
          class="cta-button"
          @click="handleGetStarted"
          type="button"
          data-testid="hero-cta"
        >
          Start Creating
          <IconSparkles :size="20" class="ml-2" />
        </button>
      </div>
      <div class="hero-image">
        <img
          src="/assets/images/quotd-example.png"
          alt="Example verse card"
          class="featured-card"
        />
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section">
      <h2 class="section-title">Your verses, beautifully designed</h2>
      <p class="section-subtitle">
        Every card is crafted with care — choose your style, pick your verse, and share your faith.
      </p>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="(image, index) in exampleImages" :key="index">
          <img :src="image" :alt="`Example verse card ${index + 1}`" class="gallery-image" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2 class="section-title">Everything you need to inspire</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <IconPhoto :size="32" />
          </div>
          <h3 class="feature-title">50+ Beautiful Backgrounds</h3>
          <p class="feature-description">
            Curated nature photography that brings your verses to life with stunning visuals.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <IconTypography :size="32" />
          </div>
          <h3 class="feature-title">15 Premium Fonts</h3>
          <p class="feature-description">
            Carefully selected typography that ensures your message is both beautiful and readable.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <IconBook :size="32" />
          </div>
          <h3 class="feature-title">Hundreds of Verses</h3>
          <p class="feature-description">
            An extensive library of biblical quotes across multiple translations to choose from.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <IconDownload :size="32" />
          </div>
          <h3 class="feature-title">Instant Download</h3>
          <p class="feature-description">
            Export high-quality images ready to share on social media or print.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Ready to get started?</h2>
        <p class="cta-subtitle">Create your first verse card in less than a minute.</p>
        <button
          class="cta-button-secondary"
          @click="handleGetStarted"
          type="button"
          data-testid="cta-bottom"
        >
          Get Inspired
          <IconChevronRight :size="20" class="ml-2" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IconChevronRight, IconSparkles, IconPhoto, IconTypography, IconBook, IconDownload } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';

const router = useRouter();
const { setActive } = useHeaderStore();

const exampleImages = [
  '/assets/images/quotd-example.png',
  '/assets/images/quotd-example-2.png',
  '/assets/images/quotd-example-3.png',
  '/assets/images/quotd-example-4.png',
];

function handleGetStarted() {
  router.push('/app');
  setActive('/app');
}
</script>

<style scoped>
.landing-page {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  min-height: calc(100vh - 120px);
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1f2937;
}

.gradient-text {
  display: block;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #6b7280;
  max-width: 540px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%);
  background-size: 200% 200%;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: fit-content;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: gradientShift 2s ease infinite;
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.featured-card {
  width: 100%;
  max-width: 500px;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

.featured-card:hover {
  transform: scale(1.02) rotate(1deg);
}

/* Gallery Section */
.gallery-section {
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  padding: 6rem 2rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.25rem;
  text-align: center;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #fbbf24;
  box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.1), 0 4px 6px -2px rgba(251, 191, 36, 0.05);
  transform: translateY(-2px);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #f59e0b;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  padding: 6rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
}

.cta-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  background: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cta-button-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: #fbbf24;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1.5rem;
    min-height: auto;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-image {
    order: -1;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-subtitle {
    font-size: 1rem;
  }

  .gallery-section,
  .features-section,
  .cta-section {
    padding: 4rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .cta-button,
  .cta-button-secondary {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>
