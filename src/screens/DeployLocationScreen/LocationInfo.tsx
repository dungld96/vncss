import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FormikWrappedField from '../../common/input/Field';
import { FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import AddIcon from '../../assets/icons/add-circle-red.svg';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import { dataTag } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import { ImageIcon } from '../../utils/UtilsComponent';
import useApp from '../../hooks/useApp';

const randomId = () => Math.random().toString(36).substr(2, 6);

interface Props {
  formik: FormikProps<FormikValues>;
}

const LocationInfo: React.FC<Props> = ({ formik }) => {
  const { area, fetchArea } = useApp();
  const [listUsersReceiveNoti, setListUsersReceiveNoti] = useState([
    { id: randomId(), userName: '', service: '', userPhone: '' },
  ]);
  const { setFieldValue, values, getFieldProps } = formik;

  useEffect(() => {
    fetchArea();
  }, []);

  return (
    <SimpleBar style={{ maxHeight: '560px' }}>
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
          <Select fullWidth style={{ width: '312px' }} topLable="Tỉnh thành" placeholder="Chọn tỉnh thành" />
          <Select fullWidth style={{ width: '312px' }} topLable="Quận, Huyện" placeholder="Chọn quận huyện" />
          <Select fullWidth style={{ width: '312px' }} topLable="Phường, Xã" placeholder="Chọn phường xã" />
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
          <FormikWrappedField
            {...getFieldProps('contract_date')}
            style={{ width: '312px' }}
            topLable="Ngày ký hợp đồng"
            placeholder="DD/MM/YYYY"
          />
        </Box>
      </Box>

      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop={'16px'}>
        {listUsersReceiveNoti.map((item, index) => {
          return (
            <Box marginBottom={'24px'} key={item.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px' }}>
                  Người nhận thông báo {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>
                    Nhận cuộc gọi và tin nhắn cảnh báo
                  </Typography>
                  <Switch sx={{ m: 1 }} defaultChecked />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <FormikWrappedField
                  {...getFieldProps('')}
                  style={{ width: '312px' }}
                  topLable="Họ tên người nhận thông báo"
                  placeholder="Nhập họ tên"
                />
                <FormikWrappedField
                  {...getFieldProps('')}
                  style={{ width: '312px' }}
                  topLable="Chức vụ"
                  placeholder="Nhập chức vụ"
                />
                <FormikWrappedField
                  {...getFieldProps('')}
                  style={{ width: '312px' }}
                  topLable="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                />
              </Box>
            </Box>
          );
        })}

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            setListUsersReceiveNoti([
              ...listUsersReceiveNoti,
              { id: randomId(), userName: '', service: '', userPhone: '' },
            ])
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
          <TableTag tags={[dataTag[0]]} />
        </Box>
      </Box>
    </SimpleBar>
  );
};

export default LocationInfo;
