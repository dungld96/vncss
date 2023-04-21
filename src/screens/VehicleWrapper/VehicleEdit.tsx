import { Box, DialogActions } from '@mui/material';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import React from 'react';
import VehicleInfo from './VehicleInfo';

interface Props {
  isProtect: boolean;
  show: boolean;
  onClose: () => void;
}

const VehicleEdit: React.FC<Props> = ({ isProtect, show, onClose }) => {
  return (
    <Modal
      style={{
        height: 'calc(100vh - 150px)',
        maxHeight: '756px',
        maxWidth: '1136px',
        display: 'flex',
        flexDirection: 'column',
      }}
      size="xl"
      show={show}
      close={onClose}
      title={`Chỉnh sửa phương tiện ${isProtect ? 'trọng yếu' : 'tuần tra'}`}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <VehicleInfo maxHeight="calc(100vh - 300px)" />
      </Box>
      <DialogActions sx={{ padding: 0 }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Quay lại
        </Button>
        <Button style={{ width: 131 }} variant="contained" onClick={onClose}>
          Lưu chỉnh sửa
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default VehicleEdit;
