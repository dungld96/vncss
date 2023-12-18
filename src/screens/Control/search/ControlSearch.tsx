import React from 'react';
import { Box, IconButton, Paper, Autocomplete, TextField, styled } from '@mui/material';
import SearchIcon from '../../../assets/icons/search-in-map.svg';
import _ from 'lodash';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];

const CssTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    padding: '0 8px !important',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
});

export default function CustomizedInputBase({ data, onSearch, resetLocation }: any) {
  const [visibleInput, setvisibleInput] = React.useState(false);

  const handleChangeValue = (e: any, value: any) => {
    if (value) {
      onSearch(value.id);
    } else {
      resetLocation();
    }
  };

  const suggestions = data.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));

  const onSearchIconClick = () => {
    setvisibleInput((x) => !x);
  };

  return (
    <Paper
      style={{
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
      }}
    >
      {visibleInput && (
        <Box width={'240px'}>
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={suggestions}
            sx={{ width: 250, height: 40 }}
            renderInput={(params) => <CssTextField placeholder="Nhập tên vị trí để tìm kiếm" {...params} />}
            onChange={handleChangeValue}
          />
        </Box>
      )}
      <IconButton onClick={onSearchIconClick} aria-label="search" style={{ borderRadius: '5px', padding: '5px' }}>
        <img style={{ padding: '2px', width: '24px' }} src={SearchIcon} alt="" />
      </IconButton>
    </Paper>
  );
}
