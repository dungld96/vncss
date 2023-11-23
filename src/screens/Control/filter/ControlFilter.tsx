import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Switch,
  Paper,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material';
import { ImportExport, MoreHoriz } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useQueryParams, StringParam } from 'use-query-params';
import { get } from 'lodash';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import {
  ControlLocationType,
  selectFilterLocationState,
  selectLocationState,
  setControlFilterLocationsLimit,
} from '../../../state/modules/control/controlReducer';
import Pagination from '../../../common/pagination/Pagination';
import { useGetAllAgenciesQuery } from '../../../services/agencies.service';
import { useAuth } from '../../../hooks/useAuth';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import {
  CustomFieldType,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
} from '../../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../../utils/UtilsComponent';
import { CursorType } from '../../../configs/constant';
import { useAppDispatch } from '../../../state/store';
import { useLazyGetControlLocationsFilterQuery } from '../../../services/control.service';

export interface FiltersFormValue {
  status: string;
  agencyId: string;
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
        <MenuItem onClick={() => onActionClick('detail', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chi tiết</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
      </Menu>
    </div>
  );
};

const locationStatus = [
  { value: 'connected', label: 'Hoạt động' },
  { value: 'alert', label: 'Cảnh báo' },
  { value: 'warning', label: 'Cảm biến' },
  { value: 'disconnected', label: 'Mất kết nối' },
];

const getDiffDay = (end: string) => {
  const now = dayjs(new Date());
  const endDate = dayjs(new Date(end));
  if (now.isAfter(endDate)) {
    return 'Hết hạn';
  }
  return endDate.diff(now, 'days');
};

export function getMinutesDiffNow(timestamp: number) {
  const now = dayjs(Date.now());
  const nodeStateTime = dayjs(new Date(timestamp * 1000));
  return now.diff(nodeStateTime, 'minutes');
}

export default function Filters({
  handleOpenLocation,
  filtersFormValue,
  setFiltersFormValue,
  handleClearFilter,
  handleFilter,
}: {
  handleOpenLocation: (localtion: ControlLocationType) => void;
  filtersFormValue: FiltersFormValue;
  setFiltersFormValue: (filtersFormValue: FiltersFormValue) => void;
  handleClearFilter: () => void;
  handleFilter: () => void;
}) {
  const [dataSrc, setDataSrc] = React.useState<any>([]);
  const [paginate, setPaginate] = useState<CursorType>({});
  const { filterLocationsCursor, filterLocationslimit } = useSelector(selectLocationState);
  const [query, setQuery] = useQueryParams({
    locationId: StringParam,
    agencyId: StringParam,
    status: StringParam,
  });
  const {
    auth: { currentUser, currentAgency },
  } = useAuth();
  const locations = useSelector(selectFilterLocationState) as ControlLocationType[];
  const dispatch = useAppDispatch();

  const { data: allAgenciesData } = useGetAllAgenciesQuery({ id: currentUser?.sub_id || '' });
  const agencies = (allAgenciesData?.data || []).concat(currentAgency ? [currentAgency] : []);
  const [getControlFilterLocationsQuery] = useLazyGetControlLocationsFilterQuery();

  const columns = [
    { name: 'name', title: 'Tên vị trí' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'business', title: 'Loại hình KD' },
    { name: 'contact_name', title: 'Người liên hệ' },
    { name: 'contact_number', title: 'SĐT người liên hệ' },
    { name: 'maintaint_date', title: 'Ngày bảo trì' },
    { name: 'tags', title: 'Thẻ tag' },
    { name: 'action', title: 'Hành động' },
  ];

  const tableColumnExtensions = [
    { columnName: 'name', width: 200 },
    { columnName: 'action', width: 200, align: 'center' },
  ] as Table.ColumnExtension[];

  const handleSetLimit = (limit: number) => {
    dispatch(setControlFilterLocationsLimit({ limit }));
  };

  useEffect(() => {
    if (currentUser) {
      getControlFilterLocationsQuery({
        agency_id: currentUser?.sub_id,
        params: { limit: filterLocationslimit, ...paginate },
      });
    }
  }, [paginate, currentUser, filterLocationslimit]);

  const handleChange = (e: any, filterName: 'status' | 'agencyId') => {
    const value = e.target.value;

    setFiltersFormValue({
      ...filtersFormValue,
      [filterName]: value,
    } as FiltersFormValue);
  };

  const handleClick = (type: string, row: any) => {
    if (type === 'detail') {
      setQuery({ ...query, locationId: row.id });
    }
  };

  const customField = {
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
  } as CustomFieldType;

  return (
    <Box
      style={{
        padding: '0 24px',
        marginBottom: '100px',
      }}
    >
      <Box mt="24px">
        <Box mb="20px" display="flex" justifyContent="space-between">
          <Box>
            <FormControl variant="outlined" size="small" style={{ width: '200px', marginRight: '16px' }}>
              <InputLabel htmlFor="agency" style={{ backgroundColor: '#ffffff' }}>
                Đại lý
              </InputLabel>
              <Select
                value={filtersFormValue.agencyId}
                onChange={(e) => handleChange(e, 'agencyId')}
                inputProps={{
                  style: {
                    fontSize: '14px',
                  },
                }}
              >
                <MenuItem value={'all'}>Tất cả đại lý</MenuItem>
                {agencies.map((item: any) => (
                  <MenuItem key={item.id} value={item.id} style={{ fontSize: '14px' }}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: '200px', marginRight: '16px' }} variant="outlined" size="small">
              <InputLabel id="status" style={{ backgroundColor: '#ffffff' }}>
                Trạng Thái
              </InputLabel>
              <Select
                labelId="status"
                id="demo-simple-select"
                value={filtersFormValue.status}
                onChange={(e) => handleChange(e, 'status')}
                inputProps={{
                  style: {
                    fontSize: '14px',
                  },
                }}
              >
                <MenuItem value={'all'}>Tất cả trạng thái</MenuItem>
                {locationStatus.map((item) => (
                  <MenuItem key={item.value} value={item.value} style={{ fontSize: '14px' }}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Box>
            <Button
              // onClick={handleExport}
              color="primary"
              variant="contained"
              style={{ height: '40px', padding: '0 16px' }}
              startIcon={<ImportExport />}
            >
              Xuất excel
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Paper sx={{ boxShadow: 'none', position: 'relative', maxHeight: 332, overflow: 'auto' }}>
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
        <Pagination
          paginate={filterLocationsCursor}
          setPaginate={setPaginate}
          limit={filterLocationslimit}
          setLimit={handleSetLimit}
        />
      </Box>
    </Box>
  );
}
