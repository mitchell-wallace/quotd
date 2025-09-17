import { createStore } from 'solid-js/store';
import { FontDefinitions } from '../data/FontDefinitions';
import { ImageUrlList } from '../data/ImageUrlList';
import { WordsList } from '../data/WordsList';

type QuoteState = {
  currentFontIndex: number;
  outgoingFontIndex: number;
  isFontLoading: boolean;
  currentFontSize: number;

  outgoingImageIndex: number;
  isImageLoading: boolean;

  currentWordsIndex: number;
  currentImageIndex: number;

  maxFontSize: number;
  minFontSize: number;
  incFontSize: number;
};

const [state, set] = createStore<QuoteState>({
  currentFontIndex: 0,
  outgoingFontIndex: 0,
  isFontLoading: false,
  currentFontSize: 2.6,
  outgoingImageIndex: 0,
  isImageLoading: false,
  currentWordsIndex: Math.floor(Math.random() * WordsList.length),
  currentImageIndex: 0,

  maxFontSize: 3.2,
  minFontSize: 2.0,
  incFontSize: 0.2,
});

const actions = {
  setCurrentFontIndex(index: number) {
    set('currentFontIndex', index);
  },
  setOutgoingFontIndex(index: number) {
    set('outgoingFontIndex', index);
  },
  setIsFontLoading(loading: boolean) {
    set('isFontLoading', loading);
  },
  setCurrentFontSize(size: number) {
    set('currentFontSize', size);
  },
  setOutgoingImageIndex(index: number) {
    set('outgoingImageIndex', index);
  },
  setIsImageLoading(loading: boolean) {
    set('isImageLoading', loading);
  },
  setCurrentWordsIndex(index: number) {
    set('currentWordsIndex', index);
  },
  setCurrentImageIndex(index: number) {
    set('currentImageIndex', index);
  },

  handleFontChange(newIndex: number) {
    set({ isFontLoading: true, currentFontIndex: newIndex });
  },
  handleFontLoaded() {
    set({ outgoingFontIndex: state.currentFontIndex, isFontLoading: false });
  },
  handleImageChange(newIndex: number) {
    set({ isImageLoading: true, currentImageIndex: newIndex });
  },
  handleImageLoaded() {
    set({ outgoingImageIndex: state.currentImageIndex, isImageLoading: false });
  },
  nextFont() {
    if (state.isFontLoading) return;
    const nextIndex = (state.currentFontIndex + 1) % FontDefinitions.length;
    actions.handleFontChange(nextIndex);
  },
  prevFont() {
    if (state.isFontLoading) return;
    const prevIndex = (state.currentFontIndex - 1 + FontDefinitions.length) % FontDefinitions.length;
    actions.handleFontChange(prevIndex);
  },
  nextFontSize() {
    set('currentFontSize', Math.min(state.currentFontSize + state.incFontSize, state.maxFontSize));
  },
  prevFontSize() {
    set('currentFontSize', Math.max(state.currentFontSize - state.incFontSize, state.minFontSize));
  },
  nextWordsIndex() {
    set('currentWordsIndex', (state.currentWordsIndex + 1) % WordsList.length);
  },
  prevWordsIndex() {
    set('currentWordsIndex', (state.currentWordsIndex - 1 + WordsList.length) % WordsList.length);
  },
  nextImageIndex() {
    if (state.isImageLoading) return;
    const nextIndex = (state.currentImageIndex + 1) % ImageUrlList.length;
    actions.handleImageChange(nextIndex);
  },
  prevImageIndex() {
    if (state.isImageLoading) return;
    const prevIndex = (state.currentImageIndex - 1 + ImageUrlList.length) % ImageUrlList.length;
    actions.handleImageChange(prevIndex);
  },
};

export function useQuoteStore() {
  // Expose state via getters to preserve reactivity when read in JSX
  return {
    // state (as getters)
    get currentFontIndex() {
      return state.currentFontIndex;
    },
    get outgoingFontIndex() {
      return state.outgoingFontIndex;
    },
    get isFontLoading() {
      return state.isFontLoading;
    },
    get currentFontSize() {
      return state.currentFontSize;
    },
    get outgoingImageIndex() {
      return state.outgoingImageIndex;
    },
    get isImageLoading() {
      return state.isImageLoading;
    },
    get currentWordsIndex() {
      return state.currentWordsIndex;
    },
    get currentImageIndex() {
      return state.currentImageIndex;
    },
    get maxFontSize() {
      return state.maxFontSize;
    },
    get minFontSize() {
      return state.minFontSize;
    },
    get incFontSize() {
      return state.incFontSize;
    },

    // actions
    ...actions,
  } as const;
}
