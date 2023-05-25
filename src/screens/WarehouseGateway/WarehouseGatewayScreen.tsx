import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListGatewayQuery } from '../../services/gateway.service';
import { selectGatewayState } from '../../state/modules/gateway/gatewayReducer';
import { WarehouseGatewayTable } from './WarehouseGatewayTable';

const WarehouseGatewayScreen = () => {
  const [trigger] = useLazyGetListGatewayQuery();
  const [paginate, setPaginate] = React.useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectGatewayState);

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser, limit]);

  return (
    <div>
      <WarehouseGatewayTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
};

export default WarehouseGatewayScreen;
