import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import dayjs from 'dayjs';
import { LocationType } from '../../../state/modules/location/locationReducer';
import {
  useLazyGetControlLocationCharacteristicQuery,
  useLazyGetControlLocationEquipmentsQuery,
  useDeleteLocationEquipmentMutation,
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { UpdateCharacteristic } from './dialogs/UpdateCharacteristic';
import { SaveEquipmentsDialog } from './dialogs/SaveEquipmentsDialog';
import { ImageIcon } from '../../../utils/UtilsComponent';
import DeleteIcon from '../../../assets/icons/delete-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import useModalConfirm from '../../../hooks/useModalConfirm';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#1E2323',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableHeaderCell = styled(TableCell)({ backgroundColor: '#EEF2FA', color: '#1E2323' });

export const LocationCharacteristic = ({ location }: { location?: LocationType }) => {
  const [fieldEditing, setFieldEditing] = useState<string | undefined>();
  const {
    auth: { currentUser },
  } = useAuth();

  const [getControlLocationCharacteristicQuery, { data }] = useLazyGetControlLocationCharacteristicQuery();

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationCharacteristicQuery({ agencyId: currentUser.sub_id, locationId: location.id }).unwrap();
    }
  }, [currentUser, location]);

  const refetch = () => {
    if (currentUser && location) {
      getControlLocationCharacteristicQuery({ agencyId: currentUser.sub_id, locationId: location.id }).unwrap();
    }
  };

  const onClose = () => {
    setFieldEditing(undefined);
  };

  if (!location) return null;

  return (
    <Box>
      <Box pb={2} borderBottom="1px solid #EEF2FA">
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Đặc thù kinh doanh:</InfoTitle>
          <Typography
            style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setFieldEditing('business_characteristic')}
          >
            Sửa
          </Typography>
        </Box>
        <InfoValue>{data?.business_characteristic || '--'}</InfoValue>

        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Vị trí:</InfoTitle>
          <Typography
            style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setFieldEditing('position')}
          >
            Sửa
          </Typography>
        </Box>
        <InfoValue>{data?.position || '--'}</InfoValue>

        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Hướng tiếp giáp:</InfoTitle>
          <Typography
            style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setFieldEditing('direction')}
          >
            Sửa
          </Typography>
        </Box>
        <InfoValue>{data?.direction || '--'}</InfoValue>
      </Box>
      <Equipments locationId={location.id} />
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Sơ đồ toà nhà</Typography>
          <Typography
            style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setFieldEditing('building_plan')}
          >
            Thay đổi
          </Typography>
        </Box>
        <Box>
          {data?.building_plan ? <BuildingPlanView url={data.building_plan} /> : <Box p={2}>Chưa có sơ đồ toà nhà</Box>}
        </Box>
      </Box>

      {location && data && fieldEditing && (
        <UpdateCharacteristic
          locationId={location.id}
          field={fieldEditing}
          value={data[fieldEditing]}
          open
          onClose={onClose}
          onSuccess={refetch}
        />
      )}
    </Box>
  );
};

type Equipment = {
  id: string;
  name: string;
  quantity: number;
  expired_at: string;
};
const Equipments = ({ locationId }: { locationId: string }) => {
  const [isEdit, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Equipment>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(anchorEl);
  const [getControlLocationEquipmentsQuery, { data }] = useLazyGetControlLocationEquipmentsQuery();
  const [deleteLocationEquipment] = useDeleteLocationEquipmentMutation();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getControlLocationEquipmentsQuery({ agencyId: currentUser.sub_id, locationId: locationId }).unwrap();
    }
  }, [currentUser, locationId]);

  const refetch = () => {
    if (currentUser) {
      getControlLocationEquipmentsQuery({ agencyId: currentUser.sub_id, locationId: locationId }).unwrap();
    }
  };

  const onClose = () => {
    setIsEditing(false);
  };

  const onActionMenuClick = (event: React.MouseEvent<HTMLElement>, row: Equipment) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(undefined);
  };

  const onActionClick = (type: string) => {
    if (type === 'edit') {
      setIsEditing(true);
    } else if (type === 'delete' && currentUser && selectedRow) {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá dụng cụ phương tiện',
        content: 'Bạn có chắc chắn muốn xoá dụng cụ phương tiện này không?',
        confirm: {
          action: async () => {
            await deleteLocationEquipment({
              agencyId: currentUser.sub_id,
              locationId: locationId,
              equipmentId: selectedRow.id,
            }).unwrap();
            hideModalConfirm();
            refetch();
          },
          text: 'Xoá ',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
    setAnchorEl(null);
  };

  return (
    <Box py={2} borderBottom="1px solid #EEF2FA">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Dụng cụ phương tiện</Typography>
        <Typography
          style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}
          onClick={() => setIsEditing(true)}
        >
          Thêm mới
        </Typography>
      </Box>
      <Box mt={2}>
        <TableContainer sx={{ border: '1px solid #EEF2FA', borderRadius: '4px' }}>
          <Table sx={{ width: '100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Tên</StyledTableHeaderCell>
                <StyledTableHeaderCell align="right">Số lượng</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center">Ngày hết hạn</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center"></StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((row: Equipment) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                    <StyledTableCell align="center">{dayjs(row.expired_at).format('DD/MM/YYYY')}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={openActionMenu ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openActionMenu ? 'true' : undefined}
                        sx={{ padding: 0 }}
                        onClick={(event: React.MouseEvent<HTMLElement>) => onActionMenuClick(event, row)}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center" sx={{ color: '#8B8C9B' }}>
                    Chưa có dụng cụ phương tiện nào
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openActionMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => onActionClick('edit')} sx={{ padding: '16px' }}>
            <ListItemIcon>
              <ImageIcon image={EditIcon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Sửa</ListItemText>
          </MenuItem>
          <Divider sx={{ margin: '0 16px !important' }} />
          <MenuItem onClick={() => onActionClick('delete')} sx={{ padding: '16px' }}>
            <ListItemIcon>
              <ImageIcon image={DeleteIcon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Xoá</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      {locationId && data && isEdit && (
        <SaveEquipmentsDialog
          locationId={locationId}
          equipment={selectedRow}
          open
          onClose={onClose}
          onSuccess={refetch}
        />
      )}
    </Box>
  );
};

const BuildingPlanView = ({ url }: { url: string }) => {
  return (
    <Box py={2} onClick={() => window.open(url, '_blank')?.focus()} style={{ cursor: 'pointer' }}>
      <img src={url} alt="" style={{ width: '100%' }} />
    </Box>
  );
};
