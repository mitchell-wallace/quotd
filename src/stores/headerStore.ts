import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHeaderStore = defineStore('header', () => {
  const active = ref<string>('/');

  function setActive(path: string) {
    active.value = path;
  }

  return {
    active,
    setActive,
  };
});
