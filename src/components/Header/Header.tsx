import { useEffect, useRef, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const links = [
  { link: '/', label: 'Home' },
  { link: '/app', label: 'App' },
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
];

export function Header() {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const { active, setActive } = useHeaderStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, setActive]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLinkClick = (path: string) => {
    setActive(path);
    setOpened(false);
  };

  const items = links.map((link) => {
    const base = 'px-3 py-2 rounded text-sm font-medium';
    const activeClass =
      active === link.link
        ? 'bg-secondary-500 text-white'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700';
    const className = `${base} ${activeClass}`;

    if (link.link.startsWith('http')) {
      return (
        <a
          key={link.label}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={() => setOpened(false)}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={className}
        onClick={() => handleLinkClick(link.link)}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header
      className="h-14 mb-8 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
      ref={ref}
    >
      <div className="max-w-md mx-auto h-full flex items-center justify-between px-4">
        <h1
          className="text-xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
          }}
        >
          Quotd.
        </h1>
        <nav className="hidden xs:flex gap-1">{items}</nav>
        <div className="flex items-center gap-2">
          <ColorSchemeToggle />
          <button
            className="xs:hidden p-2"
            onClick={() => setOpened((o) => !o)}
            aria-label="Toggle navigation"
            type="button"
          >
            {opened ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>
      {opened && (
        <div className="xs:hidden absolute left-0 right-0 top-14 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 flex flex-col gap-2 p-4 z-50">
          {items}
        </div>
      )}
    </header>
  );
}
