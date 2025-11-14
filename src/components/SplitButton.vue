<template>
  <div class="inline-flex">
    <button
      type="button"
      @click="prevAction"
      :disabled="isLoading"
      class="border border-border rounded-l px-3 py-2 bg-surface text-base-content hover:bg-surface-hover disabled:opacity-50"
      :data-testid="prevButtonTestId"
      :aria-label="`${buttonText} previous`"
    >
      <IconChevronLeft v-if="iconStyle === 'arrows'" :size="20" />
      <IconMinus v-else :size="20" />
    </button>
    <div class="flex items-center justify-center border-y border-border px-4 min-w-[120px] text-sm bg-surface text-base-content">
      <svg v-if="isLoading" class="animate-spin h-4 w-4 text-muted" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <template v-else>{{ buttonText }}</template>
    </div>
    <button
      type="button"
      @click="nextAction"
      :disabled="isLoading"
      class="border border-border rounded-r px-3 py-2 bg-surface text-base-content hover:bg-surface-hover disabled:opacity-50"
      :data-testid="nextButtonTestId"
      :aria-label="`${buttonText} next`"
    >
      <IconChevronRight v-if="iconStyle === 'arrows'" :size="20" />
      <IconPlus v-else :size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-vue';

interface SplitButtonProps {
  buttonText: string;
  prevAction: () => void;
  nextAction: () => void;
  iconStyle: 'arrows' | 'plusminus';
  loading?: boolean;
  idPrefix?: string;
}

const props = defineProps<SplitButtonProps>();

const prevButtonTestId = computed(() => (props.idPrefix ? `${props.idPrefix}-prev` : undefined));
const nextButtonTestId = computed(() => (props.idPrefix ? `${props.idPrefix}-next` : undefined));
const isLoading = computed(() => props.loading ?? false);
</script>
