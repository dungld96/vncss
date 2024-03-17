import {
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';
import TableTag from '../../common/TableTag/TableTag';
import { ImageIcon } from '../../utils/UtilsComponent';
import { LocationType } from '../../state/modules/location/locationReducer';

interface Props {
  values: LocationType;
  setFieldValue(field: keyof LocationType, value: any): void;
  isSubmitting?: boolean;
}

const RenderInfor = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box display={'flex'} alignItems="center" justifyContent={'space-between'} marginBottom="24px">
      <Typography sx={{ fontSize: '14px', lineHeight: '22px', fontWeight: '400', color: '#8B8C9B' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '14px', lineHeight: '22px', fontWeight: '500', color: '#1E2323' }}>
        {value}
      </Typography>
    </Box>
  );
};

const ConfirmInfo: React.FC<Props> = ({ values, setFieldValue, isSubmitting }) => {
  const {
    event_receivers,
    address,
    commune,
    contact_name,
    contact_number,
    contract_date,
    district,
    name,
    province,
    tags,
    lat,
    lng,
  } = values;

  const stringAddress = address + ', ' + commune + ', ' + district + ', ' + province;
  return (
    <Box px={3} pb={3}>
      <Box>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px', marginTop: '16px' }}
        >
          Thông tin chung
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ width: '43%' }}>
            <RenderInfor label="Tên vị trí triển khai:" value={name} />
            <RenderInfor label="Địa chỉ:" value={stringAddress} />
            <RenderInfor label="Người liên hệ" value={contact_name} />
            <RenderInfor label="SĐT người liên hệ" value={contact_number} />
          </Box>
          <Box sx={{ width: '43%' }}>
            <RenderInfor label="Loại hình kinh doanh" value="Ngân hàng" />
            <RenderInfor label="Ngày ký hợp đồng" value={contract_date} />
            <RenderInfor label="Ngày bảo trì tiếp theo" value="15/06/2023" />
            <RenderInfor label="Kinh độ/Vĩ độ" value={lng + ' - ' + lat} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ margin: '0 16px !important' }} />
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
          Người nhận thông báo
        </Typography>
        <Box>
          <TableContainer sx={{ borderRadius: '4px' }}>
            <Table
              border={1}
              style={{
                borderCollapse: 'collapse',
                tableLayout: 'auto',
                border: 'none',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
            >
              <TableHead sx={{ background: '#EEF2FA' }}>
                <TableRow>
                  <TableCell align="center" width={'340px'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
                    Họ Tên
                  </TableCell>
                  <TableCell align="center" width={'340px'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
                    Chức vụ
                  </TableCell>
                  <TableCell align="center" width={'340px'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event_receivers
                  ?.filter((item) => item.phone && item.name)
                  .map((userReceive) => (
                    <TableRow key={uuidv4()}>
                      <TableCell
                        align="center"
                        width={'340px'}
                        sx={{ fontSize: '14px', fontWeight: '400', color: '#8F0A0C' }}
                      >
                        {userReceive.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={'340px'}
                        sx={{ fontSize: '14px', fontWeight: '500', color: '#1E2323' }}
                      >
                        {userReceive.position}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={'340px'}
                        sx={{ fontSize: '14px', fontWeight: '500', color: '#1E2323' }}
                      >
                        {userReceive.phone}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <ImageIcon image={deleteIconGray} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
          Cơ quan, Đơn vị giám sát vị trí
        </Typography>
        <Box>
          <TableTag tags={tags as any} hideButtonAdd onSelected={(tags) => setFieldValue('tags', tags)} />
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmInfo;
