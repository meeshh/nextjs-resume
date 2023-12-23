'use client';

import React from 'react';
import { highlightWords } from 'src/helpers/highlighter';

interface ApiResponse {
  keywords: string;
  error?: string;
}

const OfferInput: React.FC = () => {
  const [offer, setOffer] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
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
        body: JSON.stringify({ input: offer }),
      });

      const response = (await apiResponse.json()) as ApiResponse;

      console.log('response', response);

      if (response.error) {
        console.error(response.error);
      } else {
        highlightWords(response.keywords.split(', '));
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
      <textarea
        // maxLength={1500}
        value={offer}
        onChange={handleOnChange}
        placeholder="Paste a job offer to see where Michel matches"
        className="mt-2 w-full p-2 text-black"
        style={{ borderRadius: 4, minHeight: 108 }}
      />
      <button
        className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleApiRequest}
      >
        Find my match
      </button>
    </>
  );
};

export default OfferInput;
