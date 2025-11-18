<template>
  <div
    ref="downloadFrameRef"
    class="fixed -top-[10000px] -left-[10000px] overflow-hidden m-0 p-0"
    :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
  >
    <QCanvas variant="download" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuoteStore, ASPECT_RATIOS } from '../../stores/quoteStore';
import QCanvas from './QCanvas.vue';

interface DownloadFrameProps {
  containerSize?: number;
}

const props = withDefaults(defineProps<DownloadFrameProps>(), {
  containerSize: 1080,
});

const quoteStore = useQuoteStore();
const downloadFrameRef = ref<HTMLDivElement>();

// The container is always 1:1, matching the display behavior
// The canvas inside will use the selected aspect ratio
const aspectRatio = computed(() => ASPECT_RATIOS[quoteStore.currentAspectRatio]);

defineExpose({
  downloadFrameRef,
});
</script>
