import { Box } from '@mui/material';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListSimQuery } from '../../services/sims.service';
import { selectSimState } from '../../state/modules/sim/simReducer';
import WarehouseSimTable from './WarehouseSimTable';
import Pagination from '../../common/pagination/Pagination';

const WarehouseSimScreen = () => {
  const [trigger] = useLazyGetListSimQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectSimState);

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
      <WarehouseSimTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
};

export default WarehouseSimScreen;
