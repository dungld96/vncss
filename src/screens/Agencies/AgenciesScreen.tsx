import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLazyGetAllAgenciesQuery } from '../../services/agencies.service';

import { useAuth } from '../../hooks/useAuth';
import { AgenciesTable } from './AgenciesTable';

export default function AgenciesScreen() {
  const [trigger] = useLazyGetAllAgenciesQuery();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      trigger({ id: currentUser?.sub_id });
    }
  }, [trigger, currentUser]);
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <AgenciesTable />
    </Box>
  );
}
