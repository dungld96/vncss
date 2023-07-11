import { useState } from 'react';
import { Box, Grid, Typography, IconButton, Badge, Button, ButtonGroup } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import ImageGallery from 'react-image-gallery';
import ActiveCameraIcon from '../../../assets/icons/active-camera-icon.svg';
import CameraIcon from '../../../assets/icons/camera-icon.svg';
import { CameraLive } from './CameraLive';

export const CameraControl = () => {
  const [imageMode, setImageMode] = useState(true);

  const onChangeMode = () => {
    setImageMode(!imageMode);
  };

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <Box mr={'12px'}>
      <Grid container spacing={1}>
        <Grid item xs={3} style={{ borderRight: '1px solid #EEF2FA', paddingRight: '16px' }}>
          <Box pb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography style={{ fontWeight: 500 }}>Danh sách camera</Typography>
              <IconButton>
                <AddCircleOutline />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center" pb="12px" style={{ borderBottom: '1px solid #EEF2FA' }}>
              <Box>
                <img src={ActiveCameraIcon} alt="" />
              </Box>
              <Box px={2}>
                <Typography style={{ color: '#8F0A0C', fontWeight: 600, fontSize: '14px' }}>Broker NVR</Typography>
                <Typography style={{ color: '#8F0A0C', fontSize: '12px' }}>4 camera</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" py="12px" style={{ borderBottom: '1px solid #EEF2FA' }}>
              <Box>
                <Badge color="success" variant="dot" invisible={false}>
                  <img src={CameraIcon} alt="" />
                </Badge>
              </Box>
              <Box px={2}>
                <Typography style={{ color: '#8B8C9B', fontWeight: 600, fontSize: '14px' }}>
                  CAM 1 - Sảnh chờ
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" py="12px" style={{ borderBottom: '1px solid #EEF2FA' }}>
              <Box>
                <Badge color="success" variant="dot" invisible={false}>
                  <img src={CameraIcon} alt="" />
                </Badge>
              </Box>
              <Box px={2}>
                <Typography style={{ color: '#8B8C9B', fontWeight: 600, fontSize: '14px' }}>
                  CAM 1 - Sảnh chờ
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" py="12px" style={{ borderBottom: '1px solid #EEF2FA' }}>
              <Box>
                <Badge color="success" variant="dot" invisible={false}>
                  <img src={CameraIcon} alt="" />
                </Badge>
              </Box>
              <Box px={2}>
                <Typography style={{ color: '#8B8C9B', fontWeight: 600, fontSize: '14px' }}>
                  CAM 1 - Sảnh chờ
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: 500 }}>Thông tin</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Loại:</Typography>
              <Typography style={{ fontSize: '14px' }}>Camera01</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Serial:</Typography>
              <Typography style={{ fontSize: '14px' }}>SDFSDASDASASDSA</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Phiên bản:</Typography>
              <Typography style={{ fontSize: '14px' }}>1.0</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>Tên NVR:</Typography>
              <Typography style={{ fontSize: '14px' }}>ABC</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>MAC Address:</Typography>
              <Typography style={{ fontSize: '14px' }}>AG AG KH KJ GH</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" py="12px">
              <Typography style={{ color: '#8B8C9B', fontSize: '14px' }}>IP address:</Typography>
              <Typography style={{ fontSize: '14px' }}>127.0.0.1</Typography>
            </Box>
          </Box>
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
          <Box>{imageMode ? <ImageGallery items={images} /> : <CameraLive />}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};
