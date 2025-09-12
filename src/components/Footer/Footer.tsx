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
    <footer className="mt-28 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        <div className="text-center sm:text-left text-sm text-gray-600 dark:text-gray-300">
          <p>2025 Quotd. All rights reserved.</p>
          <p>
            Icon by{' '}
            <a
              href="https://www.flaticon.com/free-icons/quotation-marks"
              title="quotation marks icons"
              className="underline"
            >
              Md Tanvirul Haque - Flaticon
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex gap-4">{items}</div>
          <div className="flex gap-2">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IconBrandGithub size={18} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IconBrandLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
