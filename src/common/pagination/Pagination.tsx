import React from 'react';
import { CursorsType } from 'configs/constant';
import { Box, Button } from '@mui/material';
import ArrowLeftIcon from '../../assets/icons/arrow-left-icon.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right-icon.svg';
import { ImageIcon } from 'utils/UtilsComponent';

interface Props {
  setPaginate: (cursor: CursorsType) => void;
  paginate: CursorsType;
}

const Pagination: React.FC<Props> = ({ setPaginate, paginate }) => {
  if(!paginate.after && !paginate.before) return null
  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginTop="16px">
      <Button
        sx={{
          margin: '0 16px',
          background: '#FFFFFF',
          borderRadius: '5px',
          minWidth: '30px',
          height: '30px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 3px 12px 0px',
        }}
        onClick={() => setPaginate({ before: paginate.before })}
        disabled={!paginate.before}
      >
        <ImageIcon image={ArrowLeftIcon} />
      </Button>
      <Button
        sx={{
          margin: '0 16px',
          background: '#FFFFFF',
          borderRadius: '5px',
          minWidth: '30px',
          height: '30px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 3px 12px 0px',
        }}
        onClick={() => setPaginate({ after: paginate.after })}
        disabled={!paginate.after}
      >
        <ImageIcon image={ArrowRightIcon} />
      </Button>
    </Box>
  );
};

export default Pagination;
