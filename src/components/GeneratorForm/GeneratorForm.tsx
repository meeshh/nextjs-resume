'use client';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { copyToClipboard } from 'src/helpers/clipboard';

type ApiResponse = {
  fullUrl?: string;
  error?: string;
};

export default function GeneratorForm({ secret }: { secret: string }) {
  const [response, setResponse] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email');

    setPending(true);
    try {
      const apiResponse = await fetch('/api/grantAccess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, secret }),
      });
      const result = (await apiResponse.json()) as ApiResponse;

      if (result.error || !result.fullUrl) {
        toast.error(result.error ?? 'Could not grant access');
        return;
      }

      setResponse(result.fullUrl);
      form.reset();
      toast.success('Email granted access. Copy the link and share it.', {
        duration: 4000,
      });
    } catch {
      toast.error('Could not reach the server');
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      className="container mb-4 rounded-sm bg-slate-800 px-8 pt-6 pb-8 shadow-md"
      onSubmit={handleAccess}
      noValidate
    >
      <label
        className="mb-2 block text-sm font-bold text-white"
        htmlFor="email"
      >
        Email
      </label>
      <input
        id="email"
        autoComplete="off"
        className="mb-4 w-full appearance-none rounded-sm border bg-white px-3 py-2 leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
        name="email"
        type="email"
        placeholder="Enter email"
        required
      />

      <button
        className="rounded-sm bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-300 focus:outline-hidden disabled:opacity-50"
        type="submit"
        disabled={pending}
      >
        Add user
      </button>
      {response && (
        <div className="relative container mt-4 flex px-0">
          <pre className="w-full overflow-x-auto rounded-sm bg-slate-500 p-8 whitespace-pre">
            <code>{response}</code>
          </pre>
          <button
            type="button"
            title="Copy link"
            aria-label="Copy link"
            className="absolute top-2 right-2 w-8 rounded-sm bg-slate-600 hover:bg-slate-700 active:bg-slate-800"
            onClick={() =>
              copyToClipboard(response, 'Link copied to clipboard')
            }
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
      )}
    </form>
  );
}
