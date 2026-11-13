'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MAX_OFFER_LENGTH, MIN_OFFER_LENGTH } from 'src/helpers/constants';
import {
  clearHighlights,
  highlightWords,
  supportsHighlights,
} from 'src/helpers/highlighter';
import Loader from '../Loader/Loader';

export type OfferAccess = {
  id?: string;
  email?: string;
};

type ApiResponse = {
  keywords?: string[];
  error?: string;
};

const OfferInput: React.FC<{ access: OfferAccess }> = ({ access }) => {
  const [offer, setOffer] = useState('');
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // drop the highlight registry entry when leaving the page
  useEffect(() => clearHighlights, []);

  const length = offer.trim().length;
  const canSubmit = length >= MIN_OFFER_LENGTH && !loading;

  const handleApiRequest = async () => {
    if (!access.id || !access.email) {
      toast.error('No permissions. Ask owner for access to this feature.');
      return;
    }

    setLoading(true);
    try {
      const apiResponse = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: offer, ...access }),
      });
      const response = (await apiResponse.json()) as ApiResponse;

      if (!apiResponse.ok || response.error || !response.keywords) {
        toast.error(response.error ?? 'Could not analyze the job offer');
        return;
      }

      if (!supportsHighlights()) {
        toast.error('Your browser does not support highlighting text.');
        return;
      }

      const root = document.getElementById('resume') ?? document.body;
      const matches = highlightWords(response.keywords, root);
      toast.success(
        matches
          ? `AI analyzed your job offer and highlighted ${matches} matching skill mentions`
          : 'AI analyzed your job offer but found no matching skills',
        { duration: 4000 },
      );
    } catch (error) {
      toast.error(
        `Error making API request: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="relative mt-2">
        <label htmlFor="job-offer" className="sr-only">
          Job offer
        </label>
        <textarea
          id="job-offer"
          maxLength={MAX_OFFER_LENGTH}
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="Paste a job offer to see where Michel matches"
          className="min-h-27 w-full rounded-sm bg-white p-2 text-black"
        />
        <button
          type="button"
          aria-label="How does this work?"
          onClick={() => dialogRef.current?.showModal()}
          className="absolute top-0 right-0 m-1 h-4 w-4 rounded-full bg-slate-400 text-[8px] text-white hover:bg-slate-500"
        >
          i
        </button>
        <div
          className="mb-1 text-right text-xs text-neutral-11"
          aria-live="polite"
        >
          {length < MIN_OFFER_LENGTH
            ? `${MIN_OFFER_LENGTH - length} more characters needed`
            : `${offer.length} / ${MAX_OFFER_LENGTH}`}
        </div>
      </div>
      <button
        type="button"
        disabled={!canSubmit}
        className="w-full rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
        onClick={handleApiRequest}
      >
        Highlight Skills
      </button>

      {/* native <dialog>: focus trapping, Escape to close and backdrop for free */}
      <dialog
        ref={dialogRef}
        aria-labelledby="offer-dialog-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="container m-auto max-h-[90dvh] rounded-sm bg-slate-900 p-8 text-neutral-12 shadow-sm backdrop:bg-black/50"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
          className="absolute top-0 right-0 p-2 leading-normal text-white hover:text-slate-400"
        >
          &times;
        </button>

        <p id="offer-dialog-title">Dear Recruiter, </p>
        <br />
        <p>
          Thank you for considering my application. To ensure a personalized and
          efficient experience, I have implemented a private access system for
          the Skill Highlighting feature. Here&apos;s how you can proceed:
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
            <strong className="text-sky-500">Requesting a Private Link</strong>
            <p>
              Once I receive your email, I will promptly generate a private link
              tailored to you.
            </p>
          </li>
          <li className="my-2">
            <strong className="text-sky-500">Paste Job Offer Skills</strong>
            <p>
              In the text box, paste the skills/qualifications section of your
              job offer. Please keep it between {MIN_OFFER_LENGTH} and{' '}
              {MAX_OFFER_LENGTH} characters.
            </p>
          </li>
          <li className="my-2">
            <strong className="text-sky-500">
              Click &ldquo;Highlight Skills&rdquo;
            </strong>
            <p>
              After pasting, click the &ldquo;Highlight Skills&rdquo; button. AI
              will analyze your job offer and the webpage will dynamically
              highlight matching skills.
            </p>
          </li>
        </ul>
        <br />
        <p className="text-red-600 italic">
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
          feedback or ask for additional assistance. Your input is valuable and
          helps me continually enhance the functionality of the service.
        </p>
        <br />
        <p>
          Your time is valued, and this process ensures a quick overview of my
          qualifications.
        </p>
        <p>Thank you for using this feature.</p>
      </dialog>
    </>
  );
};

export default OfferInput;
