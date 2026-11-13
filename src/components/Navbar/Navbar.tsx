import { fullName } from 'src/helpers/utils';
import { Logo } from '../Logo/Logo';
import PDFDownloadButton from '../PDF/PDFDownloadButton';

const menuItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
];

interface NavbarProps {
  secret?: string;
}

/** Four links fit inline on a phone, so there's no menu to open; they scroll sideways if they must. */
const Navbar: React.FC<NavbarProps> = ({ secret }) => {
  return (
    <nav
      id="navbar"
      aria-label="Résumé sections"
      className="sticky top-0 z-40 w-full border-b border-neutral-6 bg-neutral-1/85 backdrop-blur-md"
    >
      <div className="container flex h-14 items-center gap-2 sm:gap-4">
        <a
          href="#home"
          className="shrink-0 rounded-full text-neutral-12 no-underline max-[400px]:hidden"
        >
          <Logo className="h-9 w-9" ringWidth={3} />
          <span className="sr-only">{fullName}, back to top</span>
        </a>

        <ul className="-mx-1.5 flex min-w-0 flex-1 items-center justify-between overflow-x-auto min-[401px]:ml-auto min-[401px]:flex-none min-[401px]:justify-end sm:-mr-3">
          {menuItems.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block rounded-md px-1.5 py-2 text-[13px] font-medium whitespace-nowrap text-neutral-11 no-underline transition-colors hover:bg-neutral-3 hover:text-neutral-12 sm:px-3 sm:text-sm"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        {secret && <PDFDownloadButton secret={secret} />}
      </div>
    </nav>
  );
};

export default Navbar;
