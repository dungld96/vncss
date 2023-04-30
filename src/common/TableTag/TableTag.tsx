import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { ImageIcon } from '../../utils/UtilsComponent';

import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';
import { dataTag, TagType } from './dataSelectTag';
import SelectTag from './SelectTag';

interface Props {
  tags: TagType[];
  hideButtonAdd?: boolean;
}

const TableTag: React.FC<Props> = ({ tags, hideButtonAdd }) => {
  return (
    <TableContainer
      sx={{
        border: 'none',
      }}
    >
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
        <TableHead
          sx={{
            background: '#EEF2FA',
            border: 'none',
            borderTopLeftRadius: '8px',
          }}
        >
          <TableRow>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Thẻ tag
            </TableCell>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Tên cơ quan, đơn vị
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map(({ tagName, agency }) => (
            <TableRow
              key={tagName}
              sx={{
                border: 'none',
              }}
            >
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '400', color: '#8F0A0C' }}>
                {tagName}
              </TableCell>
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '500', color: '#1E2323' }}>
                {agency}
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <ImageIcon image={deleteIconGray} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {!hideButtonAdd && (
            <TableRow
              sx={{
                border: 'none',
              }}
            >
              <TableCell colSpan={3} align="center" width={'100%'}>
                <SelectTag data={dataTag} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTag;
