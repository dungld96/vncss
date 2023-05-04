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

const ModalEditNode: React.FC<Props> = ({ show, onClose }) => {
  const formik = useFormik({
    initialValues: {
      type: 'none',
      description: '',
      serial: '',
      version: '',
      startDate: '17/03/2023',
      status: 'none',
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
    <Modal size="sm" show={show} close={onClose} title="Chỉnh sửa Node">
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
            <Select
              style={{ width: 286 }}
              fullWidth
              topLable="Loại sản phẩm"
              data={[{ value: 'none', label: 'Chọn loại sản phẩm' }, ...listStatusNodeLess]}
              selected={0}
              setSelected={(type) => setFieldValue('type', type)}
            />
            <Input style={{ width: 286 }} topLable="Mô tả" placeholder="Nhập mô tả" {...getFieldProps('description')} />
            <Input style={{ width: 286 }} topLable="Serial" placeholder="Nhập serial" {...getFieldProps('serial')} />
            <Input
              style={{ width: 286 }}
              topLable="Phiên bản"
              placeholder="Nhập phiên bản"
              {...getFieldProps('version')}
            />
            <Input style={{ width: 286 }} topLable="Ngày xuất xưởng" {...getFieldProps('startDate')} />
            <Select
              style={{ width: 286 }}
              fullWidth
              topLable="Trạng thái"
              data={[{ value: 'none', label: 'Chọn trạng thái' }, ...listStatusNodeLess]}
              selected={0}
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

export default ModalEditNode;
