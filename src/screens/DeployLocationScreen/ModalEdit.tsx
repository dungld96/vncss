import { Button, DialogActions, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Modal from 'common/modal/Modal';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Input } from '../../common';
import Select from '../../common/Select/Select';
import { dataTag } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import UsersReceiveNoti from './UsersReceiveNoti';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ModalEdit: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal
      style={{
        height: 'calc(100vh - 150px)',
        maxHeight: '756px',
        maxWidth: '1136px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'visible',
      }}
      size="xl"
      show={show}
      close={onClose}
      title="Chỉnh sửa vị trí triển khai"
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <SimpleBar style={{ maxHeight: 'calc(100vh - 364px)' }}>
          <Box>
            <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>Thông tin chung</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Input style={{ width: '312px' }} topLable="Tên vị trí triển khai" placeholder="Nhập tên vị trí" />
              <Input style={{ width: '312px' }} topLable="Người liên hệ" placeholder="Nhập tên người liên hệ" />
              <Input
                style={{ width: '312px' }}
                topLable="Số điện thoại người liên hệ"
                placeholder="Nhập số điện thoại liên hệ"
              />
              <Select fullWidth style={{ width: '312px' }} topLable="Tỉnh thành" placeholder="Chọn tỉnh thành" />
              <Select fullWidth style={{ width: '312px' }} topLable="Quận, Huyện" placeholder="Chọn quận huyện" />
              <Select fullWidth style={{ width: '312px' }} topLable="Phường, Xã" placeholder="Chọn phường xã" />
              <Input style={{ width: '312px' }} topLable="Tên đường, Toà nhà, Số nhà" placeholder="Nhập địa chỉ" />
              <Select
                fullWidth
                style={{ width: '312px' }}
                topLable="Loại hình kinh doanh"
                placeholder="Chọn loại hình kinh doanh"
              />
              <Input style={{ width: '312px' }} topLable="Ngày ký hợp đồng" placeholder="DD/MM/YYYY" />
            </Box>
          </Box>
          <Box marginTop={'16px'}>
            <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
              Người nhận thông báo
            </Typography>
            <UsersReceiveNoti />
          </Box>
          <Box marginTop="32px">
            <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
              Cơ quan, Đơn vị giám sát vị trí
            </Typography>
            <Box>
              <TableTag tags={[dataTag[0]]} />
            </Box>
          </Box>
        </SimpleBar>
      </Box>
      <DialogActions sx={{ padding: 0 }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={() => onClose()}>
          Trước đó
        </Button>
        <Button style={{ width: 131 }} variant="contained" onClick={() => onClose()}>
          Tiếp theo
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalEdit;
