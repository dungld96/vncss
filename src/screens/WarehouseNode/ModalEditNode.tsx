import { DialogActions, DialogContent } from '@mui/material';
import DatePickers from '../../common/datePicker/DatePicker';
import FormikWrappedField from '../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import { useAuth } from '../../hooks/useAuth';
import React, { useEffect } from 'react';
import { useUpdateNodeMutation } from '../../services/node.service';
import * as Yup from 'yup';
import Select from '../../common/Select/Select';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';

interface ValuesType {
  id?: string;
  type: string;
  description?: string;
  serial: string;
  version: string;
  startDate: string;
}
interface Props {
  show: boolean;
  onClose?: () => void;
  initialValues: ValuesType;
}

const validationSchema = Yup.object().shape({
  serial: Yup.string().required('Serial không được để trống'),
  version: Yup.string().required('Phiên bản không được để trống'),
  startDate: Yup.string().required('Ngày xuất xưởng không được để trống'),
});

const ModalEditNode: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const [editNode] = useUpdateNodeMutation();

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        id: values.id,
        node_type_id: values.type,
        serial: values.serial,
        version: values.version,
        mfg: values.startDate,
        description: values.description,
      };
      try {
        await editNode({ parent_uuid: currentUser?.sub_id, node: body }).unwrap();
        onClose?.();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue, touched, isSubmitting } =
    formik;

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
              data={[
                { value: 'none', label: 'Chọn loại sản phẩm' },
                { value: 'snh-srb', label: 'Node Sample' },
              ]}
              selected={values.type}
              setSelected={(type) => setFieldValue('type', type)}
              error={values.type === 'none' ? 'Vui lòng chọn loại sản phẩm' : ''}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              topLable="Mô tả"
              placeholder="Nhập mô tả"
              {...getFieldProps('description')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              topLable="Serial"
              placeholder="Nhập serial"
              {...getFieldProps('serial')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              topLable="Phiên bản"
              placeholder="Nhập phiên bản"
              {...getFieldProps('version')}
            />
            <DatePickers
              {...getFieldProps('startDate')}
              date={values.startDate}
              style={{ width: 286 }}
              topLable="Ngày xuất xưởng"
              onChange={(date) => setFieldValue('startDate', date)}
              showError={touched.startDate || isSubmitting}
              error={values.startDate ? '' : 'Ngày xuất xưởng không được để trống'}
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
