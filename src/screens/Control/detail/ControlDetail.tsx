import React, { useEffect } from 'react';
import { IconButton, Typography, Tooltip, Card, Box, Grid, Popover } from '@mui/material';
import styled from '@emotion/styled';
import RefreshIcon from '../../../assets/icons/refresh-icon.svg';
import SettingIcon from '../../../assets/icons/setting-icon.svg';
import CloseIcon from '../../../assets/icons/close-icon.svg';
import { LocationInfo } from './LocationControlInfo';
import { LocationManager } from './LocationManager';
import { LocationDevice } from './LocationDevice';
import { useLazyGetControlLocationQuery, useLazyGetControlLocationsQuery } from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { LocationType, EventReceiveType } from '../../../state/modules/location/locationReducer';
import { useUpdateLocationControlMutation } from '../../../services/control.service';
import { useSnackbar } from '../../../hooks/useSnackbar';
import ModalEdit from '../../../screens/DeployLocationScreen/ModalEdit';
import { UpdateLatLng } from './dialogs/UpdateLatLng';
import Loading from 'common/Loading/Loading';

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
  const [locationSettingAnchorEl, setLocationSettingAnchorEl] = React.useState<any>();
  const [openUpdateLocationDialog, setOpenUpdateLocationDialog] = React.useState(false);
  const [openUpdateLatLngDialog, setOpenUpdateLatLngDialog] = React.useState(false);
  const [getControlLocation, result] = useLazyGetControlLocationQuery();
  const [updateLocationControl] = useUpdateLocationControlMutation();
  const [getControlLocations] = useLazyGetControlLocationsQuery();
  const { setSnackbar } = useSnackbar();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser && selectedLocationId) {
      getControlLocation({ agencyId: currentUser.sub_id, locationId: selectedLocationId }).unwrap();
    }
  }, [currentUser, getControlLocation, selectedLocationId]);

  const onRefresh = () => {
    if (currentUser && selectedLocationId) {
      getControlLocation({ agencyId: currentUser.sub_id, locationId: selectedLocationId }, false).unwrap();
      onRefreshLocationsStatus();
    }
  };

  const onRefreshLocationsStatus = () => {
    if (currentUser) {
      getControlLocations({ agency_id: currentUser.sub_id }, false).unwrap();
    }
  };

  const handleSaveEnableEventNumber = (eventReceivers: EventReceiveType[]) => {
    if (currentUser && selectedLocationId) {
      updateLocationControl({
        agencyId: currentUser.sub_id,
        locationId: selectedLocationId,
        data: { event_receivers: [...eventReceivers] },
      }).then((res) => {
        onRefresh();
        setSnackbar({ open: true, message: 'Cập nhận dánh sách nhận cảnh báo thành công', severity: 'success' });
      });
    }
  };

  const onClickLocationSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLocationSettingAnchorEl(event.currentTarget);
  };
  const onCloseLatLngUpdate = () => {
    setOpenUpdateLatLngDialog(false);
    onRefresh();
  };

  const location = result.data as LocationType;

  return (
    <DLCard elevation={0}>
      {selectedLocationId && currentUser && openUpdateLocationDialog && (
        <ModalEdit
          show={openUpdateLocationDialog}
          onClose={() => setOpenUpdateLocationDialog(false)}
          locationId={selectedLocationId}
          agencyId={currentUser.sub_id}
          handleSuccess={onRefresh}
        />
      )}
      {location && <UpdateLatLng location={location} show={openUpdateLatLngDialog} onClose={onCloseLatLngUpdate} />}

      {result.isLoading || result.isFetching ? (
        <Loading />
      ) : (
        <>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#E13153',
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
              <IconButton aria-label="refresh" onClick={onClickLocationSetting}>
                <img src={SettingIcon} alt="" style={{ width: '20px', height: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Làm mới">
              <IconButton aria-label="refresh" onClick={onRefresh}>
                <img src={RefreshIcon} alt="" style={{ width: '20px', height: '20px' }} />
              </IconButton>
            </Tooltip>
            <Popover
              open={!!locationSettingAnchorEl}
              anchorEl={locationSettingAnchorEl}
              onClose={() => setLocationSettingAnchorEl(undefined)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box py={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: ' 0 16px 16px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Cài đặt vị trí triển khai
                </Typography>
                <Box
                  p={2}
                  style={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    borderBottom: '1px solid #ddd',
                  }}
                  onClick={() => {
                    setOpenUpdateLocationDialog(true);
                    setLocationSettingAnchorEl(undefined);
                  }}
                >
                  Chỉnh sửa thông tin vị trí
                </Box>
                <Box
                  p={2}
                  style={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    borderBottom: '1px solid #ddd',
                  }}
                  onClick={() => {
                    setOpenUpdateLatLngDialog(true);
                    setOpenUpdateLocationDialog(false);
                    setLocationSettingAnchorEl(undefined);
                  }}
                >
                  Chỉnh sửa toạ độ vị trí
                </Box>
              </Box>
            </Popover>
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
                  {location && (
                    <LocationManager
                      eventReceivers={location.event_receivers || []}
                      locationId={location.id}
                      refetch={onRefresh}
                      enableEventNumber={handleSaveEnableEventNumber}
                    />
                  )}
                </ContentBox>
              </Grid>
              <Grid item xs={12} sm={9}>
                <ContentBox>
                  <LocationDevice location={location} refetchLocation={onRefresh} />
                </ContentBox>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </DLCard>
  );
};
