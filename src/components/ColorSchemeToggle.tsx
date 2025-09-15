import { useEffect, useState } from 'react';
import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-react';

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
  const [open, setOpen] = useState(false);
  const [scheme, setScheme] = useState<Scheme>(
    () => (localStorage.getItem('color-scheme') as Scheme) || 'auto'
  );

  useEffect(() => {
    applyScheme(scheme);
    localStorage.setItem('color-scheme', scheme);
  }, [scheme]);

  // Keep in sync when in auto mode and OS theme changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (scheme === 'auto') applyScheme('auto');
    };
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, [scheme]);

  const Icon = scheme === 'auto' ? IconBrightnessAuto : scheme === 'dark' ? IconMoon : IconSun;

  const setAndClose = (value: Scheme) => {
    setScheme(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle color scheme"
        className="border border-border rounded p-2 bg-surface text-base-content"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <Icon className="w-4 h-4" />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded shadow-md text-sm">
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('light')}
              type="button"
            >
              <IconSun className="w-4 h-4 mr-2" /> Light
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('dark')}
              type="button"
            >
              <IconMoon className="w-4 h-4 mr-2" /> Dark
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-surface-hover"
              onClick={() => setAndClose('auto')}
              type="button"
            >
              <IconBrightnessAuto className="w-4 h-4 mr-2" /> Auto
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
