/* eslint-disable */
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormHelperText,
  InputAdornment,
  ListItemText,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { isEqual } from 'lodash';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ImageIcon } from 'utils/UtilsComponent';
import ArrowDownIcon from '../../assets/icons/arrow-down-icon.svg';

export interface SelectType {
  value: any;
  label: string;
  [key: string]: any;
}

export interface Props {
  data?: SelectType[];
  selected?: any;
  setSelected?: (selectedId: string, selectedItem?: SelectType) => void;
  label?: string;
  style?: CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  maxHeight?: any;
  fullWidth?: boolean;
  error?: any;
  topLable?: string;
  noMarginTop?: boolean;
  errorEmpty?:boolean
  [key: string]: any;
}

const Select: React.FC<Props> = ({
  data = [],
  selected,
  setSelected,
  style = {},
  disabled,
  hideSelected = true,
  maxHeight = 324,
  fullWidth,
  placeholder,
  error,
  topLable,
  noMarginTop,
  errorEmpty,
  ...rest
}) => {
  const anchorRef = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errorEmpty) touched.current = true
  }, [errorEmpty])

  const readOnly = true;

  let newData = data;
  const value = data.find((item) => isEqual(item.value, selected))?.label || '';

  // Open the menu
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the menu
  const handleClose = (hasValue?: boolean) => {
    touched.current = true;
    setOpen(false);
  };

  // When click item, set selected item, set value in textbox and close menu
  const handleClickItem = (item?: SelectType) => {
    setSelected?.(item?.value || '', item);
    handleClose(true);
  };

  const errorText = !open && touched.current ? error : undefined;

  const errorTextField = errorText;

  return (
    <Box
      sx={{
        cursor: 'pointer !impotant',
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
    >
      {topLable && (
        <Typography
          style={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '20px',
            padding: 0,
            marginTop: noMarginTop ? undefined : 20,
            marginBottom: 8,
            cursor: 'pointer !important',
          }}
        >
          {topLable}
        </Typography>
      )}
      <Box sx={{ background: '#fff', borderRadius: '8px' }}>
        <TextField
          {...rest}
          ref={anchorRef}
          onClick={disabled ? undefined : handleOpen}
          value={value}
          disabled={disabled}
          size="small"
          fullWidth={fullWidth}
          placeholder={placeholder}
          helperText={errorTextField}
          error={!!errorTextField}
          InputProps={{
            readOnly,
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: disabled ? 0.5 : 1,
                  transform: open ? 'rotate(180deg)' : undefined,
                  backgroundColor: '#fff',
                }}
              >
                <ImageIcon image={ArrowDownIcon} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #EEF2FA !important',
            },
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              height: '44px',
              color: '#1E2323',
              fontWeight: '500',
              fontSize: '14px',
              '.Mui-focused': {
                borderWidth: '1px',
              },
            },
            '& .MuiFormHelperText-root': {
              color: '#ec0e0e',
            },
            input: {
              background: '#fff',
              cursor: `${disabled ? 'default' : 'pointer'} !important`,
              '&::placeholder': {
                color: '#C5C6D2',
              },
              '&:-webkit-autofill': {
                transition: ' background-color 5000s ease-in-out 0s',
              },
            },
          }}
        />
      </Box>

      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: anchorRef.current?.getBoundingClientRect().width || 0,
            borderRadius: '8px',
            marginTop: '4px',
          },
        }}
        disableAutoFocus
        open={open}
        onClose={() => handleClose()}
        anchorEl={anchorRef.current}
      >
        <SimpleBar style={{ maxHeight }} autoHide={false}>
          {newData.map((item, index) => {
            const isActive = item.value === selected;
            return (
              <>
                <MenuItem
                  key={item.value + index}
                  disabled={item.disabled}
                  onClick={() => handleClickItem(item)}
                  sx={{ padding: '16px' }}
                >
                  <ListItemText
                    primaryTypographyProps={{ sx: { fontSize: '14px', color: isActive ? '#8F0A0C' : '#1E2323' } }}
                  >
                    {item.label}
                  </ListItemText>
                </MenuItem>

                <Divider sx={{ margin: '0 16px !important' }} />
              </>
            );
          })}
        </SimpleBar>
      </Popover>
    </Box>
  );
};

export default Select;
