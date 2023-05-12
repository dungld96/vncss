import React from 'react';
import { CursorsType } from 'configs/constant';
import { Box, Button } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface Props {
  setPaginate: (cursor: CursorsType) => void;
  paginate: CursorsType;
}

const Pagination: React.FC<Props> = ({ setPaginate, paginate }) => {
  if (!paginate.after && !paginate.before) return null;
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop="16px">
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
  );
};

export default Pagination;
