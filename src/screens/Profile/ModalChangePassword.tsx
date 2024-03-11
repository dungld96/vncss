import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from '../../hooks/useSnackbar';
import React from 'react';
import * as Yup from 'yup';
import KeyIcon from '../../assets/icons/key-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import { useChangePasswordMutation } from '../../services/users.service';
import { ImageIcon } from '../../utils/UtilsComponent';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});

const validationSchema = Yup.object().shape({
  new_password: Yup.string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu mới ít nhất phải từ 8 ký tự')
    .max(64, 'Mật khẩu mới không quá 64 ký tự')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s]).{8,}$/,
      'Mật khẩu mới cần có ít nhất một ký tự in hoa, một ký tự in thường và một ký tự đặc biệt'
    ),
  confirm_new_password: Yup.string()
    .required('Vui lòng nhập lại mật khẩu mới')
    .oneOf([Yup.ref('new_password'), ''], 'Nhập lại mật khẩu mới không khớp'),
});

const ModalChangePassword: React.FC<Props> = ({ show, onClose }) => {
  const [changePassword] = useChangePasswordMutation();
  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async ({ current_password, new_password }) => {
      try {
        await changePassword({ old: current_password, new: new_password }).unwrap();
        setSnackbar({ open: true, message: 'Đổi mật khẩu thành công', severity: 'success' });
        onClose();
      } catch (error) {
        console.error('rejected', error);
        setSnackbar({ open: true, message: 'Có lỗi khi đổi mật khẩu', severity: 'error' });
      }
    },
  });

  const { handleSubmit, getFieldProps, isSubmitting, touched, values, errors } = formik;

  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin đại lý">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input
              {...getFieldProps('current_password')}
              fullWidth
              topLable="Mật khẩu hiện tại"
              placeholder="Nhập mật khẩu hiện tại"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
            />
            <Input
              {...getFieldProps('new_password')}
              fullWidth
              topLable="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
              showError={touched.new_password || isSubmitting}
              error={errors.new_password}
            />
            <Input
              {...getFieldProps('confirm_new_password')}
              fullWidth
              topLable="Nhập lại mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
              showError={touched.confirm_new_password || isSubmitting}
              error={errors.confirm_new_password}
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained">
              Lưu lại
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalChangePassword;
