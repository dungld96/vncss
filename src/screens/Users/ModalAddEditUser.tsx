import Modal from 'common/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { IUser } from 'services/auth.service';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: IUser;
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

const ModalAddEditUser: React.FC<Props> = ({ show, type, onClose, initialValues }) => {
  const isUpdate = type === 'update';
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, getFieldProps, values, errors } = formik;
  return (
    <Modal size="sm" show={show} close={onClose} title={isUpdate ? 'Chỉnh sửa thông tin' : 'Thêm nhân viên mới'}>
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input
              style={{ width: 286 }}
              placeholder="Nhập tên nhân viên"
              topLable="Tên nhân viên"
              {...getFieldProps('name')}
            />
            <Input style={{ width: 286 }} placeholder="Nhập email" topLable="Email" {...getFieldProps('email')} />
            <Input
              style={{ width: 286 }}
              placeholder="Nhập số điện thoại"
              topLable="Số điện thoại"
              {...getFieldProps('phone')}
            />
            <Input
              style={{ width: 286 }}
              placeholder="Chọn chức vụ"
              topLable="Chức vụ"
              {...getFieldProps('confirmed')}
            />
            <Input
              style={{ width: 286 }}
              placeholder="Nhập tên đăng nhập"
              topLable="Tên đăng nhập"
              {...getFieldProps('username')}
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained">
              {isUpdate ? 'Thay đổi' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddEditUser;
