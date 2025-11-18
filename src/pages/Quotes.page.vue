<template>
  <QLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuoteStore, type AspectRatio } from '../stores/quoteStore';
import QLayout from '../components/Quotd-core/QLayout.vue';

const route = useRoute();
const quoteStore = useQuoteStore();

onMounted(() => {
  // Check for shared quote parameters in URL
  const { font, size, words, image, ratio } = route.query;

  // If no URL params are present, apply daily randomization
  const hasUrlParams = font !== undefined || size !== undefined || words !== undefined || image !== undefined || ratio !== undefined;

  if (!hasUrlParams) {
    // Apply daily seed-based randomization
    quoteStore.dailyRandomize();
  } else {
    // Load from URL params
    if (font !== undefined) {
      const fontIndex = parseInt(font as string, 10);
      if (!isNaN(fontIndex)) {
        quoteStore.setCurrentFontIndex(fontIndex);
        quoteStore.setOutgoingFontIndex(fontIndex);
      }
    }

    if (size !== undefined) {
      const fontSize = parseFloat(size as string);
      if (!isNaN(fontSize)) {
        quoteStore.setCurrentFontSize(fontSize);
      }
    }

    if (words !== undefined) {
      const wordsIndex = parseInt(words as string, 10);
      if (!isNaN(wordsIndex)) {
        quoteStore.setCurrentWordsIndex(wordsIndex);
      }
    }

    if (image !== undefined) {
      const imageIndex = parseInt(image as string, 10);
      if (!isNaN(imageIndex)) {
        quoteStore.setCurrentImageIndex(imageIndex);
        quoteStore.setOutgoingImageIndex(imageIndex);
      }
    }

    if (ratio !== undefined) {
      const validRatios: AspectRatio[] = ['2:1', '16:9', '3:2', '1:1', '4:5', '9:16'];
      const aspectRatio = ratio as string;
      if (validRatios.includes(aspectRatio as AspectRatio)) {
        quoteStore.setCurrentAspectRatio(aspectRatio as AspectRatio);
      }
    }
  }
});
</script>
