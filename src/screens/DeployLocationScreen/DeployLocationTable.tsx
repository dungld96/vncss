import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CustomFieldType, getTableCell, TableHeaderCell, TableHeaderContent } from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';
import Select from '../../common/Select/Select';
import { useSelector } from 'react-redux';
import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon2 from '../../assets/icons/edit-icon-2.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import useModalConfirm from '../../hooks/useModalConfirm';
import ModalEditTags from '../vehicle-wrapper/ModalEditTags';
import { LocationType, selectLocation } from '../../state/modules/location/locationReducer';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import { useDeleteLocationMutation } from '../../services/location.service';
import { useAuth } from '../../hooks/useAuth';
import dayjs from 'dayjs';
import ModalEditLatLng from './ModalEditLatLng';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useQueryParams, StringParam } from 'use-query-params';
import { useGetAllAgenciesQuery } from 'services/agencies.service';
import { BusinessTypes } from 'configs/constant';

interface FiltersFormValue {
  agencyId: string;
  business: string;
}

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, id: string | any) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const row = useMemo(() => cellProps.row, [cellProps]);

  const handleClickAction = (type: string, row: any) => {
    handleClose();
    onActionClick(type, row);
  };

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleClickAction('edit', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa vị trí</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClickAction('editLatLng', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa toạ độ vị trí</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => handleClickAction('delete', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Xoá đơn vị
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const DeployLocationTable = ({ refetch }: { refetch: () => void }) => {
  const [query, setQuery] = useQueryParams({
    agencyId: StringParam,
    search: StringParam,
    business: StringParam,
  });
  const [deleteLocation] = useDeleteLocationMutation();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalEditLatLng, setShowModalEditLatLng] = useState(false);
  const [editTag, setEditTag] = useState<LocationType>();
  const [selectedLocationId, setSelectedLocatuonId] = useState<string>();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const defaultFiltersFormValue = {
    agencyId: query.agencyId || 'all',
    business: query.business || 'all',
  };

  const [filtersFormValue, setFiltersFormValue] = React.useState(defaultFiltersFormValue);
  const [searchValue, setSearchValue] = React.useState(query.search || '');
  const locations = useSelector(selectLocation);
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser, currentAgency },
  } = useAuth();

  const { data: allAgenciesData } = useGetAllAgenciesQuery({ id: currentUser?.sub_id || '' });
  const agencies = (allAgenciesData?.data || [])
    .concat(currentAgency ? [currentAgency] : [])
    .map((item) => ({ value: item.id, label: item.name }));

  const businessTypes = BusinessTypes.map((item) => ({ label: item.value, value: item.value }));

  const [columns] = useState([
    { name: 'name', title: 'Tên vị trí' },
    { name: 'addressString', title: 'Địa chỉ' },
    { name: 'business', title: 'Loại hình KD' },
    { name: 'contact_name', title: 'Người liên hệ' },
    { name: 'contact_number', title: 'SĐT người liên hệ' },
    // { name: 'event_receiver_count', title: 'Người nhận thông báo' },
    { name: 'maintaint_date', title: 'Ngày bảo trì' },
    { name: 'tags', title: 'Thẻ tag' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 200 },
    { columnName: 'action', width: 120, align: 'center' },
    { columnName: 'event_receiver_count', align: 'center' },
    { columnName: 'tags', width: 200 },
    { columnName: 'maintaint_date', width: 200 },
    { columnName: 'contact_number', width: 160 },
    { columnName: 'contact_name', width: 160 },
  ]);

  const [customField] = useState<CustomFieldType>({
    tags: {
      renderContent: ({ row }) => {
        if (!row?.tags) return '--';
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
                color: '#1AA6EE',
              }}
            >
              {row?.tags.join(', ')}
            </Typography>
            <IconButton onClick={() => setEditTag(row)}>
              <ImageIcon image={EditIcon2} />
            </IconButton>
          </Box>
        );
      },
    },
    maintaint_date: {
      renderContent: ({ row }) => {
        return (
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
            {row.maintaint_date ? dayjs(row.maintaint_date)?.format('DD/MM/YYYY') : '--'}
          </Typography>
        );
      },
    },
    addressString: {
      renderContent: ({ row }) => {
        return (
          <Tooltip title={row.addressString}>
            <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{row.addressString || '--'}</Typography>
          </Tooltip>
        );
      },
    },
  });

  const handleClick = (type: string, row: any) => {
    if (type === 'edit') {
      setSelectedLocatuonId(row.id);
      setShowModalEdit(true);
    }
    if (type === 'editLatLng') {
      setSelectedLocatuonId(row.id);
      setShowModalEditLatLng(true);
      return;
    }

    if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá vị trí triển khai',
        content: 'Bạn có chắc chắn muốn xoá vị trí này không?',
        confirm: {
          action: () => {
            deleteLocation({ id: row?.id, parent_uuid: currentUser?.sub_id })
              .then((res) => {
                setSnackbar({ open: true, message: 'Xoá vị trí thành công', severity: 'success' });
              })
              .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi xoá vị trí', severity: 'error' }));

            hideModalConfirm();
          },
          text: 'Xoá vị trí',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
  };

  const handleFilter = () => {
    setQuery({
      agencyId: filtersFormValue.agencyId,
      search: searchValue ? searchValue : undefined,
      business: filtersFormValue.business,
    });
  };

  const handleClearFilter = () => {
    setFiltersFormValue({ agencyId: 'all', business: 'all' });
    setSearchValue('');
    setQuery({
      agencyId: undefined,
      search: undefined,
      business: undefined,
    });
  };

  const handleChange = (filterName: 'agencyId' | 'business', value: any) => {
    setFiltersFormValue({
      ...filtersFormValue,
      [filterName]: value,
    } as FiltersFormValue);
  };

  const onSearchChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <>
      {editTag && (
        <ModalEditTags show location={editTag} onClose={() => setEditTag(undefined)} handleSuccess={refetch} />
      )}
      <ModalAdd show={showModalAdd} onClose={() => setShowModalAdd(false)} />
      {selectedLocationId && currentUser && showModalEdit && (
        <ModalEdit
          show={showModalEdit}
          onClose={() => setShowModalEdit(false)}
          locationId={selectedLocationId}
          agencyId={currentUser.sub_id}
        />
      )}
      {selectedLocationId && currentUser && showModalEditLatLng && (
        <ModalEditLatLng
          show={showModalEditLatLng}
          onClose={() => setShowModalEditLatLng(false)}
          locationId={selectedLocationId}
          agencyId={currentUser.sub_id}
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Box display="flex" alignItems="center">
          <Input
            noMarginTop
            topLable="Tìm kiếm"
            style={{ width: 311, background: '#FFFFFF' }}
            placeholder="Tìm kiếm tên"
            iconStartAdorment={<ImageIcon image={SearchIcon} />}
            onChange={onSearchChange}
            value={searchValue}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                handleFilter();
                ev.preventDefault();
              }
            }}
          />
          <Box ml={2} display="flex" alignItems="flex-end">
            <Select
              noMarginTop
              fullWidth
              data={agencies}
              selected={filtersFormValue.agencyId}
              setSelected={(data) => handleChange('agencyId', data)}
              style={{ width: '300px', marginRight: '16px' }}
              topLable="Đại lý"
              placeholder="Tất cả đại lý"
            />
            <Select
              fullWidth
              noMarginTop
              data={businessTypes}
              selected={filtersFormValue.business}
              setSelected={(data) => handleChange('business', data)}
              style={{ width: '300px', marginRight: '16px' }}
              topLable="Loại hình kinh doanh"
              placeholder="Tất cả loại hình kinh doanh"
            />
            <Button
              onClick={handleFilter}
              color="primary"
              variant="contained"
              style={{
                height: '40px',
                padding: '0 16px',
                marginRight: '16px',
              }}
            >
              Lọc
            </Button>
            <Button
              onClick={handleClearFilter}
              color="primary"
              variant="outlined"
              style={{ height: '40px', padding: '0 16px' }}
            >
              Xoá bộ lọc
            </Button>
          </Box>
        </Box>

        <Button variant="contained" onClick={() => setShowModalAdd(true)}>
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm vị trí triển khai</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={locations} columns={columns}>
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />, customField)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
        </Grid>
      </Paper>
    </>
  );
};
