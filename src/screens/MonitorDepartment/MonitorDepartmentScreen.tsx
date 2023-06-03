import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListOrganizationsQuery } from '../../services/organizations.service';
import { selectOrganizationState } from '../../state/modules/organization/organizationReducer';
import { MonitorDepartmentTable } from './MonitorDepartmentTable';

const MonitorDepartmentScreen = () => {
  const [trigger] = useLazyGetListOrganizationsQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectOrganizationState);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ agency_id: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [trigger, paginate, currentUser, limit]);

  return (
    <div>
      <MonitorDepartmentTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
};

export default MonitorDepartmentScreen;
