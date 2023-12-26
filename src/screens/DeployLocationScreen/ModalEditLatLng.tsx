import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import { useGetLocationQuery } from '../../services/location.service';
import { LocationType } from '../../state/modules/location/locationReducer';
import { Close } from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import SelectPosition from '../../common/SelectPosition/SelectPosition';
import { useUpdateLocationControlMutation } from '../../services/control.service';

interface Props {
  show: boolean;
  agencyId: string;
  locationId: string;
  onClose: () => void;
  handleSuccess?: () => void;
}

const ModalEditLatLng: React.FC<Props> = ({ show, onClose, agencyId, locationId, handleSuccess }) => {
  const [updateLocationControl, { isLoading }] = useUpdateLocationControlMutation();

  const { data: location } = useGetLocationQuery<{ data: LocationType }>({ agencyId, locationId });
  const { setSnackbar } = useSnackbar();
  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  useEffect(() => {
    if (location) {
      setSelectedPosition({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  const handleSelectedPosition = (position: any) => {
    setSelectedPosition(position);
  };

  const handleSubmit = () => {
    if (!location) return;
    const body = {
      lat: Number(selectedPosition?.lat),
      lng: Number(selectedPosition?.lng),
    };
    updateLocationControl({
      agencyId,
      locationId: location.id,
      data: body,
    })
      .then(() => {
        setSnackbar({ open: true, message: 'Cập nhật vị trí thành công', severity: 'success' });
        if (handleSuccess) {
          handleSuccess();
        }
        onClose();
      })
      .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi cập nhật ví trí', severity: 'error' }));
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontWeight: '700', fontSize: '18px', lineHeight: '16px', color: '#1E2323' }}>
            {'Cập nhật vị trí triển khai'}
          </Typography>
          <IconButton>
            <Close onClick={onClose} style={{ color: '#8B8C9B' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <SelectPosition selectedPosition={selectedPosition} handleSelectedPosition={handleSelectedPosition} />
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Đóng
        </Button>
        <Button style={{ width: 131 }} disabled={isLoading} onClick={handleSubmit} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditLatLng;
