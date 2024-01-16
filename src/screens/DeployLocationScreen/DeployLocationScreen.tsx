import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetListLocationsQuery } from '../../services/location.service';
import { selectLocationState, setLimit } from '../../state/modules/location/locationReducer';
import { DeployLocationTable } from './DeployLocationTable';
import { useAppDispatch } from '../../state/store';
import { useQueryParams, StringParam } from 'use-query-params';

const DeployLocationScreen = () => {
  const [query, setQuery] = useQueryParams({
    agencyId: StringParam,
    search: StringParam,
    business: StringParam,
  });
  const [trigger] = useLazyGetListLocationsQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit, total } = useSelector(selectLocationState);
  const dispatch = useAppDispatch();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({
        agency_id: currentUser?.sub_id,
        params: {
          limit,
          ...paginate,
          agency_id: query.agencyId !== 'all' ? query.agencyId : undefined,
          business: query.business !== 'all' ? query.business : undefined,
          name: query.search ? query.search : undefined,
        },
      });
    }
  }, [trigger, paginate, currentUser, limit, query]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  const refetch = () => {
    if (currentUser) {
      trigger({
        agency_id: currentUser?.sub_id,
        params: {
          limit,
          ...paginate,
          agency_id: query.agencyId !== 'all' ? query.agencyId : undefined,
          business: query.business !== 'all' ? query.business : undefined,
          name: query.search ? query.search : undefined,
        },
      });
    }
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <DeployLocationTable refetch={refetch} />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} total={total} />
    </Box>
  );
};

export default DeployLocationScreen;
