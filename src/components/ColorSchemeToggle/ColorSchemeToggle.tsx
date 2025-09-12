import { useEffect, useState } from 'react';
import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-react';

type Scheme = 'light' | 'dark' | 'auto';

function applyScheme(scheme: Scheme) {
  const root = document.documentElement;
  if (scheme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  } else {
    root.classList.toggle('dark', scheme === 'dark');
  }
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

  const Icon = scheme === 'auto' ? IconBrightnessAuto : scheme === 'dark' ? IconMoon : IconSun;

  const setAndClose = (value: Scheme) => {
    setScheme(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle color scheme"
        className="border rounded p-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <Icon className="w-4 h-4" />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 border rounded shadow-md text-sm">
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => setAndClose('light')}
              type="button"
            >
              <IconSun className="w-4 h-4 mr-2" /> Light
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => setAndClose('dark')}
              type="button"
            >
              <IconMoon className="w-4 h-4 mr-2" /> Dark
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
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
