import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Checkbox } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import { Input } from 'components';
import * as Yup from 'yup';
import ModalAttention from './ModalAttention';
import Button from 'components/button/Button';
import imgLogo from '../../assets/img/logo.svg';
import { useLoginMutation } from '../../services/auth.service';
import { useAppDispatch } from '../../state/store';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().min(4, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
  password: Yup.string().trim().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
});
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

const LabelCopyRight = styled.p({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#C5C6D2',
  marginBottom: 24,
});

const initForm = {
  show: false,
  title: '',
  content: '',
  icon: '',
};
const LoginScreen = () => {
  const [modalAttention, setModalAttention] = useState(initForm);
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await loginUser(values).unwrap();
        navigate(from);
      } catch (error) {
        console.error('rejected', error);
      }
    },
  });
  const { handleSubmit, getFieldProps, values, errors } = formik;
  console.log('🚀 ~ file: LoginScreen.tsx:109 ~ values:', values);

  const closeModalAttention = () => {
    setModalAttention({
      ...modalAttention,
      show: false,
    });
  };

  return (
    <>
      <ModalAttention {...modalAttention} onClose={closeModalAttention} />
      <AuthBox>
        <Box
          style={{
            minWidth: 544,
            background: '#FFFFFF',
            boxShadow: '0px 12px 20px rgba(2, 8, 61, 0.05)',
            borderRadius: 20,
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          <Box
            style={{
              padding: '50px 80px 24px 80px',
            }}
          >
            <Box
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
            </Box>
            <Box>
              <FormikProvider value={formik}>
                <Form noValidate onSubmit={handleSubmit}>
                  <Label>Tên đăng nhập</Label>
                  <Input
                    placeholder="Nhập mật khẩu"
                    {...getFieldProps('username')}
                    fullWidth
                    iconStartAdorment={<IconPerson />}
                    error={errors.username}
                  />
                  <Label>Mật khẩu</Label>
                  <Input
                    placeholder="Nhập mật khẩu"
                    {...getFieldProps('password')}
                    fullWidth
                    iconStartAdorment={<IconKey />}
                    type={'password'}
                    // error={errors.password}
                  />
                  <Box
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}
                  >
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <CheckBox sx={{}} />
                      <LabelSaveLogin>Nhớ đăng nhập</LabelSaveLogin>
                    </Box>
                    <LabelFotgotPass
                      type="button"
                      onClick={() =>
                        setModalAttention({
                          show: true,
                          title: 'Quên mật khẩu',
                          icon: 'failed',
                          content: 'Vui lòng liên hệ Admin để được cấp lại mật khẩu của tài khoản',
                        })
                      }
                    >
                      Quên mật khẩu?
                    </LabelFotgotPass>
                  </Box>
                  <Box>
                    <Button
                      style={{ marginTop: 40 }}
                      fullWidth
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isLoading}
                    >
                      Đăng nhập
                    </Button>
                  </Box>
                </Form>
              </FormikProvider>
            </Box>
          </Box>
          <LabelCopyRight>Sản phẩm thuộc bản quyền công ty Sesaco Việt Nam. Hotline: 02432262556</LabelCopyRight>
        </Box>
      </AuthBox>
    </>
  );
};

export default LoginScreen;
