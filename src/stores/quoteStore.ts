import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FontDefinitions } from '../data/FontDefinitions';
import { ImageUrlList } from '../data/ImageUrlList';
import { WordsList } from '../data/WordsList';

export const useQuoteStore = defineStore('quote', () => {
  // State
  const currentFontIndex = ref(0);
  const outgoingFontIndex = ref(0);
  const isFontLoading = ref(false);
  const currentFontSize = ref(2.6);

  const outgoingImageIndex = ref(0);
  const isImageLoading = ref(false);

  const currentWordsIndex = ref(Math.floor(Math.random() * WordsList.length));
  const currentImageIndex = ref(0);

  const maxFontSize = ref(3.2);
  const minFontSize = ref(2.0);
  const incFontSize = ref(0.2);

  // Actions
  function setCurrentFontIndex(index: number) {
    currentFontIndex.value = index;
  }

  function setOutgoingFontIndex(index: number) {
    outgoingFontIndex.value = index;
  }

  function setIsFontLoading(loading: boolean) {
    isFontLoading.value = loading;
  }

  function setCurrentFontSize(size: number) {
    currentFontSize.value = size;
  }

  function setOutgoingImageIndex(index: number) {
    outgoingImageIndex.value = index;
  }

  function setIsImageLoading(loading: boolean) {
    isImageLoading.value = loading;
  }

  function setCurrentWordsIndex(index: number) {
    currentWordsIndex.value = index;
  }

  function setCurrentImageIndex(index: number) {
    currentImageIndex.value = index;
  }

  function handleFontChange(newIndex: number) {
    isFontLoading.value = true;
    currentFontIndex.value = newIndex;
  }

  function handleFontLoaded() {
    outgoingFontIndex.value = currentFontIndex.value;
    isFontLoading.value = false;
  }

  function handleImageChange(newIndex: number) {
    isImageLoading.value = true;
    currentImageIndex.value = newIndex;
  }

  function handleImageLoaded() {
    outgoingImageIndex.value = currentImageIndex.value;
    isImageLoading.value = false;
  }

  function nextFont() {
    if (isFontLoading.value) return;
    const nextIndex = (currentFontIndex.value + 1) % FontDefinitions.length;
    handleFontChange(nextIndex);
  }

  function prevFont() {
    if (isFontLoading.value) return;
    const prevIndex =
      (currentFontIndex.value - 1 + FontDefinitions.length) % FontDefinitions.length;
    handleFontChange(prevIndex);
  }

  function nextFontSize() {
    currentFontSize.value = Math.min(currentFontSize.value + incFontSize.value, maxFontSize.value);
  }

  function prevFontSize() {
    currentFontSize.value = Math.max(currentFontSize.value - incFontSize.value, minFontSize.value);
  }

  function nextWordsIndex() {
    currentWordsIndex.value = (currentWordsIndex.value + 1) % WordsList.length;
  }

  function prevWordsIndex() {
    currentWordsIndex.value = (currentWordsIndex.value - 1 + WordsList.length) % WordsList.length;
  }

  function nextImageIndex() {
    if (isImageLoading.value) return;
    const nextIndex = (currentImageIndex.value + 1) % ImageUrlList.length;
    handleImageChange(nextIndex);
  }

  function prevImageIndex() {
    if (isImageLoading.value) return;
    const prevIndex = (currentImageIndex.value - 1 + ImageUrlList.length) % ImageUrlList.length;
    handleImageChange(prevIndex);
  }

  return {
    // State
    currentFontIndex,
    outgoingFontIndex,
    isFontLoading,
    currentFontSize,
    outgoingImageIndex,
    isImageLoading,
    currentWordsIndex,
    currentImageIndex,
    maxFontSize,
    minFontSize,
    incFontSize,
    // Actions
    setCurrentFontIndex,
    setOutgoingFontIndex,
    setIsFontLoading,
    setCurrentFontSize,
    setOutgoingImageIndex,
    setIsImageLoading,
    setCurrentWordsIndex,
    setCurrentImageIndex,
    handleFontChange,
    handleFontLoaded,
    handleImageChange,
    handleImageLoaded,
    nextFont,
    prevFont,
    nextFontSize,
    prevFontSize,
    nextWordsIndex,
    prevWordsIndex,
    nextImageIndex,
    prevImageIndex,
  };
});
