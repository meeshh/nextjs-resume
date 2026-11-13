'use client';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { initials } from 'src/helpers/utils';
import PDFDownloadButton from '../PDF/PDFDownloadButton';

const menuItems = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

const linkClassName =
  'rounded-md px-3 py-2 text-sm font-medium text-neutral-11 no-underline transition-colors hover:bg-neutral-3 hover:text-neutral-12';

interface NavbarProps {
  secret?: string;
}

const Navbar: React.FC<NavbarProps> = ({ secret }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      id="navbar"
      aria-label="Résumé sections"
      className="sticky top-0 z-40 w-full border-b border-neutral-6 bg-neutral-1/85 backdrop-blur-md"
    >
      <div className="container">
        <div className="flex h-16 justify-between">
          <div className="flex shrink-0 items-center">
            <a
              href="#home"
              className="rounded-md text-lg font-bold text-accent-11 no-underline"
            >
              {initials}
            </a>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {menuItems.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={linkClassName}>
                {label}
              </a>
            ))}
            {secret && <PDFDownloadButton secret={secret} />}
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="h-10 rounded-md px-3 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-3"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="pb-4 md:hidden">
            <div className="mt-2 flex flex-col gap-1">
              {menuItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={linkClassName}
                  onClick={closeMobileMenu}
                >
                  {label}
                </a>
              ))}
              {secret && <PDFDownloadButton secret={secret} />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
