import { useEffect, useRef, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';
import { ColorSchemeToggle } from './ColorSchemeToggle';

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

  const renderLink = (link: (typeof links)[number], context: 'desktop' | 'mobile') => {
    const linkIdBase = `header-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`;
    const linkId = context === 'desktop' ? linkIdBase : `${linkIdBase}-${context}`;
    const base = 'px-3 py-2 rounded text-sm font-medium text-muted';
    const activeClass =
      active === link.link
        ? 'bg-primary text-primary-content'
        : 'hover:bg-surface-hover';
    const className = `${base} ${activeClass}`;

    if (link.link.startsWith('http')) {
      return (
        <a
          key={`${context}-${link.label}`}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          data-testid={linkId}
          onClick={() => setOpened(false)}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={`${context}-${link.label}`}
        to={link.link}
        className={className}
        data-testid={linkId}
        onClick={() => handleLinkClick(link.link)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className="w-full h-14 mb-8 surface border-t-0 border-x-0"
      ref={ref}
      data-testid="app-header"
    >
      <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-testid="header-logo"
        >
          Quotd.
        </h1>
        <nav className="hidden sm:flex gap-1" data-testid="header-navigation">
          {links.map((link) => renderLink(link, 'desktop'))}
        </nav>
        <div className="flex items-center gap-2">
          <ColorSchemeToggle />
          <button
            className="sm:hidden p-2 border border-border rounded bg-surface hover:bg-surface-hover"
            onClick={() => setOpened((o) => !o)}
            aria-label="Toggle navigation"
            type="button"
            data-testid="header-menu-toggle"
          >
            {opened ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>
      {opened && (
        <div
          className="sm:hidden absolute left-0 right-0 top-14 bg-surface border-b border-border flex flex-col gap-2 p-4 z-50"
          data-testid="header-mobile-menu"
        >
          {links.map((link) => renderLink(link, 'mobile'))}
        </div>
      )}
    </header>
  );
}
