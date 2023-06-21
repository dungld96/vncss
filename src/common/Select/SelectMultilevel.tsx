/* eslint-disable */
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormHelperText,
  InputAdornment,
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
  [key: string]: any;
}

const SelectMultilevel: React.FC<Props> = ({
  data = [],
  selected,
  setSelected,
  style = {},
  disabled,
  hideSelected = true,
  maxHeight = 220,
  fullWidth,
  placeholder,
  error,
  topLable,
  noMarginTop,
  ...rest
}) => {
  const anchorRef = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const [open, setOpen] = useState(false);

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
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              border: '1px solid #d9d9d9',
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
            input: {
              background: '#fff',
              cursor: 'pointer !important',
              '&::placeholder': {
                color: '#777777',
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
          },
        }}
        disableAutoFocus
        open={open}
        onClose={() => handleClose()}
        anchorEl={anchorRef.current}
      >
        <SimpleBar style={{ maxHeight }} autoHide={false}>
          {newData.map((item) => (
            <MenuItem
              key={item.value}
              disabled={item.disabled}
              onClick={() => handleClickItem(item)}
              // style={{
              //   display:
              //     (hideSelected && item.value === selected) || item.hide ? 'none' : undefined,
              // }}
            >
              <div
                style={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.label}
              </div>
            </MenuItem>
          ))}
        </SimpleBar>
      </Popover>
    </Box>
  );
};

export default SelectMultilevel;
