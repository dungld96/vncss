import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListOrganizationsQuery } from '../../services/organizations.service';
import { selectOrganizationState, setLimit } from '../../state/modules/organization/organizationReducer';
import { Box } from '@mui/material';
import { MonitorDepartmentTable } from './MonitorDepartmentTable';
import { useAppDispatch } from '../../state/store';

const MonitorDepartmentScreen = () => {
  const [trigger] = useLazyGetListOrganizationsQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit } = useSelector(selectOrganizationState);
  const dispatch = useAppDispatch();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser, limit]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  const refetch = () => {
    trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
  };
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <MonitorDepartmentTable refetch={refetch} />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default MonitorDepartmentScreen;
