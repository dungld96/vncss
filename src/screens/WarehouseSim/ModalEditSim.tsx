import { Box, DialogActions, DialogContent } from '@mui/material';
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
import dayjs from 'dayjs';
import DatePickers from 'common/datePicker/DatePicker';
interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: { id: string; phone: string; imei: string; status: number; activated_at: string };
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
      activated_at: Yup.string().required('Ngày kích hoạt không được để trống'),
    }),
    onSubmit: async (values) => {
      if (currentUser) {
        try {
          await updateSim({
            data: { ...values, activated_at: dayjs(values.activated_at, 'DD/MM/YYYY').unix() },
            agencyId: currentUser.sub_id,
          }).unwrap();
          setSnackbar({ open: true, message: 'Cập nhật sim thành công', severity: 'success' });
          onClose();
        } catch (error) {
          setSnackbar({ open: true, message: 'Có lỗi khi cập nhật sim', severity: 'error' });
        }
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue, isSubmitting, touched } =
    formik;

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
            <Box style={{ width: 286 }}>
              <DatePickers
                {...getFieldProps('startDate')}
                date={values.activated_at}
                fullWidth
                topLable="Ngày kích hoạt"
                onChange={(date) => setFieldValue('activated_at', date)}
                showError={touched.activated_at || isSubmitting}
                error={values.activated_at ? '' : 'Ngày kích hoạt không được để trống'}
              />
            </Box>
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
