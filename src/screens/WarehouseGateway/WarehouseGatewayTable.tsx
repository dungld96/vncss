import { IntegratedSelection, SelectionState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz, FileCopyOutlined } from '@mui/icons-material';
import {
  Box,
  Button as ButtonBase,
  Checkbox,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  CustomFieldType,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableSelectionCell,
  TableSelectionHeaderCell,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import { useSelector } from 'react-redux';
import AddIcon from '../../assets/icons/add-circle.svg';
import BackIcon from '../../assets/icons/back-icon.svg';
import CalendarIcon from '../../assets/icons/calendar-icon.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import ShopIcon from '../../assets/icons/shop-icon.svg';
import LocationIcon from '../../assets/icons/location-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import useModalConfirm from '../../hooks/useModalConfirm';
import ModalChangeAgency from '../WarehouseNode/ModalChangeAgency';
import { IUser } from '../../services/auth.service';
import { selectGateway } from '../../state/modules/gateway/gatewayReducer';
import { mappingStatusGateway, mappingStatusGatewayColor, statusGatewayList } from './constants';
import ModalAdd from './ModalAdd';
import ModalExtendGateway from './ModalExtendGateway';

import dayjs from 'dayjs';
import { useAuth } from '../../hooks/useAuth';
import { useLazyGetAllAgenciesQuery } from '../../services/agencies.service';
import { IGatewayType, useAchieveGatewayMutation, useDeleteGatewayMutation } from '../../services/gateway.service';
import { selectAgencies } from '../../state/modules/agency/agencyReducer';
import { StringParam, useQueryParams } from 'use-query-params';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONTROL } from 'utils/routesMap';

