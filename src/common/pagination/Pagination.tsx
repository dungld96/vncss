import React from 'react';
import { CursorType } from 'configs/constant';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface Props {
  setPaginate: (cursor: CursorType) => void;
  paginate: CursorType;
  setLimit: (limit: number) => void;
  limit: number;
}

const Pagination: React.FC<Props> = ({ setPaginate, setLimit, paginate, limit = 10 }) => {
  const handlePerPageChange = (e: SelectChangeEvent) => {
    setLimit(+e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" marginTop="16px" justifyContent="flex-end">
      <Box display="flex" alignItems="center" mr={2}>
        <InputLabel sx={{ marginRight: '16px' }}>Số hàng mỗi trang</InputLabel>
        <Select id="demo-simple-select" value={`${limit}`} variant="standard" onChange={handlePerPageChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          sx={{
            margin: '0 8px',
            background: '#FFFFFF',
            borderRadius: '5px',
            minWidth: '30px',
            height: '30px',
          }}
          onClick={() => setPaginate({ before: paginate.before })}
          disabled={!paginate.before}
        >
          <NavigateBefore />
        </Button>
        <Button
          sx={{
            margin: '0 8px',
            background: '#FFFFFF',
            borderRadius: '5px',
            minWidth: '30px',
            height: '30px',
          }}
          onClick={() => setPaginate({ after: paginate.after })}
          disabled={!paginate.after}
        >
          <NavigateNext />
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
