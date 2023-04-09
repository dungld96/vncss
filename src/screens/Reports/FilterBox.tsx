import { Box, Button as ButtonBase, Popover, Popper, Typography } from '@mui/material';
import Button from 'common/button/Button';
import Select from 'common/Select/Select';
import React from 'react';
import { useState, useRef } from 'react';
import { ImageIcon } from 'utils/UtilsComponent';
import FilterIcon from '../../assets/icons/filter-icon.svg';
import { selectAgencies } from './mockData';

const FilterBox = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-simple-popover' : undefined;

  const [agency, setAgency] = useState('all');

  return (
    <Box>
      <ButtonBase aria-describedby={id} onClick={handleClick}>
        <ImageIcon image={FilterIcon} />
        <Box sx={{ marginLeft: '8px' }}>Bộ lọc</Box>
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: '20px 20px 32px',
            width: 500,
            borderRadius: '12px',
            boxSizing: 'border-box',
          },
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '32px',
            color: '#1E2323',
          }}
        >
          Bộ lọc
        </h3>
        <Box
          sx={{
            mt: '4px',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            overflow: 'hidden',
          }}
        >
          <Select
            style={{ width: 222 }}
            topLable="Đại lý"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
          <Select
            style={{ width: 222 }}
            topLable="Thời gian"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
          <Select
            style={{ width: 222 }}
            topLable="Cơ quản quản lý"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
          <Select
            style={{ width: 222 }}
            topLable="Đơn vị giám sát"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
          <Select
            style={{ width: 222 }}
            topLable="Loại thiết bị"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
          <Select
            style={{ width: 222 }}
            topLable="Loại nhật ký"
            data={selectAgencies}
            setSelected={setAgency}
            selected={agency}
          />
        </Box>
        <Box sx={{ mt: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ width: 131, marginRight: 8 }} variant="outlined" onClick={handleClose}>
            Xoá bộ lọc
          </Button>
          <Button type="submit" style={{ width: 131 }} variant="contained" onClick={handleClose}>
            Áp dụng
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterBox;
