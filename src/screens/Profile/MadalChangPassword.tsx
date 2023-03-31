import Modal from 'components/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'components/button/Button';
import { Input } from 'components';
import KeyIcon from '@mui/icons-material/Key';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});
const IconKey = styled(KeyIcon)({
  color: '#8B8C9B',
  fontSize: '20px',
});

const MadalChangPassword: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin đại lý">
      <ContentWrapper>
        <Input
          fullWidth
          topLable="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          iconStartAdorment={<IconKey />}
        />
        <Input fullWidth topLable="Mật khẩu mới" placeholder="Nhập mật khẩu mới" iconStartAdorment={<IconKey />} />
        <Input
          fullWidth
          topLable="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          iconStartAdorment={<IconKey />}
        />
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

export default MadalChangPassword;
