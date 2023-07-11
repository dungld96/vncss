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

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { IUser } from 'services/auth.service';
import AddIcon from '../../assets/icons/add-circle.svg';
import BackIcon from '../../assets/icons/back-icon.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import ShopIcon from '../../assets/icons/shop-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Select from '../../common/Select/Select';
import { useAuth } from '../../hooks/useAuth';
import useModalConfirm from '../../hooks/useModalConfirm';
import { INodeType, useAchieveNodeMutation, useDeleteNodeMutation } from '../../services/node.service';
import { selectNode } from '../../state/modules/node/nodeReducer';
import { defaultInitialValues, listStatusNode, mappingStatusNode, mappingStatusNodeColor } from './constants';
import ModalAddNode from './ModalAddNode';
import ModalChangeAgency from './ModalChangeAgency';
import ModalEditNode from './ModalEditNode';
import { useLazyGetAllAgenciesQuery } from '../../services/agencies.service';
import { selectAgencies } from '../../state/modules/agency/agencyReducer';

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
        <MenuItem onClick={() => onActionClick('edit', cellProps.row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa</ListItemText>
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
            Thu hồi Node
          </ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>Xoá Node</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const WarehouseNodeTable = ({ nodeTypes }: { nodeTypes: INodeType[] }) => {
  const [achieveNode] = useAchieveNodeMutation();
  const [deleteNode] = useDeleteNodeMutation();
  const [trigger] = useLazyGetAllAgenciesQuery();

  const [selection, setSelection] = useState<Array<number | string>>([]);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState({
    show: false,
    initialValues: defaultInitialValues,
  });

  const [modalChangeAgency, setModaChangeAgency] = useState<{ show: boolean; ids: (string | number)[] }>({
    show: false,
    ids: [''],
  });

  const data = useSelector(selectNode);
  const agencies = useSelector(selectAgencies);

  const {
    auth: { currentUser },
  } = useAuth();

  const mappingAgencies = agencies.reduce((p, v) => ({ ...p, [v?.id || '']: v.name }), {}) as any;

  const [columns] = useState([
    { name: 'nodeType', title: 'Loại' },
    { name: 'description', title: 'Mô tả' },
    { name: 'serial', title: 'Serial' },
    { name: 'version', title: 'Phiên bản' },
    { name: 'mfg', title: 'Ngày xuất xưởng' },
    { name: 'status', title: 'Trạng thái' },
    { name: 'agency_id', title: 'Đại lý' },
    { name: 'gateway', title: 'Thuộc Gateway' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const customField = useMemo<CustomFieldType>(
    () => ({
      nodeType: {
        renderContent: ({ row }) => (
          <Typography sx={{ fontSize: '14px' }}>{mappingNodeType(row.node_type_id)}</Typography>
        ),
      },
      status: {
        renderContent: ({ row }) => (
          <Typography sx={{ fontSize: '14px', fontWeight: '400', color: `${mappingStatusNodeColor[row.status]}` }}>
            {mappingStatusNode[row.status]}
          </Typography>
        ),
      },
      mfg: {
        renderContent: ({ row }) => {
          return (
            <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{dayjs(row.mfg)?.format('DD/MM/YYYY')}</Typography>
          );
        },
      },
      agency_id: {
        renderContent: ({ row }) => (
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{mappingAgencies[row.agency_id] || '--'}</Typography>
        ),
      },
    }),
    [mappingAgencies]
  );

  const handleRecall = (ids: (string | number)[], more?: boolean) => {
    showModalConfirm({
      title: 'Thu hồi node',
      content: `Bạn có chắc chắn muốn thu hồi ${more ? 'các' : ''} Node này không?`,
      confirm: {
        action: async () => {
          await achieveNode({ node_ids: ids, parent_uuid: currentUser?.sub_id || '' }).unwrap();
          hideModalConfirm();
        },
        text: 'Thu hồi',
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  const handleDeleteNodes = (id: string, more?: boolean) => {
    showModalConfirm({
      type: 'warning',
      title: 'Xoá node',
      content: 'Bạn có chắc chắn muốn xoá node này không?',
      confirm: {
        action: async () => {
          try {
            await deleteNode({ id, parent_uuid: currentUser?.sub_id || '' }).unwrap();
            hideModalConfirm();
            more && setSelection([]);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        },
        text: 'Xoá node',
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

  const handleUpdateNode = (item: any) => {
    const newValues = {
      id: item.id,
      type: item.node_type_id,
      description: item.description || '',
      serial: item.serial,
      version: item.version,
      startDate: dayjs(item.mfg)?.format('DD/MM/YYYY'),
    };

    setModalEdit({ show: true, initialValues: newValues });
  };

  const handleClick = (type: string, item: string | any) => {
    if (type === 'edit') {
      handleUpdateNode(item);
    } else if (type === 'change-agency') {
      handelMove([item]);
    } else if (type === 'recall') {
      handleRecall([item]);
    } else if (type === 'delete') {
      handleDeleteNodes(item);
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

  const mappingNodeType = (typeId: string) => {
    const type = nodeTypes.find((item) => item.id === typeId);
    return type ? `${type.code} - ${type.name}` : typeId;
  };

  useEffect(() => {
    if (currentUser?.sub_id) {
      trigger({ id: currentUser?.sub_id });
    }
  }, [trigger, currentUser]);

  return (
    <>
      <ModalChangeAgency
        {...modalChangeAgency}
        type="node"
        onSuccess={() => setSelection([])}
        onClose={() => setModaChangeAgency({ ...modalChangeAgency, show: false })}
      />
      <ModalEditNode {...modalEdit} onClose={() => setModalEdit({ ...modalEdit, show: false })} />
      <ModalAddNode show={showModalAdd} onClose={() => setShowModalAdd(false)} nodeTypes={nodeTypes} />
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
          <Box sx={{ marginLeft: '8px' }}>Thêm mới Node</Box>
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
                  onClick={() => handleDeleteNodes(selection.join(','), true)}
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
