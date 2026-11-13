'use client';

import {
  faChevronDown,
  faChevronUp,
  faCopy,
  faLink,
  faRotateLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { copyToClipboard } from 'src/helpers/clipboard';
import { DAILY_LIMIT } from 'src/helpers/constants';
import type { User } from 'src/lib/redis';

type ApiResponse = {
  success: boolean;
  message: string;
};

async function postAction(endpoint: string, body: object) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return (await response.json()) as ApiResponse;
  } catch {
    return { success: false, message: 'Could not reach the server' };
  }
}

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close the dropdown on outside click / Escape; listeners only live while it is open
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleRemoveAccess = async () => {
    if (!window.confirm(`Revoke access for ${email}?`)) return;

    const { success, message } = await postAction('/api/removeAccess', {
      id,
      secret,
    });
    if (success) {
      setIsOpen(false);
      refetch();
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleResetLimit = async () => {
    if (count === 0) {
      toast.error('Limit already reset');
      return;
    }

    const { success, message } = await postAction('/api/resetLimit', {
      id,
      secret,
    });
    if (success) {
      setIsOpen(false);
      refetch();
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleGetUrl = async () => {
    const { success, message } = await postAction('/api/accessUrl', {
      id,
      secret,
      email,
    });
    if (success) {
      await copyToClipboard(message, 'Link copied to clipboard');
    } else {
      toast.error(message);
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2 text-center">
        {count} / {DAILY_LIMIT}
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          type="button"
          title="Copy Link"
          className="inline-flex items-center justify-center rounded-sm rounded-r-none bg-gray-500 p-2 font-bold text-white hover:bg-gray-600"
          onClick={handleGetUrl}
        >
          <FontAwesomeIcon className="mx-1 text-xs lg:text-sm" icon={faLink} />
          <span className="hidden font-extralight lg:block">Copy Link</span>
        </button>

        <div ref={menuRef} className="relative inline-block text-left">
          <button
            type="button"
            aria-label="More actions"
            className={`mr-2 inline-flex items-center justify-center rounded-sm rounded-l-none p-2 font-bold hover:bg-gray-400 lg:h-10 ${
              isOpen
                ? 'bg-gray-300 text-slate-700'
                : 'bg-gray-300/30 text-white'
            }`}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <FontAwesomeIcon
              className="text-xs lg:text-sm"
              icon={isOpen ? faChevronUp : faChevronDown}
            />
          </button>

          {isOpen && (
            <div
              className="absolute right-2 z-10 mt-1 w-56 origin-top-right rounded-sm bg-slate-600 shadow-lg"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="p-2">
                <button
                  type="button"
                  role="menuitem"
                  title="Copy ID"
                  className="mb-1 inline-flex w-full items-center justify-center rounded-sm bg-gray-300 p-2 font-bold text-slate-700 hover:bg-gray-400"
                  onClick={() => copyToClipboard(id, 'ID copied to clipboard')}
                >
                  <FontAwesomeIcon
                    className="mr-1 text-xs lg:text-sm"
                    icon={faCopy}
                  />
                  <span className="hidden font-light md:block">Copy ID</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  title="Reset limit"
                  className="mb-1 inline-flex w-full items-center justify-center rounded-sm bg-gray-500 p-2 font-bold text-white hover:bg-gray-600"
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
                  type="button"
                  role="menuitem"
                  title="Revoke access"
                  className="inline-flex w-full items-center justify-center rounded-sm bg-red-500 p-2 font-bold text-white hover:bg-red-600"
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
  );
}
