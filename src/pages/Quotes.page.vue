<template>
  <QLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuoteStore } from '../stores/quoteStore';
import QLayout from '../components/Quotd-core/QLayout.vue';

const route = useRoute();
const quoteStore = useQuoteStore();

onMounted(() => {
  // Check for shared quote parameters in URL
  const { font, size, words, image } = route.query;

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
});
</script>
