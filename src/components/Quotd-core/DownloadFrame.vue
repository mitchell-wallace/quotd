<template>
  <div
    ref="downloadFrameRef"
    class="fixed -top-[10000px] -left-[10000px] overflow-hidden m-0 p-0"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <QCanvas variant="download" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QCanvas from './QCanvas.vue';

interface DownloadFrameProps {
  width?: number;
  height?: number;
}

withDefaults(defineProps<DownloadFrameProps>(), {
  width: 1080,
  height: 720,
});

const downloadFrameRef = ref<HTMLDivElement>();

defineExpose({
  downloadFrameRef,
});
</script>
