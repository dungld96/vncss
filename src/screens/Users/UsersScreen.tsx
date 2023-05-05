import React, { useEffect } from 'react';
import { UsersTable } from './UsersTable';
import { useLazyGetAllUsersQuery } from 'services/users.service';

export default function UsersScreen() {
  const [trigger] = useLazyGetAllUsersQuery();

  useEffect(() => {
    trigger(null);
  }, [trigger]);

  return (
    <div>
      <UsersTable />
    </div>
  );
}
