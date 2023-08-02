import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import Button from '../../../../common/button/Button';
import SelectPosition from '../../../../common/SelectPosition/SelectPosition';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { LocationType } from '../../../../state/modules/location/locationReducer';
import {
  useLazyGetControlLocationsQuery,
  useUpdateLocationControlMutation,
} from '../../../../services/control.service';

interface Props {
  show: boolean;
  onClose: () => void;
  location: LocationType;
}

export const UpdateLatLng: React.FC<Props> = ({ show, location, onClose }) => {
  const [updateLocationControl] = useUpdateLocationControlMutation();
  const [selectedPosition, setSelectedPosition] = useState({
    lat: Number(location.lat),
    lng: Number(location.lng),
  });
  const [getControlLocations] = useLazyGetControlLocationsQuery();

  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();

  const handleSelectedPosition = (position: any) => {
    setSelectedPosition(position);
  };

  const handleSave = () => {
    const body = {
      lat: Number(selectedPosition?.lat),
      lng: Number(selectedPosition?.lng),
    };
    if (currentUser) {
      updateLocationControl({
        agencyId: currentUser.sub_id,
        locationId: location.id,
        data: body,
      })
        .then(() => {
          setSnackbar({ open: true, message: 'Cập nhật vị trí thành công', severity: 'success' });
          onClose();
          getControlLocations({ agency_id: currentUser.sub_id });
        })
        .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi cập nhật ví trí', severity: 'error' }));
    }
  };

  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth={'lg'}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '8px',
          height: 'calc(100vh - 150px)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle>
        <Box pb={1} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d9d9d9">
          <Typography style={{ fontWeight: '700', fontSize: '18px', lineHeight: '16px', color: '#1E2323' }}>
            {'Cập nhật vị trí triển khai'}
          </Typography>
          <IconButton>
            <Close onClick={onClose} style={{ color: '#8B8C9B' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers style={{ padding: 0 }}>
        <SelectPosition selectedPosition={selectedPosition} handleSelectedPosition={handleSelectedPosition} />
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <Button variant="outlined" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
