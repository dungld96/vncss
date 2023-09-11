import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import { UpdateCurrentUserRequestInterface, useUpdateCurrentUserMutation } from '../../services/users.service';

interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: UpdateCurrentUserRequestInterface;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  overflow: 'hidden',
  marginBottom: 32,
});

const validationSchema = Yup.object().shape({});

const ModalProfileUser: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateCurrentUser(values).unwrap();
        onClose();
      } catch (error) {
        console.error('rejected', error);
      }
    },
  });
  const { handleSubmit, getFieldProps } = formik;
  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin người dùng">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input style={{ width: 286 }} topLable="Tên người sử dụng" {...getFieldProps('first_name')} />
            <Input style={{ width: 286 }} topLable="Họ người sử dụng" {...getFieldProps('last_name')} />
            <Input style={{ width: 286 }} topLable="Email" {...getFieldProps('email')} />
            <Input style={{ width: 286 }} topLable="Số điện thoại" {...getFieldProps('phone')} />
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

export default ModalProfileUser;
