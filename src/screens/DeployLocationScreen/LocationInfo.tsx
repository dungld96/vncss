import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import AddIcon from '../../assets/icons/add-circle-red.svg';
import { Input } from '../../common';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import { dataTag } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import { ImageIcon } from '../../utils/UtilsComponent';

interface Props {
  maxHeight?: string | number;
}
const randomId = () => Math.random().toString(36).substr(2, 6);

const LocationInfo: React.FC<Props> = ({ maxHeight }) => {
  const [listUsersReceiveNoti, setListUsersReceiveNoti] = useState([
    { id: randomId(), userName: '', service: '', userPhone: '' },
  ]);
  return (
    <SimpleBar style={{ maxHeight }}>
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

      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop={'16px'}>
        {listUsersReceiveNoti.map((item, index) => {
          return (
            <Box marginBottom={'24px'}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>
                  Người nhận thông báo {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>
                    Nhận cuộc gọi và tin nhắn cảnh báo
                  </Typography>
                  <Switch sx={{ m: 1 }} defaultChecked />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Input style={{ width: '312px' }} topLable="Họ tên người nhận thông báo" placeholder="Nhập họ tên" />
                <Input style={{ width: '312px' }} topLable="Chức vụ" placeholder="Nhập chức vụ" />
                <Input style={{ width: '312px' }} topLable="Số điện thoại" placeholder="Nhập số điện thoại" />
              </Box>
            </Box>
          );
        })}

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            setListUsersReceiveNoti([
              ...listUsersReceiveNoti,
              { id: randomId(), userName: '', service: '', userPhone: '' },
            ])
          }
        >
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm vị trí triển khai</Box>
        </Button>
      </Box>
      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
          Cơ quan, Đơn vị giám sát vị trí
        </Typography>
        <Box>
          <TableTag tags={[dataTag[0]]} />
        </Box>
      </Box>
    </SimpleBar>
  );
};

export default LocationInfo;
