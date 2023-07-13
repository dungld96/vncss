import { DialogActions, DialogContent } from '@mui/material';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { listStatus } from './constants';
import { CameraType } from './mockData';

interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: CameraType;
}

const ModalEditCamera: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);
  return (
    <Modal size="sm" show={show} close={onClose} title={'Chỉnh sửa thông tin camera'}>
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
            <Input style={{ width: 286 }} topLable="Số điện thoại" {...getFieldProps('phoneNumber')} />
            <Input style={{ width: 286 }} topLable="Imei camera" {...getFieldProps('imei')} />
            <Input style={{ width: 286 }} topLable="Ngày kích hoạt" {...getFieldProps('createdDate')} />
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
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Lưu chỉnh sửa
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalEditCamera;
