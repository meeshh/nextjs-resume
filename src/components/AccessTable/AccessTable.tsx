'use client';

import { useEffect, useState } from 'react';
import UserRow, { User } from '../UserRow/UserRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';

type ApiResponse = {
  users: User[];
};

const AccessTable = ({ secret }: { secret: string }) => {
  const [users, setUsers] = useState<ApiResponse['users']>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const apiResponse = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = (await apiResponse.json()) as ApiResponse;
      setUsers(response.users);
      setIsLoading(false);
    };
    fetchUsers();
  }, [reload]);

  const handleRefetch = () => {
    setReload((prevReload) => !prevReload);
  };

  return (
    <div className="container mb-4 rounded bg-slate-800 px-8 pb-8 pt-6 shadow-md">
      <h2 className="mb-4 text-lg">Access</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-slate-950">
            <tr>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Access per day</th>
              <th className="border-b px-4 py-2">
                <button
                  title="Refresh Table"
                  onClick={handleRefetch}
                  className="w-10 rounded bg-gray-300 p-2 font-bold text-gray-900 hover:bg-gray-600 hover:text-white active:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!users.length ? (
              <tr>
                <td />
                <td className="p-16 px-4 text-center">No Users</td>
                <td />
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  user={user}
                  key={user.id}
                  secret={secret}
                  refetch={handleRefetch}
                />
              ))
            )}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
};

export default AccessTable;
