import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ImageIcon } from 'utils/UtilsComponent';
import * as Yup from 'yup';
import KeyIcon from '../../assets/icons/key-icon.svg';
import Button from '../../common/button/Button';
import FormikWrappedField from '../../common/input/Field';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { useAddlUserMutation, useChangeDetailUserMutation } from '../../services/users.service';
import { selectAuth } from '../../state/modules/auth/authReducer';
import { listRole, UserType } from './constants';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: UserType;
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
  first_name: Yup.string().required('Tên nhân viên không được để trống'),
  last_name: Yup.string().required('Họ nhân viên không được để trống'),
  email: Yup.string().required('Email không được để trống'),
  phone: Yup.string().required('Số điện thoại không được để trống'),
  username: Yup.string().min(4, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
};

const validationPassword = {
  password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
  confirm_password: Yup.string()
    .trim()
    .required('Xác nhận mật khẩu không được để trống.')
    .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu phải khớp với mật khẩu mới.'),
};

const ModalAddEditUser: React.FC<Props> = ({ show, type, onClose, initialValues }) => {
  const [addUser] = useAddlUserMutation();
  const [editUser] = useChangeDetailUserMutation();
  const { currentUser } = useSelector(selectAuth);

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
        await editUser({ user: { ...values } }).unwrap();
        onClose();
      } else {
        await addUser({
          user: {
            ...values,
            type: currentUser?.type,
            sub_id: currentUser?.sub_id,
          },
        }).unwrap();
        onClose();
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Modal size="sm" show={show} close={onClose} title={isUpdate ? 'Chỉnh sửa thông tin' : 'Thêm nhân viên mới'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập tên nhân viên"
              topLable="Tên nhân viên"
              {...getFieldProps('first_name')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập họ nhân viên"
              topLable="Họ nhân viên"
              {...getFieldProps('last_name')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập email"
              topLable="Email"
              {...getFieldProps('email')}
              // error={errors.email}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập số điện thoại"
              topLable="Số điện thoại"
              {...getFieldProps('phone')}
              // error={errors.phone}
            />
            <Select
              style={{ width: 286 }}
              fullWidth
              placeholder="Chọn chức vụ"
              topLable="Chức vụ"
              data={listRole}
              selected={values.role}
              setSelected={(role) => setFieldValue('role', role)}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập tên đăng nhập"
              topLable="Tên đăng nhập"
              {...getFieldProps('username')}
              // error={errors.username}
            />
            {!isUpdate && (
              <FormikWrappedField
                style={{ width: 286 }}
                placeholder="Nhập mật khẩu"
                topLable="Mật khẩu"
                type="password"
                iconStartAdorment={<ImageIcon image={KeyIcon} />}
                {...getFieldProps('password')}
                // error={errors.password}
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
                // error={errors.confirm_password}
              />
            )}
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

export default ModalAddEditUser;
