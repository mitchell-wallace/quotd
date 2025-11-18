import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { FontDefinitions } from '../data/FontDefinitions';
import { ImageUrlList } from '../data/ImageUrlList';
import { WordsList } from '../data/WordsList';

// Aspect ratio options
export type AspectRatio = '2:1' | '16:9' | '3:2' | '1:1' | '4:5' | '9:16';

export const ASPECT_RATIOS: Record<AspectRatio, number> = {
  '2:1': 2,
  '16:9': 16 / 9,
  '3:2': 3 / 2,
  '1:1': 1,
  '4:5': 4 / 5,
  '9:16': 9 / 16,
};

// State snapshot for history tracking
interface QuoteState {
  fontIndex: number;
  fontSize: number;
  wordsIndex: number;
  imageIndex: number;
  aspectRatio: AspectRatio;
}

// Seeded random number generator for daily randomization
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

// Get a date-based seed for daily randomization
function getDailySeed(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return year * 10000 + month * 100 + day;
}

export const useQuoteStore = defineStore('quote', () => {
  // State
  const currentFontIndex = ref(0);
  const outgoingFontIndex = ref(0);
  const isFontLoading = ref(false);
  const currentFontSize = ref(2.6);

  const outgoingImageIndex = ref(0);
  const isImageLoading = ref(false);

  const currentWordsIndex = ref(0); // Will be set by daily randomization
  const currentImageIndex = ref(0);
  const currentAspectRatio = ref<AspectRatio>('3:2');

  const maxFontSize = ref(3.2);
  const minFontSize = ref(2.0);
  const incFontSize = ref(0.2);

  // History tracking for undo/redo
  const history = ref<QuoteState[]>([]);
  const historyIndex = ref(-1);

  // Computed states for undo/redo buttons
  const canUndo = computed(() => historyIndex.value > 0);
  const canRedo = computed(() => historyIndex.value < history.value.length - 1);

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

  function setCurrentAspectRatio(ratio: AspectRatio) {
    currentAspectRatio.value = ratio;
  }

  function nextAspectRatio() {
    const ratios: AspectRatio[] = ['2:1', '16:9', '3:2', '1:1', '4:5', '9:16'];
    const currentIndex = ratios.indexOf(currentAspectRatio.value);
    const nextIndex = (currentIndex + 1) % ratios.length;
    currentAspectRatio.value = ratios[nextIndex];
  }

  function prevAspectRatio() {
    const ratios: AspectRatio[] = ['2:1', '16:9', '3:2', '1:1', '4:5', '9:16'];
    const currentIndex = ratios.indexOf(currentAspectRatio.value);
    const prevIndex = (currentIndex - 1 + ratios.length) % ratios.length;
    currentAspectRatio.value = ratios[prevIndex];
  }

  // Capture current state
  function captureState(): QuoteState {
    return {
      fontIndex: currentFontIndex.value,
      fontSize: currentFontSize.value,
      wordsIndex: currentWordsIndex.value,
      imageIndex: currentImageIndex.value,
      aspectRatio: currentAspectRatio.value,
    };
  }

  // Apply a state snapshot
  function applyState(state: QuoteState) {
    currentFontIndex.value = state.fontIndex;
    outgoingFontIndex.value = state.fontIndex;
    currentFontSize.value = state.fontSize;
    currentWordsIndex.value = state.wordsIndex;
    currentImageIndex.value = state.imageIndex;
    outgoingImageIndex.value = state.imageIndex;
    currentAspectRatio.value = state.aspectRatio;
  }

  // Check if two states are equal
  function statesEqual(a: QuoteState, b: QuoteState): boolean {
    return (
      a.fontIndex === b.fontIndex &&
      a.fontSize === b.fontSize &&
      a.wordsIndex === b.wordsIndex &&
      a.imageIndex === b.imageIndex &&
      a.aspectRatio === b.aspectRatio
    );
  }

  // Add state to history (with deduplication)
  function addToHistory(state: QuoteState) {
    // Remove any states after current index (when making changes after undo)
    history.value = history.value.slice(0, historyIndex.value + 1);

    // Check if the new state is different from the last state in history
    const lastState = history.value[history.value.length - 1];
    if (lastState && statesEqual(state, lastState)) {
      // Don't add duplicate states
      return;
    }

    // Add the new state
    history.value.push(state);
    historyIndex.value = history.value.length - 1;
  }

  // Randomize quote (non-seeded)
  function randomize() {
    // Capture state before randomization
    const beforeState = captureState();
    addToHistory(beforeState);

    // Randomize all values
    const newFontIndex = Math.floor(Math.random() * FontDefinitions.length);
    const newWordsIndex = Math.floor(Math.random() * WordsList.length);
    const newImageIndex = Math.floor(Math.random() * ImageUrlList.length);

    handleFontChange(newFontIndex);
    currentWordsIndex.value = newWordsIndex;
    handleImageChange(newImageIndex);

    // Capture state after randomization
    const afterState = captureState();
    addToHistory(afterState);
  }

  // Daily randomization with seed
  function dailyRandomize() {
    const seed = getDailySeed();
    const random = seededRandom(seed);

    const fontIndex = Math.floor(random() * FontDefinitions.length);
    const wordsIndex = Math.floor(random() * WordsList.length);
    const imageIndex = Math.floor(random() * ImageUrlList.length);

    currentFontIndex.value = fontIndex;
    outgoingFontIndex.value = fontIndex;
    currentWordsIndex.value = wordsIndex;
    currentImageIndex.value = imageIndex;
    outgoingImageIndex.value = imageIndex;

    // Initialize history with the daily state
    const initialState = captureState();
    history.value = [initialState];
    historyIndex.value = 0;
  }

  // Undo
  function undo() {
    if (!canUndo.value) return;

    historyIndex.value--;
    const state = history.value[historyIndex.value];
    applyState(state);
  }

  // Redo
  function redo() {
    if (!canRedo.value) return;

    historyIndex.value++;
    const state = history.value[historyIndex.value];
    applyState(state);
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
    currentAspectRatio,
    maxFontSize,
    minFontSize,
    incFontSize,
    canUndo,
    canRedo,
    // Actions
    setCurrentFontIndex,
    setOutgoingFontIndex,
    setIsFontLoading,
    setCurrentFontSize,
    setOutgoingImageIndex,
    setIsImageLoading,
    setCurrentWordsIndex,
    setCurrentImageIndex,
    setCurrentAspectRatio,
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
    nextAspectRatio,
    prevAspectRatio,
    randomize,
    dailyRandomize,
    undo,
    redo,
  };
});
