import { create } from 'zustand';
import { FontDefinitions } from '../data/FontDefinitions';
import { ImageUrlList } from '../data/ImageUrlList';
import { WordsList } from '../data/WordsList';

interface QuoteState {
  // Font state
  currentFontIndex: number;
  outgoingFontIndex: number;
  isFontLoading: boolean;
  currentFontSize: number;

  // Image state
  outgoingImageIndex: number;
  isImageLoading: boolean;

  // Content state
  currentWordsIndex: number;
  currentImageIndex: number;

  // Font size constraints
  maxFontSize: number;
  minFontSize: number;
  incFontSize: number;

  // Actions
  setCurrentFontIndex: (index: number) => void;
  setOutgoingFontIndex: (index: number) => void;
  setIsFontLoading: (loading: boolean) => void;
  setCurrentFontSize: (size: number) => void;
  setOutgoingImageIndex: (index: number) => void;
  setIsImageLoading: (loading: boolean) => void;
  setCurrentWordsIndex: (index: number) => void;
  setCurrentImageIndex: (index: number) => void;

  // Helper actions that combine multiple state updates
  handleFontChange: (newIndex: number) => void;
  handleFontLoaded: () => void;
  handleImageChange: (newIndex: number) => void;
  handleImageLoaded: () => void;
  nextFont: () => void;
  prevFont: () => void;
  nextFontSize: () => void;
  prevFontSize: () => void;
  nextWordsIndex: () => void;
  prevWordsIndex: () => void;
  nextImageIndex: () => void;
  prevImageIndex: () => void;
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  // Initialize state
  currentFontIndex: 0,
  outgoingFontIndex: 0,
  isFontLoading: false,
  currentFontSize: 2.6,
  outgoingImageIndex: 0,
  isImageLoading: false,
  currentWordsIndex: Math.floor(Math.random() * WordsList.length),
  currentImageIndex: 0,

  // Font size constraints
  maxFontSize: 3.2,
  minFontSize: 2.0,
  incFontSize: 0.2,

  // Basic setter actions
  setCurrentFontIndex: (index) => set({ currentFontIndex: index }),
  setOutgoingFontIndex: (index) => set({ outgoingFontIndex: index }),
  setIsFontLoading: (loading) => set({ isFontLoading: loading }),
  setCurrentFontSize: (size) => set({ currentFontSize: size }),
  setOutgoingImageIndex: (index) => set({ outgoingImageIndex: index }),
  setIsImageLoading: (loading) => set({ isImageLoading: loading }),
  setCurrentWordsIndex: (index) => set({ currentWordsIndex: index }),
  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),

  // Helper actions
  handleFontChange: (newIndex) => {
    set({
      isFontLoading: true,
      currentFontIndex: newIndex,
    });
  },

  handleFontLoaded: () => {
    const { currentFontIndex } = get();
    set({
      outgoingFontIndex: currentFontIndex,
      isFontLoading: false,
    });
  },

  handleImageChange: (newIndex) => {
    set({
      isImageLoading: true,
      currentImageIndex: newIndex,
    });
  },

  handleImageLoaded: () => {
    const { currentImageIndex } = get();
    set({
      outgoingImageIndex: currentImageIndex,
      isImageLoading: false,
    });
  },

  nextFont: () => {
    const { currentFontIndex, isFontLoading, handleFontChange } = get();
    if (isFontLoading) {
      return;
    }
    const nextIndex = (currentFontIndex + 1) % FontDefinitions.length;
    handleFontChange(nextIndex);
  },

  prevFont: () => {
    const { currentFontIndex, isFontLoading, handleFontChange } = get();
    if (isFontLoading) {
      return;
    }
    const prevIndex = (currentFontIndex - 1 + FontDefinitions.length) % FontDefinitions.length;
    handleFontChange(prevIndex);
  },

  nextFontSize: () => {
    const { currentFontSize, maxFontSize, incFontSize } = get();
    set({
      currentFontSize: Math.min(currentFontSize + incFontSize, maxFontSize),
    });
  },

  prevFontSize: () => {
    const { currentFontSize, minFontSize, incFontSize } = get();
    set({
      currentFontSize: Math.max(currentFontSize - incFontSize, minFontSize),
    });
  },

  nextWordsIndex: () => {
    const { currentWordsIndex } = get();
    set({
      currentWordsIndex: (currentWordsIndex + 1) % WordsList.length,
    });
  },

  prevWordsIndex: () => {
    const { currentWordsIndex } = get();
    set({
      currentWordsIndex: (currentWordsIndex - 1 + WordsList.length) % WordsList.length,
    });
  },

  nextImageIndex: () => {
    const { currentImageIndex, isImageLoading, handleImageChange } = get();
    if (isImageLoading) {
      return;
    }
    const nextIndex = (currentImageIndex + 1) % ImageUrlList.length;
    handleImageChange(nextIndex);
  },

  prevImageIndex: () => {
    const { currentImageIndex, isImageLoading, handleImageChange } = get();
    if (isImageLoading) {
      return;
    }
    const prevIndex = (currentImageIndex - 1 + ImageUrlList.length) % ImageUrlList.length;
    handleImageChange(prevIndex);
  },
}));
