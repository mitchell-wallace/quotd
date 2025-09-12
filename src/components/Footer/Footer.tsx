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
        const base = 'text-gray-600 dark:text-gray-300 text-sm';
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
            className={`${base} ${location.pathname === link.link ? 'font-semibold' : ''}`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start text-sm text-gray-600 dark:text-gray-300">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">Quotd.</p>
            <p className="mt-1">2025 — All rights reserved.</p>
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">Attribution</p>
            <p className="mt-1">
              Icon by{' '}
              <a
                href="https://www.flaticon.com/free-icons/quotation-marks"
                title="quotation marks icons"
                className="underline"
              >
                Md Tanvirul Haque — Flaticon
              </a>
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">Links</p>
            <div className="mt-1 flex flex-wrap gap-4">{items}</div>
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">Follow</p>
            <div className="mt-1 flex gap-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black/15 dark:border-white/20 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconBrandGithub size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black/15 dark:border-white/20 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
