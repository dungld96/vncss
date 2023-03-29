import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Checkbox, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import imgLogo from '../../assets/img/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import { Input } from 'components';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().min(6, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
  password: Yup.string().trim().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
});

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

  const IconKey = styled(KeyIcon)({
    color: '#8F0A0C',
    fontSize: '20px',
  });
  const IconPerson = styled(PersonIcon)({
    color: '#8F0A0C',
    fontSize: '20px',
  });
  const Label = styled.p({
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '20px',
  });

  const CheckBox = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      borderRadius: 4,
    },
  });

  const LabelSaveLogin = styled.p({
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#333333',
    margin: 0,
  });

  const LabelFotgotPass = styled.button({
    outline: 'none',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#8F0A0C',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '22px',
  });

  const ButtonLogin = styled(Button)({
    width: '100%',
    height: '44px',
    marginTop: 28,
    borderRadius: '8px',
    '&.MuiButton-textPrimary': {
      color: '8F0A0C !important',
    },
    '&.Mui-disabled': {
      backgroundColor: '8F0A0C !important',
    },

    '&.Mui-disabled.MuiButton-containedPrimary': {
      color: 'white !important',
      backgroundColor: '8F0A0C',
    },
  });

  const LabelCopyRight = styled.p({
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '20px',
    textAlign:'center',
    color:'#C5C6D2'
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, getFieldProps, values, errors } = formik;

  console.log(errors);
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
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            padding: '50px 80px 24px 80px',
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
              <Form noValidate onSubmit={handleSubmit}>
                <Label>Tên đăng nhập</Label>
                <Input
                  placeholder="Nhập mật khẩu"
                  {...getFieldProps('name')}
                  fullWidth
                  iconStartAdorment={<IconPerson />}
                  error={errors.name}
                />
                <Label>Mật khẩu</Label>
                <Input
                  placeholder="Nhập mật khẩu"
                  {...getFieldProps('password')}
                  fullWidth
                  iconStartAdorment={<IconKey />}
                  type={'password'}
                  error={errors.password}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckBox sx={{}} />
                    <LabelSaveLogin>Nhớ đăng nhập</LabelSaveLogin>
                  </div>
                  <LabelFotgotPass type="button">Quên mật khẩu?</LabelFotgotPass>
                </div>
                <div>
                  <ButtonLogin color="primary" variant="contained">
                    Đăng nhập
                  </ButtonLogin>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
        <LabelCopyRight>Sản phẩm thuộc bản quyền công ty Sesaco Việt Nam. Hotline: 02432262556</LabelCopyRight>
      </div>
    </AuthBox>
  );
};

export default LoginScreen;
