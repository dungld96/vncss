import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from 'configs/constant';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetAllAgenciesQuery } from 'services/agencies.service';
import { selectCursors } from '../../state/modules/agency/agencyReducer';

import { AgenciesTable } from './AgenciesTable';
import { useAuth } from '../../hooks/useAuth';

export default function AgenciesScreen() {
  const [trigger] = useLazyGetAllAgenciesQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const cursors = useSelector(selectCursors);

  const {
    auth: { currentUser },
  } = useAuth() as any;

  useEffect(() => {
    trigger({ id: currentUser?.sub_id,params:{limit:2,...paginate} });
  }, [trigger,paginate]);
  return (
    <div>
      <AgenciesTable />
      <Pagination paginate={cursors} setPaginate={setPaginate}/>
    </div>
  );
}
