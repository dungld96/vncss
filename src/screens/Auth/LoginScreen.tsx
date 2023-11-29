import { useEffect } from 'react';
import styled from '@emotion/styled';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Checkbox } from '@mui/material';
import Field from '../../common/input/Field';
import FormButton from '../../common/button/Button';
import { Form, Formik } from 'formik';
import useModalConfirm from '../../hooks/useModalConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import { object as YupObject, string as YupString } from 'yup';
import background from '../../assets/img/BACKGROUND-2.svg';
import imgLogo from '../../assets/img/logo-login.svg';
import { useLoginMutation } from '../../services/auth.service';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const validationSchema = YupObject().shape({
  username: YupString().trim().min(4, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
  password: YupString().trim().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Mật khẩu không được để trống'),
});
const AuthBox = styled(Box)({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: `url("${background}")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const ImgLogo = styled.img({
  width: 110,
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

const LoginScreen = () => {
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSnackbar } = useSnackbar();
  const [token] = useLocalStorage<string>('access_token', '');

  const from = ((location.state as any)?.from.pathname as string) || '/control';

  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [token]);

  const handleForgotPass = () => {
    showModalConfirm({
      title: 'Quên mật khẩu',
      content: 'Vui lòng liên hệ Admin để được cấp lại mật khẩu của tài khoản',
      confirm: {
        action: hideModalConfirm,
      },
    });
  };

  return (
    <>
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
              {/* <ImgLogo src={imgLogo} alt="" /> */}
              <Title>Đăng nhập</Title>
            </Box>
            <Box>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    await loginUser(values).unwrap();
                    navigate(from);
                  } catch (error) {
                    setSnackbar({ open: true, message: 'Sai tài khoản hoặc mật khẩu', severity: 'error' });
                  }
                }}
              >
                {({ isValid, dirty, isSubmitting }) => (
                  <Form>
                    <Field
                      topLable="Tên đăng nhập"
                      placeholder="Nhập mật khẩu"
                      name="username"
                      fullWidth
                      slow
                      iconStartAdorment={<IconPerson />}
                    />
                    <Field
                      topLable="Mật khẩu"
                      placeholder="Nhập mật khẩu"
                      fullWidth
                      iconStartAdorment={<IconKey />}
                      type="password"
                      name="password"
                    />
                    <Box
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}
                    >
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckBox />
                        <LabelSaveLogin>Nhớ đăng nhập</LabelSaveLogin>
                      </Box>
                      <LabelFotgotPass type="button" onClick={handleForgotPass}>
                        Quên mật khẩu?
                      </LabelFotgotPass>
                    </Box>
                    <Box>
                      <FormButton
                        variant="contained"
                        fullWidth
                        style={{ marginTop: 40 }}
                        color="primary"
                        type="submit"
                        disabled={!isValid || !dirty || isLoading || isSubmitting}
                      >
                        Đăng nhập
                      </FormButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
          <LabelCopyRight>
            {/* Hệ thống thuộc bản quyền của Vntech24h.,Jsc. Hotline 0934.88.83.86 hoặc 0706.90.3333 */}
          </LabelCopyRight>
        </Box>
      </AuthBox>
    </>
  );
};

export default LoginScreen;