interface FiltersFormValue {
  search: string;
  agencyId: string;
  gatewayTypeId: string;
  status: string;
}

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, id: string | IUser) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rowId = useMemo(() => cellProps.row?.id, [cellProps]);
  const locationId = useMemo(() => cellProps.row?.location_id, [cellProps]);

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
        {locationId && (
          <>
            <MenuItem onClick={() => onActionClick('view', rowId)} sx={{ padding: '16px' }}>
              <ListItemIcon>
                <ImageIcon image={LocationIcon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Tới vị trí trên bản đồ</ListItemText>
            </MenuItem>
            <Divider sx={{ margin: '0 16px !important' }} />
          </>
        )}

        <MenuItem onClick={() => onActionClick('extend', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={CalendarIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Gia hạn thêm</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('change-agency', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={ShopIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chuyển xuống đại lý</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('recall', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={BackIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Thu hồi gateway
          </ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Xoá gateway
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const WarehouseGatewayTable = ({
  gatewayTypes,
  refetch,
}: {
  gatewayTypes: IGatewayType[];
  refetch: () => void;
}) => {
  const [query, setQuery] = useQueryParams({
    agencyId: StringParam,
    search: StringParam,
    gatewayTypeId: StringParam,
    status: StringParam,
  });
  const {
    auth: { currentUser, currentAgency },
  } = useAuth();

  const [achieveGateway] = useAchieveGatewayMutation();
  const [deleteGateway] = useDeleteGatewayMutation();
  const [trigger] = useLazyGetAllAgenciesQuery();

  const [selection, setSelection] = useState<Array<number | string>>([]);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalChangeAgency, setModaChangeAgency] = useState<{ show: boolean; ids: (string | number)[] }>({
    show: false,
    ids: [''],
  });
  const [gwExtendIds, setGwExtendIds] = useState<Array<number | string>>([]);
  const [searchValue, setSearchValue] = React.useState(query.search || '');
  const navigate = useNavigate();

  const defaultFiltersFormValue = {
    agencyId: query.agencyId || 'all',
    gatewayTypeId: query.gatewayTypeId || 'all',
    status: query.status || 'all',
  };

  const [filtersFormValue, setFiltersFormValue] = React.useState(defaultFiltersFormValue);

  const gateways = useSelector(selectGateway);
  const parsedGateways = gateways.map((gw) => {
    const diffExpDays = dayjs(gw.subscription_end_at).diff(dayjs(), 'day');
    return {
      ...gw,
      status: gw.subscription_end_at && diffExpDays <= 10 ? 'near_subscription_end' : gw.status,
    };
  });
  const agencies = useSelector(selectAgencies);
  const agenciesList = (agencies || [])
    .concat(currentAgency ? [currentAgency] : [])
    .map((item) => ({ value: item.id, label: item.name }));

  const gatewayTypesList = (gatewayTypes || []).map((item) => ({ value: item.id, label: item.name }));

  const mappingAgencies = agencies.reduce((p, v) => ({ ...p, [v?.id || '']: v.name }), {}) as any;

  const [columns] = useState([
    { name: 'gatewayType', title: 'Loại' },
    // { name: 'description', title: 'Mô tả' },
    { name: 'serial', title: 'Serial Gateway' },
    { name: 'hardware_version', title: 'Phiên bản' },
    { name: 'mfg', title: 'Ngày xuất xưởng' },
    { name: 'status', title: 'Trạng thái' },
    { name: 'node', title: 'Node' },
    { name: 'sim', title: 'Số điện thoại' },
    { name: 'active_at', title: 'Ngày kích hoạt' },
    { name: 'enable_callcenter', title: 'Tổng đài' },
    { name: 'subscriber', title: 'Thuê bao' },
    { name: 'agency_id', title: 'Đại lý' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'action', width: 120, align: 'center' },
    { columnName: 'serial', width: 170, align: 'center' },
    { columnName: 'mfg', width: 140, align: 'center' },
  ]);

  const handleClickCopy = (e: any, row: any) => {
    e.stopPropagation();
    console.log('copied');
    navigator.clipboard.writeText(row.serial);
  };

  const customField = useMemo<CustomFieldType>(
    () => ({
      gatewayType: {
        renderContent: ({ row }) => {
          return <Typography sx={{ fontSize: '14px' }}>{mappingGatewayType(row.gateway_type_id)}</Typography>;
        },
      },
      serial: {
        renderContent: ({ row }) => {
          return (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.serial}
              </Typography>
              <FileCopyOutlined
                style={{ marginLeft: '4px', cursor: 'pointer', fontSize: '12px' }}
                onClick={(e) => handleClickCopy(e, row)}
              />
            </Box>
          );
        },
      },
      status: {
        renderContent: ({ row }) => {
          return (
            <Typography sx={{ fontSize: '14px', fontWeight: '400', color: `${mappingStatusGatewayColor[row.status]}` }}>
              {mappingStatusGateway[row.status]}
            </Typography>
          );
        },
      },
      mfg: {
        renderContent: ({ row }) => {
          return (
            <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{dayjs(row.mfg)?.format('DD/MM/YYYY')}</Typography>
          );
        },
      },
      active_at: {
        renderContent: ({ row }) => {
          return (
            <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
              {dayjs(row?.active_at)?.format('DD/MM/YYYY')}
            </Typography>
          );
        },
      },
      enable_callcenter: {
        renderContent: ({ row }) => <Switch readOnly checked={!!row.enable_callcenter} />,
      },
      agency_id: {
        renderContent: ({ row }) => {
          return (
            <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
              {mappingAgencies[row.agency_id] || '--'}
            </Typography>
          );
        },
      },
    }),
    [mappingAgencies]
  );

  const mappingGatewayType = (typeId: string) => {
    const type = gatewayTypes.find((item) => item.id === typeId);
    return type ? `${type.code}` : typeId;
  };

  const handleRecall = (ids: (string | number)[], more?: boolean) => {
    showModalConfirm({
      title: 'Thu hồi gateway',
      content: `Bạn có chắc chắn muốn thu hồi ${more ? 'các' : ''} Gateway này không?`,
      confirm: {
        action: async () => {
          await achieveGateway({ gateway_ids: ids, parent_uuid: currentUser?.sub_id || '' }).unwrap();
          hideModalConfirm();
        },
        text: 'Thu hồi',
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  const handelMove = (ids: (string | number)[], more?: boolean) => {
    setModaChangeAgency({
      ids,
      show: true,
    });
  };

  const handleClick = (type: string, id: string | any) => {
    if (type === 'view') {
      goToMap(id);
      return;
    }
    if (type === 'extend') {
      setGwExtendIds([id]);
      return;
    }

    if (type === 'change-agency') {
      handelMove([id]);
      return;
    }

    if (type === 'recall') {
      handleRecall([id]);
      return;
    }

    if (type === 'delete') {
      handleDeleteGatways([id]);
      return;
    }
  };
  const goToMap = (id: string) => {
    const gw = gateways.find((item) => item.id === id);
    if (!gw || !gw.location_id) return;
    navigate(`${ROUTE_CONTROL}?locationId=${gw.location_id}`);
  };

  const onCancelSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelection([]);
  };

  const handleSelectionChange = (selectedRowIndices: (number | string)[]) => {
    const selectedRowIds = selectedRowIndices.map((index) => gateways[Number(index)]?.id || '');
    setSelection(selectedRowIds);
  };

  const handleDeleteGatways = (ids: (number | string)[], more?: boolean) => {
    showModalConfirm({
      type: 'warning',
      title: 'Xoá gateway',
      content: 'Bạn có chắc chắn muốn xoá gateway này không?',
      confirm: {
        action: async () => {
          try {
            await deleteGateway({ ids, parent_uuid: currentUser?.sub_id || '' }).unwrap();
            hideModalConfirm();
            more && setSelection([]);
          } catch (error) {
            // console.log(error);
          }
        },
        text: 'Xoá gateway',
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  useEffect(() => {
    if (currentUser?.sub_id) {
      trigger({ id: currentUser?.sub_id });
    }
  }, [trigger, currentUser]);

  const handleFilter = () => {
    setQuery({
      agencyId: filtersFormValue.agencyId,
      search: searchValue ? searchValue : undefined,
      gatewayTypeId: filtersFormValue.gatewayTypeId,
      status: filtersFormValue.status,
    });
  };

  const handleClearFilter = () => {
    setFiltersFormValue({ agencyId: 'all', gatewayTypeId: 'all', status: 'all' });
    setSearchValue('');
    setQuery({
      agencyId: undefined,
      search: undefined,
      gatewayTypeId: undefined,
      status: undefined,
    });
  };

  const handleChange = (filterName: 'agencyId' | 'gatewayTypeId' | 'status', value: any) => {
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
      {gwExtendIds.length > 0 && (
        <ModalExtendGateway show gatewayIds={gwExtendIds} onClose={() => setGwExtendIds([])} />
      )}
      <ModalChangeAgency
        onSuccess={() => setSelection([])}
        type="gateway"
        {...modalChangeAgency}
        onClose={() => setModaChangeAgency({ ...modalChangeAgency, show: false })}
      />
      <ModalAdd
        show={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        gatewayTypes={gatewayTypes}
        onSuccess={refetch}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            '& > *': {
              marginRight: '16px',
            },
          }}
        >
          <Input
            noMarginTop
            topLable="Tìm kiếm"
            style={{ width: 240, background: '#FFFFFF' }}
            placeholder="Tìm kiếm serial"
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
          <Select
            noMarginTop
            fullWidth
            data={agenciesList}
            selected={filtersFormValue.agencyId}
            setSelected={(data) => handleChange('agencyId', data)}
            style={{ width: '200px', marginRight: '16px' }}
            topLable="Đại lý"
            placeholder="Tất cả đại lý"
          />

          <Select
            fullWidth
            noMarginTop
            data={gatewayTypesList}
            selected={filtersFormValue.gatewayTypeId}
            setSelected={(data) => handleChange('gatewayTypeId', data)}
            style={{ width: '200px', marginRight: '16px' }}
            topLable="Loại thiết bị"
            placeholder="Tất cả"
          />
          <Select
            fullWidth
            noMarginTop
            data={statusGatewayList}
            selected={filtersFormValue.status}
            setSelected={(data) => handleChange('status', data)}
            style={{ width: '200px', marginRight: '16px' }}
            topLable="Trạng thái"
            placeholder="Tất cả"
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
        <Button variant="contained" onClick={() => setShowModalAdd(true)}>
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm mới Gateway</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={parsedGateways} columns={columns}>
          <SelectionState
            selection={selection.map((id) => gateways.findIndex((r: any) => r.id === id))}
            onSelectionChange={handleSelectionChange}
          />
          <IntegratedSelection />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />, customField)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableSelection
            highlightRow
            showSelectionColumn
            showSelectAll
            cellComponent={TableSelectionCell}
            headerCellComponent={TableSelectionHeaderCell}
          />

          {selection.length > 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '48px',
                backgroundColor: '#fff',
                zIndex: 2,
                padding: '0 12px',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
                <Checkbox
                  indeterminate
                  onClick={(e) => onCancelSelection(e)}
                  sx={{ svg: { color: '#8F0A0C', fontSize: '21px' } }}
                />
                <Typography variant="subtitle2">Đang chọn ({selection.length})</Typography>
              </Box>
              <Box display={'flex'} alignItems="center">
                <ButtonBase
                  sx={{ color: '#52535C', marginRight: '32px' }}
                  startIcon={<ImageIcon image={CalendarIcon} />}
                  onClick={() => setGwExtendIds(selection)}
                >
                  Gia hạn
                </ButtonBase>
                <ButtonBase
                  sx={{ color: '#52535C', marginRight: '32px' }}
                  startIcon={<ImageIcon image={ShopIcon} />}
                  onClick={() => handelMove([...selection])}
                >
                  Chuyển
                </ButtonBase>
                <ButtonBase
                  sx={{ color: '#E5401C', marginRight: '32px' }}
                  startIcon={<ImageIcon image={BackIcon} />}
                  onClick={() => handleRecall(selection, true)}
                >
                  Thu hồi
                </ButtonBase>
                <ButtonBase
                  sx={{ color: '#E5401C', marginRight: '32px' }}
                  startIcon={<ImageIcon image={DeleteIcon} />}
                  onClick={() => handleDeleteGatways(selection, true)}
                >
                  Xóa
                </ButtonBase>
              </Box>
            </Box>
          )}
        </Grid>
      </Paper>
    </>
  );
};
