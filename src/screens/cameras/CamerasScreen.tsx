import React from 'react';
import { Box } from '@mui/material';
import CamerasTable from './CamerasTable';
import { useLazyGetListCameraQuery } from '../../services/cameras.service';
import { useAuth } from '../../hooks/useAuth';
import { CursorsType } from '../../configs/constant';
import { useSelector } from 'react-redux';
import { selectCameraState } from '../../state/modules/camera/cameraReducer';
import Pagination from '../../common/pagination/Pagination';

export const CamerasScreen = () => {
  const [getCameras] = useLazyGetListCameraQuery();
  const [paginate, setPaginate] = React.useState<CursorsType>({});

  const { cursors, limit } = useSelector(selectCameraState);

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      getCameras({ agencyId: currentUser?.sub_id, params: { limit, ...paginate } });
    }
  }, [getCameras, paginate, currentUser, limit]);

  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <CamerasTable setPaginate={setPaginate}/>
      <Pagination paginate={cursors} setPaginate={setPaginate} />
    </Box>
  );
};
