import Modal from '../../common/modal/Modal';
import { dataTag, TagType } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import React from 'react';
import { DialogActions } from '@mui/material';
import Button from '../../common/button/Button';

interface Props {
  show: boolean;
  onClose: () => void;
  tags?: TagType[];
}

const ModalEditTags: React.FC<Props> = ({ show, onClose, tags }) => {
  return (
    <Modal size="sm" show={show} close={onClose} title="Chỉnh sửa thẻ tag">
      <TableTag tags={[dataTag[0]]} />
      <DialogActions sx={{ padding: 0, marginTop: '32px' }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Quay lại
        </Button>
        <Button type="submit" style={{ width: 131 }} variant="contained">
          Lưu lại
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalEditTags;
