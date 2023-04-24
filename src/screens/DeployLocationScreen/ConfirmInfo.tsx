import React from 'react';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Input } from '../../common';
import Select from '../../common/Select/Select';
import { dataTag } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface Props {
  maxHeight?: string | number;
}

const ConfirmInfo: React.FC<Props> = ({ maxHeight }) => {
  return (
    <SimpleBar style={{ maxHeight }}>
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>Thông tin chung</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Input style={{ width: '312px' }} topLable="Tên vị trí triển khai" />
          <Input style={{ width: '312px' }} topLable="Người liên hệ" />
          <Input style={{ width: '312px' }} topLable="Số điện thoại người liên hệ" />
          <Select fullWidth style={{ width: '312px' }} topLable="Tỉnh thành" />
          <Select fullWidth style={{ width: '312px' }} topLable="Quận, Huyện" />
          <Select fullWidth style={{ width: '312px' }} topLable="Phường, Xã" />
          <Input style={{ width: '312px' }} topLable="Tên đường, Toà nhà, Số nhà" />
          <Select fullWidth style={{ width: '312px' }} topLable="Loại hình kinh doanh" />
          <Input style={{ width: '312px' }} topLable="Ngày ký hợp đồng" />
        </Box>
      </Box>

      <Divider sx={{ margin: '0 16px !important' }} />
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>
          Cơ quan, Đơn vị giám sát vị trí
        </Typography>
        <Box>
          <TableTag tags={[dataTag[0]]} />
        </Box>
      </Box>
    </SimpleBar>
  );
};

export default ConfirmInfo;
