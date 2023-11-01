import { Box } from '@mui/material';
import { CursorType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListSimQuery } from '../../services/sims.service';
import { selectSimState, setLimit } from '../../state/modules/sim/simReducer';
import WarehouseSimTable from './WarehouseSimTable';
import Pagination from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../state/store';

const WarehouseSimScreen = () => {
  const [trigger] = useLazyGetListSimQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit, total } = useSelector(selectSimState);
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
      <WarehouseSimTable />
      <Pagination paginate={cursor} total={total} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default WarehouseSimScreen;
