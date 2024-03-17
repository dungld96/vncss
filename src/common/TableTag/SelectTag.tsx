import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TagType } from './dataSelectTag';

interface Props {
  data: TagType[];
}

const SelectTag: React.FC<Props> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-simple-popover' : undefined;

  return (
    <Box>
      <Typography
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          color: '#0075FF',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '400',
        }}
      >
        Thêm tag cơ quan, đơn vị quản lý
      </Typography>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: '8px 20px',
            width: '375px',
            borderRadius: '12px',
            boxSizing: 'border-box',
          },
        }}
      >
        {data.map((i) => (
          <>
            <MenuItem
              sx={{
                height: '56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '22px' }}>{i.name}</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '22px', color: '#8B8C9B' }}>
                {i.tag}
              </Typography>
            </MenuItem>
            <Divider sx={{ margin: '0 16px !important', borderColor: '#EEF2FA' }} />
          </>
        ))}
      </Menu>
    </Box>
  );
};

export default SelectTag;
