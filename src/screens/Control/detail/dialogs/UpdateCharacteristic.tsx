import React, { useState } from 'react';
import { Box, Button, Chip, DialogActions } from '@mui/material';
import { MultilineInput } from '../../../../common/input/MultilineInput';
import { Form, FormikProvider, useFormik } from 'formik';
import Modal from '../../../../common/modal/Modal';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { BASE_URL } from 'services/http.service';
import DragDropFile from 'common/DragDropFile/DragDropFile';
import { MAX_FILE_SIZE } from 'configs/constant';

interface Props {
  locationId: string;
  field: string;
  value?: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const fieldList = [
  {
    field: 'business_characteristic',
    label: 'Đặc thù kinh doanh',
  },
  {
    field: 'position',
    label: 'Vị trí',
  },
  {
    field: 'direction',
    label: 'Hướng tiếp giáp',
  },
  {
    field: 'building_plan',
    label: 'Sơ đồ toà nhà',
  },
];

export const UpdateCharacteristic: React.FC<Props> = ({ locationId, field, value, open, onClose, onSuccess }) => {
  const [file, setFile] = useState<any>(null);

  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();
  const token = localStorage.getItem('access_token');

  const formik = useFormik({
    initialValues: {
      [field]: value ?? '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (currentUser && token && locationId) {
        const formData = new FormData();
        for (const key in values) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            const element = values[key];
            formData.append(key, element);
          }
        }

        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${JSON.parse(token)}`);

        fetch(`${BASE_URL}/agencies/${currentUser.sub_id}/monitoring/locations/${locationId}/characteristic`, {
          method: 'POST',
          headers: myHeaders,
          body: formData,
        })
          .then((res) => res.json())
          .then((res: any) => {
            if (res.error) {
              setSnackbar({
                open: true,
                message: 'Cập nhật  đặc điểm cơ sở không thành công',
                severity: 'error',
              });
              return;
            }
            setSnackbar({ open: true, message: 'Cập nhật đặc điểm cơ sở thành công', severity: 'success' });
            onSuccess();
          });
        onClose?.();
      }
    },
  });

  const { handleSubmit, getFieldProps, isValid, dirty, setFieldValue } = formik;
  const fieldEditing = fieldList.find((item) => item.field === field);

  const handleUploadFile = (e: any) => {
    const file = e[0];
    if (!file || file.size > MAX_FILE_SIZE) {
      return;
    }
    setFile(file);
    setFieldValue('building_plan', file);
  };

  if (!fieldEditing) return null;

  return (
    <Modal size="sm" show={open} close={onClose} title={`Cập nhật ${fieldEditing?.label}`}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mt={1} mb={4}>
            {field === 'building_plan' ? (
              <>
                {!file ? (
                  <DragDropFile
                    multiple={true}
                    fileTypes={['png', 'jpg', 'jpeg']}
                    onChange={handleUploadFile}
                    title="Chọn hoặc kéo vào đây ảnh sơ đồ toà nhà của bạn"
                    dropzoneHeigth={274}
                  />
                ) : (
                  <Box height={'276px'}>
                    <Chip label={file?.name} onDelete={() => setFile(null)} />
                  </Box>
                )}
              </>
            ) : (
              <MultilineInput
                fullWidth
                multiline
                rows={4}
                maxRows={8}
                placeholder={fieldEditing.label}
                topLable={'Mô tả'}
                {...getFieldProps(field)}
              />
            )}
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Lưu
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
