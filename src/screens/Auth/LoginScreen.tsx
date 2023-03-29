import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import imgLogo from '../../assets/img/logo.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

const LoginScreen: React.FC = () => {
  const AuthBox = styled(Box)({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ecf1f5',
    display: 'flex',
    alignItems: 'center',
  });

  const ImgLogo = styled.img({
    width: 144,
    display: 'block',
    textAlign: 'center',
  });

  const Title = styled.h2({
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '36px',
    outline: '#EEF2FA',
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const IconEye = styled(passwordShown ? VisibilityIcon : VisibilityOffIcon)({
    color: '#C5C6D2',
    fontSize: '16px',
  });
  const IconKey = styled(KeyIcon)({
    color: '#8F0A0C',
    fontSize: '20px',
  });
  const IconPerson = styled(PersonIcon)({
    color: '#8F0A0C',
    fontSize: '20px',
  });

  const adornmentPassword = {
    endAdornment: (
      <InputAdornment position="end" style={{ padding: '12px' }}>
        <IconButton onClick={() => setPasswordShown(!passwordShown)} edge="end">
          <IconEye />
        </IconButton>
      </InputAdornment>
    ),
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit,getFieldProps,values } = formik;

  return (
    <AuthBox>
      <div
        style={{
          minWidth: 544,
          height: 642,
          background: '#FFFFFF',
          boxShadow: '0px 12px 20px rgba(2, 8, 61, 0.05)',
          borderRadius: 20,
          margin: '0 auto',
          padding: '50px 80px 24px 80px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: '#FFFFFF',
          }}
        >
          <ImgLogo src={imgLogo} alt="" />
          <Title>Đăng nhập</Title>
        </div>
        <div>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <p>Tên đăng nhập</p>
              <TextField
                fullWidth
                {...getFieldProps('name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconPerson />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                    border: '2px solid #EEF2FA',
                  },
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    height: '44px',
                  },
                  input: {
                    '&::placeholder': {
                      color: '#C5C6D2',
                    },
                    '&:-webkit-autofill':{
                      transition:' background-color 5000s ease-in-out 0s'
                  }
                  },
                }}
                placeholder="Nhập tên đăng nhập"
              />
              <p>Tên đăng nhập</p>
              <TextField
                fullWidth
                type={passwordShown?'text': 'password'}
                {...getFieldProps('password')}
                InputProps={{
                  ...adornmentPassword,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconKey />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                    border: '2px solid #EEF2FA',
                  },
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    height: 44,
                  },
                  '&::placeholder': {
                    color: 'red',
                  },
                  input: {
                    '&::placeholder': {
                      color: '#C5C6D2',
                    },
                    '&:-webkit-autofill':{
                      transition:' background-color 5000s ease-in-out 0s'
                  }
                  },
                }}
                placeholder="Nhập mật khẩu"
              />
            </Form>
          </FormikProvider>
        </div>
      </div>
    </AuthBox>
  );
};

export default LoginScreen;
