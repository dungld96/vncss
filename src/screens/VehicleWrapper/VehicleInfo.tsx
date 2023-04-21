import { Box, Typography } from '@mui/material';
import { Input } from '../../common';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import React from 'react';
import TableTag from '../../common/TableTag/TableTag';
import Select from '../../common/Select/Select';
import { dataTag } from '../../common/TableTag/dataSelectTag';

interface Props {
  maxHeight?: string | number;
}

const VehicleInfo: React.FC<Props> = ({ maxHeight }) => {
  return (
    <SimpleBar style={{ maxHeight }}>
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>Thông tin chung</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Input style={{ width: '312px' }} topLable="Tên phương tiện trọng yếu" />
          <Select fullWidth style={{ width: '312px' }} topLable="Đơn vị, cơ quan giám sát" />
          <Input style={{ width: '312px' }} topLable="Số điện thoại liên hệ" />
          <Select fullWidth style={{ width: '312px' }} topLable="Tỉnh thành" />
          <Select fullWidth style={{ width: '312px' }} topLable="Quận, Huyện" />
          <Select fullWidth style={{ width: '312px' }} topLable="Phường, Xã" />
          <Input style={{ width: '312px' }} topLable="Biển số" />
          <Select fullWidth style={{ width: '312px' }} topLable="Loại hình phương tiện" />
          <Input style={{ width: '312px' }} topLable="Số sim thiết bị" />
        </Box>
      </Box>
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

export default VehicleInfo;
