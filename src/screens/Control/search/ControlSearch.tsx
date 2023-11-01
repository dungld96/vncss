import React from 'react';
import { Box, IconButton, Paper, Autocomplete, TextField, Collapse, InputBase } from '@mui/material';
import SearchIcon from '../../../assets/icons/search-icon-2.svg';
import _ from 'lodash';

export default function CustomizedInputBase({ data }: any) {
  console.log(data);
  const [dataSearch, setData] = React.useState({});
  const [visibleInput, setvisibleInput] = React.useState(false);

  React.useEffect(() => {
    if (!_.isEmpty(dataSearch)) {
      // onSearch(dataSearch);
    }
  }, [dataSearch]);

  // const handleChangeValue = (itemSelect) => {
  //   const dataItem = data.filter((item) => item.imei === itemSelect)[0];
  //   setData(dataItem);
  //   if (itemSelect === '') {
  //     resetLocation();
  //   }
  // };

  const suggestions = data.map((item: any) => ({
    id: item.id,
    label: item.imei,
  }));

  const onSearchIconClick = () => {
    setvisibleInput((x) => !x);
  };

  return (
    <Paper
      style={{
        padding: '2px 4px',
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
            id="search-box"
            disableClearable
            options={[1, 2, 3]}
            renderInput={(params) => (
              <InputBase
                {...params}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm theo serial thiết bị"
                inputProps={{ ...params.InputProps }}
              />
            )}
          />
        </Box>
      )}
      <IconButton onClick={onSearchIconClick} style={{ padding: '16px' }} aria-label="search">
        <img src={SearchIcon} alt="" />
      </IconButton>
    </Paper>
  );
}
