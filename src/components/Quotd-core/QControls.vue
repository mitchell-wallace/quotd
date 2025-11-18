<template>
  <div class="flex flex-col gap-4 max-w-[580px] mx-auto" data-testid="quote-controls">
    <!-- Randomize and Undo/Redo controls -->
    <div class="flex flex-wrap justify-center gap-4">
      <button
        type="button"
        @click="qs.undo"
        :disabled="!qs.canUndo"
        class="inline-flex items-center justify-center px-4 py-2 bg-surface text-base-content hover:bg-surface-hover rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="undo-button"
        aria-label="Undo"
      >
        <IconArrowBack :size="20" class="mr-2" />
        Undo
      </button>
      <button
        type="button"
        @click="qs.randomize"
        class="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-content hover:brightness-110 rounded"
        data-testid="randomize-button"
        aria-label="Randomize"
      >
        <IconDice :size="20" class="mr-2" />
        Randomize
      </button>
      <button
        type="button"
        @click="qs.redo"
        :disabled="!qs.canRedo"
        class="inline-flex items-center justify-center px-4 py-2 bg-surface text-base-content hover:bg-surface-hover rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="redo-button"
        aria-label="Redo"
      >
        Redo
        <IconArrowForward :size="20" class="ml-2" />
      </button>
    </div>

    <!-- Standard controls -->
    <div class="flex flex-wrap justify-center gap-4">
      <SplitButton
        buttonText="Font"
        :prevAction="prevFont"
        :nextAction="nextFont"
        iconStyle="arrows"
        :loading="qs.isFontLoading"
        idPrefix="font-control"
      />
      <SplitButton
        buttonText="Font Size"
        :prevAction="prevFontSize"
        :nextAction="nextFontSize"
        iconStyle="plusminus"
        idPrefix="font-size-control"
      />
      <SplitButton
        buttonText="Words"
        :prevAction="prevWordsIndex"
        :nextAction="nextWordsIndex"
        iconStyle="arrows"
        idPrefix="words-control"
      />
      <SplitButton
        buttonText="Image"
        :prevAction="prevImageIndex"
        :nextAction="nextImageIndex"
        iconStyle="arrows"
        :loading="qs.isImageLoading"
        idPrefix="image-control"
      />
      <SplitButton
        :buttonText="qs.currentAspectRatio"
        :prevAction="prevAspectRatio"
        :nextAction="nextAspectRatio"
        iconStyle="arrows"
        idPrefix="aspect-ratio-control"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconDice, IconArrowBack, IconArrowForward } from '@tabler/icons-vue';
import { useQuoteStore } from '../../stores/quoteStore';
import SplitButton from '../SplitButton.vue';

const qs = useQuoteStore();
const {
  nextFont,
  prevFont,
  nextFontSize,
  prevFontSize,
  nextWordsIndex,
  prevWordsIndex,
  nextImageIndex,
  prevImageIndex,
  nextAspectRatio,
  prevAspectRatio,
} = qs;
</script>
