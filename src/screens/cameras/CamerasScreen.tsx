import React from 'react';
import { Box } from '@mui/material';
import CamerasTable from './CamerasTable';
import { useLazyGetListCameraQuery } from '../../services/cameras.service';
import { useAuth } from '../../hooks/useAuth';
import { CursorType } from '../../configs/constant';
import { useSelector } from 'react-redux';
import { selectCameraState, setLimit } from '../../state/modules/camera/cameraReducer';
import Pagination from '../../common/pagination/Pagination';
import { useAppDispatch } from '../../state/store';

export const CamerasScreen = () => {
  const [getCameras] = useLazyGetListCameraQuery();
  const [paginate, setPaginate] = React.useState<CursorType>({});
  const { cursor, limit } = useSelector(selectCameraState);
  const dispatch = useAppDispatch();

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      getCameras({ agencyId: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [getCameras, paginate, currentUser, limit]);

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit({ limit }));
  };

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <CamerasTable setPaginate={setPaginate} />
      <Pagination paginate={cursor} setPaginate={setPaginate} limit={limit} setLimit={handleSetLimit} />
    </Box>
  );
};
