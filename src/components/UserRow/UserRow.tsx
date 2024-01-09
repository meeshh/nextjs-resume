'use client';

import { faCopy, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <>
      <tr>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2 text-center">{limitCount} / 3</td>
        <td className="border px-4 py-2 text-center">
          <button
            title="Copy ID"
            className="mr-2 w-10 rounded bg-gray-500 p-2 font-bold text-white hover:bg-gray-600"
            onClick={() => {
              copy(id);
            }}
          >
            <FontAwesomeIcon className="text-sm" icon={faCopy} />
          </button>
          <button
            title="Reset limit"
            className="mr-2 w-10 rounded bg-gray-500 p-2 font-bold text-white hover:bg-gray-600"
            onClick={handleResetLimit}
          >
            <FontAwesomeIcon className="text-sm" icon={faRefresh} />
          </button>
          <button
            title="Remove access"
            className="w-10 rounded bg-red-500 p-2 font-bold text-white hover:bg-red-600"
            onClick={handleRemoveAccess}
          >
            <FontAwesomeIcon className="text-sm" icon={faTrash} />
          </button>
        </td>
      </tr>
    </>
  );
}
