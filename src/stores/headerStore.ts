import { create } from 'zustand';

interface HeaderState {
  active: string;
  setActive: (path: string) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  active: '/',
  setActive: (path) => set({ active: path }),
}));
