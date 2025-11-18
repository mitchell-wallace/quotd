<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-800">
          Library
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          {{ images.length }} {{ images.length === 1 ? 'quote' : 'quotes' }} saved
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center py-20"
    >
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading library...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="images.length === 0"
      class="flex items-center justify-center py-20 px-6"
    >
      <div class="text-center max-w-md">
        <IconPhotoOff class="w-20 h-20 mx-auto text-gray-400 mb-4" />
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          No quotes saved yet
        </h2>
        <p class="text-gray-600">
          Quotes you download will appear here. Go to the App tab to create and save your first quote!
        </p>
      </div>
    </div>

    <!-- Grid of Images -->
    <div
      v-else
      class="max-w-7xl mx-auto px-4 py-6"
    >
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="image in images"
          :key="image.id"
          class="relative aspect-[3/2] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
          @click="openImageOptions(image)"
        >
          <img
            :src="imagePreviews[image.id]"
            :alt="`Quote saved on ${formatDate(image.timestamp)}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
            <p class="text-xs text-white font-medium">
              {{ formatDate(image.timestamp) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Options Modal -->
    <ImageOptionsModal
      :is-open="isModalOpen"
      :image="selectedImage"
      @close="closeModal"
      @deleted="handleImageDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IconPhotoOff } from '@tabler/icons-vue';
import { listLibraryImages, getImageDataUrl, type SavedImage } from '../services/libraryService';
import ImageOptionsModal from '../components/Library/ImageOptionsModal.vue';

const images = ref<SavedImage[]>([]);
const imagePreviews = ref<Record<string, string>>({});
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedImage = ref<SavedImage | null>(null);

onMounted(async () => {
  await loadLibrary();
});

async function loadLibrary() {
  isLoading.value = true;
  try {
    images.value = await listLibraryImages();

    // Load previews for all images
    await loadImagePreviews();
  } catch (error) {
    console.error('Failed to load library:', error);
    alert('Failed to load library. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

async function loadImagePreviews() {
  for (const image of images.value) {
    try {
      const dataUrl = await getImageDataUrl(image);
      imagePreviews.value[image.id] = dataUrl;
    } catch (error) {
      console.error(`Failed to load preview for image ${image.id}:`, error);
    }
  }
}

function openImageOptions(image: SavedImage) {
  selectedImage.value = image;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedImage.value = null;
}

function handleImageDeleted(imageId: string) {
  // Remove the deleted image from the list
  images.value = images.value.filter(img => img.id !== imageId);
  delete imagePreviews.value[imageId];
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
}
</script>
