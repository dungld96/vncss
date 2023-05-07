import Modal from 'common/modal/Modal';
import React, { useEffect } from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { IUser } from 'services/auth.service';
import { ImageIcon } from 'utils/UtilsComponent';
import KeyIcon from '../../assets/icons/key-icon.svg';
import { useAddlUserMutation, useChangeDetailUserMutation } from 'services/users.service';
import Select from '../../common/Select/Select';
import FormikWrappedField from 'common/input/Field';
import { IAgency } from '../../services/agencies.service';
import { AgencyType } from './constants';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: AgencyType;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  overflow: 'hidden',
  marginBottom: 32,
});

const Schema = {
  name: Yup.string().required('Tên đại lý không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  last_name: Yup.string().required('Họ nhân viên không được để trống'),
  phone: Yup.string().required('Số điện thoại không được để trống'),
};

const validationPassword = {
  username: Yup.string().min(4, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
  password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
  confirm_password: Yup.string()
    .trim()
    .required('Xác nhận mật khẩu không được để trống.')
    .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu phải khớp với mật khẩu mới.'),
};

const ModalAddEdit: React.FC<Props> = ({ show, type, onClose, initialValues }) => {
  const [addUser] = useAddlUserMutation();
  const [editUser] = useChangeDetailUserMutation();
  const isUpdate = type === 'update';
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...Schema,
      ...(!isUpdate ? validationPassword : {}),
    }),
    onSubmit: async (values) => {
      if (isUpdate) {
        onClose();
      } else {
        onClose();
      }
    },
  });
  const { handleSubmit, getFieldProps, values, errors, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);
  return (
    <Modal size="sm" show={show} close={onClose} title={isUpdate ? 'Sửa thông tin đại lý' : 'Thêm mới đại lý'}>
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập tên đại lý"
              topLable="Tên đại lý"
              {...getFieldProps('name')}
            />
            {!isUpdate && (
              <FormikWrappedField
                style={{ width: 286 }}
                placeholder="Nhập tên đăng nhập"
                topLable="Tên đăng nhập"
                {...getFieldProps('username')}
              />
            )}
            {!isUpdate && (
              <FormikWrappedField
                style={{ width: 286 }}
                placeholder="Nhập mật khẩu"
                topLable="Mật khẩu"
                type="password"
                iconStartAdorment={<ImageIcon image={KeyIcon} />}
                {...getFieldProps('password')}
              />
            )}
            {!isUpdate && (
              <FormikWrappedField
                style={{ width: 286 }}
                placeholder="Nhập lại mật khẩu"
                topLable="Nhập lại mật khẩu"
                type="password"
                iconStartAdorment={<ImageIcon image={KeyIcon} />}
                {...getFieldProps('confirm_password')}
              />
            )}
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập số điện thoại"
              topLable="Số điện thoại"
              {...getFieldProps('phone')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập địa chỉ đại lý"
              topLable="Địa chỉ"
              {...getFieldProps('address')}
            />
            <Select
              style={{ width: 286 }}
              fullWidth
              placeholder="Chọn chức vụ"
              topLable="Chức vụ"
              data={[{ value: null, label: 'Không có' }]}
              selected={values.parent_id}
              setSelected={(role) => setFieldValue('role', role)}
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              {isUpdate ? 'Thay đổi' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddEdit;
