import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListLocationsQuery } from '../../services/location.service';
import { selectLocationState } from '../../state/modules/location/locationReducer';
import { DeployLocationTable } from './DeployLocationTable';

const DeployLocationScreen = () => {
  const [trigger] = useLazyGetListLocationsQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectLocationState);

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
      <DeployLocationTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
};

export default DeployLocationScreen;
