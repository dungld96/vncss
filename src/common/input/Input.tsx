import React, { useState, useCallback } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  error?: string;
  type?: string;
  iconStartAdorment?: any;
  iconEndAdorment?: any;
  inputRef?: any;
  maxLength?: number;
  topLable?: string;
  noOutLine?: boolean;
  noMarginTop?: boolean;
  [key: string]: any;
}

const TopLabel = styled.p({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '20px',
  padding: 0,
  marginTop: 20,
  marginBottom: 8,
});

const Input: React.FC<Props> = (props) => {
  const {
    fullWidth,
    error,
    type = 'text',
    InputProps,
    placeholder,
    iconStartAdorment,
    iconEndAdorment,
    disabled,
    value,
    onFocus,
    onBlur,
    onChange,
    maxLength,
    topLable,
    noOutLine,
    noMarginTop,
    ...rest
  } = props as any;
  const isPassword = type === 'password';
  const [passwordShown, setPasswordShown] = useState(!isPassword);

  const IconEye = styled(passwordShown ? VisibilityIcon : VisibilityOffIcon)({
    color: '#C5C6D2',
    fontSize: '16px',
  });

  const adornment = {
    startAdornment: <InputAdornment position="start">{iconStartAdorment}</InputAdornment>,
    endAdornment: (
      <InputAdornment position="end" style={{ padding: '12px' }}>
        {isPassword ? (
          <IconButton onClick={() => setPasswordShown(!passwordShown)} edge="end">
            <IconEye />
          </IconButton>
        ) : (
          iconEndAdorment
        )}
      </InputAdornment>
    ),
  };

  const handleFocus = useCallback((e: any) => {
    onFocus?.(e);
  }, []);

  const handleBlur = useCallback((e: any) => {
    onBlur?.(e);
  }, []);

  return (
    <Box>
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
      <TextField
        {...rest}
        value={value}
        fullWidth={fullWidth}
        disabled={disabled}
        type={isPassword ? (passwordShown ? 'text' : 'password') : type}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputProps={{ maxLength: maxLength || 20, ...InputProps }}
        placeholder={placeholder}
        InputProps={adornment}
        helperText={error}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: noOutLine ? 'none' : '2px solid #EEF2FA',
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
  );
};

export default Input;
