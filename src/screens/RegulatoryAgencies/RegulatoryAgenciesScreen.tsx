import Pagination from '../../common/pagination/Pagination';
import { CursorType } from '../../configs/constant';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useLazyGetListRegulatoriesQuery,
  useLazyGetListRegulatoriesSearchQuery,
} from '../../services/regulatory.service';
import { selectRegulatoryState, setLimit } from '../../state/modules/regulatory/regulatoryReducer';
import { RegulatoryAgenciesTable } from './RegulatoryAgenciesTable';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../state/store';

export default function RegulatoryAgenciesScreen() {
  const [getListRegulatories] = useLazyGetListRegulatoriesQuery();
  const [getListRegulatoriesSearch] = useLazyGetListRegulatoriesSearchQuery();

  const [paginate, setPaginate] = useState<CursorType>({});

  const { cursor, limit } = useSelector(selectRegulatoryState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getListRegulatories({ limit, ...paginate });
  }, [getListRegulatories, limit, paginate]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };
  const fetchFilter = (province?: string, district?: string) => {
    getListRegulatoriesSearch({ limit, ...paginate, province, district });
  };

  const refetch = () => {
    getListRegulatories({ limit, ...paginate });
  };
  return (
    <Box mt={2} ml={2} mr={'12px'} pb={4}>
      <RegulatoryAgenciesTable fetchFilter={fetchFilter} refetch={refetch} />
      {/* <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} /> */}
    </Box>
  );
}
