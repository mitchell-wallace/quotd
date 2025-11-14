<template>
  <div
    :class="`relative ${variant === 'download' ? '' : 'mt-[30px]'}`"
    :data-testid="isDisplayVariant ? 'quote-canvas-wrapper' : undefined"
  >
    <div
      class="relative mx-auto w-full"
      :style="{
        'max-width': variant === 'display' ? '580px' : '1080px',
        'aspect-ratio': '3 / 2',
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuoteStore } from '../../stores/quoteStore';
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
</script>
