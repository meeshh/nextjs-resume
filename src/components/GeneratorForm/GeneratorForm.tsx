'use client';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

type ApiResponse = {
  fullUrl: string;
  error?: string;
};

export default function GeneratorForm({ secret }: { secret: string }) {
  const [response, setResponse] = useState<string | null>(null);

  const handleAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const apiResponse = await fetch('/api/grantAccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: target.email.value,
        secret,
      }),
    });

    const returnResponse = (await apiResponse.json()) as ApiResponse;

    if (returnResponse.error) {
      return toast.error(returnResponse.error, {
        position: 'top-right',
        duration: 3000,
      });
    }

    setResponse(returnResponse.fullUrl);
    toast.success('Email granted access. Copy the link and share it.', {
      position: 'top-right',
      duration: 4000,
    });
  };

  const handleCopyClick = async () => {
    try {
      if (response) await copy(response);
    } catch (error) {
      toast.error('Error copying to clipboard', {
        position: 'top-right',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <form
        className="container mb-4 rounded bg-slate-4 px-8 pb-8 pt-6 shadow-md"
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
          className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          name="email"
          type="email"
          placeholder="Enter email"
        />

        <button
          className="focus:shadow-outline rounded bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700 focus:outline-none"
          type="submit"
        >
          Add user
        </button>
        {response && (
          <div className="relative container mt-4 flex px-0">
            <pre
              className="rounded bg-slate-500 p-8 w-full overflow-x-auto whitespace-pre"
            >
              <code>{response}</code>
            </pre>
              <button
                type="button"
                title="Copy link"
                className="absolute right-2 top-2 w-8 rounded bg-slate-600 hover:bg-slate-700 active:bg-slate-800"
                onClick={handleCopyClick}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
          </div>
        )}
      </form>
      <Toaster />
    </>
  );
}
