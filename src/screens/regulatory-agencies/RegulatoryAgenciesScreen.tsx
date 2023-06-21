import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListRegulatoriesQuery } from '../../services/regulatory.service';
import { selectRegulatoryState } from '../../state/modules/regulatory/regulatoryReducer';
import { RegulatoryAgenciesTable } from './RegulatoryAgenciesTable';
import { Box } from '@mui/material';

export default function RegulatoryAgenciesScreen() {
  const [trigger] = useLazyGetListRegulatoriesQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectRegulatoryState);

  useEffect(() => {
    trigger({ limit, ...paginate });
  }, [trigger, limit, paginate]);
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <RegulatoryAgenciesTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
}
