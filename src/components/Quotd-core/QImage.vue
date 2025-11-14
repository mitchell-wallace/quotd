<template>
  <div
    class="relative h-full w-full"
    :style="{
      'max-height': isDisplayVariant ? '400px' : undefined,
      'max-width': isDisplayVariant ? '580px' : undefined,
      width: isDisplayVariant ? '100%' : '1080px',
      height: isDisplayVariant ? '100%' : '720px',
    }"
  >
    <img
      :class="`mx-auto h-full w-full object-cover ${isDisplayVariant ? 'rounded-md' : ''}`"
      :src="ImageUrlList[displayImageIndex]"
      alt="Inspirational nature image"
      style="filter: brightness(0.7)"
      :data-testid="isDisplayVariant ? 'quote-image' : undefined"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { ImageUrlList } from '../../data/ImageUrlList';
import { loadImageByUrl } from './utils';

interface QuoteImageProps {
  currentImageIndex: number;
  variant?: 'display' | 'download';
  outgoingImageIndex?: number;
  onImageLoaded?: () => void;
}

const props = withDefaults(defineProps<QuoteImageProps>(), {
  variant: 'display',
});

const displayImageIndex = computed(() =>
  typeof props.outgoingImageIndex === 'number' ? props.outgoingImageIndex : props.currentImageIndex
);

const isDisplayVariant = computed(() => props.variant === 'display');

// Watch for image loading
watch(
  () => [props.outgoingImageIndex, props.currentImageIndex],
  () => {
    if (props.outgoingImageIndex !== undefined && props.currentImageIndex !== props.outgoingImageIndex) {
      const imageUrl = ImageUrlList[props.currentImageIndex];

      loadImageByUrl(imageUrl)
        .then(() => {
          props.onImageLoaded?.();
        })
        .catch((error) => {
          console.warn('Image loading failed:', error);
          props.onImageLoaded?.();
        });
    }
  }
);
</script>
