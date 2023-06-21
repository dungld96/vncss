import { Button, DialogActions, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import * as Yup from 'yup';
import DatePickers from '../../common/datePicker/DatePicker';
import FormikWrappedField from '../../common/input/Field';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import TableTag from '../../common/TableTag/TableTag';
import useApp from '../../hooks/useApp';
import { useAuth } from '../../hooks/useAuth';
import { LocationResponType } from './constant';
import UsersReceiveNoti from './UsersReceiveNoti';
import { useUpdateLocationMutation } from '../../services/location.service';

interface Props {
  show: boolean;
  onClose: () => void;
  initialValues: LocationResponType;
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

const ModalEdit: React.FC<Props> = ({ show, onClose, initialValues }) => {
  const { area, fetchArea } = useApp();
  const [updateLocation] = useUpdateLocationMutation();

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!values?.tags?.length) return;
      const body = {
        ...values,
        tags: values.tags.map((i) => i.tagName),
        contract_date: values.contract_date.replaceAll('/', '-'),
      };
      delete body.dataCity;
      delete body.dataDistrict;
      delete body.usersReceive;
      delete body.business_id;

      await updateLocation({ location: body, parent_uuid: currentUser?.sub_id }).unwrap();
      onClose();
    },
  });

  const { setFieldValue, values, getFieldProps, isSubmitting, touched, handleSubmit, resetForm } = formik;

  const { contract_date, province, district, commune, dataDistrict, dataCity, tags } = values;

  useEffect(() => {
    fetchArea();
  }, []);

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  useEffect(() => {
    if (!area.length) return;

    if (!!province) {
      const dataCity: any = area.find((item: any) => item.name === province);
      const dataDistrict: any = dataCity?.level2s?.find((item: any) => item.name === district);

      setFieldValue('dataCity', dataCity);
      setFieldValue('dataDistrict', dataDistrict);
    }
  }, [province, district, commune, area]);

  const createTowns = (arr1: any, arr2: any) => {
    if (!arr1 || !arr1.length) return arr2;
    return arr1;
  };

  const towns = (dataDistrict ? createTowns(values.dataDistrict?.level3s, [dataDistrict]) : [])?.map((item: any) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <Modal
      style={{
        height: 'calc(100vh - 150px)',
        maxHeight: '756px',
        maxWidth: '1136px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'visible',
      }}
      size="xl"
      show={show}
      close={onClose}
      title="Chỉnh sửa vị trí triển khai"
    >
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <SimpleBar style={{ maxHeight: '560px' }}>
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginTop: '24px' }}>
                  Thông tin chung
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <FormikWrappedField
                    {...getFieldProps('name')}
                    style={{ width: '312px' }}
                    topLable="Tên vị trí triển khai"
                    placeholder="Nhập tên vị trí"
                  />
                  <FormikWrappedField
                    {...getFieldProps('contact_name')}
                    style={{ width: '312px' }}
                    topLable="Người liên hệ"
                    placeholder="Nhập tên người liên hệ"
                  />
                  <FormikWrappedField
                    {...getFieldProps('contact_number')}
                    style={{ width: '312px' }}
                    topLable="Số điện thoại người liên hệ"
                    placeholder="Nhập số điện thoại liên hệ"
                  />
                  <Select
                    fullWidth
                    style={{ width: '312px' }}
                    data={area?.map((item: any) => ({ label: item.name, value: item.name }))}
                    selected={province}
                    error={!province ? 'Vui lòng chọn tỉnh thành' : ''}
                    setSelected={(data) => {
                      setFieldValue('province', data);
                      if (district) {
                        setFieldValue('district', '');
                        setFieldValue('commune', '');
                      }
                    }}
                    topLable="Tỉnh thành"
                    placeholder="Chọn tỉnh thành"
                    errorEmpty={isSubmitting}
                  />
                  <Select
                    fullWidth
                    style={{ width: '312px' }}
                    data={dataCity?.level2s?.map((item: any) => ({
                      label: item.name,
                      value: item.name,
                    }))}
                    selected={district}
                    error={!district ? 'Vui lòng chọn quận huyện' : ''}
                    setSelected={(data) => {
                      setFieldValue('district', data);
                      if (commune) {
                        setFieldValue('commune', '');
                      }
                    }}
                    topLable="Quận, Huyện"
                    placeholder="Chọn quận huyện"
                    disabled={!province}
                    errorEmpty={isSubmitting}
                  />
                  <Select
                    fullWidth
                    style={{ width: '312px' }}
                    data={towns}
                    selected={commune}
                    error={!commune ? 'Vui lòng chọn phường xã' : ''}
                    setSelected={(data) => setFieldValue('commune', data)}
                    topLable="Phường, Xã"
                    placeholder="Chọn phường xã"
                    disabled={!district}
                    errorEmpty={isSubmitting}
                  />
                  <FormikWrappedField
                    {...getFieldProps('address')}
                    style={{ width: '312px' }}
                    topLable="Tên đường, Toà nhà, Số nhà"
                    placeholder="Nhập địa chỉ"
                  />
                  <Select
                    fullWidth
                    style={{ width: '312px' }}
                    topLable="Loại hình kinh doanh"
                    placeholder="Chọn loại hình kinh doanh"
                  />
                  <DatePickers
                    {...getFieldProps('contract_date')}
                    date={contract_date}
                    style={{ width: 286 }}
                    topLable="Ngày ký hợp đồng"
                    onChange={(date) => setFieldValue('contract_date', date)}
                    showError={!!touched?.contract_date || !!isSubmitting}
                    error={contract_date ? '' : 'Ngày ký hợp đồng không được để trống'}
                  />
                </Box>
              </Box>
              <Box marginTop={'16px'}>
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
                  Người nhận thông báo
                </Typography>
                <UsersReceiveNoti />
              </Box>
              <Box marginTop="32px">
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
                  Cơ quan, Đơn vị giám sát vị trí
                </Typography>
                <Box>
                  <TableTag
                    data={[
                      { agency: 'Công an Hà Nội', tagName: 'CA_hanoi' },
                      { agency: 'Hội sở Vietcombank', tagName: 'vietcombank_hoiso' },
                    ]}
                    tags={tags as any}
                    onSelected={(tags) => setFieldValue('tags', tags)}
                    error="Vui lòng chọn cơ quan, Đơn vị giám sát vị trí"
                    errorEmpty={isSubmitting}
                  />
                </Box>
              </Box>
            </SimpleBar>
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={() => onClose()}>
              Quay lại
            </Button>
            <Button style={{ width: 131 }} type="submit" variant="contained">
              Tiếp theo
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalEdit;
