import { DialogActions, DialogContent } from '@mui/material';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { listStatus } from './constants';
import { useUpdateSimMutation } from '../../services/sims.service';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../hooks/useSnackbar';
interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: { id: string; phone: string; imei: string; status: number };
}

const ModalEditSim: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const [updateSim, { isLoading }] = useUpdateSimMutation();
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      phone: Yup.string().required('Số điện thoại không được để trống'),
      imei: Yup.string().required('Imei không được để trống'),
    }),
    onSubmit: async (values) => {
      if (currentUser) {
        try {
          await updateSim({ data: values, agencyId: currentUser.sub_id }).unwrap();
          setSnackbar({ open: true, message: 'Cập nhật sim thành công', severity: 'success' });
          onClose();
        } catch (error) {
          setSnackbar({ open: true, message: 'Có lỗi khi cập nhật sim', severity: 'error' });
        }
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Modal size="sm" show={show} close={onClose} title={'Chỉnh sửa thông tin sim'}>
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              padding: 0,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            <Input style={{ width: 286 }} topLable="Số điện thoại" {...getFieldProps('phone')} />
            <Input style={{ width: 286 }} topLable="Imei sim" {...getFieldProps('imei')} />
            <Select
              style={{ width: 286 }}
              fullWidth
              topLable="Trạng thái"
              data={listStatus}
              selected={values.status}
              setSelected={(status) => setFieldValue('status', status)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty || isLoading}>
              Lưu chỉnh sửa
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalEditSim;
