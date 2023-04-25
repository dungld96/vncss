import React, { useState } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ImageIcon } from '../../utils/UtilsComponent';
import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';
import { Input } from 'common';

const randomId = () => Math.random().toString(36);

const UsersReceiveNoti = () => {
  const [listUsers, setListUsers] = useState([
    { id: 'YCINVzlKVKg7tZHROV2q', userName: 'Hàn Việt Anh', service: 'Nhân viên', userPhone: '0983888444' },
    { id: '2cCks2hpmCbuvyfn5rT', userName: 'Vũ Quang Anh', service: 'Trưởng phòng', userPhone: '0978456789' },
  ]);
  return (
    <TableContainer sx={{ border: 'none' }}>
      <Table
        border={1}
        sx={{
          borderRadius: '8px',
          borderCollapse: 'collapse',
          tableLayout: 'auto',
          border: 'none',
          overflow: 'hidden',
        }}
      >
        <TableHead sx={{ background: '#EEF2FA', border: 'none', borderTopLeftRadius: '8px' }}>
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
          {listUsers.map(({ id, userName, service, userPhone }) => (
            <TableRow key={id} sx={{ border: 'none' }}>
              <TableCell
                align="center"
                width={'340px'}
                sx={{ fontSize: '14px', padding: '0', fontWeight: '400', color: '#8F0A0C' }}
              >
                <Input
                  fullWidth
                  noOutLine
                  InputProps={{ style: { textAlign: 'center' } }}
                  style={{ textAlign: 'center' }}
                  value={userName}
                  placeholder="Nhập họ tên"
                />
              </TableCell>
              <TableCell
                align="center"
                width={'340px'}
                sx={{ fontSize: '14px', padding: '0', fontWeight: '500', color: '#1E2323' }}
              >
                <Input
                  fullWidth
                  noOutLine
                  InputProps={{ style: { textAlign: 'center' } }}
                  style={{ textAlign: 'center' }}
                  value={service}
                  placeholder="Nhập chức vụ"
                />
              </TableCell>
              <TableCell
                align="center"
                width={'340px'}
                sx={{ fontSize: '14px', padding: '0', fontWeight: '500', color: '#1E2323' }}
              >
                <Input
                  fullWidth
                  noOutLine
                  InputProps={{ style: { textAlign: 'center' } }}
                  style={{ textAlign: 'center' }}
                  value={userPhone}
                  placeholder="Nhập số điện thoại"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <ImageIcon image={deleteIconGray} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              border: 'none',
            }}
          >
            <TableCell colSpan={4} align="center" width={'100%'}>
              <Typography
                onClick={() =>
                  setListUsers([...listUsers, { id: randomId(), userName: '', service: '', userPhone: '' }])
                }
                sx={{
                  color: '#0075FF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
              >
                Thêm người nhận thông báo
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersReceiveNoti;
