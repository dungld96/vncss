import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormikProps, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '../../assets/icons/add-circle-red.svg';
import DatePickers from '../../common/datePicker/DatePicker';
import FormikWrappedField from '../../common/input/Field';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import TableTag from '../../common/TableTag/TableTag';
import useApp from '../../hooks/useApp';
import { ImageIcon } from '../../utils/UtilsComponent';
import { NormalInput } from 'common/input/NormalInput';

export type EventReceiveType = {
  enabled: boolean;
  name: string;
  phone: string;
  position: string;
};

export const tagsList = [
  { agency: 'Công an Hà Nội', tagName: 'CA_hanoi' },
  { agency: 'Hội sở Vietcombank', tagName: 'vietcombank_hoiso' },
];
interface Props {
  formik: FormikProps<FormikValues | any>;
}

const LocationInfo: React.FC<Props> = ({ formik }) => {
  const { area, fetchArea } = useApp();
  const { setFieldValue, values, getFieldProps, isSubmitting, touched } = formik;
  const { event_receivers, contract_date, province, district, commune, tags } = values;

  useEffect(() => {
    fetchArea();
  }, []);

  const handleChangeEventReceiver = (e: any, type: string, index: number) => {
    const value = e.target.value;
    const newItem = { ...event_receivers[index], [type]: value };
    const newEventReceivers = [...event_receivers];
    newEventReceivers[index] = newItem;
    setFieldValue('event_receivers', [...newEventReceivers]);
  };

  const dataCity = area.find((item: any) => item.name === province);
  const districtList = dataCity?.level2s?.map((item: any) => ({ label: item.name, value: item.name }));
  const dataDistrict = dataCity?.level2s?.find((item: any) => item.name == district);

  const createTowns = (arr1: any, arr2: any) => {
    if (!arr1 || !arr1.length) return arr2;
    return arr1;
  };

  const towns = (dataDistrict ? createTowns(dataDistrict?.level3s, [dataDistrict]) : [])?.map((item: any) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <Box px={3} pb={3}>
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginTop: '16px' }}>
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
            data={districtList}
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
            disabled
            style={{ width: '312px' }}
            topLable="Loại hình kinh doanh"
            placeholder="Chọn loại hình kinh doanh"
          />
          <DatePickers
            {...getFieldProps('contract_date')}
            date={contract_date}
            style={{ width: '312px' }}
            topLable="Ngày ký hợp đồng"
            onChange={(date) => setFieldValue('contract_date', date)}
            showError={!!touched?.contract_date || !!isSubmitting}
            error={contract_date ? '' : 'Ngày ký hợp đồng không được để trống'}
          />
        </Box>
      </Box>

      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop={'16px'}>
        {event_receivers?.map((item: EventReceiveType, index: number) => {
          return (
            <Box marginBottom={'24px'} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>
                  Người nhận thông báo {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>
                    Nhận cuộc gọi và tin nhắn cảnh báo
                  </Typography>
                  <Switch
                    sx={{ m: 1 }}
                    checked={item.enabled}
                    onChange={() => {
                      const newItem = { ...item, enabled: !item.enabled };
                      const newEventReceivers = [...event_receivers];
                      newEventReceivers[index] = newItem;
                      setFieldValue('event_receivers', [...newEventReceivers]);
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <NormalInput
                  style={{ width: '312px' }}
                  topLable="Họ tên người nhận thông báo"
                  placeholder="Nhập họ tên"
                  value={item.name}
                  onChange={(e) => handleChangeEventReceiver(e, 'name', index)}
                />
                <NormalInput
                  style={{ width: '312px' }}
                  topLable="Chức vụ"
                  placeholder="Nhập chức vụ"
                  value={item.position}
                  onChange={(e) => handleChangeEventReceiver(e, 'position', index)}
                />
                <NormalInput
                  style={{ width: '312px' }}
                  topLable="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  value={item.phone}
                  onChange={(e) => handleChangeEventReceiver(e, 'phone', index)}
                />
              </Box>
            </Box>
          );
        })}

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            setFieldValue('event_receivers', [...event_receivers, { name: '', position: '', phone: '', enabled: true }])
          }
        >
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm người nhận thông báo</Box>
        </Button>
      </Box>
      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
          Cơ quan, Đơn vị giám sát vị trí
        </Typography>
        <Box>
          <TableTag
            data={tagsList}
            tags={tags}
            onSelected={(tags) => setFieldValue('tags', tags)}
            error="Vui lòng chọn cơ quan, Đơn vị giám sát vị trí"
            errorEmpty={isSubmitting}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LocationInfo;
