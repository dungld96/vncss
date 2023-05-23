import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListLocationsQuery } from '../../services/location.service';
import { selectLocationState } from '../../state/modules/location/locationReducer';
import { DeployLocationTable } from './DeployLocationTable';

const DeployLocationScreen = () => {
  const [trigger] = useLazyGetListLocationsQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectLocationState);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
  }, [trigger, paginate]);

  return (
    <div>
      <DeployLocationTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
};

export default DeployLocationScreen;
