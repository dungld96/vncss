import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { ImageIcon } from '../../utils/UtilsComponent';
import * as Yup from 'yup';
import KeyIcon from '../../assets/icons/key-icon.svg';
import FormikWrappedField from 'common/input/Field';
import {
  IOrganization,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} from 'services/organizations.service';
import { useSelector } from 'react-redux';
import { selectOrganization } from 'state/modules/organization/organizationReducer';
import { useAuth } from 'hooks/useAuth';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: IOrganization;
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
  name: Yup.string().required('Tên đơn vị không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  username: Yup.string().min(4, 'Tên đăng nhập tối thiểu 6 kí tự').required('Tên đăng nhập không được để trống'),
};

const validationPassword = {
  password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').required('Mật khẩu không được để trống'),
  tag: Yup.string().required('Thẻ tag không được để trống'),
};

const ModalAddEdit: React.FC<Props> = ({ show, type, onClose, initialValues }) => {
  const [addOrganization] = useCreateOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();
  const organizations = useSelector(selectOrganization);
  const isUpdate = type === 'update';
  const {
    auth: { currentUser },
  } = useAuth();

  const listOrganizations = organizations.map((i) => ({
    value: i.id,
    label: i.name,
  }));

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...Schema,
      ...(!isUpdate ? validationPassword : {}),
    }),
    onSubmit: async ({ id, name, address, username, password, tag, parent_id }) => {
      if (!isUpdate) {
        await addOrganization({
          organization: { name, address, username, password, tag, parent_id },
          parent_uuid: currentUser?.sub_id,
        }).unwrap();
        onClose();
      } else {
        await updateOrganization({
          organization: { id, name, address, username, password, tag, parent_id },
          parent_uuid: currentUser?.sub_id,
        }).unwrap();
        onClose();
      }
    },
  });
  const { handleSubmit, resetForm, getFieldProps, values, setFieldValue } = formik;

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
            <FormikWrappedField
              {...getFieldProps('name')}
              style={{ width: 286 }}
              placeholder="Nhập tên nhân viên"
              topLable="Nhập tên đơn vị"
            />
            <FormikWrappedField
              {...getFieldProps('address')}
              style={{ width: 286 }}
              placeholder="Nhập địa chỉ"
              topLable="Địa chỉ đơn vị"
            />
            <FormikWrappedField
              {...getFieldProps('username')}
              style={{ width: 286 }}
              placeholder="Nhập tên tài khoản"
              topLable="Tài khoản"
            />
            {!isUpdate && (
              <FormikWrappedField
                {...getFieldProps('password')}
                style={{ width: 286 }}
                placeholder="Nhập mật khẩu"
                topLable="Mật khẩu"
                type="password"
                iconStartAdorment={<ImageIcon image={KeyIcon} />}
              />
            )}
            {!isUpdate && (
              <FormikWrappedField
                {...getFieldProps('tag')}
                style={{ width: 286 }}
                placeholder="Thẻ tag được tạo tự động"
                topLable="Thẻ tag"
              />
            )}
            <Select
              topLable="Đơn vị cấp trên (nếu có)"
              placeholder="Chọn đơn vị cấp trên"
              data={listOrganizations}
              selected={values.parent_id}
              setSelected={(org) => setFieldValue('parent_id', org)}
              style={{ width: 286 }}
              fullWidth
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained">
              {isUpdate ? 'Lưu lại' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddEdit;
