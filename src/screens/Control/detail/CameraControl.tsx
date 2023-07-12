import { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Badge, Button, ButtonGroup } from '@mui/material';
import { AddCircleOutline, ArrowDropDown } from '@mui/icons-material';
import ActiveCameraIcon from '../../../assets/icons/active-camera-icon.svg';
import CameraIcon from '../../../assets/icons/camera-icon.svg';
import { CameraLive } from './CameraLive';
import {
  ControlLocationCameraType,
  useLazyGetControlLocationCamerasQuery,
  useLazyGetControlLocationCameraImageQuery,
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { LocationType } from '../../../state/modules/location/locationReducer';
import { AddCameraDialog } from './AddCameraDialog';
import { CameraImages } from './CameraImages';

export const CameraControl = ({ location }: { location: LocationType }) => {
  const [getControlCameras, { data }] = useLazyGetControlLocationCamerasQuery();
  const [getControlCameraImages, { data: images }] = useLazyGetControlLocationCameraImageQuery();
  const [openAdd, setOpenAdd] = useState(false);
  const [imageMode, setImageMode] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<ControlLocationCameraType>();
  const {
    auth: { currentUser },
  } = useAuth();

  const onChangeMode = () => {
    setImageMode(!imageMode);
  };

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationCamerasFetch();
    }
  }, [currentUser, location]);

  useEffect(() => {
    if (currentUser && location && selectedCamera) {
      getControlCameraImagesFetch();
    }
  }, [currentUser, location, selectedCamera]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedCamera(data[0]);
    }
  }, [data]);

  const getControlLocationCamerasFetch = async () => {
    if (currentUser && location) {
      await getControlCameras(
        {
          agencyId: currentUser.sub_id,
          locationId: location.id,
        },
        false
      ).unwrap();
    }
  };

  const getControlCameraImagesFetch = async () => {
    if (currentUser && location && selectedCamera) {
      await getControlCameraImages(
        {
          agencyId: currentUser.sub_id,
          locationId: location.id,
          cameraboxeId: selectedCamera.boxserial,
          cameraId: selectedCamera.camId,
        },
        false
      ).unwrap();
    }
  };

  const cameras = (data || []) as ControlLocationCameraType[];
  const imageUrls = (images || []) as string[];

  return (
    <Box mr={'12px'}>
      <Grid container spacing={1}>
        <Grid item xs={3} style={{ borderRight: '1px solid #EEF2FA', paddingRight: '16px' }}>
          <Box pb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography style={{ fontWeight: 500 }}>Danh sách camera</Typography>
              {cameras.length === 0 && (
                <IconButton onClick={() => setOpenAdd(true)}>
                  <AddCircleOutline />
                </IconButton>
              )}
            </Box>
            <Box mt={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb="12px"
                style={{ borderBottom: '1px solid #EEF2FA' }}
              >
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={ActiveCameraIcon} alt="" />
                  </Box>
                  <Box px={2}>
                    <Typography style={{ color: '#8F0A0C', fontWeight: 600, fontSize: '14px' }}>CAMERA BOX</Typography>
                    <Typography style={{ color: '#8F0A0C', fontSize: '12px' }}>{cameras.length} camera</Typography>
                  </Box>
                </Box>
                <ArrowDropDown style={{ color: '#8F0A0C' }} />
              </Box>
              <Box maxHeight="300px" overflow="auto">
                {cameras.map((camera, index) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    py="12px"
                    style={{ borderBottom: '1px solid #EEF2FA', cursor: 'pointer' }}
                    onClick={() => setSelectedCamera(camera)}
                  >
                    <Box>
                      <Badge color="success" variant="dot" invisible={false}>
                        <img src={selectedCamera?.camId === camera.camId ? ActiveCameraIcon : CameraIcon} alt="" />
                      </Badge>
                    </Box>
                    <Box px={2}>
                      <Typography
                        style={{
                          color: selectedCamera?.camId === camera.camId ? '#8F0A0C' : '#8B8C9B',
                          fontWeight: 600,
                          fontSize: '14px',
                        }}
                      >
                        CAM {index + 1} - {camera.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          {selectedCamera && (
            <Box>
              <Box display="flex" alignItems="center">
                <Typography style={{ fontWeight: 500 }}>Thông tin</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Loại:</Typography>
                <Typography style={{ fontSize: '14px' }}>{selectedCamera.name}</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Serial:</Typography>
                <Typography style={{ fontSize: '14px' }}>{selectedCamera.camId}</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Phiên bản:</Typography>
                <Typography style={{ fontSize: '14px' }}>1.0</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Tên NVR:</Typography>
                <Typography style={{ fontSize: '14px' }}>BOX 1</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>MAC Address:</Typography>
                <Typography style={{ fontSize: '14px' }}>--</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
                <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>IP address:</Typography>
                <Typography style={{ fontSize: '14px' }}>{selectedCamera.camip}</Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={9} style={{ paddingLeft: '8px' }}>
          <Box display="flex" justifyContent="center" my={2}>
            <ButtonGroup disableElevation>
              <Button
                style={{
                  textTransform: 'none',
                  width: '140px',
                  borderRadius: '16px',
                  marginRight: '-30px',
                  padding: '10px 12px',
                  height: '38px',
                  zIndex: imageMode ? 1 : undefined,
                }}
                onClick={onChangeMode}
                variant={imageMode ? 'contained' : 'outlined'}
                color={imageMode ? 'primary' : undefined}
              >
                <Typography color={imageMode ? undefined : 'primary'} style={{ fontSize: '14px', fontWeight: 700 }}>
                  Hình ảnh
                </Typography>
              </Button>
              <Button
                style={{
                  textTransform: 'none',
                  width: '140px',
                  borderRadius: '16px',
                  padding: '10px 12px',
                  height: '38px',
                }}
                onClick={onChangeMode}
                variant={!imageMode ? 'contained' : 'outlined'}
                color={!imageMode ? 'primary' : undefined}
              >
                <Typography color={!imageMode ? undefined : 'primary'} style={{ fontSize: '14px', fontWeight: 700 }}>
                  Trực tiếp
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
          {selectedCamera && (
            <Box>{imageMode ? <CameraImages imageUrls={imageUrls} /> : <CameraLive camera={selectedCamera} />}</Box>
          )}
        </Grid>
      </Grid>
      {openAdd && (
        <AddCameraDialog
          locationId={location.id}
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onSuccess={getControlLocationCamerasFetch}
        />
      )}
    </Box>
  );
};
