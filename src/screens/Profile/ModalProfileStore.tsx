import Modal from 'common/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});

const ModalProfileStore: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin đại lý">
      <ContentWrapper>
        <Input fullWidth topLable="Tên đại lý" />
        <Input fullWidth topLable="Địa chỉ" />
      </ContentWrapper>

      <DialogActions sx={{ padding: 0 }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Quay lại
        </Button>
        <Button style={{ width: 131 }} variant="contained">
          Lưu lại
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalProfileStore;
