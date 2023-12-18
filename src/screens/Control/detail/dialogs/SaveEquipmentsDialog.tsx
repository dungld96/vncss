import React from 'react';
import { Box, Button, DialogActions, Grid } from '@mui/material';
import FormikWrappedField from '../../../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import Modal from '../../../../common/modal/Modal';
import {
  useUpdateLocationEquipmentsMutation,
  useCreateLocationEquipmentsMutation
} from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import DatePickers from '../../../../common/datePicker/DatePicker';
import dayjs from 'dayjs';

interface Props {
  locationId: string;
  equipment?: {
    id: string;
    name: string;
    quantity: number;
    expired_at: string;
  };
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SaveEquipmentsDialog: React.FC<Props> = ({ locationId, equipment, open, onClose, onSuccess }) => {
  const [updateLocationEquipments] = useUpdateLocationEquipmentsMutation();
  const [createLocationEquipments] = useCreateLocationEquipmentsMutation();

  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: equipment?.name ?? '',
      quantity: equipment?.quantity ?? '',
      expired_at: equipment?.expired_at
        ? dayjs(equipment?.expired_at).format('DD/MM/YYYY')
        : dayjs().format('DD/MM/YYYY'),
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!currentUser || !locationId) return;
      if (equipment) {
        updateLocationEquipments({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          equipmentId: equipment.id,
          data: { ...values, expired_at: dayjs(values.expired_at, 'DD/MM/YYYY').unix() },
        }).then((res: any) => {
          if (res.error) {
            setSnackbar({
              open: true,
              message: 'Cập nhật dụng cụ phương tiện không thành công',
              severity: 'error',
            });
            return;
          }
          setSnackbar({ open: true, message: 'Cập nhật dụng cụ phương tiện thành công', severity: 'success' });
          onSuccess();
        });
        onClose?.();
      } else {
        createLocationEquipments({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          data: { ...values, expired_at: dayjs(values.expired_at, 'DD/MM/YYYY').unix() },
        }).then((res: any) => {
          if (res.error) {
            setSnackbar({
              open: true,
              message: 'Thêm mới dụng cụ phương tiện không thành công',
              severity: 'error',
            });
            return;
          }
          setSnackbar({ open: true, message: 'Thêm mới dụng cụ phương tiện thành công', severity: 'success' });
          onSuccess();
        });
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, values, setFieldValue } = formik;

  return (
    <Modal size="sm" show={open} close={onClose} title={`Cập nhật dụng cụ phương tiện`}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mt={1} mb={4}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập tên dụng cụ"
                  topLable="Tên dụng cụ"
                  {...getFieldProps('name')}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập số lượng"
                  topLable="Số lượng"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  {...getFieldProps('quantity')}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePickers
                  fullWidth
                  {...getFieldProps('expired_at')}
                  date={values.expired_at}
                  topLable="Ngày hết hạn"
                  onChange={(date) => setFieldValue('expired_at', date)}
                />
              </Grid>
            </Grid>
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Lưu
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
