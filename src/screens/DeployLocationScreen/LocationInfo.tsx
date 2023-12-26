import {
  Button,
  Divider,
  Grid,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from '@mui/material';
import { Box } from '@mui/system';
import { FormikProps, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import AddIcon from '../../assets/icons/add-circle-red.svg';
import DatePickers from '../../common/datePicker/DatePicker';
import FormikWrappedField from '../../common/input/Field';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import TableTag from '../../common/TableTag/TableTag';
import useApp from '../../hooks/useApp';
import { ImageIcon } from '../../utils/UtilsComponent';
import { NormalInput } from 'common/input/NormalInput';
import { BusinessTypes } from '../../configs/constant';
import { Delete, MoreHoriz } from '@mui/icons-material';
import dayjs from 'dayjs';
import { data } from 'screens/vehicle-wrapper/mockData';
import { AddEventReceiverDialog } from './AddEventReceiverDialog';

export type EventReceiveType = {
  enabled_sms: boolean;
  enabled_call: boolean;
  name: string;
  phone: string;
  position: string;
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#1E2323',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableHeaderCell = styled(TableCell)({ backgroundColor: '#EEF2FA', color: '#1E2323' });

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
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
  const { event_receivers, contract_date, province, district, commune, tags, business } = values;
  const [openAddEventReceiverDialog, setOpenAddEventReceiverDialog] = React.useState(false);

  useEffect(() => {
    fetchArea();
  }, []);

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

  const businessTypes = BusinessTypes.map((item) => ({ label: item.value, value: item.value }));

  const onDelete = (indexSelected: number) => {
    const newEventReceivers = event_receivers.filter((item: any, index: number) => index !== indexSelected);
    setFieldValue('event_receivers', [...newEventReceivers]);
  };

  const handleAddEventReceiver = (value: any) => {
    const newEventReceivers = [...event_receivers];
    setFieldValue('event_receivers', [...newEventReceivers, value]);
  };

  return (
    <Box px={3} pb={3}>
      <Box mt={1}>
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginTop: '16px' }}>
          Thông tin vị trí triển khai
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Grid container columnSpacing={4}>
            <Grid item xs={12}>
              <FormikWrappedField
                {...getFieldProps('name')}
                style={{ width: '100%' }}
                topLable="Tên vị trí triển khai"
                placeholder="Nhập tên vị trí"
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                style={{ width: '100%' }}
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
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                style={{ width: '100%' }}
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
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                style={{ width: '100%' }}
                data={towns}
                selected={commune}
                error={!commune ? 'Vui lòng chọn phường xã' : ''}
                setSelected={(data) => setFieldValue('commune', data)}
                topLable="Phường, Xã"
                placeholder="Chọn phường xã"
                disabled={!district}
                errorEmpty={isSubmitting}
              />
            </Grid>
            <Grid item xs={4}>
              <FormikWrappedField
                {...getFieldProps('address')}
                style={{ width: '100%' }}
                topLable="Tên đường, Toà nhà, Số nhà"
                placeholder="Nhập địa chỉ"
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                data={businessTypes}
                selected={business}
                setSelected={(data) => setFieldValue('business', data)}
                style={{ width: '100%' }}
                topLable="Loại hình kinh doanh"
                placeholder="Chọn loại hình kinh doanh"
                error={!business ? 'Vui lòng chọn loại hình kinh doanh' : ''}
                errorEmpty={isSubmitting}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePickers
                fullWidth
                {...getFieldProps('contract_date')}
                date={contract_date}
                topLable="Ngày ký hợp đồng"
                onChange={(date) => setFieldValue('contract_date', date)}
                showError={!!touched?.contract_date || !!isSubmitting}
                error={contract_date ? '' : 'Ngày ký hợp đồng không được để trống'}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={1}>
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginTop: '16px' }}>
          Người liên hệ
        </Typography>
        <Grid container columnSpacing={4}>
          <Grid item xs={4}>
            <FormikWrappedField
              {...getFieldProps('contact_name')}
              style={{ width: '100%' }}
              topLable="Người liên hệ"
              placeholder="Nhập tên người liên hệ"
            />
          </Grid>
          <Grid item xs={4}>
            <FormikWrappedField
              {...getFieldProps('contact_number')}
              style={{ width: '100%' }}
              topLable="Số điện thoại người liên hệ"
              placeholder="Nhập số điện thoại liên hệ"
            />
          </Grid>
        </Grid>
      </Box>

      <Box marginTop={'24px'}>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginTop: '16px', marginBottom: '16px' }}
        >
          Người nhận thông báo
        </Typography>
        <TableContainer sx={{ border: '1px solid #EEF2FA', borderRadius: '4px' }}>
          <Table sx={{ width: '100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell align="center">Người nhận thông báo</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center">Chức vụ</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center">Số điện thoại</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center">Hình thức thông báo</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center"></StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event_receivers?.map((item: EventReceiveType, index: number) => (
                <StyledTableRow key={item.name + index}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.position}</StyledTableCell>
                  <StyledTableCell align="center">{item.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} mr={2}>
                        <Typography style={{ marginRight: '8px' }}>SMS</Typography>
                        <Switch
                          checked={item.enabled_sms}
                          size="small"
                          readOnly
                          onChange={() => {
                            const newItem = { ...item, enabled_sms: !item.enabled_sms };
                            const newEventReceivers = [...event_receivers];
                            newEventReceivers[index] = newItem;
                            setFieldValue('event_receivers', [...newEventReceivers]);
                          }}
                        />
                      </Box>

                      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography style={{ marginRight: '8px' }}>Call</Typography>
                        <Switch
                          checked={item.enabled_call}
                          size="small"
                          readOnly
                          onChange={() => {
                            const newItem = { ...item, enabled_call: !item.enabled_call };
                            const newEventReceivers = [...event_receivers];
                            newEventReceivers[index] = newItem;
                            setFieldValue('event_receivers', [...newEventReceivers]);
                          }}
                        />
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      id="demo-positioned-button"
                      aria-haspopup="true"
                      sx={{ padding: 0 }}
                      onClick={() => onDelete(index)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center" sx={{ color: '#8B8C9B' }}>
                  <Typography
                    style={{ color: '#0075FF', cursor: 'pointer', fontSize: '14px' }}
                    onClick={() => setOpenAddEventReceiverDialog(true)}
                  >
                    Thêm người nhận thông báo
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {openAddEventReceiverDialog && (
          <AddEventReceiverDialog
            open={openAddEventReceiverDialog}
            onClose={() => setOpenAddEventReceiverDialog(false)}
            addEventReceiver={handleAddEventReceiver}
          />
        )}
      </Box>
      <Divider sx={{ marginTop: '16px !important' }} />
      <Box marginTop="32px">
        <Typography sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', marginBottom: '20px' }}>
          Đơn vị giám sát
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
