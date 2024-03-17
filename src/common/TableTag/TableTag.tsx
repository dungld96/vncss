import {
  Autocomplete,
  Box,
  Divider,
  FormHelperText,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ImageIcon } from '../../utils/UtilsComponent';

import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';
import { useLazySearchTagsQuery } from 'services/location.service';
import { NormalInput } from 'common/input/NormalInput';
import { debounce } from 'lodash';
import { useDebounce } from 'hooks/useDebonce';
interface TagType {
  tag: string;
  name: string;
}
interface Props {
  tags: TagType[];
  hideButtonAdd?: boolean;
  onSelected?: (tags: TagType[]) => void;
  error?: string;
  errorEmpty?: boolean;
}

const TableTag: React.FC<Props> = ({ tags, hideButtonAdd, error, onSelected, errorEmpty }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly any[]>([]);
  const touched = useRef(false);
  const [searchTag] = useLazySearchTagsQuery();
  const debouncedValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (errorEmpty) touched.current = true;
  }, [errorEmpty]);

  useEffect(() => {
    if (debouncedValue) {
      loadData();
    }
  }, [debouncedValue]);

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const loadData = () => {
    searchTag({ tag: debouncedValue }).then((res) => {
      const { data } = res;
      setOptions(data);
    });
  };

  const handleSelect = (tag: TagType) => {
    onSelected?.([...tags, tag]);
    setInputValue('');
    setOptions([]);
  };
  const handleRemove = (tag: TagType) => {
    const newTags = tags.filter((i) => i.tag !== tag.tag);
    onSelected?.(newTags);
  };

  const errorText = touched.current && !tags.length ? error : undefined;

  return (
    <TableContainer
      sx={{
        border: 'none',
        borderRadius: '4px',
      }}
    >
      <Table
        border={1}
        sx={{
          borderCollapse: 'collapse',
          tableLayout: 'auto',
          border: 'none',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <TableHead
          sx={{
            background: '#EEF2FA',
            border: 'none',
            borderRadius: 0,
          }}
        >
          <TableRow>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Thẻ tag
            </TableCell>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Tên đơn vị giám sát
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map(({ tag, name }) => (
            <TableRow
              key={tag}
              sx={{
                border: 'none',
              }}
            >
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '400', color: '#8F0A0C' }}>
                {tag}
              </TableCell>
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '500', color: '#1E2323' }}>
                {name}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleRemove({ tag, name })}>
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
                <Box display={'flex'} justifyContent="center">
                  <Autocomplete
                    sx={{ width: 200 }}
                    filterOptions={(x) => x}
                    options={options}
                    autoComplete
                    filterSelectedOptions
                    noOptionsText="Không có đơn vị giám sát"
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      handleInputChange(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Thêm đơn vị giám sát"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: '0',
                          },
                          '& .MuiInputBase-root': {
                            borderRadius: '8px',
                            height: '44px',
                            color: '#1E2323',
                            fontWeight: '500',
                            fontSize: '14px',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ec0e0e',
                          },

                          '& .MuiAutocomplete-endAdornment': {
                            display: 'none',
                          },

                          input: {
                            '&::placeholder': {
                              color: '#0075FF',
                              opacity: 1,
                              fontWeight: 400,
                            },
                            '&:-webkit-autofill': {
                              transition: ' background-color 5000s ease-in-out 0s',
                            },
                          },
                        }}
                      />
                    )}
                    renderOption={(props, option: any) => {
                      return (
                        <>
                          <ListItem onClick={() => handleSelect(option)} divider style={{ cursor: 'pointer' }}>
                            <ListItemText
                              primary={
                                <Typography sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '22px' }}>
                                  {option.name}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '22px', color: '#8B8C9B' }}
                                >
                                  {option.tag}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </>
                      );
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <FormHelperText error style={{ marginTop: 8, marginBottom: 10, textAlign: 'center' }}>
        {errorText}
      </FormHelperText>
    </TableContainer>
  );
};

export default TableTag;
