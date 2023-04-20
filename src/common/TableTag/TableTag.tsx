import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const TableTag = () => {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];
  return (
    <TableContainer>
      <Table
        border={1}
        sx={{
          borderRadius: '8px',
        }}
        aria-label="caption table"
      >
        <caption style={{ textAlign: 'center' }}>
          <button>A basic table example with a caption</button>
        </caption>
        <TableHead>
          <TableRow>
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" width={'45%'}>
                {row.fat}
              </TableCell>
              <TableCell align="center" width={'45%'}>
                {row.carbs}
              </TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTag;
