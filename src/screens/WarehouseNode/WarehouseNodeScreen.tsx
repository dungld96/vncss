import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { WarehouseNodeTable } from './WarehouseNodeTable';
import { CursorsType } from '../../configs/constant';
import { useSelector } from 'react-redux';
import { selectNodeState } from '../../state/modules/node/nodeReducer';
import Pagination from '../../common/pagination/Pagination';
import { useLazyGetListNodeQuery, useGetNodeTypesQuery } from '../../services/node.service';
import { Box } from '@mui/material';

const WarehouseNodeScreen = () => {
  const [trigger] = useLazyGetListNodeQuery();
  const { data: nodeTypes } = useGetNodeTypesQuery(null);
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectNodeState);

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
      <WarehouseNodeTable nodeTypes={nodeTypes || []} />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
};

export default WarehouseNodeScreen;
