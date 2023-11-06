import React from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikWrappedField from '../../../../common/input/Field';
import Modal from '../../../../common/modal/Modal';
import { useAddNodeMutation } from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';

interface Props {
  locationId: string;
  gatewayId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const validationSchema = {
  serial: Yup.string().required('Serial không được để trông'),
  name: Yup.string().required('Tên không được để trống'),
};

export const AddNodeDialog: React.FC<Props> = ({ locationId, gatewayId, open, onClose, onSuccess }) => {
  const [addNodeControl] = useAddNodeMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      serial: '',
      name: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      if (currentUser && locationId) {
        addNodeControl({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          gatewayId: gatewayId,
          data: values,
        })
          .then((res) => {
            onSuccess();
            setSnackbar({ open: true, message: 'Thêm node thành công', severity: 'success' });
          })
          .catch((e) => setSnackbar({ open: true, message: 'Có lỗi khi thêm node', severity: 'error' }));
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty } = formik;

  return (
    <Modal size="sm" show={open} close={onClose} title={'Thêm node'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mb={3}>
            <FormikWrappedField fullWidth placeholder="Serial" topLable="Nhập serial" {...getFieldProps('serial')} />
            <FormikWrappedField fullWidth placeholder="Nhập tên node" topLable="Tên node" {...getFieldProps('name')} />
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
