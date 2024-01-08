'use client';
import { useState } from 'react';
import { Footer } from 'src/components/Footer/Footer';
import { Header } from 'src/components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';

type ApiResponse = {
  fullUrl: string;
  error?: string;
};

const Generator: React.FC<PageProps> = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      secret: { value: string };
    };
    const apiResponse = await fetch('/api/grantAccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: target.email.value,
        secret: target.secret.value,
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
      <Header />
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
        <label
          className="mb-2 block text-sm font-bold text-white"
          htmlFor="secret"
        >
          Secret
        </label>
        <input
          className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          name="secret"
          type="password"
          placeholder="Enter secret"
        />

        <button
          className="focus:shadow-outline rounded bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700 focus:outline-none"
          type="submit"
        >
          Add user
        </button>
      </form>
      {response && (
        <div className="container flex px-0">
          <pre
            className="mr-4 rounded bg-slate-500 p-8"
            style={{ whiteSpace: 'initial', flexGrow: 1 }}
          >
            <code>{response}</code>
          </pre>
          <button
            title="Copy link"
            className="w-36 rounded bg-slate-600 hover:bg-slate-700 active:bg-slate-800"
            onClick={handleCopyClick}
          >
            <FontAwesomeIcon className="text-3xl" icon={faCopy} />
          </button>
        </div>
      )}
      <Footer />
      <Toaster />
    </>
  );
};

export default Generator;
