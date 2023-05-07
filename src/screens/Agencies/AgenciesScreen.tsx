import React, { useEffect } from 'react';
import { useLazyGetAllAgenciesQuery } from 'services/agencies.service';

import { AgenciesTable } from './AgenciesTable';

export default function AgenciesScreen() {
  const [trigger] = useLazyGetAllAgenciesQuery();

  useEffect(() => {
    trigger({ id: '1' });
  }, [trigger]);
  return (
    <div>
      <AgenciesTable />
    </div>
  );
}
