import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Tooltip, Card, Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import RefreshIcon from '../../../assets/icons/refresh-icon.svg';
import SettingIcon from '../../../assets/icons/setting-icon.svg';
import CloseIcon from '../../../assets/icons/close-icon.svg';
import { LocationInfo } from './LocationControlInfo';
import { LocationManager } from './LocationManager';
import { LocationDevice } from './LocationDevice';
import { useLazyGetControlLocationQuery } from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { LocationType } from '../../../state/modules/location/locationReducer';

const DLCard = styled(Card)({
  position: 'absolute',
  bottom: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const ContentBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  height: '100%',
  borderRadius: '2px',
  padding: '4px 16px 16px',
});

interface Props {
  selectedLocationId: string;
  locationName: string;
  onClose: () => void;
}

export const ControlDetail = ({ selectedLocationId, locationName, onClose }: Props) => {
  const [location, setLocation] = useState<LocationType>();


  const {
    auth: { currentUser },
  } = useAuth();
  const [getControlLocation] = useLazyGetControlLocationQuery();

  useEffect(() => {
    if (currentUser) {
      getControlLocation({ agencyId: currentUser.sub_id, locationId: selectedLocationId })
        .then(({ isSuccess, data }) => {
          if (isSuccess) {
            setLocation(data);
          }
        })
        .catch((err) => console.log('error', err));
    }
  }, [currentUser, getControlLocation, selectedLocationId]);

  

  const onClickRefresh = () => {};

  return (
    <DLCard elevation={0}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#8F0A0C',
          padding: '0 8px 0 20px',
          color: '#FFFFFF',
        }}
      >
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <img src={CloseIcon} alt="" style={{ width: '20px', height: '20px' }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '28px',
            flex: 1,
            marginLeft: '8px',
            padding: '8px 0',
          }}
        >
          {locationName}
        </Typography>
        <Tooltip title="Cài đặt">
          <IconButton aria-label="refresh" onClick={onClickRefresh}>
            <img src={SettingIcon} alt="" style={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Làm mới">
          <IconButton aria-label="refresh" onClick={onClickRefresh}>
            <img src={RefreshIcon} alt="" style={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#EEF2FA',
          padding: '4px 8px',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={1} sx={{ marginTop: '-4px', marginLeft: '-4px', height: 'calc(100% - 20px)' }}>
          <Grid item xs={12} sm={3}>
            <ContentBox>
              <LocationInfo location={location} />
              <LocationManager />
            </ContentBox>
          </Grid>
          <Grid item xs={12} sm={9}>
            <ContentBox>
              <LocationDevice location={location} />
            </ContentBox>
          </Grid>
        </Grid>
      </Box>
    </DLCard>
  );
};
