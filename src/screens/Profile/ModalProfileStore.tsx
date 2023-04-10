import Modal from 'common/modal/Modal';
import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import { Input } from 'common';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateAgencyMutation } from 'services/agencies.service';

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
        await updateAgency({ agency: values }).unwrap();
        onClose();
      } catch (error) {
        console.error('rejected', error);
      }
    },
  });
  const { handleSubmit, getFieldProps, values, errors } = formik;
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
