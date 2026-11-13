'use client';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { initials } from 'src/helpers/utils';
import PDFDownloadButton from '../PDF/PDFDownloadButton';

const menuItems = [
  'skills',
  'experience',
  'certifications',
  'projects',
  'education',
];

const linkClassName =
  'rounded-md px-3 py-2 text-sm font-medium text-gray-300 no-underline hover:bg-gray-700 hover:text-white';

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
      className="sticky top-0 z-40 -mt-12 w-full bg-slate-900/80 shadow-lg backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between">
          <div className="flex shrink-0 items-center">
            <a
              href="#home"
              className="text-lg font-semibold text-white no-underline"
            >
              {initials}
            </a>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {menuItems.map((item) => (
              <a key={item} href={`#${item}`} className={linkClassName}>
                {item.toUpperCase()}
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
              className="h-10 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="pb-4 md:hidden">
            <div className="mt-2 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={linkClassName}
                  onClick={closeMobileMenu}
                >
                  {item.toUpperCase()}
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
