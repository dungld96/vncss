import styled from '@emotion/styled';
import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import { useUpdateAgencyMutation } from '../../services/agencies.service';

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  overflow: 'hidden',
  marginBottom: 32,
});
interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: any;
}

const validationSchema = Yup.object().shape({});

const ModalProfileStore: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const [updateAgency, {}] = useUpdateAgencyMutation();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateAgency({ ...values }).unwrap();
        onClose();
      } catch (error) {
        console.error('rejected', error);
      }
    },
  });
  const { handleSubmit, getFieldProps, resetForm } = formik;
  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);
  return (
    <Modal size="sm" show={show} close={onClose} title="Sửa thông tin đại lý">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <Input {...getFieldProps('name')} fullWidth topLable="Tên đại lý" />
            <Input {...getFieldProps('address')} fullWidth topLable="Địa chỉ" />
          </ContentWrapper>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained">
              Lưu lại
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalProfileStore;
