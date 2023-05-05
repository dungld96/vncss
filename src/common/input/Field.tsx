import React, { useState, useCallback, ReactNode } from 'react';
import { Box, TextField, IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import { FieldProps as FormikFieldProps, getIn, FieldConfig, FastField, Field as FormikField } from 'formik';

const TopLabel = styled.p({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '20px',
  padding: 0,
  marginTop: 20,
  marginBottom: 8,
});

interface extenProps {
  field: FormikFieldProps['field'];
  fullWidth?: boolean;
  error?: string;
  type?: string;
  iconStartAdorment?: ReactNode;
  iconEndAdorment?: ReactNode;
  inputRef?: any;
  maxLength?: number;
  topLable?: string;
  [key: string]: any;
}

type Props = extenProps & TextFieldProps;

const Input: React.FC<Props> = (props) => {
  const {
    field,
    fullWidth,
    error,
    type = 'text',
    InputProps,
    placeholder,
    iconStartAdorment,
    iconEndAdorment,
    disabled,
    value,
    onBlur,
    onChange,
    maxLength,
    topLable,
    ...rest
  } = props;
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

  const handleBlur = (e: any) => {
    if (onBlur) {
      onBlur(e);
    }
    field.onBlur(e);
  };

  const onChangeCallbackFn = useCallback(
    (event: React.ChangeEvent<any>) => {
      if (onChange) {
        onChange(event);
        field.onChange(event);
        return;
      }
      field.onChange(event);
    },
    [onChange]
  );

  return (
    <div>
      {topLable && <TopLabel>{topLable}</TopLabel>}
      <TextField
        {...rest}
        value={value}
        fullWidth={fullWidth}
        disabled={disabled}
        type={isPassword ? (passwordShown ? 'text' : 'password') : type}
        onChange={onChangeCallbackFn}
        onBlur={handleBlur}
        inputProps={{ maxLength: maxLength || 20 }}
        placeholder={placeholder}
        InputProps={adornment}
        helperText={error}
        sx={{
          '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
            border: '2px solid #EEF2FA',
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
    </div>
  );
};

interface FormikValues {
  [key: string]: string;
}

interface ExtendedFieldConfig {
  topLable?: string;
  slow?: boolean;
  iconStartAdorment?: ReactNode;
}

type FormikWrappedFieldProps = TextFieldProps & ExtendedFieldConfig & FieldConfig;

const FormikWrappedField = ({ slow, name, validate, ...rest }: FormikWrappedFieldProps) => {
  if (slow) {
    return (
      <FormikField name={name} validate={validate}>
        {({ field, form }: FormikFieldProps<FormikValues>) => {
          const error = getIn(form.errors, field.name);
          return <Input name={name} field={field} error={error} {...rest} />;
        }}
      </FormikField>
    );
  }
  return (
    <FastField name={name} validate={validate}>
      {({ field, form }: FormikFieldProps<FormikValues>) => {
        const error = getIn(form.errors, field.name);
        return <Input name={name} field={field} error={error} {...rest} />;
      }}
    </FastField>
  );
};

export default FormikWrappedField;
