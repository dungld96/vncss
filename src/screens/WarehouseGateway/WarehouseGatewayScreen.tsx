import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListGatewayQuery, useGetGatewayTypesQuery } from '../../services/gateway.service';
import { selectGatewayState, setLimit } from '../../state/modules/gateway/gatewayReducer';
import { WarehouseGatewayTable } from './WarehouseGatewayTable';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../state/store';
import { useQueryParams, StringParam } from 'use-query-params';

const WarehouseGatewayScreen = () => {
  const [query, setQuery] = useQueryParams({
    agencyId: StringParam,
    search: StringParam,
    gatewayTypeId: StringParam,
    status: StringParam,
  });
  const [trigger] = useLazyGetListGatewayQuery();
  const { data: gatewayTypes } = useGetGatewayTypesQuery(null);
  const [paginate, setPaginate] = React.useState<CursorType>({});

  const { cursor, limit, total } = useSelector(selectGatewayState);
  const dispatch = useAppDispatch();

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      trigger({
        agency_id: currentUser?.sub_id,
        params: {
          ...paginate,
          limit,
          agency_id: query.agencyId !== 'all' ? query.agencyId : undefined,
          status: query.status !== 'all' ? query.status : undefined,
          gateway_type_id: query.gatewayTypeId !== 'all' ? query.gatewayTypeId : undefined,
          serial: query.search ? query.search : undefined,
        },
      });
    }
  }, [trigger, paginate, currentUser, limit, query]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <WarehouseGatewayTable gatewayTypes={gatewayTypes || []} />
      <Pagination paginate={cursor} total={total} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default WarehouseGatewayScreen;
