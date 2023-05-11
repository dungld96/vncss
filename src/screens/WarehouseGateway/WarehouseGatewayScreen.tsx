import Pagination from 'common/pagination/Pagination';
import { CursorsType } from 'configs/constant';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListGatewayQuery } from 'services/gateway.service';
import { selectCursors } from 'state/modules/gateway/gatewayReducer';
import { WarehouseGatewayTable } from './WarehouseGatewayTable';

const WarehouseGatewayScreen = () => {
  const [trigger] = useLazyGetListGatewayQuery();
  const [paginate, setPaginate] = React.useState<CursorsType>({});

  const cursors = useSelector(selectCursors);

  React.useEffect(() => {
    trigger({ id: 2, params: { limit: 2, ...paginate } });
  }, [trigger, paginate]);

  return (
    <div>
      <WarehouseGatewayTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
};

export default WarehouseGatewayScreen;
