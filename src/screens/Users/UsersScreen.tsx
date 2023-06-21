import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetAllUsersQuery } from '../../services/users.service';
import { selectUsersState } from '../../state/modules/user/userReducer';
import { UsersTable } from './UsersTable';
import { Box } from '@mui/material';

export default function UsersScreen() {
  const [trigger] = useLazyGetAllUsersQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { limit, cursors } = useSelector(selectUsersState);

  useEffect(() => {
    trigger({ limit, ...paginate });
  }, [trigger, limit, paginate]);

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <UsersTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
}
