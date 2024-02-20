import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import KeyIcon from '../../assets/icons/key-icon.svg';
import Button from '../../common/button/Button';
import FormikWrappedField from '../../common/input/Field';
import Modal from '../../common/modal/Modal';
import { ImageIcon } from '../../utils/UtilsComponent';

interface Props {
  show: boolean;
  isLoading?: boolean;
  id: string;
  onClose: () => void;
  onSubmit?: (password: string, id: string) => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});

const validationSchema = Yup.object().shape({
  new_password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
  confirm_new_password: Yup.string()
    .trim()
    .required('Xác nhận mật khẩu không được để trống.')
    .oneOf([Yup.ref('new_password'), ''], 'Xác nhận mật khẩu phải khớp với mật khẩu mới.'),
});

const ModalChangePassword: React.FC<Props> = ({ show, id, onClose, onSubmit, isLoading = false }) => {
  const formik = useFormik({
    initialValues: {
      new_password: '',
      confirm_new_password: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: ({ new_password }) => {
      onSubmit?.(new_password, id);
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <Modal size="sm" show={show} close={onClose} title="Thay đổi mật khẩu">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <FormikWrappedField
              {...getFieldProps('new_password')}
              fullWidth
              topLable="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
            />
            <FormikWrappedField
              {...getFieldProps('confirm_new_password')}
              fullWidth
              topLable="Nhập lại mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={isLoading}>
              Lưu lại
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalChangePassword;
