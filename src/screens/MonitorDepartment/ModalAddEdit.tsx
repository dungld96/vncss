import Modal from 'common/modal/Modal';
import React, { useEffect } from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ImageIcon } from 'utils/UtilsComponent';
import KeyIcon from '../../assets/icons/key-icon.svg';
import { useAddlUserMutation, useChangeDetailUserMutation } from 'services/users.service';
import Select from 'common/Select/Select';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: any;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  overflow: 'hidden',
  marginBottom: 32,
});

const Schema = {};

const validationPassword = {
  password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
};

const ModalAddEdit: React.FC<Props> = ({ show, type, onClose, initialValues }) => {
  const isUpdate = type === 'update';
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: async (value) => {},
  });
  const { handleSubmit, getFieldProps, values, errors, isValid, dirty, resetForm } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Modal
      size="sm"
      show={show}
      close={onClose}
      title={isUpdate ? 'Chỉnh sửa đơn vị giám sát' : 'Thêm mới đơn vị giám sát'}
    >
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input style={{ width: 286 }} placeholder="Nhập tên nhân viên" topLable="Nhập tên đơn vị" />
            <Input style={{ width: 286 }} placeholder="Nhập địa chỉ" topLable="Địa chỉ đơn vị" />
            <Input style={{ width: 286 }} placeholder="Nhập tên tài khoản" topLable="Tài khoản" />
            {!isUpdate && (
              <Input
                style={{ width: 286 }}
                placeholder="Nhập mật khẩu"
                topLable="Mật khẩu"
                type="password"
                iconStartAdorment={<ImageIcon image={KeyIcon} />}
              />
            )}
            {!isUpdate && <Input style={{ width: 286 }} placeholder="Thẻ tag được tạo tự động" topLable="Thẻ tag" />}
            <Select style={{ width: 286 }} fullWidth topLable="Đơn vị cấp trên (nếu có)" />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              {isUpdate ? 'Lưu lại' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddEdit;
