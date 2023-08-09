import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from '../../hooks/useSnackbar';
import { unionBy } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import KeyIcon from '../../assets/icons/key-icon.svg';
import Button from '../../common/button/Button';
import FormikWrappedField from '../../common/input/Field';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { useAuth } from '../../hooks/useAuth';
import { IAgency, useAddlAgencyMutation, useUpdateAgencyMutation } from '../../services/agencies.service';
import { selectAgencies } from '../../state/modules/agency/agencyReducer';
import { ImageIcon } from '../../utils/UtilsComponent';

interface Props {
  show: boolean;
  onClose: () => void;
  type: string;
  initialValues: IAgency;
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
  const [addAgency, { isLoading: isLoadingAdd }] = useAddlAgencyMutation();
  const [updateAgency, { isLoading: isLoadingUpdate }] = useUpdateAgencyMutation();
  const isUpdate = type === 'update';

  const agencies = useSelector(selectAgencies);
  const { setSnackbar } = useSnackbar();

  const {
    auth: { currentUser },
  } = useAuth();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...Schema,
      ...(!isUpdate ? validationPassword : {}),
    }),
    onSubmit: async ({ id, name, username, address, parent_id, password, phone }) => {
      if (isUpdate) {
        try {
          await updateAgency({
            agency: { id, name, phone, address },
          }).unwrap();
          setSnackbar({ open: true, message: 'Cập nhật đại lý thành công', severity: 'success' });
          onClose();
        } catch (error) {
          setSnackbar({ open: true, message: 'Có lỗi khi cập nhật đại lý', severity: 'error' });
        }
      } else {
        try {
          await addAgency({
            agency: {
              name,
              username,
              password,
              address,
              phone,
              parent_id,
            },
            parent_uuid: currentUser?.sub_id,
          }).unwrap();
          onClose();
          setSnackbar({ open: true, message: 'Thêm đại lý thành công', severity: 'success' });
        } catch (error) {
          setSnackbar({ open: true, message: 'Có lỗi khi thêm đại lý', severity: 'error' });
        }
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  const listArgencies = useMemo(() => {
    const newAgencies = agencies.map((agency: IAgency) => ({
      value: agency.id,
      label: agency.name,
    }));
    const currentAgency = [{ value: currentUser?.sub_id, label: 'Đại lí hiện tại' }];
    return unionBy(currentAgency, newAgencies, 'value');
  }, [agencies]);

  return (
    <Modal size="sm" show={show} close={onClose} title={isUpdate ? 'Sửa thông tin đại lý' : 'Thêm mới đại lý'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
              placeholder="Chọn đại lý cấp trên"
              topLable="Đại lý cấp trên"
              data={listArgencies}
              selected={values.parent_id}
              setSelected={(parent_id) => setFieldValue('parent_id', parent_id)}
            />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button
              type="submit"
              style={{ width: 131 }}
              variant="contained"
              disabled={!isValid || !dirty || isLoadingAdd || isLoadingUpdate}
            >
              {isUpdate ? 'Thay đổi' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddEdit;
