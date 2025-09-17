import { createEffect, createSignal, onCleanup } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-solidjs';

type Scheme = 'light' | 'dark' | 'auto';

function applyScheme(scheme: Scheme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = scheme === 'dark' || (scheme === 'auto' && prefersDark);
  root.classList.toggle('dark', isDark);
  // Improve native form controls rendering
  root.style.colorScheme = isDark ? 'dark' : 'light';
}

export function ColorSchemeToggle() {
  const [open, setOpen] = createSignal(false);
  const [scheme, setScheme] = createSignal<Scheme>((localStorage.getItem('color-scheme') as Scheme) || 'auto');

  createEffect(() => {
    applyScheme(scheme());
    localStorage.setItem('color-scheme', scheme());
  });

  // Keep in sync when in auto mode and OS theme changes
  createEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (scheme() === 'auto') applyScheme('auto');
    };
    mql.addEventListener?.('change', handler);
    onCleanup(() => mql.removeEventListener?.('change', handler));
  });

  const CurrentIcon = () => (scheme() === 'auto' ? IconBrightnessAuto : scheme() === 'dark' ? IconMoon : IconSun);

  const setAndClose = (value: Scheme) => {
    setScheme(value);
    setOpen(false);
  };

  return (
    <div class="relative">
      <button
        aria-label="Toggle color scheme"
        class="border border-border rounded p-2 bg-surface text-base-content"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <Dynamic component={scheme() === 'auto' ? IconBrightnessAuto : scheme() === 'dark' ? IconMoon : IconSun} />
      </button>
      {open() && (
        <ul class="absolute right-0 mt-2 w-32 bg-surface border border-border rounded shadow-md text-sm">
          <li>
            <button
              class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('light')}
              type="button"
            >
              <IconSun class="w-4 h-4 mr-2" /> Light
            </button>
          </li>
          <li>
            <button
              class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('dark')}
              type="button"
            >
              <IconMoon class="w-4 h-4 mr-2" /> Dark
            </button>
          </li>
          <li>
            <button
              class="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('auto')}
              type="button"
            >
              <IconBrightnessAuto class="w-4 h-4 mr-2" /> Auto
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
