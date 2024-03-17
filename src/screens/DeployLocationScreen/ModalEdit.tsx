import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import * as Yup from 'yup';
import useApp from '../../hooks/useApp';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateLocationMutation, useGetLocationQuery } from '../../services/location.service';
import { LocationType } from '../../state/modules/location/locationReducer';
import dayjs from 'dayjs';
import { Close } from '@mui/icons-material';
import LocationInfo, { tagsList } from './LocationInfo';
import { useSnackbar } from '../../hooks/useSnackbar';

interface Props {
  show: boolean;
  agencyId: string;
  locationId: string;
  onClose: () => void;
  handleSuccess?: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên vị trí triển khai không được để trống'),
  contact_name: Yup.string().required('Người liên hệ không được để trống'),
  contact_number: Yup.string().required('Số điện thoại người liên hệ không được để trống'),
  contract_date: Yup.string().required(),
  address: Yup.string().required('Địa chỉ không được để trống'),
  commune: Yup.string().required(),
  district: Yup.string().required(),
  province: Yup.string().required(),
});

const ModalEdit: React.FC<Props> = ({ show, onClose, agencyId, locationId, handleSuccess }) => {
  const { fetchArea } = useApp();
  const [updateLocation] = useUpdateLocationMutation();
  const { data: location } = useGetLocationQuery<{ data: LocationType }>({ agencyId, locationId });
  const { setSnackbar } = useSnackbar();

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: {
      ...location,
      contract_date: dayjs(location?.contract_date)?.format('DD/MM/YYYY'),
      tags: tagsList.filter((item) => (location?.tags || []).includes(item.tag)),
      event_receivers: location?.event_receivers || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        id: values.id,
        name: values.name,
        contact_name: values.contact_name,
        contact_number: values.contact_number,
        event_receivers: values.event_receivers.filter((er) => er.name && er.phone) || [],
        province: values.province,
        district: values.district,
        commune: values.commune,
        address: values.address,
        tags: values.tags.map((item) => item.tag),
        contract_date: dayjs(values.contract_date, 'DD/MM/YYYY').unix(),
        business: values.business,
      };
      updateLocation({ location: body, parent_uuid: currentUser?.sub_id })
        .then((res) => {
          setSnackbar({ open: true, message: 'Cập nhật vị trí thành công', severity: 'success' });
          if (handleSuccess) {
            handleSuccess();
          }
        })
        .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi cập nhật vị trí', severity: 'error' }));
      onClose();
    },
  });

  const { handleSubmit, resetForm, submitForm, errors } = formik;
  console.log(errors)

  useEffect(() => {
    fetchArea();
  }, []);

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth={'lg'}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '8px',
          height: 'calc(100vh - 150px)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontWeight: '700', fontSize: '18px', lineHeight: '16px', color: '#1E2323' }}>
            {'Cập nhật vị trí triển khai'}
          </Typography>
          <IconButton>
            <Close onClick={onClose} style={{ color: '#8B8C9B' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={handleSubmit}>
            <LocationInfo formik={formik} />
          </Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Đóng
        </Button>
        <Button style={{ width: 131 }} onClick={submitForm} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
