import React from 'react';
import { Box, Button, DialogActions, Typography, Grid, Switch } from '@mui/material';
import FormikWrappedField from '../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../common/modal/Modal';

interface Props {
  open: boolean;
  onClose: () => void;
  addEventReceiver: (value: any) => void;
}

const validationSchema = {
  phone: Yup.string().required('Serial không được để trông'),
  name: Yup.string().required('Tên không được để trống'),
};

export const AddEventReceiverDialog: React.FC<Props> = ({ open, onClose, addEventReceiver }) => {
  const formik = useFormik({
    initialValues: {
      phone: '',
      name: '',
      position: '',
      enabled_call: true,
      enabled_sms: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      addEventReceiver(values);
      onClose();
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, values, setFieldValue } = formik;

  return (
    <Modal size="sm" show={open} close={onClose} title={'Thêm quản lý'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mt={1} mb={4}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập họ tên"
                  topLable="Họ tên người nhận thông báo"
                  {...getFieldProps('name')}
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
              <Grid item xs={6}>
                <FormikWrappedField
                  fullWidth
                  placeholder="Nhập chức vụ"
                  topLable="Chức vụ"
                  {...getFieldProps('position')}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                  <Box display="flex" alignItems="center">
                    <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>SMS</Typography>
                    <Switch
                      sx={{ m: 1 }}
                      checked={values.enabled_sms}
                      onChange={() => setFieldValue('enabled_sms', !values.enabled_sms)}
                    />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>Cuộc gọi</Typography>
                    <Switch
                      sx={{ m: 1 }}
                      checked={values.enabled_call}
                      onChange={() => setFieldValue('enabled_call', !values.enabled_call)}
                    />
                  </Box>
                </Box>
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
