import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { WarehouseNodeTable } from './WarehouseNodeTable';
import { CursorsType } from '../../configs/constant';
import { useSelector } from 'react-redux';
import { selectNodeState } from '../../state/modules/node/nodeReducer';
import Pagination from '../../common/pagination/Pagination';
import { useLazyGetListNodeQuery } from '../../services/node.service';

const WarehouseNodeScreen = () => {
  const [trigger] = useLazyGetListNodeQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectNodeState);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
  }, [trigger, paginate]);
  return (
    <div>
      <WarehouseNodeTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
};

export default WarehouseNodeScreen;
