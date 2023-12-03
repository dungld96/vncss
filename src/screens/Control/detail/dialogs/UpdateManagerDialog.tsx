import React from 'react';
import { Box, Button, DialogActions, Grid } from '@mui/material';
import FormikWrappedField from '../../../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../../common/modal/Modal';
import { useUpdateLocationManagerMutation } from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { EventReceiveType } from '../../../../state/modules/location/locationReducer';

interface Props {
  locationId: string;
  open: boolean;
  eventReceivers: EventReceiveType[];
  onClose: () => void;
  onSuccess: () => void;
}

const validationSchema = {
  phone: Yup.string().required('Số điện thoại không được để trông'),
  username: Yup.string().required('Tên không được để trống'),
};

export const UpdateManagerDialog: React.FC<Props> = ({ eventReceivers, locationId, open, onClose, onSuccess }) => {
  const [updateLocationManager] = useUpdateLocationManagerMutation();

  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      phone: '',
      username: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      if (currentUser && locationId) {
        updateLocationManager({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          data: values,
        }).then((res: any) => {
          if (res.error) {
            setSnackbar({
              open: true,
              message: 'Cập nhận dánh sách nhận quản lý không thành công',
              severity: 'error',
            });
            return;
          }
          setSnackbar({ open: true, message: 'Cập nhận dánh sách nhận quản lý thành công', severity: 'success' });
          onSuccess();
        });
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty } = formik;

  return (
    <Modal size="sm" show={open} close={onClose} title={'Thêm người nhận thông báos'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mt={1} mb={4}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập họ tên"
                  topLable="Họ tên người nhận thông báo"
                  {...getFieldProps('username')}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập số điện thoại"
                  topLable="Số điện thoại"
                  {...getFieldProps('phone')}
                />
              </Grid>
            </Grid>
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Thêm mới
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
