import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CursorsType } from '../../configs/constant';
import { useLazyGetAllAgenciesQuery } from 'services/agencies.service';
import { selectAgenciesState } from '../../state/modules/agency/agencyReducer';
import Pagination from '../../common/pagination/Pagination';

import { AgenciesTable } from './AgenciesTable';
import { useAuth } from '../../hooks/useAuth';

export default function AgenciesScreen() {
  const [trigger] = useLazyGetAllAgenciesQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { limit, cursors } = useSelector(selectAgenciesState);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser]);
  return (
    <div>
      <AgenciesTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
}
