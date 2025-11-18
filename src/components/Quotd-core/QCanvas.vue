<template>
  <div
    :class="`relative ${variant === 'download' ? '' : 'mt-[30px]'}`"
    :data-testid="isDisplayVariant ? 'quote-canvas-wrapper' : undefined"
  >
    <!-- Outer 1:1 container for layout consistency -->
    <div
      class="relative mx-auto w-full"
      :style="{
        'max-width': variant === 'display' ? '580px' : '1080px',
        'aspect-ratio': '1 / 1',
      }"
    >
      <!-- Inner canvas with selected aspect ratio -->
      <div
        class="relative mx-auto w-full h-full flex items-center justify-center"
      >
        <div
          class="relative w-full"
          :style="{
            'aspect-ratio': aspectRatioValue,
            'max-height': '100%',
          }"
          :data-testid="isDisplayVariant ? 'quote-canvas' : undefined"
        >
          <QImage
            :currentImageIndex="qs.currentImageIndex"
            :variant="variant"
            :outgoingImageIndex="qs.isImageLoading ? qs.outgoingImageIndex : undefined"
            :onImageLoaded="qs.handleImageLoaded"
          >
            <QTypography
              :variant="variant"
              :currentWordsIndex="qs.currentWordsIndex"
              :currentFontIndex="qs.currentFontIndex"
              :currentFontSize="qs.currentFontSize"
              :outgoingFontIndex="qs.isFontLoading ? qs.outgoingFontIndex : undefined"
              :onFontLoaded="qs.handleFontLoaded"
            />
          </QImage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuoteStore, ASPECT_RATIOS } from '../../stores/quoteStore';
import QImage from './QImage.vue';
import QTypography from './QTypography.vue';

interface QCanvasProps {
  variant?: 'display' | 'download';
}

const props = withDefaults(defineProps<QCanvasProps>(), {
  variant: 'display',
});

const qs = useQuoteStore();
const variant = computed(() => props.variant);
const isDisplayVariant = computed(() => props.variant === 'display');

const aspectRatioValue = computed(() => {
  const ratio = ASPECT_RATIOS[qs.currentAspectRatio];
  return `${ratio} / 1`;
});
</script>
