import Modal from 'components/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'components/button/Button';
import { Input } from 'components';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  overflow: 'hidden',
  marginBottom: 32,
});

const ModalProfileUser: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin người dùng">
      <ContentWrapper>
        <Input style={{ width: 286 }} topLable="Tên người sử dụng" />
        <Input style={{ width: 286 }} topLable="Email" />
        <Input style={{ width: 286 }} topLable="Số điện thoại" />
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

export default ModalProfileUser;
