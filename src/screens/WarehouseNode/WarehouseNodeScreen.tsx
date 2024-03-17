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
import { useQueryParams, StringParam } from 'use-query-params';

const WarehouseNodeScreen = () => {
  const [query, setQuery] = useQueryParams({
    agencyId: StringParam,
    search: StringParam,
    nodeTypeId: StringParam,
    status: StringParam,
  });
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
      trigger({
        agency_id: currentUser?.sub_id,
        params: {
          ...paginate,
          limit,
          agency_id: query.agencyId !== 'all' ? query.agencyId : undefined,
          status: query.status !== 'all' ? query.status : undefined,
          node_type_id: query.nodeTypeId !== 'all' ? query.nodeTypeId : undefined,
          serial: query.search ? query.search : undefined,
        },
      });
    }
  }, [trigger, paginate, currentUser, limit, query]);

  const refetch = () => {
    if (currentUser) {
      trigger({
        agency_id: currentUser?.sub_id,
        params: {
          ...paginate,
          limit,
          agency_id: query.agencyId !== 'all' ? query.agencyId : undefined,
          status: query.status !== 'all' ? query.status : undefined,
          node_type_id: query.nodeTypeId !== 'all' ? query.nodeTypeId : undefined,
          serial: query.search ? query.search : undefined,
        },
      });
    }
  };

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <WarehouseNodeTable nodeTypes={nodeTypes || []} refetch={refetch} />
      <Pagination paginate={cursor} total={total} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default WarehouseNodeScreen;
