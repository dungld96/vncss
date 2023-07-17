import React from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import FormikWrappedField from '../../../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../../common/modal/Modal';
import { useAddCameraMutation } from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';

interface Props {
  locationId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const validationSchema = {
  serial: Yup.string().required('Serial không được để trông'),
};

export const AddCameraDialog: React.FC<Props> = ({ locationId, open, onClose, onSuccess }) => {
  const [addCameraControl] = useAddCameraMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      serial: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      if (currentUser && locationId) {
        addCameraControl({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          data: values,
        }).then((res) => {
          onSuccess();
          setSnackbar({ open: true, message: 'Thêm camera thành công', severity: 'success' });
        });
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
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Thêm
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
