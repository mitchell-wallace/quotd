<template>
  <div class="text-center" data-testid="quote-layout">
    <QControls />
    <QCanvas />
    <button
      class="mt-5 inline-flex items-center justify-center min-w-[160px] px-4 py-2 bg-primary text-primary-content hover:brightness-110 rounded"
      @click="downloadQuote"
      type="button"
      data-testid="download-quote-button"
    >
      <IconDownload :size="20" class="mr-2" />
      Download
    </button>
    <DownloadFrame ref="downloadFrameRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconDownload } from '@tabler/icons-vue';
import DownloadFrame from './DownloadFrame.vue';
import { handleDownload } from './handleDownload';
import QCanvas from './QCanvas.vue';
import QControls from './QControls.vue';

const downloadFrameRef = ref<InstanceType<typeof DownloadFrame>>();

function downloadQuote() {
  if (downloadFrameRef.value?.downloadFrameRef) {
    handleDownload(downloadFrameRef.value.downloadFrameRef)();
  }
}
</script>
