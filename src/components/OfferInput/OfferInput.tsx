'use client';

import React from 'react';
import { highlightWords } from 'src/helpers/highlighter';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import Loader from '../Loader/Loader';

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
      if (email === null || id === null) {
        throw new Error(
          'No permissions. Ask owner for access to this feature.',
        );
      }
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
        toast.error(`Error making API request: ${error.message}`, {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        toast.error(`An unknown error occurred: ${error}`, {
          position: 'top-right',
          duration: 3000,
        });
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
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
        <div className="container relative rounded bg-slate-900 p-8 shadow">
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
            Thank you for considering my application. To ensure a personalized
            and efficient experience, I have implemented a private access system
            for the Skill Highlighting feature. Here&apos;s how you can
            proceed::
          </p>
          <ul>
            <li className="my-2">
              <strong className="text-sky-500">
                Contact me for private access
              </strong>
              <p>
                Please send me an email expressing your interest in using the
                Skill Highlighting feature. Kindly include your name, company
                name, and the position you are hiring for.
              </p>
            </li>
            <li className="my-2">
              <strong className="text-sky-500">
                Requesting a Private Link
              </strong>
              <p>
                Once I receive your email, I will promptly generate a private
                link tailored to you.
              </p>
            </li>
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
          <p className="text italic text-red-600">
            Utilizing the Skill Highlighting feature has a rate limit of 3 times
            per day, and the limit resets the day after. This ensures fair usage
            and optimal resource management.
          </p>
          <br />
          <p>
            Please note that the highlights are going to be a rough estimate. A
            thorough reading of my resume gives the best impression.
          </p>
          <br />
          <p>
            The private link will grant you exclusive access to the Skill
            Highlighting feature, ensuring that the service is not publicly
            available. This approach is essential to manage the usage of OpenAI
            tokens effectively.
          </p>
          <p>
            After using the Skill Highlighting feature, feel free to provide any
            feedback or ask for additional assistance. Your input is valuable
            and helps me continually enhance the functionality of the service.
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
