import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListLocationsQuery } from '../../services/location.service';
import { selectLocationState, setLimit } from '../../state/modules/location/locationReducer';
import { DeployLocationTable } from './DeployLocationTable';
import { useAppDispatch } from '../../state/store';

const DeployLocationScreen = () => {
  const [trigger] = useLazyGetListLocationsQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit } = useSelector(selectLocationState);
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

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <DeployLocationTable />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default DeployLocationScreen;
