import { createSignal } from 'solid-js';

const [active, _setActive] = createSignal<string>('/');

export function useHeaderStore() {
  return {
    active,
    setActive: (path: string) => _setActive(path),
  } as const;
}
