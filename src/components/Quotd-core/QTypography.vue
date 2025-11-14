<template>
  <div
    ref="boxRef"
    class="quote-typography absolute inset-0 mx-auto flex"
    :style="{
      'max-height': isDisplayVariant ? '400px' : `${(400 / 580) * 1080}px`,
      'max-width': isDisplayVariant ? '580px' : '1080px',
      padding: `${2 * viewScaleFactor}em`,
      'align-items': 'center',
      'justify-content': 'center',
    }"
  >
    <div class="flex flex-col items-center">
      <p
        class="text-center"
        :style="{
          'max-width': isDisplayVariant ? '500px' : `${(500 / 580) * 1080}px`,
          width: '80%',
          'font-family': `'${fontDefinition.fontName}', sans-serif`,
          'font-size': `${currentFontSize * fontDefinition.sizingFactor * viewScaleFactor}em`,
          color: 'white',
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.5)',
          'line-height': `${1.4 * fontDefinition.spacingFactor}`,
        }"
        :data-testid="isDisplayVariant ? 'quote-text' : undefined"
      >
        {{ words.text }}
      </p>
      <p
        class="text-center"
        :style="{
          'max-width': isDisplayVariant ? '500px' : `${(500 / 580) * 1080}px`,
          width: '80%',
          'font-family': `'${fontDefinition.fontName}', sans-serif`,
          'font-size': `${currentFontSize * fontDefinition.sizingFactor * viewScaleFactor - 0.6}em`,
          color: 'white',
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.5)',
          'line-height': `${1.4 * fontDefinition.spacingFactor}`,
        }"
        :data-testid="isDisplayVariant ? 'quote-source' : undefined"
      >
        {{ words.source }} {{ words.translation }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { WordsList } from '../../data/WordsList';
import { FontDefinitions } from '../../data/FontDefinitions';
import { loadFontByIndex } from './utils';

// Import fonts
import '@fontsource/raleway';
import '@fontsource/roboto-slab';
import '@fontsource/inconsolata';
import '@fontsource/exo-2';
import '@fontsource/maiden-orange';
import '@fontsource/lilita-one';
import '@fontsource/covered-by-your-grace';
import '@fontsource/smooch-sans';
import '@fontsource/syne-mono';
import '@fontsource/walter-turncoat';
import '@fontsource/nothing-you-could-do';
import '@fontsource/josefin-slab';
import '@fontsource/architects-daughter';
import '@fontsource/love-ya-like-a-sister';
import '@fontsource/fredericka-the-great';

interface QuoteTextProps {
  variant?: 'display' | 'download';
  currentWordsIndex: number;
  currentFontIndex: number;
  currentFontSize: number;
  outgoingFontIndex?: number;
  onFontLoaded?: () => void;
}

const props = withDefaults(defineProps<QuoteTextProps>(), {
  variant: 'display',
});

const boxRef = ref<HTMLDivElement>();
const viewScaleFactor = ref(1);

const displayFontIndex = computed(() =>
  typeof props.outgoingFontIndex === 'number' ? props.outgoingFontIndex : props.currentFontIndex
);

const fontDefinition = computed(() => FontDefinitions[displayFontIndex.value]);
const isDisplayVariant = computed(() => props.variant !== 'download');
const words = computed(() => WordsList[props.currentWordsIndex]);

// Watch for font loading
watch(
  () => [props.outgoingFontIndex, props.currentFontIndex],
  () => {
    if (props.outgoingFontIndex !== undefined && props.currentFontIndex !== props.outgoingFontIndex) {
      loadFontByIndex(props.currentFontIndex).then(() => {
        props.onFontLoaded?.();
      });
    }
  }
);

// Handle resize observer
onMounted(() => {
  if (props.variant === 'download') {
    viewScaleFactor.value = 1080 / 580;
    return;
  }

  const updateScale = () => {
    if (props.variant === 'display' && boxRef.value) {
      const scale = boxRef.value.offsetWidth / 580;
      viewScaleFactor.value = scale;
    }
  };

  const resizeObserver = new ResizeObserver(updateScale);
  if (boxRef.value) {
    resizeObserver.observe(boxRef.value);
    updateScale();
  }

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
});
</script>
