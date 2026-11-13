import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// a single Toaster for every private/admin page instead of one per component
export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
