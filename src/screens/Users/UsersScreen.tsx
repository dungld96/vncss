import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetAllUsersQuery } from '../../services/users.service';
import { selectUsersState, setLimit } from '../../state/modules/user/userReducer';
import { UsersTable } from './UsersTable';
import { Box } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../state/store';

export default function UsersScreen() {
  const [trigger] = useLazyGetAllUsersQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { limit, cursor } = useSelector(selectUsersState);
  const {
    auth: { currentUser },
  } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      trigger({ agencyId: currentUser.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, limit, paginate, currentUser]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <UsersTable />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
}
