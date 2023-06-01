import Pagination from '../../common/pagination/Pagination';
import { CursorsType } from '../../configs/constant';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetListRegulatoriesQuery } from '../../services/regulatory.service';
import { selectRegulatoryState } from '../../state/modules/regulatory/regulatoryReducer';
import { RegulatoryAgenciesTable } from './RegulatoryAgenciesTable';

export default function RegulatoryAgenciesScreen() {
  const [trigger] = useLazyGetListRegulatoriesQuery();
  const [paginate, setPaginate] = useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectRegulatoryState);

  useEffect(() => {
    trigger({ limit, ...paginate });
  }, [trigger, limit, paginate]);
  return (
    <div>
      <RegulatoryAgenciesTable />
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </div>
  );
}
