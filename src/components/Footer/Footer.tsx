import { useMemo } from 'react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
  { link: 'https://mitchellwallace.dev', label: 'Portfolio' },
  { link: 'https://checkboxd.vercel.app/', label: 'Checkboxd' },
];

const socialLinks = {
  github: 'https://github.com/mitchell-wallace',
  linkedin: 'https://linkedin.com/in/mitchell-wallace-dev',
};

export function Footer() {
  const location = useLocation();

  const items = useMemo(
    () =>
      links.map((link) => {
        const isExternal = link.link.startsWith('http');
        const base = 'text-muted text-sm';
        if (isExternal) {
          return (
            <a
              key={link.label}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className={base}
            >
              {link.label}
            </a>
          );
        }
        return (
          <Link
            key={link.label}
            to={link.link}
            className={`${base} ${location.pathname === link.link ? 'font-semibold text-base-content' : ''}`}
          >
            {link.label}
          </Link>
        );
      }),
    [location.pathname]
  );

  return (
    <footer className="mt-28 surface border-t">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-muted justify-items-center items-center">
          <div className="space-y-1">
            <p className="font-medium text-base-content/90">Quotd.</p>
            <p>2025 — All rights reserved.</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-base-content/90">Links</p>
            <div className="flex flex-wrap gap-4">{items}</div>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-base-content/90">Follow</p>
            <div className="flex gap-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:bg-surface-hover"
              >
                <IconBrandGithub size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:bg-surface-hover"
              >
                <IconBrandLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
