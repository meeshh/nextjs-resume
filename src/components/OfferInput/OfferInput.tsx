'use client';

import React from 'react';
import { highlightWords } from 'src/helpers/highlighter';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

interface ApiResponse {
  keywords: string;
  error?: string;
}

const OfferInput: React.FC = () => {
  const [offer, setOffer] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);

  const params = useSearchParams();
  const email = params?.get('email');
  const id = params?.get('id');

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    setOffer(e.target.value);
  };

  const handleApiRequest = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: offer, id, email }),
      });

      const response = (await apiResponse.json()) as ApiResponse;

      if (response.error) {
        toast.error(response.error, {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        highlightWords(response.keywords.split(', '));
        toast.success(
          'AI has successfully analyzed your job offer and highlighted matching skills',
          {
            position: 'top-right',
            duration: 4000,
          },
        );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error('Error making API request:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            zIndex: 2,
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-sky-500" />
        </div>
      )}
      <div className="relative mt-2">
        <textarea
          maxLength={1500}
          value={offer}
          onChange={handleOnChange}
          placeholder="Paste a job offer to see where Michel matches"
          className=" w-full p-2 text-black"
          style={{ borderRadius: 4, minHeight: 108 }}
        />
        <button
          id="infoButton"
          type="button"
          style={{ fontSize: 8, margin: 4 }}
          onClick={() => setModal(true)}
          className="absolute right-0 top-0 h-4 w-4 cursor-pointer rounded-full bg-slate-400 text-white hover:bg-slate-500"
        >
          i
        </button>
      </div>
      <button
        disabled={offer.trim().length === 0}
        className={`${
          offer.trim().length === 0 ? 'pointer-events-none opacity-50' : null
        } w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700`}
        onClick={handleApiRequest}
      >
        Highlight Skills
      </button>
      <div
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setModal(false);
          }
        }}
        className={`${
          !modal && 'hidden'
        } fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50`}
      >
        <div className="container relative rounded bg-slate-5 p-8 shadow">
          <button
            onClick={() => setModal(false)}
            style={{ lineHeight: 'normal' }}
            className="absolute right-0 top-0 p-2 text-white hover:text-slate-400"
          >
            &times;
          </button>

          <p>Dear Recruiter, </p>
          <br />
          <p>
            Thank you for considering my application. To efficiently match my
            skills with your job offer, follow these steps:
          </p>
          <ul>
            <li className="my-2">
              <strong className="text-sky-500">Paste Job Offer Skills</strong>
              <p>
                In the text box, paste the skills/qualifications section of your
                job offer. Please keep it under 1500 characters.
              </p>
            </li>
            <li className="my-2">
              <strong className="text-sky-500">
                Click &ldquo;Highlight Skills&rdquo;
              </strong>
              <p>
                After pasting, click the &ldquo;Highlight Skills&rdquo; button.
                AI will analyze your job offer and the webpage will dynamically
                highlight matching skills.
              </p>
            </li>
          </ul>
          <br />
          <p>
            Please note that the highlights are going to be a rough estimate. A
            thorough reading of my resume gives the best impression.
          </p>
          <br />
          <p>
            Your time is valued, and this process ensures a quick overview of my
            qualifications.
          </p>
          <p>Thank you for using this feature.</p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default OfferInput;
