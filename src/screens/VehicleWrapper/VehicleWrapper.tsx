import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CustomFieldType, getTableCell, TableHeaderCell, TableHeaderContent } from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon2 from '../../assets/icons/edit-icon-2.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import useModalConfirm from '../../hooks/useModalConfirm';
import { IUser } from '../../services/auth.service';
import { data } from './mockData';
import ModalEditTags from './ModalEditTags';
import VehicleAdd from './VehicleAdd';
import VehicleEdit from './VehicleEdit';

interface Props {
  type: string;
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
            Xoá phương tiện
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const VehicleWrapper: React.FC<Props> = ({ type }) => {
  const isProtect = type === 'protect';
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalEditTag, setShowModalEditTag] = useState(false);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();

  const [columns] = useState([
    { name: 'name', title: 'Tên phương tiện' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'license_plate', title: 'Biển số' },
    { name: 'regulatory_agency', title: 'Đơn vị quản lý' },
    { name: 'phone', title: 'SĐT liên hệ' },
    { name: 'type', title: 'Loại phương tiện' },
    { name: 'tag', title: 'Thẻ tag' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 200 },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const [customField] = useState<CustomFieldType>({
    tag: {
      renderContent: ({ row }) => {
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
              {row.tag.join(', ')}
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
        title: `Xoá phương tiện ${isProtect ? 'trọng yếu' : 'tuần tra'}`,
        content: `Bạn có chắc chắn muốn xoá phương tiện ${isProtect ? 'trọng yếu' : 'tuần tra'} này không?`,
        confirm: {
          action: hideModalConfirm,
          text: 'Xoá phương tiện',
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
      <VehicleAdd isProtect={isProtect} show={showModalAdd} onClose={() => setShowModalAdd(false)} />
      <VehicleEdit isProtect={isProtect} show={showModalEdit} onClose={() => setShowModalEdit(false)} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên hoặc biển số"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Button variant="contained" onClick={() => setShowModalAdd(true)}>
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm mới phương tiện</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={data} columns={columns}>
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
