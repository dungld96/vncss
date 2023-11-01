import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { WarehouseNodeTable } from './WarehouseNodeTable';
import { CursorType } from '../../configs/constant';
import { useSelector } from 'react-redux';
import { selectNodeState, setLimit } from '../../state/modules/node/nodeReducer';
import Pagination from '../../common/pagination/Pagination';
import { useLazyGetListNodeQuery, useGetNodeTypesQuery } from '../../services/node.service';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../state/store';

const WarehouseNodeScreen = () => {
  const [trigger] = useLazyGetListNodeQuery();
  const { data: nodeTypes } = useGetNodeTypesQuery(null);
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit, total } = useSelector(selectNodeState);
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
      <WarehouseNodeTable nodeTypes={nodeTypes || []} />
      <Pagination paginate={cursor} total={total} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default WarehouseNodeScreen;
