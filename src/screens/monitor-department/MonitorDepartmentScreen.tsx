import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListOrganizationsQuery } from '../../services/organizations.service';
import { selectOrganizationState } from '../../state/modules/organization/organizationReducer';
import { Box } from '@mui/material';
import { MonitorDepartmentTable } from './MonitorDepartmentTable';

const MonitorDepartmentScreen = () => {
  const [trigger] = useLazyGetListOrganizationsQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectOrganizationState);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser, limit]);

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <MonitorDepartmentTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
};

export default MonitorDepartmentScreen;
