import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CustomFieldType, getTableCell, TableHeaderCell, TableHeaderContent } from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import { useSelector } from 'react-redux';
import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon2 from '../../assets/icons/edit-icon-2.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import useModalConfirm from '../../hooks/useModalConfirm';
import ModalEditTags from '../../screens/VehicleWrapper/ModalEditTags';
import { selectLocation } from '../../state/modules/location/locationReducer';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';

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
        <MenuItem onClick={() => onActionClick('delete', rowId)} sx={{ padding: '16px' }}>
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

export const DeployLocationTable: React.FC = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalEditTag, setShowModalEditTag] = useState(false);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();

  const locations = useSelector(selectLocation)

  const [columns] = useState([
    { name: 'province', title: 'Tên vị trí' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'business_id', title: 'Loại hình KD' },
    { name: 'contact_name', title: 'Người liên hệ' },
    { name: 'contact_number', title: 'SĐT người liên hệ' },
    { name: 'maintaint_date', title: 'Ngày bảo trì' },
    { name: 'tags', title: 'Thẻ tag' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'province', width: 200 },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const [customField] = useState<CustomFieldType>({
    tags: {
      renderContent: ({ row }) => {
        if(!row?.tags) return '--'
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
            <IconButton onClick={() => setShowModalEditTag(true)}>
              <ImageIcon image={EditIcon2} />
            </IconButton>
          </Box>
        );
      },
    },
  });

  const handleClick = (type: string, id: string | any) => {
    if (type === 'edit') {
      setShowModalEdit(true);
    } else if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá vị trí triển khai',
        content: 'Bạn có chắc chắn muốn xoá vị trí này không?',
        confirm: {
          action: hideModalConfirm,
          text: 'Xoá vị trí',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
  };

  return (
    <>
      <ModalEditTags show={showModalEditTag} onClose={() => setShowModalEditTag(false)} />
      <ModalAdd show={showModalAdd} onClose={() => setShowModalAdd(false)} />
      <ModalEdit show={showModalEdit} onClose={() => setShowModalEdit(false)} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
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
