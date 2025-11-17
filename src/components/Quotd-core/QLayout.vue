<template>
  <div class="text-center" data-testid="quote-layout">
    <QControls />
    <QCanvas />
    <div class="mt-5 flex gap-3 justify-center">
      <button
        class="inline-flex items-center justify-center min-w-[160px] px-4 py-2 bg-primary text-primary-content hover:brightness-110 rounded"
        @click="downloadQuote"
        type="button"
        data-testid="download-quote-button"
      >
        <IconDownload :size="20" class="mr-2" />
        Download
      </button>
      <button
        class="inline-flex items-center justify-center min-w-[160px] px-4 py-2 bg-secondary text-secondary-content hover:brightness-110 rounded"
        @click="shareQuote"
        type="button"
        data-testid="share-quote-button"
      >
        <IconShare :size="20" class="mr-2" />
        {{ shareButtonText }}
      </button>
    </div>
    <DownloadFrame ref="downloadFrameRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconDownload, IconShare } from '@tabler/icons-vue';
import { Capacitor } from '@capacitor/core';
import { useQuoteStore } from '../../stores/quoteStore';
import DownloadFrame from './DownloadFrame.vue';
import { handleDownload } from './handleDownload';
import { handleShare } from './handleShare';
import QCanvas from './QCanvas.vue';
import QControls from './QControls.vue';

const downloadFrameRef = ref<InstanceType<typeof DownloadFrame>>();
const quoteStore = useQuoteStore();
const isShareCopied = ref(false);

const shareButtonText = computed(() => {
  return isShareCopied.value ? 'Copied to clipboard!' : 'Share';
});

function downloadQuote() {
  if (downloadFrameRef.value?.downloadFrameRef) {
    handleDownload(downloadFrameRef.value.downloadFrameRef)();
  }
}

async function shareQuote() {
  if (!downloadFrameRef.value?.downloadFrameRef) {
    return;
  }

  try {
    const resetCallback = await handleShare({
      downloadFrameEl: downloadFrameRef.value.downloadFrameRef,
      fontIndex: quoteStore.currentFontIndex,
      fontSize: quoteStore.currentFontSize,
      wordsIndex: quoteStore.currentWordsIndex,
      imageIndex: quoteStore.currentImageIndex,
    })();

    // Only show "Copied to clipboard!" feedback on web (non-native platforms)
    if (!Capacitor.isNativePlatform()) {
      isShareCopied.value = true;

      // Reset after 5 seconds
      setTimeout(() => {
        isShareCopied.value = false;
        resetCallback();
      }, 5000);
    } else {
      // On native, just run the reset callback immediately (no copied-to-clipboard UI)
      resetCallback();
    }
  } catch (error) {
    console.error('Failed to share quote:', error);
    alert('Failed to share quote. Please try again.');
  }
}
</script>
