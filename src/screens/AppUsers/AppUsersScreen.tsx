import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetAllAppUsersQuery } from '../../services/appUsers.service';
import { selectAppUsersState, setLimit } from '../../state/modules/app-user/appUserReducer';
import { AppUsersTable } from './AppUsersTable';
import { Box } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../state/store';

export default function AppUsersScreen() {
  const [trigger] = useLazyGetAllAppUsersQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { limit, cursor, total } = useSelector(selectAppUsersState);
  const {
    auth: { currentUser },
  } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      trigger({ params: { limit, ...paginate } });
    }
  }, [trigger, limit, paginate, currentUser]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <AppUsersTable />
      <Pagination paginate={cursor} total={total} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
}
