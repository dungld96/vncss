import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListRegulatoriesQuery } from '../../services/regulatory.service';
import { selectRegulatoryState, setLimit } from '../../state/modules/regulatory/regulatoryReducer';
import { RegulatoryAgenciesTable } from './RegulatoryAgenciesTable';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../state/store';

export default function RegulatoryAgenciesScreen() {
  const [trigger] = useLazyGetListRegulatoriesQuery();
  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit } = useSelector(selectRegulatoryState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    trigger({ limit, ...paginate });
  }, [trigger, limit, paginate]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <RegulatoryAgenciesTable />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
}
