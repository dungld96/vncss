import React, { useEffect, useState, useCallback } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../common';
import Select from '../../common/Select/Select';
import { listStatusNodeLess } from './constants';
import { MAX_FILE_SIZE } from 'configs/constant';
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';

interface Props {
  show: boolean;
  onClose?: () => void;
}

const ModalChangeAgency: React.FC<Props> = ({ show, onClose }) => {
  const formik = useFormik({
    initialValues: {
      argency: 'all',
    },
    enableReinitialize: true,

    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, getFieldProps, values, errors, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);
  return (
    <Modal size="sm" show={show} close={onClose} title="Chuyển xuống đại lý">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              padding: 0,
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            <Select
              fullWidth
              topLable="Chọn đại lý bạn muốn chuyển xuống"
              data={[{ value: 'all', label: 'Chọn đại lý' }]}
              selected={values.argency}
              setSelected={(argency) => setFieldValue('argency', argency)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Chuyển
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalChangeAgency;
