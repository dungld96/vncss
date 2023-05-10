import Pagination from 'common/pagination/Pagination';
import { CursorsType } from 'configs/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetAllUsersQuery } from 'services/users.service';
import { selectCursors } from 'state/modules/user/userReducer';
import { UsersTable } from './UsersTable';

export default function UsersScreen() {
  const [trigger] = useLazyGetAllUsersQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const cursors = useSelector(selectCursors);

  useEffect(() => {
    trigger({ limit: 2, ...paginate });
  }, [trigger, paginate]);

  return (
    <div>
      <UsersTable />
      <Pagination paginate={cursors} setPaginate={setPaginate}/>
    </div>
  );
}
