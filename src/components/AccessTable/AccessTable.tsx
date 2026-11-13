'use client';

import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import type { User } from 'src/lib/redis';
import Loader from '../Loader/Loader';
import UserRow from '../UserRow/UserRow';

type ApiResponse = {
  users?: User[];
  error?: string;
};

type AccessTableProps = {
  secret: string;
  // rendered on the server, so the first paint needs no client-side fetch
  initialUsers: User[];
};

const AccessTable = ({ secret, initialUsers }: AccessTableProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async () => {
    // cancel any in-flight request so a stale response can't overwrite a newer one
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    try {
      const apiResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
        signal: controller.signal,
      });
      const response = (await apiResponse.json()) as ApiResponse;

      if (response.error) {
        toast.error(response.error);
      } else {
        setUsers(response.users ?? []);
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      toast.error(
        error instanceof Error ? error.message : 'Failed to load users',
      );
    }
    if (!controller.signal.aborted) setIsLoading(false);
  }, [secret]);

  // abort on unmount so nothing updates state after the component is gone
  useEffect(() => () => controllerRef.current?.abort(), []);

  return (
    <div className="container mb-4 rounded-sm bg-slate-800 px-8 pt-6 pb-8 shadow-md">
      <h2 className="mb-4 text-lg">Access</h2>
      {isLoading && <Loader />}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-slate-950">
          <tr>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Access per day</th>
            <th className="border-b px-4 py-2">
              <button
                type="button"
                title="Refresh Table"
                aria-label="Refresh table"
                onClick={fetchUsers}
                className="w-10 rounded-sm bg-gray-300 p-2 font-bold text-gray-900 hover:bg-gray-600 hover:text-white active:bg-gray-700"
              >
                <FontAwesomeIcon icon={faRefresh} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {!users.length ? (
            <tr>
              <td colSpan={3} className="p-16 px-4 text-center">
                No Users
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                user={user}
                key={user.id}
                secret={secret}
                refetch={fetchUsers}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccessTable;
