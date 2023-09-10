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

const WarehouseGatewayScreen = () => {
  const [trigger] = useLazyGetListGatewayQuery();
  const { data: gatewayTypes } = useGetGatewayTypesQuery(null);
  const [paginate, setPaginate] = React.useState<CursorType>({});

  const { cursor, limit } = useSelector(selectGatewayState);
  const dispatch = useAppDispatch();

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser, limit]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <WarehouseGatewayTable gatewayTypes={gatewayTypes || []} />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};

export default WarehouseGatewayScreen;
