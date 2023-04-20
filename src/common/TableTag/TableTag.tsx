import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { ImageIcon } from 'utils/UtilsComponent';

import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';
import { dataTag, TagType } from './dataSelectTag';
import SelectTag from './SelectTag';

interface Props {
  tags: TagType[];
}

const TableTag: React.FC<Props> = ({ tags }) => {
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
          borderCollapse: 'unset',
          tableLayout: 'auto',
          // border: '1px solid #C5C6D2',
        }}
      >
        <TableHead
          sx={{
            background: '#EEF2FA',
            border: 'none',
            borderTopLeftRadius: '8px',
          }}
        >
          <TableRow
            sx={{
              border: 'none',
            }}
          >
            <TableCell align="center" width={'45%'}>
              Thẻ tag
            </TableCell>
            <TableCell align="center" width={'45%'}>
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
              <TableCell align="center" width={'45%'}>
                {tagName}
              </TableCell>
              <TableCell align="center" width={'45%'}>
                {agency}
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
            <TableCell colSpan={3} align="center" width={'100%'}>
              <SelectTag data={dataTag} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTag;
