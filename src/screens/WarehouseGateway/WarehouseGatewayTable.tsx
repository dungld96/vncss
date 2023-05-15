import { IntegratedSelection, SelectionState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
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
import React, { useMemo, useState } from 'react';
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
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Select from '../../common/Select/Select';
import { Switch } from '../../common/Switch/Switch';
import useModalConfirm from '../../hooks/useModalConfirm';
import ModalChangeAgency from '../../screens/WarehouseNode/ModalChangeAgency';
import { IUser } from '../../services/auth.service';
import { selectGateway } from '../../state/modules/gateway/gatewayReducer';
import { listStatusNode, mappingStatusNode, mappingStatusNodeColor } from './constants';
import ModalAdd from './ModalAdd';
import ModalExtendGateway from './ModalExtendGateway';

import dayjs from 'dayjs';
import { useAuth } from '../../hooks/useAuth';
import { useAchieveGatewayMutation, useDeleteGatewayMutation } from '../../services/gateway.service';

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
        <MenuItem onClick={() => onActionClick('extend', cellProps.row)} sx={{ padding: '16px' }}>
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

export const WarehouseGatewayTable = () => {
  const [achieveGateway] = useAchieveGatewayMutation();
  const [deleteGateway] = useDeleteGatewayMutation();

  const [selection, setSelection] = useState<Array<number | string>>([]);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalChangeAgency, setModaChangeAgency] = useState<{ show: boolean; ids: (string | number)[] }>({
    show: false,
    ids: [''],
  });
  const [ModalExtend, setModalExtend] = useState(false);

  const data = useSelector(selectGateway);
  const {
    auth: { currentUser },
  } = useAuth();

  const [columns] = useState([
    { name: 'gateway_type_id', title: 'Loại' },
    { name: 'description', title: 'Mô tả' },
    { name: 'serial', title: 'Serial' },
    { name: 'hardware_version', title: 'Phiên bản' },
    { name: 'mfg', title: 'Ngày xuất xưởng' },
    { name: 'status', title: 'Trạng thái' },
    { name: 'node', title: 'Node' },
    { name: 'sim', title: 'Thẻ sim' },
    { name: 'active_at', title: 'Ngày kích hoạt' },
    { name: 'enable_callcenter', title: 'Tổng đài' },
    { name: 'subscriber', title: 'Thuê bao' },
    { name: 'agency_id', title: 'Đại lý' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 200 },
    { columnName: 'phone', align: 'center' },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const [customField] = useState<CustomFieldType>({
    status: {
      renderContent: ({ row }) => {
        return (
          <Typography sx={{ fontSize: '14px', fontWeight: '400', color: `${mappingStatusNodeColor[row.status]}` }}>
            {mappingStatusNode[row.status]}
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
      renderContent: ({ row }) => (row.enable_callcenter === null ? '--' : <Switch checked={row.enable_callcenter} />),
    },
  });

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

  const handleClick = (type: string, id: string | any) => {
    if (type === 'extend') {
      setModalExtend(true);
    } else if (type === 'change-agency') {
      setModaChangeAgency({
        ids: [id],
        show: true,
      });
    } else if (type === 'recall') {
      handleRecall([id]);
    } else if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá gateway',
        content: 'Bạn có chắc chắn muốn xoá gateway này không?',
        confirm: {
          action: async () => {
            await deleteGateway({ id, parent_uuid: currentUser?.sub_id || '' }).unwrap();
            hideModalConfirm();
          },
          text: 'Xoá gateway',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
  };

  const onCancelSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelection([]);
  };

  const handleSelectionChange = (selectedRowIndices: (number | string)[]) => {
    const selectedRowIds = selectedRowIndices.map((index) => data[Number(index)]?.id);
    setSelection(selectedRowIds);
  };

  const handleDeleteMultilUsers = () => {
    showModalConfirm({
      type: 'warning',
      title: 'Xoá gateway',
      content: 'Bạn có chắc chắn muốn xoá gateway này không?',
      confirm: {
        action: async () => {
          await deleteGateway({ id: selection.join(','), parent_uuid: currentUser?.sub_id || '' }).unwrap();
          setSelection([]);
          hideModalConfirm();
        },
        text: 'Xoá gateway',
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  return (
    <>
      <ModalExtendGateway show={ModalExtend} onClose={() => setModalExtend(false)} />
      <ModalChangeAgency
        type="gateway"
        {...modalChangeAgency}
        onClose={() => setModaChangeAgency({ ...modalChangeAgency, show: false })}
      />
      <ModalAdd show={showModalAdd} onClose={() => setShowModalAdd(false)} />
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
            style={{ width: 212, background: '#FFFFFF' }}
            placeholder="Tìm kiếm"
            iconStartAdorment={<ImageIcon image={SearchIcon} />}
          />
          <Select noMarginTop topLable="Đại lý" data={[{ value: 'all', label: 'Tất cả' }]} selected="all" />
          <Select noMarginTop topLable="Loại thiết bị" data={[{ value: 'all', label: 'Tất cả' }]} selected="all" />
          <Select noMarginTop topLable="Trạng thái" data={listStatusNode} selected="0" />
          <Button style={{ width: 90 }} variant="contained">
            Lọc
          </Button>
        </Box>
        <Button variant="contained" onClick={() => setShowModalAdd(true)}>
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm mới Gateway</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={data} columns={columns}>
          <SelectionState
            selection={selection.map((id) => data.findIndex((r: any) => r.id === id))}
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
                  onClick={() => setModalExtend(true)}
                >
                  Gia hạn
                </ButtonBase>
                <ButtonBase
                  sx={{ color: '#52535C', marginRight: '32px' }}
                  startIcon={<ImageIcon image={ShopIcon} />}
                  onClick={() =>
                    setModaChangeAgency({
                      ids: [...selection],
                      show: true,
                    })
                  }
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
                  onClick={handleDeleteMultilUsers}
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
