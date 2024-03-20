'use client';

import Link from 'next/link';
import PDFDownloadButton from '../PDF/PDFDownloadButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const menuItems = [
  'skills',
  'experience',
  'certifications',
  'projects',
  'education',
];

interface NavbarProps {
  secret?: string;
}

const Navbar: React.FC<NavbarProps> = ({ secret }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav
      id="navbar"
      className="sticky top-0 z-40 -mt-12 w-full bg-slate-900 bg-opacity-80 shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <a href="#home" className="text-lg font-semibold text-white">
              MB
            </a>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.toUpperCase()}
              </Link>
            ))}
            {secret && <PDFDownloadButton secret={secret} />}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleMobileMenu} className="h-10 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="mt-2 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.toUpperCase()}
                </Link>
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
