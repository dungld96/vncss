import { useEffect } from 'react';
import { useLazyGetAllAgenciesQuery } from '../../services/agencies.service';

import { useAuth } from '../../hooks/useAuth';
import { AgenciesTable } from './AgenciesTable';

export default function AgenciesScreen() {
  const [trigger] = useLazyGetAllAgenciesQuery();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ id: currentUser?.sub_id });
    }
  }, [trigger, currentUser]);
  return (
    <div>
      <AgenciesTable />
    </div>
  );
}
