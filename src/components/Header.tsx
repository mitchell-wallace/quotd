import { createEffect, createSignal, onCleanup } from 'solid-js';
import { IconMenu2, IconX } from '@tabler/icons-solidjs';
import { A, useLocation } from '@solidjs/router';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';
import { ColorSchemeToggle } from './ColorSchemeToggle';

const links = [
  { link: '/', label: 'Home' },
  { link: '/app', label: 'App' },
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
];

export function Header() {
  const [opened, setOpened] = createSignal(false);
  const location = useLocation();
  const { active, setActive } = useHeaderStore();
  let ref: HTMLElement | undefined;

  createEffect(() => {
    setActive(location.pathname);
  });

  createEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref && !ref.contains(e.target as Node)) {
        setOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    onCleanup(() => document.removeEventListener('mousedown', handleClick));
  });

  const handleLinkClick = (path: string) => {
    setActive(path);
    setOpened(false);
  };

  const renderLink = (link: (typeof links)[number], context: 'desktop' | 'mobile') => {
    const linkIdBase = `header-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`;
    const linkId = context === 'desktop' ? linkIdBase : `${linkIdBase}-${context}`;
    const base = 'px-3 py-2 rounded text-sm font-medium text-muted';
    const activeClass =
      active() === link.link
        ? 'bg-primary text-primary-content'
        : 'hover:bg-surface-hover';
    const className = `${base} ${activeClass}`;

    if (link.link.startsWith('http')) {
      return (
        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          class={className}
          data-testid={linkId}
          onClick={() => setOpened(false)}
        >
          {link.label}
        </a>
      );
    }

    return (
      <A
        href={link.link}
        class={className}
        data-testid={linkId}
        onClick={() => handleLinkClick(link.link)}
      >
        {link.label}
      </A>
    );
  };

  return (
    <header
      class="w-full h-14 mb-8 surface border-t-0 border-x-0"
      ref={(el) => (ref = el)}
      data-testid="app-header"
    >
      <div class="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1
          class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-testid="header-logo"
        >
          Quotd.
        </h1>
        <nav class="hidden sm:flex gap-1" data-testid="header-navigation">
          {links.map((link) => renderLink(link, 'desktop'))}
        </nav>
        <div class="flex items-center gap-2">
          <ColorSchemeToggle />
          <button
            class="sm:hidden p-2 border border-border rounded bg-surface hover:bg-surface-hover"
            onClick={() => setOpened((o) => !o)}
            aria-label="Toggle navigation"
            type="button"
            data-testid="header-menu-toggle"
          >
            {opened() ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>
      {opened() && (
        <div
          class="sm:hidden absolute left-0 right-0 top-14 bg-surface border-b border-border flex flex-col gap-2 p-4 z-50"
          data-testid="header-mobile-menu"
        >
          {links.map((link) => renderLink(link, 'mobile'))}
        </div>
      )}
    </header>
  );
}
