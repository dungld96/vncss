import Modal from 'common/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';
import KeyIcon from '../../assets/icons/key-icon.svg';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useChangePasswordMutation } from 'services/users.service';
import { ImageIcon } from 'utils/UtilsComponent';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});

const validationSchema = Yup.object().shape({});

const ModalChangePassword: React.FC<Props> = ({ show, onClose }) => {
  const [changePassword] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async ({ current_password, new_password }) => {},
  });

  const { handleSubmit, getFieldProps, values, errors } = formik;

  return (
    <Modal size="sm" show={show} close={onClose} title="Thay đổi mật khẩu">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input
              {...getFieldProps('new_password')}
              fullWidth
              topLable="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              iconStartAdorment={<ImageIcon image={KeyIcon} />}
            />
            <Input
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
