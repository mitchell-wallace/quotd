<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
        @click.self="closeModal"
      >
        <div
          class="w-full max-w-md bg-white rounded-t-2xl shadow-xl animate-slide-up"
          @click.stop
        >
          <!-- Image Preview -->
          <div class="p-4 border-b border-gray-200">
            <img
              v-if="imageDataUrl"
              :src="imageDataUrl"
              alt="Quote preview"
              class="w-full h-auto rounded-lg shadow-sm"
            />
          </div>

          <!-- Options -->
          <div class="p-2">
            <button
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              @click="handleOpen"
            >
              <IconFileExport :size="24" class="text-blue-600" />
              <span class="text-lg font-medium text-gray-800">Open in app...</span>
            </button>

            <button
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              @click="handleShare"
            >
              <IconShare :size="24" class="text-green-600" />
              <span class="text-lg font-medium text-gray-800">Share</span>
            </button>

            <button
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              @click="handleDelete"
            >
              <IconTrash :size="24" class="text-red-600" />
              <span class="text-lg font-medium text-red-600">Delete</span>
            </button>
          </div>

          <!-- Cancel Button -->
          <div class="p-4 border-t border-gray-200">
            <button
              class="w-full py-3 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconShare, IconFileExport, IconTrash } from '@tabler/icons-vue';
import { Share } from '@capacitor/share';
import type { SavedImage } from '../../services/libraryService';
import { getImageUri, deleteFromLibrary, getImageDataUrl } from '../../services/libraryService';

interface Props {
  isOpen: boolean;
  image: SavedImage | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  deleted: [imageId: string];
}>();

const imageDataUrl = ref<string | null>(null);

// Load image data when modal opens
watch(
  () => props.image,
  async (newImage) => {
    if (newImage) {
      try {
        imageDataUrl.value = await getImageDataUrl(newImage);
      } catch (error) {
        console.error('Failed to load image:', error);
        imageDataUrl.value = null;
      }
    } else {
      imageDataUrl.value = null;
    }
  },
  { immediate: true },
);

function closeModal() {
  emit('close');
}

async function handleOpen() {
  if (!props.image) return;

  try {
    const uri = getImageUri(props.image);

    // Share with minimal options to trigger "Open with" dialog
    await Share.share({
      url: uri,
      dialogTitle: 'Open with',
    });

    closeModal();
  } catch (error) {
    console.error('Failed to open image:', error);
    alert('Failed to open image. Please try again.');
  }
}

async function handleShare() {
  if (!props.image) return;

  try {
    const uri = getImageUri(props.image);

    await Share.share({
      title: 'Share Quote',
      text: 'Check out this quote!',
      url: uri,
      dialogTitle: 'Share Quote',
    });

    closeModal();
  } catch (error) {
    console.error('Failed to share image:', error);
    // Don't show alert if user just cancelled the share dialog
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (!errorMessage.includes('cancelled') && !errorMessage.includes('canceled')) {
        alert('Failed to share image. Please try again.');
      }
    }
  }
}

async function handleDelete() {
  if (!props.image) return;

  const confirmed = confirm('Are you sure you want to delete this quote?');
  if (!confirmed) return;

  try {
    await deleteFromLibrary(props.image.id);
    emit('deleted', props.image.id);
    closeModal();
  } catch (error) {
    console.error('Failed to delete image:', error);
    alert('Failed to delete image. Please try again.');
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .animate-slide-up,
.modal-leave-active .animate-slide-up {
  transition: transform 0.3s ease;
}

.modal-enter-from .animate-slide-up,
.modal-leave-to .animate-slide-up {
  transform: translateY(100%);
}
</style>
