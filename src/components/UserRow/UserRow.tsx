'use client';

import {
  faCopy,
  faLink,
  faRotateLeft,
  faTrash,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import copy from 'clipboard-copy';

export type User = {
  id: string;
  email: string;
  count: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

export default function UserRow({
  user,
  secret,
  refetch,
}: {
  user: User;
  secret: string;
  refetch: () => void;
}) {
  const { id, email, count } = user;
  const [limitCount, setLimitCount] = useState<string>(count);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLimitCount(count);
  }, [count]);

  const handleRemoveAccess = async () => {
    const response = await fetch('/api/removeAccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        secret,
      }),
    });

    const apiResponse = (await response.json()) as ApiResponse;

    if (apiResponse.success) {
      refetch();
      toast.success(apiResponse.message, {
        position: 'top-right',
        duration: 4000,
      });
    } else {
      toast.error(apiResponse.message, {
        position: 'top-right',
        duration: 4000,
      });
    }
  };

  const handleResetLimit = async () => {
    if (limitCount === '0') {
      return toast.error('Limit already reset', {
        position: 'top-right',
        duration: 4000,
      });
    }

    const response = await fetch('/api/resetLimit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        secret,
      }),
    });

    const apiResponse = (await response.json()) as ApiResponse;

    if (apiResponse.success) {
      setLimitCount('0');
      toast.success(apiResponse.message, {
        position: 'top-right',
        duration: 4000,
      });
    } else {
      toast.error(apiResponse.message, {
        position: 'top-right',
        duration: 4000,
      });
    }
  };

  const handleGetUrl = async () => {
    const response = await fetch('/api/accessUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        secret,
        email,
      }),
    });

    const apiResponse = (await response.json()) as ApiResponse;

    if (apiResponse.success) {
      copy(apiResponse.message);
      toast.success('Link copied to clipboard', {
        position: 'top-right',
        duration: 4000,
      });
    } else {
      toast.error(apiResponse.message, {
        position: 'top-right',
        duration: 4000,
      });
    }
  };

  return (
    <>
      <tr>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2 text-center">{limitCount} / 3</td>
        <td className="border px-4 py-2 text-center">
          <button
            title="Copy Link"
            className="inline-flex items-center justify-center rounded rounded-r-none bg-gray-500 p-2 font-bold text-white hover:bg-gray-600 "
            onClick={handleGetUrl}
          >
            <FontAwesomeIcon
              className="mx-1 text-xs lg:text-sm"
              icon={faLink}
            />
            <span className="hidden font-extralight lg:block">Copy Link</span>
          </button>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className={`mr-2 inline-flex items-center justify-center rounded rounded-l-none bg-gray-300 p-2 font-bold hover:bg-gray-400  lg:h-10 ${
                isOpen
                  ? 'bg-opacity-100 text-slate-700'
                  : 'bg-opacity-30 text-white'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <FontAwesomeIcon
                className="text-xs lg:text-sm"
                icon={isOpen ? faChevronUp : faChevronDown}
              />
            </button>

            {isOpen && (
              <div
                className="absolute right-2 z-10 mt-1 w-56 origin-top-right rounded bg-slate-600 shadow-lg"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="p-2" role="none">
                  <button
                    title="Copy ID"
                    className="mb-1 inline-flex w-full items-center justify-center rounded bg-gray-300 p-2 font-bold text-slate-700 hover:bg-gray-400"
                    onClick={() => {
                      copy(id);
                    }}
                  >
                    <FontAwesomeIcon
                      className="mr-1 text-xs lg:text-sm"
                      icon={faCopy}
                    />
                    <span className="hidden font-light md:block">Copy ID</span>
                  </button>
                  <button
                    title="Reset limit"
                    className="mb-1 inline-flex w-full items-center justify-center rounded bg-gray-500 p-2 font-bold text-white hover:bg-gray-600"
                    onClick={handleResetLimit}
                  >
                    <FontAwesomeIcon
                      className="mr-1 text-xs lg:text-sm"
                      icon={faRotateLeft}
                    />
                    <span className="hidden font-light md:block">
                      Reset Limit
                    </span>
                  </button>
                  <button
                    title="Revoke access"
                    className="inline-flex w-full items-center justify-center rounded bg-red-500 p-2 font-bold text-white hover:bg-red-600"
                    onClick={handleRemoveAccess}
                  >
                    <FontAwesomeIcon
                      className="mr-1 text-xs lg:text-sm"
                      icon={faTrash}
                    />
                    <span className="hidden font-light md:block">
                      Revoke Access
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
