'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Heading } from 'src/components/Heading/Heading';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mt-12 text-center">
      <div className="rounded-xl bg-slate-800 py-12">
        <Heading color="danger" level={2}>
          Something went wrong
        </Heading>

        <div className="mt-4 flex justify-center gap-6">
          <button type="button" className="underline" onClick={reset}>
            Try again
          </button>
          <Link href="/">Visit public résumé</Link>
        </div>
      </div>
    </div>
  );
}
